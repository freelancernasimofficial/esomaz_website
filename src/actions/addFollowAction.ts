"use server";

import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function addFollowAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare("INSERT INTO Followers (followerId,userId)VALUES(?,?)", [
    currentUser?.id,
    userId,
  ]);
  //notify
  await Model.prepare(
    "INSERT INTO Notifications (actionType,senderUserId,receiverUserId)VALUES(?,?,?)",
    ["FOLLOW", currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function unFollowAction(userId: number, formData: any) {
  const currentUser = await auth();

  await Model.prepare(
    "DELETE  FROM Followers WHERE followerId=? AND userId=?",
    [currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function followBackAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare("INSERT INTO Followers (followerId,userId)VALUES(?,?)", [
    currentUser?.id,
    userId,
  ]);
  //notify the user
  await Model.prepare(
    "INSERT INTO Notifications (actionType,senderUserId,receiverUserId)VALUES(?,?,?)",
    ["FOLLOW_BACK", currentUser?.id, userId],
  );
  revalidatePath("/");
}
