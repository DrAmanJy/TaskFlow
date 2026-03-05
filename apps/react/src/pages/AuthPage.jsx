import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import AuthForm from "../features/auth/components/AuthForm"; // Adjust path if needed

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rememberMe: false,
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted:", formData);
      // Optional: navigate("/app") after successful login
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Centered Form Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10">
          <AuthForm
            isLogin={isLogin}
            isLoading={isLoading}
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                to={isLogin ? "/register" : "/login"}
                onClick={() =>
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    rememberMe: false,
                    profileImage: null,
                  })
                }
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
