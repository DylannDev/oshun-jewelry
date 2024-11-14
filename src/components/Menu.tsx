"use client";

import { navbarLinks } from "@/config/data";
import Link from "next/link";
import { useState } from "react";
import { PiList } from "react-icons/pi";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PiList
        className="cursor-pointer text-3xl"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <nav className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          {navbarLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Menu;
