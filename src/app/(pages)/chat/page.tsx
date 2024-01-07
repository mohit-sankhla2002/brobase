import React from 'react'
import FriendsArea from '~/components/chat/FriendsArea';

const page = async () => {
  return (
    <section className='grid grid-cols-6 w-full h-full'>
      {/* Group Area */}
      <FriendsArea />
      {/* Chat Area */}
      <div className='col-span-6 h-full'></div>
    </section>
  )
}

export default page;