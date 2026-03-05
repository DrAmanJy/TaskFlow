import React from "react";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import InputField from "./InputField";
import ImageUpload from "./ImageUpload";

const AuthForm = ({
  isLogin,
  isLoading,
  formData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isLogin && (
        <>
          <ImageUpload
            image={formData.profileImage}
            onChange={handleImageChange}
          />
          <div className="flex flex-col sm:flex-row gap-5">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              icon={User}
              placeholder="Aman"
              value={formData.firstName}
              onChange={handleInputChange}
              required={!isLogin}
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              icon={User}
              placeholder="Lathar"
              value={formData.lastName}
              onChange={handleInputChange}
              required={!isLogin}
            />
          </div>
        </>
      )}

      <InputField
        label="Email Address"
        name="email"
        type="email"
        icon={Mail}
        placeholder="aman@example.com"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        icon={Lock}
        placeholder="••••••••"
        value={formData.password}
        onChange={handleInputChange}
        required
        rightElement={
          isLogin && (
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          )
        }
      />

      {isLogin && (
        <div className="flex items-center">
          <input
            id="remember-me"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-slate-600 cursor-pointer"
          >
            Remember me for 30 days
          </label>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
            Processing...
          </>
        ) : (
          <>
            {isLogin ? "Sign in to workspace" : "Create account"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default AuthForm;
