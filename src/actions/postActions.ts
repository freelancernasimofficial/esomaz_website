"use server";

import { deleteS3File, uploadFileToS3 } from "@/library/AwsClientS3";
import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import crypto from "crypto";
import CookieStore from "@/library/CookieStore";
export async function addNewPostAction(prevState: any, formData: any) {
  try {
    const currentUser = await auth();
    const files = formData.getAll("file");
    const text = formData.get("text");

    if (files[0].size === 0 && text.length === 0) {
      throw new Error("Please write something or select image");
    }

    if (text.length > 2000) {
      throw new Error("Text must be less than 2000 characters");
    }

    if (files.length > 5) {
      throw new Error("Maximum 5 photos are allowed");
    }
    //create the post

    const makeuuId = await makeUniqueId("Posts");
    const addPost = await Model.prepare(
      `INSERT INTO Posts (uuId,text,userId)VALUES(?,?,?)`,
      [makeuuId, text, currentUser?.id],
    );

    // if there is any file then upload the files

    for (let file of files) {
      if (file.size > 0) {
        const kbs = file.size / 1000;
        let fileBuffer = Buffer.from(await file.arrayBuffer());
        if (kbs > 500) {
          fileBuffer = await sharp(fileBuffer)
            .resize({ width: 1080 })
            .jpeg({ quality: 70 })
            .toBuffer();
        }
        const formatFileName = file.name.split(" ").join("_").toLowerCase();
        const randomName = crypto.randomBytes(16).toString("hex");
        const fileName = currentUser?.uuId + randomName + formatFileName;
        const fileType = file.type;
        await uploadFileToS3(fileBuffer, fileName, fileType);
        //add image name to database
        await Model.prepare(
          `INSERT INTO Photos (userId,postId,filename)VALUES(?,?,?)`,
          [currentUser?.id, addPost?.insertId, fileName],
        );
      }
    }

    revalidatePath("/");
    return {
      status: true,
      message: "Post submitted successfully. Redirecting...",
    };
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
    };
  }
}

export async function getHomePagePosts(props: {
  limitFrom: any;
  limitTo: any;
}) {
  const user = await auth();
  const posts = await Model.query(
    `SELECT *,${user?.id} AS currentUserId, (${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND P.id=MR.postId) AS myReactionType,(SELECT JSON_OBJECT('id',SP.id,'uuId',SP.uuId,'text',SP.text,'createdAt',SP.createdAt,'type',SP.type,'User',(${getUserByObjectQuery(
      "SP.userId",
    )}),'Photos',(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',SPH.id,'height',SPH.height,'width',SPH.width,'filename',SPH.filename)) FROM Photos AS SPH WHERE SPH.postId=SP.id)) FROM Posts SP WHERE SP.id=P.sharedId) AS SharedPost FROM Posts AS P ORDER BY P.id DESC LIMIT ${
      props.limitFrom
    },${props.limitTo}`,
  );

  return posts;
}

export async function getPostShares(postuuId: string) {
  try {
    const querySharedPosts = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "P.userId",
      )}) AS User FROM Posts P WHERE P.sharedId=(SELECT id FROM Posts WHERE uuId=${postuuId}) ORDER BY P.id DESC`,
    );

    return querySharedPosts;
  } catch (error) {
    return undefined;
  }
}

export async function getProfilePosts({
  userId,
  limitFrom,
  limitTo,
}: {
  limitFrom: any;
  limitTo: any;
  userId: any;
}) {
  const currentUser = await auth();
  const posts = await Model.query(
    `SELECT *,${currentUser?.id} AS currentUserId,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares,(SELECT type FROM Reactions MR WHERE MR.userId=${
      currentUser?.id
    } AND P.id=MR.postId) AS myReactionType,(SELECT JSON_OBJECT('id',SP.id,'uuId',SP.uuId,'text',SP.text,'createdAt',SP.createdAt,'type',SP.type,'User',(${getUserByObjectQuery(
      "SP.userId",
    )}),'Photos',(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',SPH.id,'height',SPH.height,'width',SPH.width,'filename',SPH.filename)) FROM Photos AS SPH WHERE SPH.postId=SP.id)) FROM Posts SP WHERE SP.id=P.sharedId) AS SharedPost FROM Posts AS P WHERE P.userId=${userId} ORDER BY P.id DESC LIMIT ${limitFrom},${limitTo}`,
  );
  return posts;
}

export async function getSinglePost(postuuId: any) {
  const user = await auth();
  const [post] = await Model.query(
    `SELECT *,${user?.id} AS currentUserId,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND P.id=MR.postId) AS myReactionType,(SELECT JSON_OBJECT('id',SP.id,'uuId',SP.uuId,'text',SP.text,'createdAt',SP.createdAt,'User',(${getUserByObjectQuery(
      "SP.userId",
    )}),'Photos',(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',SPH.id,'height',SPH.height,'width',SPH.width,'filename',SPH.filename)) FROM Photos AS SPH WHERE SPH.postId=SP.id)) FROM Posts SP WHERE SP.id=P.sharedId) AS SharedPost FROM Posts AS P WHERE P.uuId=${postuuId}`,
  );
  return post;
}

export async function reactionAction(itemInfo: {
  itemId: number;
  itemType: string;
  reactionType: string;
}) {
  try {
    const user = await auth();

    //if post reaction
    if (itemInfo.itemType === "post") {
      if (itemInfo.reactionType === "removeReaction") {
        await Model.prepare(
          `DELETE FROM Reactions WHERE userId=? AND postId=?`,
          [user?.id, itemInfo.itemId],
        );
      } else {
        const checkReaction = await Model.prepare(
          "SELECT * FROM Reactions WHERE userId=? AND postId=?",
          [user?.id, itemInfo.itemId],
        );
        if (checkReaction?.length) {
          await Model.prepare(
            "UPDATE Reactions SET type=? WHERE userId=? AND postId=?",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );
        } else {
          const reactPost = await Model.prepare(
            "INSERT INTO Reactions (type,userId,postId) VALUES(?,?,?)",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );

          const [getThePost] = await Model.prepare(
            "SELECT * FROM Posts WHERE id=?",
            [itemInfo.itemId],
          );
          if (getThePost.userId !== user?.id) {
            //send notification
            await Model.prepare(
              "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,postId,postReactionId)VALUES(?,?,?,?,?)",
              [
                "POST_REACTION",
                getThePost.userId,
                user?.id,
                getThePost.id,
                reactPost.insertId,
              ],
            );
          }
        }
      }
    } else if (itemInfo.itemType === "comment") {
      if (itemInfo.reactionType === "removeReaction") {
        await Model.prepare(
          `DELETE FROM Reactions WHERE userId=? AND commentId=?`,
          [user?.id, itemInfo.itemId],
        );
      } else {
        const checkReaction = await Model.prepare(
          "SELECT * FROM Reactions WHERE userId=? AND commentId=?",
          [user?.id, itemInfo.itemId],
        );
        if (checkReaction?.length) {
          await Model.prepare(
            "UPDATE Reactions SET type=? WHERE userId=? AND commentId=?",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );
        } else {
          const reactComment = await Model.prepare(
            "INSERT INTO Reactions (type,userId,commentId) VALUES(?,?,?)",
            [itemInfo.reactionType, user?.id, itemInfo?.itemId],
          );

          const [getTheComment] = await Model.prepare(
            "SELECT * FROM Comments WHERE id=?",
            [itemInfo.itemId],
          );
          //notify
          if (getTheComment.userId !== user?.id) {
            await Model.prepare(
              "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,postId,commentId,commentReactionId)VALUES(?,?,?,?,?,?)",
              [
                "NEW_COMMENT_REACTION",
                getTheComment.userId,
                user?.id,
                getTheComment.postId,
                itemInfo.itemId,
                reactComment.insertId,
              ],
            );
          }
        }
      }
    }
    revalidatePath("/");
  } catch (error) {
    revalidatePath("/");
    return error;
  }
}

export async function editPost({
  postId,
  text,
}: {
  postId: any;
  text: string;
}) {
  const currentUser = await auth();
  try {
    if (text.length > 2000) {
      throw new Error("Post can not be more than 2000 characters");
    } else {
      //edit comment
      await Model.prepare("UPDATE Posts SET text=? WHERE id=? AND userId=?", [
        text,
        postId,
        currentUser?.id,
      ]);

      revalidatePath("/");
      return {
        status: true,
        message: "Post edited successfully",
      };
    }
  } catch (error: any) {
    revalidatePath("/");
    return {
      status: false,
      message: error?.message,
    };
  }
}

export async function deletePost(postId: number) {
  try {
    const currentUser = await auth();
    if (postId) {
      //get photo names to delete
      const postPhotos = await Model.prepare(
        "SELECT * FROM Photos WHERE postId=? AND userId=?",
        [postId, currentUser?.id],
      );
      //if photos available then delete first
      if (postPhotos?.length) {
        for (let photo of postPhotos) {
          await deleteS3File(photo?.filename);
        }
      }
      //delete the post also
      await Model.prepare("DELETE FROM Posts WHERE id=? AND userId=?", [
        postId,
        currentUser?.id,
      ]);
      revalidatePath("/");
      return {
        status: true,
        message: "Post deleted successfully",
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
    };
  }
}

export async function getPostReactions(postuuId: string, reactionType: string) {
  if (reactionType === "all") {
    const getReactions = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "R.userId",
      )}) AS User FROM Reactions R WHERE R.postId=(SELECT id FROM Posts WHERE uuId=${postuuId})`,
    );
    return getReactions;
  } else {
    const getReactions = await Model.query(
      `SELECT *,(${getUserByObjectQuery(
        "R.userId",
      )}) AS User FROM Reactions R WHERE R.type="${reactionType}" AND R.postId=(SELECT id FROM Posts WHERE uuId=${postuuId})`,
    );
    return getReactions;
  }
}

export async function sharePostAction(postId: any, formData: any) {
  const text = formData?.get("text");
  const user = await auth();

  try {
    if (text.length > 2000) {
      throw new Error("Text length is too big!");
    } else {
      const mkuuId = await makeUniqueId("Posts");
      const sharePost = await Model.prepare(
        "INSERT INTO Posts (uuId,text,sharedId,userId)VALUES(?,?,?,?)",
        [mkuuId, text, postId, user?.id],
      );
      //send notification
      const [getThePost] = await Model.prepare(
        "SELECT * FROM Posts WHERE id=?",
        [postId],
      );
      await Model.prepare(
        "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,postId,sharedPostId)VALUES(?,?,?,?,?)",
        [
          "NEW_POST_SHARE",
          getThePost.userId,
          user?.id,
          postId,
          sharePost.insertId,
        ],
      );
      CookieStore.setState("success", "Post shared successfully");
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
