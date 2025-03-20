import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const comparisons = [
  {
    before: {
      video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
      thumbnail: "https://placehold.co/800x450?text=Original+Gaming+Footage"
    },
    after: {
      video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
      thumbnail: "https://placehold.co/800x450?text=Edited+Gaming+Montage"
    },
    label: "Gaming Montage"
  },
  {
    before: {
      video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
      thumbnail: "https://placehold.co/800x450?text=Raw+Stream+Footage"
    },
    after: {
      video: "https://cdn.pixabay.com/vimeo/753699303/gaming-129832.mp4",
      thumbnail: "https://placehold.co/800x450?text=Edited+Stream+Highlights"
    },
    label: "Stream Highlights"
  }
];

export function BeforeAfter() {
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
              Before & After
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the transformation in our work. Drag the slider to compare the original footage
            with our professional edit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <ReactCompareSlider
                      itemOne={
                        <div className="relative w-full h-[300px] lg:h-[400px]">
                          <video
                            src={comparison.before.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      }
                      itemTwo={
                        <div className="relative w-full h-[300px] lg:h-[400px]">
                          <video
                            src={comparison.after.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      }
                      className="h-[300px] lg:h-[400px]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{comparison.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag slider to compare before and after edits
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}