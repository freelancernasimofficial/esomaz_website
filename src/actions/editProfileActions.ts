"use server";

import CookieStore from "@/library/CookieStore";
import { revalidatePath } from "next/cache";

export async function changeBasicInfoAction(formData: any) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const subtitle = formData.get("subtitle");
    const phone = formData.get("phone");

    if (
      !firstName?.length ||
      !lastName?.length ||
      !phone?.length ||
      !subtitle?.length
    ) {
      throw new Error("Fields cannot be empty");
    }

    CookieStore.setState("basicSuccess", "Profile Updated");
    revalidatePath("/");
  } catch (error: any) {
    CookieStore.setState("basicError", error?.message);
  }
}
