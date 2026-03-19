const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');

const doc = {
    info: {
        title: 'Students Api',
        description: 'An API for students and courses',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';

// Only include your real API route files
const endpointsFiles = ['./routes/index.js',];

// Generate Swagger JSON
// I had to look up how to do the function part.
// This will remove any routes without a tag.
// So it removes the '/' and the 'api-docs' routes
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // Post-process: remove any routes that have no tags
    const swaggerOutput = require(outputFile);

    for (const path in swaggerOutput.paths) {
        for (const method in swaggerOutput.paths[path]) {
            const route = swaggerOutput.paths[path][method];
            if (!route.tags || route.tags.length === 0) {
                delete swaggerOutput.paths[path][method];
            }
        }
        // If no methods remain for a path, delete the path entirely
        if (Object.keys(swaggerOutput.paths[path]).length === 0) {
            delete swaggerOutput.paths[path];
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(swaggerOutput, null, 2));
    console.log('Swagger JSON generated and cleaned!');
});