"use client";
import getFollowingsByUserId from "@/actions/user/getFollowingsAction";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  userId: any;
};

export default function LoadFollowings({ userId }: Props) {
  const { ref, inView } = useInView({ threshold: 1 });
  const [followings, setFollowings] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (followings.length) {
      if (inView) {
        getFollowingsByUserId({
          userId,
          limitFrom: followings.length,
          limitTo: 20,
        })
          .then((data) => {
            if (!data.length) {
              setShowLoader(false);
            }
            setFollowings((prev) => [...prev, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getFollowingsByUserId({ userId, limitFrom: 0, limitTo: 20 })
        .then((data) => {
          if (!data.length) {
            setShowLoader(false);
          }
          setFollowings(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [followings.length, inView, userId]);
  return (
    <React.Fragment>
      {followings?.map((item: any, index: number) => {
        return item;
      })}
      {showLoader ? (
        <div className='mt-4' ref={ref}>
          <SingleUserSkeleton />
        </div>
      ) : null}
    </React.Fragment>
  );
}
