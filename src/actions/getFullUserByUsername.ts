"use server";

import auth from "@/library/auth";
import Model from "@/model/Model";

export default async function getFullUserByUsername(username: string) {
  const currentUser = await auth();
  const [user]: any = await Model.query(
    `SELECT *,(SELECT AV.filename FROM Photos AV WHERE AV.id=U.avatarId) AS avatar,(SELECT JSON_OBJECT('id',CV.id,'height',CV.height,'width',CV.width,'filename',CV.filename) FROM Photos CV WHERE CV.userId=U.id AND CV.id=(SELECT coverPhotoId FROM UserInfos WHERE userId=U.id)) AS coverPhoto,(SELECT COUNT(*) FROM Friends MRS WHERE MRS.senderUserId=${currentUser?.id} AND MRS.receiverUserId=U.id AND MRS.isAccepted=0) AS meRequestSent,(SELECT COUNT(*) FROM Friends HRS WHERE HRS.receiverUserId=${currentUser?.id} AND HRS.senderUserId=U.id AND isAccepted=0) AS heRequestSent,(SELECT COUNT(*) FROM Friends FR WHERE (FR.senderUserId=${currentUser?.id} AND FR.receiverUserId=U.id AND isAccepted=1) OR (FR.receiverUserId=${currentUser?.id} AND FR.senderUserId=U.id AND isAccepted=1) ) AS isFriends,(SELECT COUNT(*) FROM Followers UF WHERE UF.userId=U.id) totalFollowers,(SELECT COUNT(*) FROM Followers UFL WHERE UFL.followerId=U.id) totalFollowing,(SELECT COUNT(*) FROM Friends UFR WHERE UFR.senderUserId=U.id OR UFR.receiverUserId=U.id AND UFR.isAccepted=1) totalFriends,(SELECT COUNT(*) FROM Followers HFL WHERE HFL.userId=${currentUser?.id} AND HFL.followerId=U.id) isHeFollowing,(SELECT COUNT(*) FROM Followers MFL WHERE MFL.followerId=${currentUser?.id} AND MFL.userId=U.id) isMeFollowing FROM Users U WHERE U.username="${username}" OR U.uuId="${username}"`,
  );
  return user;
}
