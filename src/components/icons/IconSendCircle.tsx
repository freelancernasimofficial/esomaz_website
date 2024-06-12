import * as React from "react";

function IconSendCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      height='1em'
      width='1em'
      {...props}
    >
      <path d='M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2M8 7.71v3.34l7.14.95-7.14.95v3.34L18 12 8 7.71z' />
    </svg>
  );
}

export default IconSendCircle;
