import { Loader, ArrowLeft, MailIcon } from "lucide-react";
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
import { useAuthStore } from "@/store/authStore";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const { forgotPassword, isLoading, message, error } = useAuthStore();

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase(); // Convert email to lowercase before submitting
    console.log(data);
    const { email } = data;
    try {
      await forgotPassword(email);
      reset();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Forgot Password
        </CardTitle>
        <CardDescription className="flex items-center justify-center text-center">
          {message ? (
            <div className="border border-gray-400 bg-gray-200 rounded-full p-2 mt-4">
              <MailIcon className="w-8 h-8" />
            </div>
          ) : (
            <p>
              Enter your email address <br /> we&apos;ll send you a password
              reset link to your email
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {message ? (
          <div className="text-center sm:w-96 sm:text-lg font-semibold italic">
            {message}
          </div>
        ) : (
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
              <Button
                type="submit"
                className="w-full sm:text-lg mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>
            {error && <p className="text-red-500 front-semibold">{error}</p>}
          </form>
        )}

        <div className="mt-4 text-center sm:text-lg text-sm">
          <Link
            to={"/login"}
            className="font-semibold flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-6 h-6" /> Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
