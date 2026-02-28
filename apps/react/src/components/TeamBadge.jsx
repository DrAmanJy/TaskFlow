export default function TeamBadge({ member, index }) {
  const { firstName, lastName, profile } = member;

  return (
    <img
      src={profile}
      alt={`${firstName} ${lastName}`}
      title={`${firstName} ${lastName}`}
      className="w-7 h-7 rounded-full border-2 border-white object-cover bg-gray-100"
      style={{ zIndex: 20 - index }}
    />
  );
}
