"use client";

import Link from "next/link";
import React, { useState } from "react";
import Modal from "../others/Modal";
import Avatar from "./Avatar";
import getFullName from "@/library/getFullName";
import SubmitButtonClient from "../button/SubmitButtonClient";
import { sendFirstMessage } from "@/actions/message/messageActions";

type Props = {
  inbox: any;
  friend: any;
};

export default function MessageButton({ inbox, friend }: Props) {
  const [showMsgForm, setShowMsgForm] = useState(false);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const sendMsg = async () => {
    setPending(true);

    const send = await sendFirstMessage({
      friendId: friend?.id,
      message: text,
    });

    if (send.status === true) {
      setText("");
      setErrorMsg("");
      setSuccessMsg(send.messaage);
    } else {
      setSuccessMsg("");
      setErrorMsg(send.messaage);
    }
    setPending(false);
  };

  return (
    <>
      {showMsgForm ? (
        <Modal onClickBackdrop={() => setShowMsgForm(false)}>
          <div className='flex items-center'>
            <Avatar user={friend} />
            <div className='ml-2'>
              <h1 className='font-semibold'> {getFullName(friend)}</h1>
              <span className='text-gray-500 text-sm'>Sending New Message</span>
            </div>
          </div>
          {!successMsg.length ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.trimStart())}
              cols={10}
              rows={5}
              className='w-full mt-2'
              placeholder='Enter Message'
              name='message'
              id='message'
            ></textarea>
          ) : null}
          {errorMsg.length ? <div className='errorCard'>{errorMsg}</div> : null}
          {successMsg.length ? (
            <div className='successCard mt-2'>{successMsg}</div>
          ) : null}
          {successMsg.length ? (
            <Link
              className='btn btn-primary mt-2'
              href={`/messages/${inbox?.uuId}`}
            >
              Go To Messenger
            </Link>
          ) : (
            <SubmitButtonClient
              onClick={sendMsg}
              pending={pending}
              title='Send Message'
              className='btn btn-primary w-full mt-2'
            />
          )}
        </Modal>
      ) : null}
      {inbox?.uuId ? (
        <Link
          href={`/messages/${inbox?.uuId}`}
          className='btn flex items-center'
        >
          Message
        </Link>
      ) : (
        <button
          onClick={() => setShowMsgForm(true)}
          className='btn flex items-center'
        >
          Message
        </button>
      )}
    </>
  );
}
