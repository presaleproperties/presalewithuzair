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

// Detect mobile device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

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

    // Add mobile-optimized styles for Calendly popup
    const styleId = "calendly-mobile-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        /* Mobile optimization for Calendly popup */
        @media (max-width: 768px) {
          .calendly-overlay {
            padding: 0 !important;
          }
          .calendly-popup {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            border-radius: 0 !important;
          }
          .calendly-popup-content {
            height: 100% !important;
          }
          .calendly-popup-close {
            top: 16px !important;
            right: 16px !important;
            width: 44px !important;
            height: 44px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(0, 0, 0, 0.5) !important;
            border-radius: 50% !important;
            z-index: 9999 !important;
          }
        }
        
        /* Ensure close button is always visible and touchable */
        .calendly-popup-close {
          min-width: 44px;
          min-height: 44px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const openCalendly = useCallback(() => {
    const isMobile = isMobileDevice();

    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: CALENDLY_URL,
        pageSettings: {
          backgroundColor: "0c0a09",
          primaryColor: "d4a853",
          textColor: "fafaf9",
          hideGdprBanner: true,
          hideEventTypeDetails: isMobile, // Simplified view on mobile
          hideLandingPageDetails: isMobile, // Less clutter on mobile
        },
      });
    }
  }, []);

  return { openCalendly };
};
