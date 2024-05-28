"use server";

import CookieStore from "@/library/CookieStore";
import Validations from "@/library/Validations";
import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { uploadFileToS3 } from "@/library/AwsClientS3";
import crypto from "crypto";
import sharp from "sharp";
import makeUniqueId from "@/library/makeUniqueId";

export async function getFullUserByUsername(username: string) {
  const currentUser = await auth();
  const [user]: any = await Model.query(
    `SELECT *,(SELECT AV.filename FROM Photos AV WHERE AV.id=U.avatarId) AS avatar,(SELECT JSON_OBJECT('id',CV.id,'height',CV.height,'width',CV.width,'filename',CV.filename) FROM Photos CV WHERE CV.userId=U.id AND CV.id=(SELECT coverPhotoId FROM UserInfos WHERE userId=U.id)) AS coverPhoto,(SELECT COUNT(*) FROM Friends MRS WHERE MRS.senderUserId=${currentUser?.id} AND MRS.receiverUserId=U.id AND MRS.isAccepted=0) AS meRequestSent,(SELECT COUNT(*) FROM Friends HRS WHERE HRS.receiverUserId=${currentUser?.id} AND HRS.senderUserId=U.id AND isAccepted=0) AS heRequestSent,(SELECT COUNT(*) FROM Friends FR WHERE (FR.senderUserId=${currentUser?.id} AND FR.receiverUserId=U.id AND isAccepted=1) OR (FR.receiverUserId=${currentUser?.id} AND FR.senderUserId=U.id AND isAccepted=1) ) AS isFriends,(SELECT COUNT(*) FROM Followers UF WHERE UF.userId=U.id) totalFollowers,(SELECT COUNT(*) FROM Followers UFL WHERE UFL.followerId=U.id) totalFollowing,(SELECT COUNT(*) FROM Friends UFR WHERE UFR.senderUserId=U.id OR UFR.receiverUserId=U.id AND UFR.isAccepted=1) totalFriends,(SELECT COUNT(*) FROM Followers HFL WHERE HFL.userId=${currentUser?.id} AND HFL.followerId=U.id) isHeFollowing,(SELECT COUNT(*) FROM Followers MFL WHERE MFL.followerId=${currentUser?.id} AND MFL.userId=U.id) isMeFollowing FROM Users U WHERE U.username="${username}" OR U.uuId="${username}"`,
  );
  return user;
}

export async function getUserPhotos(props: {
  userId: any;
  limitFrom: any;
  limitTo: any;
}) {
  const photos = await Model.query(
    `SELECT * FROM Photos WHERE userId=${props.userId} ORDER BY id DESC LIMIT ${props.limitFrom},${props.limitTo}`,
  );

  return photos;
}

export async function getUserPhotosCount(userId: any) {
  const [totalPhotos] = await Model.query(
    `SELECT COUNT(*) AS total FROM Photos WHERE userId=${userId}`,
  );
  return totalPhotos?.total;
}

export async function getUserInformations(userId: number) {
  const [userInfos] = await Model.query(
    `SELECT *,(SELECT name FROM Countries WHERE id=UF.countryId) AS country,(SELECT COUNT(*) FROM Followers FL WHERE FL.userId=UF.userId) AS totalFollowers FROM UserInfos UF WHERE UF.userId=${userId}`,
  );

  return userInfos;
}

export async function getSingleUserByuuId(uuId: any) {
  const [user] = await Model.prepare(
    `SELECT U.id,U.uuId,U.firstName,U.lastName,U.username,U.subtitle,U.phone,U.isVerified,(SELECT filename FROM Photos WHERE id=U.avatarId) AS avatar FROM Users U WHERE U.username=? OR U.uuId=? OR U.id=?`,
    [uuId, uuId, uuId],
  );

  return user;
}

export async function getTotalFriendsByUserId(userId: any) {
  try {
    const [friends] = await Model.prepare(
      "SELECT COUNT(*) AS total FROM Friends WHERE senderUserId=? OR receiverUserId=? AND isAccepted=1",
      [userId, userId],
    );

    if (friends?.total > 0) {
      return friends.total;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

export async function getTotalFollowersByUserId(userId: any) {
  try {
    const [followers] = await Model.prepare(
      "SELECT COUNT(*) AS total FROM Followers WHERE userId=?",
      [userId],
    );
    if (followers?.total > 0) {
      return followers.total;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);

    return 0;
  }
}

export async function getTotalFollowingByUserId(userId: any) {
  try {
    const [following] = await Model.prepare(
      "SELECT COUNT(*) AS total FROM Followers WHERE followerId=?",
      [userId],
    );
    if (following?.total > 0) {
      return following.total;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);

    return 0;
  }
}

export async function changeBasicInfoAction(formData: any) {
  try {
    const currentUser = await auth();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const subtitle = formData.get("subtitle");
    const phone = formData.get("phone");

    if (
      !firstName?.length ||
      !lastName?.length ||
      !phone?.length ||
      !subtitle?.length
    ) {
      throw new Error("Fields cannot be empty");
    }

    if (!Validations.NameOnly(firstName) || !Validations.NameOnly(lastName)) {
      throw new Error("Invalid firstName or lastName");
    }
    if (!Validations.DescriptionOnly(subtitle)) {
      throw new Error("Invalid designation with special characters");
    }

    if (subtitle?.length > 50) {
      throw new Error("Designation must be in 50 characters only");
    }

    if (!Validations.Phone(phone)) {
      throw new Error("Invalid phone number");
    }

    await Model.prepare(
      "UPDATE Users SET firstName=?,lastName=?,subtitle=?,phone=? WHERE id=?",
      [firstName, lastName, subtitle, phone, currentUser?.id],
    );

    CookieStore.setState("basicSuccess", "Profile Updated");
    revalidatePath("/");
  } catch (error: any) {
    CookieStore.setState("basicError", error?.message);
  }
}

export async function changeProfileInfoAction(formData: any) {
  try {
    const currentUser = await auth();
    const gender = formData.get("gender");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const countryId = formData.get("countryId");
    const postalCode = formData.get("postalCode");
    const shortBio = formData.get("shortBio");
    const workDesignation = formData.get("workDesignation");
    const workingCompany = formData.get("workingCompany");
    const studyLevel = formData.get("studyLevel");
    const instituteName = formData.get("instituteName");
    const skills = formData.get("skills");
    const date = formData.get("date");
    const month = formData.get("month");
    const year = formData.get("year");

    if (
      !gender?.length ||
      !address?.length ||
      !city?.length ||
      !state?.length ||
      !countryId?.length ||
      !postalCode?.length ||
      !shortBio?.length ||
      !workDesignation?.length ||
      !workingCompany?.length ||
      !studyLevel?.length ||
      !instituteName?.length ||
      !skills?.length ||
      !date?.length ||
      !month?.length ||
      !year?.length
    ) {
      throw new Error("Fields cannot be empty");
    }
    if (address?.length > 100) {
      throw new Error("Address must be in 100 characters");
    }
    if (city?.length > 30) {
      throw new Error("City must be in 30 characters");
    }
    if (state?.length > 30) {
      throw new Error("State must be in 30 characters");
    }
    if (shortBio?.length > 150) {
      throw new Error("Biography must be in 150 characters");
    }

    if (workDesignation?.length > 30) {
      throw new Error("Designation must be in 30 characters");
    }
    if (workingCompany?.length > 50) {
      throw new Error("Company name must be in 50 characters");
    }

    if (studyLevel?.length > 50) {
      throw new Error("Study name must be in 50 characters");
    }

    if (instituteName?.length > 50) {
      throw new Error("Institute name must be in 50 characters");
    }
    if (skills?.length > 200) {
      throw new Error("Skills must be in 200 characters");
    }

    //update now
    await Model.prepare(
      "UPDATE UserInfos SET gender=?,address=?,city=?,state=?,countryId=?,postalCode=?,shortBio=?,workDesignation=?,workingCompany=?,studyLevel=?,instituteName=?,skills=?,date=?,month=?,year=? WHERE userId=?",
      [
        gender,
        address,
        city,
        state,
        countryId,
        postalCode,
        shortBio,
        workDesignation,
        workingCompany,
        studyLevel,
        instituteName,
        JSON.stringify(skills.split(",")),
        date,
        month,
        year,
        currentUser?.id,
      ],
    );

    CookieStore.setState("profileSuccess", "Profile Updated");
    revalidatePath("/");
  } catch (error: any) {
    CookieStore.setState("profileError", error?.message);
  }
}

export async function changePasswordAction(formData: any) {
  try {
    const currentUser = await auth();
    const currentPassword = formData.get("current_password");
    const newPassword = formData.get("new_password");
    const confirmPassword = formData.get("confirm_password");

    if (
      !currentPassword?.length ||
      !confirmPassword?.length ||
      !newPassword?.length
    ) {
      throw new Error("Fields cannot be empty");
    }

    if (newPassword?.length < 6 || newPassword?.length > 12) {
      throw new Error("Password must be in 6-12 characters");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Confirm Password Doesn't Match!");
    }

    const [{ password }] = await Model.prepare(
      "SELECT password FROM Users WHERE id=?",
      [currentUser?.id],
    );
    const checkPassword: any = await bcrypt.compare(
      //@ts-ignore
      currentPassword,
      password,
    );

    if (!checkPassword) {
      throw new Error("Current Password Doesn't Match!");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const addNewPassword = await Model.prepare(
      `UPDATE Users SET password=? WHERE id=?`,
      [hashPassword, currentUser?.id],
    );

    CookieStore.setState("success", "Password changed successfully");
    revalidatePath("/");
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}

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

export async function addFollowAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare("INSERT INTO Followers (followerId,userId)VALUES(?,?)", [
    currentUser?.id,
    userId,
  ]);
  //notify
  await Model.prepare(
    "INSERT INTO Notifications (actionType,senderUserId,receiverUserId)VALUES(?,?,?)",
    ["FOLLOW", currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function unFollowAction(userId: number, formData: any) {
  const currentUser = await auth();

  await Model.prepare(
    "DELETE  FROM Followers WHERE followerId=? AND userId=?",
    [currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function followBackAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare("INSERT INTO Followers (followerId,userId)VALUES(?,?)", [
    currentUser?.id,
    userId,
  ]);
  //notify the user
  await Model.prepare(
    "INSERT INTO Notifications (actionType,senderUserId,receiverUserId)VALUES(?,?,?)",
    ["FOLLOW_BACK", currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function addFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "INSERT INTO Friends (senderUserId,receiverUserId)VALUES(?,?)",
    [currentUser?.id, userId],
  );
  //notify
  await Model.prepare(
    "INSERT INTO Notifications (actionType,receiverUserId,senderUserId)VALUES(?,?,?)",
    ["FRIEND_REQUEST", userId, currentUser?.id],
  );
  revalidatePath("/");
}
export async function cancelFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE senderUserId=? and receiverUserId=?",
    [currentUser?.id, userId],
  );
  revalidatePath("/");
}

export async function acceptFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "UPDATE Friends SET isAccepted=? WHERE senderUserId=? AND receiverUserId=?",
    [true, userId, currentUser?.id],
  );

  //notify
  await Model.prepare(
    "INSERT INTO Notifications (actionType,receiverUserId,senderUserId)VALUES(?,?,?)",
    ["CONFIRM_FRIEND_REQUEST", userId, currentUser?.id],
  );
  revalidatePath("/");
}

export async function unFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE (senderUserId=? AND receiverUserId=?) OR (receiverUserId=? AND senderUserId=?) AND isAccepted=?",
    [userId, currentUser?.id, userId, currentUser?.id, true],
  );
  revalidatePath("/");
}

export async function rejectFriendAction(userId: number, formData: any) {
  const currentUser = await auth();
  await Model.prepare(
    "DELETE FROM Friends WHERE senderUserId=? AND receiverUserId=?",
    [userId, currentUser?.id],
  );
  revalidatePath("/");
}
