import * as React from "react";
import { SVGProps } from "react";
const IconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    stroke='currentColor'
    strokeWidth={1.5}
    className='w-5 h-5 max-sm:hidden'
    viewBox='0 0 24 24'
    width='24px'
    height='24px'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 4.5v15m7.5-7.5h-15'
    />
  </svg>
);
export default IconPlus;
