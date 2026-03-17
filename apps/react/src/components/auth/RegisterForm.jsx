import { useForm, Controller } from "react-hook-form";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import ImageUpload from "../ui-a/ImageUpload";
import { InputField } from "./InputField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  profileImage: z.instanceof(File).optional(),
  firstName: z
    .string()
    .min(1, "First Name is required")
    .min(3, "First Name must be at least 3 characters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .min(3, "Last Name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const { isLoading, isAuthenticated, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profileImage: null,
    },
    mode: "onTouched",
  });

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) {
      navigate("/dashboard");
    }
  };
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:px-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <Controller
            name="profileImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onImageChange={field.onChange}
                error={errors.profileImage}
              />
            )}
          />

          {/* Name Row */}
          <div className="flex gap-4">
            <InputField
              label="First Name"
              name="firstName"
              icon={User}
              placeholder="Aman"
              register={register}
              error={errors.firstName}
              className="flex-1"
            />

            <InputField
              label="Last Name"
              name="lastName"
              icon={User}
              placeholder="Lathar"
              register={register}
              error={errors.lastName}
              className="flex-1"
            />
          </div>

          <InputField
            label="Email Address"
            name="email"
            type="email"
            icon={Mail}
            placeholder="aman@example.com"
            register={register}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            register={register}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to={"/auth?mode=login"}
              className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
