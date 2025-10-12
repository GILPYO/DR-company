"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MenuProps {
  toggleMenu: () => void;
  isOpen: boolean;
}

export default function OpenMenu({ toggleMenu, isOpen }: MenuProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleDropdownToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // 🔥 서브메뉴 클릭 시 페이지 이동
  const handleSubMenuClick = (url: string) => {
    router.push(url);
    toggleMenu(); // 메뉴 닫기
  };

  // 🔥 메인 메뉴 클릭 시 첫 번째 서브메뉴로 이동 (옵션)
  const handleMainMenuClick = (index: number, e: React.MouseEvent) => {
    const menu = MENU_VALUE[index];

    // 서브메뉴가 1개인 경우 바로 이동
    if (menu.value.length === 1) {
      handleSubMenuClick(menu.value[0].url);
      return;
    }

    // 여러 개인 경우 드롭다운 토글
    handleDropdownToggle(index, e);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute inset-0" onClick={toggleMenu}>
          <div
            className="absolute top-[120px] left-0 w-full h-[calc(100vh-120px)] bg-[#1B3156F2] opacity-95 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="text-white p-4 space-y-4">
              {MENU_VALUE.map((menu, index) => (
                <li key={menu.title}>
                  <div
                    onClick={(e) => handleMainMenuClick(index, e)}
                    className="font-bold cursor-pointer py-[10px] pl-[10px] border-b border-[#eeeeee] hover:text-gray-300 transition-colors"
                  >
                    {menu.title}
                  </div>
                  {openMenuIndex === index && (
                    <ul className="flex flex-col mt-[15px] gap-[15px] pl-[10px]">
                      {menu.value.map((subMenu) => (
                        <li
                          key={subMenu.name}
                          onClick={() => handleSubMenuClick(subMenu.url)}
                          className="font-normal cursor-pointer hover:text-gray-300 transition-colors"
                        >
                          {subMenu.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

// 🔥 URL 정보가 포함된 메뉴 데이터
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
    value: [
      { name: "인증서", url: "/Tech" }, // 🔥 기술현황 페이지로 연결
    ],
  },
  {
    title: "고객센터",
    value: [
      { name: "고객센터", url: "/Customer" },
      { name: "질의응답", url: "/Customer" },
    ],
  },
];
