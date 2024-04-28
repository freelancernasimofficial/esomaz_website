"use server";

import CookieStore from "@/library/CookieStore";
import Validations from "@/library/Validations";
import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export async function changeBasicInfoAction(formData: any) {
  try {
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
      "UPDATE Users SET firstName=?,lastName=?,subtitle=?,phone=?",
      [firstName, lastName, subtitle, phone],
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
