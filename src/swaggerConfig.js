// src/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Space Todo API',
      version: '1.0.0',
      description: 'API documentation for Space Todo application',
    },
    servers: [
      {
        url: 'http://space-todo.onrender.com/v1/api',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Todo: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Finish the report' },
            description: { type: 'string', example: 'Complete the annual report' },
            status: { type: 'string', example: 'completed' },
            priority: { type: 'string', example: 'high' },
            userId: { type: 'integer', example: 1 },
            createdAt: { type: 'string', format: 'date-time', example: '2025-07-01T10:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2025-07-01T10:30:00.000Z' }
          }
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
