// Libs
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
// Constants
import { NAME, MODE } from "@/constants/config.constant";

const app = express();

const create = async routes => {
  // parse body params and attache them to req.body
  app.use(
    bodyParser.json({
      limit: "25mb",
      extended: true
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));

  // gzip compression
  app.use(compression());

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride());

  // enable rate limit
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: "You have exceeded the  requests in 24 hrs limit!",
      headers: true
    })
  );
  app.use(cookieParser());

  // secure apps by setting various HTTP headers
  app.use(helmet());

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors());

  // logs
  app.use(morgan("dev"));

  // Routes
  app.use(routes);

  // views
  app.set("views", path.resolve(__dirname, "./../src/templates"));
  app.set("view engine", "pug");
  app.get("/", (_, res) => res.render("index", { name: NAME, mode: MODE }));
  app.use(express.static(path.resolve(__dirname, "./../src/templates")));

  // return app;
};

export { create, app };
