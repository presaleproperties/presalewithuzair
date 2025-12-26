import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_API_KEY');
    const placeId = Deno.env.get('GOOGLE_PLACE_ID');

    if (!apiKey || !placeId) {
      console.error('Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID');
      throw new Error('Google API credentials not configured');
    }

    console.log('Fetching reviews for place:', placeId);

    // Fetch place details including reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    console.log('Google API response status:', data.status);

    if (data.status !== 'OK') {
      console.error('Google API error:', data.status, data.error_message);
      throw new Error(`Google API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    const result = data.result;
    const reviews = result.reviews?.map((review: any) => ({
      authorName: review.author_name,
      authorPhoto: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      time: review.time,
      relativeTime: review.relative_time_description,
    })) || [];

    console.log(`Found ${reviews.length} reviews`);

    return new Response(JSON.stringify({
      businessName: result.name,
      overallRating: result.rating,
      totalReviews: result.user_ratings_total,
      reviews,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching Google reviews:', errorMessage);
    return new Response(JSON.stringify({ 
      error: errorMessage,
      reviews: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
