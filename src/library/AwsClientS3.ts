import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"; // ES Modules import
const AWSKEY: any = process.env.AWS_KEY;
const SECRETKEY: any = process.env.AWS_SECRET;
const AwsClientS3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: AWSKEY,
    secretAccessKey: SECRETKEY,
  },
});

const uploadFileToS3 = async (
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

export default uploadFileToS3;
