import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResultSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit 
} from "firebase/firestore";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Get tryout by slug
  app.get("/api/tryouts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      // In a production app, this would fetch from the database
      // For now, we'll return a successful empty response
      res.json({ success: true, message: `Tryout ${slug} would be fetched from database` });
    } catch (error) {
      console.error("Error fetching tryout:", error);
      res.status(500).json({ success: false, message: "Error fetching tryout" });
    }
  });

  // Get tryouts by category
  app.get("/api/tryouts/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      
      // In a production app, this would fetch from the database
      // For now, we'll return a successful empty response
      res.json({ success: true, message: `Tryouts for category ${category} would be fetched from database` });
    } catch (error) {
      console.error("Error fetching tryouts by category:", error);
      res.status(500).json({ success: false, message: "Error fetching tryouts" });
    }
  });

  // Submit tryout result
  app.post("/api/results", async (req, res) => {
    try {
      // Validate request body
      const resultData = insertResultSchema.parse(req.body);
      
      // In a production app, this would save to the database
      // For now, we'll return a successful response
      res.json({ success: true, resultId: "mock-result-id" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid result data", errors: error.errors });
      } else {
        console.error("Error saving result:", error);
        res.status(500).json({ success: false, message: "Error saving result" });
      }
    }
  });

  // Get leaderboard
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const { tryoutSlug, limit = 20 } = req.query;
      
      // In a production app, this would fetch from the database
      // For now, we'll return a successful empty response
      res.json({ success: true, message: `Leaderboard for tryout ${tryoutSlug} would be fetched from database` });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ success: false, message: "Error fetching leaderboard" });
    }
  });

  // Register new user
  app.post("/api/users", async (req, res) => {
    try {
      // Validate request body
      const userData = insertUserSchema.parse(req.body);
      
      // Insert user into database
      const user = await storage.createUser(userData);
      
      res.json({ success: true, userId: user.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid user data", errors: error.errors });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Error creating user" });
      }
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ success: false, message: "Error fetching user" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
