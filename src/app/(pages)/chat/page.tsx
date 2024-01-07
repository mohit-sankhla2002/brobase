import React from 'react'
import GroupArea from '../../../components/chat/GroupArea'

const page = async () => {
  return (
    <section className='grid grid-cols-6 w-full h-full'>
      <GroupArea />
      <div className='col-span-4 h-full'></div>
    </section>
  )
}

export default page;