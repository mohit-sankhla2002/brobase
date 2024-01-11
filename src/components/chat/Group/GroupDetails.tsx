"use client"

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { MoreVertical, Plus } from "lucide-react";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import GroupMember from "./GroupMember";
import AddGroupMember from "./AddGroupMember";

interface GroupDetailsProps {
  groupName: string;
  groupId: string;
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ groupName, groupId }) => {
  const query = api.group.getUsers.useQuery({groupId});

  if (!query || !query.data) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className="mr-4" asChild>
        <MoreVertical className="h-5 w-5 text-muted-foreground hover:text-gray-800" />
      </SheetTrigger>
      <SheetContent className="h-full" autoFocus={false}>
        <SheetHeader></SheetHeader>
        <Avatar className="mx-auto h-44 w-44">
          <AvatarFallback className="text-7xl font-light">
            {groupName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="my-5 text-center text-3xl font-medium tracking-tight">
          {groupName}
        </h1>
        <div className="flex justify-between">
          <h3 className="text-lg tracking-tight">Members</h3>
          <AddGroupMember groupId={groupId} groupName={groupName} groupMembers={query.data} />
        </div>
        <Separator className="my-2" />
        <ScrollArea className="h-full">
            {query.data.map((member) => {
                return <GroupMember key={member.id} image={member.image} name={member.name}/>
            })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default GroupDetails;
