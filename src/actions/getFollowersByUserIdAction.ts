"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getFollowersByUserIdAction(userId: number) {
  const followers = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "F.followerId",
    )}) AS User FROM Followers F WHERE F.userId=${userId} ORDER BY F.id DESC`,
  );
  return followers;
}
