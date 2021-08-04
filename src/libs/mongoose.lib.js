import mongoose from 'mongoose';
// Constants
import {
  MONGODB_HOSTNAME,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  PROJECT_MODE
} from '@/constants/config.constant';

const PORT = require('net').isIP(MONGODB_HOSTNAME) ? `:${MONGODB_PORT}` : '';

// print mongoose logs in dev env
if (PROJECT_MODE === 'development') {
  // mongoose.set('debug', true);
}

const connect = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(
      MONGODB_USERNAME && MONGODB_PASSWORD
        ? `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTNAME}${PORT}/${MONGODB_DATABASE}`
        : `mongodb://${MONGODB_HOSTNAME}${PORT}/${MONGODB_DATABASE}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
    const db = mongoose.connection;

    db.once('connected', () => {
      console.log('✅ MongoDB: connected!');
      resolve();
    });

    db.on('error', (error) => {
      console.error('❌ MongoDB: error');
      reject(error);
    });
  });

export { connect };
