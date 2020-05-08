import Redis from "ioredis";
// Constants
import { URI_REDIS } from "@/constants/config.constant";

let redis;

const connect = () =>
  new Promise((resolve, reject) => {
    const r = new Redis(URI_REDIS);

    r.on("connect", function() {
      console.log("✅ Redis: connected!");
      redis = r;
      resolve();
    });

    r.on("error", err => {
      console.error("❌ Redis: error");
      reject(err);
    });
  });

export { connect, redis };
