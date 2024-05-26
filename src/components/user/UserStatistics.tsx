import getCompactNumber from "@/library/getCompactNumber";
import React from "react";

type Props = { user: any };

export default function UserStatistics({ user }: Props) {
  return (
    <React.Fragment>
      {" "}
      <div className='text-center'>
        <div className='font-bold '>{getCompactNumber(user?.totalFriends)}</div>
        <div className='leading-4  font-semibold text-gray-400'>Friends</div>
      </div>
      <div className='text-center mx-5'>
        <div className='font-bold '>
          {getCompactNumber(user?.totalFollowers)}
        </div>
        <div className='leading-4  font-semibold text-gray-400'>Followers</div>
      </div>
      <div className='text-center'>
        <div className='font-bold '>
          {getCompactNumber(user?.totalFollowing)}
        </div>
        <div className='leading-4  font-semibold text-gray-400'>Following</div>
      </div>
    </React.Fragment>
  );
}
