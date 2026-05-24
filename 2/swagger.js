const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Flashcard API',
    description: 'API for managing flashcards',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
