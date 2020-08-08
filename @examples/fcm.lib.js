import FCM from "fcm-push";

import { FCM_SERVER_KEY, MODE } from "@/constants/config.constant";

const fcm = new FCM(FCM_SERVER_KEY);

const sendPushNotification = async (body) => {
  try {
    const message = {
      // to: abcdf.... //One... required fill with device token or topics
      registration_ids: body.to, // Multiple...1 and at most 1000 registration tokens
      collapse_key: "your_collapse_key",
      notification: body.notification,
      data: body.data || {},
    };

    console.log("🔔 Push notification", message);

    if (MODE !== "development") {
      let result = await fcm.send(message);
      console.log({ result });
    }
  } catch (err) {
    console.log({ FCMError: err });
  }
};

export { sendPushNotification };

// Test FCM
// await sendPushNotification({
//   to: [push_notifications]
//   notification: {
//     title: "WeFlow",
//     body: "Tienes un nuevo Match",
//     icon: "https://telolavo.com.co/logo192.png",
//   },
// });
