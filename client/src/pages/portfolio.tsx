import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const portfolioItems = [
  {
    id: 1,
    title: "Gaming Highlights",
    description: "Epic gaming moments with dynamic transitions and effects",
    video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
    category: "Gaming"
  },
  {
    id: 2,
    title: "Stream Compilation",
    description: "Best moments from live streams with professional editing",
    video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
    category: "Streaming"
  },
  {
    id: 3,
    title: "Esports Montage",
    description: "High-energy competitive gaming montage",
    video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
    category: "Esports"
  },
  {
    id: 4,
    title: "Gaming Trailer",
    description: "Cinematic game trailer with custom effects",
    video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
    category: "Trailer"
  }
];

export default function Portfolio() {
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
            Our Portfolio
            <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {" "}Showcase
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our latest work and see how we help our clients achieve their creative vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary">{item.category}</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/book">Start Your Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}