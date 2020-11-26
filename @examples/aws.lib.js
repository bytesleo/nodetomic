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

const s3 = async (data = {}, upload = {}) => {
  try {
    console.log("s3", { data });
    let result;

    // multiple
    if (upload && upload instanceof Array) {
      let promises = [];
      result = [];

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

      // once
    } else if (upload && upload instanceof Object) {
      const value = await aws_s3
        .upload({
          Bucket: data.bucket,
          Body: upload.data,
          Key: `${MODE}${data.path}${upload.md5}_${upload.name}`,
        })
        .promise();
      result = {
        url: value.Location,
        ...data,
      };
    }
    console.log({ result });
    return result;
  } catch (err) {
    console.log({ s3Error: err });
  }
};

const s3_delete = async (deletion) => {
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
    console.log({ s3Error: err });
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

export { s3, s3_delete, sendEmail, sendSMS };

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
//   template: "register",
//   params: {
//     code: 1456,
//   },
// });

// Test S3
// await s3(
//   {
//     bucket: "weflow",
//     path: `/covers/${userId}/`,
//   },
//   files
// );

// Test S3_delete
// (async () => {
//   await s3_delete([
//     {
//       bucket: "weflow-app",
//       key: `development/covers/5f3ea5f74540bb41e965ad4b/dbc2951f1be4a64c1e8739339b87e037_6C38F877-FC29-4CD0-B1C8-023F5801DF4A.jpg`,
//     },
//   ]);
// })();
