"use server";

import CookieStore from "@/library/CookieStore";

export default async function mainCommentReplyButtonAction(commentId: number) {
  CookieStore.setState("mcr_id", commentId);
}
