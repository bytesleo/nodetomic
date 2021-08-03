import path from 'path';
import swagger from 'express-jsdoc-swagger';
// Constants
import {
  PROJECT_NAME,
  SERVER_HOSTNAME,
  SERVER_PORT,
  SWAGGER_HOSTNAME,
  SWAGGER_API_DOCS
} from '@/constants/config.constant';

const create = async (app) => {
  const servers = SWAGGER_HOSTNAME.split(',');

  const options = {
    info: {
      title: PROJECT_NAME,
      description: 'API description',
      version: '1.0.0'
    },
    servers: servers.map((x) => ({
      url:
        x.includes('localhost') || x === ''
          ? `http://${SERVER_HOSTNAME}:${SERVER_PORT}`
          : x,
      description: ''
    })),
    security: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    },
    filesPattern: ['routes/**/[!!]*.js', 'utils/**/[!!]*.js'], // Glob pattern to find your jsdoc files (it supports arrays too ['./**/*.controller.js', './**/*.route.js'])
    swaggerUIPath: '/api-docs', // SwaggerUI will be render in this url. Default: '/api-docs'
    baseDir: path.resolve(__dirname, './../src'),
    exposeSwaggerUI: SWAGGER_API_DOCS === 'true' ? true : false, // Expose OpenAPI UI. Default true
    exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
    apiDocsPath: '/api-docs' // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
  };

  swagger(app)(options);

  return options;
};

export { create };
