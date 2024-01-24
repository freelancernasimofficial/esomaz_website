import * as React from "react";

function IconUserMinus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      viewBox='0 0 24 24'
      height='24px'
      width='24px'
      {...props}
    >
      <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
      <path d='M12.5 7 A4 4 0 0 1 8.5 11 A4 4 0 0 1 4.5 7 A4 4 0 0 1 12.5 7 z' />
      <path d='M23 11h-6' />
    </svg>
  );
}

export default IconUserMinus;
