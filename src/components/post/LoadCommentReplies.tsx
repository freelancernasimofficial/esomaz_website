"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getCommentsAction from "@/actions/getCommentsAction";
import CommentSkeleton from "../skeletons/CommentSkeleton";
import deleteCommentAction from "@/actions/deleteCommentAction";
import SingleCommentReply from "./SingleCommentReply";
import getCommentRepliesAction from "@/actions/getCommentRepliesAction";

type Props = {
  parentComment: any;
};

export default function LoadCommentReplies({ parentComment }: Props) {
  const [comments, setComments] = useState<any[]>([]);

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
    getCommentRepliesAction({
      parentCommentId: parentComment?.id,
    })
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [parentComment?.id]);

  return (
    <React.Fragment>
      {comments?.length
        ? comments?.map((item: any, index: number) => {
            return (
              <SingleCommentReply
                handleDelete={handleDelete}
                key={item?.uuId}
                item={item}
              />
            );
          })
        : [...Array(10)].map((_, index: number) => {
            return <CommentSkeleton key={index.toString()} />;
          })}
    </React.Fragment>
  );
}
