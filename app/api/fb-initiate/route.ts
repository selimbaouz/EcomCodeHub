import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface FbInitiateCheckoutPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  email?: string | null;
  pixelId: string;
  value: number | string;
  currency: string;
  content_ids: string[];
  num_items: number;
  fbp?: string;
}

interface FbUserData {
  em?: string[];
  fbp?: string;
  client_user_agent?: string;
  client_ip_address?: string;
}

// TypeScript ou JS standard
export async function POST(req: NextRequest) {
  const { eventTime, eventSourceUrl, userAgent, email, pixelId, value, currency, content_ids, num_items, fbp }: FbInitiateCheckoutPayload = await req.json();
  const token = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const apiVersion = "v19.0";

 const ip: string | undefined =
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!token || !pixelId) {
    return NextResponse.json({ error: "Token or PixelID missing" }, { status: 400 });
  }
  
  const user_data: FbUserData = {};
    if(email) {
    user_data.em = [crypto.createHash("sha256").update(email).digest("hex")];
    }
    if (fbp) {
    user_data.fbp = fbp;
    }
    if (userAgent) {
    user_data.client_user_agent = userAgent; // <------
    }  
    if (ip) user_data.client_ip_address = ip;

  const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${token}`;
  const payload = {
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
        }
      }
    ]
  };

  try {
    const fbRes = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": userAgent
     },
      body: JSON.stringify(payload)
    });
    const data = await fbRes.json();
    return NextResponse.json(data, { status: fbRes.ok ? 200 : 500 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error", err }, { status: 500 });
  }
}
