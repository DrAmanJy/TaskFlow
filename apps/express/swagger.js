import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "TaskFlow API",
    description: "Production grade API documentation for the TaskFlow backend.",
    contact: {
      name: "API Support",
      email: "support@taskflow.local"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Authentication",
      description: "Endpoints for managing user registration, login, and token refresh workflows."
    },
    {
      name: "Projects",
      description: "Endpoints for creating, reading, updating, and deleting projects, as well as team management."
    },
    {
      name: "Tasks",
      description: "Endpoints for managing tasks within projects, including status updates and assignments."
    },
    {
      name: "Users",
      description: "Endpoints for managing user profiles and preferences."
    },
    {
      name: "Chat",
      description: "Endpoints for real-time project messaging and chat history."
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter your Bearer token in the format **Bearer &lt;token&gt;**",
    },
  },
};

const outputFile = "./swagger_output.json";
const routes = ["./src/server.js"]; // Entry point to all routes

swaggerAutogen()(outputFile, routes, doc);
