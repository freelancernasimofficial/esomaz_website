import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Model from "../model/Model";
type SessionType =
  | {
      id: number;
      username: string;
      avatar: string;
      fname: string;
      lname: string;
      email: string;
      role: string;
    }
  | undefined;

export default async function auth(): Promise<SessionType> {
  const token = cookies().get("__jwtsession")?.value;
  if (token) {
    try {
      //@ts-ignore
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
      const user = await Model.prepare(
        "SELECT id,username,fname,lname,avatar,email,role FROM users WHERE id=?",
        [decoded.id],
      );

      return user[0];
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
}
