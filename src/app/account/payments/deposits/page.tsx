import getOfficialValue from "@/actions/official/getOfficialValue";
import PageTitle from "@/components/layout/PageTitle";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const a = await getOfficialValue("USD_RATE");

  return (
    <section>
      <PageTitle title='Recent Deposits'>
        <Link
          className='flex justify-center items-center px-4 py-1 font-semibold bg-blue-700 text-white rounded'
          href='/account/payments/deposits/deposit'
        >
          Deposit Money
        </Link>
      </PageTitle>
      EEEE
    </section>
  );
}
