import * as React from "react";

function IconLogout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      height='1em'
      width='1em'
      {...props}
    >
      <path d='M22 12l-4-4v3h-8v2h8v3m2 2a10 10 0 110-12h-2.73a8 8 0 100 12z' />
    </svg>
  );
}

export default IconLogout;
