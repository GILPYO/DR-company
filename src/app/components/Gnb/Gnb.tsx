"use client";

import Image from "next/image";
import { useState } from "react";
import OpenMenu from "./OpenMenu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/Auth/useAuth";
import useSignOut from "@/app/hooks/Auth/useSignOut";
import { cn } from "@/app/lib/utils";

// 메뉴 데이터
const MENU_VALUE = [
  {
    title: "회사소개",
    value: [
      { name: "인사말", url: "/Introduce" },
      { name: "연혁", url: "/Introduce?tab=history" },
      { name: "조직도", url: "/Introduce?tab=organization" },
      { name: "오시는 길", url: "/Introduce?tab=location" },
    ],
  },
  {
    title: "제품소개",
    value: [
      {
        name: "콘덴싱",
        url: "/Products?category=condensing&subcategory=basicWindPressure",
      },
      {
        name: "일반",
        url: "/Products?category=general&subcategory=basicWindPressure",
      },
      { name: "단품", url: "/Products?category=parts&subcategory=extension" },
      {
        name: "수출용",
        url: "/Products?category=export&subcategory=kazakhstanS",
      },
      { name: "기타", url: "/Products?category=etc&subcategory=cascade" },
    ],
  },
  {
    title: "기술현황",
    value: [{ name: "인증서", url: "/Tech" }],
  },
  {
    title: "고객센터",
    value: [
      { name: "공지사항", url: "/Customer/notice" },
      { name: "질의응답", url: "/Customer/qna" },
    ],
  },
];

export default function Gnb() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      {/* 상단 파란 바 (PC만) */}
      <div
        className={cn(
          "mobile:hidden tablet:hidden",
          "pc:block pc:w-full pc:h-[4px] pc:bg-[#2565AE]"
        )}
      />

      <div
        className={cn(
          "sticky top-0 z-50 w-full flex justify-between items-center bg-[#ffffff]",
          "mobile:h-[120px] mobile:px-[20px]",
          "tablet:h-[120px] tablet:px-[20px]",
          "pc:h-[80px] pc:px-[40px]"
        )}
      >
        {/* 모바일/태블릿: 햄버거 메뉴 */}
        <div
          className={cn(
            "mobile:w-[118px] mobile:flex mobile:justify-start",
            "tablet:w-[118px] tablet:flex tablet:justify-start",
            "pc:hidden"
          )}
        >
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

        {/* 로고 - 모바일/태블릿: 중앙, PC: 왼쪽 */}
        <div
          onClick={() => router.push("/")}
          className={cn(
            "flex-1 flex justify-center cursor-pointer",
            "mobile:flex-1",
            "tablet:flex-1",
            "pc:flex-none pc:justify-start"
          )}
        >
          <Image src={"/Logo.png"} alt="Logo" width={68} height={68} />
        </div>

        {/* PC: 네비게이션 메뉴 */}
        <nav
          className={cn(
            "mobile:hidden tablet:hidden",
            "pc:flex pc:items-center pc:gap-8 pc:flex-1 pc:justify-center"
          )}
        >
          {MENU_VALUE.map((menu, index) => (
            <div
              key={menu.title}
              className={cn("pc:relative")}
              onMouseEnter={() => setHoveredMenuIndex(index)}
              onMouseLeave={() => setHoveredMenuIndex(null)}
            >
              <button
                className={cn(
                  "pc:text-[16px] pc:font-medium pc:text-[#121212] pc:py-2 pc:px-1",
                  "pc:hover:text-[#2565AE] pc:transition-colors",
                  hoveredMenuIndex === index && "pc:text-[#2565AE]"
                )}
              >
                {menu.title}
              </button>

              {/* 드롭다운 메뉴 */}
              {hoveredMenuIndex === index && (
                <div
                  className={cn(
                    "pc:absolute pc:top-full pc:left-1/2 pc:-translate-x-1/2 pc:pt-2",
                    "pc:bg-transparent"
                  )}
                  onMouseEnter={() => setHoveredMenuIndex(index)}
                  onMouseLeave={() => setHoveredMenuIndex(null)}
                >
                  <div
                    className={cn(
                      "pc:bg-white pc:shadow-lg pc:rounded-lg pc:py-4 pc:min-w-[200px]",
                      "pc:border pc:border-gray-100"
                    )}
                  >
                    <ul className={cn("pc:space-y-2")}>
                      {menu.value.map((subMenu) => (
                        <li key={subMenu.name}>
                          <button
                            onClick={() => {
                              router.push(subMenu.url);
                              setHoveredMenuIndex(null);
                            }}
                            className={cn(
                              "pc:w-full pc:text-left pc:px-4 pc:py-2 pc:text-[14px] pc:text-[#363636]",
                              "pc:hover:bg-gray-50 pc:hover:text-[#2565AE] pc:transition-colors"
                            )}
                          >
                            {subMenu.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 우측 유틸리티 메뉴 */}
        <div
          className={cn(
            "flex items-center justify-end gap-[10px]",
            "mobile:w-[118px]",
            "tablet:w-[118px]",
            "pc:w-auto"
          )}
        >
          {loading ? (
            <div className={cn("text-[14px] text-[#888888]")}>로딩중...</div>
          ) : isAuthenticated ? (
            <>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={cn(
                  "text-[14px] text-[#888888] hover:text-[#2565ae] disabled:opacity-50"
                )}
              >
                {isSigningOut ? "..." : "로그아웃"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/Signup")}
                className={cn(
                  "text-[14px] text-[#888888] hover:text-[#2565ae] whitespace-nowrap"
                )}
              >
                회원가입
              </button>
              <div className={cn("h-[16px] border border-[#888888]")}></div>
              <button
                onClick={() => router.push("/Login")}
                className={cn(
                  "text-[14px] text-[#888888] hover:text-[#2565ae] whitespace-nowrap"
                )}
              >
                로그인
              </button>
            </>
          )}
        </div>

        {/* 모바일/태블릿: 햄버거 메뉴 오버레이 */}
        {isOpen && <OpenMenu toggleMenu={toggleMenu} isOpen={isOpen} />}
      </div>
    </>
  );
}
