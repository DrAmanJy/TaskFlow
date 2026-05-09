# API Routes & Endpoints

This document provides a detailed specification for the core API routes powering the TaskFlow application. While the auto-generated Swagger UI (`/api-docs`) provides a complete list of all endpoints, this guide focuses on explaining the underlying logic, request/response structures, and security considerations for the most critical workflows: **Authentication** and **Project Management**.

---

## 1. Authentication Domain (`/api/auth`)

The authentication domain is responsible for user registration, securely logging users in, and managing the dual-token architecture (Access & Refresh tokens).

### 1.1 User Registration
`POST /api/auth/register`

Creates a new user account, securely hashes their password, and immediately logs them in by returning an access token and setting an HTTP-Only refresh token cookie.

**Request Payload:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "password": "StrongPassword123!"
}
```

**Security Context:**
- The plaintext password is never logged. Mongoose intercepts the `save` operation and hashes the password with bcrypt (10 rounds).
- The `email` field is validated for correct formatting and checked against the database to ensure uniqueness. If the email exists, the server aborts with a `400 Bad Request`.

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "_id": "64abcdef1234567890123456",
    "email": "jane.doe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
*Note: A `Set-Cookie` header is also attached to the response, establishing the `refreshToken` session.*

### 1.2 User Login
`POST /api/auth/login`

Authenticates a user against the database and establishes a session.

**Request Payload:**
```json
{
  "email": "jane.doe@example.com",
  "password": "StrongPassword123!"
}
```

**Logic Flow:**
1. The controller looks up the user by email, explicitly requesting the `password` field (which is normally hidden by default query projections).
2. It invokes the `comparePassword` instance method on the User model.
3. If successful, new Access and Refresh tokens are generated.
4. The Refresh token is embedded into a strictly configured HTTP-Only cookie.

**Response (200 OK):** Identical to the Registration response payload.

### 1.3 Refresh Access Token
`POST /api/auth/refresh-token`

Clients use this route to silently obtain a new Access Token without requiring the user to re-enter credentials.

**Authentication:** 
Requires a valid `refreshToken` cookie. No Authorization header is needed.

**Logic Flow:**
1. The server reads the `refreshToken` from the parsed cookies.
2. It verifies the token's cryptographic signature against the `JWT_REFRESH_SECRET`.
3. If valid and not expired, a new short-lived `accessToken` is issued.

**Response (200 OK):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
*If the refresh token is missing, tampered with, or expired, the server responds with a `401 Unauthorized`, forcing the client application to redirect the user to the login screen.*

---

## 2. Projects Domain (`/api/projects`)

Projects are the top-level organizational containers in TaskFlow. These routes handle the creation of workspaces and enforce authorization rules (e.g., users can only view or edit projects they belong to).

### 2.1 Retrieve User Projects
`GET /api/projects/`

Fetches an array of all projects where the authenticated user is either the `createdBy` owner or listed in the `team` array.

**Authentication:** Requires `Bearer <accessToken>`.

**Logic Flow:**
1. The authentication middleware extracts the `userId` from the token.
2. The controller performs a MongoDB query: `{ $or: [{ createdBy: userId }, { team: userId }] }`.
3. The query sorts the results descending by `updatedAt` to show the most active projects first.

**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "64b123...",
      "title": "Website Redesign",
      "description": "Overhaul the main marketing site.",
      "status": "in-progress",
      "icon": "layout",
      "createdBy": "64a987...",
      "team": ["64a987...", "64c555..."],
      "createdAt": "2023-10-12T08:00:00.000Z",
      "updatedAt": "2023-10-15T14:30:00.000Z"
    }
  ]
}
```

### 2.2 Create a New Project
`POST /api/projects/`

Initializes a new project workspace.

**Authentication:** Requires `Bearer <accessToken>`.

**Request Payload:**
```json
{
  "title": "Mobile App V2",
  "description": "Migration to React Native",
  "icon": "smartphone"
}
```
*Note: `status` automatically defaults to `todo` upon creation.*

**Logic Flow:**
The controller automatically injects the authenticated `userId` into the `createdBy` field before saving the document to the database, ensuring correct ownership attribution.

### 2.3 Search Projects
`GET /api/projects/search?q={query}`

A powerful endpoint utilized by the frontend's global search bar to rapidly find projects by title or description.

**Authentication:** Requires `Bearer <accessToken>`.

**Logic Flow:**
1. Validates that the `q` query parameter is present.
2. Constructs a MongoDB regex query: `{ title: { $regex: query, $options: "i" } }`.
3. Combines the regex search with the user's access rights (`createdBy` or `team`).
4. Returns a truncated list (typically limited to 20 results) optimized for dropdown search interfaces.

---

## 3. Middleware Integration in Routes

All of the protected routes mentioned above are wrapped by a custom `protect` middleware function.

**How the `protect` middleware works:**
1. Checks for the presence of the `Authorization` header starting with `Bearer`.
2. Extracts the token string.
3. Verifies the token cryptographically using `jsonwebtoken`.
4. Checks if the `userId` encoded in the token still exists in the database (protecting against deleted accounts using old tokens).
5. Checks if the user changed their password *after* the token was issued. If so, the token is invalidated to force re-authentication.
6. Attaches the fetched `user` document to the `req` object (`req.user = currentUser`) and calls `next()`.

---

**Previous:** [Back to Database Schema & Models](database_schema.md)
