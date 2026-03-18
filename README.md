# NexusWork (TaskFlow)

NexusWork is a comprehensive project and task management platform designed to streamline collaboration, tracking, and execution for modern teams. Built with a robust MERN stack within a `pnpm` monorepo architecture.

## 🚀 Key Features

- **Kanban Boards**: Visualize your workflow with intuitive drag-and-drop boards to keep every task moving forward seamlessly.
- **Team Collaboration**: Assign tasks, leave comments, and track progress together in real time.
- **Secure Architecture**: Built on a robust backend with modern authentication (JWT) to ensure your project data is always safe.
- **Media Management**: Support for profile and project image uploads powered by Cloudinary.

## 🛠️ Tech Stack

### Frontend (React)
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4, Shadcn UI, Radix UI
- **Routing:** React Router v7
- **Libraries:** Lucide React, Zod, React Hook Form

### Backend (Express)
- **Core:** Node.js, Express 5
- **Database:** MongoDB via Mongoose
- **Security:** JWT Authentication, bcrypt, CORS
- **Media Uploads:** Cloudinary, Multer

## 📁 Project Structure

This project uses a monorepo setup managed by `pnpm workspaces`, ensuring a clean separation of concerns and fast rebuilds.

```text
monorepo/
├── apps/
│   ├── react/      # Frontend React application
│   └── express/    # Backend Express server
├── package.json    # Root package
└── pnpm-workspace.yaml
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- [pnpm](https://pnpm.io/)
- MongoDB URI
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DrAmanJy/TaskFlow.git
   cd TaskFlow
   ```

2. **Install dependencies**
   Install dependencies for all workspaces from the root directory using `pnpm`:
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `apps/express` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the Development Server**
   Start both the frontend and backend servers concurrently from the root directory:
   ```bash
   pnpm run dev
   ```
   - The frontend will typically be accessible at `http://localhost:5173`
   - The backend API will typically run on `http://localhost:5000`

## 👨‍💻 Developer

Developed by **DrAmanJy (Aman Lather)**

- [GitHub](https://github.com/DrAmanJy)
- [LinkedIn](https://www.linkedin.com/in/aman-lather-54619135a)
- [Source Code](https://github.com/DrAmanJy/TaskFlow)

---
*Built with ❤️ for modern teams.*
