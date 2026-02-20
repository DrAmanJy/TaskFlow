import React from "react";
import { NavLink } from "react-router-dom";

export default function ActiveNav({ path, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-600 hover:bg-gray-50"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
