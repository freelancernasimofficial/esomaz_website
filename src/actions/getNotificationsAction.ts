"use server";

import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function getNotificationsAction() {
  const currentUser = await auth();
  const notifications = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "N.senderUserId",
    )}) AS SenderUser,(SELECT JSON_OBJECT('id',NP.id,'uuId',NP.uuId) FROM Posts NP WHERE id=N.postId) AS Post FROM Notifications N WHERE receiverUserId=${
      currentUser?.id
    } ORDER BY id DESC LIMIT 200`,
  );
  await Model.prepare(
    `UPDATE Notifications SET isSeen=? WHERE isSeen=? AND receiverUserId=?`,
    [true, false, currentUser?.id],
  );
  revalidatePath("/");
  return notifications;
}

export async function getTotalNotifications() {
  const currentUser = await auth();
  const [countNotifications] = await Model.query(
    `SELECT COUNT(*) AS total FROM Notifications WHERE receiverUserId=${currentUser?.id} AND isSeen=0`,
  );

  return countNotifications?.total;
}
