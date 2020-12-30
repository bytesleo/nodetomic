### Install

```bash
yarn add fcm-push
```

### Setup

```javascript
// Libs
import FCM from 'fcm-push';
// Constants
import { FCM_SERVER_KEY, MODE } from '@/constants/config.constant';
// Business
import UsersBusiness from '@/business/users.business';

const fcm = new FCM(FCM_SERVER_KEY);

const sendPushNotification = async (body) => {
  try {
    if (body?.to.length === 0) {
      throw 'Empty push_notifications array...';
    }

    const message = {
      // to: abcdf.... //One... required fill with device token or topics
      registration_ids: body.to, // Multiple...1 and at most 1000 registration tokens
      collapse_key: 'your_collapse_key',
      priority: 'high',
      notification: body.notification,
      data: body.data || {}
    };

    console.log('🔔 Push notification', message);

    if (MODE !== 'development') {
      let result = await fcm.send(message);

      console.log({ result });

      result = JSON.parse(result);

      const results = result?.results;

      if (results?.length > 0) {
        // Check results array, preserve tokens that were successful by reading their index in 'results' (same order as they came as argument in this function)
        const successTokens = body.to.filter((x, i) => !results[i].error);

        const oldTokensCount = body.to.length - successTokens.length || 0;

        console.log(`Old Tokens to delete: ${oldTokensCount}`);

        // Optional
        // if (oldTokensCount > 0) {
        // await UsersBusiness.fcmClearGarbage(body.userId, successTokens);
        // }
      }

      return result;
    }
  } catch (err) {
    console.log({ FCMError: err });

    if (err === 'NotRegistered') {
      console.log(
        'All Tokens failed, proceeding to empty push_notifications array for this User...'
      );
      // Optional
      // await UsersBusiness.fcmClearGarbage(body.receiverId, []);
    }

    return { err, success: false };
  }
};

export { sendPushNotification };
```

### Remove invalid tokens from db (Optional)

```javascript
const fcmClearGarbage = async (userId, tokens) => {
  await UserModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(userId)
    },
    {
      push_notifications: tokens
    }
  );
};
```

### Update token (Optional)

```javascript
const fcmUpdate = async (userId, token) => {
  return await UserModel.updateOne(
    {
      enabled: true,
      _id: mongoose.Types.ObjectId(userId)
    },
    {
      $addToSet: {
        push_notifications: token
      }
    }
  );
};
```

### TEST

```javascript
Test FCM
  await sendPushNotification({
    to: ["abc"],
    notification: {
      title: "Nodetomic",
      body: "Hello world",
    },
    userId: ""
  });
```
