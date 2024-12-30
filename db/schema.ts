import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sequenceOrder: integer("sequence_order").notNull(),
});

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id).notNull(),
  type: text("type").notNull(), // 'video' | 'text'
  title: text("title").notNull(),
  content: text("content").notNull(), // video URL or rich text
  sequenceOrder: integer("sequence_order").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id).notNull(),
  title: text("title").notNull(),
  questions: json("questions").$type<{
    id: number;
    type: 'multiple-choice' | 'free-text' | 'code';
    question: string;
    options?: string[];
    correctAnswer?: number;
    expectedAnswer?: string;
    testCases?: {
      input: string;
      expectedOutput: string;
    }[];
  }[]>().notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: integer("module_id").references(() => modules.id).notNull(),
  completed: boolean("completed").default(false).notNull(),
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
  answers: json("answers").$type<(string | number)[]>(), // Store quiz answers
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  email: text("email").unique().notNull(),
  role: text("role").notNull().default("student"), // 'student' or 'teacher'
});

// Relations
export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  content: many(content),
  quizzes: many(quizzes),
  progress: many(progress),
}));

export const contentRelations = relations(content, ({ one }) => ({
  module: one(modules, { fields: [content.moduleId], references: [modules.id] }),
}));

export const quizzesRelations = relations(quizzes, ({ one }) => ({
  module: one(modules, { fields: [quizzes.moduleId], references: [modules.id] }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  module: one(modules, { fields: [progress.moduleId], references: [modules.id] }),
  user: one(users, { fields: [progress.userId], references: [users.id] }),
}));

// Schemas
export const insertCourseSchema = createInsertSchema(courses);
export const selectCourseSchema = createSelectSchema(courses);

export const insertModuleSchema = createInsertSchema(modules);
export const selectModuleSchema = createSelectSchema(modules);

export const insertContentSchema = createInsertSchema(content);
export const selectContentSchema = createSelectSchema(content);

export const insertQuizSchema = createInsertSchema(quizzes);
export const selectQuizSchema = createSelectSchema(quizzes);

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Content = typeof content.$inferSelect;

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'free-text' | 'code';
  question: string;
  options?: string[];
  correctAnswer?: number;
  expectedAnswer?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface Quiz {
  id: number;
  moduleId: number;
  title: string;
  questions: QuizQuestion[];
}

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type UserRole = "student" | "teacher";