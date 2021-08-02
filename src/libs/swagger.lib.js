import path from 'path';
import swagger from 'express-jsdoc-swagger';

// Constants
import { NAME, MODE, HOST, PORT, DOMAIN } from '@/constants/config.constant';

const create = async (app) => {
  const options = {
    info: {
      title: NAME,
      description: 'API description',
      version: '1.0.0'
    },
    servers: [
      {
        url: MODE === 'development' ? `http://${HOST}:${PORT}` : DOMAIN,
        description: MODE
      }
    ],
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
    exposeSwaggerUI: MODE === 'development' ? true : false, // Expose OpenAPI UI. Default true
    exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
    apiDocsPath: '/api-docs' // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
  };

  swagger(app)(options);

  return options.swaggerUIPath;
};

export { create };
