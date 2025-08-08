import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface InitiateCheckoutPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  fbPixelId: string;
  tiktokPixelId: string;
  value: number | string;
  currency: string;
  content_ids: string[];
  num_items: number;
  email?: string | null;
  fbp?: string;
}

interface FbUserData {
  em?: string[];
  fbp?: string;
  client_user_agent?: string;
  client_ip_address?: string;
}

export async function POST(req: NextRequest) {
  const {
    eventTime,
    eventSourceUrl,
    userAgent,
    fbPixelId,
    tiktokPixelId,
    value,
    currency,
    content_ids,
    num_items,
    email,
    fbp,
  }: InitiateCheckoutPayload = await req.json();

  const tokenFB = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const tokenTiktok = process.env.TIKTOK_PIXEL_EVENT_ACCESS_TOKEN;
  const ip: string | undefined =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!tokenFB || !tokenTiktok || !fbPixelId || !tiktokPixelId) {
    return NextResponse.json(
      { error: "Missing access token or pixel id" },
      { status: 400 }
    );
  }

  // User Data pour Facebook
  const user_data: FbUserData = {};
  if (email)
    user_data.em = [crypto.createHash("sha256").update(email).digest("hex")];
  if (fbp) user_data.fbp = fbp;
  if (userAgent) user_data.client_user_agent = userAgent;
  if (ip) user_data.client_ip_address = ip;

  // Facebook payload
  const fbPayload = {
    data: [
      {
        event_name: "InitiateCheckout",
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data,
        custom_data: {
          value,
          currency,
          content_ids,
          num_items,
        },
      },
    ],
  };

  // TikTok payload
  const tiktokPayload = {
    pixel_code: tiktokPixelId,
    event: "InitiateCheckout",
    timestamp: Math.floor(eventTime),
    properties: {
      content_ids,
      content_name: Array.isArray(content_ids) ? content_ids.join(",") : undefined,
      content_type: "product",
      currency,
      value,
      num_items,
    },
  };

  const fbApiVersion = "v19.0";
  const fbEndpoint = `https://graph.facebook.com/${fbApiVersion}/${fbPixelId}/events?access_token=${tokenFB}`;
  const tiktokEndpoint = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

  try {
    // Facebook API call
    const fbRes = await fetch(fbEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fbPayload),
    });
    const fbData = await fbRes.json();

    // TikTok API call
    const tiktokRes = await fetch(tiktokEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": tokenTiktok,
      },
      body: JSON.stringify(tiktokPayload),
    });
    const tiktokData = await tiktokRes.json();

    // Renvoie les résultats des deux trackers (debug/log)
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
