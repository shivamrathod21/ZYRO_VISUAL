import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const creators = [
  {
    name: "RazorFishGaming",
    subscribers: "1.25M subscribers",
    image: "https://framerusercontent.com/images/QSctuKC2u5irYjw10E58bw840AE.jpg",
    quote: "Your work is really good and the quality of editing is high!"
  },
  {
    name: "Viyaura",
    subscribers: "502K subscribers",
    image: "https://framerusercontent.com/images/NLXMpB1pPl1GUPatNYsWzdScAU.jpg"
  },
  {
    name: "RFG",
    subscribers: "434K subscribers",
    image: "https://framerusercontent.com/images/UN121x4rcKNioncU0McKiQ5jPsQ.jpg"
  },
  // Add more creators as needed
];

export default function Creators() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Trusted by
          <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            {" "}Top Gaming Creators
          </span>
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Delivering high-quality edits for gaming content creators worldwide
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg p-6 space-y-4"
            >
              <img
                src={creator.image}
                alt={creator.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold">{creator.name}</h3>
                <p className="text-muted-foreground">{creator.subscribers}</p>
                {creator.quote && (
                  <p className="mt-4 italic text-sm text-muted-foreground">
                    "{creator.quote}"
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <a href="/book">Work with Us</a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}