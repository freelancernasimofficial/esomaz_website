import ReportForm from "@/components/post/ReportForm";
import React from "react";

type Props = {
  params: {
    commentId: string;
  };
};

export default async function page({ params }: Props) {
  return (
    <div className='p-3'>
      <div className='centerCardSmall bg-white rounded-lg'>
        <ReportForm
          itemId={Number(params.commentId)}
          reportType='comment'
          title='Report Comment'
        />
      </div>
    </div>
  );
}
