import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectStats } from "../components/projects/ProjectStats";
import { ProjectHeader } from "../components/projects/ProjectHeader";
import { CreateProjectCard } from "../components/projects/CreateProjectCard";
import { useState } from "react";

const PROJECT_STATS = [
  { label: "Total", count: 12, color: "bg-slate-900" },
  { label: "To Do", count: 4, color: "bg-slate-400" },
  { label: "In Progress", count: 6, color: "bg-indigo-600" },
  { label: "Completed", count: 2, color: "bg-emerald-500" },
];

const mockProjects = [
  // ... (kept your mock data exactly as is)
  {
    id: "69a7da43e20b4945fe956ad3",
    title: "Project MythCraft SaaS",
    description:
      "A comprehensive management platform for Minecraft server owners, focusing on automated deployments and plugin management.",
    status: "in-progress",
    icon: "folder",
    createdBy: {
      firstName: "Aman",
      lastName: "Lathar",
      fullName: "Aman Lathar",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
      id: "69a6a8443067fef5d0525cba",
    },
    team: [
      {
        fullName: "Jyoti Dhull",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
        id: "69a7d90bb8ab5190818cc174",
      },
    ],
    createdAt: "2026-02-04T10:00:00.000Z",
    updatedAt: "2026-03-06T12:00:00.000Z",
  },
  {
    id: "69a7da43e20b4945fe956ad4",
    title: "Rust Plugin Engine",
    description:
      "High-performance backend logic for handling real-time game state synchronization using Rust and WebSockets.",
    status: "todo",
    icon: "folder",
    createdBy: {
      firstName: "Aman",
      lastName: "Lathar",
      fullName: "Aman Lathar",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
      id: "69a6a8443067fef5d0525cba",
    },
    team: [
      {
        fullName: "Sandeep R.",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep",
        id: "user_789",
      },
    ],
    createdAt: "2026-02-15T09:00:00.000Z",
    updatedAt: "2026-03-05T14:20:00.000Z",
  },
  {
    id: "69a7da43e20b4945fe956ad5",
    title: "MERN Dashboard Redesign",
    description:
      "Refactoring the legacy dashboard to use Next.js, Tailwind CSS, and standard response envelopes for the API.",
    status: "done",
    icon: "folder",
    createdBy: {
      firstName: "Jyoti",
      lastName: "Dhull",
      fullName: "Jyoti Dhull",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
      id: "69a7d90bb8ab5190818cc174",
    },
    team: [
      {
        fullName: "Aman Lathar",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
        id: "69a6a8443067fef5d0525cba",
      },
    ],
    createdAt: "2026-03-01T08:30:00.000Z",
    updatedAt: "2026-03-06T09:00:00.000Z",
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className=" top-0 z-50 bg-slate-900 pt-16 md:pt-12 pb-8 pl-16 md:pl-0 shadow-md shadow-slate-900/20 border-b border-slate-800">
        <ProjectHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <ProjectStats />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          <CreateProjectCard />
        </div>
      </div>
    </div>
  );
}
