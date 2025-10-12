"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { PRODUCT_CATEGORIES, PRODUCT_MAIN_TABS } from "@/constants/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "condensing";
  const subcategory = searchParams.get("subcategory") || "";

  const [activeCategory, setActiveCategory] = useState(category);
  const [activeSubcategory, setActiveSubcategory] = useState(subcategory);

  // URL 파라미터 변경 감지
  useEffect(() => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
  }, [category, subcategory]);

  useEffect(() => {
    const currentCategory = PRODUCT_CATEGORIES[activeCategory];
    if (currentCategory && !activeSubcategory) {
      const firstSubcategory = Object.keys(currentCategory.subcategories)[0];
      if (firstSubcategory) {
        setActiveSubcategory(firstSubcategory);
        router.push(
          `/Products?category=${activeCategory}&subcategory=${firstSubcategory}`,
          { scroll: false }
        );
      }
    }
  }, [activeCategory, activeSubcategory, router]);

  const handleCategoryClick = (categoryId: string) => {
    const firstSubcategory = Object.keys(
      PRODUCT_CATEGORIES[categoryId]?.subcategories || {}
    )[0];
    setActiveCategory(categoryId);
    setActiveSubcategory(firstSubcategory || "");
    router.push(
      `/Products?category=${categoryId}&subcategory=${firstSubcategory || ""}`,
      { scroll: false }
    );
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    setActiveSubcategory(subcategoryId);
    router.push(
      `/Products?category=${activeCategory}&subcategory=${subcategoryId}`,
      { scroll: false }
    );
  };

  const currentCategory = PRODUCT_CATEGORIES[activeCategory];
  const currentSubcategory = currentCategory?.subcategories[activeSubcategory];

  return (
    <section className="w-full h-auto flex flex-col justify-center items-center">
      {/* 헤더 이미지 */}
      <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
        <Image
          src={"/Product-page.png"}
          alt="Products"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600]">
          제품소개
        </p>
      </div>

      {/* 메인 카테고리 탭 */}
      <div className="w-full h-[50px] border-b overflow-x-auto">
        <div className="flex justify-center items-center gap-[16px] md:gap-[24px] min-w-max px-4">
          {PRODUCT_MAIN_TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCategoryClick(item.id)}
              className={`text-[14px] md:text-[16px] py-[10px] px-[8px] font-bold transition-colors relative whitespace-nowrap ${
                activeCategory === item.id
                  ? "text-[#2565ae]"
                  : "text-[#666] hover:text-[#333]"
              }`}
            >
              {item.label}
              {activeCategory === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2565ae]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 서브 카테고리 탭 */}
      {currentCategory && (
        <div className="w-full min-h-[50px] bg-gray-50 border-b overflow-x-auto">
          <div className="flex justify-center items-center gap-[12px] md:gap-[16px] py-2 min-w-max px-4">
            {Object.values(currentCategory.subcategories).map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub.id)}
                className={`text-[12px] md:text-[14px] py-[6px] md:py-[8px] px-[12px] md:px-[16px] rounded transition-colors whitespace-nowrap ${
                  activeSubcategory === sub.id
                    ? "bg-[#2565ae] text-white"
                    : "bg-white text-[#666] hover:text-[#333] border border-gray-200"
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 제품 이미지 영역 */}
      <div className="w-full mx-auto px-4 py-4 md:py-8">
        {currentSubcategory ? (
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg border overflow-hidden w-full max-w-[350px] md:max-w-4xl">
              {/* imageDetails가 있는 경우 (부속품) */}
              {currentSubcategory.imageDetails ? (
                <div className="w-full">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    className="w-full aspect-[4/3] md:aspect-[3/2] pb-12" // 하단 여백 추가
                  >
                    {currentSubcategory.imageDetails.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 relative">
                          <div className="flex-1 flex items-center justify-center relative w-full">
                            <Image
                              src={item.src}
                              alt={item.name}
                              fill
                              className="object-contain p-4"
                            />
                          </div>
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full shadow-sm">
                            <p className="text-xs md:text-sm font-bold text-gray-800 text-center whitespace-nowrap">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                /* 단일 이미지인 경우 */
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] flex items-center justify-center bg-gray-50">
                  <Image
                    src={currentSubcategory.image!}
                    alt={currentSubcategory.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}

              <div className="p-3 md:p-4 text-center">
                <h3 className="text-sm md:text-lg font-medium text-gray-800">
                  {currentSubcategory.name}
                  {currentSubcategory.imageDetails && (
                    <span className="text-xs text-gray-500 ml-2">
                      ({currentSubcategory.imageDetails.length}개 제품)
                    </span>
                  )}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 md:py-20 text-gray-500 text-sm md:text-base">
            제품을 선택해주세요
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          로딩 중...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
