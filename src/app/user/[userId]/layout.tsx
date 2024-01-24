import ProfileCard from "@/components/user/ProfileCard";
import { headers } from "next/headers";
import React from "react";

type Props = {
  children: any;
  params?: any;
};

export default function UserLayout(props: Props) {
  return (
    <div className='container'>
      <ProfileCard />
      {props.children}
    </div>
  );
}
