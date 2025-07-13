import Image from "next/image";
import Logo from "../../assets/logo.png";
import Link from "next/link";
import HeaderIcons from "./HeaderIcons";

export default function Header() {
  return (
    <nav className="min-w-full bg-white border-b-2 sticky top-0 z-[99999] ">
      <div className="flex justify-between items-center p-4 min-w-full ">
        <div className="flex justify-center items-center">
          <Link href="/welcome">
            <Image src={Logo} width={40} height={40} alt="GrpAds Logo" />
            <span className="font-semibold text-xl text-gray-800 text-center ">
              GrpAds
            </span>
          </Link>
        </div>
        <div>
          <HeaderIcons />
        </div>
      </div>
    </nav>
  );
}
