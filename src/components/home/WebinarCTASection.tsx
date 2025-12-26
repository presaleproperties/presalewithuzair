import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import meetingImage from "@/assets/business-meeting.jpeg";

export const WebinarCTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative image-reveal rounded-2xl overflow-hidden order-2 lg:order-1">
            <img
              src={meetingImage}
              alt="Presale Webinar with Uzair"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-primary rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary-foreground" />
                <div>
                  <p className="text-xs text-primary-foreground/80">Next Session</p>
                  <p className="font-semibold text-primary-foreground">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="section-label mb-4">Free Training</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Join the Next <span className="text-gradient">Presale Webinar</span>
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Get exclusive insights into Vancouver's presale market directly from Uzair. 
              Learn how to identify undervalued projects, negotiate better deals, and build 
              a profitable real estate portfolio.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Live Q&A with Uzair
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Exclusive market insights
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                First access to new project launches
              </li>
            </ul>
            
            <Button variant="hero" size="xl" className="gap-2" asChild>
              <a href="https://presalewithuzair.com/en/webinar-registeration-page" target="_blank" rel="noopener noreferrer">
                Join the Waitlist
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
