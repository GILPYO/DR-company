"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { INTRODUCE_TABS } from "@/constants/constant";
import { CompanyIntro } from "./components/CompanyIntro";
import { CompanyHistory } from "./components/CompanyHistory";
import { CompanyOrganization } from "./components/CompanyOrganization";
import { CompanyLocation } from "./components/CompanyLocation";

function IntroduceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "intro";
  const [activeTab, setActiveTab] = useState(tab);

  // URL 파라미터 변경 감지
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/Introduce?tab=${tabId}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "intro":
        return <CompanyIntro />;
      case "history":
        return <CompanyHistory />;
      case "organization":
        return <CompanyOrganization />;
      case "location":
        return <CompanyLocation />;
      default:
        return <CompanyIntro />;
    }
  };

  return (
    <section className="w-full h-auto flex flex-col justify-center items-center ">
      <div className="relative w-full h-[250px] flex items-center justify-center">
        <Image
          src={"/Introduceimage.jpg"}
          alt="Introduce"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[30px] font-[600]">
          회사소개
        </p>
      </div>
      <div className="w-full h-[50px] flex justify-center items-center gap-[24px]">
        {INTRODUCE_TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`text-[16px] py-[10px] font-bold transition-colors relative ${
              activeTab === item.id
                ? "text-[#2565ae]"
                : "text-[#666] hover:text-[#333]"
            }`}
          >
            {item.label}
            {/* 활성 탭 밑줄 */}
            {activeTab === item.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2565ae]" />
            )}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </section>
  );
}

export default function IntroducePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          로딩 중...
        </div>
      }
    >
      <IntroduceContent />
    </Suspense>
  );
}
