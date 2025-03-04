"use client";

import { emailOtp, signIn, useSession } from "@/auth.client";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { data: session } = useSession();
  const [otpSent, setOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();

  if (session?.session) {
    redirect(redirectTo);
  }

  return (
    <div className="grid place-content-center h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email") as string;
          setUserEmail(email);

          // call the login function
          const { data } = await emailOtp.sendVerificationOtp({
            email: email,
            type: "sign-in", // or "email-verification", "forget-password"
          });

          if (data?.success) {
            setOtpSent(true);
          }
        }}
        className="flex flex-col p-3 m-4"
      >
        <label
          htmlFor="email
  
        "
        >
          Login With Email
        </label>
        <input className="border" name="email" id="email" type="text" />
        <button type="submit">Login</button>
      </form>
      {otpSent && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const otp = formData.get("otp") as string;

            // call the login function
            const { data, error } = await signIn.emailOtp({
              email: userEmail as string,
              otp: otp,
            });

            console.log(data);

            if (!error) {
              redirect(redirectTo);
            }
          }}
          className="flex flex-col p-3 m-4"
        >
          <label
            htmlFor="otp
  
        "
          >
            Login With Otp
          </label>
          <input className="border" name="otp" id="otp" type="text" />
          <button type="submit">Submit Otp</button>
        </form>
      )}

      <button
        className="cursor-pointer border p-2"
        onClick={async () => {
          await signIn.social({
            provider: "github",
            callbackURL: redirectTo,
          });
        }}
      >
        Login with github
      </button>
    </div>
  );
};

export default SignInPage;
