import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalendarEventRequest {
  leadId: string;
  firstName: string;
  email: string;
  phone: string;
  leadType: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g., "11:00 AM"
}

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceAccountKey = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID");

    if (!serviceAccountKey || !calendarId) {
      console.error("Missing Google Calendar configuration");
      return new Response(
        JSON.stringify({ error: "Calendar integration not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const eventData: CalendarEventRequest = await req.json();
    console.log("Creating calendar event for:", eventData.firstName, eventData.preferredDate, eventData.preferredTime);

    // Parse the service account key
    const serviceAccount = JSON.parse(serviceAccountKey);

    // Create JWT for Google API authentication
    const header = { alg: "RS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    // Encode JWT parts
    const encoder = new TextEncoder();
    const toBase64Url = (str: string) =>
      btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    const headerB64 = toBase64Url(JSON.stringify(header));
    const claimB64 = toBase64Url(JSON.stringify(claim));
    const signatureInput = `${headerB64}.${claimB64}`;

    // Import private key and sign
    const pemContents = serviceAccount.private_key
      .replace(/-----BEGIN PRIVATE KEY-----/g, "")
      .replace(/-----END PRIVATE KEY-----/g, "")
      .replace(/\s/g, "");

    const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      binaryKey,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      encoder.encode(signatureInput)
    );

    const signatureB64 = toBase64Url(
      String.fromCharCode(...new Uint8Array(signature))
    );

    const jwt = `${signatureInput}.${signatureB64}`;

    // Exchange JWT for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error("Token exchange failed:", tokenError);
      throw new Error("Failed to authenticate with Google");
    }

    const { access_token } = await tokenResponse.json();

    // Build event datetime
    const time24 = convertTo24Hour(eventData.preferredTime);
    const startDateTime = `${eventData.preferredDate}T${time24}:00`;
    
    // Calculate end time (30 minutes later)
    const [startHour, startMin] = time24.split(":").map(Number);
    let endHour = startHour;
    let endMin = startMin + 30;
    if (endMin >= 60) {
      endHour += 1;
      endMin -= 60;
    }
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMin.toString().padStart(2, "0")}`;
    const endDateTime = `${eventData.preferredDate}T${endTime}:00`;

    // Determine event title based on lead type
    const leadTypeLabels: Record<string, string> = {
      "buy-presale": "Presale Buyer Call",
      "sell-assignment": "Assignment Seller Call",
      "paid-advice": "Paid Advisory Session",
    };
    const eventTitle = `${leadTypeLabels[eventData.leadType] || "Call"} - ${eventData.firstName}`;

    // Create calendar event
    const calendarEvent = {
      summary: eventTitle,
      description: `Lead: ${eventData.firstName}\nEmail: ${eventData.email}\nPhone: ${eventData.phone}\nType: ${eventData.leadType}\n\nBooked via presalewithuzair.com`,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Vancouver",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Vancouver",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 30 },
          { method: "email", minutes: 60 },
        ],
      },
    };

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendarEvent),
      }
    );

    if (!calendarResponse.ok) {
      const calendarError = await calendarResponse.text();
      console.error("Calendar API error:", calendarError);
      throw new Error("Failed to create calendar event");
    }

    const createdEvent = await calendarResponse.json();
    console.log("Calendar event created:", createdEvent.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        eventId: createdEvent.id,
        eventLink: createdEvent.htmlLink 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Calendar event creation error:", message);
    return new Response(
      JSON.stringify({ error: "Failed to schedule appointment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
