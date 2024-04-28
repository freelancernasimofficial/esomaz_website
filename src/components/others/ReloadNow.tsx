"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  url?: string;
};

export default function ReloadNow({ url }: Props) {
  useEffect(() => {
    if (location) {
      if (url?.length) {
        location.href = url;
      } else {
        location.reload();
      }
    }
  }, [url]);
  return <div></div>;
}
