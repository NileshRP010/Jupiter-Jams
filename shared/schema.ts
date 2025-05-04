import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table (from the existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Videos table
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url").notNull(),
  duration: integer("duration").notNull(), // in seconds
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  location: text("location").notNull(),
  videoType: text("video_type").notNull(), // 'short-form' or 'long-form'
  featured: boolean("featured").default(false),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const videosRelations = relations(videos, ({ many }) => ({
  tags: many(videoTags)
}));

// Tags table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  videos: many(videoTags)
}));

// Junction table for videos and tags
export const videoTags = pgTable("video_tags", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id").notNull().references(() => videos.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
});

export const videoTagsRelations = relations(videoTags, ({ one }) => ({
  video: one(videos, {
    fields: [videoTags.videoId],
    references: [videos.id]
  }),
  tag: one(tags, {
    fields: [videoTags.tagId],
    references: [tags.id]
  })
}));

// Progress tracking table
export const progressMetrics = pgTable("progress_metrics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull(),
  description: text("description").notNull(),
  percentage: integer("percentage").notNull(),
  color: text("color").notNull(), // 'purple', 'teal', 'orange', 'yellow'
});

// Production timeline table
export const productionTimeline = pgTable("production_timeline", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // 'completed', 'in-progress', 'scheduled'
  statusText: text("status_text").notNull(),
  order: integer("order").notNull(),
  tags: jsonb("tags").notNull().$type<{color: string, label: string}[]>(),
});

// QR Codes table
export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  description: text("description").notNull(),
  scanCount: integer("scan_count").default(0),
});

// Animated outro table
export const animatedOutros = pgTable("animated_outros", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  previewUrl: text("preview_url").notNull(),
});

// Schema validation
export const insertVideoSchema = createInsertSchema(videos);
export const selectVideoSchema = createSelectSchema(videos);

export const insertTagSchema = createInsertSchema(tags);
export const selectTagSchema = createSelectSchema(tags);

export const insertProgressMetricSchema = createInsertSchema(progressMetrics);
export const selectProgressMetricSchema = createSelectSchema(progressMetrics);

export const insertProductionTimelineSchema = createInsertSchema(productionTimeline);
export const selectProductionTimelineSchema = createSelectSchema(productionTimeline);

export const insertQrCodeSchema = createInsertSchema(qrCodes);
export const selectQrCodeSchema = createSelectSchema(qrCodes);

export const insertAnimatedOutroSchema = createInsertSchema(animatedOutros);
export const selectAnimatedOutroSchema = createSelectSchema(animatedOutros);

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

export type ProgressMetric = typeof progressMetrics.$inferSelect;
export type InsertProgressMetric = typeof progressMetrics.$inferInsert;

export type ProductionTimelineItem = typeof productionTimeline.$inferSelect;
export type InsertProductionTimelineItem = typeof productionTimeline.$inferInsert;

export type QrCode = typeof qrCodes.$inferSelect;
export type InsertQrCode = typeof qrCodes.$inferInsert;

export type AnimatedOutro = typeof animatedOutros.$inferSelect;
export type InsertAnimatedOutro = typeof animatedOutros.$inferInsert;
