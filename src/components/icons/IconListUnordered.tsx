import * as React from "react";

function IconListUnordered(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      height='24px'
      width='24px'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6.9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z' />
    </svg>
  );
}

export default IconListUnordered;
