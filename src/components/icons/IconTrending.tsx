import * as React from "react";

function IconTrending(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill='none' viewBox='0 0 24 24' height='24px' width='24px' {...props}>
      <path
        fill='currentColor'
        d='M1.414 16.432L0 15.018l7.071-7.071 6.364 6.364 4.243-4.243-1.743-1.742 6.692-1.793-1.793 6.692-1.742-1.742-5.657 5.656-6.364-6.364-5.657 5.657z'
      />
    </svg>
  );
}

export default IconTrending;
