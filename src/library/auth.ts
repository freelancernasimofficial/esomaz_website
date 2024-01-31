import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Model from "../model/Model";
type SessionType =
  | {
      id: number;
      uuId: string;
      username: string;
      avatarId: string;
      firstName: string;
      lastName: string;
      subtitle: string;
      email: string;
    }
  | undefined;

export default async function auth(): Promise<SessionType> {
  const token = cookies().get("__jwtsession")?.value;
  try {
    //@ts-ignore
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Model.prepare(
      "SELECT id,uuId,username,firstName,lastName,subtitle,avatarId,email FROM Users WHERE id=?",
      [decoded.id],
    );

    return user[0];
  } catch (error) {
    return undefined;
  }
}
