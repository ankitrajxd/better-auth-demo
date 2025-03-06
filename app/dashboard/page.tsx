import { auth } from "@/auth";
import { headers } from "next/headers";
import React from "react";
import SignoutButton from "../components/SignoutButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  // gettin the session on server / server component/ server action.
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <div className="grid place-content-center p-3 h-screen bg-zinc-50">
      <div className="max-w-md flex justify-center items-center bg-white flex-col gap-2 border p-6 rounded-md">
        <p className="text-sm font-bold">
          <span>{session?.user.email}</span>
        </p>
        <p className="text-center text-sm">
          Hello <span className="font-bold">{session?.user.name}</span>, Welcome
          to your dashboard. Now with you name on the screen, It&apos;s clear
          that you are authenticated and allowed to visit this page.
        </p>

        {session && <SignoutButton />}
        <Link className="p-2 cursor-pointer" href="/">
          <Button
            variant={"outline"}
            className="text-xs cursor-pointer"
            size={"sm"}
          >
            Go Back to Home Page (Public)
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

export default DashboardPage;
