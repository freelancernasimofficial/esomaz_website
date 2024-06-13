"use client";

import React from "react";

type Props = {
  bids: any;
};

export default function BidPackList({ bids }: Props) {
  return (
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
            <tr className='border border-b-gray-300' key={bid?.id?.toString()}>
              <th>{bid?.id}</th>
              <th>{bid?.bids}</th>
              <th>${Number(bid?.price).toFixed(0)} USD</th>
              <td>
                <button className='btn btn-success w-full'>Buy Pack</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
