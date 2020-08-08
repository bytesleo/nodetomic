// Libs
import AWS from "aws-sdk";
// Constants
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_PINPOINT_ID,
  MODE,
} from "@/constants/config.constant";

AWS.config.update({
  accessKeyId: AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  region: AWS_S3_REGION,
});

const aws_s3 = new AWS.S3();
const pinpoint = new AWS.Pinpoint({ apiVersion: "2016-12-01" });

const s3 = async (data) => {
  try {
    const result = await aws_s3
      .upload({
        Bucket: data.bucket,
        Body: data.body,
        Key: `${MODE}${data.path}`,
      })
      .promise();
    console.log({ result });
    return result;
  } catch (err) {
    console.log({ s3simpleError: err });
  }
};

const s3Arr = async (data) => {
  try {
    const resultS3 = await aws_s3
      .upload({
        Bucket: data.bucket,
        Body: data.body,
        Key: `${MODE}${data.path}`,
      })
      .promise();
    return resultS3;
  } catch (err) {
    console.log({ s3simpleError: err });
  }
};

const sendEmail = async (data) => {
  try {
    console.log("📧 email", data);

    if (MODE !== "development") {
      const params = {
        ApplicationId: AWS_PINPOINT_ID,
        MessageRequest: {
          Addresses: {
            [data.to]: {
              ChannelType: "EMAIL",
            },
          },
          MessageConfiguration: {
            EmailMessage: {
              FromAddress: data.from,
              SimpleEmail: {
                Subject: {
                  Charset: "UTF-8",
                  Data: data.subject,
                },
                // HtmlPart: {
                //   Charset: "UTF-8",
                //   Data: body_html,
                // },
                TextPart: {
                  Charset: "UTF-8",
                  Data: data.message,
                },
              },
            },
          },
        },
      };

      const result = await pinpoint.sendMessages(params).promise();
      console.log({ result });
      console.log({ detail: result.MessageResponse.Result });
    }
  } catch (err) {
    console.log({ PinPointEmailError: err });
  }
};

const sendSMS = async (data) => {
  try {
    console.log("📱 sms", data);

    if (MODE !== "development") {
      const params = {
        ApplicationId: AWS_PINPOINT_ID,
        MessageRequest: {
          Addresses: {
            [data.to]: {
              BodyOverride: data.message,
              ChannelType: "SMS",
            },
          },
          MessageConfiguration: {
            SMSMessage: {
              Body: data.message,
              MessageType: "TRANSACTIONAL",
            },
          },
        },
      };

      const result = await pinpoint.sendMessages(params).promise();
      console.log({ result });
    }
  } catch (err) {
    console.log({ PinPointSMSError: err });
  }
};

export { s3, s3Arr, sendEmail, sendSMS };

// Test SMS
// sendSMS({
//   to: "+573192035101",
//   from: "WeFlow",
//   message: "We flow: Esto es una prueba",
// });

// Test Email
// sendEmail({
//   to: "leonardo.ricog@gmail.com",
//   from: "hi@weflow.me",
//   subject: "WeFlow",
//   message: "Soy otra prueba",
//   templateId: 22,
//   params: {}
// });

// Test S3
// s3({
//   bucket: "weflow",
//   body: "Soy un texto",
//   path: "/hi/hola.txt",
// });
