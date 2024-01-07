"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button';

interface CreateGroupFormProps {
    createGroupHandler: (groupName: string) => {}
}

const CreateGroupForm: React.FC = () => {
    const [groupName, setGroupName] = useState("");
  return (
    <div className='flex'>
        <Input placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
        <Button className='self-right'>Create Group</Button>
    </div>
  )
}

export default CreateGroupForm;