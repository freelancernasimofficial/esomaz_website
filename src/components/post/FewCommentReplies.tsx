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
import DropdownMenu from "../dropdown/DropdownMenu";

type Props = {
  commentId: number;
};

export default async function FewCommentReplies({ commentId }: Props) {
  const replies = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "C.userId",
    )}) AS User,(SELECT JSON_OBJECT('User',(SELECT JSON_OBJECT('id',TCU.id,'uuId',TCU.uuId,'username',TCU.username,'firstName',TCU.firstName,'lastName',TCU.lastName) FROM Users TCU WHERE TCU.id=TC.userId)) FROM Comments TC WHERE TC.id=C.targetedCommentId AND NOT TC.userId=C.userId) AS targetedComment FROM Comments C WHERE C.parentId=${commentId} ORDER BY C.id ASC`,
  );

  return replies.length ? (
    <div>
      {replies?.map((item: any, index: number) => {
        return (
          <div key={item?.uuId} className='my-1'>
            <div className='flex justify-between'>
              <div className='flex'>
                <Avatar className='w-8 h-8' user={item?.User} />
                <div className='ml-2'>
                  <div>
                    {" "}
                    <Link
                      href={`/user/${getUsername(item?.User)}`}
                      className='inline-block text-sm4'
                    >
                      <h4 className='font-semibold inline-block'>
                        {getFullName(item?.User)}
                      </h4>
                    </Link>
                    <span className='block text-sm5 text-gray-500 leading-3'>
                      {getRelativeTime(item?.createdAt)}
                    </span>
                  </div>
                  <div className='mt-1 text-sm3 bg-gray-100 p-2 rounded-lg inline-block'>
                    {item?.targetedComment ? (
                      <Link
                        href={`/user/${getUsername(
                          item?.targetedComment?.User,
                        )}`}
                        className='font-semibold mr-1 text-primary-main'
                      >
                        {getFullName(item?.targetedComment?.User)}
                      </Link>
                    ) : null}

                    {item?.text}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <Link href='/account' className='block mb-2'>
                  Unfollow Profile
                </Link>
                <Link href='#' className='block mb-2'>
                  Bookmark Post
                </Link>
                <Link href='#' className='block  text-error-main'>
                  Report Post
                </Link>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
}
