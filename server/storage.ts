import { db } from "@db";
import { 
  videos, 
  videoTags, 
  tags, 
  progressMetrics, 
  productionTimeline,
  qrCodes,
  animatedOutros,
  type Video
} from "@shared/schema";
import { eq, and, desc, like } from "drizzle-orm";
import { InsertVideo } from "@shared/schema";

export const storage = {
  // Video related functions
  async getVideosByType(type: string) {
    return await db.query.videos.findMany({
      where: eq(videos.videoType, type),
      orderBy: [desc(videos.uploadedAt)],
      limit: 6
    });
  },
  
  async getVideosByTypeAndLocation(type: string, location: string) {
    return await db.query.videos.findMany({
      where: and(
        eq(videos.videoType, type),
        eq(videos.location, location)
      ),
      orderBy: [desc(videos.uploadedAt)],
      limit: 6
    });
  },
  
  async getLongFormVideo() {
    return await db.query.videos.findFirst({
      where: eq(videos.videoType, 'long-form'),
      orderBy: [desc(videos.uploadedAt)]
    });
  },
  
  async getFeaturedVideo() {
    return await db.query.videos.findFirst({
      where: eq(videos.featured, true),
      orderBy: [desc(videos.uploadedAt)]
    });
  },
  
  async getVideoById(id: number) {
    return await db.query.videos.findFirst({
      where: eq(videos.id, id)
    });
  },
  
  async incrementVideoViews(id: number) {
    const video = await db.query.videos.findFirst({
      where: eq(videos.id, id)
    });
    
    if (video) {
      const newViewCount = (video.views || 0) + 1;
      await db.update(videos)
        .set({ views: newViewCount })
        .where(eq(videos.id, id));
    }
  },
  
  async getLongFormStats() {
    // This would normally query from a stats table or calculate from video data
    return {
      cities: 5,
      interviews: "50+"
    };
  },
  
  // Progress metrics related functions
  async getProgressMetrics() {
    return await db.query.progressMetrics.findMany({
      orderBy: [desc(progressMetrics.id)]
    });
  },
  
  // Production timeline related functions
  async getProductionTimeline() {
    return await db.query.productionTimeline.findMany({
      orderBy: [productionTimeline.order]
    });
  },
  
  // QR code related functions
  async getQrCode() {
    return await db.query.qrCodes.findFirst({
      orderBy: [desc(qrCodes.id)]
    });
  },
  
  // Animated outro related functions
  async getAnimatedOutro() {
    return await db.query.animatedOutros.findFirst({
      orderBy: [desc(animatedOutros.id)]
    });
  },

  // Insert functions for seeding
  async insertVideo(video: InsertVideo) {
    const [newVideo] = await db.insert(videos).values(video).returning();
    return newVideo;
  }
};
