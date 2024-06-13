"use server";

import Model from "@/model/Model";

export default async function getOfficialValue(variable: string) {
  try {
    const getValue = await Model.prepare(
      "SELECT * FROM OfficialVariables WHERE variable=?",
      [variable],
    );
    if (getValue?.length) {
      return getValue[0]?.value;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}
