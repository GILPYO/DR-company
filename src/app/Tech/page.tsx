// tech/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatToKoreanDate } from "../utils/CalculateTime";
import UserNameDisplay from "../components/UserNameDisplay";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/Auth/useAuth";
import {
  getBoardsWithPagination,
  PaginatedBoards,
} from "../service/board/GetBoard";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isAdmin } = useAuth();
  const POSTS_PER_PAGE = 10; // 페이지당 게시물 수

  const {
    data: boardsData,
    isLoading,
    error,
  } = useQuery<PaginatedBoards>({
    queryKey: ["boards", currentPage],
    queryFn: () => getBoardsWithPagination(currentPage, POSTS_PER_PAGE),
    staleTime: 5 * 60 * 1000, // 5분
  });

  const handleWrite = async () => {
    if (!user) {
      Swal.fire("로그인이 필요한 서비스입니다.");
      router.push("/Login");
      return;
    }

    if (!isAdmin) {
      Swal.fire("관리자만 글 작성이 가능합니다.");
      return;
    }

    router.push("/Tech/write");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 변경 시 맨 위로
  };

  if (isLoading) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
          <Image
            src={"/TechNowPc.jpg"}
            alt="Products"
            fill
            className="object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            기술현황
          </p>
        </div>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <div className="flex items-center justify-center py-20">
          <p className="text-red-500">데이터를 불러올 수 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
      <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
        <Image
          src={"/TechNowPc.jpg"}
          alt="Products"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          기술현황
        </p>
      </div>

      <div className="w-full border-b overflow-x-auto">
        <div className="flex justify-center items-center gap-[16px] md:gap-[24px] min-w-max px-4">
          <button className="text-[14px] text-[#2565ae] md:text-[16px] py-[10px] px-[8px] font-bold transition-colors relative whitespace-nowrap">
            인증서
          </button>
        </div>
      </div>

      {/* 🔥 총 게시물 수와 글쓰기 버튼 */}
      <div className="w-full flex justify-between items-center px-[20px] mt-[20px] max-w-[1280px]">
        <p className="text-sm text-gray-600">
          총 {boardsData?.count || 0}개의 게시물
        </p>
        <button
          onClick={handleWrite}
          className="py-[10px] px-[14px] text-[14px] font-bold bg-[#2565ae] text-white rounded-md hover:bg-[#1b4a86] transition-colors whitespace-nowrap"
        >
          글 쓰기
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full px-[12px] mt-[15px] max-w-[1280px]">
        <table className="w-full">
          <thead className="w-full">
            <tr className="bg-[#2565ae] text-white w-full">
              <th className="py-2 px-2 text-center font-medium w-[10%]">NO</th>
              <th className="py-2 px-2 text-center font-medium w-[40%]">
                제목
              </th>
              <th className="py-2 px-2 text-center font-medium w-[30%]">
                날짜
              </th>
              <th className="py-2 px-2 text-center font-medium w-[20%]">
                작성자
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {boardsData?.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  게시물이 없습니다.
                </td>
              </tr>
            ) : (
              boardsData?.data.map((item, index) => {
                // 🔥 전체 번호 계산 (최신 글이 가장 큰 번호)
                const globalIndex =
                  boardsData.count -
                  ((currentPage - 1) * POSTS_PER_PAGE + index);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push(`/Tech/${item.id}`)}
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
                    <td className="py-2 px-2 text-center">
                      <div className="truncate max-w-[80px] mx-auto">
                        <UserNameDisplay userId={item.aouther} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 페이지네이션 추가 */}
      {boardsData && boardsData.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={boardsData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
