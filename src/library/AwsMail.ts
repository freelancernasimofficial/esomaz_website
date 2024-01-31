import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

//@ts-ignore
const ses = new SESClient({
  apiVersion: "2010-12-01",
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const AwsMail = async (
  subject: string,
  to: string,
  body = `<b>This is a test email from eSomaz.Com</b>`,
  fromEmail = "noreply@esomaz.com",
) => {
  const sendEmailCommand: any = new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        to,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */

        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject ?? "This is subject",
      },
    },
    Source: `eSomaz.Com <${fromEmail}>`,
    ReplyToAddresses: [
      /* more items */
    ],
  });

  try {
    return ses.send(sendEmailCommand);
  } catch (e: any) {
    return e.message;
  }
};

export default AwsMail;
