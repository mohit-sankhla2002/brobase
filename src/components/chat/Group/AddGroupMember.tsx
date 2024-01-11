"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { User } from "@prisma/client";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

interface AddGroupMemberProps {
  groupName: string;
  groupId: string;
  groupMembers: User[] | undefined;
}

const AddGroupMember: React.FC<AddGroupMemberProps> = ({
  groupName,
  groupId,
  groupMembers,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState<string>("");
  const query = api.user.getUsersByName.useQuery({
    username,
  });

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setUsername("");
      setUsers([]);
    }

    setUsername(e.target.value);
  };

  const findUsers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length === 0) {
      setUsername("");
      setUsers([]);
    }
    const filteredUsers = query.data?.filter(
      (user) => !groupMembers?.includes(user),
    );
    setUsers(filteredUsers || []);
  };
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Plus className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Member to {groupName}</DialogTitle>
        </DialogHeader>
        <form className="flex items-center gap-2" onSubmit={findUsers}>
          <Input
            id="username"
            onChange={handleUsernameChange}
            value={username}
          />
          <Button type="submit">Search</Button>
        </form>
        <ScrollArea className="max-h-[300px]">
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-muted active:bg-gray-300">
                  <Avatar>
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback>
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h4>{user.name}</h4>
                </div>
              );
            })
          ) : (
            <h5 className="text-center">Enter Name of the User</h5>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupMember;
