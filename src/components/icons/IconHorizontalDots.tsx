import * as React from "react";
import { SVGProps } from "react";
const IconHorizontalDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='ionicon s-ion-icon'
    viewBox='0 0 512 512'
    width='24px'
    height='24px'
    {...props}
  >
    <circle cx={256} cy={256} r={48} />
    <circle cx={416} cy={256} r={48} />
    <circle cx={96} cy={256} r={48} />
  </svg>
);
export default IconHorizontalDots;
