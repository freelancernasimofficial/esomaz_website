import * as React from "react";
import { SVGProps } from "react";
const IconX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    stroke='currentColor'
    strokeWidth={1.5}
    className='w-6 h-6'
    viewBox='0 0 24 24'
    width='24px'
    height='24px'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6 18 18 6M6 6l12 12'
    />
  </svg>
);
export default IconX;
