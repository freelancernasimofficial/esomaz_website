import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(request);

  return NextResponse.json({ status: true, message: "Success" });
}
