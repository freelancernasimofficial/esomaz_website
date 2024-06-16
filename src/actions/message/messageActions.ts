"use server";

import Model from "@/model/Model";
import auth from "../auth/auth";
import makeUniqueId from "@/library/makeUniqueId";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";

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
    const currentUser = await auth();
    const inboxUID = await makeUniqueId("Inboxes");

    //CREATE THE INBOX
    const createInbox = await Model.prepare(
      "INSERT INTO Inboxes (uuId, senderUserId,receiverUserId,lastMessage) VALUES(?,?,?,?)",
      [inboxUID, currentUser?.id, friendId, message],
    );

    //ADD THE MESSAGE
    const addMessage = await Model.prepare(
      "INSERT INTO InboxMessages(inboxId,userId,text,photoId)VALUES(?,?,?,?)",
      [createInbox?.insertId, currentUser?.id, message, null],
    );

    return {
      status: true,
      messaage: message,
    };
  } catch (error: any) {
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
