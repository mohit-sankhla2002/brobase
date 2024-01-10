import React from 'react';
import { api } from '~/trpc/server';
import Group from './Group';
import GroupList from './GroupList';
const GroupArea = async () => {
  const query = await api.group.getGroups.query();
  if (!query) {
    return <div className='col-span-2 flex flex-col w-full h-full border-r items-center justify-center'>
      <h1>There was an error loading groups! Try Again Later</h1>
    </div>
  }
  const { groups } = query;
  const groupIds = groups.map((group) => (group.id));
  return (
    // TODO give a box shadow to the right
    <GroupList groups={groups} />
  )
}

export default GroupArea;