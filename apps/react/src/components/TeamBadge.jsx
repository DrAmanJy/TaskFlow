export default function TeamBadge({ member, index }) {
  const { initials, colorClass } = member;

  return (
    <div
      className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${colorClass}`}
      style={{ zIndex: 20 - index }}
    >
      {initials}
    </div>
  );
}
