import chalk from 'chalk';
// Constants
import {
  PROJECT_MODE,
  SERVER_HOSTNAME,
  SERVER_PORT,
  SERVER_WEBSOCKET_PORT
} from '@/constants/config.constant';
// App
import { init } from '@/app';
import { app } from '@/libs/express.lib';

(async () => {
  try {
    await init();
    app.listen(SERVER_PORT, () => {
      console.log(
        `-------\n${chalk.black.bgGreenBright(
          `🚀 Server is ready!`
        )}\nmode: ${chalk.blueBright(
          `${PROJECT_MODE}`
        )}\nserver: ${chalk.blueBright(
          `http://${SERVER_HOSTNAME}:${SERVER_PORT}`
        )}\nsocket: ${chalk.blueBright(
          `http://${SERVER_HOSTNAME}:${SERVER_WEBSOCKET_PORT}`
        )}\n-------`
      );
    });
  } catch (error) {
    console.log(`${chalk.red.bold(error)}`);
  }
})();
