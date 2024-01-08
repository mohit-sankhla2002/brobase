import React from 'react';
import GroupArea from '../../../components/chat/GroupArea';
import ChatWindow from '~/components/chat/ChatWindow';

const page = async () => {
  return (
    <section className='grid grid-cols-6 w-full h-[92vh]'>
      <GroupArea />
      <ChatWindow />
      
    </section>
  )
}

export default page;