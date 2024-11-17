"use client";

import { navbarLinks } from "@/config/data";
import Link from "next/link";
import { PiListLight, PiX } from "react-icons/pi";
import Searchbar from "./Searchbar";

type MenuProps = {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

const Menu = ({ menuOpen, setMenuOpen }: MenuProps) => {
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const toggleMenu = () => {
    if (menuOpen) {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0px";
    } else {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = "15px";
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {menuOpen ? (
        <div
          onClick={toggleMenu}
          className="hover:bg-black/5 rounded-md p-1 cursor-pointer"
        >
          <PiX className="text-3xl text-black" />
        </div>
      ) : (
        <div
          onClick={toggleMenu}
          className="hover:bg-black/5 rounded-md p-1 cursor-pointer"
        >
          <PiListLight className="text-3xl" />
        </div>
      )}
      {
        <div
          className={`px-2 flex flex-col fixed left-0 top-20 w-full h-full bg-white transform transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Searchbar closeMenu={closeMenu} />
          <nav className="text-black h-full flex flex-col items-start justify-start gap-4 text-base px-2 py-8">
            {navbarLinks.map(
              (link, index) =>
                index < 5 && (
                  <Link
                    key={index}
                    href={`/list?cat=${link.href}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                )
            )}
          </nav>
        </div>
      }
    </div>
  );
};

export default Menu;
