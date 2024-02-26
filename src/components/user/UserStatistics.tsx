import getCompactNumber from "@/library/getCompactNumber";
import React from "react";

type Props = { user: any };

export default function UserStatistics({ user }: Props) {
  return (
    <React.Fragment>
      {" "}
      <div className='text-center'>
        <div className='font-bold text-lg'>
          {getCompactNumber(user?.totalFriends)}
        </div>
        <div className='leading-3'>Friends</div>
      </div>
      <div className='text-center mx-5'>
        <div className='font-bold text-lg'>
          {getCompactNumber(user?.totalFollowers)}
        </div>
        <div className='leading-3'>Followers</div>
      </div>
      <div className='text-center'>
        <div className='font-bold text-lg'>
          {getCompactNumber(user?.totalFollowing)}
        </div>
        <div className='leading-3'>Following</div>
      </div>
    </React.Fragment>
  );
}
