import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react'

interface GroupMemberProps {
    name: string | null, 
    image: string | null,
}

const GroupMember: React.FC<GroupMemberProps> = ({ image, name }) => {
    if (!image || !name) {
        return null;
    }
  return (
    <div className='flex gap-2 items-center mb-1 border-b py-2'>
        <Image src={image} width={40} height={40} alt='user image' className='rounded-full'/>
        <h3 className='tracking-tight font-medium'>{name}</h3>
    </div>
  )
}

export default GroupMember;