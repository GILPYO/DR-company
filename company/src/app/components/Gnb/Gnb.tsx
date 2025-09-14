"use client";

import Image from "next/image";
import { useState } from "react";
import OpenMenu from "./OpenMenu";
import { useRouter } from "next/navigation";

export default function Gnb() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-[120px] flex justify-between items-center px-[20px]">
      <div className="w-[118px] flex justify-start">
        {isOpen ? (
          <div onClick={toggleMenu}>
            <svg
              width="40.75"
              height="40.75"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39.75"
                height="39.75"
                stroke="#121212"
              />
              <path
                d="M12.7627 28.3503L28.7136 12.3994"
                stroke="#121212"
                strokeWidth="2"
              />
              <path
                d="M13 12.9998L28.9509 28.9507"
                stroke="#121212"
                strokeWidth="2"
              />
            </svg>
          </div>
        ) : (
          <div onClick={toggleMenu}>
            <svg
              width="40.75"
              height="40.75"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39.75"
                height="39.75"
                stroke="#121212"
              />
              <path
                d="M9.45898 11.6428H32.017"
                stroke="#121212"
                strokeWidth="2"
              />
              <path
                d="M9.45898 20.375H32.017"
                stroke="#121212"
                strokeWidth="2"
              />
              <path
                d="M9.45898 29.1072H32.017"
                stroke="#121212"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        <Image src={"/logo.png"} alt="Logo" width={68} height={68} />
      </div>
      <div className="min-w-[94px] h-[19px] flex items-center justify-end gap-[10px]">
        <button
          onClick={() => router.push("/Signup")}
          type="button"
          className="text-[14px] leading-[12px] text-[#888888]"
        >
          회원가입
        </button>
        <div className="h-[16px] border border-[#888888]"></div>
        <button
          onClick={() => router.push("/Login")}
          type="button"
          className="text-[14px] leading-[12px] text-[#888888]"
        >
          로그인
        </button>
      </div>
      {isOpen && <OpenMenu toggleMenu={toggleMenu} isOpen={isOpen} />}
    </div>
  );
}
