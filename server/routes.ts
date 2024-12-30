import type { Express } from "express";
import { createServer } from "http";
import { db } from "@db";
import { courses, modules, content, quizzes, progress } from "@db/schema";
import { eq, sql } from "drizzle-orm";

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

  // Get user progress analytics
  app.get("/api/analytics/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);

    // Get overall course completion stats
    const courseStats = await db.query.courses.findMany({
      with: {
        modules: {
          with: {
            progress: {
              where: eq(progress.userId, userId)
            }
          }
        }
      }
    });

    // Calculate completion percentage for each course
    const courseProgress = courseStats.map(course => {
      const totalModules = course.modules.length;
      const completedModules = course.modules.filter(module =>
        module.progress.some(p => p.completed)
      ).length;

      return {
        courseId: course.id,
        title: course.title,
        completedModules,
        totalModules,
        percentage: totalModules > 0 ? (completedModules / totalModules) * 100 : 0
      };
    });

    // Get recent activity
    const recentActivity = await db.query.progress.findMany({
      where: eq(progress.userId, userId),
      orderBy: (progress, { desc }) => [desc(progress.lastAccessed)],
      limit: 5,
      with: {
        module: {
          with: {
            course: true
          }
        }
      }
    });

    res.json({
      courseProgress,
      recentActivity: recentActivity.map(activity => ({
        moduleId: activity.moduleId,
        moduleName: activity.module.title,
        courseName: activity.module.course.title,
        completed: activity.completed,
        lastAccessed: activity.lastAccessed
      }))
    });
  });

  return httpServer;
}