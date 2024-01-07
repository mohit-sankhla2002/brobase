"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { api } from '~/trpc/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateGroupForm: React.FC = () => {
    const router = useRouter();
    const [ groupName, setGroupName ] = useState("");
    const { mutate, isLoading } = api.group.createGroup.useMutation({
      onSuccess: (group) => {
        toast.success(`${group.name} Group was Created!`);
      },
      onError: (error: any) => {
        toast.error(error.message);
        router.refresh();
      },
      onSettled: () => {
        setIsGroupLoading(false);
        router.refresh();
      }
    });
    const createGroupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutate({ name: groupName });
    }
    const [isGroupLoading, setIsGroupLoading] = useState(isLoading);
  return (
    <div className='flex gap-2'>
        <form onSubmit={createGroupHandler} className='flex gap-2 w-full'>
          <Input placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
          <Button className='' disabled={isGroupLoading}>Create Group</Button>
        </form>
    </div>
  )
}

export default CreateGroupForm;