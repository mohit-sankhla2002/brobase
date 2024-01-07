import React from 'react'
import { api } from '~/trpc/server';
const FriendsArea = async () => {
  const query = await api.group.getGroups.query()
  if (!query) {
    return <></>
  }

  console.log(query.groups);
  return <></>
}

export default FriendsArea;