"use client";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useAuth } from "@/app/hooks/Auth/useAuth";
import {
  useCreateNotice,
  useUpdateNotice,
} from "@/app/hooks/Customer/useNotice";
import Swal from "sweetalert2";

type FormData = {
  title: string;
  content: string;
  img_url?: string[];
};

function NoticeWriteContent() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEdit = !!editId;

  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const router = useRouter();
  const { user, isAdmin } = useAuth();

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
      reset({
        title: editData.title,
        content: editData.content,
        img_url: editData.img_url || [],
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
      setSelectedFiles(fileArray);

      try {
        const uploadedUrls: string[] = [];

        for (const file of fileArray) {
          const fileName = `notice-img/${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from("manager-bucket")
            .upload(fileName, file);

          if (error) throw error;

          const {
            data: { publicUrl },
          } = supabase.storage.from("manager-bucket").getPublicUrl(fileName);

          uploadedUrls.push(publicUrl);
        }

        setValue("img_url", uploadedUrls);
      } catch (error) {
        console.error("파일 업로드 실패:", error);
        Swal.fire("파일 업로드에 실패했습니다.");
      }
    }
  };

  const onSubmit = (data: FormData) => {
    if (!currentUser) return;

    if (isEdit) {
      updateNotice({
        id: Number(editId),
        title: data.title,
        content: data.content,
        img_url: data.img_url || [],
      });
    } else {
      createNotice({
        title: data.title,
        content: data.content,
        img_url: data.img_url || [],
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

        <div className="w-full flex items-center justify-center mt-2">
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
            accept="image/*"
          />
          <div className="w-full px-2 py-2 border h-[50px] flex items-center bg-white">
            <span
              className={
                selectedFiles.length > 0 ? "text-gray-900" : "text-gray-500"
              }
            >
              {selectedFiles.length > 0
                ? `${selectedFiles.length}개 파일 선택됨`
                : "선택된 파일이 없습니다"}
            </span>
          </div>
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
