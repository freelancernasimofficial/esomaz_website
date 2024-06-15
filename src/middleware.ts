import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  if (request.cookies.get("__jwtsession")?.value) {
    if (
      request.url.includes("register") ||
      request.url.includes("login") ||
      request.url.includes("forgot_password")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (request.url.includes("logout")) {
      return NextResponse.next();
    }

    const authReq = await fetch(
      `${process.env.API_URL}/api/authorization/authorize`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${request.cookies.get("__jwtsession")?.value}`,
        },
        credentials: "include",
      },
    );
    const authRes = await authReq.json();
    if (authRes.authorized === false) {
      return NextResponse.redirect(
        new URL("/api/authorization/logout", request.url),
      );
    } else {
      return NextResponse.next();
    }
  } else {
    if (
      request.url.includes("register") ||
      request.url.includes("login") ||
      request.url.includes("forgot_password")
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico|favicon.png|icon.png).*)",
  ],
};
