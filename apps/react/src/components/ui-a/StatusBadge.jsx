export const StatusBadge = ({ status }) => {
  const styles = {
    todo: "bg-slate-100 text-slate-700",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[status] || styles.todo}`}
    >
      {status?.replace("-", " ")}
    </span>
  );
};
