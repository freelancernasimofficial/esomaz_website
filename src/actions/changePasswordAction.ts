"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import Model from "@/model/Model";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
export default async function changePasswordAction(formData: any) {
  try {
    const currentUser = await auth();
    const currentPassword = formData.get("current_password");
    const newPassword = formData.get("new_password");
    const confirmPassword = formData.get("confirm_password");

    if (
      !currentPassword?.length ||
      !confirmPassword?.length ||
      !newPassword?.length
    ) {
      throw new Error("Fields cannot be empty");
    }

    if (newPassword?.length < 6 || newPassword?.length > 12) {
      throw new Error("Password must be in 6-12 characters");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Confirm Password Doesn't Match!");
    }

    const [{ password }] = await Model.prepare(
      "SELECT password FROM Users WHERE id=?",
      [currentUser?.id],
    );
    const checkPassword: any = await bcrypt.compare(
      //@ts-ignore
      currentPassword,
      password,
    );

    if (!checkPassword) {
      throw new Error("Current Password Doesn't Match!");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const addNewPassword = await Model.prepare(
      `UPDATE Users SET password=? WHERE id=?`,
      [hashPassword, currentUser?.id],
    );

    CookieStore.setState("success", "Password changed successfully");
    revalidatePath("/");
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
