"use server";

import Model from "@/model/Model";

export default async function getSingleUserByuuId(uuId: any) {
  const [user] = await Model.prepare(
    `SELECT U.id,U.uuId,U.firstName,U.lastName,U.username,U.subtitle,U.phone,U.isVerified,(SELECT filename FROM Photos WHERE id=U.avatarId) AS avatar FROM Users U WHERE U.username=? OR U.uuId=? OR U.id=?`,
    [uuId, uuId, uuId],
  );

  return user;
}
