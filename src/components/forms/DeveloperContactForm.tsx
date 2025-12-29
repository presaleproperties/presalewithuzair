import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import { z } from "zod";

const developerFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  company: z.string().trim().min(1, "Company name is required").max(100, "Company must be less than 100 characters"),
  role: z.string().trim().max(100, "Role must be less than 100 characters").optional(),
  projectType: z.string().min(1, "Please select a project type"),
  unitCount: z.string().min(1, "Please select unit count"),
  projectStage: z.string().min(1, "Please select project stage"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().trim().max(2000, "Message must be less than 2000 characters").optional(),
});

type DeveloperFormData = z.infer<typeof developerFormSchema>;

export const DeveloperContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<DeveloperFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof DeveloperFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = developerFormSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof DeveloperFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof DeveloperFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Build WhatsApp message
    const message = `Hi Uzair, I'm interested in discussing a presale advisory engagement.

Name: ${result.data.name}
Email: ${result.data.email}
Phone: ${result.data.phone}
Company: ${result.data.company}
Role: ${result.data.role || "Not specified"}
Project Type: ${result.data.projectType}
Unit Count: ${result.data.unitCount}
Project Stage: ${result.data.projectStage}
Location: ${result.data.location}
Timeline: ${result.data.timeline}
${result.data.message ? `\nProject Details: ${result.data.message}` : ""}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/17782313592?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Inquiry submitted!",
      description: "Redirecting you to WhatsApp to connect with Uzair.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-4">
          Your advisory inquiry has been submitted. Connect with Uzair on WhatsApp to discuss your project.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">Discuss Your Project</h3>
        <p className="text-muted-foreground">Tell us about your development and advisory needs</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Contact Information</p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (xxx) xxx-xxxx"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              placeholder="Development company"
              value={formData.company || ""}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={errors.company ? "border-destructive" : ""}
            />
            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Your Role</Label>
            <Input
              id="role"
              placeholder="e.g., VP Sales, Partner"
              value={formData.role || ""}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="space-y-4 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Project Details</p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project Type *</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
            >
              <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="highrise">Highrise Condo</SelectItem>
                <SelectItem value="lowrise">Lowrise / Midrise Condo</SelectItem>
                <SelectItem value="townhome">Townhome Development</SelectItem>
                <SelectItem value="mixed-use">Mixed-Use Development</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.projectType && <p className="text-xs text-destructive">{errors.projectType}</p>}
          </div>

          <div className="space-y-2">
            <Label>Number of Units *</Label>
            <Select
              value={formData.unitCount}
              onValueChange={(value) => setFormData({ ...formData, unitCount: value })}
            >
              <SelectTrigger className={errors.unitCount ? "border-destructive" : ""}>
                <SelectValue placeholder="Select unit count" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="1-50">1-50 units</SelectItem>
                <SelectItem value="50-100">50-100 units</SelectItem>
                <SelectItem value="100-200">100-200 units</SelectItem>
                <SelectItem value="200+">200+ units</SelectItem>
              </SelectContent>
            </Select>
            {errors.unitCount && <p className="text-xs text-destructive">{errors.unitCount}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project Stage *</Label>
            <Select
              value={formData.projectStage}
              onValueChange={(value) => setFormData({ ...formData, projectStage: value })}
            >
              <SelectTrigger className={errors.projectStage ? "border-destructive" : ""}>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                <SelectItem value="planning">Planning / Pre-Development</SelectItem>
                <SelectItem value="pre-launch">Pre-Launch (3-6 months out)</SelectItem>
                <SelectItem value="launching">Launching Soon (under 3 months)</SelectItem>
                <SelectItem value="active">Active Sales (needs optimization)</SelectItem>
                <SelectItem value="stalled">Stalled Sales (needs intervention)</SelectItem>
              </SelectContent>
            </Select>
            {errors.projectStage && <p className="text-xs text-destructive">{errors.projectStage}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Project Location *</Label>
            <Input
              id="location"
              placeholder="e.g., Surrey, Langley, Burnaby"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Engagement Timeline *</Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => setFormData({ ...formData, timeline: value })}
          >
            <SelectTrigger className={errors.timeline ? "border-destructive" : ""}>
              <SelectValue placeholder="When do you need advisory support?" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="immediate">Immediately</SelectItem>
              <SelectItem value="1-month">Within 1 month</SelectItem>
              <SelectItem value="1-3-months">1-3 months</SelectItem>
              <SelectItem value="3-6-months">3-6 months</SelectItem>
              <SelectItem value="exploring">Just exploring options</SelectItem>
            </SelectContent>
          </Select>
          {errors.timeline && <p className="text-xs text-destructive">{errors.timeline}</p>}
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-2">
        <Label htmlFor="message">Project Details & Goals (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, current challenges, and what kind of advisory support you're looking for..."
          value={formData.message || ""}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
        />
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        <Send className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Submit & Connect on WhatsApp"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you'll be redirected to WhatsApp to continue the conversation with Uzair.
      </p>
    </form>
  );
};
