import * as React from "react";

function IconAlbumsOutline(props: React.SVGProps<SVGSVGElement>) {
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
        strokeLinejoin='round'
        strokeWidth={32}
        d='M92.87 176 H419.13 A28.87 28.87 0 0 1 448 204.87 V403.13 A28.87 28.87 0 0 1 419.13 432 H92.87 A28.87 28.87 0 0 1 64 403.13 V204.87 A28.87 28.87 0 0 1 92.87 176 z'
      />
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={32}
        d='M144 80h224M112 128h288'
      />
    </svg>
  );
}

export default IconAlbumsOutline;
