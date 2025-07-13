import Image from "next/image";
import loginIcon from "@/assets/login.jpeg";
import { GrpAdsIcon } from "@/components/Icons/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 lg:px-10 lg:py-5 min-h-screen w-screen bg-white h-full ">
      <div className=" max-w-[500px] w-full hidden lg:block">
        <Image
          src={loginIcon}
          alt="Picture of the author"
          className="w-full object-cover  "
        />
      </div>

      <div className=" lg:p-4 flex flex-col lg:justify-center items-center flex-grow">
        <div className="flex hidden w-full  border-b border-stone-300 pb-4 pt-7 mb-5   ">
          <GrpAdsIcon />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
