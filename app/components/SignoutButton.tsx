"use client";
import { signOut } from "@/auth.client";
import { useRouter } from "next/navigation";

const SignoutButton = () => {
  const router = useRouter();
  return (
    <button
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
    </button>
  );
};

export default SignoutButton;
