import React from "react";
import { Plane } from "lucide-react";
import Link from "next/link";
const Navbar = () => {
  return (
    <section className="flex h-[8vh] w-full justify-center border border-b px-1">
      <Link href="/">
        <Plane className="h-full text-gray-500" />
      </Link>
    </section>
  );
};

export default Navbar;
