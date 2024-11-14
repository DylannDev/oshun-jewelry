import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  color?: "white" | "black";
};

const Logo = ({ color = "black" }: LogoProps) => {
  return (
    <Link href={"/"}>
      <div className="relative w-[120px]">
        <Image
          src={color === "white" ? "/oshun_white.svg" : "/oshun.svg"}
          alt="Logo Oshun"
          width={120}
          height={25}
          className="object-cover"
        />
      </div>
    </Link>
  );
};

export default Logo;
