import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPortfolioItemSchema } from "@shared/schema";
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

type PortfolioForm = typeof insertPortfolioItemSchema._type;

export default function AdminPortfolio() {
  const { toast } = useToast();
  const [videoPreview, setVideoPreview] = useState("");
  const [beforeVideoPreview, setBeforeVideoPreview] = useState("");
  const [afterVideoPreview, setAfterVideoPreview] = useState("");

  const form = useForm<PortfolioForm>({
    resolver: zodResolver(insertPortfolioItemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      thumbnailUrl: "",
      videoUrl: "",
      beforeVideoUrl: "",
      afterVideoUrl: "",
      order: 0,
      isPublished: true,
    },
  });

  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "before" | "after"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TODO: Implement actual video upload to cloud storage
    // For now, we'll use a temporary URL
    const url = URL.createObjectURL(file);
    
    switch (type) {
      case "main":
        setVideoPreview(url);
        form.setValue("videoUrl", url);
        break;
      case "before":
        setBeforeVideoPreview(url);
        form.setValue("beforeVideoUrl", url);
        break;
      case "after":
        setAfterVideoPreview(url);
        form.setValue("afterVideoUrl", url);
        break;
    }

    toast({
      title: "Video uploaded",
      description: "Your video has been uploaded successfully.",
    });
  };

  const onSubmit = async (data: PortfolioForm) => {
    try {
      // TODO: Implement API call to save portfolio item
      console.log("Portfolio data:", data);
      toast({
        title: "Success",
        description: "Portfolio item has been created.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create portfolio item.",
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
            Manage Portfolio
          </span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Add and edit your portfolio items, including before & after videos.
        </p>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Gaming, Streaming, Esports" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div>
                    <FormLabel>Main Video</FormLabel>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, "main")}
                    />
                    {videoPreview && (
                      <video
                        src={videoPreview}
                        controls
                        className="mt-2 max-w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <FormLabel>Before Video</FormLabel>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, "before")}
                    />
                    {beforeVideoPreview && (
                      <video
                        src={beforeVideoPreview}
                        controls
                        className="mt-2 max-w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <FormLabel>After Video</FormLabel>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, "after")}
                    />
                    {afterVideoPreview && (
                      <video
                        src={afterVideoPreview}
                        controls
                        className="mt-2 max-w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Save Portfolio Item
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
