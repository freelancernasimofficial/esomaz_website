"use server";

import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function seenAllNotificationsAction() {
  const currentUser = await auth();
  await Model.prepare(
    `UPDATE Notifications SET isSeen=? WHERE isSeen=? AND receiverUserId=?`,
    [true, false, currentUser?.id],
  );

  revalidatePath("/");
}
