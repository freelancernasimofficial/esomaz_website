"use client";
import React, { InputHTMLAttributes, useCallback, useState } from "react";
import IconImagesOutline from "../icons/IconImagesOutline";
import Image from "next/image";

type Props = {
  className?: HTMLInputElement["className"];
  multiple?: boolean;
};

export default function FileUploadButton({ className, multiple }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [error, setError] = useState<any>("");

  const onSelectFiles = useCallback((e: any) => {
    const filesArray: any = [];
    if (e.target.files) {
      for (let f of e.target.files) {
        filesArray.push(f);
      }
    }
    if (filesArray?.length > 5) {
      setError("Maximum 5 photos are allowed");
    } else {
      setFiles(filesArray);
      setError("");
    }
  }, []);

  return (
    <div>
      {" "}
      {files?.length ? (
        <div className='flex flex-wrap overflow-hidden'>
          {files?.map((img: any, index: number) => {
            return (
              <div
                className='w-24 relative h-24 bg-gray-200 m-2 rounded overflow-hidden'
                key={index}
              >
                <Image
                  className='w-full h-full'
                  width={500}
                  height={500}
                  src={URL.createObjectURL(img)}
                  alt=''
                />
              </div>
            );
          })}
        </div>
      ) : null}
      {error?.length ? <div className='errorCard text-sm3'>{error}</div> : null}
      <label
        htmlFor='file'
        className='border relative border-dashed p-2 rounded-lg block cursor-pointer'
      >
        <input
          className={`opacity-0 absolute h-full w-full left-0 top-0 cursor-pointer ${
            className ? className : ""
          }`}
          onChange={onSelectFiles}
          id='file'
          name='file'
          type='file'
          multiple={multiple}
        />
        <div className='flex flex-col items-center justify-center'>
          <IconImagesOutline className='w-10 h-10 text-gray-500' />
          <div className='font-medium text-gray-800 text-sm4 mt-2'>
            Browse Photos
          </div>
        </div>
      </label>
    </div>
  );
}
