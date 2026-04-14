require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Data Analyst Dashboard",
      version: "1.0.0",
      description: "Data Visualization",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    // ✅ Production Safe (Auto Detect Server)
    servers: [
      {
        url: "/",
        description: "Auto-detect server",
      },
    ],
  },

  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerSetup = (app) => {
  app.use("/api-docs", swaggerUi.serve);

  app.get(
    "/api-docs",
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
    })
  );

  app.get("/api-docs/swagger.json", (req, res) => {
    res.json(swaggerSpec);
  });

  console.log(`Swagger running at /api-docs`);
};

module.exports = { swaggerSetup };
