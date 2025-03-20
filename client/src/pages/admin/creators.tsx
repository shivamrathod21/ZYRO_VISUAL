import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTestimonialSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type TestimonialForm = typeof insertTestimonialSchema._type;

export default function AdminCreators() {
  const { toast } = useToast();
  const form = useForm<TestimonialForm>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      name: "",
      content: "",
      rating: 5,
      image: "",
      subscribers: "",
      company: "",
      isPublished: true,
    },
  });

  const onSubmit = async (data: TestimonialForm) => {
    try {
      // TODO: Implement API call to save testimonial
      console.log("Testimonial data:", data);
      toast({
        title: "Success",
        description: "Creator testimonial has been added.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add testimonial.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Manage Creators
          </span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Add and edit creator testimonials and information.
        </p>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Creator Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subscribers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscriber Count</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 1.2M subscribers" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Testimonial</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Add Creator
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
