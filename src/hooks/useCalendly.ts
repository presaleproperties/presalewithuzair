import { useEffect, useCallback } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        pageSettings?: {
          backgroundColor?: string;
          hideEventTypeDetails?: boolean;
          hideLandingPageDetails?: boolean;
          primaryColor?: string;
          textColor?: string;
          hideGdprBanner?: boolean;
        };
      }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/meetuzair/30min";

export const useCalendly = () => {
  useEffect(() => {
    // Load Calendly CSS
    const existingLink = document.querySelector('link[href*="calendly.com/assets/external/widget.css"]');
    if (!existingLink) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Load Calendly JS
    const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendly = useCallback(() => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: CALENDLY_URL,
        pageSettings: {
          backgroundColor: "0c0a09", // background color matching your theme
          primaryColor: "d4a853", // gold/primary color
          textColor: "fafaf9", // foreground text color
          hideGdprBanner: true,
        },
      });
    }
  }, []);

  return { openCalendly };
};
