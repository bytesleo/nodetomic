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
import fileUpload from "express-fileupload";
import requestIp from "request-ip";
// Constants
import { NAME, MODE } from "@/constants/config.constant";
// Libs
import { create as swagger } from "@/libs/swagger.lib";

const app = express();

const create = async (routes) => {
  // parse body params and attache them to req.body
  app.use(
    bodyParser.json({
      limit: "25mb",
      extended: true,
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
      headers: true,
    })
  );
  app.use(cookieParser());

  // secure apps by setting various HTTP headers
  app.use(helmet());

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors({ origin: false }));
  
  // file upload
  app.use(fileUpload());

  // client ip
  app.use(requestIp.mw());

  // logs
  app.use(morgan("dev"));

  // Routes
  if (routes.length > 0) app.use(routes);

  // swagger
  const swaggerUrl = await swagger(app);

  // views
  app.set("views", path.resolve(__dirname, "./../src/templates"));
  app.set("view engine", "pug");
  app.get("/", (_, res) =>
    res.render("index", {
      name: NAME,
      mode: MODE,
      docs: swaggerUrl,
    })
  );
  app.use(express.static(path.resolve(__dirname, "./../src/templates")));
};

export { create, app };
