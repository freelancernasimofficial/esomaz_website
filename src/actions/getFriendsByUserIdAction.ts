"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getFriendsByUserIdAction(
  userId: number,
  limit?: number,
) {
  const friends = await Model.query(
    `SELECT *,(SELECT JSON_OBJECT('id',U.id,'uuId',U.uuId,'firstName',U.firstName,'lastName',U.lastName,'avatar',(SELECT AV.filename FROM Photos AV WHERE AV.id=U.avatarId)) FROM Users U WHERE U.id=IF(F.senderUserId=${userId},F.receiverUserId,F.senderUserId)) AS Friend FROM Friends F WHERE F.senderUserId=${userId} OR F.receiverUserId=${userId} AND F.isAccepted=true ORDER BY F.id DESC ${
      limit ? `LIMIT ${limit}` : ""
    }`,
  );
  return friends;
}
