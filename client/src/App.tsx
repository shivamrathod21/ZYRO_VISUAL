import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/navbar";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import Creators from "./pages/creators";
import Testimonials from "./pages/testimonials";
import Book from "./pages/book";
import Contact from "./pages/contact";
import AdminDashboard from "./pages/admin/dashboard";
import AdminPortfolio from "./pages/admin/portfolio";
import AdminCreators from "./pages/admin/creators";
import AdminBookings from "./pages/admin/bookings";
import AdminLogin from "./pages/admin/login";
import NotFound from "@/pages/not-found";
import { AuthProvider, useAuth } from "@/lib/auth";

// Protected Route wrapper
function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = "/admin/login";
    return null;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/creators" component={Creators} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/book" component={Book} />
      <Route path="/contact" component={Contact} />

      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        <ProtectedRoute component={AdminDashboard} />
      </Route>
      <Route path="/admin/portfolio">
        <ProtectedRoute component={AdminPortfolio} />
      </Route>
      <Route path="/admin/creators">
        <ProtectedRoute component={AdminCreators} />
      </Route>
      <Route path="/admin/bookings">
        <ProtectedRoute component={AdminBookings} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="pt-16">
            <Router />
          </main>
        </div>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;