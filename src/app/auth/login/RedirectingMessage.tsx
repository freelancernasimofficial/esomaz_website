"use client";
import React, { useEffect } from "react";

type Props = {
  message: string;
};

export default function RedirectingMessage({ message }: Props) {
  useEffect(() => {
    setTimeout(() => {
      location.href = "http://localhost:3000";
    }, 1000);
  }, []);

  return <div className='successCard mb-3'>{message}</div>;
}
