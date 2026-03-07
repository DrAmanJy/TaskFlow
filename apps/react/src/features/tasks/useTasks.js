import { useEffect, useState } from "react";
import { TaskService } from "../../api/taskService";
import toast from "react-hot-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    searching: false,
    submitting: false,
    updating: null,
    deleting: null,
  });

  const loadTasks = async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = TaskService.getUserTask();
      setTasks(result.data);
    } catch (error) {
      toast.error("Could not load tasks");
      toast.error(error.message);
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const searchTasks = async (query) => {
    if (!query) {
      return loadTasks();
    }

    setStatus((prev) => ({ ...prev, searching: true }));
    try {
      const result = await TaskService.search(query);
      setTasks(result.data);
    } catch (err) {
      toast.error(err.message || "Search failed");
    } finally {
      setStatus((prev) => ({ ...prev, searching: false }));
    }
  };

  const findTaskById = async (taskId) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await TaskService.getTaskById(taskId);
      return result.data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const findProjectTask = async (projectId) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await TaskService.getTaskByProjectId(projectId);
      setTasks(result.data);
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateTask = async (taskId, data) => {
    setStatus((prev) => ({ ...prev, updating: taskId }));
    try {
      const result = await TaskService.updateTask(taskId, data);
      setTasks((prev) =>
        prev.map((t) => (t.id === result.data.id ? result.data : t)),
      );
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, updating: null }));
    }
  };

  const deleteTask = async (taskId) => {
    setStatus((prev) => ({ ...prev, deleting: taskId }));
    try {
      const result = await TaskService.deleteTask(taskId);
      setTasks((t) => t.filter(t.id !== result.data.id));
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, deleting: null }));
    }
  };

  const moveTask = async (taskId, data) => {
    setStatus((prev) => ({ ...prev, updating: taskId }));
    try {
      const result = await TaskService.moveTask(taskId, data);
      setTasks((prev) =>
        prev.map((t) => (t.id === result.data.id ? result.data : t)),
      );
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setStatus((prev) => ({ ...prev, updating: null }));
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    status,
    searchTasks,
    findTaskById,
    findProjectTask,
    refresh: loadTasks,
    updateTask,
    deleteTask,
    moveTask,
  };
};
