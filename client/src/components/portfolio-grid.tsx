import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioItem } from "@shared/schema";
import { motion } from "framer-motion";

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden group cursor-pointer">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <img
              src={item.afterUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PortfolioSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="aspect-video" />
        <div className="p-6">
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioGrid() {
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <PortfolioSkeleton key={i} />)
        : portfolioItems?.map((item) => <PortfolioCard key={item.id} item={item} />)}
    </div>
  );
}
