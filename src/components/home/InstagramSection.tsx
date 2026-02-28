import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export const InstagramSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-card/30 relative overflow-hidden">
      {/* Warm bokeh effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-[15%] w-32 h-32 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-40 h-40 rounded-full bg-orange-300/12 blur-3xl" />
      </div>

      <div className="relative z-10 container-xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 mb-6">
            <Instagram className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground uppercase tracking-tight mb-4">
            Follow Along on <span className="text-gradient">Instagram</span>
          </h2>
          
          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto">
            Get daily presale tips, market insights, and behind-the-scenes access to Vancouver's hottest new developments.
          </p>
          
          <Button
            variant="outline"
            size="lg"
            className="gap-2 rounded-full border-primary/50 hover:bg-primary/10 hover:border-primary"
            asChild
          >
            <a 
              href="https://www.instagram.com/presalewithuzair" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
              @presalewithuzair
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
