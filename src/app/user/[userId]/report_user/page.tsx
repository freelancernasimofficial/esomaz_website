import ReportForm from "@/components/post/ReportForm";
import Model from "@/model/Model";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const [getUser] = await Model.prepare(
    "SELECT id FROM Users WHERE uuId=? OR id=? OR username=?",
    [params.userId, params.userId, params.userId],
  );

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg'>
        <ReportForm
          itemId={Number(getUser.id)}
          reportType='user'
          title='Report User'
        />
      </div>
    </div>
  );
}
