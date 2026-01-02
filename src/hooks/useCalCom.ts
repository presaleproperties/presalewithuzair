import { useEffect, useCallback } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_USERNAME = "uzair-muhammad-fcjyok";
const CAL_EVENT_SLUG = "quick-call";

export const useCalCom = () => {
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
  }, []);

  return { openCalCom, calLink: `${CAL_USERNAME}/${CAL_EVENT_SLUG}`, Cal };
};

export { Cal };
