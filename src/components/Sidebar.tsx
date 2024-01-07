import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { MessageSquare, UserPlus, Settings } from "lucide-react";
import CreateGroup from "./group/CreateGroup";
import LogOutButton from "./LogOutButton";
const Sidebar = () => {
  return (
    <div className="hidden h-full w-fit md:flex md:flex-col md:justify-between border-r px-2 py-3">
      <div className="flex flex-col gap-4">
        <Button size="icon" variant="ghost">
          <MessageSquare />
        </Button>
        <Button size="icon" variant="ghost">
          <UserPlus />
        </Button>
        <CreateGroup />
      </div>
      <div className="flex flex-col items-end gap-2 h-fit">
      <Separator />
        <Button size="icon" variant="ghost">
          <Settings />
        </Button>
        <LogOutButton />
      </div>
    </div>
  );
};

export default Sidebar;
