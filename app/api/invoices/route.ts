import { NextResponse } from "next/server";
import { getUserInvoices } from "@/actions/order";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lastInvoiceId = searchParams.get("lastInvoiceId");

  const newInvoices = await getUserInvoices(20, lastInvoiceId ?? undefined);
  return NextResponse.json(newInvoices);
}
