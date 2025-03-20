import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for CMS authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Booking requests table
export const bookingRequests = pgTable("booking_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectDetails: text("project_details").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  image: text("image").notNull(),
  subscribers: text("subscribers"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url").notNull(),
  beforeVideoUrl: text("before_video_url"),
  afterVideoUrl: text("after_video_url"),
  order: integer("order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  slug: text("slug").notNull().unique(),
  coverImage: text("cover_image"),
  tags: text("tags").array(),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  authorId: integer("author_id").references(() => users.id),
});

// Insert schemas with validation
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true })
  .extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
    email: z.string().email("Invalid email address"),
  });

export const insertBookingRequestSchema = createInsertSchema(bookingRequests)
  .omit({ id: true, createdAt: true, updatedAt: true, status: true });

export const insertTestimonialSchema = createInsertSchema(testimonials)
  .omit({ id: true, createdAt: true, updatedAt: true });

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems)
  .omit({ id: true, createdAt: true, updatedAt: true });

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({ id: true, createdAt: true, updatedAt: true, publishedAt: true });

// Select types for type safety
export type User = typeof users.$inferSelect;
export type BookingRequest = typeof bookingRequests.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;

// Insert types for form handling
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertBookingRequest = z.infer<typeof insertBookingRequestSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;