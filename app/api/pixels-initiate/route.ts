import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface InitiateCheckoutPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  fbPixelId: string;
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
    value,
    currency,
    content_ids,
    num_items,
    email,
    fbp,
  }: InitiateCheckoutPayload = await req.json();

  const tokenFB = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const ip: string | undefined = req.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  if (!tokenFB || !fbPixelId) {
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
