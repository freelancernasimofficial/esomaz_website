"use server";

import SingleUser from "@/components/user/SingleUser";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";
import React from "react";

type Props = {};

export default async function getFollowersByUserId({
  userId,
  limitFrom,
  limitTo,
}: {
  userId: number;
  limitFrom?: number;
  limitTo?: number;
}) {
  try {
    const followers = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "F.followerId",
      )}) AS User FROM Followers F WHERE F.userId=${userId} ORDER BY F.id DESC LIMIT ${limitFrom},${limitTo}`,
    );

    return followers?.map((item: any) => {
      return <SingleUser key={item?.id} user={item?.User} />;
    });
  } catch (error) {
    console.log(error);

    return undefined;
  }
}
