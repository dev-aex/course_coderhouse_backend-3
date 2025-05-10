import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación API Adoptme',
      version: '1.0.0',
      description: 'Documentación de la API de Adoptme',
    },
  },
  apis: ['./src/docs/**/*.yaml'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;
