import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    redirect: string;
  }>;
}

const SignInPage = async ({ searchParams }: Props) => {
  const { redirect: redirectTo } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session) {
    redirect(redirectTo);
  }

  return (
    <div className="grid place-content-center w-full h-screen bg-zinc-50">
      <div className="w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default SignInPage;
