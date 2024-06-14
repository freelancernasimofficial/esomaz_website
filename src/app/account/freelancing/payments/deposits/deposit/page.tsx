import PageTitle from "@/components/layout/PageTitle";
import React from "react";
import DepositForm from "./DepositForm";
import getOfficialValue from "@/actions/official/getOfficialValue";

type Props = {};

export default async function page({}: Props) {
  const usdRate = await getOfficialValue("USD_RATE");

  return (
    <section className='h-screen w-screen '>
      <PageTitle title='Deposit Money' />

      <DepositForm usdRate={usdRate} />
    </section>
  );
}
