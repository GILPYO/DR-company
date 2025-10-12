// hooks/Customer/useNotice.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getNoticesWithPagination,
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from "@/app/service/Customer/NoticeService";
import Swal from "sweetalert2";

// 페이지네이션된 공지사항 목록 조회
export const useGetNoticesWithPagination = (
  page: number,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["notices", page],
    queryFn: () => getNoticesWithPagination(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};

// 모든 공지사항 조회
export const useGetAllNotices = () => {
  return useQuery({
    queryKey: ["notices"],
    queryFn: getAllNotices,
    staleTime: 5 * 60 * 1000,
  });
};

// 공지사항 상세 조회
export const useGetNoticeById = (id: number) => {
  return useQuery({
    queryKey: ["notice", id],
    queryFn: () => getNoticeById(id),
    enabled: id > 0,
  });
};

// 공지사항 생성
export const useCreateNotice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createNotice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });

      Swal.fire({
        title: "공지사항이 작성되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        router.push(`/Customer/notice/${data.id}`);
      });
    },
    onError: (error) => {
      console.error("공지사항 작성 실패:", error);
      Swal.fire({
        title: "작성 실패",
        text: "공지사항 작성에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};

// 공지사항 수정
export const useUpdateNotice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateNotice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      queryClient.invalidateQueries({ queryKey: ["notice", data.id] });

      Swal.fire({
        title: "공지사항이 수정되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        router.push(`/Customer/notice/${data.id}`);
      });
    },
    onError: (error) => {
      console.error("공지사항 수정 실패:", error);
      Swal.fire({
        title: "수정 실패",
        text: "공지사항 수정에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};

// 공지사항 삭제
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });

      Swal.fire({
        title: "삭제가 완료되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        router.push("/Customer/notice");
      });
    },
    onError: (error) => {
      console.error("공지사항 삭제 실패:", error);
      Swal.fire({
        title: "삭제 실패",
        text: "공지사항 삭제에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};
