import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Model from "../model/Model";
type SessionType =
  | {
      id: number;
      uuId: string;
      username: string;
      firstName: string;
      lastName: string;
      subtitle: string;
      email: string;
      avatar: string;
      totalNotifications: number;
    }
  | undefined;

export default async function auth(): Promise<SessionType> {
  const token = cookies().get("__jwtsession")?.value;
  try {
    //@ts-ignore
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Model.prepare(
      "SELECT U.id,U.uuId,U.username,U.firstName,U.lastName,U.subtitle,U.email,(SELECT filename FROM Photos AV WHERE AV.id=U.avatarId) AS avatar,(SELECT COUNT(*) FROM Notifications N WHERE N.isSeen=false AND N.receiverUserId=U.id) AS totalNotifications FROM Users U WHERE U.id=?",
      [decoded.id],
    );

    return user[0];
  } catch (error) {
    return undefined;
  }
}
