"use client";

import buyBidPack from "@/actions/freelancing/buyBidPack";
import SubmitButtonClient from "@/components/button/SubmitButtonClient";
import Modal from "@/components/others/Modal";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  bids: any;
};

export default function BidPackList({ bids }: Props) {
  const [current, setCurrent] = useState<any>();
  const [pending, setPending] = useState<any>(false);
  const [formStatus, setFormStatus] = useState({
    status: false,
    message: "",
  });

  const buyHandle = () => {
    setPending(true);
    setTimeout(() => {
      buyBidPack(current)
        .then((data) => {
          setFormStatus(data);
        })
        .catch((err) => {
          setFormStatus(err);
        })
        .finally(() => {
          setPending(false);
        });
    }, 500);
  };

  return (
    <React.Fragment>
      {current?.id ? (
        <Modal
          className='max-w-screen-xs'
          onClickBackdrop={() => setCurrent(undefined)}
        >
          {formStatus.status === true && formStatus.message.length ? (
            <div className='p-4 text-center font-bold text-green-500 text-lg'>
              <div>{formStatus.message}</div>
              <Link href='/account' className='btn btn-primary mt-4'>
                Go To Account
              </Link>
            </div>
          ) : null}
          {formStatus.status === false ? (
            <React.Fragment>
              <h1 className='font-bold text-center mb-2'>Your Are Buying</h1>
              <div className='font-semibold text-lg'>
                <div> Bids: {current?.bids}</div>
                <div> Amount: ${Number(current?.price).toFixed(2)} USD</div>
              </div>

              <SubmitButtonClient
                onClick={buyHandle}
                className='btn btn-primary mt-4 w-full'
                pending={pending}
                title='Confirm Payment'
              />
              {formStatus.status === false && formStatus.message.length ? (
                <div className='errorCard mt-2'>{formStatus.message}</div>
              ) : null}
            </React.Fragment>
          ) : null}
        </Modal>
      ) : null}
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
                <th>{bid?.bids}</th>
                <th>${Number(bid?.price).toFixed(2)} USD</th>
                <td>
                  <button
                    onClick={() => setCurrent(bid)}
                    className='btn btn-success w-full'
                  >
                    Buy Pack
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}
