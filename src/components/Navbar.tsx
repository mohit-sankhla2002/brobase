import React from "react";
import { Tektur } from 'next/font/google'
import Link from "next/link";
import { cn } from "~/lib/utils";
const tektur = Tektur({weight: ["400"], subsets: ["latin"]})
const Navbar = () => {
  return (
    <section className="flex h-[8vh] w-full justify-center border border-b px-1 items-center">
      <Link href="/" className={cn(tektur.className, "text-2xl")}>
        BroBase
      </Link>
    </section>
  );
};

export default Navbar;
