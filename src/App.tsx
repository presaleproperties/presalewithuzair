import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load all non-critical pages to reduce initial bundle size
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Developers = lazy(() => import("./pages/Developers"));
const Agents = lazy(() => import("./pages/Agents"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPostEditor = lazy(() => import("./pages/AdminPostEditor"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const AdminTrafficAnalytics = lazy(() => import("./pages/AdminTrafficAnalytics"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Book = lazy(() => import("./pages/Book"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const PresaleGuide = lazy(() => import("./pages/PresaleGuide"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/en" element={<Navigate to="/" replace />} />
              <Route path="/en/*" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/developers" element={<Navigate to="/" replace />} />
              <Route path="/agents" element={<Navigate to="/" replace />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/post/:id" element={<AdminPostEditor />} />
              <Route path="/admin/analytics" element={<AdminTrafficAnalytics />} />
              <Route path="/book" element={<Book />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/call" element={<LandingPage />} />
              <Route path="/presale-guide" element={<PresaleGuide />} />
              <Route path="/requestacall" element={<Navigate to="/call" replace />} />
              <Route path="/lp" element={<Navigate to="/call" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
