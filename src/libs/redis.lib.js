import Redis from 'ioredis';
// Constants
import {
  REDIS_HOSTNAME,
  REDIS_PORT,
  REDIS_PASSWORD
} from '@/constants/config.constant';

let redis;

const connect = () =>
  new Promise((resolve, reject) => {
    const r = new Redis(
      REDIS_PASSWORD
        ? `redis://:${REDIS_PASSWORD}@${REDIS_HOSTNAME}:${REDIS_PORT}/0`
        : `redis://${REDIS_HOSTNAME}:${REDIS_PORT}/0`
    );

    r.on('connect', function () {
      console.log('✅ Redis: connected!');
      redis = r;
      resolve();
    });

    r.on('error', (err) => {
      console.error('❌ Redis: error');
      reject(err);
    });
  });

export { connect, redis };
