import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import guideCover from "@/assets/presale-guide-cover.png";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(50),
  email: z.string().trim().email("Invalid email").max(255),
});

export const PresaleGuideBanner = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = formSchema.safeParse({ firstName, email });
    if (!validation.success) {
      toast({
        title: "Please check your info",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName,
          lastName: "",
          email,
          phone: "not-provided",
          buyerType: "first-time-buyer",
          leadSource: "presale-guide-banner",
          utmSource: params.get("utm_source"),
          utmMedium: params.get("utm_medium"),
          utmCampaign: params.get("utm_campaign"),
          utmTerm: params.get("utm_term"),
          utmContent: params.get("utm_content"),
          referrer: document.referrer || null,
          landingPage: window.location.pathname,
        },
      });
      if (error) throw new Error(error.message);
      setIsSuccess(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-card">
      <div className="container-xl px-4 sm:px-6">
        <div className="rounded-2xl bg-background border border-border p-6 sm:p-10 lg:p-14">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-14">
            {/* Text + Form */}
            <div className="flex-1 text-center md:text-left">
              <p className="section-label mb-3">Free Guide</p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-3">
                7 Costly Mistakes Presale Buyers Make
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-lg mx-auto md:mx-0">
                Most buyers don't find out they made a mistake until it's too late. Download my checklist to spot contract traps, hidden closing costs, and developer red flags before you sign away your deposit.
              </p>

              {isSuccess ? (
                <div className="flex items-center gap-3 justify-center md:justify-start text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Check your inbox — guide is on its way!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto md:mx-0">
                  <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 text-base flex-1"
                    autoComplete="given-name"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base flex-1"
                    autoComplete="email"
                    required
                  />
                  <Button
                    type="submit"
                    variant="hero"
                    className="h-12 px-6 rounded-xl font-semibold whitespace-nowrap"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Send Me The Free Guide"
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Guide Cover Image */}
            <div className="w-56 sm:w-64 lg:w-80 shrink-0">
              <img
                src={guideCover}
                alt="7 Costly Mistakes Presale Buyers Make — Free Guide"
                className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-lg"
                loading="lazy"
                width={960}
                height={1280}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
