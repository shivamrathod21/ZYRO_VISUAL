import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBookingRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
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

type BookingForm = typeof insertBookingRequestSchema._type;

export default function Book() {
  const { toast } = useToast();
  const form = useForm<BookingForm>({
    resolver: zodResolver(insertBookingRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      projectDetails: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: unknown) => {
      const res = await apiRequest("POST", "/api/bookings", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request received",
        description: "We'll get back to you soon about your project.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            Start Your Project
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-center">
          Tell us about your project and we'll get back to you with a custom quote.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Details</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}