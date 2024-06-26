"use client";

import getPostReactions from "@/actions/post/getPostReactions";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  postuuId: any;
  reactionType: any;
};

export default function LoadPostReactions({ postuuId, reactionType }: Props) {
  const { inView, ref } = useInView({ threshold: 1 });
  const [reactions, setReactions] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (reactions.length) {
      if (inView) {
        getPostReactions({
          postuuId,
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
      getPostReactions({ postuuId, reactionType, limitFrom: 0, limitTo: 20 })
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
  }, [inView, postuuId, reactionType]);

  return (
    <React.Fragment>
      {reactions?.map((item) => {
        return item;
      })}
      {showLoader && reactions.length >= 20 ? (
        <div ref={ref}>
          <SingleUserSkeleton className='mt-4 mx-2' />
        </div>
      ) : null}
    </React.Fragment>
  );
}
