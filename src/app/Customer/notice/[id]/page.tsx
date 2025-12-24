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

// 파일 타입 확인 헬퍼 함수
const getFileType = (url: string): "image" | "pdf" | "other" => {
  if (!url || typeof url !== "string") return "other";

  // URL 파라미터 제거 (예: ?filename=...)
  const urlWithoutParams = url.split("?")[0];
  const lowerUrl = urlWithoutParams.toLowerCase();

  // 확장자 추출
  const extension = lowerUrl.split(".").pop();

  if (
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(
      extension || ""
    )
  ) {
    return "image";
  }
  if (extension === "pdf") {
    return "pdf";
  }
  return "other";
};

// 파일명 추출 헬퍼 함수
const getFileName = (url: string): string => {
  try {
    // URL 파라미터에서 원본 파일명 추출 시도
    const urlObj = new URL(url);
    const filenameParam = urlObj.searchParams.get("filename");
    if (filenameParam) {
      return decodeURIComponent(filenameParam);
    }

    // 파라미터가 없으면 URL에서 파일명 추출
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1].split("?")[0];
    return decodeURIComponent(fileName);
  } catch {
    // URL 파싱 실패 시 간단한 방법으로 시도
    try {
      const urlMatch = url.match(/filename=([^&]+)/);
      if (urlMatch) {
        return decodeURIComponent(urlMatch[1]);
      }
    } catch {
      // 최후의 수단
    }
    return "파일";
  }
};

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAdmin } = useAuth();
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
            src={"/CustomerPc.jpg"}
            alt="Customer Service"
            fill
            className="object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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
            src={"/CustomerPc.jpg"}
            alt="Customer Service"
            fill
            className="object-cover"
          />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
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
          src={"/CustomerPc.jpg"}
          alt="Customer Service"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          공지사항
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-[20px] mt-[40px]">
        {/* 게시글 컨테이너 */}
        <div className="w-full min-h-[570px] border border-[#e3e3e3] shadow-lg flex flex-col items-center justify-start px-[20px] py-[20px] relative">
          {/* PDF 다운로드 영역 - 오른쪽 상단 */}
          {notice.img_url &&
            Array.isArray(notice.img_url) &&
            notice.img_url.filter(
              (url) =>
                url &&
                typeof url === "string" &&
                url.startsWith("http") &&
                getFileType(url) === "pdf"
            ).length > 0 && (
              <div className="absolute top-[20px] right-[20px] flex flex-col gap-2 z-10">
                {notice.img_url
                  .filter(
                    (url) =>
                      url &&
                      typeof url === "string" &&
                      url.startsWith("http") &&
                      getFileType(url) === "pdf"
                  )
                  .map((fileUrl, index) => {
                    const fileName = getFileName(fileUrl);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          // URL 파라미터 제거한 실제 파일 URL
                          const actualFileUrl = fileUrl.split("?")[0];
                          const link = document.createElement("a");
                          link.href = actualFileUrl;
                          link.download = fileName;
                          link.target = "_blank";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-300 shadow-sm hover:shadow-md"
                        title={fileName}
                      >
                        <svg
                          className="w-5 h-5 text-red-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="max-w-[150px] md:max-w-[200px] truncate">
                          {fileName}
                        </span>
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    );
                  })}
              </div>
            )}

          {/* 게시글 헤더 */}
          <div className="w-full min-h-[48px] flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e3e3e3] pb-4 sm:pb-0">
            <h1 className="text-lg sm:text-xl font-semibold break-words mb-2 sm:mb-0 sm:mr-4 flex-1 min-w-0 pr-[180px] sm:pr-0">
              {notice.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-gray-600 text-sm whitespace-nowrap">
                {formatToKoreanDate(notice.created_at)}
              </p>
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="w-full mt-6">
            {/* 이미지만 본문에 표시 */}
            {notice.img_url &&
              Array.isArray(notice.img_url) &&
              notice.img_url.filter(
                (url) =>
                  url &&
                  typeof url === "string" &&
                  url.startsWith("http") &&
                  getFileType(url) === "image"
              ).length > 0 && (
                <div className="mb-6 space-y-4">
                  {notice.img_url
                    .filter(
                      (url) =>
                        url &&
                        typeof url === "string" &&
                        url.startsWith("http") &&
                        getFileType(url) === "image"
                    )
                    .map((imageUrl, index) => {
                      // URL 파라미터 제거한 실제 파일 URL
                      const actualFileUrl = imageUrl.split("?")[0];
                      return (
                        <div key={index} className="relative w-full">
                          <Image
                            src={actualFileUrl}
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
