/* eslint-disable no-unused-vars */
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const navigate = useNavigate();
  const { verifyEMail, isLoading, error } = useAuthStore();

  const onSubmit = async (data) => {
    console.log(data);
    const { otp } = data;
    try {
      await verifyEMail(otp);
      navigate("/");
      toast.success("Email verified successfully");
      reset();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  // const isLoading = false;

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-center py-2 sm:text-base">
          Enter the 6-digit code sent to your email address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 sm:w-96">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={watch("otp")}
              {...register("otp", {
                required: "Enter the 6-digit code",
                minLength: {
                  value: 6,
                  message: "Enter the 6-digit code",
                },
              })}
              onChange={(value) => setValue("otp", value)}
            >
              <div className="flex justify-between w-full gap-3">
                {[...Array(6)].map((_, index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot
                      index={index}
                      className="sm:w-12 sm:h-12 w-9 h-9 text-center sm:text-xl text-lg font-bold" // Increase size here
                    />
                  </InputOTPGroup>
                ))}
              </div>
            </InputOTP>

            {error && <p className="text-red-500 front-semibold">{error}</p>}
            <Button
              type="submit"
              className="w-full sm:h-11 sm:text-lg mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                "Verify Email"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
