import PageTitle from "@/components/layout/PageTitle";
import React from "react";
import DepositForm from "./DepositForm";

type Props = {};

export default function page({}: Props) {
  return (
    <section className='h-screen w-screen '>
      <PageTitle title='Deposit Money' />

      <DepositForm />
    </section>
  );
}
