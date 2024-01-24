import * as React from "react";

function IconChat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 512 512'
      fill='currentColor'
      height='24px'
      width='24px'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={32}
        d='M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a42.63 42.63 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.64 139.09 140.72 48 255.82 48 356.2 48 440 117.54 459.57 209.85a199 199 0 014.43 41.64c0 112.41-89.49 204.93-204.59 204.93-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.14 31.14 0 00-11.13-2.07 30.7 30.7 0 00-12.08 2.43L81.5 462.78a15.92 15.92 0 01-4.66 1.22 9.61 9.61 0 01-9.58-9.74 15.85 15.85 0 01.6-3.29z'
      />
      <path d='M192 256 A32 32 0 0 1 160 288 A32 32 0 0 1 128 256 A32 32 0 0 1 192 256 z' />
      <path d='M288 256 A32 32 0 0 1 256 288 A32 32 0 0 1 224 256 A32 32 0 0 1 288 256 z' />
      <path d='M384 256 A32 32 0 0 1 352 288 A32 32 0 0 1 320 256 A32 32 0 0 1 384 256 z' />
    </svg>
  );
}

export default IconChat;