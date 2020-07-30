import path from "path";
import swagger from "express-swagger-generator";
// Constants
import { NAME, MODE, HOST, PORT } from "@/constants/config.constant";

const create = async (app) => {
  const expressSwagger = swagger(app);
  // swagger
  const options = {
    swaggerDefinition: {
      info: {
        description: "API",
        title: NAME,
        version: "1.0.0",
      },
      host: `${HOST}:${PORT}`,
      basePath: "/",
      produces: ["application/json", "application/xml"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
      },
    },
    route: {
      url: "/docs",
      docs: "/docs.json",
    },
    basedir: path.resolve(__dirname, "./../src"), //app absolute path
    files: ["routes/**/*.js"], //Path to the API handle folder
  };

  if (MODE === "development") expressSwagger(options);

  return options.route.url;
};

export { create };
