import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { BeforeAfter } from "@/components/before-after";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <Testimonials />
    </div>
  );
}