"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getCommentReactionAction(
  commentId: string,
  reactionType: string,
) {
  if (reactionType === "all") {
    const getReactions = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "R.userId",
      )}) AS User FROM Reactions R WHERE R.commentId=${commentId}`,
    );
    return getReactions;
  } else {
    const getReactions = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "R.userId",
      )}) AS User FROM Reactions R WHERE R.type="${reactionType}" AND R.commentId=${commentId}`,
    );
    return getReactions;
  }
}
