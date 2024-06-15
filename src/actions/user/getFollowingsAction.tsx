"use server";

import SingleUser from "@/components/user/SingleUser";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getFollowingsByUserId({
  userId,
  limitFrom,
  limitTo,
}: {
  userId: number;
  limitFrom?: number;
  limitTo?: number;
}) {
  try {
    const followings = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "F.userId",
      )}) AS User FROM Followers F WHERE F.followerId=${userId} ORDER BY F.id DESC LIMIT ${limitFrom},${limitTo}`,
    );
    return followings?.map((item: any) => {
      return <SingleUser key={item?.id} user={item?.User} />;
    });
  } catch (error) {
    return undefined;
  }
}
