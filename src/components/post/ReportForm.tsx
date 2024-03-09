import React from "react";
import addReportAction from "@/actions/addReportAction";
import BackButton from "../others/BackButton";
import CookieStore from "@/library/CookieStore";
import SubmitButton from "../button/SubmitButton";

type Props = {
  title: string;
  reportType: "post" | "user" | "comment";
  itemId: number;
};

export default async function ReportForm({ title, reportType, itemId }: Props) {
  const bindAddReport = addReportAction?.bind(null, { reportType, itemId });
  const success = CookieStore.getState("success");
  const error = CookieStore.getState("error");
  return (
    <div className='p-4'>
      <h1 className='font-semibold text-sm2'>{title}</h1>

      {success ? (
        <div>
          <div className='successCard w-full my-4'>{success}</div>
          <BackButton className='w-full' />
        </div>
      ) : (
        <form action={bindAddReport}>
          <textarea
            placeholder='Enter report message...'
            className='w-full bg-gray-100 rounded my-2 p-2 text-sm3 font-medium'
            name='message'
            id=''
            cols={30}
            rows={5}
          ></textarea>
          {error ? <div className='errorCard w-full mb-4'>{error}</div> : null}
          <SubmitButton className='btn btn-error' title={title} />
        </form>
      )}
    </div>
  );
}
