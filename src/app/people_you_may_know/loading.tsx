import VerticalUsersSkeleton from "@/components/skeletons/VerticalUsersSkeleton";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className='container'>
      <VerticalUsersSkeleton />
    </div>
  );
}
