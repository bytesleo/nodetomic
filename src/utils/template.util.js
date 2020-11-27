import path from "path";
import handlebars from "express-handlebars";
import { app } from "@/libs/express.lib";

const hbs = handlebars.create();

const renderTemplate = async (name, params) => {
  const template = await hbs.getTemplate(
    path.resolve(__dirname, `./../src/templates/${name}.hbs`),
    {
      cache: app.enabled("view cache"),
    }
  );
  return template(params);
};

export { renderTemplate };
