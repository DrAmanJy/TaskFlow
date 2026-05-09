# TaskFlow Backend Architecture & Documentation

Welcome to the TaskFlow Backend Documentation. This comprehensive guide covers the technical architecture, project structure, data models, API contracts, security practices, and setup instructions for the TaskFlow Express.js backend. This document serves as a production-grade reference, outlining exactly how the application functions behind the scenes to power the TaskFlow ecosystem.

## Table of Contents

1. [System Overview & Architecture](#1-system-overview--architecture)
2. [Database Schema & Models](database_schema.md)
3. [API Routes & Endpoints](api_routes.md)

---

## 1. System Overview & Architecture

The TaskFlow backend is a highly scalable, robust RESTful API built on **Node.js** and **Express.js**. It serves as the central data engine for the entire TaskFlow ecosystem, handling user authentication, project management, real-time collaboration logic, and task organization.

### 1.1 Core Technologies

Our stack is carefully chosen to balance developer velocity, runtime performance, and system stability.

- **Runtime Environment:** Node.js (v20+)
- **Framework:** Express.js (v5.x) – We leverage Express for its rich middleware ecosystem and unopinionated structure.
- **Database:** MongoDB (via Mongoose ODM) – A NoSQL database gives us the flexibility to iterate on our data structures rapidly.
- **Authentication:** JSON Web Tokens (JWT) & bcrypt – Secure, stateless authentication using short-lived access tokens and long-lived refresh tokens.
- **Security:** Helmet.js, CORS, HTTP-Only Cookies – Comprehensive protection against common web vulnerabilities (XSS, CSRF, Clickjacking).
- **File Storage:** Cloudinary (via Multer) – Reliable cloud storage for user profiles and project attachments.
- **Documentation:** Swagger UI & `swagger-autogen` – Auto-generated, interactive API contracts.

### 1.2 Architectural Pattern

The application follows an **MVC-inspired (Model-View-Controller)** pattern but tailored for building headless APIs. We strictly decouple our application into specific layers to ensure separation of concerns:

- **Routes (`src/routes/`):** Responsible solely for mapping incoming HTTP request URLs and methods to the appropriate controller functions. Routes also apply domain-specific middleware (e.g., authentication guards).
- **Controllers (`src/controllers/`):** Manage the core business logic. They extract parameters from requests, interact with services or models, and formulate the HTTP response.
- **Models (`src/models/`):** Define the MongoDB schema, data validation rules, indexing strategies, and instance methods (like password hashing).
- **Middlewares (`src/middlewares/`):** Handle cross-cutting concerns. Examples include global error handling (`errorHandler.js`), user authentication verification, and Multer file upload interceptors.
- **Services & Utils (`src/services/`, `src/utils/`):** Reusable functions for standard operations. The `AppError.js` class normalizes error payloads, while services might abstract complex third-party integrations (like Cloudinary).

### 1.3 Security & Middleware Pipeline

Building a production-grade backend requires comprehensive security measures built directly into the request lifecycle.

#### Global Middleware Pipeline

> [!IMPORTANT]
> The order of middleware declaration in `server.js` is strictly maintained. Modifying the order can result in security vulnerabilities or request leakage.

1. **Helmet (`helmet()`):** Injected immediately to secure HTTP headers by mitigating cross-site scripting (XSS), clickjacking, and content sniffing.
2. **CORS:** Configured explicitly to allow cross-origin requests *only* from defined frontend URIs (`http://localhost:5173`, etc.) with `credentials: true`. This is vital to support the transmission of HTTP-Only cookies.
3. **Payload Parsers:** `express.json` and `express.urlencoded` are strictly capped at a `3mb` limit to prevent Denial of Service (DoS) attacks via massive payload injections.
4. **Cookie Parser:** Intercepts and parses incoming HTTP-only cookies, essential for the secure refresh token workflow.

#### Error Handling Strategy

The backend employs a centralized global error handling paradigm to prevent unhandled promise rejections and leaked stack traces.

- All operational errors are instantiated via the custom `AppError` class and passed down using `next(new AppError(message, statusCode))`.
- The `errorHandler` middleware catches these exceptions, formats them into a standardized JSON response containing a `status` and `message`.
- In production, stack traces are stripped from the response entirely.

#### Authentication Flow

TaskFlow uses a highly secure **Dual-Token Architecture**.

- **Access Token:** Short-lived (e.g., 30 minutes), transmitted via the `Authorization` header (`Bearer <token>`). Used to authorize requests to protected routes.
- **Refresh Token:** Long-lived (e.g., 7 days), generated during login and stored securely in an **HTTP-Only, Secure, SameSite=Strict** cookie. This prevents XSS attacks from stealing the token, while allowing the client to silently request new access tokens in the background via the `/api/auth/refresh-token` endpoint.

---

## 2. Directory Structure

The backend relies on an organized, domain-driven structure located under `apps/express/src`:

```
express/
├── swagger.js               # Auto-generation script for Swagger specifications
├── swagger_output.json      # The compiled API contract
├── package.json             # Project dependencies and script runner
├── src/
│   ├── config/              # Database connection and environment configurations
│   ├── controllers/         # Core business logic for endpoints
│   ├── middlewares/         # Express middleware (auth, error handlers, uploaders)
│   ├── models/              # Mongoose schemas and data structures
│   ├── routes/              # Express Router definitions
│   ├── services/            # Extracted business logic or external integrations
│   ├── utils/               # Helper utilities (AppError, constants)
│   └── server.js            # Main application entry point and middleware pipeline
```

---

## 3. Getting Started Locally

To run the backend environment on your local machine:

1. Create a `.env` file in the `apps/express` directory matching the production variables (e.g., `MONGO_URI`, `JWT_SECRET`).
2. Run `pnpm install` to resolve dependencies.
3. Start the development server using `pnpm dev`.
4. (Optional) Re-generate API docs using `pnpm run swagger`.

---

**Next:** [Review the Database Schema & Models](database_schema.md)
