import { Search } from "lucide-react";
import CreateButton from "../components/CreateButton";
import TaskCard from "../components/TaskCard";

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

const columnsData = [
  { id: "todo", title: "To Do", dotColor: "bg-gray-400" },
  { id: "in-progress", title: "In Progress", dotColor: "bg-blue-500" },
  { id: "done", title: "Done", dotColor: "bg-green-500" },
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
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4 w-96">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full py-2 pl-10 pr-4 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CreateButton label={"New Task"} />
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-white shadow-sm ml-2 flex items-center justify-center text-[11px] font-bold text-white">
            AL
          </div>
        </div>
      </header>

      {/* Board Area */}
      <div className="p-6 flex-1 overflow-x-auto flex items-start gap-6">
        {/* Column: To Do */}
        <div className="w-80 shrink-0 bg-gray-100 rounded-xl p-4 flex flex-col max-h-full">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              To Do
            </h2>
            <span className="text-sm text-gray-500 font-medium">2</span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pb-2">
            {/* Task Card */}

            {todoTask.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {/* Empty State */}
            {todoTask.length <= 0 && (
              <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
                No completed tasks yet.
              </div>
            )}
          </div>
          <button className="mt-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2">
            <span>+ Add Task</span>
          </button>
        </div>

        {/* Column: In Progress */}
        <div className="w-80 shrink-0 bg-gray-100 rounded-xl p-4 flex flex-col max-h-full">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              In Progress
            </h2>
            <span className="text-sm text-gray-500 font-medium">1</span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pb-2">
            {/* Task Card */}
            {inProgressTask.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {/* Empty State */}
            {inProgressTask.length <= 0 && (
              <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
                No completed tasks yet.
              </div>
            )}
          </div>
          <button className="mt-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2">
            <span>+ Add Task</span>
          </button>
        </div>

        {/* Column: Done */}
        <div className="w-80 shrink-0 bg-gray-100 rounded-xl p-4 flex flex-col max-h-full">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Done
            </h2>
            <span className="text-sm text-gray-500 font-medium">0</span>
          </div>

          {completedTask.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {/* Empty State */}
          {completedTask.length <= 0 && (
            <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
              No completed tasks yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
