import React from "react";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../context/authContext";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, login, register } = useAuth();

  const mode = searchParams.get("mode") || "login";
  const isLogin = mode === "login";

  const [isSubmittingAuth, setIsSubmittingAuth] = React.useState(false);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (data) => {
    const success = await login(data);
    if (success) {
      navigate("/dashboard");
    }
  };
  const handleSignup = async (data) => {
    const success = await register(data);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
          />
        ) : (
          <RegisterForm onSubmit={handleSignup} />
        )}
      </div>
    </div>
  );
}
