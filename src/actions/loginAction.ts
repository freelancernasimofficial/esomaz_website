"use server";
import { cookies } from "next/headers";
import Model from "../model/Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ServerActionType } from "../types/types";

export default async function loginAction(
  formData: FormData,
): Promise<ServerActionType> {
  cookies().delete("error");
  cookies().delete("success");
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    //find user
    let [checkUser]: any = await Model.prepare(
      `SELECT * FROM Users WHERE  email=? ||  RIGHT(phone, 11) = ? || RIGHT(phone, 10) = ? || username=?`,
      [email, email, email, email],
    );

    if (!checkUser) {
      throw new Error("No user found");
    }

    const checkPassword: any = await bcrypt.compare(
      //@ts-ignore
      password,
      checkUser?.password,
    );

    if (!checkPassword) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        id: checkUser?.id,
        uuId: checkUser?.uuId,
        username: checkUser?.username,
        firstName: checkUser?.fname,
        lastName: checkUser?.lname,
      },
      //@ts-ignore
      process.env.ACCESS_TOKEN_SECRET,
    );

    cookies().set("success", "Login Successful", { maxAge: 0 });
    cookies().set("__jwtsession", token, {
      maxAge: 86400 * 90,
      httpOnly: true,
      sameSite: "lax",
    });

    return {
      status: true,
      data: checkUser,
      message: "Login Successful. Redirecting...",
    };
  } catch (error: any) {
    cookies().set("error", error.message, { maxAge: 0 });
    return {
      status: false,
      message: "Login Failed",
      data: undefined,
    };
  }
}
