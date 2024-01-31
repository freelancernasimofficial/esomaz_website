import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import Model from "@/model/Model";
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    //@ts-ignore
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const checkUser = await Model.prepare(`SELECT * FROM Users WHERE id=?`, [
      decode.id,
    ]);
    return Response.json({
      authorized: true,
      user: {
        id: checkUser[0].id,
        username: checkUser[0].username,
        fname: checkUser[0].fname,
        lname: checkUser[0].lname,
        email: checkUser[0].email,
      },
    });
  } catch (error) {
    return Response.json({ authorized: false, user: undefined });
  }
}
