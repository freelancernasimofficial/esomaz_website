"use server";

import Model from "@/model/Model";
import auth from "../auth/auth";
import makeUniqueId from "@/library/makeUniqueId";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getInbox(inboxuuId: any) {
  try {
    const currentUser = await auth();

    const inbox = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "IB.senderUserId",
      )}) AS SenderUser,(${getUserByObjectQuery(
        "IB.receiverUserId",
      )}) AS ReceiverUser,${
        currentUser?.id
      } AS currentUserId FROM Inboxes IB WHERE IB.uuId=${inboxuuId}`,
    );
    if (inbox?.length) {
      return inbox[0];
    } else {
      throw new Error("No Inbox Found");
    }
  } catch (error) {
    return undefined;
  }
}

export async function getInboxByFriendId(friendId: any) {
  try {
    const currentUser = await auth();
    const inbox = await Model.query(
      `SELECT * FROM Inboxes WHERE (senderUserId=${friendId} AND receiverUserId=${currentUser?.id}) OR (senderUserId=${currentUser?.id} AND receiverUserId=${friendId})`,
    );
    if (inbox?.length) {
      return inbox[0];
    } else {
      throw new Error("No Inbox Found");
    }
  } catch (error) {
    return undefined;
  }
}

export async function getInboxMessages({
  inboxId,
  limitFrom,
  limitTo,
}: {
  inboxId: number;
  limitFrom: number;
  limitTo: number;
}) {
  try {
    const currentUser = await auth();
    const messages = await Model.query(
      `SELECT *,${currentUser?.id} AS currentUserId FROM InboxMessages IM WHERE IM.inboxId=${inboxId} ORDER BY IM.id DESC LIMIT ${limitFrom},${limitTo}`,
    );
    return messages;
  } catch (error) {
    return [];
  }
}

export async function sendFirstMessage({
  friendId,
  message,
}: {
  friendId: number;
  message: string;
}) {
  try {
    if (!message.length) {
      throw new Error("Please write something");
    }

    //CHECK EXISTING INBOX
    const check = await getInboxByFriendId(friendId);

    if (check?.uuId) {
      throw new Error("Please refresh the page");
    }

    const currentUser = await auth();
    const inboxUID = await makeUniqueId("Inboxes");

    //CREATE THE INBOX
    const createInbox = await Model.prepare(
      "INSERT INTO Inboxes (uuId, senderUserId,receiverUserId,lastMessage) VALUES(?,?,?,?)",
      [inboxUID, currentUser?.id, friendId, message],
    );

    //ADD THE MESSAGE
    await Model.prepare(
      "INSERT INTO InboxMessages(inboxId,userId,text,photoId)VALUES(?,?,?,?)",
      [createInbox?.insertId, currentUser?.id, message, null],
    );

    revalidatePath("/");
    return {
      status: true,
      messaage: "Message has been sent",
    };
  } catch (error: any) {
    revalidatePath("/");
    return {
      status: false,
      messaage: error?.message,
    };
  }
}

export async function sendMessage({
  inboxId,
  message,
}: {
  inboxId: number;
  message: string;
}) {
  try {
    const currentUser = await auth();
    const createMessage = await Model.prepare(
      "INSERT INTO InboxMessages(inboxId,userId,text,photoId)VALUES(?,?,?,?)",
      [inboxId, currentUser?.id, message, null],
    );

    const makeMessage = {
      id: createMessage?.insertId,
      inboxId: inboxId,
      userId: currentUser?.id,
      text: message,
      photoId: null,
      seen: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      currentUserId: currentUser?.id,
    };
    return makeMessage;
  } catch (error: any) {
    return {
      status: false,
      messaage: error?.message,
    };
  }
}
