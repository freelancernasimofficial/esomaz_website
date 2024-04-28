"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function ReloadNow({}: Props) {
  useEffect(() => {
    if (location) {
      location.reload();
    }
  }, []);
  return <div></div>;
}
