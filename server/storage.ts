import {
  type Testimonial,
  type PortfolioItem,
  type BlogPost,
  type BookingRequest,
  type InsertTestimonial,
  type InsertPortfolioItem,
  type InsertBlogPost,
  type InsertBookingRequest,
} from "@shared/schema";

export interface IStorage {
  // Booking Requests
  getBookingRequests(): Promise<BookingRequest[]>;
  addBookingRequest(request: InsertBookingRequest): Promise<BookingRequest>;
  updateBookingStatus(id: number, status: string): Promise<BookingRequest>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  addTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Portfolio
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  addPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  addBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private bookingRequests: Map<number, BookingRequest>;
  private testimonials: Map<number, Testimonial>;
  private portfolio: Map<number, PortfolioItem>;
  private blog: Map<number, BlogPost>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.bookingRequests = new Map();
    this.testimonials = new Map();
    this.portfolio = new Map();
    this.blog = new Map();
    this.currentIds = {
      bookingRequests: 1,
      testimonials: 1,
      portfolio: 1,
      blog: 1,
    };
  }

  async getBookingRequests(): Promise<BookingRequest[]> {
    return Array.from(this.bookingRequests.values());
  }

  async addBookingRequest(request: InsertBookingRequest): Promise<BookingRequest> {
    const id = this.currentIds.bookingRequests++;
    const newRequest = {
      ...request,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bookingRequests.set(id, newRequest);
    return newRequest;
  }

  async updateBookingStatus(id: number, status: string): Promise<BookingRequest> {
    const request = this.bookingRequests.get(id);
    if (!request) {
      throw new Error("Booking request not found");
    }
    const updatedRequest = { ...request, status, updatedAt: new Date() };
    this.bookingRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async addTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentIds.testimonials++;
    const newTestimonial = { 
      ...testimonial, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolio.values());
  }

  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolio.get(id);
  }

  async addPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentIds.portfolio++;
    const newItem = {
      ...item,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.portfolio.set(id, newItem);
    return newItem;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blog.values());
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blog.values()).find(post => post.slug === slug);
  }

  async addBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentIds.blog++;
    const newPost = {
      ...post,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: null,
    };
    this.blog.set(id, newPost);
    return newPost;
  }
}

export const storage = new MemStorage();