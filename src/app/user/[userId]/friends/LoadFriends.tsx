"use client";

import getFriendsByUserIdAction from "@/actions/user/getFriendsAction";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  userId: any;
};

export default function LoadFriends({ userId }: Props) {
  const { ref, inView } = useInView({ threshold: 1 });
  const [friends, setFriends] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (friends.length) {
      if (inView) {
        getFriendsByUserIdAction({
          userId,
          limitFrom: friends.length,
          limitTo: 20,
        })
          .then((data) => {
            if (!data.length) {
              setShowLoader(false);
            }
            setFriends((prev) => [...prev, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getFriendsByUserIdAction({ userId, limitFrom: 0, limitTo: 20 })
        .then((data) => {
          if (!data.length) {
            setShowLoader(false);
          }
          setFriends(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, userId]);
  return (
    <React.Fragment>
      {friends?.map((item: any, index: number) => {
        return item;
      })}
      {showLoader && friends.length >= 20 ? (
        <div className='mt-4' ref={ref}>
          <SingleUserSkeleton />
        </div>
      ) : null}
    </React.Fragment>
  );
}
