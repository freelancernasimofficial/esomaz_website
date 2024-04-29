"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Model from "../model/Model";
export type SessionType =
  | {
      id: number;
      uuId: string;
      username: string;
      firstName: string;
      lastName: string;
      subtitle: string;
      email: string;
      avatar: string;
      isVerified: boolean;
    }
  | undefined;

export default async function auth(): Promise<SessionType> {
  const token = cookies().get("__jwtsession")?.value;
  try {
    //@ts-ignore
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Model.prepare(
      "SELECT U.id,U.uuId,U.username,U.firstName,U.lastName,U.subtitle,U.email,U.isVerified,(SELECT filename FROM Photos AV WHERE AV.id=U.avatarId) AS avatar FROM Users U WHERE U.id=?",
      [decoded.id],
    );

    return user[0];
  } catch (error) {
    return undefined;
  }
}
