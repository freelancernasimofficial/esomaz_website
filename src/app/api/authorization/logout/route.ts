import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  cookies().delete("__jwtsession");
  //@ts-ignore
  return NextResponse.redirect(process.env.API_URL + "/auth/login");
}
