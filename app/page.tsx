import Link from "next/link";
import React from "react";
import SignoutButton from "./components/SignoutButton";
import { headers } from "next/headers";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div className="grid place-content-center h-screen">
      <p>HomePage</p>
      {!session && <Link href="/login">Login</Link>}
      {session && <SignoutButton />}
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
