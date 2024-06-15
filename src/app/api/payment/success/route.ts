import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const a = await request.formData();
  console.log(a);

  return new Response(
    `<meta http-equiv="refresh" content="0; url=/account/payments/deposits/deposit/process/success" />`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}
