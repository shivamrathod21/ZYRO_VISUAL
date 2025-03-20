import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Video, Wand2, Zap } from "lucide-react";

const services = [
  {
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    title: "Gaming Content",
    description: "Specialized editing for gaming videos, streams, and highlights with dynamic effects and smooth transitions."
  },
  {
    icon: <Video className="w-8 h-8 text-primary" />,
    title: "Montage Editing",
    description: "Create high-energy gaming montages that keep viewers engaged with perfectly timed cuts and effects."
  },
  {
    icon: <Wand2 className="w-8 h-8 text-primary" />,
    title: "Visual Effects",
    description: "Custom VFX and motion graphics designed specifically for gaming content and esports highlights."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Quick Turnaround",
    description: "Fast delivery without compromising on quality. Perfect for content creators on tight schedules."
  }
];

export function Services() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional gaming video editing services to help you create content that stands out
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:border-primary/50 transition-colors h-full">
                <CardHeader>
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}