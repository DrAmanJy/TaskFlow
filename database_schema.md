# Database Schema & Models

The TaskFlow backend utilizes MongoDB, a highly scalable NoSQL database. We enforce strict schema definitions, validation rules, and business logic at the data layer using the **Mongoose** Object Data Modeling (ODM) library. 

This document provides a deep dive into the primary collections, their fields, relationships, and custom methods.

---

## 1. User Model (`User.js`)

The `User` model is the foundational entity of the system, responsible for managing authentication, authorization levels, and user profiles.

### 1.1 Schema Definition

| Field | Type | Required | Unique | Description |
| :--- | :--- | :--- | :--- | :--- |
| `email` | String | Yes | Yes | The user's primary email address used for login. Must be valid email format. |
| `password` | String | Yes | No | The hashed representation of the user's password. Never returned to the client. |
| `firstName` | String | Yes | No | The user's first name. |
| `lastName` | String | Yes | No | The user's last name. |
| `jobTitle` | String | No | No | Professional title (e.g., "Software Engineer"). |
| `role` | Enum | Yes | No | System-level permissions. Values: `user`, `admin`, `owner`. Defaults to `user`. |
| `profile` | String | No | No | URL to the user's avatar image, hosted on Cloudinary. |
| `invites` | Array | No | No | An array of embedded documents representing pending project invitations. |

### 1.2 Embedded Documents & Relationships
The `invites` array contains sub-documents with the following structure:
- `projectId`: An `ObjectId` reference to the `Project` collection.
- `role`: The intended role for the user upon accepting the invite (`team`, `staff`, `owner`).
- `status`: The status of the invite (`pending`, `accepted`, `declined`).

### 1.3 Hooks and Methods
- **`pre('save')` Hook:** Before saving a user document, if the password field has been modified, Mongoose automatically hashes the plaintext password using `bcrypt` (salt rounds: 10).
- **Virtuals:** A `fullName` virtual getter dynamically concatenates `firstName` and `lastName`.
- **Instance Methods:**
  - `generateAccessToken()`: Signs and returns a short-lived JWT.
  - `generateRefreshToken()`: Signs a long-lived JWT.
  - `comparePassword(candidatePassword)`: Uses bcrypt to securely compare a plaintext password against the hashed database value.
- **`toJSON` Override:** The schema explicitly overrides the `toJSON` method to automatically strip the `password` and `refreshToken` fields whenever a User document is converted to JSON for an HTTP response. This prevents accidental data leaks.

---

## 2. Project Model (`Project.js`)

The `Project` model acts as a container for tasks and defines the workspace where teams collaborate.

### 2.1 Schema Definition

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | The human-readable name of the project. |
| `description` | String | No | Detailed outline of the project's goals. |
| `status` | Enum | Yes | Project state. Values: `todo`, `in-progress`, `completed`. Defaults to `todo`. |
| `icon` | String | No | An identifier string mapping to a UI icon (e.g., "layout", "folder"). |
| `createdBy` | ObjectId | Yes | Reference to the `User` who created the project. |
| `team` | Array | No | Array of `ObjectId` references to `User`s who have access to the workspace. |

### 2.2 Indexing Strategy
To ensure high-performance querying, especially on the dashboard where users fetch all projects they belong to, the collection is indexed on:
- `team`: For finding projects by member.
- `createdBy`: For finding projects by owner.

---

## 3. Task Model (`Task.js`)

The `Task` model represents an individual, actionable item within a `Project`. It is the most complex model, tracking state, assignments, and metadata.

### 3.1 Schema Definition

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | The task headline. |
| `description` | String | No | Full markdown-supported body of the task. |
| `status` | Enum | Yes | Kanband state: `todo`, `in-progress`, `review`, `done`. |
| `priority` | Enum | Yes | Urgency level: `Low`, `Medium`, `High`, `Urgent`. Defaults to `Low`. |
| `project` | ObjectId | Yes | Reference to the parent `Project`. |
| `createdBy`| ObjectId | Yes | Reference to the `User` who created the task. |
| `position` | Number | No | Used for sorting and drag-and-drop ordering within a Kanban column. |
| `dueDate` | Date | No | Deadline for the task. |
| `tags` | Array | No | Array of strings for categorization (e.g., "bug", "feature"). |

### 3.2 Relationships & Embedded Data
- **`assignee`:** An array of embedded documents linking `User` ObjectId references to specific context roles within the task (e.g., `userId` + `role`).
- **`attachments`:** An array of objects storing `url` (Cloudinary link) and `name` of files uploaded to the task.

### 3.3 Indexing Strategy
Queries against the `Task` collection are frequent and highly filtered. We utilize compound indexing to speed up Kanban board rendering:
- Index on `{ project: 1, status: 1 }` to rapidly pull tasks for specific columns.
- Index on `assignee.userId` to support querying tasks across all projects assigned to a specific user.

---

## 4. Message Model (`Message.js`)

The `Message` model powers the real-time project chat functionality.

### 4.1 Schema Definition

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `project` | ObjectId | Yes | Reference to the `Project` channel this message belongs to. |
| `sender` | ObjectId | Yes | Reference to the `User` who sent the message. |
| `content` | String | Yes | The text content of the message. |
| `createdAt`| Date | Auto | Automatically handled by Mongoose timestamps. |

To ensure fast retrieval of chat histories, the `project` field is indexed, allowing chronological fetching of messages by project ID.

---

**Next:** [Review the API Routes & Endpoints](api_routes.md)
**Previous:** [Back to System Overview](README.md)
