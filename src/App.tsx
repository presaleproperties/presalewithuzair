import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Developers from "./pages/Developers";
import Agents from "./pages/Agents";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminPostEditor from "./pages/AdminPostEditor";
import AdminLeads from "./pages/AdminLeads";
import AdminTrafficAnalytics from "./pages/AdminTrafficAnalytics";
import NotFound from "./pages/NotFound";
import Book from "./pages/Book";
import PaymentSuccess from "./pages/PaymentSuccess";
import LandingPage from "./pages/LandingPage";
import PresaleGuide from "./pages/PresaleGuide";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/en" element={<Navigate to="/" replace />} />
              <Route path="/en/*" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/agents" element={<Agents />} />
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
