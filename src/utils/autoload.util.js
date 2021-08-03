const routes = () => {
  try {
    const paths = require.context('../routes', true, /^((?!!).)*.js$/);
    return paths
      .keys()
      .map(paths)
      .map((x) => x.default);
  } catch (error) {
    console.error({ error });
    return [];
  }
};

const models = () => {
  try {
    const paths = require.context('../models', true, /^((?!!).)*.js$/);
    return paths.keys().map(paths);
  } catch (error) {
    console.error({ error });
    return [];
  }
};

const sockets = (socket, io) => {
  try {
    const paths = require.context('../sockets', true, /^((?!!).)*.js$/);
    return paths
      .keys()
      .map(paths)
      .map((x) => x.default(socket, io));
  } catch (error) {
    console.error({ error });
    return [];
  }
};

const seeds = () => {
  try {
    const paths = require.context('../seeds', true, /^((?!!).)*.js$/);
    return paths
      .keys()
      .map(paths)
      .map((x) => x.default());
  } catch (error) {
    console.error({ error });
    return [];
  }
};

const cronjobs = () => {
  try {
    const paths = require.context('../cronjobs', true, /^((?!!).)*.js$/);
    return paths
      .keys()
      .map(paths)
      .map((x) => x.default);
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export default { models, routes, sockets, seeds, cronjobs };
