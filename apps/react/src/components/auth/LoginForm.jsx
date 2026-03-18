import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputField } from "../../components/InputField";
import { InputInvalid } from "../../components/InputInvalid";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .refine((val) => val !== "", { message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginForm({
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div
      className={"flex flex-col gap-6 w-full max-w-md"}    >
      <Card className="shadow-sm border border-border">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="space-y-4">
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

              <Field>
                {errors.password ? (
                  <InputInvalid
                    id="password"
                    type="password"
                    label="Password"
                    placeholder=""
                    registration={register("password")}
                    error={errors.password}
                  />
                ) : (
                  <InputField
                    id="password"
                    type="password"
                    label="Password"
                    placeholder=""
                    registration={register("password")}
                  />
                )}
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </Field>
              <Field>
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Logging in..."
                      : "Login"}
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Login with Google
                  </Button>
                  <FieldDescription className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/auth?mode=signup"
                      className="font-medium underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </FieldDescription>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
