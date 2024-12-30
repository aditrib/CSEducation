import type { Express } from "express";
import { createServer } from "http";
import { db } from "@db";
import { courses, modules, content, quizzes, progress, users } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { spawn } from "child_process";

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
        modules: {
          with: {
            content: true,
            quizzes: true,
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  });

  // Update module
  app.put("/api/modules/:id", async (req, res) => {
    const moduleId = parseInt(req.params.id);
    const { title, description } = req.body;

    try {
      await db.update(modules)
        .set({ title, description })
        .where(eq(modules.id, moduleId));

      res.json({ message: "Module updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update module" });
    }
  });

  // Create new content (teacher only)
  app.post("/api/content", async (req, res) => {
    const { title, type, content: contentBody, moduleId, sequenceOrder } = req.body;

    try {
      const result = await db.insert(content).values({
        moduleId,
        type,
        title,
        content: contentBody,
        sequenceOrder,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to create content" });
    }
  });

  // Update content
  app.put("/api/content/:id", async (req, res) => {
    const contentId = parseInt(req.params.id);
    const { title, content: contentBody } = req.body;

    try {
      await db.update(content)
        .set({ title, content: contentBody })
        .where(eq(content.id, contentId));

      res.json({ message: "Content updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  // Delete content
  app.delete("/api/content/:id", async (req, res) => {
    const contentId = parseInt(req.params.id);

    try {
      await db.delete(content).where(eq(content.id, contentId));
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete content" });
    }
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

  // Run Python code
  app.post("/api/run-code", async (req, res) => {
    const { code, testCases } = req.body;

    try {
      // Run code for each test case
      const results = await Promise.all(
        testCases.map(async (test: { input: string; expectedOutput: string }) => {
          return new Promise((resolve) => {
            const process = spawn("python3", ["-c", code]);
            let output = "";

            process.stdout.on("data", (data) => {
              output += data.toString();
            });

            process.stdin.write(test.input + "\n");
            process.stdin.end();

            process.on("close", () => {
              // Clean up output (remove trailing newlines)
              output = output.trim();
              resolve(output === test.expectedOutput.trim());
            });

            // Set timeout for code execution
            setTimeout(() => {
              process.kill();
              resolve(false);
            }, 5000);
          });
        })
      );

      // All test cases must pass
      const success = results.every((result) => result);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ success: false, error: "Code execution failed" });
    }
  });



  // Get user role
  app.get("/api/user/role", async (req, res) => {
    // In a real app, this would come from the session
    const userId = 1;

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    res.json({ role: user?.role || "student" });
  });

  // Get student responses (teacher only)
  app.get("/api/student-responses", async (req, res) => {
    try {
      // In a real app, we would verify the user is a teacher here
      const responses = await db.query.progress.findMany({
        with: {
          user: true,
          module: {
            with: {
              quizzes: true,
            },
          },
        },
        orderBy: (progress, { desc }) => [desc(progress.lastAccessed)],
      });

      // Transform the data to include username and quiz answers
      const formattedResponses = responses.map((response) => ({
        userId: response.userId,
        username: response.user.username,
        moduleId: response.moduleId,
        quizId: response.module.quizzes[0]?.id, // Assuming one quiz per module for simplicity
        answers: response.answers || [],
        submittedAt: response.lastAccessed.toISOString(),
      }));

      res.json(formattedResponses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student responses" });
    }
  });

  return httpServer;
}