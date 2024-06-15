"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: HTMLButtonElement["className"];
  title?: any;
};

export default function BackButton({ className, title }: Props) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={className}>
      {title ? title : "Back"}
    </button>
  );
}
