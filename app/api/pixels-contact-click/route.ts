import { NextRequest, NextResponse } from "next/server";

// Types du payload
interface ContactClickPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  fbPixelId: string;
  tiktokPixelId: string;
  fbp?: string;
}

interface FbUserData {
  client_user_agent?: string;
  fbp?: string;
  client_ip_address?: string;
}

export async function POST(req: NextRequest) {
  const {
    eventTime,
    eventSourceUrl,
    userAgent,
    fbPixelId,
    tiktokPixelId,
    fbp,
  }: ContactClickPayload = await req.json();

  const ip: string | undefined =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const tokenFB = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const tokenTiktok = process.env.TIKTOK_PIXEL_EVENT_ACCESS_TOKEN;

  if (!tokenFB || !tokenTiktok || !fbPixelId || !tiktokPixelId) {
    return NextResponse.json(
      { error: "Missing access token or pixel id" },
      { status: 400 }
    );
  }

  // User Data Facebook
  const user_data: FbUserData = {};
  if (userAgent) user_data.client_user_agent = userAgent;
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;

  // FACEBOOK payload
  const fbPayload = {
    data: [
      {
        event_name: "Contact",
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data,
        custom_data: {
          page: 'contact',
        },
      },
    ],
  };

  // TIKTOK payload
  const tiktokPayload = {
    pixel_code: tiktokPixelId,
    event: "Contact", // tu peux aussi mettre Lead pour TikTok, selon la nomenclature
    timestamp: Math.floor(eventTime),
    properties: {
      content_id: 'contact',
      content_type: 'action',
      content_name: 'Contact Click',
      value: 0,
      currency: 'EUR',
      description: eventSourceUrl,
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
