import IconCheckCircle from "@/components/icons/IconCheckCircle";
import IconWarningOutline from "@/components/icons/IconWarningOutline";
import IconXcircleOutlined from "@/components/icons/IconXcircleOutlined";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    result: string;
  };
};

export default function page({ params }: Props) {
  if (params.result === "success") {
    return (
      <section className='p-3'>
        <div className='centerCardMobile bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
          <IconCheckCircle className='text-success-main mb-4 w-10 h-10' />
          <h1 className='font-semibold text-success-main'>
            Payment Successful
          </h1>
          <Link className='btn btn-primary mt-4 w-full' href='/account'>
            Go To Account
          </Link>
        </div>
      </section>
    );
  } else if (params.result === "failed") {
    return (
      <section className='p-3'>
        <div className='centerCardMobile bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
          <IconWarningOutline className='text-error-main mb-4 w-10 h-10' />
          <h1 className='font-semibold text-error-main'>Payment Failed</h1>
          <Link className='btn btn-error mt-4 w-full' href='/account'>
            Go To Account
          </Link>
        </div>
      </section>
    );
  } else if (params.result === "cancelled") {
    return (
      <section className='p-3'>
        <div className='centerCardMobile bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
          <IconXcircleOutlined className='text-warning-main mb-4 w-10 h-10' />
          <h1 className='font-semibold text-warning-main'>Payment Cancelled</h1>
          <Link className='btn btn-warning mt-4 w-full' href='/account'>
            Go To Account
          </Link>
        </div>
      </section>
    );
  } else {
    redirect("/account");
  }
}
