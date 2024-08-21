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

import { useForm } from "react-hook-form";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

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

  const password = watch("password");
  const onSubmit = (data) => {
    data.email = data.email.toLowerCase(); // Convert email to lowercase before submitting
    console.log(data);
    reset();
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
              {errors.name && (
                <p className="text-red-500" role="alert">
                  {errors.name.message}
                </p>
              )}
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
              {errors.email && (
                <p className="text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
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
              {errors.password && (
                <p className="text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>
            <PasswordStrengthMeter password={password} />
            <Button type="submit" className="w-full sm:text-lg">
              Create an account
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
