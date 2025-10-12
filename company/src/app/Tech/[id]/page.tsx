"use client";

import { useAuth } from "@/app/hooks/Auth/useAuth";
import useDeleteBoard from "@/app/hooks/Board/UseDeleteBoard";
import { useGetBoardById } from "@/app/hooks/Board/useGetBoard";
import { formatToKoreanDate } from "@/app/utils/CalculateTime";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DetailPage() {
  const [isAouther, setIsAouther] = useState(false);

  const path = usePathname();
  const router = useRouter();
  const id = Number(path.split("/").pop() || "");

  const { data: board, isLoading, error } = useGetBoardById(id);
  const { mutate: deleteMutate } = useDeleteBoard();

  console.log(board);
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    if (user && user.id === board?.aouther) {
      setIsAouther(true);
    } else {
      setIsAouther(false);
    }
  }, [user, board]);

  const handleEdit = () => {
    router.push(`/Tech/write?edit=${id}`);
  };

  const handleDelete = async () => {
    deleteMutate(id);
  };

  if (isLoading) {
    return (
      <section className="w-full h-auto flex flex-col items-center justify-center px-[12px] mb-[20px]">
        <div className="w-full min-h-[570px] border border-[#e3e3e3] shadow-lg flex flex-col items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (error || !board) {
    return (
      <section className="w-full h-auto flex flex-col items-center justify-center px-[12px] mb-[20px]">
        <div className="w-full min-h-[570px] border border-[#e3e3e3] shadow-lg flex flex-col items-center justify-center">
          <p className="text-red-500">게시글을 불러올 수 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center px-[12px] mb-[20px]">
      <div className="w-full min-h-[570px] border border-[#e3e3e3] shadow-lg flex flex-col items-center justify-start px-[20px] py-[20px]">
        {/* 🔥 헤더를 반응형으로 수정 + 수정 버튼 추가 */}
        <div className="w-full min-h-[48px] flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e3e3e3] pb-4 sm:pb-0">
          <h1 className="text-lg sm:text-xl font-semibold break-words mb-2 sm:mb-0 sm:mr-4 flex-1 min-w-0">
            {board.title}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm whitespace-nowrap">
              {formatToKoreanDate(board.created_at)}
            </p>
          </div>
        </div>

        <div className="w-full mt-6">
          {board.img_url &&
            Array.isArray(board.img_url) &&
            board.img_url.length > 0 && (
              <div className="mb-6 space-y-4">
                {board.img_url.map((imageUrl, index) => {
                  if (
                    !imageUrl ||
                    typeof imageUrl !== "string" ||
                    imageUrl.trim() === ""
                  ) {
                    return null;
                  }

                  if (!imageUrl.startsWith("http")) {
                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-100 rounded border"
                      >
                        <p className="text-gray-600 text-sm break-all">
                          첨부 파일: {imageUrl}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="relative w-full">
                      <Image
                        src={imageUrl}
                        alt={`Board Image ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-contain rounded-lg shadow-sm"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

          <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed break-words">
            {board.content}
          </div>
        </div>
      </div>

      {isAouther && (
        <div className="w-full flex gap-4 mt-6 px-[12px]">
          <button
            onClick={handleDelete}
            type="button"
            className="flex-1 py-3 px-6 border border-red-300 text-red-700 rounded hover:bg-red-50 transition-colors"
          >
            삭제
          </button>
          <button
            onClick={handleEdit}
            type="button"
            className="flex-1 py-3 px-6 bg-[#2565ae] text-white rounded hover:bg-[#1b4a86] transition-colors"
          >
            수정
          </button>
        </div>
      )}
    </section>
  );
}
