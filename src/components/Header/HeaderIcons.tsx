"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function HeaderIcons() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 400px)");
    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex sm:gap-[14px] lg:gap-[10px] cursor-pointer pt-[8px]">
        <div onClick={toggleMenu}>
          <svg
            className="w-[20px] h-[20px] lg:hidden cursor-pointer"
            viewBox="0 0 24 24"
            fill="#000"
            stroke="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        {menuOpen && isSmallScreen && (
          <div
            className="flex flex-col absolute z-40 mt-[50px] 
          gap-[14px] 
          bg-white shadow-md h-[150px] w-[200px] right-[5px] 
          items-center 
          justify-center 
          rounded-[20px]"
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-4  cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
                      {user?.first_name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      Hello {user?.first_name || "User"}
                    </span>
                  </div>
                </div>

                <button onClick={handleLogout}>
                  <div className="items-center gap-1 flex flex-col hover:scale-110 transition duration-100 group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5 3.375C12.6044 3.375 11.7456 3.73058 11.1049 4.37129C10.4642 5.012 10.125 5.8708 10.125 6.7665V10.125H12.375V6.7665C12.375 6.46783 12.4935 6.18134 12.7045 5.97129C12.9155 5.76125 13.202 5.6427 13.5007 5.6427H29.2493C29.548 5.6427 29.8345 5.76125 30.0455 5.97129C30.2565 6.18134 30.375 6.46783 30.375 6.7665V29.2335C30.375 29.5322 30.2565 29.8187 30.0455 30.0287C29.8345 30.2388 29.548 30.3573 29.2493 30.3573H13.5007C13.202 30.3573 12.9155 30.2388 12.7045 30.0287C12.4935 29.8187 12.375 29.5322 12.375 29.2335V25.875H10.125V29.2335C10.125 30.1292 10.4642 30.988 11.1049 31.6287C11.7456 32.2694 12.6044 32.625 13.5 32.625H29.25C30.1456 32.625 31.0044 32.2694 31.6451 31.6287C32.2858 30.988 32.625 30.1292 32.625 29.2335V6.7665C32.625 5.8708 32.2858 5.012 31.6451 4.37129C31.0044 3.73058 30.1456 3.375 29.25 3.375H13.5Z"
                        className="fill-[#898686] group-hover:fill-[#4a4a4a]"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.375 18C3.375 17.7016 3.49353 17.4155 3.70451 17.2045C3.91549 16.9935 4.20163 16.875 4.5 16.875H19.6275L16.1887 13.4363C15.9777 13.2253 15.8592 12.9391 15.8592 12.6407C15.8592 12.3424 15.9777 12.0562 16.1887 11.8452C16.3997 11.6342 16.6859 11.5157 16.9843 11.5157C17.2826 11.5157 17.5688 11.6342 17.7798 11.8452L23.2798 17.3452C23.4908 17.5562 23.6093 17.8424 23.6093 18.1407C23.6093 18.4391 23.4908 18.7253 23.2798 18.9363L17.7798 24.4363C17.5688 24.6473 17.2826 24.7658 16.9843 24.7658C16.6859 24.7658 16.3997 24.6473 16.1887 24.4363C15.9777 24.2253 15.8592 23.9391 15.8592 23.6407C15.8592 23.3424 15.9777 23.0562 16.1887 22.8452L19.6275 19.4065H4.5C4.20163 19.4065 3.91549 19.288 3.70451 19.077C3.49353 18.866 3.375 18.5799 3.375 18.2815V18Z"
                        className="fill-[#898686] group-hover:fill-[#4a4a4a]"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {!isSmallScreen && (
          <div className="flex flex-col">
            <div className="flex lg:gap-[40px] cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
                    {user?.first_name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    Hello {user?.first_name || "User"}
                  </span>
                </div>
              </div>

              <button onClick={handleLogout}>
                <div className="items-center gap-1 flex flex-col hover:scale-110 transition duration-100 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-[20px] sm:h-[20px] lg:w-[26px] lg:h-[26px]"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.5 3.375C12.6044 3.375 11.7456 3.73058 11.1049 4.37129C10.4642 5.012 10.125 5.8708 10.125 6.7665V10.125H12.375V6.7665C12.375 6.46783 12.4935 6.18134 12.7045 5.97129C12.9155 5.76125 13.202 5.6427 13.5007 5.6427H29.2493C29.548 5.6427 29.8345 5.76125 30.0455 5.97129C30.2565 6.18134 30.375 6.46783 30.375 6.7665V29.2335C30.375 29.5322 30.2565 29.8187 30.0455 30.0287C29.8345 30.2388 29.548 30.3573 29.2493 30.3573H13.5007C13.202 30.3573 12.9155 30.2388 12.7045 30.0287C12.4935 29.8187 12.375 29.5322 12.375 29.2335V25.875H10.125V29.2335C10.125 30.1292 10.4642 30.988 11.1049 31.6287C11.7456 32.2694 12.6044 32.625 13.5 32.625H29.25C30.1456 32.625 31.0044 32.2694 31.6451 31.6287C32.2858 30.988 32.625 30.1292 32.625 29.2335V6.7665C32.625 5.8708 32.2858 5.012 31.6451 4.37129C31.0044 3.73058 30.1456 3.375 29.25 3.375H13.5Z"
                      className="fill-[#898686] group-hover:fill-[#4a4a4a]"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.375 18C3.375 17.7016 3.49353 17.4155 3.70451 17.2045C3.91549 16.9935 4.20163 16.875 4.5 16.875H19.6275L16.1887 13.4363C15.9777 13.2253 15.8592 12.9391 15.8592 12.6407C15.8592 12.3424 15.9777 12.0562 16.1887 11.8452C16.3997 11.6342 16.6859 11.5157 16.9843 11.5157C17.2826 11.5157 17.5688 11.6342 17.7798 11.8452L23.2798 17.3452C23.4908 17.5562 23.6093 17.8424 23.6093 18.1407C23.6093 18.4391 23.4908 18.7253 23.2798 18.9363L17.7798 24.4363C17.5688 24.6473 17.2826 24.7658 16.9843 24.7658C16.6859 24.7658 16.3997 24.6473 16.1887 24.4363C15.9777 24.2253 15.8592 23.9391 15.8592 23.6407C15.8592 23.3424 15.9777 23.0562 16.1887 22.8452L19.6275 19.4065H4.5C4.20163 19.4065 3.91549 19.288 3.70451 19.077C3.49353 18.866 3.375 18.5799 3.375 18.2815V18Z"
                      className="fill-[#898686] group-hover:fill-[#4a4a4a]"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
