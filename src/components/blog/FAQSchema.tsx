import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs?: FAQItem[];
  heading?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "Do I need a realtor to buy a presale condo in BC?",
    answer:
      "Going direct to the developer's presentation centre means dealing with their sales reps, who work to maximize the developer's profit. A specialized presale realtor negotiates hidden incentives, waives assignment fees, and secures VIP pricing before the public launch.",
  },
  {
    question: "How much deposit is needed for a presale condo in BC?",
    answer:
      "Standard deposit structures range from 15% to 20%, but in the current market, strong negotiation can secure 10% structures. This allows you to control a high-value asset with less tied-up capital while waiting for completion.",
  },
  {
    question: "Can I sell my presale condo before it completes?",
    answer:
      "Yes, this is called an assignment sale. However, you must account for developer assignment fees (1% to 3%), CRA tax implications, and lifting clauses that restrict when you can list the contract on the MLS.",
  },
];

export const FAQSchema = ({
  faqs = DEFAULT_FAQS,
  heading = "Frequently Asked Questions",
}: FAQSchemaProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      {/* ── Inject FAQPage JSON-LD into <head> ── */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Visual accordion ── */}
      <div className="mt-12">
        {/* Header */}
        <div className="mb-6">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: "hsl(var(--primary))" }}
          >
            Quick Answers
          </p>
          <h2
            className="font-display text-2xl md:text-3xl"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {heading}
          </h2>
        </div>

        {/* Gold divider */}
        <div
          className="h-[2px] w-12 mb-8 rounded-full"
          style={{ background: "hsl(var(--primary))" }}
        />

        {/* FAQ items */}
        <div className="flex flex-col divide-y" style={{ borderColor: "hsl(var(--border))" }}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-start justify-between gap-4 py-5 text-left transition-colors"
                >
                  <span
                    className={cn(
                      "font-display text-base md:text-lg leading-snug transition-colors",
                      isOpen
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary"
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300",
                      isOpen
                        ? "rotate-180"
                        : "rotate-0"
                    )}
                    style={{
                      background: isOpen
                        ? "hsl(var(--primary) / 0.15)"
                        : "hsl(var(--muted))",
                      color: isOpen ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {/* Answer — animated expand */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                  )}
                >
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
