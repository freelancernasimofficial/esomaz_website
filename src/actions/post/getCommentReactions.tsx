"use server";

import SingleReaction from "@/components/post/SingleReaction";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getCommentReactions({
  commentId,
  reactionType,
  limitFrom,
  limitTo,
}: {
  commentId: string;
  reactionType: string;
  limitFrom: number;
  limitTo: number;
}) {
  try {
    if (reactionType === "all") {
      const getReactions = await Model.query(
        `SELECT *,(${getUserByObjectQuery(
          "R.userId",
        )}) AS User FROM Reactions R WHERE R.commentId=${commentId} ORDER BY R.id DESC LIMIT ${limitFrom},${limitTo}`,
      );
      return getReactions?.map((item: any, index: number) => {
        return <SingleReaction key={item?.User?.uuId} item={item} />;
      });
    } else {
      const getReactions = await Model.query(
        `SELECT *,(${getUserByObjectQuery(
          "R.userId",
        )}) AS User FROM Reactions R WHERE R.type="${reactionType}" AND R.commentId=${commentId}  ORDER BY R.id DESC LIMIT ${limitFrom},${limitTo}`,
      );
      return getReactions?.map((item: any, index: number) => {
        return <SingleReaction key={item?.User?.uuId} item={item} />;
      });
    }
  } catch (error) {
    return undefined;
  }
}
