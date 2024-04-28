"use server";

import Model from "@/model/Model";

export default async function getCountriesAction() {
  const countries = await Model.query("SELECT * FROM Countries");
  return countries;
}
