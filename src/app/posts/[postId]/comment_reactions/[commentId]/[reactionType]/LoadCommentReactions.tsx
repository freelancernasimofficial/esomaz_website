"use client";

import getCommentReactions from "@/actions/post/getCommentReactions";
import getPostReactions from "@/actions/post/getPostReactions";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  commentId: any;
  reactionType: any;
};

export default function LoadCommentReactions({
  commentId,
  reactionType,
}: Props) {
  const { inView, ref } = useInView({ threshold: 1 });
  const [reactions, setReactions] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (reactions.length) {
      if (inView) {
        getCommentReactions({
          commentId,
          reactionType,
          limitFrom: reactions?.length,
          limitTo: 20,
        })
          .then((data) => {
            if (data?.length) {
              setReactions((prev: any) => [...prev, ...data]);
            } else {
              setShowLoader(false);
            }
          })
          .catch((err) => {
            setShowLoader(false);
            console.log(err);
          });
      }
    } else {
      getCommentReactions({
        commentId,
        reactionType,
        limitFrom: 0,
        limitTo: 20,
      })
        .then((data) => {
          if (data?.length) {
            setReactions(data);
          } else {
            setShowLoader(false);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, commentId, reactionType]);

  return (
    <React.Fragment>
      {reactions?.map((item) => {
        return item;
      })}
      {showLoader && reactions?.length >= 20 ? (
        <div ref={ref}>
          <SingleUserSkeleton className='mt-4 mx-2' />
        </div>
      ) : null}
    </React.Fragment>
  );
}
