import React from "react";
import { getServerAuthSession } from "~/server/auth";
import ChatWindow from "~/components/chat/ChatWindow";
import { SocketProvider } from "~/context/SocketProvider";
import SecondarySidebar from "~/components/chat/SecondarySidebar";
import { permanentRedirect } from "next/navigation";
import { api } from "~/trpc/server";
const page = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return permanentRedirect("/sign-in");
  }

  const query = await api.group.getGroups.query();
  if (!query) {
    return (
      <div className="col-span-2 flex h-full w-full flex-col items-center justify-center border-r">
        <h1>There was an error loading groups! Try Again Later</h1>
      </div>
    );
  }
  const { groups } = query;

  return (
    <section className="grid h-[92vh] w-full grid-cols-6">
      <SocketProvider>
        <SecondarySidebar groups={groups} />
        <ChatWindow
          // @ts-expect-error
          user={session.user}
          groups={groups}
        />
      </SocketProvider>
    </section>
  );
};

export default page;
