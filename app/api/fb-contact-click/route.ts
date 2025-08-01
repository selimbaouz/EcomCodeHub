import { NextRequest, NextResponse } from "next/server";

// Types du payload (pas d'email/produit, logique navigation)
interface FbContactClickPayload {
  eventTime: number;
  eventSourceUrl: string;
  userAgent: string;
  pixelId: string;
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
    pixelId,
    fbp,
  }: FbContactClickPayload = await req.json();

   const ip: string | undefined =
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const token = process.env.FB_PIXEL_EVENT_ACCESS_TOKEN;
  const apiVersion = "v19.0";
  if (!token || !pixelId) {
    return NextResponse.json({ error: "Token or PixelID missing" }, { status: 400 });
  }

  const user_data: FbUserData = {};
  if (userAgent) user_data.client_user_agent = userAgent;
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;

  // Tu peux nommer l'événement comme "Contact", ou "ContactClick", ou "Lead"
  // Ici on garde "Contact" pour la clarté Meta
  const payload = {
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

  try {
    const fbRes = await fetch(
      `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await fbRes.json();
    return NextResponse.json(data, { status: fbRes.ok ? 200 : 500 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error", err }, { status: 500 });
  }
}
