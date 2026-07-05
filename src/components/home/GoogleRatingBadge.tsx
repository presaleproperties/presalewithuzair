import { Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const REVIEWS_URL =
  "https://www.google.com/search?q=Uzair+Muhammad+Vancouver+Presale+Expert+reviews";

interface Props {
  className?: string;
  variant?: "light" | "dark";
}

export const GoogleRatingBadge = ({ className = "", variant = "dark" }: Props) => {
  const { data } = useGoogleReviews();
  const rating = data?.overallRating ?? 4.9;
  const count = data?.totalReviews ?? 36;

  const text = variant === "dark" ? "text-foreground" : "text-foreground";
  const sub = variant === "dark" ? "text-foreground/60" : "text-foreground/70";

  return (
    <a
      href={REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${rating} stars from ${count} Google reviews`}
      className={`inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm px-3 py-1.5 hover:border-foreground/30 transition-colors ${className}`}
    >
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
      <span className={`text-sm font-semibold ${text}`}>{rating.toFixed(1)}</span>
      <span className={`text-xs ${sub}`}>from {count} Google reviews</span>
    </a>
  );
};
