const swaggerJsdoc = require('swagger-jsdoc');

// const swaggerJsdoc = require(‘swagger-jsdoc’);
const options = {
  // List of files to be processed.
  apis: ['src/routes/*.ts'],
  // You can also set globs for your apis
  // e.g. './routes/*.js'
  basePath: '/',
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      version: '0.0.1',
      title: 'APIs Document',
      description: 'APIs documentation for musala engine.',
      termsOfService: '',
      contact: {
        name: 'Abdurrahman Maged',
        email: 'abdurrahman.maged@gmail.com'
      },
      license: {
        name: 'no-license'
      }
    }
  }
};
const specs = swaggerJsdoc(options);
export default specs;
