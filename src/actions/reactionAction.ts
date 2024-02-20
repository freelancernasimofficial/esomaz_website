"use server";

export default async function reactionAction(formData: any) {
  const reactionType = formData.get("reactionType");

  console.log(reactionType);
}
