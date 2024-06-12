import React from "react";
import LoadPostReactions from "./LoadPostReactions";

type Props = {
  params: {
    postId: string;
    reactionType: string;
  };
};

export default async function page({ params }: Props) {
  return (
    <div className='bg-white w-full p-4'>
      <LoadPostReactions
        reactionType={params?.reactionType}
        postuuId={params?.postId}
      />
    </div>
  );
}
