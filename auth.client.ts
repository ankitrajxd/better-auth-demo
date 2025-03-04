import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, signOut, useSession } = createAuthClient();

export const signInUser = async () => {
  const data = await signIn.social({
    provider: "github",
  });

  return data;
};
