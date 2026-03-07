import { Folder, MoreVertical, Calendar, ArrowRight } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    todo: "bg-slate-100 text-slate-700",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[status] || styles.todo}`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

export const ProjectCard = ({ project }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
            <Folder className="w-6 h-6" />
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Team Avatars */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                src={project.createdBy.profile}
                alt={project.createdBy.fullName}
                title={`Created by ${project.createdBy.fullName}`}
                className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
              />
              {project.team.map((member, i) => (
                <img
                  key={i}
                  src={member.profile}
                  alt={member.fullName}
                  title={`Member: ${member.fullName}`}
                  className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
                />
              ))}
              <button className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold hover:bg-slate-100 transition-colors">
                +
              </button>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {project.team.length + 1} Members
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">
            Created {formatDate(project.createdAt)}
          </span>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          Open Project <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
