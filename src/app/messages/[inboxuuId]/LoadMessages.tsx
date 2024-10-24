"use client";

import {
  getInboxMessages,
  sendMessage,
} from "@/actions/message/messageActions";
import SubmitButtonClient from "@/components/button/SubmitButtonClient";
import IconSendCircle from "@/components/icons/IconSendCircle";
import Modal from "@/components/others/Modal";
import Avatar from "@/components/user/Avatar";
import SingleUser from "@/components/user/SingleUser";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import React, { useEffect, useState } from "react";

type Props = {
  inbox: any;
};

export default function LoadMessages({ inbox }: Props) {
  const [text, setText] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [hideLoadMore, setHideLoadMore] = useState<boolean>(false);
  const [loadMorePending, setLoadMorePending] = useState(false);
  const [action, setAction] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const friend =
    inbox?.currentUserId === inbox?.senderUserId
      ? inbox?.ReceiverUser
      : inbox?.SenderUser;

  const sendMsg = () => {
    if (!text.length) {
      return undefined;
    }
    setPending(true);
    setErrorMsg("");
    sendMessage({ inboxId: inbox?.id, message: text })
      .then((data: any) => {
        setText("");
        if (data?.id) {
          setMessages((prev: any) => [data, ...prev]);
        }
      })
      .catch((err) => {
        setErrorMsg(err?.message);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    const ask = confirm("Are you sure you want to delete");
    if (ask) {
      console.log("deleted");
    }
  };

  const loadMoreMsg = () => {
    setLoadMorePending(true);
    setTimeout(() => {
      getInboxMessages({
        inboxId: inbox?.id,
        limitFrom: messages?.length,
        limitTo: 50,
      })
        .then((data) => {
          if (data?.length) {
            setMessages((prev: any) => [...prev, ...data]);
          } else {
            setHideLoadMore(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadMorePending(false);
        });
    }, 500);
  };

  useEffect(() => {
    if (!messages.length) {
      getInboxMessages({
        inboxId: inbox?.id,
        limitFrom: 0,
        limitTo: 50,
      })
        .then((data) => {
          setMessages(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inbox?.id, messages.length]);

  return (
    <React.Fragment>
      <div>
        <div className='h-12 bg-slate-800 text-white border-b fixed left-0 top-14 w-full z-20 flex items-center px-3'>
          <SingleUser
            subtitleClass='text-gray-300'
            className='!mt-0'
            user={friend}
          />
        </div>
        <div className='h-12 w-full'></div>
      </div>
      <div className='p-3 flex flex-col-reverse h-[calc(100vh-144px)] overflow-y-scroll'>
        {action ? (
          <Modal onClickBackdrop={() => setAction(undefined)}>
            <div>
              <textarea
                placeholder='Current Message'
                className='w-full mb-2'
                rows={2}
                cols={10}
                name=''
                id=''
              ></textarea>
              <div className='flex justify-between'>
                <button
                  onClick={handleEdit}
                  className='btn h-8 btn-success w-full mr-2'
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className='btn h-8 btn-error w-full ml-2'
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        ) : null}

        {messages.map((item: any, index: any) => {
          if (item?.userId !== item?.currentUserId) {
            return (
              <div className='mb-6 w-full' key={index}>
                <div className='bg-gray-200 inline-block rounded-lg p-2 shrink-0 max-w-[70%]'>
                  {item?.text}
                </div>
                <div className='text-gray-400 text-xs'>
                  {getRelativeTime(item?.createdAt)}
                </div>
              </div>
            );
          } else {
            return (
              <div className='mb-6' key={index}>
                <div className='w-full flex justify-end'>
                  {" "}
                  <div
                    onClick={() => setAction(index)}
                    className='bg-primary-main text-white inline-block rounded-lg p-2 shrink-0 max-w-[70%]'
                  >
                    {item?.text}
                  </div>
                </div>
                <div className='text-gray-400 text-xs float-right'>
                  Seen . {getRelativeTime(item?.createdAt)}
                </div>
              </div>
            );
          }
        })}

        {messages?.length >= 50 && !hideLoadMore ? (
          <SubmitButtonClient
            pending={loadMorePending}
            title='Load More'
            onClick={loadMorePending ? undefined : loadMoreMsg}
            className='btn mx-auto py-1.5 mb-4'
          />
        ) : null}
      </div>
      <div>
        <div className='h-10 w-full'></div>
        <div className='bg-gray-300 w-full h-10 flex items-center justify-between fixed bottom-0'>
          {errorMsg?.length ? (
            <div className='absolute bottom-10 w-full h-8 bg-error-main text-white text-center flex items-center justify-center'>
              {errorMsg}
            </div>
          ) : null}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.trimStart())}
            className='w-full rounded-none flex-1 h-full focus-visible:outline-none bg-transparent'
            placeholder='Enter Message'
            cols={10}
            rows={1}
          ></textarea>
          <SubmitButtonClient
            onClick={sendMsg}
            title={<IconSendCircle className='w-6 h-6' />}
            pending={pending}
            className='bg-primary-main text-white flex items-center justify-center w-12 h-full'
          />
        </div>
      </div>
    </React.Fragment>
  );
}
