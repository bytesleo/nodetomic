import pug from "pug";
import path from "path";

const renderTemplate = (name, params) => {
  const template = pug.compileFile(
    path.resolve(__dirname, `./../src/templates/emails/${name}.pug`)
  );
  return template(params);
};

export { renderTemplate };
