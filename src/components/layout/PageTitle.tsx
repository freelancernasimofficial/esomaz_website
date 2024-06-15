import React from "react";
import BackButton from "../others/BackButton";
import IconArrowBack from "../icons/IconArrowBack";
import IconChevronLeft from "../icons/IconChevronLeft";

type Props = {
  title: string;
  children?: any;
  backButton?: boolean;
};

export default function PageTitle({ backButton, title, children }: Props) {
  return (
    <div className='w-screen'>
      <div className='flex items-center justify-between bg-white shadow fixed w-full h-10 px-3 z-20'>
        <div className='flex items-center'>
          {backButton === false ? null : (
            <BackButton className='mr-2' title={<IconArrowBack />} />
          )}
          <h1 className='font-semibold capitalize'>{title}</h1>
        </div>
        {children}
      </div>
      <div className='h-10 w-full'></div>
    </div>
  );
}
