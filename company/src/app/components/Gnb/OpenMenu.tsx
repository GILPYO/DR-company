"use client";
import { useState } from "react";

interface MenuProps {
  toggleMenu: () => void;
  isOpen: boolean;
}

export default function OpenMenu({ toggleMenu, isOpen }: MenuProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleDropdownToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute inset-0" onClick={toggleMenu}>
          <div
            className="absolute top-[120px] left-0 w-full h-[calc(100vh-120px)] bg-[#1B3156F2] opacity-95 z-50"
            onClick={(e) => e.stopPropagation()} // 메뉴 영역 클릭 시 닫히지 않도록
          >
            <ul className="text-white p-4 space-y-4">
              {MENU_VALUE.map((menu, index) => (
                <li key={menu.title}>
                  <div
                    onClick={(e) => handleDropdownToggle(index, e)}
                    className="font-bold cursor-pointer py-[10px] pl-[10px] border-b border-[#eeeeee]"
                  >
                    {menu.title}
                  </div>
                  {openMenuIndex === index && (
                    <ul className="flex flex-col mt-[15px] gap-[15px] pl-[10px]">
                      {menu.value.map((subMenu: string) => (
                        <li
                          key={subMenu}
                          className="font-normal cursor-pointer hover:text-gray-300"
                        >
                          {subMenu}
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

const MENU_VALUE = [
  { title: "회사소개", value: ["인사말", "조직도", "연혁", "오시는 길"] },
  { title: "제품소개", value: ["콘덴싱", "일반", "단품", "수출용", "기타"] },
  { title: "기술현황", value: ["인증서"] },
  { title: "고객센터", value: ["고객센터", "질의응답"] },
];
