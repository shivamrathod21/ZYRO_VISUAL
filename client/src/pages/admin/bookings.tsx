import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";

interface BookingRequest {
  id: number;
  name: string;
  email: string;
  projectDetails: string;
  status: string;
  createdAt: string;
}

export default function AdminBookings() {
  const { data: bookings = [] } = useQuery<BookingRequest[]>({
    queryKey: ["/api/bookings"],
  });

  return (
    <div className="min-h-screen py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Project Requests
            </span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage and respond to incoming project requests
          </p>

          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{booking.name}</h3>
                      <p className="text-sm text-muted-foreground">{booking.email}</p>
                    </div>
                    <Badge variant={booking.status === "pending" ? "default" : "success"}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Project Details:</h4>
                    <p className="text-muted-foreground">{booking.projectDetails}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Received {formatDistance(new Date(booking.createdAt), new Date(), { addSuffix: true })}
                    </p>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Mark as Contacted
                      </Button>
                      <Button size="sm">
                        Send Response
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {bookings.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No booking requests yet
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
