import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Trophy, Zap, Star } from "lucide-react";

const reasons = [
  {
    icon: <Clock className="w-12 h-12 text-primary" />,
    title: "Quick Turnaround",
    description: "Get your gaming content edited and ready for upload within 24-48 hours"
  },
  {
    icon: <Trophy className="w-12 h-12 text-primary" />,
    title: "Gaming Specialists",
    description: "We understand gaming content and know how to make it engaging"
  },
  {
    icon: <Zap className="w-12 h-12 text-primary" />,
    title: "High Energy Edits",
    description: "Dynamic effects and transitions that keep viewers watching"
  },
  {
    icon: <Star className="w-12 h-12 text-primary" />,
    title: "Professional Quality",
    description: "Cinematic editing techniques that elevate your content"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Choose
            <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {" "}Zyro-Visuals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We specialize in creating high-energy gaming content that keeps viewers engaged
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center p-6 hover:border-primary/50 transition-colors h-full">
                <CardContent className="pt-6">
                  <div className="mb-6 flex justify-center">{reason.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
