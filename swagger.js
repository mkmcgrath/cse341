const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API for CSE341',
  },
  host: 'cse341-squirm.onrender.com',
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

swaggerAutogen(outputFile, endpointsFiles, doc);
