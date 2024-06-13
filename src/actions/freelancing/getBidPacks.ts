"use server";

import Model from "@/model/Model";

export default async function getBidPacks() {
  try {
    const bids = await Model.query("SELECT * FROM BidPacks");
    return bids;
  } catch (error) {
    return [];
  }
}
