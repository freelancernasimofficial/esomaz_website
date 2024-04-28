"use server";

import Model from "@/model/Model";

type Props = {
  userId: any;
  limitFrom: any;
  limitTo: any;
};
export default async function getUserPhotosAction(props: Props) {
  const photos = await Model.query(
    `SELECT * FROM Photos WHERE userId=${props.userId} ORDER BY id DESC LIMIT ${props.limitFrom},${props.limitTo}`,
  );

  return photos;
}

export async function getUserTotalPhotoCountAction(userId: any) {
  const [totalPhotos] = await Model.query(
    `SELECT COUNT(*) AS total FROM Photos WHERE userId=${userId}`,
  );
  return totalPhotos?.total;
}
