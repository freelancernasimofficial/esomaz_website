import * as React from "react";

function IconEllipse(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 512 512'
      fill='currentColor'
      height='24px'
      width='24px'
      {...props}
    >
      <path d='M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z' />
    </svg>
  );
}

export default IconEllipse;
