"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { cn } from '~/lib/utils';

interface GroupProps {
    groupName: string;
}

const Group: React.FC<GroupProps> = ({ groupName }) => {
  const router = useRouter();
  const groupSelector = (event: React.FormEvent<HTMLDivElement>) => {
    router.replace(`/chat?activeGroup=${groupName}`)
  }
  const searchParams = useSearchParams();
  return (
    <div onClick={groupSelector} className={cn('cursor-pointer flex gap-4 items-center p-2 border-b hover:bg-muted duration-75 transition-colors ease-in', `${searchParams.get('activeGroup') === groupName ? "bg-muted" : null}`)}>
        <div className='w-10 h-10 bg-muted-foreground rounded-full flex items-center justify-center'>
            <h3 className='w-fit font-light text-white'>{groupName.at(0)?.toUpperCase()}</h3>
        </div>
        <h2 className='text-xl tracking-tight font-semibold text-gray-800'>{groupName}</h2>
    </div>
  )
}

export default Group;