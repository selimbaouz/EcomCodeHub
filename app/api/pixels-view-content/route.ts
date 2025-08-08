import { NextRequest, NextResponse } from "next/server";

// Types dédiés pour payload reçu
interface ViewContentPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  fbPixelId: string;
  tiktokPixelId: string;
  content_ids: string[];
  content_name: string;
  content_type: string;
  value?: number | string;
  currency?: string;
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
    content_ids,
    content_name,
    content_type,
    value,
    currency,
    fbp,
  }: ViewContentPayload = await req.json();
  
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

  const user_data: FbUserData = {};
  if (userAgent) user_data.client_user_agent = userAgent;
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;

 // FACEBOOK PAYLOAD
  const fbPayload = {
    data: [
      {
        event_name: "ViewContent",
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data,
        custom_data: {
          content_ids,
          content_name,
          content_type,
          ...(value ? { value } : {}),
          ...(currency ? { currency } : {}),
        },
      },
    ],
  };

  // TIKTOK PAYLOAD
  const tiktokPayload = {
    pixel_code: tiktokPixelId,
    event: "ViewContent",
    timestamp: Math.floor(eventTime),
    properties: {
      content_ids,
      content_name,
      content_type,
      currency,
      ...(value ? { value } : {}),
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
