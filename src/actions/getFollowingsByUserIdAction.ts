"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getFollowingsByUserIdAction(userId: number) {
  const followings = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "F.userId",
    )}) AS User FROM Followers F WHERE F.followerId=${userId} ORDER BY F.id DESC`,
  );
  return followings;
}
