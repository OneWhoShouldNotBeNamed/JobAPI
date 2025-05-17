import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Board API',
      version: '1.0.0',
      description: 'API for job listings and user authentication',
    },
    servers: [{ url: 'http://localhost:5000' },{"url":"https://jobapi-yyei.onrender.com/"}],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', example: 'jane@example.com' },
            password: { type: 'string', example: 'strongpassword' },
          },
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'jane@example.com' },
            password: { type: 'string', example: 'strongpassword' },
          },
        },
        Job: {
          type: 'object',
          required: ['title', 'description', 'company', 'location', 'salary'],
          properties: {
            title: { type: 'string', example: 'Backend Developer' },
            description: { type: 'string', example: 'Build REST APIs with Node.js' },
            company: { type: 'string', example: 'Acme Corp' },
            location: { type: 'string', example: 'Remote' },
            salary: { type: 'number', example: 90000 },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
