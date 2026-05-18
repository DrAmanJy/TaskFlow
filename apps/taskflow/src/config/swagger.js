import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description:
        "Production-grade REST API for the TaskFlow project management platform.",
      contact: {
        name: "API Support",
        email: "support@taskflow.local",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: isProduction ? "Production" : "Development",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Registration, login, and token refresh.",
      },
      {
        name: "Projects",
        description: "Project CRUD and team management.",
      },
      { name: "Tasks", description: "Task management within projects." },
      { name: "Users", description: "User profile and invitations." },
      { name: "Chat", description: "Task-scoped messaging." },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Bearer access token from login or register",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: { type: "string", example: "fail" },
            message: { type: "string" },
          },
        },
        Success: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../docs/openapi.yaml")],
};

export const swaggerSpec = swaggerJsdoc(options);
