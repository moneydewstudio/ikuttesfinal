import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  personalityResults: jsonb("personality_results"), // Store personality test results
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
  photoURL: true,
});

// Tryout model
export const tryouts = pgTable("tryouts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // CPNS, SNBT, Psikotes
  timeInMinutes: integer("time_in_minutes").notNull(),
  questions: jsonb("questions").notNull(),
  participants: integer("participants").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTryoutSchema = createInsertSchema(tryouts).pick({
  slug: true,
  title: true,
  description: true,
  category: true,
  timeInMinutes: true,
  questions: true,
});

// Result model
export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tryoutId: integer("tryout_id").notNull(),
  score: integer("score").notNull(),
  timeTaken: integer("time_taken").notNull(), // in seconds
  answers: jsonb("answers").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertResultSchema = createInsertSchema(results).pick({
  userId: true,
  tryoutId: true,
  score: true,
  timeTaken: true,
  answers: true,
});

// Blog post model
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // CPNS, SNBT, Psikotes
  imageUrl: text("image_url"),
  authorId: integer("author_id"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  slug: true,
  title: true,
  excerpt: true,
  content: true,
  category: true,
  imageUrl: true,
  authorId: true,
});

// Personality test model
export const personalityTests = pgTable("personality_tests", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // MBTI, HEXACO, BIG_FIVE
  timeInMinutes: integer("time_in_minutes").notNull(),
  questions: jsonb("questions").notNull(),
  factors: jsonb("factors").notNull(),
  participants: integer("participants").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPersonalityTestSchema = createInsertSchema(personalityTests).pick({
  slug: true,
  title: true,
  description: true,
  type: true,
  timeInMinutes: true,
  questions: true,
  factors: true,
});

// Personality result model
export const personalityResults = pgTable("personality_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  testId: integer("test_id").notNull(),
  testType: text("test_type").notNull(), // MBTI, HEXACO, BIG_FIVE
  scores: jsonb("scores").notNull(),
  mainType: text("main_type"), // For MBTI e.g. "INTJ"
  answers: jsonb("answers").notNull(),
  isPublic: boolean("is_public").default(true),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertPersonalityResultSchema = createInsertSchema(personalityResults).pick({
  userId: true,
  testId: true,
  testType: true,
  scores: true,
  mainType: true,
  answers: true,
  isPublic: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTryout = z.infer<typeof insertTryoutSchema>;
export type Tryout = typeof tryouts.$inferSelect;

export type InsertResult = z.infer<typeof insertResultSchema>;
export type Result = typeof results.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertPersonalityTest = z.infer<typeof insertPersonalityTestSchema>;
export type PersonalityTest = typeof personalityTests.$inferSelect;

export type InsertPersonalityResult = z.infer<typeof insertPersonalityResultSchema>;
export type PersonalityResult = typeof personalityResults.$inferSelect;
