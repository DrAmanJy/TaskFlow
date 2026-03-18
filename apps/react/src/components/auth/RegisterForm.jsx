import { useForm, Controller } from "react-hook-form";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import ImageUpload from "../ui-a/ImageUpload";
import { InputField } from "../InputField";
import { InputInvalid } from "../InputInvalid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  profileImage: z.any().optional(),
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

export default function RegisterForm(onSubmit) {

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


  return (
    <Card >
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
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
            <div className="flex gap-4">
              <div className="flex-1">
                {errors.firstName ? (
                  <InputInvalid
                    id="firstName"
                    type="text"
                    label="First Name"
                    placeholder="Aman"
                    registration={register("firstName")}
                    error={errors.firstName}
                  />
                ) : (
                  <InputField
                    id="firstName"
                    type="text"
                    label="First Name"
                    placeholder="Aman"
                    registration={register("firstName")}
                  />
                )}
              </div>
              <div className="flex-1">
                {errors.lastName ? (
                  <InputInvalid
                    id="lastName"
                    type="text"
                    label="Last Name"
                    placeholder="Lathar"
                    registration={register("lastName")}
                    error={errors.lastName}
                  />
                ) : (
                  <InputField
                    id="lastName"
                    type="text"
                    label="Last Name"
                    placeholder="Lathar"
                    registration={register("lastName")}
                  />
                )}
              </div>
            </div>
            {errors.email ? (
              <InputInvalid
                id="email"
                type="email"
                label="Email"
                placeholder="m@example.com"
                registration={register("email")}
                error={errors.email}
              />
            ) : (
              <InputField
                id="email"
                type="email"
                label="Email"
                placeholder="m@example.com"
                registration={register("email")}
              />
            )}
            {errors.password ? (
              <InputInvalid
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                registration={register("password")}
                error={errors.password}
              />
            ) : (
              <InputField
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                registration={register("password")}
              />
            )}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link to="/auth?mode=login" className="font-bold text-primary hover:underline">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
