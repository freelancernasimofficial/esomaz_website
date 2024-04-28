"use server";

import { uploadFileToS3 } from "@/library/AwsClientS3";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import sharp from "sharp";

export async function changeProfilePictureAction(formData: any) {
  try {
    const currentUser = await auth();
    const file = formData.get("file");

    if (!file?.size) {
      throw new Error("Please select a file");
    }
    const makeUID = await makeUniqueId("Posts");
    const addPost = await Model.prepare(
      "INSERT INTO Posts (uuId,userId,type)VALUES(?,?,?)",
      [makeUID, currentUser?.id, "AVATAR"],
    );

    const kbs = file.size / 1000;
    let fileBuffer = Buffer.from(await file.arrayBuffer());
    if (kbs > 500) {
      fileBuffer = await sharp(fileBuffer)
        .resize({ width: 1080 })
        .jpeg({ quality: 70 })
        .toBuffer();
    }
    fileBuffer = await sharp(fileBuffer)
      .resize({ width: 1080, height: 1080 })
      .toBuffer();
    const formatFileName = file.name.split(" ").join("_").toLowerCase();
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileName = currentUser?.uuId + randomName + formatFileName;
    const fileType = file.type;
    await uploadFileToS3(fileBuffer, fileName, fileType);
    //add image name to database
    const savePhoto = await Model.prepare(
      `INSERT INTO Photos (userId,postId,filename)VALUES(?,?,?)`,
      [currentUser?.id, addPost?.insertId, fileName],
    );

    //update avatar ID
    await Model.prepare("UPDATE Users SET avatarId=? WHERE id=?", [
      savePhoto?.insertId,
      currentUser?.id,
    ]);

    revalidatePath("/");
    CookieStore.setState("profilePhotoSuccess", "Photo changed successfully");
  } catch (error: any) {
    CookieStore.setState("profilePhotoError", error.message);
  }
}

export async function changeCoverPhotoAction(formData: any) {
  try {
    const currentUser = await auth();
    const file = formData.get("file");

    if (!file?.size) {
      throw new Error("Please select a file");
    }
    const makeUID = await makeUniqueId("Posts");
    const addPost = await Model.prepare(
      "INSERT INTO Posts (uuId,userId,type)VALUES(?,?,?)",
      [makeUID, currentUser?.id, "COVERPHOTO"],
    );

    const kbs = file.size / 1000;
    let fileBuffer = Buffer.from(await file.arrayBuffer());
    if (kbs > 500) {
      fileBuffer = await sharp(fileBuffer)
        .resize({ width: 1080 })
        .jpeg({ quality: 70 })
        .toBuffer();
    }
    fileBuffer = await sharp(fileBuffer)
      .resize({ width: 1280, height: 768 })
      .toBuffer();
    const formatFileName = file.name.split(" ").join("_").toLowerCase();
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileName = currentUser?.uuId + randomName + formatFileName;
    const fileType = file.type;
    await uploadFileToS3(fileBuffer, fileName, fileType);
    //add image name to database
    const savePhoto = await Model.prepare(
      `INSERT INTO Photos (userId,postId,filename)VALUES(?,?,?)`,
      [currentUser?.id, addPost?.insertId, fileName],
    );

    //update coverphoto ID
    await Model.prepare("UPDATE UserInfos SET coverPhotoId=? WHERE userId=?", [
      savePhoto?.insertId,
      currentUser?.id,
    ]);

    revalidatePath("/");
    CookieStore.setState("coverPhotoSuccess", "Photo changed successfully");
  } catch (error: any) {
    CookieStore.setState("coverPhotoError", error.message);
  }
}
