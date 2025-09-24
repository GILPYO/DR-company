"use client";

import Image from "next/image";
import { useState } from "react";
import OpenMenu from "./OpenMenu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/Auth/useAuth";
import useSignOut from "@/app/hooks/Auth/useSignOut";

export default function Gnb() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="sticky top-0 z-50 w-full h-[120px] flex justify-between items-center px-[20px]">
      <div className="w-[118px] flex justify-start">
        {/* 기존 햄버거 메뉴 */}
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

      <div className="w-[118px] flex items-center justify-end gap-[10px]">
        {loading ? (
          <div className="text-[14px] text-[#888888]">로딩중...</div>
        ) : isAuthenticated ? (
          <>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="text-[14px] text-[#888888] hover:text-[#2565ae] disabled:opacity-50"
            >
              {isSigningOut ? "..." : "로그아웃"}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/Signup")}
              className="text-[14px] text-[#888888] hover:text-[#2565ae]"
            >
              회원가입
            </button>
            <div className="h-[16px] border border-[#888888]"></div>
            <button
              onClick={() => router.push("/Login")}
              className="text-[14px] text-[#888888] hover:text-[#2565ae]"
            >
              로그인
            </button>
          </>
        )}
      </div>

      {isOpen && <OpenMenu toggleMenu={toggleMenu} isOpen={isOpen} />}
    </div>
  );
}
