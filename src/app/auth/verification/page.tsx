"use client";

import { Button } from "@/components/Button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import toast from "react-hot-toast";

const ConfirmPassword = () => {
  const [code, setCode] = useState<(string | number)[]>(new Array(6).fill(""));

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { verifyEmail, userEmail, isLoading } = useAuthStore();
  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (code[index] !== "") {
        setCode((prev) => {
          const temp = [...prev];
          temp[index] = "";
          return temp;
        });
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setCode((prev) => {
          const temp = [...prev];
          temp[index - 1] = "";
          return temp;
        });
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const isSixDigitCode = /^[a-zA-Z0-9]{6}$/.test(pastedData);

    if (isSixDigitCode) {
      const digitsArray = pastedData.split("");
      setCode(digitsArray);
    } else {
      alert("Pasted text is not a 6-digit code");
    }
  };

  const handleSubmit = async () => {
    const codeStr = code.join("");
    if (codeStr.length !== 6 || !userEmail) {
      toast.error("Please complete the code and ensure you're signed up.");
      return;
    }

    try {
      await verifyEmail({ email: userEmail, code: codeStr });
      toast.success("Email verified successfully!");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" flex flex-col items-center justify-center  ">
        <div className="flex flex-col px-3 md:px-0">
          <h1 className="font-bold text-2xl md:text-3xl mb-2 text-stone-800  ">
            Verification
          </h1>
          <p className="text-sm md:text-md  mt-2  text-start text-stone-400 font-normal mb-4 md:mb-6">
            Enter your 6 digits code that you received in your email.
          </p>
          <div className="flex flex-col items-center justify-center mt-4">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "20px",
                    borderRadius: "7px",
                    border: "1px solid #9BADCA",
                    color: "black",
                  }}
                />
              ))}
            </div>
            <div className="flex gap-4 mt-12">
              <Button
                variant="primary"
                type="submit"
                size="xl2"
                className="cursor-pointer"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
