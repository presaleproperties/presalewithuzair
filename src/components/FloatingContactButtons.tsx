import { MessageCircle, Calendar } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20presale%20condos.%20Can%20we%20chat%3F";
const CALENDLY_URL = "https://calendly.com/uzairmuhammad";

export const FloatingContactButtons = () => {
  return (
    <>
      {/* Floating WhatsApp — visible on all viewports, sits above mobile sticky bar */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Uzair on WhatsApp"
        className="fixed right-5 bottom-24 md:bottom-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366", zIndex: 9999 }}
      >
        <MessageCircle className="h-7 w-7 text-white" fill="white" strokeWidth={0} />
        <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: "#25D366", opacity: 0.35 }} />
      </a>

      {/* Mobile sticky bottom bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 grid grid-cols-2"
        style={{ backgroundColor: "#1a1a1a", zIndex: 9998 }}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 text-white text-sm font-semibold border-r border-white/10 active:bg-white/5"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </a>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 text-white text-sm font-semibold active:bg-white/5"
        >
          <Calendar className="h-5 w-5" /> Book a Call
        </a>
      </div>

      {/* Spacer so mobile sticky bar never covers content */}
      <div className="md:hidden h-14" aria-hidden="true" />
    </>
  );
};
