import * as React from "react";

function IconArrowForward(props: React.SVGProps<SVGSVGElement>) {
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
        strokeLinejoin='round'
        strokeWidth={48}
        d='M268 112l144 144-144 144M392 256H100'
      />
    </svg>
  );
}

export default IconArrowForward;
