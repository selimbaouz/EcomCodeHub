import { NextRequest, NextResponse } from "next/server";

interface AddToCartPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  fbPixelId: string;
  tiktokPixelId: string;
  tiktokAccessToken: string; // Jeton d'accès TikTok à fournir en ENV ou via le body
  content_ids: string[];
  content_name: string;
  content_type: string;
  value: number | string;
  currency: string;
  fbp?: string;
}

interface FbUserData {
  client_user_agent?: string;
  fbp?: string;
  client_ip_address?: string;
}

// Pas besoin d’email ici, même raison que pour InitiateCheckout.
export async function POST(req: NextRequest) {
  const {
    eventTime,
    eventSourceUrl,
    userAgent,
    fbPixelId,
    tiktokPixelId,
    content_ids,
    content_name,
    content_type,
    value,
    currency,
    fbp,
  }: AddToCartPayload  = await req.json();

    const ip: string | undefined =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  // --- Tokens depuis les variables d'environnement ---
  const tokenFB = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const tokenTiktok = process.env.TIKTOK_PIXEL_EVENT_ACCESS_TOKEN;

  // --- Validation des paramètres ---
  if (!tokenFB || !tokenTiktok || !fbPixelId || !tiktokPixelId) {
    return NextResponse.json(
      { error: "Missing access token or pixel id" },
      { status: 400 }
    );
  }

  const user_data: FbUserData = {};
  if (userAgent) user_data.client_user_agent = userAgent;
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;


 // Payload Facebook
  const fbPayload = {
    data: [
      {
        event_name: "AddToCart",
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data,
        custom_data: {
          content_ids,
          content_name,
          content_type,
          value,
          currency,
        },
      },
    ],
  };

  // Payload TikTok Events API
    const tiktokPayload = {
    pixel_code: tiktokPixelId,
    event: "AddToCart",
    timestamp: Math.floor(eventTime), // s, TikTok accepte aussi ISO
    properties: {
      content_ids,
      content_name,
      content_type,
      currency,
      value,
    },
  };

      // --- Endpoints ---
  const fbApiVersion = "v19.0";
  const fbEndpoint = `https://graph.facebook.com/${fbApiVersion}/${fbPixelId}/events?access_token=${tokenFB}`;
  const tiktokEndpoint = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

  try {
    // Facebook API Call
    const fbRes = await fetch(fbEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fbPayload),
    });
    const fbData = await fbRes.json();

    // TikTok API Call
    const tiktokRes = await fetch(tiktokEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": tokenTiktok,
      },
      body: JSON.stringify(tiktokPayload),
    });
    const tiktokData = await tiktokRes.json();

    // Renvoie les deux réponses (debug)
    return NextResponse.json(
      { facebook: fbData, tiktok: tiktokData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
