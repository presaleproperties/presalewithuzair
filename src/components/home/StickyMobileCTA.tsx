import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~80% of viewport height (past hero)
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent lg:hidden">
      <Button
        variant="hero"
        size="lg"
        className="w-full h-14 text-base font-semibold rounded-full shadow-lg shadow-primary/30"
        onClick={scrollToForm}
      >
        Work With Uzair
      </Button>
    </div>
  );
};
