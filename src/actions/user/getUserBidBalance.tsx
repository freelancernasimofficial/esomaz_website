"use server";

import Model from "@/model/Model";
import React from "react";
import auth from "../auth/auth";

export default async function getUserBidBalance(userId: string) {
  try {
    const currentUser = await auth();
    const getBal = await Model.prepare(
      "SELECT bids FROM BidBalance WHERE userId=?",
      [currentUser?.id],
    );
    if (getBal.length) {
      return getBal[0].bids;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}
