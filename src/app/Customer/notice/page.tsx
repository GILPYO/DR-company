"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatToKoreanDate } from "../../utils/CalculateTime";
import Pagination from "../../components/Pagination";
import { useAuth } from "../../hooks/Auth/useAuth";
import { useGetNoticesWithPagination } from "../../hooks/Customer/useNotice";
import Swal from "sweetalert2";

const CUSTOMER_TABS = [
  { id: "notice", label: "공지사항", href: "/Customer/notice" },
  { id: "qna", label: "질의응답", href: "/Customer/qna" },
] as const;

export default function NoticePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isAdmin } = useAuth(); // 🔥 Tech와 정확히 동일
  const POSTS_PER_PAGE = 10;

  const { data: noticesData, isLoading } = useGetNoticesWithPagination(
    currentPage,
    POSTS_PER_PAGE
  );

  const handleWrite = async () => {
    // 🔥 Tech와 정확히 동일한 로직
    if (!user) {
      Swal.fire("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!isAdmin) {
      Swal.fire("관리자만 공지사항을 작성할 수 있습니다.");
      return;
    }

    router.push("/Customer/notice/write");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowClick = (id: number) => {
    router.push(`/Customer/notice/${id}`);
  };

  if (isLoading) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center">
        <div className="relative w-full h-[250px] flex items-center justify-center">
          <Image
            src={"/CustomerPc.jpg"}
            alt="Customer Service"
            fill
            className="object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            고객센터
          </p>
        </div>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-auto flex flex-col justify-center items-center">
      {/* 헤더 이미지 */}
      <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
        <Image
          src={"/CustomerPc.jpg"}
          alt="Customer Service"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          고객센터
        </p>
      </div>

      {/* 메인 카테고리 탭 */}
      <div className="w-full h-[50px] border-b overflow-x-auto">
        <div className="flex justify-center items-center gap-[16px] md:gap-[24px] min-w-max px-4">
          {CUSTOMER_TABS.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`text-[14px] md:text-[16px] py-[10px] px-[8px] font-bold transition-colors relative whitespace-nowrap ${
                item.id === "notice"
                  ? "text-[#2565ae]"
                  : "text-[#666] hover:text-[#333]"
              }`}
            >
              {item.label}
              {item.id === "notice" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2565ae]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 총 게시물 수와 글쓰기 버튼 */}
      <div className="w-full flex justify-between items-center px-[20px] mt-[20px] max-w-[1280px]">
        <p className="text-sm text-gray-600">
          총 {noticesData?.count || 0}개의 게시물
        </p>
        {/* 🔥 Tech와 동일 - 항상 버튼 표시, 클릭할 때 권한 체크 */}
        <button
          onClick={handleWrite}
          className="py-[10px] px-[14px] text-[14px] font-bold bg-[#2565ae] text-white rounded-md hover:bg-[#1b4a86] transition-colors whitespace-nowrap"
        >
          글 쓰기
        </button>
      </div>

      {/* 게시판 테이블 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full px-[12px] mt-[15px] mb-[20px] max-w-[1280px]">
        <table className="w-full">
          <thead className="w-full">
            <tr className="bg-[#2565ae] text-white w-full">
              <th className="py-2 px-2 text-center font-medium w-[10%]">NO</th>
              <th className="py-2 px-2 text-center font-medium w-[50%]">
                제목
              </th>
              <th className="py-2 px-2 text-center font-medium w-[40%]">
                날짜
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {noticesData?.data.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
                  게시물이 없습니다.
                </td>
              </tr>
            ) : (
              noticesData?.data.map((item, index: number) => {
                const globalIndex =
                  noticesData.count -
                  ((currentPage - 1) * POSTS_PER_PAGE + index);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(item.id)}
                  >
                    <td className="py-2 px-2 text-center">{globalIndex}</td>
                    <td className="py-2 px-2 text-center">
                      <div
                        className="truncate max-w-[150px] md:max-w-[200px] mx-auto"
                        title={item.title}
                      >
                        {item.title}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <div className="truncate">
                        {formatToKoreanDate(item.created_at)}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {noticesData && noticesData.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={noticesData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
