import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-muted-foreground mb-4">{testimonial.content}</p>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          {testimonial.company && (
            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <TestimonialSkeleton key={i} />)
            : testimonials?.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
        </div>
      </div>
    </section>
  );
}
