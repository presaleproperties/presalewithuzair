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
const CityLanding = lazy(() => import("./pages/CityLanding"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NewToPresale = lazy(() => import("./pages/funnel/NewToPresale"));
const BuyPresaleFraserValley = lazy(() => import("./pages/funnel/BuyPresaleFraserValley"));
const PresaleMistakes = lazy(() => import("./pages/funnel/PresaleMistakes"));
const InvestmentAdvice = lazy(() => import("./pages/funnel/InvestmentAdvice"));
const BestPresaleRealtor = lazy(() => import("./pages/funnel/BestPresaleRealtor"));
const BuyerRepresentation = lazy(() => import("./pages/funnel/BuyerRepresentation"));
const FirstTimeBuyers = lazy(() => import("./pages/funnel/FirstTimeBuyers"));
const Investors = lazy(() => import("./pages/funnel/Investors"));
const HowIHelp = lazy(() => import("./pages/funnel/HowIHelp"));
const PunjabiSpeakingRealtor = lazy(() => import("./pages/PunjabiSpeakingRealtor"));
const HindiSpeakingRealtor = lazy(() => import("./pages/HindiSpeakingRealtor"));
const UrduSpeakingRealtor = lazy(() => import("./pages/UrduSpeakingRealtor"));
const SouthAsianBuyers = lazy(() => import("./pages/SouthAsianBuyers"));

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
              <Route path="/surrey" element={<CityLanding citySlug="surrey" />} />
              <Route path="/langley" element={<CityLanding citySlug="langley" />} />
              <Route path="/abbotsford" element={<CityLanding citySlug="abbotsford" />} />
              <Route path="/chilliwack" element={<CityLanding citySlug="chilliwack" />} />
              <Route path="/maple-ridge" element={<CityLanding citySlug="maple-ridge" />} />
              <Route path="/coquitlam" element={<CityLanding citySlug="coquitlam" />} />
              <Route path="/delta" element={<CityLanding citySlug="delta" />} />
              <Route path="/burnaby" element={<CityLanding citySlug="burnaby" />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/new-to-presale-start-here" element={<NewToPresale />} />
              <Route path="/buy-presale-fraser-valley" element={<BuyPresaleFraserValley />} />
              <Route path="/presale-mistakes-fraser-valley" element={<PresaleMistakes />} />
              <Route path="/fraser-valley-presale-investment-advice" element={<InvestmentAdvice />} />
              <Route path="/best-presale-realtor-fraser-valley" element={<BestPresaleRealtor />} />
              <Route path="/buyer-representation-presale-fraser-valley" element={<BuyerRepresentation />} />
              <Route path="/first-time-buyers-fraser-valley" element={<FirstTimeBuyers />} />
              <Route path="/investors-fraser-valley" element={<Investors />} />
              <Route path="/how-i-help" element={<HowIHelp />} />
              <Route path="/punjabi-speaking-realtor" element={<PunjabiSpeakingRealtor />} />
              <Route path="/hindi-speaking-realtor" element={<HindiSpeakingRealtor />} />
              <Route path="/urdu-speaking-realtor" element={<UrduSpeakingRealtor />} />
              <Route path="/south-asian-buyers" element={<SouthAsianBuyers />} />
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
