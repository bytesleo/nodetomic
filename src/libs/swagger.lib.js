import path from 'path';
import swagger from 'express-jsdoc-swagger';

// Constants
import { NAME, MODE, HOST, PORT } from '@/constants/config.constant';

const create = async (app) => {
  const options = {
    info: {
      title: NAME,
      description: 'API description',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
        description: 'Development'
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
    filesPattern: ['routes/**/*.js'], // Glob pattern to find your jsdoc files (it supports arrays too ['./**/*.controller.js', './**/*.route.js'])
    swaggerUIPath: '/api-docs', // SwaggerUI will be render in this url. Default: '/api-docs'
    baseDir: path.resolve(__dirname, './../src'),
    exposeSwaggerUI: true, // Expose OpenAPI UI. Default true
    exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
    apiDocsPath: '/api-docs' // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
  };

  if (MODE === 'development') swagger(app)(options);

  return options.swaggerUIPath;
};

export { create };
