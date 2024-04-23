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
  //notify
  await Model.prepare(
    "INSERT INTO Notifications (actionType,receiverUserId,senderUserId)VALUES(?,?,?)",
    ["FRIEND_REQUEST", userId, currentUser?.id],
  );
  revalidatePath("/");
}
export async function cancelFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE senderUserId=? and receiverUserId=?",
    [currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function acceptFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "UPDATE Friends SET isAccepted=? WHERE senderUserId=? AND receiverUserId=?",
    [true, userId, currentUser?.id],
  );

  //notify
  await Model.prepare(
    "INSERT INTO Notifications (actionType,receiverUserId,senderUserId)VALUES(?,?,?)",
    ["CONFIRM_FRIEND_REQUEST", userId, currentUser?.id],
  );
  revalidatePath("/");
}

export async function unFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE (senderUserId=? AND receiverUserId=?) OR (receiverUserId=? AND senderUserId=?) AND isAccepted=?",
    [userId, currentUser?.id, userId, currentUser?.id, true],
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
