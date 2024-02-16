import ProfileCard from "@/components/user/ProfileCard";
import Model from "@/model/Model";
import { headers } from "next/headers";
import React from "react";

type Props = {
  children: any;
  params?: {
    userId?: string;
  };
};

export default async function UserLayout({ params, children }: Props) {
  const [user] = await Model.query(
    `SELECT *,(SELECT JSON_OBJECT('id',AV.id,'height',AV.height,'width',AV.width,'filename',AV.filename) FROM Photos AV WHERE AV.id=U.avatarId) AS avatar,(SELECT JSON_OBJECT('id',CV.id,'height',CV.height,'width',CV.width,'filename',CV.filename) FROM Photos CV WHERE CV.userId=U.id AND CV.id=(SELECT coverPhotoId FROM UserInfos WHERE userId=U.id)) AS coverPhoto FROM Users U WHERE U.username="${params?.userId}" OR U.uuId="${params?.userId}"`,
  );

  return (
    <div className='container'>
      <ProfileCard user={user} />
      {children}
    </div>
  );
}
