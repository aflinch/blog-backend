const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Personal blog API for a portfolio site',
        },
        servers: [{url: `http://localhost:${process.env.PORT || 5000}`}]
    },
    apis: ['./server.js', './routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {swaggerUi, specs };
