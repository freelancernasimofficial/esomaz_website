"use server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"; // ES Modules import
const AWSKEY: any = process.env.AWS_KEY;
const SECRETKEY: any = process.env.AWS_SECRET;
const AwsClientS3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: AWSKEY,
    secretAccessKey: SECRETKEY,
  },
});

export const uploadFileToS3 = async (
  file: any,
  filename: string,
  fileType: string,
) => {
  const command = new PutObjectCommand({
    Bucket: "esomaz.com",
    Key: `user_uploads/photos/${filename}`,
    Body: file,
    ContentType: fileType,
  });

  try {
    const response = await AwsClientS3.send(command);
    return response;
  } catch (err: any) {
    return err?.message;
  }
};

export const deleteS3File = async (filename: string) => {
  const command = new DeleteObjectCommand({
    Bucket: "esomaz.com",
    Key: `user_uploads/photos/${filename}`,
  });

  try {
    const response = await AwsClientS3.send(command);
    return response;
  } catch (err: any) {
    return err?.message;
  }
};

export const getS3PhotoLink = (filename: string) => {
  return `https://s3.ap-south-1.amazonaws.com/esomaz.com/user_uploads/photos/${filename}`;
};
