import React from 'react'
import { api } from '~/trpc/server';
import Group from './Group';
const GroupArea = async () => {
  const query = await api.group.getGroups.query();
  if (!query) {
    return <div className='col-span-2 flex flex-col w-full h-screen border-r items-center justify-center'>
      <h1>There was an error loading groups! Try Again Later</h1>
    </div>
  }
  const { groups } = query;
  return (
    <div className='col-span-2 flex flex-col w-full h-screen border-r'>
      {groups.map((group, index) => {
        return <Group groupName={group.name} />
      })}
    </div>
  )
}

export default GroupArea;