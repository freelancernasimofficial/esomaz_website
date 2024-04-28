"use server";
import { uploadFileToS3 } from "@/library/AwsClientS3";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import sharp from "sharp";
export default async function addNewPostAction(prevState: any, formData: any) {
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
