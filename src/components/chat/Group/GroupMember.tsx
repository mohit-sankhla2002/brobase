import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface GroupMemberProps {
  name: string | null;
  image: string | null;
  key: string
}

const GroupMember: React.FC<GroupMemberProps> = ({ image, name, key }) => {
  if (!image || !name) {
    return null;
  }
  return (
    <div className="mb-1 flex items-center gap-2 border-b py-2">
      <Image
        src={image}
        width={40}
        height={40}
        alt="user image"
        className="rounded-full"
      />
      <h3 className="font-medium tracking-tight">{name}</h3>
    </div>
  );
};

export default GroupMember;
