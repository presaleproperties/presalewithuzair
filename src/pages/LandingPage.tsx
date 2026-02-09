import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, Star, Quote } from "lucide-react";
import logoImage from "@/assets/logo.png";
import headshotImage from "@/assets/uzair-headshot.jpeg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import baldeepPhoto from "@/assets/testimonials/baldeep.jpg";
import rehmanPhoto from "@/assets/testimonials/rehman.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";

// Landing Page Content
const content = {
  headline: "Work With",
  headlineAccent: "Uzair.",
  subheadline: "BC's trusted presale expert for condo & townhome buyers.",
};

const LandingPage = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Save Money",
      description: "Uzair helps you avoid bad deals. 350+ presales reviewed.",
    },
    {
      icon: TrendingUp,
      title: "Best Units First",
      description: "Get early access before public launch.",
    },
    {
      icon: Users,
      title: "Trusted by Families",
      description: "350+ families helped across Metro Vancouver.",
    },
  ];

  const testimonials = [
    {
      name: "Anish",
      text: "As first-time buyers, we were nervous, but Uzair made everything clear and stress-free. He helped us find the perfect home for our family.",
      rating: 5,
      photo: anishPhoto,
    },
    {
      name: "Baldeep",
      text: "Uzair made our home-selling process seamless. He took the time to understand our needs and continues to support us. His professionalism is unmatched.",
      rating: 5,
      photo: baldeepPhoto,
    },
    {
      name: "Rehman",
      text: "Uzair is very blunt, honest, and straight to the point. He doesn't beat around the bush. I truly respect his work ethic.",
      rating: 5,
      photo: rehmanPhoto,
    },
    {
      name: "Mona",
      text: "Uzair is a very honest realtor who always puts his clients first. We've been working with him for years. I would advise anyone to work with him.",
      rating: 5,
      photo: monaPhoto,
    },
    {
      name: "Ray",
      text: "Now I see why he's called the presale expert. His transparency and guidance helped our family find our first home in just two weeks.",
      rating: 5,
      photo: rayPhoto,
    },
  ];

  // Rotating testimonial for booking section
  const bookingTestimonials = [
    {
      quote: "As first-time buyers, we were nervous, but Uzair made everything clear, manageable, and stress-free.",
      name: "Anish",
      type: "First-Time Buyer",
      photo: anishPhoto,
    },
    {
      quote: "Uzair helped me with my investment property and made sure I got the best deal. He's straightforward and knows the market.",
      name: "Baldeep",
      type: "Investor",
      photo: baldeepPhoto,
    },
    {
      quote: "Now I see why he's called the presale expert. His transparency and guidance helped our family find our first home.",
      name: "Ray",
      type: "First-Time Buyer",
      photo: rayPhoto,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");

  useEffect(() => {
    // Build Calendly URL with UTM parameters
    const baseUrl = "https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=020617&text_color=fafafa&primary_color=0fd9e8";
    const urlParams = new URLSearchParams(window.location.search);
    
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utmString = utmParams
      .filter(param => urlParams.get(param))
      .map(param => `${param}=${encodeURIComponent(urlParams.get(param) || '')}`)
      .join('&');
    
    setCalendlyUrl(utmString ? `${baseUrl}&${utmString}` : baseUrl);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bookingTestimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = bookingTestimonials[currentIndex];

  const scrollToBooking = () => {
    document.getElementById("book-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Book A Call With Uzair | BC's Presale Expert</title>
        <meta
          name="description"
          content="Book a call with Uzair, BC's trusted presale expert. Get guidance on Vancouver presale condos and townhomes."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://presalewithuzair.com/requestacall" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

        {/* Minimal Header */}
        <header className="py-6 px-4 border-b border-white/5">
          <div className="max-w-6xl mx-auto flex justify-center">
            <img src={logoImage} alt="Uzair Presales" className="h-10" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 pt-8 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Language Badge - Prominent */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                🗣️ ਪੰਜਾਬੀ • हिंदी • اردو • English
              </span>
            </motion.div>

            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <img 
                src={headshotImage} 
                alt="Uzair - Presale Specialist" 
                className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-4 border-primary/30 shadow-lg shadow-primary/20"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {content.headline}
              <br />
              <span className="text-primary">{content.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-8"
            >
              {content.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <button
                onClick={scrollToBooking}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-10 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all font-semibold"
              >
                Book A Call ↓
              </button>
              <span className="text-primary text-sm font-medium">⚡ Limited weekly availability</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-4 text-slate-400 text-sm"
            >
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ 350+ Families Helped</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ $1M+ Saved</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ 100% Free Advice</span>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Why Work With Uzair?
            </h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              He speaks your language. He understands your needs.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-2"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Happy Clients 💬
            </h2>
            <p className="text-slate-400 text-center text-lg mb-12">from social media</p>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                    />
                    <p className="font-semibold text-white">{testimonial.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-4 py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              3 Easy Steps
            </h2>

            <div className="space-y-8">
              {[
                { step: "1", title: "Book A Call", description: "Pick a time that works for you." },
                { step: "2", title: "You Talk", description: "Uzair calls you. Discuss your needs." },
                { step: "3", title: "Find Your Home", description: "He helps you get the best deal." },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0 shadow-lg shadow-primary/25">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section with Calendly */}
        <section id="book-section" className="px-4 py-16 sm:py-24 relative overflow-hidden">
          {/* Colorful bokeh effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-40 right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-purple-500/15 blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Rotating Testimonial Quotes */}
            <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 min-h-[200px] sm:min-h-[220px]">
                <Quote className="absolute top-4 left-4 sm:top-6 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/20" />
                <blockquote 
                  className={`relative z-10 text-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                >
                  {/* Client Photo */}
                  <div className="flex justify-center mb-4">
                    <img 
                      src={currentTestimonial.photo} 
                      alt={currentTestimonial.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-slate-300 italic leading-relaxed">
                    "{currentTestimonial.quote}"
                  </p>
                  <footer className="mt-4 sm:mt-6">
                    <p className="text-sm sm:text-base font-semibold text-white">{currentTestimonial.name}</p>
                    <p className="text-xs sm:text-sm text-slate-400">{currentTestimonial.type}</p>
                  </footer>
                </blockquote>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                  {bookingTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentIndex(index);
                          setIsAnimating(false);
                        }, 300);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Book a <span className="text-primary">Discovery Call</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                A quick conversation to understand your goals and see if we're a good fit.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-400">
                Available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
              </p>
            </div>

            {/* Mobile: Calendar only */}
            <div className="lg:hidden space-y-4">
              {/* Calendly Calendar - Full viewport height on mobile */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 h-[calc(100vh-120px)] min-h-[500px]">
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a meeting with Uzair"
                  style={{ border: 'none' }}
                />
              </div>
              
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Limited weekly availability. Serious inquiries only.
                </p>
              </div>
            </div>

            {/* Desktop: Full-width calendar */}
            <div className="hidden lg:block">
              <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950 h-[750px]">
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a meeting with Uzair"
                  style={{ border: 'none' }}
                />
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-slate-500">
                  Limited weekly availability. Serious inquiries only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-slate-950 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Uzair Presales • Vancouver's Presale Expert
          </p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
