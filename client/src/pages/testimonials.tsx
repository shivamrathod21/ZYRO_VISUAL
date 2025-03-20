import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  subscribers: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Your work is really good and the quality of editing is high!",
    author: "RazorFishGaming",
    subscribers: "1.25M subscribers",
    image: "https://framerusercontent.com/images/QSctuKC2u5irYjw10E58bw840AE.jpg"
  },
  {
    id: 2,
    content: "The Best Graphics Ever!!! And W Guy!!!",
    author: "DiamondPlays",
    subscribers: "50K subscribers",
    image: "https://framerusercontent.com/images/LoBhL90U7z4PpIEQ3qf6IECxnRA.jpg"
  },
  {
    id: 3,
    content: "It was only our first vid together and trust me I still liked what you did! Especially in the intro!",
    author: "ClayK",
    subscribers: "97K subscribers",
    image: "https://framerusercontent.com/images/OhzwvDf8zrvQuFpkhguiJNfWc.jpg"
  }
];

export default function Testimonials() {
  const { data = testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            What Creators
            <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {" "}Say About Us
            </span>
          </h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.author}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.subscribers}
                        </p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}