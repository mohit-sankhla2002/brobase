"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { cn } from '~/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface GroupProps {
    groupName: string;
}

const Group: React.FC<GroupProps> = ({ groupName }) => {
  const router = useRouter();
  const groupSelector = (event: React.FormEvent<HTMLDivElement>) => {
    router.replace(`/chat?active=${groupName}`)
  }
  const searchParams = useSearchParams();
  return (
    <div onClick={groupSelector} className={cn('cursor-pointer flex gap-4 items-center p-2 border-b hover:bg-gray-200 duration-75 transition-colors ease-in', `${searchParams.get('active') === groupName ? "bg-gray-200" : null}`)}>
        <Avatar>
          <AvatarFallback>{groupName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className='text-xl tracking-tight font-semibold text-gray-800'>{groupName}</h2>
    </div>
  )
}

export default Group;