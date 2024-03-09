"use server";

import CookieStore from "@/library/CookieStore";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";

type ReportActionType = {
  reportType: "post" | "user" | "comment";
  itemId: number;
};
export default async function addReportAction(
  reportInfo: ReportActionType,
  formData: any,
) {
  const message = formData.get("message");
  console.log(reportInfo);

  try {
    if (!message.length) {
      throw new Error("Enter a message");
    } else if (message.length > 500) {
      throw new Error("Report length must be less than 500 characters");
    } else {
      const genUID = await makeUniqueId("Reports");
      if (reportInfo.reportType === "post") {
        //add the report
        await Model.prepare(
          "INSERT INTO Reports (uuId,postId,message) VALUES(?,?,?)",
          [genUID, reportInfo.itemId, message],
        );
        CookieStore.setState("success", "Post has been reported");
      }
      if (reportInfo.reportType === "comment") {
        //add the report
        const reportComment = await Model.prepare(
          "INSERT INTO Reports (uuId,commentId,message)VALUES(?,?,?)",
          [genUID, reportInfo.itemId, message],
        );

        CookieStore.setState("success", "Comment has been reported");
      }
      if (reportInfo.reportType === "user") {
        //add the report
        await Model.prepare(
          "INSERT INTO Reports (uuId,userId,message) VALUES(?,?,?)",
          [genUID, reportInfo.itemId, message],
        );
        CookieStore.setState("success", "User has been reported");
      }
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
