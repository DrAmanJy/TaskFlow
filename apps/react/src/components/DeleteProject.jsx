import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeleteProject({ onClose, title, id }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/project/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      onClose();
      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Delete Project
          </h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete <strong>{title}</strong>? All tasks
            and data will be permanently removed. This action cannot be undone.
          </p>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}
