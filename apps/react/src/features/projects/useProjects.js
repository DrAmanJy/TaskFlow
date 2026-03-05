/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { projectService } from "../../api/projectService";
import toast from "react-hot-toast";

export const useProjects = () => {
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

  const searchProjects = async (query) => {
    if (!query) {
      return loadProjects();
    }

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

  const findProjectById = async (projectId) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await projectService.getById(projectId);
      return result.data;
    } catch (err) {
      toast.error(err.message);
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
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, submitting: false }));
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
      toast.success(result.message || "User removed from project");
      // todo: make backend send new team array then update the team array of project
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, removing: null }));
    }
  };

  const leaveProjectTeam = async (projectId) => {
    setStatus((prev) => ({ ...prev, leaving: projectId }));
    try {
      const result = await projectService.leaveTeam(projectId);
      toast.success(result.message || "Successfully leave the project");
      // todo: make backend send new team array then update the team array of project
    } catch (err) {
      toast.error(err.message);
    } finally {
      setStatus((prev) => ({ ...prev, leaving: null }));
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
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
  };
};
