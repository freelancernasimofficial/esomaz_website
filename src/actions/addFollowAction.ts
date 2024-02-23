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
  revalidatePath("/");
}
