/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { emailOtp, signIn } from "@/auth.client";
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
import { cn } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  async function handleLogin(
    e: FormEvent<HTMLFormElement>,
    work: "sendOtp" | "verifyOtp"
  ) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (work === "sendOtp") {
      const email = formData.get("email") as string;
      setUserEmail(email);

      // send the otp
      const { data } = await emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
      });

      console.log(data);

      if (data?.success) {
        setOtpSent(true);
      }
    } else if (work === "verifyOtp") {
      const otp = formData.get("otp") as string;
      const { data, error } = await signIn.emailOtp({
        email: userEmail as string,
        otp: otp,
      });

      if (!error) {
        redirect(redirectTo);
      } else {
        const formattedErr: string =
          (error.message?.split("").at(0)?.toUpperCase() || "") +
          (error.message?.slice(1) || "");
        setError(formattedErr as string);
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Email or Github account
          </CardDescription>
          <div className="flex flex-col gap-4 mt-5">
            <Button
              onClick={async () => {
                // handle login with github
                await signIn.social({
                  provider: "github",
                  callbackURL: redirectTo,
                });
              }}
              variant="outline"
              className="w-full cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Github
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => handleLogin(e, otpSent ? "verifyOtp" : "sendOtp")}
          >
            <div className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <Label htmlFor="email">Email</Label>
                    {userEmail && (
                      <button
                        className="cursor-pointer text-xs opacity-45 underline hover:opacity-90 "
                        onClick={() => {
                          // reset the form
                          setOtpSent(false);
                          setUserEmail("");
                        }}
                      >
                        Change email
                      </button>
                    )}
                  </div>
                  <Input
                    id="email"
                    disabled={otpSent}
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {otpSent && (
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="otp">Otp</Label>
                    </div>
                    <Input
                      className={error && "border-red-500"}
                      id="otp"
                      name="otp"
                      type="text"
                      required
                    />
                    <div className="h-1">
                      {error && (
                        <p className="text-red-500 text-center text-xs">
                          {" "}
                          {error}
                        </p>
                      )}
                      {otpSent && !error && (
                        <p className="text-green-500 text-center text-xs">
                          {" "}
                          OTP sent successfully
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <Button type="submit" className="w-full cursor-pointer">
                  {otpSent ? "Login" : "Send Otp"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Login or Signup with Email
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
