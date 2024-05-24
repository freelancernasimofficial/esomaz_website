"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getCommentsAction, {
  addComment,
  deleteComment,
} from "@/actions/commentActions";
import CommentSkeleton from "../skeletons/CommentSkeleton";
import SingleComment from "./SingleComment";
import LoaderSpinnerLarge from "../others/LoaderSpinnerLarge";

type Props = {
  post: any;
};

export default function LoadComments({ post }: Props) {
  const [text, setText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  const { ref, inView } = useInView({ threshold: 1 });

  const handleCommentAction = () => {
    setIsCommenting(true);
    addComment({ postId: post?.id, text: text })
      .then((data: any) => {
        setComments((prev: any) => {
          return prev?.length ? [data, ...prev] : [data];
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsCommenting(false);
        setText("");
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
          setComments(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [comments?.length, inView, post?.id, post?.userId]);

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

          {isCommenting ? (
            <button title='Comment' className='btn btn-primary w-full'>
              <LoaderSpinnerLarge className='w-4 h-4' />
            </button>
          ) : (
            <button
              onClick={handleCommentAction}
              title='Comment'
              className='btn btn-primary w-full'
            >
              Comment
            </button>
          )}
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
      {comments?.length > 15 ? (
        <div ref={ref}>{showLoader ? <CommentSkeleton /> : null}</div>
      ) : null}
    </React.Fragment>
  );
}
