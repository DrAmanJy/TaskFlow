import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectStats } from "../components/projects/ProjectStats";
import { CreateProjectCard } from "../components/projects/CreateProjectCard";
import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import ProjectForm from "../components/ProjectForm";
import { useProjects } from "../context/ProjectContext";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { projects, status } = useProjects();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  console.log(projects);

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleCloseForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  if (status?.loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
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
      />

      {showProjectForm && (
        <ProjectForm
          onClose={handleCloseForm}
          existingProject={editingProject}
        />
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-12">
        <ProjectStats projects={projects} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
              />
            ))}

          <CreateProjectCard onClick={() => setShowProjectForm(true)} />
        </div>
      </div>
    </div>
  );
}
