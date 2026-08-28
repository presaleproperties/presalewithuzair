import { useEffect, useRef, useState } from "react";
import { buildCalendlyUrl, loadCalendly, type CalendlyContext } from "@/hooks/useCalendly";

interface CalendlyInlineProps {
  /** Desktop height of the embed. Mobile uses a taller frame automatically. */
  minHeight?: number;
  /** Optional page context (city/project) prefilled into the booking. */
  context?: CalendlyContext;
}

/** Brand tokens passed to Calendly so the widget matches the site. */
const BRAND = {
  background_color: "ffffff",
  text_color: "14171f",
  primary_color: "224bc3",
};

const MOBILE_HEIGHT = 1000;

/** Inline Calendly booking widget — the single booking surface across the site. */
export const CalendlyInline = ({ minHeight = 700, context }: CalendlyInlineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // Track the breakpoint so the embed is re-initialised at the right height.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const height = isMobile ? MOBILE_HEIGHT : minHeight;

  useEffect(() => {
    let cancelled = false;

    const url = new URL(buildCalendlyUrl({ source: "inline-embed", ...context }));
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("hide_landing_page_details", "1");
    url.searchParams.set("background_color", BRAND.background_color);
    url.searchParams.set("text_color", BRAND.text_color);
    url.searchParams.set("primary_color", BRAND.primary_color);
    const finalUrl = url.toString();

    loadCalendly().then(() => {
      if (cancelled || !containerRef.current) return;
      const el = containerRef.current;
      // Clear any previous widget before re-initialising (breakpoint change).
      el.innerHTML = "";

      const calendly = (window as any).Calendly;
      if (calendly?.initInlineWidget) {
        calendly.initInlineWidget({ url: finalUrl, parentElement: el });
      } else {
        // Fallback: plain iframe embed
        const iframe = document.createElement("iframe");
        iframe.src = finalUrl;
        iframe.title = "Book a 15-minute call with Uzair Muhammad";
        iframe.loading = "lazy";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        el.appendChild(iframe);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [height, context?.city, context?.project, context?.source]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-sm bg-background [&_iframe]:!w-full [&_iframe]:!h-full"
      style={{ minWidth: 0, height, minHeight: height }}
    />
  );
};
