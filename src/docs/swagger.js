import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación de la API para el proyecto",
      contact: {
        name: "Gaston Miralles",
        email: "gasti.miralles@gmail.com",
      },
    },
  },
  apis: [path.join(__dirname, "../routes/products.routes.js"),
    path.join(__dirname, '../routes/user.routes.js'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const configureSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default configureSwagger;
