import React from "react";
import LoadShares from "./LoadShares";
import { totalSharesCount } from "@/actions/post/getPostShares";

type Props = {
  params: {
    postId: string;
  };
};

export default async function page({ params }: Props) {
  const totalShares = await totalSharesCount(params.postId);
  return (
    <div>
      <h2 className='font-semibold mb-2 bg-white p-4 fixed w-full shadow'>
        People Who Shared ({totalShares})
      </h2>
      <div className='bg-white pt-14 px-4 pb-10'>
        <LoadShares postuuId={params?.postId} />
      </div>
    </div>
  );
}
