import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { resetToken } = useParams();
  const { resetPassword, isLoading, error } = useAuthStore();

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const { password } = data;
    try {
      await resetPassword(resetToken, password);
      toast.success(
        "Password rest successfully, redirecting to login page... "
      );
      setTimeout(() => {
        navigate("/login");
        reset();
      }, 2000);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:w-96">
            <div className="grid gap-2">
              <Label className="sm:text-xl" htmlFor="password">
                New Password
              </Label>
              <Input
                {...register("password", {
                  required: "New password is required",
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
            <div className="grid gap-2">
              <Label className="sm:text-xl" htmlFor="password">
                Confirm Password
              </Label>
              <Input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="sm:text-base"
                id="confirmPassword"
                type="password"
              />
              <p className="text-red-500" role="alert">
                {errors.confirmPassword?.message}
              </p>
            </div>
            {error && <p className="text-red-500 front-semibold">{error}</p>}
            <PasswordStrengthMeter password={watch("password", "")} />
            <Button
              type="submit"
              className="w-full sm:text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                "Set New Password"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
