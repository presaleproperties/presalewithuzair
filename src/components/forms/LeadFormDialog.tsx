import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import { Shield, Clock, Languages } from "lucide-react";

const EVENT_NAME = "open-lead-dialog";

/** Open the site-wide lead form popup from anywhere. */
export const openLeadDialog = (source?: string) => {
  try {
    (window as any).gtag?.("event", "open_lead_dialog", { source: source || "unknown" });
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const LeadFormDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl w-[calc(100%-1.5rem)] p-0 gap-0 overflow-y-auto max-h-[92vh] rounded-2xl">
        <div className="px-5 sm:px-7 pt-6 pb-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Book a Buyer Strategy Call
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Takes under a minute. I'll personally reply within 24 hours.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-foreground/70">
            <li className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" /> Buyer-side only
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" /> 24-hour response
            </li>
            <li className="flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5 text-primary" /> English, Punjabi, Hindi &amp; Urdu
            </li>
          </ul>
        </div>
        <div className="px-5 sm:px-7 pb-6 pt-2">
          <UnifiedLeadForm
            eyebrow=""
            heading=""
            subheading=""
            buttonText="Book a Buyer Strategy Call"
            showTrust={false}
            twoColumn
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
