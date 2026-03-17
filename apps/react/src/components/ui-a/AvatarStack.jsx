export const AvatarStack = ({ creator, team }) => (
  <div className="flex items-center gap-3">
    <div className="flex -space-x-2">
      <img
        src={creator.profile}
        alt={creator.fullName}
        className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
      />
      {team.map((member, i) => (
        <img
          key={i}
          src={member.profile}
          alt={member.fullName}
          className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
        />
      ))}
      <button className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold hover:bg-slate-100 transition-colors">
        +
      </button>
    </div>
    <span className="text-xs text-slate-400 font-medium">
      {team.length + 1} Members
    </span>
  </div>
);
