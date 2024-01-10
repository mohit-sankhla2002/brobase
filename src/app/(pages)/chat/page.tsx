import React from 'react';
import { getServerAuthSession } from '~/server/auth';
import ChatWindow from '~/components/chat/ChatWindow';
import { SocketProvider } from '~/context/SocketProvider';
import SecondarySidebar from '~/components/chat/SecondarySidebar';
import { permanentRedirect } from 'next/navigation';

const page = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return permanentRedirect("/sign-in");
  }

  return (
    <section className='grid grid-cols-6 w-full h-[92vh]'>
      <SecondarySidebar />
      <SocketProvider>
        <ChatWindow />
      </SocketProvider>
    </section>
  )
}

export default page;