import PageTitle from "@/components/layout/PageTitle";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <PageTitle title='Recent Withdrawals'>
        <Link
          className='flex justify-center items-center px-4 py-1 font-semibold bg-primary-main text-white rounded'
          href='/account/freelancing/payments/withdraw/withdraw_now'
        >
          Withdraw Money
        </Link>
      </PageTitle>
    </section>
  );
}
