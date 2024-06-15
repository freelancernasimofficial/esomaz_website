"use client";

import buyBidPack from "@/actions/freelancing/buyBidPack";
import SubmitButtonClient from "@/components/button/SubmitButtonClient";
import Modal from "@/components/others/Modal";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  bid: any;
};

export default function BuyButton({ bid }: Props) {
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
          className='max-w-screen-xs !p-0 rounded-lf overflow-hidden'
          onClickBackdrop={() => {
            setCurrent(undefined);
            setFormStatus({ status: false, message: "" });
          }}
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
              <div className='bg-gray-800 p-2'>
                {" "}
                <h1 className='font-bold text-center text-white'>
                  Your Are Buying
                </h1>
              </div>
              <div className='font-semibold text-lg p-4'>
                <div> Bids: {current?.bids}</div>
                <div> Amount: ${Number(current?.price).toFixed(2)} USD</div>
              </div>

              <div className='px-3 pb-3'>
                {" "}
                <SubmitButtonClient
                  onClick={buyHandle}
                  className='btn btn-primary w-full'
                  pending={pending}
                  title='Confirm Payment'
                />
                {formStatus.status === false && formStatus.message.length ? (
                  <div className='errorCard mt-2'>{formStatus.message}</div>
                ) : null}
              </div>
            </React.Fragment>
          ) : null}
        </Modal>
      ) : null}
      <button className='btn-sm btn-primary' onClick={() => setCurrent(bid)}>
        Buy Pack
      </button>
    </React.Fragment>
  );
}
