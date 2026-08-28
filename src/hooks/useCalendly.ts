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

export interface CalendlyContext {
  /** Where the click happened, e.g. "hero", "city-surrey". */
  source?: string;
  /** City name/slug when the page is city-specific. */
  city?: string;
  /** Project name/slug when the page is project-specific. */
  project?: string;
}

const titleCase = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const CITY_SLUGS = [
  "surrey",
  "langley",
  "abbotsford",
  "coquitlam",
  "delta",
  "burnaby",
  "vancouver",
  "richmond",
  "fraser-valley",
];

/** Derives city/project/page context from the current URL. */
export const inferCalendlyContext = (): CalendlyContext => {
  if (typeof window === "undefined") return {};
  const segments = window.location.pathname.split("/").filter(Boolean);
  const ctx: CalendlyContext = {};

  if (segments[0] === "projects" && segments[1]) {
    ctx.project = titleCase(segments[1]);
  }

  const citySeg = segments.find((s) =>
    CITY_SLUGS.includes(s.replace(/^presale-condos-/, "").replace(/-presale.*$/, "")),
  );
  if (citySeg) {
    ctx.city = titleCase(citySeg.replace(/^presale-condos-/, "").replace(/-presale.*$/, ""));
  }

  return ctx;
};

/** Builds the Calendly URL with page context as query parameters. */
export const buildCalendlyUrl = (context: CalendlyContext = {}): string => {
  if (typeof window === "undefined") return CALENDLY_URL;

  const inferred = inferCalendlyContext();
  const city = context.city ?? inferred.city;
  const project = context.project ?? inferred.project;
  const pagePath = window.location.pathname;

  const url = new URL(CALENDLY_URL);
  url.searchParams.set("utm_source", "presalewithuzair");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", project ? "project" : city ? "city" : "site");
  if (context.source) url.searchParams.set("utm_content", context.source);
  if (project || city) url.searchParams.set("utm_term", project ?? city ?? "");

  // Prefilled context for the first custom question on the booking form.
  const details = [
    project ? `Project: ${project}` : null,
    city ? `Area: ${city}` : null,
    `Page: ${pagePath}`,
  ]
    .filter(Boolean)
    .join(" | ");
  url.searchParams.set("a1", details);

  return url.toString();
};

/** Opens the Calendly popup; falls back to a new tab if the widget can't load. */
export const openCalendlyPopup = (source = "unknown", context: CalendlyContext = {}) => {
  trackBookCall(source);
  const url = buildCalendlyUrl({ ...context, source });
  loadCalendly().then(() => {
    const calendly = (window as any).Calendly;
    if (calendly?.initPopupWidget) {
      calendly.initPopupWidget({ url });
    } else {
      window.open(url, "_blank", "noopener");
    }
  });
};

export const useCalendly = () => {
  const openCalendly = useCallback(
    (source?: string, context?: CalendlyContext) => openCalendlyPopup(source ?? "unknown", context),
    [],
  );
  return { openCalendly };
};

