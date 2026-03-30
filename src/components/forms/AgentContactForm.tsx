import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

export const AgentContactForm = () => {
  return (
    <div className="bg-card rounded-2xl border border-border p-8">
      <UnifiedLeadForm
        eyebrow=""
        heading="Start Your Presale Journey"
        subheading="Tell us about yourself and your goals"
        buttonText="Submit & Schedule a Call"
        variant="default"
        showTrust={true}
      />
    </div>
  );
};
