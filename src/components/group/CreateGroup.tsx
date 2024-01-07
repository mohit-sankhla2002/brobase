import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import { Cross, Group } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { api } from '~/trpc/server';
import CreateGroupForm from './CreateGroupForm';

const CreateGroup = () => {
    
    const createGroupHandler = async (groupName: string) => {
        const group = await api.group.createGroup.mutate({
            name: groupName
        });
    }
  return (
    <Dialog>
        <DialogTrigger className={cn(buttonVariants({
            variant: "ghost", 
            size: "icon"
        }))}>
            <Group />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create a Group
                </DialogTitle>
                <DialogDescription>Create a group according to your needs</DialogDescription>
            </DialogHeader>
            {/* <CreateGroupForm/> */}
        </DialogContent>
    </Dialog>
  )
}

export default CreateGroup;