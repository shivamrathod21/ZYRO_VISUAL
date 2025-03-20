import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {format(new Date(post.publishedAt), "MMMM d, yyyy")}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.excerpt}</p>
      </CardContent>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="container py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest trends in video editing and post-production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
          : posts?.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
