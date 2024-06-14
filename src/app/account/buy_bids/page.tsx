import getBidPacks from "@/actions/freelancing/getBidPacks";
import PageTitle from "@/components/layout/PageTitle";
import React from "react";
import BuyButton from "./BuyButton";

type Props = {};

export default async function page({}: Props) {
  const bids = await getBidPacks();

  return (
    <section>
      <PageTitle title='Bid Packs' />
      <div className='p-3'>
        <table
          border={1}
          className='w-full border-collapse text-center'
          cellPadding={10}
        >
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th>ID</th>
              <th>BIDS</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {bids?.map((bid: any, index: number) => {
              return (
                <tr
                  className='border border-b-gray-300'
                  key={bid?.id?.toString()}
                >
                  <th>{bid?.id}</th>
                  <th>{bid?.bids} BIDS</th>
                  <th>${Number(bid?.price).toFixed(2)} USD</th>
                  <td className='flex justify-center items-center'>
                    <BuyButton bid={bid} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
