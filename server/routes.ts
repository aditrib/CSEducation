import type { Express } from "express";
import { createServer } from "http";
import { db } from "@db";
import { courses, modules, content, quizzes, progress } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Get all courses
  app.get("/api/courses", async (req, res) => {
    const allCourses = await db.query.courses.findMany({
      orderBy: (courses, { desc }) => [desc(courses.createdAt)],
    });
    res.json(allCourses);
  });

  // Get course by id with modules
  app.get("/api/courses/:id", async (req, res) => {
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, parseInt(req.params.id)),
      with: {
        modules: true,
      },
    });
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.json(course);
  });

  // Get module by id with content and quizzes
  app.get("/api/modules/:id", async (req, res) => {
    const module = await db.query.modules.findFirst({
      where: eq(modules.id, parseInt(req.params.id)),
      with: {
        content: true,
        quizzes: true,
      },
    });
    
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    
    res.json(module);
  });

  // Update progress
  app.post("/api/progress", async (req, res) => {
    const { userId, moduleId, completed } = req.body;
    
    const result = await db
      .insert(progress)
      .values({
        userId,
        moduleId,
        completed,
        lastAccessed: new Date(),
      })
      .onConflictDoUpdate({
        target: [progress.userId, progress.moduleId],
        set: { completed, lastAccessed: new Date() },
      });
    
    res.json(result);
  });

  return httpServer;
}
