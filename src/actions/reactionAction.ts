"use server";

import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function reactionAction(
  itemInfo: {
    itemId: number;
    itemType: string;
  },
  formData: any,
) {
  const user = await auth();
  const reactionType = formData.get("reactionType");

  //if post reaction
  if (itemInfo.itemType === "post") {
    if (reactionType === "removeReaction") {
      await Model.prepare(`DELETE FROM Reactions WHERE userId=? AND postId=?`, [
        user?.id,
        itemInfo.itemId,
      ]);
    } else {
      const checkReaction = await Model.prepare(
        "SELECT * FROM Reactions WHERE userId=? AND postId=?",
        [user?.id, itemInfo.itemId],
      );
      if (checkReaction?.length) {
        await Model.prepare(
          "UPDATE Reactions SET type=? WHERE userId=? AND postId=?",
          [reactionType, user?.id, itemInfo?.itemId],
        );
      } else {
        await Model.prepare(
          "INSERT INTO Reactions (type,userId,postId) VALUES(?,?,?)",
          [reactionType, user?.id, itemInfo?.itemId],
        );
      }
    }
  } else if (itemInfo.itemType === "comment") {
    if (reactionType === "removeReaction") {
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
          [reactionType, user?.id, itemInfo?.itemId],
        );
      } else {
        await Model.prepare(
          "INSERT INTO Reactions (type,userId,commentId) VALUES(?,?,?)",
          [reactionType, user?.id, itemInfo?.itemId],
        );
      }
    }
  }
  revalidatePath("/");
}
