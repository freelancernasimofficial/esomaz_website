"use server";

import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import getUsername from "@/library/getUsername";
import Model from "@/model/Model";
import Link from "next/link";

export default async function getPostShares({
  postuuId,
  limitFrom,
  limitTo,
}: {
  postuuId: string;
  limitFrom: number;
  limitTo: number;
}) {
  try {
    const querySharedPosts = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "P.userId",
      )}) AS User FROM Posts P WHERE P.sharedId=(SELECT id FROM Posts WHERE uuId=${postuuId}) ORDER BY P.id DESC LIMIT ${limitFrom},${limitTo}`,
    );

    return querySharedPosts?.map((item: any, index: number) => {
      return (
        <div
          key={item?.id?.toString()}
          className='py-1 flex items-center justify-between border-b border-b-gray-100'
        >
          <div className='flex items-center'>
            {" "}
            <Avatar user={item?.User} />{" "}
            <Link
              href={`/user/${getUsername(item?.User)}`}
              className='ml-2 block'
            >
              <h3 className='font-semibold  leading-none capitalize'>
                {getFullName(item?.User)}
              </h3>
              <span className=' text-sm  text-gray-500'>
                {getRelativeTime(item?.createdAt)}
              </span>
            </Link>
          </div>
        </div>
      );
    });
  } catch (error) {
    return undefined;
  }
}

export const totalSharesCount = async (postuuId: any) => {
  const [sCount] = await Model.query(
    `SELECT COUNT(*) AS total FROM Posts WHERE sharedId=(SELECT id FROM Posts WHERE uuId=${postuuId})`,
  );

  if (sCount) {
    return sCount?.total;
  } else {
    return 0;
  }
};
