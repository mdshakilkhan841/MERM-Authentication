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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase(); // Convert email to lowercase before submitting
    const { email, password } = data;
    try {
      await login(email, password);
      navigate("/");
      reset();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Login
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:w-96">
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
              <div className="flex items-center">
                <Label className="sm:text-xl" htmlFor="password">
                  Password
                </Label>
                <Link
                  to={"/forgot-password"}
                  className="ml-auto inline-block sm:text-xl underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 1,
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
            <Button
              type="submit"
              className="w-full sm:text-lg mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center sm:text-lg text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="underline font-semibold">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
