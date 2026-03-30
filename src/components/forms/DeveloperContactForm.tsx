import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";

export const DeveloperContactForm = () => {
  return (
    <div className="bg-card rounded-2xl border border-border p-8">
      <UnifiedLeadForm
        eyebrow=""
        heading="Discuss Your Project"
        subheading="Tell us about your development and advisory needs"
        buttonText="Submit & Schedule Advisory Call"
        variant="default"
        showTrust={true}
      />
    </div>
  );
};
