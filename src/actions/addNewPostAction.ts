"use server";

import { revalidatePath } from "next/cache";

export default async function addNewPostAction(
  prevState: any,
  formData: FormData,
) {
  try {
    const files = formData.getAll("file");
    const text = formData.get("text");
    console.log(files);
    console.log(text);

    revalidatePath("/");

    return {
      status: true,
      message: "Post submitted successfully",
    };
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
    };
  }
}
