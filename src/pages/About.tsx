import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-walking.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";

const stats = [
  { value: "450+", label: "Families Helped" },
  { value: "$200M+", label: "in New Homes" },
  { value: "5 Years", label: "in the Presale Market" },
  { value: "Only 2", label: "Defaults, Ever" },
];

const About = () => {
  const navigate = useNavigate();
  const handleCTA = () => navigate("/?scroll=book-section");

  return (
    <>
      <Helmet>
        <title>About Uzair Muhammad — Vancouver Presale Buyer's Agent</title>
        <meta
          name="description"
          content="Former City of Surrey planning & bylaws professional turned buyer-only presale specialist. 450+ families helped, $200M+ in new homes across the Fraser Valley."
        />
        <link rel="canonical" href="https://presalewithuzair.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/about" />
        <meta property="og:title" content="About Uzair Muhammad — Vancouver Presale Buyer's Agent" />
        <meta property="og:description" content="Buyer-only presale specialist. 450+ families helped, $200M+ in new homes, only 2 defaults across five years. Fraser Valley presales, done honestly." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Uzair Muhammad — Vancouver Presale Buyer's Agent" />
        <meta name="twitter:description" content="Buyer-only presale specialist. 450+ families helped, $200M+ in new homes, only 2 defaults across five years." />
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4">About Uzair Muhammad</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground">
                Buyer-only presale specialist for the <span className="text-gradient">Fraser Valley.</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80">
                450+ families helped · $200M+ in new homes · 140+ projects · 5 Years · 4.9★ from 36 reviews · only 2 defaults.
              </p>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-20 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="relative">
                <div className="image-reveal rounded-2xl overflow-hidden">
                  <OptimizedImage src={heroImage} alt="Uzair Muhammad" className="w-full h-[600px]" priority />
                </div>
              </div>

              <div className="space-y-10 text-foreground/85 leading-relaxed">
                <p className="text-lg">
                  I'm Uzair Muhammad, a buyer-only presale and new-construction specialist working across the Fraser Valley — Surrey, Langley, Delta, Abbotsford, Coquitlam and Burnaby South. I represent buyers on presale condos, townhomes and new-build homes, and I never promote or represent developers. Before real estate I spent ten years at the City of Surrey in Bylaws and Planning. I'm a father of two, and I've lived in Surrey almost my whole life.
                </p>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-3">From Pakistan to Surrey</h2>
                  <p>
                    I was born in Pakistan and immigrated to Canada with my family in 2005. I grew up in Surrey — school here, friends here, first jobs here — and it's where I'm raising my two kids today. That matters when I'm sitting across from a newcomer family buying their first Canadian home. I've been the person in the room who didn't have a parent or an uncle in Canada to explain how a mortgage works, how a deposit ladder works, or what a completion date really means. Most of my clients don't have someone in their family who has already done this. I do the job I wish someone had done for my parents.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                    What a decade at the City of Surrey taught me about presale contracts
                  </h2>
                  <p>
                    Before I ever wrote a contract on the buyer's side, I spent close to ten years working for the City of Surrey — first in Bylaws, then in Planning. I left after the COVID years to go into real estate full-time. That decade is the single biggest reason my buyers don't get surprised at completion, and it's a background no other agent in this market can honestly claim.
                  </p>
                  <p className="mt-4">
                    A presale isn't a home yet. It's a set of drawings and a contract, and both of them still have to survive rezoning, development permits, building permits and a construction schedule before a key changes hands. I've watched that process from inside the building. I know how long a rezoning actually takes in Surrey versus what a marketing brochure claims. I know which municipal approvals are pro-forma and which are where projects quietly sit for eighteen months. When a developer's disclosure statement says "estimated completion Q4 2026" and quietly gives them the right to extend that date by twelve months and revise the floor plan, I read the clause with the eyes of someone who has watched those extensions happen. Most agents read the sales-centre version. I read the municipal version.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 bg-card">
          <div className="container-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="stat-card text-center">
                  <p className="text-3xl lg:text-4xl font-display font-bold text-gradient">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buyer-only + situations + defaults */}
        <section className="py-20 bg-background">
          <div className="container-xl max-w-4xl mx-auto space-y-14 text-foreground/85 leading-relaxed">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Why I only <span className="text-gradient">represent buyers</span>
              </h2>
              <p>
                Every presale has two commissions built into the price: the developer's in-house sales team, and the buyer's agent. If you walk into a sales centre alone, you don't save that money — the developer just keeps it. The friendly person offering you coffee is a licensed developer representative whose client, legally, is the developer.
              </p>
              <p className="mt-4">
                I never sit on the developer's side of that table. I don't promote developers, I don't take retainers from them, and I don't sell projects at launch parties. I represent buyers, on every deal, at no cost to you.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                The situations I <span className="text-gradient">get called for</span>
              </h2>
              <p className="mb-4">
                Most of my work is unglamorous problem-solving on the situations nobody warns you about. A few kinds I see over and over:
              </p>
              <ul className="space-y-4">
                <li><strong className="text-foreground">The newcomer buying a first Canadian home.</strong> No family here who has already done this, a thin credit file, and forty pages of legal language in a second language. The job is slowing everything down and translating the deal — literally and figuratively — into something the buyer actually understands before they sign.</li>
                <li><strong className="text-foreground">The self-employed buyer whose income is hard to prove.</strong> Real income, real savings, but a tax return that doesn't tell the story the bank wants to hear. The work is choosing the right lender for the file long before completion, and structuring deposits so financing actually holds together on closing day.</li>
                <li><strong className="text-foreground">The multigenerational family buying one home for three generations.</strong> Grandparents, parents and kids under one roof. Floor plan, legal-suite potential, mortgage structure and title all have to line up, and the conversation is slower on purpose.</li>
                <li><strong className="text-foreground">The investor holding several assignments who needs an exit before completion.</strong> The assignment clause in the disclosure statement decides whether that exit is possible or expensive. The job is reading that clause before signing, not after.</li>
                <li><strong className="text-foreground">The buyer whose completion date moved and whose financing needs restructuring.</strong> Rates shifted, the appraisal came in soft, or the developer pushed completion by nine months. Requalifying calmly, restructuring deposits and getting to close is the whole point of having a buyer's agent still on the file three years after launch.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Only <span className="text-gradient">2 defaults</span>
              </h2>
              <p>
                Across 450+ families and $200M+ in new-construction sales over five years, only two buyers ever failed to complete. A default is the worst thing that can happen to a presale buyer — you lose the deposit and you lose the home. Two, in five years.
              </p>
              <p className="mt-4">
                Anyone can sell a unit at launch. The real job is making sure the buyer can still close three years later: that the income still supports the mortgage, that the deposits are structured against a realistic budget, that the lender is the right one for the situation, and that nobody is walked into a project they can't actually complete. That's what "only 2 defaults" measures. It's the number I care about most and it's the number the industry never talks about.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">What languages do you speak?</h2>
              <p>
                I work in English, Punjabi, Urdu and Hindi, and I get by in Telugu. A presale contract is a legal document. Every buyer should understand every clause in the language they think in — not a summary, not a translated headline, the actual document. I read disclosure statements with clients in whichever of those languages they're most comfortable in, and I answer questions in the same language until every clause makes sense. It isn't a translation service. It's making sure nobody signs something they don't fully understand.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Where do you work?</h2>
              <p>
                Fraser Valley. Day to day that's Surrey, Langley, Delta, Abbotsford, Coquitlam and Burnaby South. If a presale or new-construction project is a genuine buy in one of those markets, I know it and I've usually already vetted the developer and the site.
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 bg-card">
          <div className="container-xl">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[clientMeetingImage, showroomTourImage, brochureReviewImage, officeWideImage, showroomEntranceImage, floorplanImage].map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <OptimizedImage src={img} alt="Uzair with clients" className="w-full h-full hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expo */}
        <section className="py-20 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-label mb-4">Vancouver Presale Expo</p>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Founder, <span className="text-gradient">Vancouver Presale Expo</span>
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  I'm the founder of the Vancouver Presale Expo — an independent event built to give buyers direct access to developers and honest project information without the sales-centre pressure.
                </p>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer">
                    Learn About the Expo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="image-reveal rounded-2xl overflow-hidden">
                <img src={expoImage} alt="Vancouver Presale Expo" className="w-full h-[500px] object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Ready to talk?
              </h2>
              <p className="text-foreground/80 mb-8">
                Have questions about a presale? Want to know if it's the right move for you? Book a free 15-minute call — no pressure, no sales pitch.
              </p>
              <Button variant="hero" size="xl" className="gap-2" onClick={handleCTA}>
                <Phone className="h-5 w-5" />
                Book a Free Strategy Call
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
