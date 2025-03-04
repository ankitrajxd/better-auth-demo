"use client";

import { signIn, useSession } from "@/auth.client";
import { redirect, useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { data: session } = useSession();

  if (session?.session) {
    redirect(redirectTo);
  }

  return (
    <div className="grid place-content-center h-screen">
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
