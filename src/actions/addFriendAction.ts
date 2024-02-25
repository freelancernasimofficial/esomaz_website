"use server";

import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function addFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "INSERT INTO Friends (senderUserId,receiverUserId)VALUES(?,?)",
    [currentUser?.id, userId],
  );
  revalidatePath("/");
}
export async function unFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE senderUserId=? and receiverUserId=?",
    [currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function rejectFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE senderUserId=? AND receiverUserId=?",
    [userId, currentUser?.id],
  );
  revalidatePath("/");
}
