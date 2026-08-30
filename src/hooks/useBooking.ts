import { useCallback } from "react";
import { trackBookCall } from "@/lib/analytics";
import { openLeadDialog } from "@/components/forms/LeadFormDialog";

/** Single booking CTA label used sitewide. */
export const BOOK_CALL_LABEL = "Book a 15-Minute Call";

export interface BookingContext {
  /** City name/slug when the page is city-specific. */
  city?: string;
  /** Project name/slug when the page is project-specific. */
  project?: string;
}

/** Opens the sitewide booking form (drawer on mobile/tablet, dialog on desktop). */
export const openBooking = (source = "unknown", context: BookingContext = {}) => {
  trackBookCall(source);
  openLeadDialog(source, context);
};

export const useBooking = () => {
  const open = useCallback(
    (source?: string, context?: BookingContext) => openBooking(source ?? "unknown", context),
    [],
  );
  return { openBooking: open };
};
