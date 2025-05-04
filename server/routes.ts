import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { eq, and, desc, like } from "drizzle-orm";
import { videos, tags, progressMetrics, productionTimeline, qrCodes, animatedOutros } from "@shared/schema";
import { Router, Request, Response } from "express";

export async function registerRoutes(app: any) {
  const router = Router();

  // Example API route
  router.get("/api", (req: Request, res: Response) => {
    res.json({ message: "API is working!" });
  });

  app.use(router);

  console.log("Routes registered");
  return app;
}
