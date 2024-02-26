import ProfileCard from "@/components/user/ProfileCard";
import auth from "@/library/auth";
import Model from "@/model/Model";
import { headers } from "next/headers";
import React from "react";
import bcrypt from "bcrypt";
import FriendsCard from "@/components/user/FriendsCard";
import UserIntro from "@/components/user/UserIntro";
type Props = {
  children: any;
  params?: {
    userId?: string;
  };
};

export default async function UserLayout({ params, children }: Props) {
  const currentUser = await auth();
  const [user]: any = await Model.query(
    `SELECT *,(SELECT JSON_OBJECT('id',AV.id,'height',AV.height,'width',AV.width,'filename',AV.filename) FROM Photos AV WHERE AV.id=U.avatarId) AS avatar,(SELECT JSON_OBJECT('id',CV.id,'height',CV.height,'width',CV.width,'filename',CV.filename) FROM Photos CV WHERE CV.userId=U.id AND CV.id=(SELECT coverPhotoId FROM UserInfos WHERE userId=U.id)) AS coverPhoto,(SELECT COUNT(*) FROM Friends MRS WHERE MRS.senderUserId=${currentUser?.id} AND MRS.receiverUserId=U.id AND MRS.isAccepted=0) AS meRequestSent,(SELECT COUNT(*) FROM Friends HRS WHERE HRS.receiverUserId=${currentUser?.id} AND HRS.senderUserId=U.id AND isAccepted=0) AS heRequestSent,(SELECT COUNT(*) FROM Friends FR WHERE (FR.senderUserId=${currentUser?.id} AND FR.receiverUserId=U.id AND isAccepted=1) OR (FR.receiverUserId=${currentUser?.id} AND FR.senderUserId=U.id AND isAccepted=1) ) AS isFriends,(SELECT COUNT(*) FROM Followers UF WHERE UF.userId=U.id) totalFollowers,(SELECT COUNT(*) FROM Followers UFL WHERE UFL.followerId=U.id) totalFollowing,(SELECT COUNT(*) FROM Friends UFR WHERE UFR.senderUserId=U.id OR UFR.receiverUserId=U.id AND UFR.isAccepted=1) totalFriends,(SELECT COUNT(*) FROM Followers HFL WHERE HFL.userId=${currentUser?.id} AND HFL.followerId=U.id) isHeFollowing,(SELECT COUNT(*) FROM Followers MFL WHERE MFL.followerId=${currentUser?.id} AND MFL.userId=U.id) isMeFollowing FROM Users U WHERE U.username="${params?.userId}" OR U.uuId="${params?.userId}"`,
  );

  return (
    <div className='container'>
      <div className='centerCard'>
        <div className='md:flex'>
          <div className='w-full md:w-6/12 md:pr-6'>
            <ProfileCard user={user} />
            <UserIntro userId={user?.id} />
            <FriendsCard />
          </div>
          <div className='w-full md:w-6/12'> {children}</div>
        </div>
      </div>
    </div>
  );
}
