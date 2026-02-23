import { Link } from "react-router-dom";
import CreateButton from "../components/CreateButton";
import { useAuth } from "../context/authContext";

export default function Header({ title, children, btnLabel, btnAction }) {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {children}
        {btnLabel && <CreateButton label={btnLabel} action={btnAction} />}

        {user ? (
          <img
            src={user.profile}
            alt="User profile"
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm ml-2 object-cover"
          />
        ) : (
          <Link
            to="/login"
            className="text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-5 py-2 rounded-lg transition-colors"
          >
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
