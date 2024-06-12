import React from "react";
import LoadCommentReactions from "./LoadCommentReactions";

type Props = {
  params: {
    commentId: string;
    reactionType: string;
  };
};

export default async function page({ params }: Props) {
  return (
    <LoadCommentReactions
      reactionType={params?.reactionType}
      commentId={params?.commentId}
    />
  );
}
