import React from "react";
import TeamBadge from "./TeamBadge";
import {
  Layout,
  Server,
  Store,
  Folder,
  MoreVertical,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
const iconMap = {
  layout: {
    component: Layout,
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
  },
  server: {
    component: Server,
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-600",
  },
  store: {
    component: Store,
    bgClass: "bg-orange-50",
    textClass: "text-orange-600",
  },
  folder: {
    component: Folder,
    bgClass: "bg-gray-50",
    textClass: "text-gray-600",
  },
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function ProjectCard({ project }) {
  const {
    id,
    title,
    description,
    status,
    icon,
    team = [],
    updatedAt,
  } = project;
  const progress = project.progress || 0;
  const displayTeam = team.slice(0, 3);
  const additionalMembersCount = team.length > 3 ? team.length - 3 : 0;

  const iconDetails = iconMap[icon] || iconMap.folder;
  const DynamicIcon = iconDetails.component;
  const { bgClass, textClass } = iconDetails;

  let progressColor = "bg-indigo-600";
  if (progress === 100) {
    progressColor = "bg-gray-400";
  } else if (progress <= 50) {
    progressColor = "bg-emerald-500";
  }

  return (
    <Link
      to={`/projects/${id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col group"
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgClass} ${textClass}`}
        >
          <DynamicIcon className="w-6 h-6" strokeWidth={2} />
        </div>

        <button
          className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-1">
        {description}
      </p>

      <div className="mb-4">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`${progressColor} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex -space-x-2">
          {displayTeam.map((member, i) => (
            <TeamBadge key={member._id} index={i} member={member} />
          ))}
          {additionalMembersCount > 0 && (
            <div
              className="relative w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-500"
              style={{ zIndex: 0 }}
            >
              +{additionalMembersCount}
            </div>
          )}
        </div>

        {status === "completed" ? (
          <span className="text-xs font-medium text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
            Completed
          </span>
        ) : (
          <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Updated {formatDate(updatedAt)}
          </span>
        )}
      </div>
    </Link>
  );
}
