import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { useAuthStore } from "@/store/authStore";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthStore();

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase(); // Convert email to lowercase before submitting
    const { name, email, password } = data;
    try {
      await signup(email, password, name);
      navigate("/verify-email");
      reset();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Sign Up
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:w-96">
            <div className="grid gap-2">
              <Label className="sm:text-xl" htmlFor="first-name">
                Full name
              </Label>
              <Input
                {...register("name", { required: "Name is required" })}
                className="sm:text-base"
                id="first-name"
                placeholder="Max"
              />
              <p className="text-red-500" role="alert">
                {errors.name?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label className="sm:text-xl" htmlFor="email">
                Email
              </Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="sm:text-base"
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              <p className="text-red-500" role="alert">
                {errors.email?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label className="sm:text-xl" htmlFor="password">
                Password
              </Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="sm:text-base"
                id="password"
                type="password"
              />
              <p className="text-red-500" role="alert">
                {errors.password?.message}
              </p>
            </div>
            {error && <p className="text-red-500 front-semibold">{error}</p>}
            <PasswordStrengthMeter password={watch("password")} />
            <Button
              type="submit"
              className="w-full sm:text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center sm:text-lg text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="underline font-semibold">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUp;
