import { permanentRedirect } from "next/navigation";
import React from "react";
import SignInCard from "~/components/sign-in/SignInCard";
import { getServerAuthSession } from "~/server/auth";
const page = async () => {
  const session = await getServerAuthSession();

  if (session && session.user) {
    return permanentRedirect("/chat");
  }

  return (
    <section className="mt-10">
      <SignInCard />
    </section>
  );
};

export default page;
