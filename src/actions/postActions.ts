"use server";

import { deleteS3File } from "@/library/AwsClientS3";
import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function reactionAction(itemInfo: {
  itemId: number;
  itemType: string;
  reactionType: string;
}) {
  try {
    const user = await auth();

    //if post reaction
    if (itemInfo.itemType === "post") {
      if (itemInfo.reactionType === "removeReaction") {
        await Model.prepare(
          `DELETE FROM Reactions WHERE userId=? AND postId=?`,
          [user?.id, itemInfo.itemId],
        );
      } else {
        const checkReaction = await Model.prepare(
          "SELECT * FROM Reactions WHERE userId=? AND postId=?",
          [user?.id, itemInfo.itemId],
        );
        if (checkReaction?.length) {
          await Model.prepare(
            "UPDATE Reactions SET type=? WHERE userId=? AND postId=?",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );
        } else {
          const reactPost = await Model.prepare(
            "INSERT INTO Reactions (type,userId,postId) VALUES(?,?,?)",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );

          const [getThePost] = await Model.prepare(
            "SELECT * FROM Posts WHERE id=?",
            [itemInfo.itemId],
          );
          if (getThePost.userId !== user?.id) {
            //send notification
            await Model.prepare(
              "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,postId,postReactionId)VALUES(?,?,?,?,?)",
              [
                "POST_REACTION",
                getThePost.userId,
                user?.id,
                getThePost.id,
                reactPost.insertId,
              ],
            );
          }
        }
      }
    } else if (itemInfo.itemType === "comment") {
      if (itemInfo.reactionType === "removeReaction") {
        await Model.prepare(
          `DELETE FROM Reactions WHERE userId=? AND commentId=?`,
          [user?.id, itemInfo.itemId],
        );
      } else {
        const checkReaction = await Model.prepare(
          "SELECT * FROM Reactions WHERE userId=? AND commentId=?",
          [user?.id, itemInfo.itemId],
        );
        if (checkReaction?.length) {
          await Model.prepare(
            "UPDATE Reactions SET type=? WHERE userId=? AND commentId=?",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );
        } else {
          const reactComment = await Model.prepare(
            "INSERT INTO Reactions (type,userId,commentId) VALUES(?,?,?)",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );

          const [getTheComment] = await Model.prepare(
            "SELECT * FROM Comments WHERE id=?",
            [itemInfo.itemId],
          );
          //notify
          if (getTheComment.userId !== user?.id) {
            await Model.prepare(
              "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,postId,commentId,commentReactionId)VALUES(?,?,?,?,?,?)",
              [
                "NEW_COMMENT_REACTION",
                getTheComment.userId,
                user?.id,
                getTheComment.postId,
                itemInfo.itemId,
                reactComment.insertId,
              ],
            );
          }
        }
      }
    }
    revalidatePath("/");
  } catch (error) {
    revalidatePath("/");
    return error;
  }
}

export async function editPost({
  postId,
  text,
}: {
  postId: any;
  text: string;
}) {
  const currentUser = await auth();
  try {
    if (text.length > 2000) {
      throw new Error("Post can not be more than 2000 characters");
    } else {
      //edit comment
      await Model.prepare("UPDATE Posts SET text=? WHERE id=? AND userId=?", [
        text,
        postId,
        currentUser?.id,
      ]);

      revalidatePath("/");
      return {
        status: true,
        message: "Post edited successfully",
      };
    }
  } catch (error: any) {
    revalidatePath("/");
    return {
      status: false,
      message: error?.message,
    };
  }
}

export async function deletePost(postId: number) {
  try {
    const currentUser = await auth();
    if (postId) {
      //get photo names to delete
      const postPhotos = await Model.prepare(
        "SELECT * FROM Photos WHERE postId=? AND userId=?",
        [postId, currentUser?.id],
      );
      //if photos available then delete first
      if (postPhotos?.length) {
        for (let photo of postPhotos) {
          await deleteS3File(photo?.filename);
        }
      }
      //delete the post also
      await Model.prepare("DELETE FROM Posts WHERE id=? AND userId=?", [
        postId,
        currentUser?.id,
      ]);
      revalidatePath("/");
      return {
        status: true,
        message: "Post deleted successfully",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
    };
  }
}
