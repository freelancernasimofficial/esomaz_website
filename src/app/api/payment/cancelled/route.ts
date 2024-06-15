import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  return new Response(
    `<meta http-equiv="refresh" content="0; url=/account/payments/deposits/deposit/process/cancelled" />`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}
