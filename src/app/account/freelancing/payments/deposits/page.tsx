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
          className='btn-sm btn-primary'
          href='/account/freelancing/payments/deposits/deposit'
        >
          Deposit Money
        </Link>
      </PageTitle>
      EEEE
    </section>
  );
}
