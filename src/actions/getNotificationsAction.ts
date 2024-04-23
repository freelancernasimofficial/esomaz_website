"use server";

import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getNotificationsAction() {
  const currentUser = await auth();
  const notifications = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "N.senderUserId",
    )}) AS SenderUser,(SELECT JSON_OBJECT('id',NP.id,'uuId',NP.uuId) FROM Posts NP WHERE id=N.postId) AS Post FROM Notifications N WHERE receiverUserId=${
      currentUser?.id
    } ORDER BY id DESC LIMIT 200`,
  );

  return notifications;
}
