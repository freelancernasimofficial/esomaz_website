"use server";

import Model from "@/model/Model";

export default async function getSingleUserByuuId(uuId: any) {
  const [user] = await Model.prepare(
    `SELECT id FROM Users WHERE username=? OR uuId=?`,
    [uuId, uuId],
  );

  return user;
}
