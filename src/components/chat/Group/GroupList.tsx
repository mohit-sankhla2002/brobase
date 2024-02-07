"use client"

import React, { useEffect } from 'react'
import Group from './Group'
import { useSocket } from '~/context/SocketProvider'

interface GroupListProps {
    groups: {
        id: string, 
        name: string, 
        createdAt: Date
    }[]
}

const GroupList: React.FC<GroupListProps> = ({groups}) => {
    console.log(groups);
    const { joinGroups } = useSocket();
    useEffect(() => {
        const groupIds = groups.map((group) => group.id);
        joinGroups(groupIds);
    }, [joinGroups]);
  return (
    <div className='flex flex-col w-full h-full border-r'>
      {groups.map((group) => {
        return <Group key={group.id} groupName={group.name} />
      })}
    </div>
  )
}

export default GroupList;