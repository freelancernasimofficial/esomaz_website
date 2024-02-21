"use server";

import CookieStore from "@/library/CookieStore";

export default async function replyCommentReplyButtonAction(commentId: number) {
  CookieStore.setState("rcr_id", commentId);
}
