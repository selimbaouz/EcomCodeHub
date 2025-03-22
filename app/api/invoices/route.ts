import { NextResponse } from "next/server";
import { getUserInvoices } from "@/actions/order";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lastInvoiceId = searchParams.get("lastInvoiceId");

  const newInvoices = await getUserInvoices({limit: 20, lastInvoiceId: lastInvoiceId ?? undefined});
  if (!Array.isArray(newInvoices?.data)) {
    return NextResponse.json([], { status: 500 });
  }
  return NextResponse.json(newInvoices.data);
}
