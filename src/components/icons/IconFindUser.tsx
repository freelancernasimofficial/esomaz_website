import * as React from "react";

function IconFindUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      height='24px'
      width='24px'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M12 14v2a6 6 0 00-6 6H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9.446 9.032l1.504 1.504-1.414 1.414-1.504-1.504a4 4 0 111.414-1.414zM18 20a2 2 0 100-4 2 2 0 000 4z' />
    </svg>
  );
}

export default IconFindUser;
