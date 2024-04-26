"use server";

import Model from "@/model/Model";

export default async function getPeopleYouMayKnowAction() {
  const people = await Model.query(
    "SELECT id,uuId,firstName,lastName,createdAt,(SELECT filename FROM Photos PH WHERE PH.id=U.avatarId) AS avatar FROM Users AS U ORDER BY U.id DESC LIMIT 100",
  );
  return people;
}
