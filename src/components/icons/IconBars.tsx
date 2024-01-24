import * as React from "react";
import { SVGProps } from "react";
const IconBars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='ionicon s-ion-icon'
    viewBox='0 0 512 512'
    width='24px'
    height='24px'
    {...props}
  >
    <title>{"Menu"}</title>
    <path
      d='M80 160h352M80 256h352M80 352h352'
      className='ionicon-fill-none ionicon-stroke-width'
    />
  </svg>
);
export default IconBars;
