import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoIcon, Users, BookOpen, Star } from "lucide-react";
import { Link } from "wouter";

const adminSections = [
  {
    title: "Portfolio Items",
    description: "Manage your video portfolio and before/after comparisons",
    icon: <VideoIcon className="w-8 h-8 text-primary" />,
    href: "/admin/portfolio"
  },
  {
    title: "Testimonials",
    description: "Manage client testimonials and reviews",
    icon: <Star className="w-8 h-8 text-primary" />,
    href: "/admin/testimonials"
  },
  {
    title: "Blog Posts",
    description: "Write and publish blog content",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    href: "/admin/blog"
  },
  {
    title: "User Management",
    description: "Manage admin users and permissions",
    icon: <Users className="w-8 h-8 text-primary" />,
    href: "/admin/users"
  }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Content Management
            <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {" "}System
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your portfolio, testimonials, blog posts, and more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={section.href}>
                <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">
                      {section.icon}
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
