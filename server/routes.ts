import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertTestimonialSchema, insertPortfolioItemSchema, insertBlogPostSchema, insertBookingRequestSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Booking Requests
  app.post("/api/bookings", async (req, res) => {
    try {
      const data = insertBookingRequestSchema.parse(req.body);
      const booking = await storage.addBookingRequest(data);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      throw error;
    }
  });

  app.get("/api/bookings", async (_req, res) => {
    const bookings = await storage.getBookingRequests();
    res.json(bookings);
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Invalid status" });
    }
    try {
      const booking = await storage.updateBookingStatus(id, status);
      res.json(booking);
    } catch (error) {
      res.status(404).json({ message: "Booking request not found" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // Portfolio
  app.get("/api/portfolio", async (_req, res) => {
    const items = await storage.getPortfolioItems();
    res.json(items);
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const item = await storage.getPortfolioItem(id);
    if (!item) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.json(item);
  });

  // Blog
  app.get("/api/blog", async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:slug", async (req, res) => {
    const post = await storage.getBlogPost(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  });

  return httpServer;
}