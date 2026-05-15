const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API for CSE341',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Contact: {
      firstName: 'Any',
      lastName: 'Any',
      email: 'any@any.com',
      favoriteColor: 'Any',
      birthday: 'Any',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
