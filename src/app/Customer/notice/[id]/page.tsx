"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { formatToKoreanDate } from "@/app/utils/CalculateTime";
import { useAuth } from "@/app/hooks/Auth/useAuth";
import {
  useGetNoticeById,
  useDeleteNotice,
} from "@/app/hooks/Customer/useNotice";
import Swal from "sweetalert2";

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const id = Number(params.id);

  const { data: notice, isLoading, error } = useGetNoticeById(id);
  const { mutate: deleteNotice, isPending: isDeleting } = useDeleteNotice();

  const handleEdit = () => {
    router.push(`/Customer/notice/write?edit=${id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 게시글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      deleteNotice(id);
    }
  };

  const handleBackToList = () => {
    router.push("/Customer/notice");
  };

  if (isLoading) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
          <Image
            src={"/CustomerBanner.png"}
            alt="Customer Service"
            fill
            className="object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600]">
            공지사항
          </p>
        </div>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (error || !notice) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
          <Image
            src={"/CustomerBanner.png"}
            alt="Customer Service"
            fill
            className="object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600]">
            공지사항
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-red-500 mb-4">게시글을 찾을 수 없습니다.</p>
          <button
            onClick={handleBackToList}
            className="px-4 py-2 bg-[#2565ae] text-white rounded hover:bg-[#1b4a86] transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
      <div className="relative w-full h-[200px] md:h-[250px] flex items-center justify-center">
        <Image
          src={"/CustomerBanner.png"}
          alt="Customer Service"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600]">
          공지사항
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-[20px] mt-[40px]">
        {/* 게시글 컨테이너 */}
        <div className="w-full min-h-[570px] border border-[#e3e3e3] shadow-lg flex flex-col items-center justify-start px-[20px] py-[20px]">
          {/* 게시글 헤더 */}
          <div className="w-full min-h-[48px] flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e3e3e3] pb-4 sm:pb-0">
            <h1 className="text-lg sm:text-xl font-semibold break-words mb-2 sm:mb-0 sm:mr-4 flex-1 min-w-0">
              {notice.title}
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 text-sm whitespace-nowrap">
                {formatToKoreanDate(notice.created_at)}
              </p>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="w-full mt-6">
            {/* 🔥 Tech 게시판과 동일한 이미지 처리 */}
            {notice.img_url &&
              Array.isArray(notice.img_url) &&
              notice.img_url.length > 0 && (
                <div className="mb-6 space-y-4">
                  {notice.img_url.map((imageUrl, index) => {
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
                          alt={`Notice Image ${index + 1}`}
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
              {notice.content}
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="w-full flex justify-between items-center mt-6">
          <button
            onClick={handleBackToList}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            목록
          </button>

          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 border border-red-300 text-red-700 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-[#2565ae] text-white rounded hover:bg-[#1b4a86] transition-colors"
              >
                수정
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
