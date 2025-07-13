"use client";

import { Button } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [UserisLoading, setUserIsLoading] = useState(false);
  const handleUserLogin = () => {
    setUserIsLoading(true);
    router.push("/auth/login");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white ">
      <div className="container flex flex-col justify-center items-center gap-2 px-5 max-w sm:max-w-md md:max-w-lg lg:max-w-xl text-black ">
        <div className="text-center text">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Let&apos;s Get Started
          </h1>
        </div>
        <div className="text-center pb-4">
          <p className="text-sm sm:text-sm md:text-md lg:text-lg text-stone-500 font-medium  ">
            Are you creating a new workspace or you are joining as a new user?
          </p>
        </div>

        <div className="flex flex-col w-full mt-4">
          <Button
            type="button"
            onClick={handleUserLogin}
            isLoading={UserisLoading}
            variant="primary"
            className="text-sm sm:text-sm md:text-md font-semibold mb-4 w-full hover:bg-blue-600 hover:text-slate-100 cursor-pointer "
            aria-label="Join as a Candidate"
          >
            Go To Login
          </Button>
        </div>
      </div>
    </div>
  );
}
