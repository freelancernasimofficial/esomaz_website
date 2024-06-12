"use client";

import getPostShares from "@/actions/post/getPostShares";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  postuuId: string;
};

export default function LoadShares({ postuuId }: Props) {
  const { inView, ref } = useInView({ threshold: 1 });
  const [shares, setShares] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (shares.length) {
      if (inView) {
        getPostShares({
          postuuId,
          limitFrom: shares?.length,
          limitTo: 50,
        })
          .then((data) => {
            if (data?.length) {
              setShares((prev: any) => [...prev, ...data]);
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
      getPostShares({
        postuuId,
        limitFrom: 0,
        limitTo: 50,
      })
        .then((data) => {
          if (data?.length) {
            setShares(data);
          } else {
            setShowLoader(false);
          }
        })
        .catch((err) => {
          setShowLoader(false);
          console.log(err);
        })
        .finally(() => {
          if (shares.length >= 20 === false) {
            setShowLoader(false);
          }
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, postuuId]);
  return (
    <React.Fragment>
      {shares?.map((item) => {
        return item;
      })}
      {showLoader ? (
        <div ref={ref}>
          <SingleUserSkeleton className='mt-2' />
        </div>
      ) : null}
    </React.Fragment>
  );
}
