// Libs
import chalk from "chalk";
// Constants
import { MODE, HOST, PORT, WS } from "@/constants/config.constant";
// App
import { init } from "@/app";
import { app } from "@/libs/express.lib";

(async () => {
  try {
    await init();
    app.listen(PORT, () => {
      console.log(
        `-------\n${chalk.black.bgGreenBright(
          `🚀 Server is ready!`
        )}\nmode: ${chalk.blueBright(`${MODE}`)}\nurl: ${chalk.blueBright(
          `http://${HOST}:${PORT}`
        )}\nsockets: ${chalk.blueBright(`http://${HOST}:${WS}`)}\n-------`
      );
    });
  } catch (error) {
    console.log(`${chalk.red.bold(error)}`);
  }
})();
