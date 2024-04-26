"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getFriendsByUserIdAction(userId: number) {
  const friends = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "F.senderUserId",
    )}) AS Friend FROM Friends F WHERE F.receiverUserId=${userId} AND F.isAccepted=${true} ORDER BY F.id DESC LIMIT 5`,
  );
  return friends;
}
