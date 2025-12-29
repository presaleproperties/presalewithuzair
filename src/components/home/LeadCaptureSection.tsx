import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import uzairImage from "@/assets/uzair-hero.jpeg";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  buyerType: z.string().min(1, "Please select an option"),
});

type FormData = z.infer<typeof formSchema>;

export const LeadCaptureSection = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    buyerType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Please check your information",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual lead capture integration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Thanks for reaching out!",
      description: "We'll be in touch soon.",
    });
  };

  if (isSuccess) {
    return (
      <section id="lead-form" className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        
        <div className="relative z-10 container-xl px-4 sm:px-6 min-h-screen flex items-center justify-center">
          <div className="max-w-lg text-center py-16">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight mb-4">
              YOU'RE IN!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Thanks for reaching out. We'll review your information and get back to you within 24 hours.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, check out our presale resources below.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="relative min-h-screen overflow-hidden">
      {/* Background with bokeh effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
      
      {/* Colorful bokeh effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-40 left-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 container-xl px-4 sm:px-6 min-h-screen flex items-center py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left - Image (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right - Form */}
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
              READY TO BUY PRESALE?
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              <span className="text-foreground font-semibold">If you're looking to buy a presale condo</span> with VIP access, expert guidance, and zero pressure — let's connect!
            </p>
            
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Fill out the form below, and we'll reach out to see if we're a fit.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                  First Name *
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12 text-base bg-card/50 border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                  Last Name *
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-12 text-base bg-card/50 border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-base bg-card/50 border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Phone *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 text-base bg-card/50 border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Buyer Type */}
              <div>
                <label htmlFor="buyerType" className="block text-sm font-medium text-foreground mb-1.5">
                  I am a... *
                </label>
                <Select
                  value={formData.buyerType}
                  onValueChange={(value) => setFormData({ ...formData, buyerType: value })}
                >
                  <SelectTrigger className="h-12 text-base bg-card/50 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time-buyer">First-Time Buyer</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="upsizer">Upsizer / Downsizer</SelectItem>
                    <SelectItem value="assignment-buyer">Assignment Buyer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full h-14 text-base font-semibold rounded-lg mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Let's Chat"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting, you agree to receive communications from us. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};