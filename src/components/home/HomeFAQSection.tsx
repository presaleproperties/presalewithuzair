import { FAQSchema, FAQItem } from "@/components/blog/FAQSchema";

const FAQS: FAQItem[] = [
  { question: "What is a presale condo?", answer: "A presale condo is a unit you purchase before it's built. You sign a contract today, pay a deposit in stages, and take possession when construction completes — typically 2–4 years later. In a rising market, the value often increases significantly by completion." },
  { question: "Why use a buyer's agent for presale?", answer: "The developer's sales team represents the developer — not you. As your buyer-only agent, Uzair reviews contract terms, flags risk clauses, negotiates upgrades and incentives, and ensures you're protected throughout. This costs you nothing — the developer pays the commission." },
  { question: "How much deposit do I need?", answer: "Most Fraser Valley presale projects require 10–20% paid in stages over 6–12 months. You don't need mortgage financing until completion, making presale accessible even if you don't have the full down payment today." },
  { question: "What areas do you cover?", answer: "Surrey, Langley, Abbotsford, Coquitlam, Delta/Tsawwassen, and Burnaby South — the highest-growth presale markets in the Fraser Valley heading into 2026 with the SkyTrain extension opening." },
  { question: "How do I get VIP pricing?", answer: "Click 'Get VIP Access' and we'll send you floor plans, pricing, and incentives before public launch. VIP pricing is typically 3–7% below public pricing with additional incentives like capped levies, free storage, and extended deposit structures." },
  { question: "Can I resell my presale before completion?", answer: "Yes — most BC presale contracts allow assignment for a fee. Many investors buy presale with the intention of assigning for profit before completion. Uzair advises on which projects have the best assignment clauses and market conditions." },
];

export const HomeFAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container-xl px-5 sm:px-8 lg:px-16 max-w-4xl">
        <FAQSchema faqs={FAQS} heading="Presale Questions, Answered" />
      </div>
    </section>
  );
};
