import React from "react";
import IconImagesOutline from "../icons/IconImagesOutline";

type Props = {};

export default function FileUploadButton({}: Props) {
  return (
    <label
      htmlFor='file'
      className='border relative border-dashed p-2 rounded-lg block cursor-pointer'
    >
      <input
        className='opacity-0 absolute h-full w-full left-0 top-0 cursor-pointer'
        id='file'
        name='files'
        type='file'
        multiple={true}
      />
      <div className='flex flex-col items-center justify-center'>
        <IconImagesOutline className='w-10 h-10 text-gray-500' />
        <div className='font-medium text-gray-800 text-sm4 mt-2'>
          Browse Photos
        </div>
      </div>
    </label>
  );
}
