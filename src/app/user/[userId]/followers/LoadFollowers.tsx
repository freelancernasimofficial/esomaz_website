"use client";
import getFollowersByUserId from "@/actions/user/getFollowersAction";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  userId: any;
};

export default function LoadFollowers({ userId }: Props) {
  const { ref, inView } = useInView({ threshold: 1 });
  const [followers, setFollowers] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (followers.length) {
      if (inView) {
        getFollowersByUserId({
          userId,
          limitFrom: followers.length,
          limitTo: 20,
        })
          .then((data) => {
            if (!data.length) {
              setShowLoader(false);
            }
            setFollowers((prev) => [...prev, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getFollowersByUserId({ userId, limitFrom: 0, limitTo: 20 })
        .then((data) => {
          if (!data.length) {
            setShowLoader(false);
          }
          setFollowers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, userId]);
  return (
    <React.Fragment>
      {followers?.map((item: any, index: number) => {
        return item;
      })}
      {showLoader && followers?.length >= 20 ? (
        <div className='mt-4' ref={ref}>
          <SingleUserSkeleton />
        </div>
      ) : null}
    </React.Fragment>
  );
}
