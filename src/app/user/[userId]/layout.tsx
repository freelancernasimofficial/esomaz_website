import ProfileCard from "@/components/user/ProfileCard";
import auth from "@/library/auth";
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
  const currentUser = await auth();
  const [user] = await Model.query(
    `SELECT *,(SELECT JSON_OBJECT('id',AV.id,'height',AV.height,'width',AV.width,'filename',AV.filename) FROM Photos AV WHERE AV.id=U.avatarId) AS avatar,(SELECT JSON_OBJECT('id',CV.id,'height',CV.height,'width',CV.width,'filename',CV.filename) FROM Photos CV WHERE CV.userId=U.id AND CV.id=(SELECT coverPhotoId FROM UserInfos WHERE userId=U.id)) AS coverPhoto,(SELECT COUNT(*) FROM Friends MRS WHERE MRS.senderUserId=${currentUser?.id} AND MRS.receiverUserId=U.id AND MRS.isAccepted=0) AS meRequestSent,(SELECT COUNT(*) FROM Friends HRS WHERE HRS.receiverUserId=${currentUser?.id} AND HRS.senderUserId=U.id AND isAccepted=0) AS heRequestSent,(SELECT COUNT(*) FROM Friends FR WHERE (FR.senderUserId=${currentUser?.id} AND FR.receiverUserId=U.id AND isAccepted=1) OR (FR.receiverUserId=${currentUser?.id} AND FR.senderUserId=U.id AND isAccepted=1) ) AS isFriends FROM Users U WHERE U.username="${params?.userId}" OR U.uuId="${params?.userId}"`,
  );
  console.log(user);

  return (
    <div className='container'>
      <ProfileCard user={user} />
      {children}
    </div>
  );
}
