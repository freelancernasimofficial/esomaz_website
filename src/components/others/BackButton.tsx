"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: HTMLButtonElement["className"];
};

export default function BackButton({ className }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`btn btn-primary cursor-pointer ${className ?? ""}`}
    >
      Back
    </button>
  );
}
