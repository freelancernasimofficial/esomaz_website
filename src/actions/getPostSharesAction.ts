"use server";

import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getPostSharesAction(postId: string) {
  const querySharedPosts = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User FROM Posts P WHERE P.sharedId=(SELECT id FROM Posts WHERE uuId=${postId}) ORDER BY P.id DESC`,
  );

  return querySharedPosts;
}
