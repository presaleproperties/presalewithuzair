import { useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/meetuzair/30min";

export const useCalendly = () => {
  const openCalendly = useCallback((prefill?: { name?: string; email?: string }) => {
    let url = CALENDLY_URL;
    
    // Add prefill parameters if provided
    const params = new URLSearchParams();
    if (prefill?.name) params.set("name", prefill.name);
    if (prefill?.email) params.set("email", prefill.email);
    
    const paramString = params.toString();
    if (paramString) {
      url += `?${paramString}`;
    }
    
    window.open(url, "_blank");
  }, []);

  return { openCalendly };
};
