import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = searchParams.get("mode") || "login";
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
