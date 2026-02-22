import { Link } from "react-router-dom";
import CreateButton from "../components/CreateButton";
import { useAuth } from "../context/authContext";

export default function Header({ title, children, btnLabel }) {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {children}
        {btnLabel && <CreateButton label={btnLabel} />}

        {user ? (
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-white shadow-sm ml-2 flex items-center justify-center text-[11px] font-bold text-white">
            AL
          </div>
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
