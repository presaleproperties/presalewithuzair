import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CalendarCheck, Mail, Phone, FileText, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const steps = [
  {
    icon: Mail,
    title: "Check your inbox",
    description:
      "Calendly has sent your confirmation with the date, time and the link for our call. Add it to your calendar so it doesn't get lost.",
  },
  {
    icon: Phone,
    title: "I'll call you at the scheduled time",
    description:
      "Fifteen minutes, no pressure and no sales pitch. Bring the projects you're considering, your budget and your timeline.",
  },
  {
    icon: FileText,
    title: "Have your details ready",
    description:
      "If you've already been to a sales centre or received a contract, have it handy — I'll walk you through the deposit structure and assignment terms.",
  },
];

const BookingConfirmed = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Your Call Is Booked | Presale With Uzair</title>
      <meta name="description" content="Your 15-minute presale strategy call is confirmed. Here's what happens next." />
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <Navbar />

    <main className="pt-32 pb-24">
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-8">
          <CalendarCheck className="h-7 w-7" />
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-black leading-[1.1] text-foreground mb-4">
          Your call is booked.
        </h1>
        <p className="text-lg text-foreground/70 leading-relaxed mb-12 max-w-2xl">
          Thanks for reaching out. You'll get a confirmation email in the next couple of minutes.
          Here's exactly what happens next.
        </p>

        <ol className="space-y-8 mb-14">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-sm bg-foreground/5 text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground mb-1">
                  {i + 1}. {step.title}
                </h2>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="border-t border-foreground/10 pt-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            While you wait
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/presale-guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-colors"
            >
              Read the presale buyer's guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-foreground/15 text-foreground hover:bg-foreground/5 font-semibold transition-colors"
            >
              Browse buyer articles
            </Link>
          </div>
          <p className="text-sm text-foreground/60 mt-6">
            Need to reach me sooner? Call <a className="underline" href="tel:+17782313592">(778) 231-3592</a> or
            email <a className="underline" href="mailto:info@meetuzair.com">info@meetuzair.com</a>.
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default BookingConfirmed;
