"use server";

import Model from "@/model/Model";

export default async function getUserInformationAction(userId: number) {
  const [userInfos] = await Model.query(
    `SELECT *,(SELECT name FROM Countries WHERE id=UF.countryId) AS country,(SELECT COUNT(*) FROM Followers FL WHERE FL.userId=UF.userId) AS totalFollowers FROM UserInfos UF WHERE UF.userId=${userId}`,
  );

  return userInfos;
}
