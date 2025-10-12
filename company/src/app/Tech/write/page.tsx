"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useCreateBoard from "@/app/hooks/Board/useCreateBoard";
import useUpdateBoard from "@/app/hooks/Board/useEditBoard";
import { NewBoardPost } from "@/app/service/board/CreateBoard";
import { supabase } from "@/app/lib/supabaseClient";

type BoardData = {
  title: string;
  content: string;
  aouther?: string;
  img_url?: string[];
};

export default function WritePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEdit = !!editId;

  const { register, handleSubmit, setValue, reset } = useForm<BoardData>();
  const router = useRouter();
  const { mutate: createMutate, isPending: isCreating } = useCreateBoard();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateBoard();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔥 직접 수정 데이터 가져오기
  useEffect(() => {
    if (isEdit && editId) {
      const fetchEditData = async () => {
        setIsLoadingEdit(true);
        try {
          const { data, error } = await supabase
            .from("board")
            .select("*")
            .eq("id", Number(editId))
            .single();

          if (error) {
            console.error("게시글 불러오기 실패:", error);
            alert("게시글을 불러올 수 없습니다.");
            router.push("/tech");
            return;
          }

          setEditData(data);
          console.log("수정 데이터 로드:", data);
        } catch (error) {
          console.error("에러:", error);
          alert("게시글을 불러올 수 없습니다.");
          router.push("/tech");
        } finally {
          setIsLoadingEdit(false);
        }
      };

      fetchEditData();
    }
  }, [isEdit, editId, router]);

  // 수정 모드일 때 폼에 데이터 채우기
  useEffect(() => {
    if (isEdit && editData) {
      reset({
        title: editData.title,
        content: editData.content,
        aouther: editData.aouther,
        img_url: editData.img_url || [],
      });
    }
  }, [isEdit, editData, reset]);

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
          const fileName = `board-img/${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from("manager-bucket")
            .upload(fileName, file);

          if (error) {
            console.error("업로드 에러:", error);
            throw error;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("manager-bucket").getPublicUrl(fileName);

          uploadedUrls.push(publicUrl);
        }

        setValue("img_url", uploadedUrls);
        console.log("업로드 성공:", uploadedUrls);
      } catch (error) {
        console.error("파일 업로드 실패:", error);
        alert("파일 업로드에 실패했습니다. 다시 시도해주세요.");

        const fileNames = fileArray.map((file) => file.name);
        setValue("img_url", fileNames);
      }
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
        setValue("aouther", user.id);
        console.log("현재 사용자:", user);

        // 🔥 수정 모드일 때 권한 체크 (데이터가 로드된 후에만)
        if (isEdit && editData) {
          if (editData.aouther !== user.id) {
            alert("작성자만 수정할 수 있습니다.");
            router.push("/tech");
            return;
          }
        }
      } else {
        router.push("/login");
      }
    };
    getCurrentUser();
  }, [setValue, router, isEdit, editData]);

  const onSubmit = (data: BoardData) => {
    console.log("폼 데이터:", data);
    console.log("수정 모드:", isEdit);

    if (currentUser) {
      if (isEdit) {
        // 수정 로직
        updateMutate({
          id: Number(editId),
          title: data.title,
          content: data.content,
          img_url: data.img_url || [],
        });
      } else {
        // 새 글 작성 로직
        const submitData: NewBoardPost = {
          title: data.title,
          content: data.content,
          aouther: currentUser,
          img_url: data.img_url || [],
        };
        createMutate(submitData);
      }
    }
  };

  const isPending = isCreating || isUpdating;

  // 🔥 로딩 조건 수정
  if (!currentUser) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <p className="text-gray-500">사용자 정보를 불러오는 중...</p>
      </section>
    );
  }

  // 🔥 수정 모드에서 데이터 로딩 중일 때
  if (isEdit && isLoadingEdit) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <p className="text-gray-500">게시글을 불러오는 중...</p>
      </section>
    );
  }

  // 🔥 수정 모드인데 데이터가 없을 때
  if (isEdit && !isLoadingEdit && !editData) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center mb-[20px]">
        <p className="text-red-500">게시글을 찾을 수 없습니다.</p>
        <button
          onClick={() => router.push("/tech")}
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
          src={"/techBanner.png"}
          alt="Products"
          fill
          className="object-cover"
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[24px] md:text-[30px] font-[600]">
          {isEdit ? "게시글 수정" : "기술현황"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto flex flex-col items-center justify-center px-[20px] mt-[40px]"
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
            onClick={() => router.back()}
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
