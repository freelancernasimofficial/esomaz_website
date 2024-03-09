import Model from "@/model/Model";
import React from "react";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import Avatar from "../user/Avatar";
import DropdownMenu from "../dropdown/DropdownMenu";
import auth from "@/library/auth";
import ReactionCard from "./ReactionCard";
import SingleReplyComment from "./SingleReplyComment";

type Props = {
  commentId: number;
  postOwnerId: number;
};

export default async function FewCommentReplies({
  commentId,
  postOwnerId,
}: Props) {
  const user = await auth();
  const replies = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "C.userId",
    )}) AS User,(SELECT JSON_OBJECT('User',(SELECT JSON_OBJECT('id',TCU.id,'uuId',TCU.uuId,'username',TCU.username,'firstName',TCU.firstName,'lastName',TCU.lastName) FROM Users TCU WHERE TCU.id=TC.userId)) FROM Comments TC WHERE TC.id=C.targetedCommentId AND NOT TC.userId=C.userId) AS targetedComment,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND MR.commentId=C.id) AS myReactionType,(SELECT COUNT(*) FROM Reactions R WHERE R.commentId=C.id) AS totalReactions,(SELECT COUNT(*) FROM Followers MFLW WHERE MFLW.followerId=${
      user?.id
    } AND MFLW.userId=C.userId ) AS isMeFollowing,(SELECT COUNT(*) FROM Followers HFLW WHERE HFLW.followerId=C.userId AND HFLW.userId=${
      user?.id
    } ) AS isHeFollowing,(SELECT ${postOwnerId}) AS postOwnerId  FROM Comments C WHERE C.parentId=${commentId} ORDER BY C.id ASC`,
  );

  return replies.length ? (
    <div>
      {replies?.map((item: any, index: number) => {
        return <SingleReplyComment key={item?.uuId} item={item} />;
      })}
    </div>
  ) : null;
}
