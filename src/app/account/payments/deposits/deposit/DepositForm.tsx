"use client";
import { BDT_SIGN } from "@/library/constants";
import React, { useEffect, useState } from "react";

type Props = {
  usdRate: any;
};

export default function DepositForm({ usdRate }: Props) {
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState("");

  useEffect(() => {
    const userAmount = Number(amount);
    const currentUsdRate = Number(usdRate);
    if (userAmount > 0) {
      const calc = Number(userAmount / currentUsdRate).toFixed(2);
      setFinalAmount(calc);
    } else {
      setFinalAmount("0");
    }
  }, [amount, usdRate]);

  return (
    <section className='p-3'>
      <div className='centerCardSmall bg-white rounded-lg p-4 shadow'>
        <div className='font-semibold text-lg text-center mb-1'>
          You Will Receive
        </div>
        <div className='font-bold text-2xl text-center text-success-main mb-2'>
          ${finalAmount}
        </div>
        <div className='font-semibold text-center text-info-main mb-4'>
          $1 = {BDT_SIGN}
          {usdRate}
        </div>

        <div className='relative overflow-hidden rounded-lg'>
          <div className='absolute border  font-semibold text-xl flex items-center justify-center h-full w-10 left-0 top-0 text-white bg-gray-800'>
            {BDT_SIGN}
          </div>
          <input
            value={amount}
            onChange={(e: any) => setAmount(e.target.value)}
            type='number'
            placeholder='Enter Amount'
            className='w-full text-lg  pl-12 focus:border-transparent'
          />
        </div>
        <button className='btn btn-primary mt-4 w-full'>Make Payment</button>
      </div>
    </section>
  );
}
