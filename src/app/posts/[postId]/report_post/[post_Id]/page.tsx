import ReportForm from "@/components/post/ReportForm";
import React from "react";

type Props = {
  params: {
    post_Id: string;
  };
};

export default async function page({ params }: Props) {
  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg'>
        <ReportForm
          itemId={Number(params.post_Id)}
          reportType='post'
          title='Report Post'
        />
      </div>
    </div>
  );
}
