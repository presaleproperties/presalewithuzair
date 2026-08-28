import { useCallback } from "react";
import { trackBookCall } from "@/lib/analytics";

/** Single booking endpoint used sitewide. */
export const CALENDLY_URL = "https://calendly.com/meetuzair/quick-call";
export const BOOK_CALL_LABEL = "Book a 15-Minute Call";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

let loader: Promise<void> | null = null;

/** Loads the Calendly widget script + stylesheet once. */
export const loadCalendly = (): Promise<void> => {
  if (loader) return loader;
  loader = new Promise<void>((resolve) => {
    if (typeof window === "undefined") return resolve();
    if ((window as any).Calendly) return resolve();

    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }

    const existing = document.querySelector(`script[src="${WIDGET_JS}"]`) as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).Calendly) return resolve();
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
  return loader;
};

/** Opens the Calendly popup; falls back to a new tab if the widget can't load. */
export const openCalendlyPopup = (source = "unknown") => {
  trackBookCall(source);
  loadCalendly().then(() => {
    const calendly = (window as any).Calendly;
    if (calendly?.initPopupWidget) {
      calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener");
    }
  });
};

export const useCalendly = () => {
  const openCalendly = useCallback((source?: string) => openCalendlyPopup(source ?? "unknown"), []);
  return { openCalendly };
};
