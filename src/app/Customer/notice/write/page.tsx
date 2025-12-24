"use client";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import {
  useCreateNotice,
  useUpdateNotice,
} from "@/app/hooks/Customer/useNotice";
import { NoticePost } from "@/app/service/Customer/NoticeService";
import Swal from "sweetalert2";

type FormData = {
  title: string;
  content: string;
  img_url?: string[];
};

function NoticeWriteContent() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]); // 업로드된 URL 상태 관리
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [editData, setEditData] = useState<NoticePost | null>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEdit = !!editId;

  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const router = useRouter();

  const { mutate: createNotice, isPending: isCreatingNotice } =
    useCreateNotice();
  const { mutate: updateNotice, isPending: isUpdatingNotice } =
    useUpdateNotice();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔥 수정 모드일 때 데이터 가져오기
  useEffect(() => {
    if (isEdit && editId) {
      const fetchEditData = async () => {
        setIsLoadingEdit(true);
        try {
          const { data, error } = await supabase
            .from("notice")
            .select("*")
            .eq("id", Number(editId))
            .single();

          if (error || !data) {
            Swal.fire("게시글을 찾을 수 없습니다.");
            router.push("/Customer/notice");
            return;
          }

          setEditData(data);
        } catch (error) {
          console.error("에러:", error);
          Swal.fire("게시글을 불러올 수 없습니다.");
          router.push("/Customer/notice");
        } finally {
          setIsLoadingEdit(false);
        }
      };

      fetchEditData();
    }
  }, [isEdit, editId, router]);

  // 폼에 데이터 채우기
  useEffect(() => {
    if (isEdit && editData) {
      const editImgUrl = editData.img_url || [];
      setUploadedUrls(editImgUrl);
      reset({
        title: editData.title,
        content: editData.content,
        img_url: editImgUrl,
      });
    }
  }, [isEdit, editData, reset]);

  // 🔥 사용자 인증만 체크 (권한 체크 제거)
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Swal.fire("로그인이 필요합니다.");
        router.push("/Login");
        return;
      }

      setCurrentUser(user.id);

      // 🔥 권한 체크 로직 제거 - 목록 페이지에서 이미 체크했으므로
    };

    getCurrentUser();
  }, [router]);

  const handleFileButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // 파일 유효성 검사
      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      for (const file of fileArray) {
        const isImage = file.type.startsWith("image/");
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");

        if (isImage || isPdf) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      }

      if (invalidFiles.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "지원하지 않는 파일 형식",
          text: `${invalidFiles.join(
            ", "
          )} 파일은 이미지 또는 PDF 파일만 업로드 가능합니다.`,
        });
      }

      if (validFiles.length === 0) {
        // 파일 입력 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      // 기존 선택된 파일과 새 파일 합치기
      setSelectedFiles((prev) => [...prev, ...validFiles]);

      try {
        const newUploadedUrls: string[] = [];

        for (const file of validFiles) {
          // 파일명에서 확장자 추출
          const fileExtension = file.name.split(".").pop() || "";
          // 안전한 파일명 생성 (한글 및 특수문자 제거)
          const safeFileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 15)}.${fileExtension}`;
          const fileName = `notice-img/${safeFileName}`;

          // PDF 파일의 경우 명시적으로 contentType 설정
          const isPdf =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");
          const contentType = isPdf
            ? "application/pdf"
            : file.type || "application/octet-stream";

          console.log(`파일 업로드 시작: ${file.name}, 타입: ${contentType}`);

          const { error } = await supabase.storage
            .from("manager-bucket")
            .upload(fileName, file, {
              contentType: contentType,
              upsert: false,
            });

          if (error) {
            console.error(`파일 업로드 에러 (${file.name}):`, error);
            throw new Error(`${file.name} 업로드 실패: ${error.message}`);
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("manager-bucket").getPublicUrl(fileName);

          // 원본 파일명을 URL 파라미터로 추가 (다운로드 시 사용)
          const urlWithFileName = `${publicUrl}?filename=${encodeURIComponent(
            file.name
          )}`;
          newUploadedUrls.push(urlWithFileName);

          console.log(`파일 업로드 성공: ${file.name} -> ${publicUrl}`);
        }

        // 상태와 폼 모두 업데이트
        setUploadedUrls((prev) => {
          const updatedUrls = [...prev, ...newUploadedUrls];
          setValue("img_url", updatedUrls);
          return updatedUrls;
        });

        Swal.fire({
          icon: "success",
          title: "업로드 완료",
          text: `${validFiles.length}개 파일이 업로드되었습니다.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error: unknown) {
        console.error("파일 업로드 실패:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "파일 업로드에 실패했습니다. 다시 시도해주세요.";
        Swal.fire({
          icon: "error",
          title: "파일 업로드 실패",
          text: errorMessage,
        });
        // 에러 발생 시 선택된 파일 목록도 롤백
        setSelectedFiles((prev) =>
          prev.slice(0, prev.length - validFiles.length)
        );
      }

      // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onSubmit = (data: FormData) => {
    if (!currentUser) return;

    // 상태에서 직접 가져오기 (가장 확실한 방법)
    const currentImgUrl =
      uploadedUrls.length > 0 ? uploadedUrls : data.img_url || [];

    if (isEdit) {
      updateNotice({
        id: Number(editId),
        title: data.title,
        content: data.content,
        img_url: currentImgUrl,
      });
    } else {
      createNotice({
        title: data.title,
        content: data.content,
        img_url: currentImgUrl,
      });
    }
  };

  const isPending = isCreatingNotice || isUpdatingNotice;

  // 로딩 상태
  if (!currentUser) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <p className="text-gray-500">사용자 정보를 불러오는 중...</p>
      </section>
    );
  }

  if (isEdit && isLoadingEdit) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <p className="text-gray-500">게시글을 불러오는 중...</p>
      </section>
    );
  }

  if (isEdit && !isLoadingEdit && !editData) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <p className="text-red-500">게시글을 찾을 수 없습니다.</p>
        <button
          onClick={() => router.push("/Customer/notice")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          목록으로 돌아가기
        </button>
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
          {isEdit ? "공지사항 수정" : "공지사항 작성"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto flex flex-col items-center justify-center px-[20px] mt-[40px] max-w-[1280px]"
      >
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-[12px]"
          placeholder="제목을 입력하세요"
          {...register("title", { required: "제목을 입력해주세요" })}
        />

        <textarea
          className="w-full h-[440px] border border-gray-300 rounded-md p-2"
          placeholder="내용을 입력하세요"
          {...register("content", { required: "내용을 입력해주세요" })}
        />

        <div className="w-full flex flex-col gap-2 mt-2">
          <div className="w-full flex items-center justify-center">
            <button
              onClick={handleFileButtonClick}
              type="button"
              className="min-w-[100px] text-center px-2 py-3 bg-[#f5f5f5] border hover:bg-gray-200 transition-colors"
            >
              파일 첨부
            </button>
            <input
              onChange={handleFileChange}
              ref={fileInputRef}
              multiple
              type="file"
              className="hidden"
              accept="image/*,.pdf,application/pdf"
            />
            <div className="w-full px-2 py-2 border h-[50px] flex items-center bg-white">
              <span
                className={
                  selectedFiles.length > 0 ? "text-gray-900" : "text-gray-500"
                }
              >
                {selectedFiles.length > 0
                  ? `${selectedFiles.length}개 파일 선택됨`
                  : "선택된 파일이 없습니다 (이미지 및 PDF 파일 가능)"}
              </span>
            </div>
          </div>
          {/* 선택된 파일 목록 표시 */}
          {selectedFiles.length > 0 && (
            <div className="w-full px-2 py-2 border bg-gray-50 rounded">
              <div className="flex flex-col gap-2">
                {selectedFiles.map((file, index) => {
                  const isPdf =
                    file.type === "application/pdf" ||
                    file.name.toLowerCase().endsWith(".pdf");
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      {isPdf ? (
                        <svg
                          className="w-4 h-4 text-red-600 flex-shrink-0"
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
                      ) : (
                        <svg
                          className="w-4 h-4 text-blue-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      <span className="truncate flex-1">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push("/Customer/notice")}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-3 px-6 bg-[#2565ae] text-white rounded hover:bg-[#1b4a86] transition-colors disabled:opacity-50"
          >
            {isPending
              ? isEdit
                ? "수정 중..."
                : "작성 중..."
              : isEdit
              ? "수정 완료"
              : "작성 완료"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function NoticeWritePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          로딩 중...
        </div>
      }
    >
      <NoticeWriteContent />
    </Suspense>
  );
}
