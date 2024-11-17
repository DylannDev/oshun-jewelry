import { SearchIconProps } from "@/types";
import CartIcon from "./CartIcon";
import ProfileIcon from "./ProfileIcon";
import SearchIcon from "./SearchIcon";

const NavIcons = ({ isVisible, setIsVisible }: SearchIconProps) => {
  return (
    <div className="flex items-center gap-1 xl:gap-2">
      <SearchIcon isVisible={isVisible} setIsVisible={setIsVisible} />
      <ProfileIcon />
      <CartIcon />
    </div>
  );
};

export default NavIcons;
