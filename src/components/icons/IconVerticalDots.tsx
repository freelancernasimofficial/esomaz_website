import * as React from "react";

function IconVerticalDots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 512 512'
      fill='currentColor'
      height='24px'
      width='24px'
      {...props}
    >
      <path d='M304 256 A48 48 0 0 1 256 304 A48 48 0 0 1 208 256 A48 48 0 0 1 304 256 z' />
      <path d='M304 416 A48 48 0 0 1 256 464 A48 48 0 0 1 208 416 A48 48 0 0 1 304 416 z' />
      <path d='M304 96 A48 48 0 0 1 256 144 A48 48 0 0 1 208 96 A48 48 0 0 1 304 96 z' />
    </svg>
  );
}

export default IconVerticalDots;
