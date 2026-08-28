import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Listens for Calendly's `calendly.event_scheduled` confirmation (popup or
 * inline embed) and sends the visitor to the thank-you page with next steps.
 * Mounted once inside the router.
 */
export const CalendlyBookingRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event !== "calendly.event_scheduled") return;
      if (location.pathname === "/booking-confirmed") return;

      // Close the popup widget if one is open, then move to the thank-you page.
      try {
        (window as any).Calendly?.closePopupWidget?.();
      } catch {
        /* widget not loaded — nothing to close */
      }
      window.setTimeout(() => navigate("/booking-confirmed"), 600);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [navigate, location.pathname]);

  return null;
};
