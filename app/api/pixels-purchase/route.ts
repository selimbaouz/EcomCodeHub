import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface PurchasePayload {
  eventTime: number;
  eventSourceUrl: string;
  fbPixelId: string;
  tiktokPixelId: string;
  value: number | string;
  currency: string;
  content_ids: string[];
  email?: string | null;
  fbp?: string;
}

interface FbUserData {
  em?: string[];
  fbp?: string;
  client_ip_address?: string;
}

export async function POST(req: NextRequest) {
  const {
    eventTime,
    eventSourceUrl,
    fbPixelId,
    tiktokPixelId,
    value,
    currency,
    content_ids,
    email,
    fbp,
  }: PurchasePayload = await req.json();

  const ip: string | undefined =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const tokenFB = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const tokenTiktok = process.env.TIKTOK_PIXEL_EVENT_ACCESS_TOKEN;

  if (!tokenFB || !tokenTiktok || !fbPixelId || !tiktokPixelId) {
    return NextResponse.json({ error: "Missing access token or pixel id" }, { status: 400 });
  }

  // Facebook user data
  const user_data: FbUserData = {};
  if (email) user_data.em = [crypto.createHash("sha256").update(email).digest("hex")];
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;

  const fbPayload = {
    data: [
      {
        event_name: "Purchase",
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data,
        custom_data: {
          value,
          currency,
          content_ids,
        },
      },
    ],
  };

  const tiktokPayload = {
    pixel_code: tiktokPixelId,
    event: "Purchase",
    timestamp: Math.floor(eventTime),
    properties: {
      content_ids,
      currency,
      value,
      email,
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
      headers: { "Content-Type": "application/json", "Access-Token": tokenTiktok },
      body: JSON.stringify(tiktokPayload),
    });
    const tiktokData = await tiktokRes.json();

    return NextResponse.json({ facebook: fbData, tiktok: tiktokData }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error", details: err }, { status: 500 });
  }
}
