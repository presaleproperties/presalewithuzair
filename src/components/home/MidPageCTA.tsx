import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MidPageCTAProps {
  quote?: string;
}

export const MidPageCTA = ({ quote }: MidPageCTAProps) => {
  const navigate = useNavigate();
  
  const handleBookClick = () => {
    navigate("/book");
  };

  return (
    <section className="py-12 sm:py-16 bg-card">
      <div className="container-xl px-4 sm:px-6 text-center">
        {quote && (
          <p className="text-lg sm:text-xl text-foreground/80 italic mb-6 max-w-2xl mx-auto">
            "{quote}"
          </p>
        )}
        <Button 
          variant="outline"
          size="lg"
          className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold"
          onClick={handleBookClick}
        >
          Book a Discovery Call
        </Button>
      </div>
    </section>
  );
};