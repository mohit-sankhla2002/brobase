import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { buttonVariants } from '../ui/button';
import { Group } from 'lucide-react';
import { cn } from '~/lib/utils';
import CreateGroupForm from './CreateGroupForm';

const CreateGroup = () => {
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
            <CreateGroupForm/>
        </DialogContent>
    </Dialog>
  )
}

export default CreateGroup;