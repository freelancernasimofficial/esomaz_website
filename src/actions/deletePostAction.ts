"use server";
import { deleteS3File } from "@/library/AwsClientS3";
import Model from "@/model/Model";

export default async function deletePostAction(postId: number) {
  if (postId) {
    //get photo names to delete
    const postPhotos = await Model.prepare(
      "SELECT * FROM Photos WHERE postId=?",
      [postId],
    );
    //if photos available then delete first
    if (postPhotos?.length) {
      for (let photo of postPhotos) {
        await deleteS3File(photo?.filename);
      }
    }
    //delete the post also
    await Model.prepare("DELETE FROM Posts WHERE id=?", [postId]);
  }
}
