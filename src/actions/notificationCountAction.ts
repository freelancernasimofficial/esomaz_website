"use server";

import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function notificationsCountAction() {
  const currentUser = await auth();
  const [countNotification] = await Model.query(
    `SELECT COUNT(*) AS total FROM Notifications WHERE receiverUserId=${currentUser?.id}`,
  );
  revalidatePath("/");
  return countNotification;
}
