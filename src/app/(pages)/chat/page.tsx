import React from 'react';
import { getServerAuthSession } from '~/server/auth';
import ChatWindow from '~/components/chat/ChatWindow';
import { SocketProvider } from '~/context/SocketProvider';
import SecondarySidebar from '~/components/chat/SecondarySidebar';
import { permanentRedirect } from 'next/navigation';
import { api } from '~/trpc/server';
const page = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return permanentRedirect("/sign-in");
  }

  const query = await api.group.getGroups.query();
  if (!query) {
    return <div className='col-span-2 flex flex-col w-full h-full border-r items-center justify-center'>
      <h1>There was an error loading groups! Try Again Later</h1>
    </div>
  }
  const { groups } = query;

  return (
    <section className='grid grid-cols-6 w-full h-[92vh]'>
      <SocketProvider>
        <SecondarySidebar groups={groups}/>
        <ChatWindow user={session.user} groups={groups}/>
      </SocketProvider>
    </section>
  )
}

export default page;