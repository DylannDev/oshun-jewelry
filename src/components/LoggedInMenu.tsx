import { navbarLinks } from "@/config/data";
import Link from "next/link";
import Button from "./Button";

type LoggedInMenuProps = {
  closeMenu: () => void;
  handleLogout: () => void;
  isLoading: boolean;
};

const LoggedInMenu = ({
  closeMenu,
  handleLogout,
  isLoading,
}: LoggedInMenuProps) => {
  return (
    <>
      <div className="border-b border-gray-200">
        {navbarLinks.map(
          (link, index) =>
            index > 4 && (
              <Link
                key={index}
                href={link.href}
                className={`pb-4 flex items-center gap-1 hover:underline underline-offset-8 text-2xl w-fit ${
                  link.label === "Panier" && "min-[900px]:hidden"
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <div className="text-base">{link.label}</div>
              </Link>
            )
        )}
      </div>
      <Button color="white" onClick={handleLogout} button>
        {isLoading ? "Déconnexion..." : "Se Déconnecter"}
      </Button>
    </>
  );
};

export default LoggedInMenu;
