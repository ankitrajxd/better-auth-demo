import Link from "next/link";
import React from "react";
import SignoutButton from "./components/SignoutButton";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div className="grid place-content-center h-screen bg-zinc-50 p-3">
      <div className="max-w-md flex justify-center items-center bg-white  flex-col gap-2 border p-6 rounded-md">
        <p className="text-center text-sm">
          This is a public page that anyone can visit. Below is the link to a
          protected page which only a{" "}
          <span className="font-bold">logged-in</span> user can visit. If you
          try to visit it without signin you will get redirected to the
          sign-in/sign-up page automatically. After successful login,
          you&apos;ll be redirected to the page requested. 
        </p>

        {session && <SignoutButton />}
        <Link className="p-2 cursor-pointer" href="/dashboard">
          <Button
            variant={"outline"}
            className="text-xs cursor-pointer"
            size={"sm"}
          >
            Dashboard (protected)
          </Button>
        </Link>
      </div>

      {!session && (
        <Link
          className=" cursor-pointer rounded-sm absolute right-2 top-2"
          href="/login"
        >
          <Button className="cursor-pointer">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Home;
