import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const scrollThreshold = window.innerHeight * 0.8;
      const pastHero = window.scrollY > scrollThreshold;

      // Check if lead form is in viewport
      const leadForm = document.getElementById("lead-form");
      let formInView = false;
      
      if (leadForm) {
        const rect = leadForm.getBoundingClientRect();
        // Hide when form is visible (with some padding)
        formInView = rect.top < window.innerHeight - 100 && rect.bottom > 100;
      }

      setIsVisible(pastHero && !formInView);
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility(); // Check initial position

    return () => window.removeEventListener("scroll", checkVisibility);
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
