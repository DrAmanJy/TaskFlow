import { Search } from "lucide-react";
import ProjectCard from "../components/ProjectCard";

import Header from "../components/Header";
import ProjectForm from "../components/ProjectForm";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState(null);
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  useEffect(() => {
    const getProject = async () => {
      if (!isLogin) {
        toast.error("Please login to see projects");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/projects`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          toast.error("Failed to fetch project");
          return;
        }

        const data = await res.json();
        setProjects(data.project);
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    getProject();
  }, [isLogin, navigate]);
  const toggleShowForm = () => setShowForm(showForm ? false : true);
  if (!projects) {
  return <div className="p-8 text-center text-gray-500">Loading projects...</div>;
  }
  return (
    <main className="flex-1 flex flex-col h-full">
      {/* Top Header */}
      <Header
        title={"All Projects"}
        btnLabel={"New Project"}
        btnAction={toggleShowForm}
      >
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
      </Header>
      {showForm && <ProjectForm onClose={toggleShowForm} />}

      {/* Projects Grid Area */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Project Card */}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/*Create New Card */}
          <div
            onClick={toggleShowForm}
            className="bg-transparent border-2 border-dashed border-gray-300 rounded-xl p-5 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-60 text-gray-500 hover:text-indigo-600 group"
          >
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
