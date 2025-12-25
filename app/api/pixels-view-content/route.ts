import { NextRequest, NextResponse } from "next/server";

interface ViewContentPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  fbPixelId: string;
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
    content_ids,
    content_name,
    content_type,
    value,
    currency,
    fbp,
  }: ViewContentPayload = await req.json();

  const ip: string | undefined = req.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  const tokenFB = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;

  if (!tokenFB || !fbPixelId) {
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

  const fbApiVersion = "v19.0";
  const fbEndpoint = `https://graph.facebook.com/${fbApiVersion}/${fbPixelId}/events?access_token=${tokenFB}`;

  try {
    // Facebook API call
    const fbRes = await fetch(fbEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fbPayload),
    });
    const fbData = await fbRes.json();

    return NextResponse.json({ facebook: fbData }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
