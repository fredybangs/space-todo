// generateSwaggerYaml.js
const fs = require('fs');
const path = require('path');
const swaggerConfig = require('../swaggerConfig.js');
const yaml = require('js-yaml');
const swaggerSpecYaml = yaml.dump(swaggerConfig.specs);

fs.writeFileSync(path.join(__dirname, 'swagger.yaml'), swaggerSpecYaml);

console.log('Swagger YAML file generated successfully.');
