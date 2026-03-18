import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { TaskService } from "../api/taskService";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    searching: false,
    submitting: false,
    updating: null,
    deleting: null,
  });

  const loadTasks = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await TaskService.getUserTask();
      setTasks(result.data || []);
    } catch (error) {
      toast.error(error.message || "Could not load tasks");
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // 2. Memoize searchTasks
  const searchTasks = useCallback(
    async (query) => {
      if (!query) {
        return loadTasks();
      }

      setStatus((prev) => ({ ...prev, searching: true }));
      try {
        const result = await TaskService.search(query);
        setTasks(result.data || []);
      } catch (err) {
        toast.error(err.message || "Search failed");
      } finally {
        setStatus((prev) => ({ ...prev, searching: false }));
      }
    },
    [loadTasks],
  );

  const findTaskById = useCallback(async (taskId) => {
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
  }, []);

  const findProjectTask = useCallback(async (projectId) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const result = await TaskService.getTaskByProjectId(projectId);
      setTasks(result.data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const createTask = useCallback(async (data) => {
    setStatus((prev) => ({ ...prev, submitting: true }));
    try {
      const result = await TaskService.createTask(data);
      setTasks((prev) => [...prev, result.data]);
      toast.success(result.message || "Task created successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to create task");
      return false;
    } finally {
      setStatus((prev) => ({ ...prev, submitting: false }));
    }
  }, []);

  const updateTask = useCallback(async (taskId, data) => {
    setStatus((prev) => ({ ...prev, updating: taskId }));
    try {
      const result = await TaskService.updateTask(taskId, data);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? result.data : t)));
      toast.success(result.message || "Task updated");
      return true;
    } catch (error) {
      toast.error(error.message || "Update failed");
      return false;
    } finally {
      setStatus((prev) => ({ ...prev, updating: null }));
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    setStatus((prev) => ({ ...prev, deleting: taskId }));
    try {
      await TaskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStatus((prev) => ({ ...prev, deleting: null }));
    }
  }, []);

  const moveTask = useCallback(async (taskId, data) => {
    setStatus((prev) => ({ ...prev, updating: taskId }));
    try {
      const result = await TaskService.moveTask(taskId, data);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? result.data : t)));
      toast.success(result.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setStatus((prev) => ({ ...prev, updating: null }));
    }
  }, []);

  const assignTask = useCallback(async (taskId, assigneeId) => {
    setStatus((prev) => ({ ...prev, updating: taskId }));
    try {
      const result = await TaskService.assignTask(taskId, assigneeId);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? result.data : t)));
      toast.success(result.message || "Task assigned successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Assignment failed");
      return false;
    } finally {
      setStatus((prev) => ({ ...prev, updating: null }));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        status,
        searchTasks,
        findTaskById,
        findProjectTask,
        createTask,
        refresh: loadTasks,
        updateTask,
        deleteTask,
        moveTask,
        assignTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within TaskProvider");
  return context;
};
