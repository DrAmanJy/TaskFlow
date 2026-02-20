import { Search } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import CreateButton from "../components/CreateButton";
const projectsData = [
  {
    id: "proj-001",
    title: "TaskFlow Dashboard",
    description:
      "Internal tool for managing engineering tasks and sprints using the MERN stack.",
    progress: 75,
    status: "in-progress",
    lastUpdated: "2 days ago",
    icon: {
      type: "layout",
      bgClass: "bg-blue-50",
      textClass: "text-blue-600",
    },
    team: [
      {
        id: "u1",
        initials: "X",
        colorClass: "bg-gradient-to-r from-cyan-500 to-blue-500",
      },
      {
        id: "u2",
        initials: "J",
        colorClass: "bg-gradient-to-r from-purple-500 to-pink-500",
      },
    ],
    additionalMembersCount: 0,
  },
  {
    id: "proj-002",
    title: "MythCraft SaaS Panel",
    description:
      "Server management portal connecting to the backend API for player statistics.",
    progress: 12,
    status: "in-progress",
    lastUpdated: "Just now",
    icon: {
      type: "server",
      bgClass: "bg-emerald-50",
      textClass: "text-emerald-600",
    },
    team: [
      {
        id: "u3",
        initials: "AJ",
        colorClass: "bg-gradient-to-r from-purple-500 to-indigo-500",
      },
    ],
    additionalMembersCount: 0,
  },
  {
    id: "proj-003",
    title: "E-Commerce Migration",
    description:
      "Moving legacy storefront to a modern Next.js and Tailwind architecture.",
    progress: 100,
    status: "completed",
    lastUpdated: "1 week ago",
    icon: {
      type: "store",
      bgClass: "bg-orange-50",
      textClass: "text-orange-600",
    },
    team: [
      { id: "u3", initials: "AJ", colorClass: "bg-gray-400" },
      { id: "u4", initials: "JD", colorClass: "bg-indigo-300" },
    ],
    additionalMembersCount: 2,
  },
];
export default function Projects() {
  return (
    <main className="flex-1 flex flex-col h-full">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-800">All Projects</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-64 py-2 pl-9 pr-4 text-sm bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
          </div>
          <CreateButton label={"New Project"} />
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-white shadow-sm ml-2 flex items-center justify-center text-[11px] font-bold text-white">
            AL
          </div>
        </div>
      </header>

      {/* Projects Grid Area */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Project Card */}
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Empty State / Create New Card */}
          <div className="bg-transparent border-2 border-dashed border-gray-300 rounded-xl p-5 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[240px] text-gray-500 hover:text-indigo-600 group">
            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center mb-3 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <span className="font-medium">Create New Project</span>
          </div>
        </div>
      </div>
    </main>
  );
}
