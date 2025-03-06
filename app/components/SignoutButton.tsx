"use client";
import { signOut } from "@/auth.client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
  const router = useRouter();
  return (
    <Button
      className="cursor-pointer border p-2 absolute top-2 right-2"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        });
      }}
    >
      Signout
    </Button>
  );
};

export default SignoutButton;
