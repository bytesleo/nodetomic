---
title: AWS
parent: Custom libs
nav_order: 1
---

# AWS

### Install

```bash
yarn add aws-sdk
```

### Setup

```javascript
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_PINPOINT_ID,
  PROJECT_MODE
} from '@/constants/config.constant';

import { renderTemplate } from '../utils/layout.util';

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

const aws_s3 = new AWS.S3();
const pinpoint = new AWS.Pinpoint({ apiVersion: '2016-12-01' });
```

### s3

```javascript
const s3Upload = async (config = {}, files) => {
  try {
    console.log('s3 upload', { config });
    let result = [];

    if (files && files instanceof Array) {
      let promises = [];

      for (const file of files) {
        promises.push(
          aws_s3
            .upload({
              Bucket: config.bucket,
              Body: file.data,
              Key: `${PROJECT_MODE}${config.path}${file.md5}_${file.name}`
            })
            .promise()
        );
      }

      const values = await Promise.all(promises);

      values.map((x) => {
        result.push({
          url: x.Location,
          ...config
        });
      });
    }

    console.log({ result });
    return result;
  } catch (err) {
    console.log({ s3UploadError: err });
  }
};
```

```javascript
const s3Delete = async (deletion) => {
  try {
    console.log('s3 delete', { deletion });
    let result = [];

    // Always receive Array, even for 1 element
    if (deletion && deletion instanceof Array) {
      let promises = [];

      for (const element of deletion) {
        promises.push(
          aws_s3
            .deleteObject({
              Bucket: element.bucket,
              Key: element.key
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
```

### Pinpoint

```javascript
const sendEmail = async (data) => {
  try {
    console.log('📧 email', data);

    if (PROJECT_MODE !== 'development') {
      const parts = {};

      // simple email
      if (data.message)
        parts.TextPart = {
          Charset: 'UTF-8',
          Data: data.message
        };

      // html email
      if (data.template)
        parts.HtmlPart = {
          Charset: 'UTF-8',
          Data: await renderTemplate(data.template, data.params)
        };

      const params = {
        ApplicationId: AWS_PINPOINT_ID,
        MessageRequest: {
          Addresses: {
            [data.to]: {
              ChannelType: 'EMAIL'
            }
          },
          MessageConfiguration: {
            EmailMessage: {
              FromAddress: data.from,
              SimpleEmail: {
                Subject: {
                  Charset: 'UTF-8',
                  Data: data.subject
                },
                ...parts
              }
            }
          }
        }
      };

      const result = await pinpoint.sendMessages(params).promise();
      console.log({ result });
      console.log({ detail: result.MessageResponse.Result });
    }
  } catch (err) {
    console.log({ sendEmailError: err });
  }
};
```

```javascript
const sendSMS = async (data) => {
  try {
    console.log('📱 sms', data);

    if (PROJECT_MODE !== 'development') {
      const params = {
        ApplicationId: AWS_PINPOINT_ID,
        MessageRequest: {
          Addresses: {
            [data.to]: {
              BodyOverride: data.message,
              ChannelType: 'SMS'
            }
          },
          MessageConfiguration: {
            SMSMessage: {
              Body: data.message,
              MessageType: 'TRANSACTIONAL'
            }
          }
        }
      };

      const result = await pinpoint.sendMessages(params).promise();
      console.log({ result });
    }
  } catch (err) {
    console.log({ sendSMSError: err });
  }
};
```

### TEST

```javascript
// Test S3 upload
s3Upload(
  {
    bucket: 'Nodetomic',
    path: `development/images/user1/`
  },
  files
);

// Test S3 delete
s3Delete([
  {
    bucket: 'Nodetomic',
    key: `development/images/xxxxx.jpg`
  }
]);

// Test SMS
sendSMS({
  to: '+573001111111',
  from: 'Nodetomic',
  message: 'Nodetomic: 123'
});

// Test Email
sendEmail({
  to: 'user@example.com',
  from: 'hi@example.com',
  subject: 'Nodetomic',
  message: 'This is a test',
  template: 'email.register',
  params: {
    code: 123
  }
});
```
