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
    <div className=' bg-white mt-2 rounded-lg'>
      <LoadCommentReactions
        reactionType={params?.reactionType}
        commentId={params?.commentId}
      />
    </div>
  );
}
