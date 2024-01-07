import React from 'react';

interface GroupProps {
    groupName: string;
}

const Group: React.FC<GroupProps> = ({ groupName }) => {
  return (
    <div className='cursor-pointer flex gap-4 items-center p-2 border-b hover:bg-muted duration-75 transition-colors ease-in'>
        <div className='w-10 h-10 bg-muted-foreground rounded-full flex items-center justify-center'>
            <h3 className='w-fit text-white'>{groupName.at(0)?.toUpperCase()}</h3>
        </div>
        <h2 className='text-xl tracking-tight font-semibold text-gray-800'>{groupName}</h2>
    </div>
  )
}

export default Group;