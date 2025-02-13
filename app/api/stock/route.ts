import { NextResponse } from "next/server";
import { fetchStock } from "@/actions/actions";

export async function GET() {
  const stock = await fetchStock();
  return Response.json(stock);
}
