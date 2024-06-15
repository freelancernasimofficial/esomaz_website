"use server";
import Model from "@/model/Model";

export default async function makeUniqueId(tableName: string) {
  try {
    const [currentRecords] = await Model.query(
      `SELECT id FROM ${tableName} ORDER BY id DESC LIMIT 1`,
    );

    if (currentRecords?.id) {
      const makeId = Date.now().toString() + (currentRecords?.id + 1);
      return makeId;
    } else {
      const makeId = Date.now().toString() + 1;
      return makeId;
    }
  } catch (error: any) {
    return error?.message;
  }
}
