import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectStats } from "../components/projects/ProjectStats";
import { CreateProjectCard } from "../components/projects/CreateProjectCard";
import { useState, useEffect, useRef } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import ProjectForm from "../components/ui/ProjectForm";
import { useProjects } from "../context/ProjectContext";
import { Loader2, SearchX } from "lucide-react";

export default function ProjectsPage() {
  const { projects, status, searchProjects } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const isFirstRender = useRef(true);

  // Debounced search logic
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      searchProjects(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleCloseForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  // Initial Full-Screen Loader
  if (status?.loading && projects.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <PageHeader
        title="All Projects"
        placeholder="Search projects..."
        buttonText="Create Project"
        onButtonClick={() => setShowProjectForm(true)}
        onSearchChange={setSearchTerm}
        // FIX: Use 'searching' status for the header spinner
        searching={status?.searching}
      />

      {showProjectForm && (
        <ProjectForm
          onClose={handleCloseForm}
          existingProject={editingProject}
        />
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-12">
        <ProjectStats projects={projects} />

        <div className="relative mt-8">
          {/* Background loading overlay for search results */}
          {status?.searching && (
            <div className="absolute inset-0 z-20 bg-slate-50/40 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
              <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
            </div>
          )}

          {projects.length === 0 && !status?.searching ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <SearchX className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">
                No projects found
              </h3>
              <p className="text-slate-500 text-sm">
                Try searching for a different name or keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id || project._id}
                  project={project}
                  onEdit={handleEdit}
                />
              ))}
              <CreateProjectCard onClick={() => setShowProjectForm(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
