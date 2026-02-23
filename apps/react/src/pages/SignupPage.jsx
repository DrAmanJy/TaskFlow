import { useState } from "react";
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isBlur, setIsBlur] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setIsBlur((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsBlur((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await register(userInfo);

    setLoading(false);
    if (!success) {
      return toast.error(message || "Something went wrong. Please try again.");
    }
    toast.success("User registered successfully");
    navigate("/");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFirstNameInvalid = isBlur.firstName && userInfo.firstName.length < 3;
  const isLastNameInvalid = isBlur.lastName && userInfo.lastName.length < 3;
  const isEmailInvalid = isBlur.email && !emailRegex.test(userInfo.email);
  const isPasswordInvalid = isBlur.password && userInfo.password.length < 8;

  const isFormValid =
    !isFirstNameInvalid &&
    !isLastNameInvalid &&
    !isEmailInvalid &&
    !isPasswordInvalid &&
    userInfo.firstName.trim().length >= 3 &&
    userInfo.lastName.trim().length >= 3 &&
    emailRegex.test(userInfo.email) &&
    userInfo.password.length >= 8;

  const disabledSubmit = !isFormValid || loading;

  const getInputClass = (isInvalid) => {
    const baseClass =
      "w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 outline-none transition-all text-gray-800";
    const normalClass =
      "border-gray-200 focus:ring-indigo-200 focus:border-indigo-500";
    const errorClass = "border-red-500 focus:ring-red-200 focus:border-red-500";
    return `${baseClass} ${isInvalid ? errorClass : normalClass}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-3xl font-extrabold text-indigo-600">
          TaskFlow
        </span>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  First Name
                </label>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isFirstNameInvalid ? "text-red-400" : "text-gray-400"}`}
                  >
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={userInfo.firstName}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    placeholder="John"
                    className={getInputClass(isFirstNameInvalid)}
                  />
                </div>
                <p
                  className={`mt-1.5 text-xs font-medium ${isFirstNameInvalid ? "text-red-500" : "invisible"}`}
                >
                  Min 3 characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Last Name
                </label>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isLastNameInvalid ? "text-red-400" : "text-gray-400"}`}
                  >
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={userInfo.lastName}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    placeholder="Doe"
                    className={getInputClass(isLastNameInvalid)}
                  />
                </div>
                <p
                  className={`mt-1.5 text-xs font-medium ${isLastNameInvalid ? "text-red-500" : "invisible"}`}
                >
                  Min 3 characters.
                </p>
              </div>
            </div>

            <div className="-mt-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isEmailInvalid ? "text-red-400" : "text-gray-400"}`}
                >
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInput}
                  onBlur={handleBlur}
                  placeholder="developer@example.com"
                  className={getInputClass(isEmailInvalid)}
                />
              </div>
              <p
                className={`mt-1.5 text-xs font-medium ${isEmailInvalid ? "text-red-500" : "invisible"}`}
              >
                Invalid email format.
              </p>
            </div>

            <div className="-mt-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <span
                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isPasswordInvalid ? "text-red-400" : "text-gray-400"}`}
                >
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userInfo.password}
                  onChange={handleInput}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={getInputClass(isPasswordInvalid)}
                />
              </div>
              <p
                className={`mt-1.5 text-xs ${isPasswordInvalid ? "text-red-500 font-medium" : "text-gray-500"}`}
              >
                {isPasswordInvalid
                  ? "Must be at least 8 characters."
                  : "Min 8 characters."}
              </p>
            </div>

            <div className="pt-2">
              <button
                disabled={disabledSubmit}
                type="submit"
                className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all ${
                  disabledSubmit
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
