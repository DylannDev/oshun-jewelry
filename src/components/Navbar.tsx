"use client";

import Link from "next/link";
import Menu from "./Menu";
import Searchbar from "./Searchbar";
import NavIcons from "./NavIcons";
import Logo from "./Logo";
import { navbarLinks } from "@/config/data";
import { useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="h-20 relative flex justify-center">
      {/* MOBILE */}
      <div className="flex items-center justify-between h-full w-full md:hidden">
        <Logo />
        <Menu />
      </div>
      {/* SCREENS */}
      <div className="hidden md:flex fixed w-full z-50 bg-white mx-auto max-w-[2048px] px-4 md:px-8 lg:px-16 xl:px-24 h-[80px] border-b border-gray-200">
        <div className="hidden md:flex items-center justify-between gap-8 h-full w-full">
          <Logo />
          <div className="relative w-full flex justify-center">
            {isVisible ? (
              <div
                className={`absolute w-full opacity-100 h-full max-w-[1000px] flex justify-center items-center`}
              >
                <Searchbar isVisible={isVisible} setIsVisible={setIsVisible} />
              </div>
            ) : (
              <nav className="hidden xl:flex gap-4 text-sm">
                {navbarLinks.map(
                  (link, index) =>
                    index < 5 && (
                      <Link
                        key={index}
                        href={`/list?cat=${link.href}`}
                        className="hover:underline underline-offset-8"
                      >
                        {link.label}
                      </Link>
                    )
                )}
              </nav>
            )}
          </div>
          <NavIcons isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
