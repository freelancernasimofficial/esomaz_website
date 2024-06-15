"use server";

import { revalidatePath } from "next/cache";
import auth from "../auth/auth";
import getUserBalance from "../user/getUserBalance";
import Model from "@/model/Model";

export default async function buyBidPack(bid: any) {
  try {
    const [getBidPack] = await Model.prepare(
      "SELECT * FROM BidPacks WHERE id=?",
      [bid?.id],
    );

    const currentUser = await auth();

    //@ts-ignore
    const funds = await getUserBalance(currentUser?.id);

    if (Number(funds?.balance) < Number(getBidPack?.price)) {
      throw new Error("Insufficient Balance");
    }

    //update bid
    await Model.prepare("UPDATE BidBalance SET bids=? WHERE userId=?", [
      getBidPack?.bids,
      currentUser?.id,
    ]);
    //update balance
    const cutBalance = Number(funds?.balance) - Number(getBidPack?.price);

    await Model.prepare("UPDATE AccountBalances SET balance=? WHERE userId=?", [
      cutBalance,
      currentUser?.id,
    ]);

    revalidatePath("/");
    return { status: true, message: "Bid Pack Upgraded Successfully" };
  } catch (error: any) {
    revalidatePath("/");
    return { status: false, message: error?.message };
  }
}
