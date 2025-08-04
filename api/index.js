const express = require('express');
const config = require('../config.js');
const user = require('./components/user/network');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();

// Permite que la aplicación entienda solicitudes con formato JSON
app.use(express.json());
// Permite que la aplicación entienda datos codificados en la URL (por ejemplo, formularios)
app.use(express.urlencoded({ extended: true }));

// Carga y parseo del YAML de la API DOC con manejo de errores
let swaggerDocument;
const swaggerPath = path.join(__dirname, 'swagger.yml');
if (fs.existsSync(swaggerPath)) {
  try {
    const fileContents = fs.readFileSync(swaggerPath, 'utf8');
    swaggerDocument = yaml.load(fileContents);
  } catch (err) {
    console.error('Error al leer o parsear swagger.yml:', err);
    swaggerDocument = {}; // fallback vacío
  }
} else {
  console.warn('swagger.yml no encontrado en', swaggerPath);
  swaggerDocument = {}; // fallback vacío
}

// ROUTES
app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.api.port, () => {
  console.log(`Server is running on port ${config.api.port}`);
});
