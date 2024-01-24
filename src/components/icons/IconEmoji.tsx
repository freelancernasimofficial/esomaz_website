import * as React from "react";
import { SVGProps } from "react";
const IconEmoji = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='ionicon s-ion-icon'
    viewBox='0 0 512 512'
    width='24px'
    height='24px'
    {...props}
  >
    <title>{"Happy"}</title>
    <circle cx={184} cy={232} r={24} />
    <path d='M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 0 1 7.82-10.17h175.69a8 8 0 0 1 7.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83z' />
    <circle cx={328} cy={232} r={24} />
    <circle
      cx={256}
      cy={256}
      r={208}
      className='ionicon-fill-none ionicon-stroke-width'
    />
  </svg>
);
export default IconEmoji;
