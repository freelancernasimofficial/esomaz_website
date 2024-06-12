"use client";

import getPostShares from "@/actions/post/getPostShares";
import peopleYouMayKnowAction from "@/actions/user/peopleYouMayKnowAction";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {};

export default function LoadPeople({}: Props) {
  const { inView, ref } = useInView({ threshold: 1 });
  const [people, setPeople] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (people.length) {
      if (inView) {
        peopleYouMayKnowAction({
          limitFrom: people?.length,
          limitTo: 50,
        })
          .then((data) => {
            if (data?.length) {
              setPeople((prev: any) => [...prev, ...data]);
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
      peopleYouMayKnowAction({
        limitFrom: 0,
        limitTo: 30,
      })
        .then((data) => {
          if (data?.length) {
            setPeople(data);
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
  }, [inView]);
  return (
    <React.Fragment>
      {people?.map((item) => {
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
