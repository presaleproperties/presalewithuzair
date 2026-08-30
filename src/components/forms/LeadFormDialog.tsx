import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

const EVENT_NAME = "open-lead-dialog";

export interface LeadDialogContext {
  city?: string;
  project?: string;
}

/** Open the site-wide lead form popup/drawer from anywhere. */
export const openLeadDialog = (source?: string, context: LeadDialogContext = {}) => {
  try {
    (window as any).gtag?.("event", "open_lead_dialog", { source: source || "unknown" });
  } catch {}
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { source: source || "unknown", ...context } }),
  );
};

const Header = () => (
  <>
    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground pr-6">
      Book a Buyer Strategy Call
    </h2>
    <p className="mt-1.5 text-sm text-foreground/60">
      Takes under a minute. I'll personally reply within 24 hours.
    </p>
  </>
);

export const LeadFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<{ source?: string } & LeadDialogContext>({});
  const [isCompact, setIsCompact] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );

  // Mobile + tablet get a bottom drawer; desktop keeps the centred dialog.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsCompact(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      setContext((e as CustomEvent).detail ?? {});
      setOpen(true);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const form = (
    <UnifiedLeadForm
      eyebrow=""
      heading=""
      subheading=""
      buttonText="Book a Buyer Strategy Call"
      showTrust={false}
      compact
      context={{ city: context.city, project: context.project, source: context.source }}
    />
  );

  if (isCompact) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[92vh]">
          <div className="overflow-y-auto px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2">
            <Header />
            <div className="pt-5">{form}</div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl w-[calc(100%-1.5rem)] p-0 gap-0 overflow-y-auto max-h-[90vh] rounded-sm">
        <div className="px-6 sm:px-8 pt-7">
          <Header />
        </div>
        <div className="px-6 sm:px-8 pb-7 pt-6">{form}</div>
      </DialogContent>
    </Dialog>
  );
};
