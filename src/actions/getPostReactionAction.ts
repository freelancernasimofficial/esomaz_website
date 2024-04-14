"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getPostReactionAction(
  postId: string,
  reactionType: string,
) {
  if (reactionType === "all") {
    const getReactions = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "R.userId",
      )}) AS User FROM Reactions R WHERE R.postId=(SELECT id FROM Posts WHERE uuId=${postId})`,
    );
    return getReactions;
  } else {
    const getReactions = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "R.userId",
      )}) AS User FROM Reactions R WHERE R.type="${reactionType}" AND R.postId=(SELECT id FROM Posts WHERE uuId=${postId})`,
    );
    return getReactions;
  }
}
