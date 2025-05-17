"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board API',
            version: '1.0.0',
            description: 'API for job listings and user authentication',
        },
        servers: [{ url: 'http://localhost:5000' }, { "url": "https://jobapi-yyei.onrender.com/" }],
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
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
