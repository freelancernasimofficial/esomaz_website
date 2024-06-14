"use client";

import Modal from "@/components/others/Modal";
import React, { useState } from "react";

type Props = {};

export default function LoadMessages({}: Props) {
  const [action, setAction] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    const ask = confirm("Are you sure you want to delete");
    if (ask) {
      console.log("deleted");
    }
  };

  return (
    <div className='p-3 flex flex-col-reverse h-[calc(100vh-152px)] overflow-y-scroll'>
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
      {[...Array(50)].map((item: any, index: any) => {
        if (index % 2 === 0) {
          return (
            <div className='mb-6 w-full' key={index}>
              <div className='w-full flex'>
                <div className='bg-gray-200 inline-block rounded-lg p-2 shrink-0 max-w-[70%]'>
                  okay
                  <span className='font-bold'>{index}</span>
                </div>
              </div>
              <div className='text-gray-400 float-left text-sm'>
                Seen . 1 minute ago
              </div>
            </div>
          );
        } else {
          return (
            <div className='mb-6 w-full' key={index}>
              <div className='w-full  flex justify-end'>
                <div
                  onClick={() => setAction(index)}
                  className='bg-primary-main text-white inline-block rounded-lg p-2 shrink-0 max-w-[70%]'
                >
                  hm
                  <span className='font-bold'>{index}</span>
                </div>
              </div>
              <div className='text-gray-400 float-right text-sm'>
                Seen . 1 minute ago
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
