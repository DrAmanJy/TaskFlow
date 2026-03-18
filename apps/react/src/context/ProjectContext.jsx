import React, { createContext, useContext, useState, useEffect } from "react";
import { projectService } from "../api/projectService";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    searching: false,
    submitting: false,
    inviting: null,
    removing: null,
    leaving: null,
    updating: null,
    deleting: null,
  });

  // 1. Load all projects on mount
  const loadProjects = async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await projectService.getAll();
      setProjects(result.data);
    } catch (err) {
      toast.error("Could not load projects");
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const findProjectById = async (projectId) => {
    const existing = projects.find((p) => p.id === projectId);
    if (existing) return existing;

    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await projectService.getById(projectId);
      setProjects((prev) => {
        const exists = prev.find((p) => p.id === projectId);
        return exists ? prev : [...prev, result.data];
      });

      return result.data;
    } catch (err) {
      toast.error(err.message || "Failed to fetch project");
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const createProject = async (projectData) => {
    setStatus((prev) => ({ ...prev, submitting: true }));
    try {
      const result = await projectService.create(projectData);
      setProjects((prev) => [...prev, result.data]);
      toast.success("Project successfully created");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setStatus((prev) => ({ ...prev, submitting: false }));
    }
  };

  const searchProjects = async (query) => {
    if (!query) return loadProjects();
    setStatus((prev) => ({ ...prev, searching: true }));
    try {
      const result = await projectService.search(query);
      setProjects(result.data);
    } catch (err) {
      toast.error(err.message || "Search failed");
    } finally {
      setStatus((prev) => ({ ...prev, searching: false }));
    }
  };

  const updateProject = async (projectId, projectData) => {
    setStatus((prev) => ({ ...prev, updating: projectId }));
    try {
      const result = await projectService.updateById(projectId, projectData);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? result.data : p)),
      );
      toast.success("Project successfully updated");
      return result.data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, updating: null }));
    }
  };

  const deleteProject = async (projectId) => {
    setStatus((prev) => ({ ...prev, deleting: projectId }));
    try {
      await projectService.deleteById(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      toast.success("Project successfully deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, deleting: null }));
    }
  };

  const inviteTeamMember = async (projectId, email) => {
    setStatus((prev) => ({ ...prev, inviting: projectId }));
    try {
      const result = await projectService.inviteTeam(projectId, email);
      toast.success(result.message || "User invited to project");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, inviting: null }));
    }
  };

  const removeTeamMember = async (projectId, email) => {
    setStatus((prev) => ({ ...prev, removing: projectId }));
    try {
      const result = await projectService.removeTeam(projectId, email);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? result.data : p)),
      );
      toast.success(result.message || "User removed from project");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, removing: null }));
    }
  };

  const leaveProjectTeam = async (projectId) => {
    setStatus((prev) => ({ ...prev, leaving: projectId }));
    try {
      await projectService.leaveTeam(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      toast.success("Successfully left the project");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, leaving: null }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        status,
        searchProjects,
        findProjectById,
        refresh: loadProjects,
        createProject,
        updateProject,
        deleteProject,
        inviteTeamMember,
        removeTeamMember,
        leaveProjectTeam,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
