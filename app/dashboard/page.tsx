import { auth } from "@/auth";
import { headers } from "next/headers";
import React from "react";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div>
      <p>Dashboard Page</p>
      <p>Hello {session?.user.email}</p>
    </div>
  );
};

export default DashboardPage;
