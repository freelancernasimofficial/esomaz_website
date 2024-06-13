import getBidPacks from "@/actions/freelancing/getBidPacks";
import PageTitle from "@/components/layout/PageTitle";
import React from "react";
import BidPackList from "./BidPackList";

type Props = {};

export default async function page({}: Props) {
  const bids = await getBidPacks();

  return (
    <section>
      <PageTitle title='Bid Packs' />
      <div className='p-3'>
        <BidPackList bids={bids} />
      </div>
    </section>
  );
}
