import React from "react";

export const PriorityBadge = ({ priority }) => {
  const styles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${styles[priority] || styles.low}`}
    >
      {priority}
    </span>
  );
};
