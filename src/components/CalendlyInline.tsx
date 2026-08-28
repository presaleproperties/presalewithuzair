import { useEffect, useRef } from "react";
import { CALENDLY_URL, loadCalendly } from "@/hooks/useCalendly";

interface CalendlyInlineProps {
  minHeight?: number;
}

/** Inline Calendly booking widget — the single booking surface across the site. */
export const CalendlyInline = ({ minHeight = 660 }: CalendlyInlineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadCalendly().then(() => {
      if (cancelled || !containerRef.current) return;
      const calendly = (window as any).Calendly;
      if (calendly?.initInlineWidget) {
        calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: containerRef.current,
        });
      } else if (containerRef.current) {
        // Fallback: plain iframe embed
        containerRef.current.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.src = CALENDLY_URL;
        iframe.title = "Book a 15-minute call with Uzair Muhammad";
        iframe.style.width = "100%";
        iframe.style.height = `${minHeight}px`;
        iframe.style.border = "0";
        containerRef.current.appendChild(iframe);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [minHeight]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-sm"
      style={{ minWidth: 320, minHeight }}
    />
  );
};
