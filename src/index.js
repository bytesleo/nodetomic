// Libs
import chalk from "chalk";
// Constants
import { MODE, HOST, PORT, WS } from "@/constants/config.constant";
// App
import { init } from "./app";

(async () => {
  try {
    const app = await init();
    app.listen(PORT, () => {
      console.log(`-------
${chalk.black.bgGreenBright(`->Server is ready!<-`)}
  mode: ${chalk.blueBright(`${MODE}`)}
  url: ${chalk.blueBright(`http://${HOST}:${PORT}`)}
  sockets: ${chalk.blueBright(`http://${HOST}:${WS}`)}
-------`);
    });
  } catch (error) {
    console.log(chalk.red.bold(error));
  }
})();
