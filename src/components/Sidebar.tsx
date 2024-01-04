import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { MessageSquare, UserPlus, LogOut, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden h-full w-fit md:flex md:flex-col md:justify-between border border-r px-2 py-3">
      <div className="flex flex-col gap-4">
        <Button size="icon" variant="ghost">
          <MessageSquare />
        </Button>
        <Button size="icon" variant="ghost">
          <UserPlus />
        </Button>
      </div>
      <div className="flex flex-col items-end gap-2 h-fit">
      <Separator />
        <Button size="icon" variant="ghost">
          <Settings />
        </Button>
        <Button size="icon" variant="ghost">
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
