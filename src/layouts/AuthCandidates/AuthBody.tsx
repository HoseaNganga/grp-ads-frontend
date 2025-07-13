"use client";

import { Button } from "../../components/Button/Button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  backPath?: string;
  onBack?: () => void;
  children: ReactNode;
};

const AuthBody = ({
  title,
  description,
  backPath,
  onBack,
  children,
}: Props) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      router.push(backPath);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-6 px-4">
      <div className="w-full flex flex-col text-black h-full">
        {(onBack || backPath) && (
          <Button
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={handleBack}
          >
            Back
          </Button>
        )}

        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-stone-500 mb-4">{description}</p>

        <div className=" overflow-y-auto sm:h-[calc(100vh-150px)] h-[calc(100vh-50px)] px-1 sm:px-2 pb-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthBody;
