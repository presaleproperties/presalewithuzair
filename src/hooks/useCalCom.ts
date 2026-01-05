import { useEffect, useCallback, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_USERNAME = "presalewithuzair";
const CAL_EVENT_SLUG = "meeting";

export const useCalCom = () => {
  const [isCalLoading, setIsCalLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#d4a853" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  const openCalCom = useCallback(async (prefill?: { name?: string; email?: string }) => {
    setIsCalLoading(true);
    try {
      const cal = await getCalApi();
      cal("modal", {
        calLink: `${CAL_USERNAME}/${CAL_EVENT_SLUG}`,
        config: {
          layout: "month_view",
          theme: "dark",
          ...(prefill?.name && { name: prefill.name }),
          ...(prefill?.email && { email: prefill.email }),
        },
      });
      // Give modal time to render before hiding loading
      setTimeout(() => setIsCalLoading(false), 1000);
    } catch (error) {
      console.error("Error opening Cal.com:", error);
      setIsCalLoading(false);
    }
  }, []);

  return { openCalCom, isCalLoading, calLink: `${CAL_USERNAME}/${CAL_EVENT_SLUG}`, Cal };
};

export { Cal };
