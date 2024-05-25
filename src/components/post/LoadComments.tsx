"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getCommentsAction, { addComment } from "@/actions/commentActions";
import CommentSkeleton from "../skeletons/CommentSkeleton";
import SingleComment from "./SingleComment";
import LoaderSpinnerLarge from "../others/LoaderSpinnerLarge";
import SubmitButtonClient from "../button/SubmitButtonClient";

type Props = {
  post: any;
};

export default function LoadComments({ post }: Props) {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [formStatus, setFormStatus] = useState({ status: false, message: "" });

  const { ref, inView } = useInView({ threshold: 1 });

  const handleCommentAction = () => {
    setPending(true);
    addComment({ postId: post?.id, text: text })
      .then((data: any) => {
        if (data.status === true) {
          setText("");
          setComments((prev: any) => {
            return prev?.length ? [data?.comment, ...prev] : [data?.comment];
          });
        } else {
          setFormStatus(data);
        }
      })
      .catch((err) => {
        console.log(err);

        setFormStatus(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  useEffect(() => {
    if (comments?.length) {
      if (inView) {
        getCommentsAction({
          postId: post?.id,
          limitFrom: comments?.length,
          limitTo: 20,
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
      })
        .then((data) => {
          if (!data?.length) {
            setShowLoader(false);
          }
          setComments(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [comments?.length, inView, post?.id]);

  return (
    <React.Fragment>
      <div className='bg-white p-4 rounded-lg  mb-4'>
        <div className='flex flex-col'>
          <textarea
            placeholder='Enter comment'
            className='w-full block bg-gray-100 rounded-lg mb-3 p-2 text-sm3'
            name='comment'
            id=''
            onChange={(e) => setText(e.target.value)}
            value={text}
            cols={30}
            rows={3}
          ></textarea>
          {formStatus.status === false && formStatus.message.length > 0 && (
            <div className='errorCard'>{formStatus.message}</div>
          )}
          <SubmitButtonClient
            className='btn btn-primary'
            pending={pending}
            title='Comment'
            onClick={handleCommentAction}
          />
        </div>
      </div>
      <div className='bg-white mt-4 px-4 rounded-lg'>
        {" "}
        <h1 className='font-bold text-base py-3  mb-4 mt-1'>
          Comments ({post?.TotalComments})
        </h1>
        {comments?.map((item: any, index: number) => {
          return <SingleComment key={item?.uuId} item={item} />;
        })}
      </div>
      <div ref={ref}>{showLoader ? <CommentSkeleton /> : null}</div>
    </React.Fragment>
  );
}
