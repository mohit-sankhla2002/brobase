import React from 'react';
import { api } from '~/trpc/server';
import Group from './Group';
const GroupArea = async () => {
  const query = await api.group.getGroups.query();
  if (!query) {
    return <div className='col-span-2 flex flex-col w-full h-full border-r items-center justify-center'>
      <h1>There was an error loading groups! Try Again Later</h1>
    </div>
  }
  const { groups } = query;
  return (
    // TODO give a box shadow to the right
    <div className='col-span-2 flex flex-col w-full h-full border-r'>
      <div className='tracking-tighter p-2 text-2xl text-center border-b border-black h-[6vh]'>
        Groups
      </div>
      {groups.map((group) => {
        return <Group key={group.id} groupName={group.name} />
      })}
    </div>
  )
}

export default GroupArea;