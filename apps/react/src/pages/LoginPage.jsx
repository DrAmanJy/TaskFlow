import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [isBlur, setIsBlur] = useState({
    email: false,
    password: false,
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }));
    setIsBlur((prev) => ({ ...prev, [id]: false }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setIsBlur((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailInvalid = isBlur.email && !emailRegex.test(userInfo.email);
  const isPasswordInvalid = isBlur.password && userInfo.password.length < 8;
  const isFormValid =
    !isEmailInvalid &&
    !isPasswordInvalid &&
    userInfo.email.trim() !== "" &&
    userInfo.password !== "";

  const disabledSubmit = !isFormValid;

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
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 sm:px-10">
          {/* 1. Added onSubmit to the form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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
                {/* 2. Added id, value, onChange, onBlur, and dynamic className */}
                <input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInput}
                  onBlur={handleBlur}
                  placeholder="developer@example.com"
                  className={getInputClass(isEmailInvalid)}
                />
              </div>
              {/* 3. Added invisible error text reservation */}
              <p
                className={`mt-1.5 text-xs font-medium ${isEmailInvalid ? "text-red-500" : "invisible"}`}
              >
                Please enter a valid email address.
              </p>
            </div>

            {/* Password Field */}
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
                  type="password"
                  value={userInfo.password}
                  onChange={handleInput}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={getInputClass(isPasswordInvalid)}
                />
              </div>
              <p
                className={`mt-1.5 text-xs font-medium ${isPasswordInvalid ? "text-red-500" : "invisible"}`}
              >
                Password must be at least 8 characters.
              </p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              {/* 4. Changed type to submit, added disabled attribute, and dynamic color classes */}
              <button
                type="submit"
                disabled={disabledSubmit}
                className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  disabledSubmit
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
