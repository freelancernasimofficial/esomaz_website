"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  message: string;
};

export default function RedirectingMessage({ message }: Props) {
  useEffect(() => {
    setTimeout(() => {
      location.href = "http://localhost:3000";
    }, 2000);
  }, []);

  return <div className='successCard'>{message}</div>;
}
