import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, signOut, useSession, emailOtp } =
  createAuthClient({
    plugins: [emailOTPClient()],
  });

export const signInUser = async () => {
  const data = await signIn.social({
    provider: "github",
  });

  return data;
};
