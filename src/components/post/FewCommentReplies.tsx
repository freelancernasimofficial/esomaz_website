import Model from "@/model/Model";
import React from "react";
import SingleComment from "./SingleComment";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Avatar from "../user/Avatar";

type Props = {
  commentId: number;
};

export default async function FewCommentReplies({ commentId }: Props) {
  const replies = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "C.userId",
    )}) AS User FROM Comments C WHERE C.parentId=${commentId}`,
  );

  return replies.length ? (
    <div>
      {replies?.map((item: any, index: number) => {
        return (
          <div key={item?.uuId} className='my-4'>
            <div className='flex justify-between'>
              <div className='flex'>
                <Avatar user={item?.User} />
                <div className='ml-2'>
                  <div>
                    {" "}
                    <Link
                      href={`/user/${getUsername(item?.User)}`}
                      className='inline-block'
                    >
                      <h4 className='font-semibold inline-block'>
                        {getFullName(item?.User)}
                      </h4>
                    </Link>
                    <span className='block text-sm5 text-gray-500 leading-4'>
                      {getRelativeTime(item?.createdAt)}
                    </span>
                  </div>
                  <div className='mt-1 text-sm3 bg-gray-100 p-2 rounded-lg inline-block'>
                    {item?.text}
                  </div>
                </div>
              </div>
              <button className='svgCircleButton -mt-2'>
                <IconHorizontalDots />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
}
