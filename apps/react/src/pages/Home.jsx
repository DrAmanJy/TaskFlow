import { Search } from "lucide-react";
import CreateButton from "../components/CreateButton";
import TaskCard from "../components/TaskCard";
import TaskColumn from "../components/TaskColumn";
import Header from "../components/Header";
const tasksData = [
  // --- TO DO ---
  {
    id: "t-001",
    title: "Setup MongoDB Schema",
    description: "Define models for Users, Boards, and Tasks using Mongoose.",
    status: "todo",
    priority: "High",
    commentsCount: 0,
    attachmentsCount: 0,
    assignee: {
      initials: "",
      colorClass: "bg-gray-300",
    },
  },
  {
    id: "t-002",
    title: "Initialize Next.js Frontend",
    description: "Setup the initial boilerplate and routing structure.",
    status: "todo",
    priority: "Low",
    commentsCount: 0,
    attachmentsCount: 0,
    assignee: {
      initials: "",
      colorClass: "bg-indigo-300",
    },
  },

  // --- IN PROGRESS ---
  {
    id: "t-003",
    title: "Build Express API Routes",
    description:
      "Create CRUD endpoints for the tasks and handle JWT authentication.",
    status: "in-progress",
    priority: "Medium",
    commentsCount: 3,
    attachmentsCount: 0,
    assignee: {
      initials: "",
      colorClass: "bg-gradient-to-r from-cyan-500 to-blue-500",
    },
  },
  {
    id: "t-004",
    title: "Implement Session Management",
    description:
      "Secure the app using HTTP-only cookies and handle user tokens securely.",
    status: "in-progress",
    priority: "High",
    commentsCount: 4,
    attachmentsCount: 1,
    assignee: {
      initials: "AJ",
      colorClass: "bg-purple-500",
    },
  },

  // --- DONE ---
  {
    id: "t-005",
    title: "Setup Project Repository",
    description:
      "Initialize Git, setup pnpm workspace, and configure ESLint/Prettier.",
    status: "done",
    priority: "High",
    commentsCount: 2,
    attachmentsCount: 0,
    assignee: {
      initials: "AJ",
      colorClass: "bg-purple-500",
    },
  },
  {
    id: "t-006",
    title: "Configure Tailwind CSS",
    description:
      "Set up theme colors, fonts, and custom utility classes in tailwind.config.js.",
    status: "done",
    priority: "Medium",
    commentsCount: 1,
    attachmentsCount: 0,
    assignee: {
      initials: "",
      colorClass: "bg-teal-400",
    },
  },
  {
    id: "t-007",
    title: "Design Database Architecture",
    description: "Map out relational data structures for the MERN stack.",
    status: "done",
    priority: "High",
    commentsCount: 8,
    attachmentsCount: 3,
    assignee: {
      initials: "AJ",
      colorClass: "bg-purple-500",
    },
  },
  {
    id: "t-008",
    title: "Research Drag & Drop Libraries",
    description:
      "Compare dnd-kit vs react-beautiful-dnd for the kanban board columns.",
    status: "done",
    priority: "Low",
    commentsCount: 0,
    attachmentsCount: 0,
    assignee: {
      initials: "",
      colorClass: "bg-gray-300",
    },
  },
];

export default function Home() {
  const todoTask = tasksData.filter((task) => task.status === "todo");
  const inProgressTask = tasksData.filter(
    (task) => task.status === "in-progress",
  );
  const completedTask = tasksData.filter((task) => task.status === "done");
  return (
    <main className="flex-1 flex flex-col h-full">
      {/* Top Header */}
      <Header title={"All Tasks"} btnLabel={"Create Task"}>
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-64 py-2 pl-9 pr-4 text-sm bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>
      </Header>

      {/* Board Area */}
      <div className="p-6 flex-1 overflow-x-auto flex items-start gap-6">
        {/* Column: To Do */}
        <TaskColumn
          taskLength={todoTask.length}
          btnLabel={"Add Task"}
          label={"To Do"}
          dotColor={"bg-gray-400"}
        >
          {/* Task Card */}
          {todoTask.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>

        {/* Column: In Progress */}
        <TaskColumn
          taskLength={inProgressTask.length}
          btnLabel={"Add Task"}
          label={"In Progress"}
          dotColor={"bg-blue-500"}
        >
          {/* Task Card */}
          {inProgressTask.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>
        {/* Column: Done */}

        <TaskColumn
          taskLength={completedTask.length}
          label={"Done"}
          dotColor={"bg-green-400"}
        >
          {/* Task Card */}
          {completedTask.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>
      </div>
    </main>
  );
}
