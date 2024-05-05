"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getCommentsAction from "@/actions/getCommentsAction";
import CommentSkeleton from "../skeletons/CommentSkeleton";
import SingleComment from "./SingleComment";
import deleteCommentAction from "@/actions/deleteCommentAction";

type Props = {
  post: any;
};

export default function LoadComments({ post }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [currentReplyCommentId, setCurrentReplyCommentId] = useState<number>();
  const { ref, inView } = useInView({ threshold: 1 });
  const handleDelete = (commentId: any) => {
    deleteCommentAction(commentId)
      .then(() => {
        const filterComments = comments?.filter(
          (comment: any) => comment?.id !== commentId,
        );
        setComments(filterComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (comments?.length) {
      if (inView) {
        getCommentsAction({
          postId: post?.id,
          limitFrom: comments?.length,
          limitTo: 20,
          postOwnerId: post?.userId,
        })
          .then((data) => {
            if (!data?.length) {
              setShowLoader(false);
            }

            setComments((prev: any) => {
              if (!JSON.stringify(prev)?.includes(data[0]?.uuId)) {
                return [...prev, ...data];
              } else {
                return prev;
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getCommentsAction({
        postId: post?.id,
        limitFrom: comments?.length,
        limitTo: 20,
        postOwnerId: post?.userId,
      })
        .then((data) => {
          setComments(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [comments?.length, inView, post?.id, post?.userId]);

  return (
    <React.Fragment>
      <div className='bg-white p-4 rounded-lg  mb-4'>
        <form className='flex flex-col'>
          <textarea
            placeholder='Enter comment'
            className='w-full block bg-gray-100 rounded-lg mb-3 p-2 text-sm3'
            name='comment'
            id=''
            cols={30}
            rows={3}
          ></textarea>

          <button title='Comment' className='btn btn-primary w-full'>
            Comment
          </button>
        </form>
      </div>
      <div className='bg-white mt-4 px-4 rounded-lg'>
        {" "}
        <h1 className='font-bold text-base pt-3  mb-4 mt-1'>
          Comments ({post?.TotalComments})
        </h1>
        {comments?.map((item: any, index: number) => {
          return (
            <SingleComment
              currentReplyCommentId={currentReplyCommentId}
              setCurrentReplyCommentId={setCurrentReplyCommentId}
              postId={post?.uuId}
              handleDelete={handleDelete}
              key={item?.uuId}
              item={item}
            />
          );
        })}
      </div>
      <div ref={ref}>{showLoader ? <CommentSkeleton /> : null}</div>
    </React.Fragment>
  );
}
