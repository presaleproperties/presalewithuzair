import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-ADVICE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const { email, firstName, lastName, phone, problemDescription, selectedDate, selectedTime } = await req.json();
    logStep("Received lead data", { email, firstName, selectedDate, selectedTime });

    if (!email || !firstName) {
      throw new Error("Missing required fields: email, firstName");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId: string | undefined;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer with metadata
      const newCustomer = await stripe.customers.create({
        email,
        name: firstName,
        phone,
        metadata: {
          firstName,
          problemDescription: problemDescription || '',
          selectedDate: selectedDate || '',
          selectedTime: selectedTime || '',
          leadSource: 'paid-advice-booking',
        }
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    // Build success URL with booking details
    const successParams = new URLSearchParams({
      name: firstName,
      date: selectedDate || '',
      time: selectedTime || '',
      email: email,
    });

    // Create checkout session for paid advice
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: "price_1SkL9hP6aNlJxy2yvWVXUvsv", // $250 CAD Expert Presale Advice Consultation
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?${successParams.toString()}`,
      cancel_url: `${req.headers.get("origin")}/book?canceled=true`,
      metadata: {
        firstName,
        phone,
        email,
        problemDescription: problemDescription || '',
        selectedDate: selectedDate || '',
        selectedTime: selectedTime || '',
        leadType: 'paid-advice',
      }
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
