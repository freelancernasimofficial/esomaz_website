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
      {comments?.length
        ? comments?.map((item: any, index: number) => {
            return (
              <SingleComment
                postId={post?.uuId}
                handleDelete={handleDelete}
                key={item?.uuId}
                item={item}
              />
            );
          })
        : [...Array(20)].map((_, index: number) => {
            return <CommentSkeleton key={index.toString()} />;
          })}
      <div ref={ref}>{showLoader ? <CommentSkeleton /> : null}</div>
    </React.Fragment>
  );
}
