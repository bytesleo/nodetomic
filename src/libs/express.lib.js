// Libs
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
// Constants
import { NAME, MODE } from "@/constants/config.constant";

const app = express();

const create = async () => {
  app.use(
    bodyParser.json({
      limit: "25mb",
      extended: true
    })
  );
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.set("views", path.resolve(__dirname, "./../src/templates"));
  app.set("view engine", "pug");
  app.get("/", (_, res) => res.render("index", { name: NAME, mode: MODE }));
  app.use(express.static(path.resolve(__dirname, "./../src/templates")));

  return app;
};

export { create };
