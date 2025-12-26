import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GoogleReview {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  time: number;
  relativeTime: string;
}

export interface GoogleReviewsData {
  businessName: string;
  overallRating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

export function useGoogleReviews() {
  return useQuery({
    queryKey: ["google-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<GoogleReviewsData>(
        "fetch-google-reviews"
      );

      if (error) {
        console.error("Error fetching Google reviews:", error);
        throw error;
      }

      return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: 1,
  });
}
