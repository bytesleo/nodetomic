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

import { renderTemplate } from "../utils/template.util";

AWS.config.update({
  accessKeyId: AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  region: AWS_S3_REGION,
});

const aws_s3 = new AWS.S3();
const pinpoint = new AWS.Pinpoint({ apiVersion: "2016-12-01" });

const s3Upload = async (data = {}, upload = {}) => {
  try {
    console.log("s3", { data });
    let result = [];

    if (upload && upload instanceof Array) {
      let promises = [];

      for (const file of upload) {
        promises.push(
          aws_s3
            .upload({
              Bucket: data.bucket,
              Body: file.data,
              Key: `${MODE}${data.path}${file.md5}_${file.name}`,
            })
            .promise()
        );
      }

      const values = await Promise.all(promises);

      values.map((x) => {
        result.push({
          url: x.Location,
          ...data,
        });
      });
    }

    console.log({ result });
    return result;
  } catch (err) {
    console.log({ s3UploadError: err });
  }
};

const s3Delete = async (deletion) => {
  try {
    console.log("s3_delete", { deletion });
    let result = [];

    // Always receive Array, even for 1 element
    if (deletion && deletion instanceof Array) {
      let promises = [];

      for (const element of deletion) {
        promises.push(
          aws_s3
            .deleteObject({
              Bucket: element.bucket,
              Key: element.key,
            })
            .promise()
        );
      }

      await Promise.all(promises);
    }

    result = deletion.map((x) => x.key);
    console.log(result);
    return result;
  } catch (err) {
    console.log({ s3DeleteError: err });
  }
};

const sendEmail = async (data) => {
  try {
    console.log("📧 email", data);

    if (MODE !== "development") {
      const parts = {};

      // simple email
      if (data.message)
        parts.TextPart = {
          Charset: "UTF-8",
          Data: data.message,
        };

      // html email
      if (data.template)
        parts.HtmlPart = {
          Charset: "UTF-8",
          Data: renderTemplate(data.template, data.params),
        };

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
                ...parts,
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
    console.log({ sendEmailError: err });
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
    console.log({ sendSMSError: err });
  }
};

export { s3Upload, s3Delete, sendEmail, sendSMS };

// Test SMS
// sendSMS({
//   to: "+573001111111",
//   from: "Nodetomic",
//   message: "Nodetomic: This is a test",
// });

// Test Email
// sendEmail({
//   to: "user@example.com",
//   from: "hi@example.com",
//   subject: "Nodetomic",
//   message: "This is a test",
//   template: "register",
//   params: {
//     code: 123,
//   },
// });

// Test S3
// await s3Upload(
//   {
//     bucket: "Nodetomic",
//     path: `development/images/user1/`,
//   },
//   files
// );

// Test S3_delete

// s3Delete([
//   {
//     bucket: "Nodetomic",
//     key: `development/images/xxxxx.jpg`,
//   }
// ]);
