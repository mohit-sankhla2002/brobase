import React from "react";
import Sidebar from "./Sidebar";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";

interface BodyWrapperProps {
  children: React.ReactNode;
}

const BodyWrapper: React.FC<BodyWrapperProps> = async ({ children }) => {
  const session = await getServerAuthSession();
  console.log(session);
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
        <div className="h-[92vh] md:flex">
          {session ? <Sidebar /> : null}
          <div className="w-full">{children}</div>
        </div>
    </TRPCReactProvider>
  );
};

export default BodyWrapper;
