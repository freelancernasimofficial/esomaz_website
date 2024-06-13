"use client";

import getOfficialValue from "@/actions/official/getOfficialValue";
import React, { useEffect, useState } from "react";

type Props = {};

export default function DepositForm({}: Props) {
  const [number, setNumber] = useState({ wallet: "", number: "" });
  const [deposit, setDeposit] = useState("");
  const [transID, setTransId] = useState("");
  const [receive, setReceive] = useState<any>();
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Number Copied");
  };

  const handleGetNumber = async (text: string) => {
    const n = await getOfficialValue(text);

    setNumber({ wallet: text, number: n });
  };

  useEffect(() => {
    getOfficialValue("USD_RATE")
      .then((data) => {
        if (deposit.length) {
          setReceive(Number(Number(deposit) / Number(data)).toFixed(2));
        } else {
          setReceive(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deposit]);

  return (
    <div className='p-3'>
      <div className='p-3 rounded-lg bg-white max-w-screen-sm w-full mx-auto'>
        <h1 className='font-semibold mb-4'>Select Payment Method</h1>
        <div className='flex items-center justify-between mb-4'>
          <button
            onClick={() => handleGetNumber("BKASH")}
            className={`btn flex-1 ${
              number?.wallet === "BKASH" ? "bg-rose-500 text-white" : ""
            }`}
          >
            BKASH
          </button>

          <button
            onClick={() => handleGetNumber("NAGAD")}
            className={`btn flex-1 mx-4 ${
              number.wallet === "NAGAD" ? "bg-amber-500 text-white" : ""
            }`}
          >
            NAGAD
          </button>

          <button
            onClick={() => handleGetNumber("ROCKET")}
            className={`btn flex-1 ${
              number.wallet === "ROCKET" ? "bg-blue-500 text-white" : ""
            }`}
          >
            ROCKET
          </button>
        </div>
        {number?.wallet.length ? (
          <div
            onClick={() => handleCopy(number.number)}
            className={`flex  items-center mb-4 font-semibold ${
              number.wallet === "BKASH"
                ? "bg-rose-500"
                : number.wallet === "NAGAD"
                ? "bg-amber-500"
                : number.wallet === "ROCKET"
                ? "bg-blue-500"
                : "bg-gray-200"
            } text-white rounded p-3`}
          >
            <div className='mr-4 uppercase'>{number.wallet} Personal:</div>
            <div className='mr-4 uppercase'>{number.number}</div>
          </div>
        ) : null}
        <div>
          <input
            value={deposit}
            onChange={(e: any) => setDeposit(e.target.value)}
            type='number'
            className='w-full block mb-4'
            placeholder='Deposit Amount'
          />
          <input
            value={transID}
            onChange={(e) => setTransId(e.target.value)}
            type='text'
            className='w-full block mb-4'
            placeholder='Transaction ID'
          />

          {receive?.length ? (
            <div className='p-2 animate-fade mb-4 rounded-lg text-center bg-gray-100 font-bold'>
              Your Will Get: ${Number(receive)} USD
            </div>
          ) : null}

          <button className='btn btn-primary w-full'>
            Submit for Approval
          </button>
          <div className='mt-4 errorCard'>Something Went wrong</div>
        </div>
      </div>
    </div>
  );
}
