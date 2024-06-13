"use server";

import SingleNotification from "@/app/notifications/SingleNotification";
import auth from "@/actions/user/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getNotificationsAction({
  limitFrom,
  limitTo,
}: {
  limitFrom: any;
  limitTo: any;
}) {
  try {
    const currentUser = await auth();
    const notifications = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "N.senderUserId",
      )}) AS SenderUser,(SELECT JSON_OBJECT('id',NP.id,'uuId',NP.uuId) FROM Posts NP WHERE id=N.postId) AS Post FROM Notifications N WHERE receiverUserId=${
        currentUser?.id
      } ORDER BY id DESC LIMIT ${limitFrom},${limitTo}`,
    );
    await Model.prepare(
      `UPDATE Notifications SET isSeen=? WHERE isSeen=? AND receiverUserId=?`,
      [true, false, currentUser?.id],
    );

    return notifications?.map((item: any, index: any) => {
      return <SingleNotification item={item} key={item.id} />;
    });
  } catch (error) {
    console.log(error);

    return undefined;
  }
}

export async function getTotalNotifications() {
  const currentUser = await auth();
  const [countNotifications] = await Model.query(
    `SELECT COUNT(*) AS total FROM Notifications WHERE receiverUserId=${currentUser?.id} AND isSeen=0`,
  );

  return countNotifications?.total;
}
