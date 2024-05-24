"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

type Props = {
  postId: any;
  text: string;
};

export default async function postCommentAction({ postId, text }: Props) {
  const user = await auth();

  try {
    if (text.length > 2000) {
      throw new Error("Comment is too big!");
    } else if (!text.length) {
      return null;
    } else {
      const mkuuId = await makeUniqueId("Comments");
      const postComment = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,userId)VALUES(?,?,?,?)",
        [mkuuId, text, postId, user?.id],
      );

      const [getThePost] = await Model.prepare(
        "SELECT * FROM Posts WHERE id=?",
        [postId],
      );

      if (getThePost.userId !== user?.id) {
        //insert Notification
        await Model.prepare(
          "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,commentId,postId)VALUES(?,?,?,?,?)",
          [
            "POST_COMMENT",
            getThePost.userId,
            user?.id,
            postComment.insertId,
            getThePost.id,
          ],
        );
      }
      const makeNewComment = {
        id: postComment.insertId,
        uuId: mkuuId,
        text: text,
        postId: postId,
        userId: user?.id,
        parentId: null,
        targetedCommentId: null,
        createdAt: Date.now(),
        currentUserId: user?.id,
        postOwnerId: null,
        User: user,
        myReactionType: null,
        totalReactions: 0,
        Replies: null,
      };

      revalidatePath("/");
      return makeNewComment;
    }
  } catch (error: any) {
    return error?.message;
  }
}
