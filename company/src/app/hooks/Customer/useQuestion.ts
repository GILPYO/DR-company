// hooks/Customer/useQuestion.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getQuestionsWithPagination,
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  NewQuestionPost,
  UpdateQuestionPost,
} from "@/app/service/Customer/QuestionService";
import Swal from "sweetalert2";

// 페이지네이션된 Q&A 목록 조회
export const useGetQuestionsWithPagination = (
  page: number,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["questions", page],
    queryFn: () => getQuestionsWithPagination(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};

// 모든 Q&A 조회
export const useGetAllQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
    staleTime: 5 * 60 * 1000,
  });
};

// Q&A 상세 조회
export const useGetQuestionById = (id: number) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
    enabled: id > 0,
  });
};

// Q&A 생성
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      Swal.fire({
        title: "질문이 작성되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        router.push(`/customer/questions/${data.id}`);
      });
    },
    onError: (error) => {
      console.error("질문 작성 실패:", error);
      Swal.fire({
        title: "작성 실패",
        text: "질문 작성에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};

// Q&A 수정
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["question", data.id] });

      Swal.fire({
        title: "질문이 수정되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        router.push(`/customer/questions/${data.id}`);
      });
    },
    onError: (error) => {
      console.error("질문 수정 실패:", error);
      Swal.fire({
        title: "수정 실패",
        text: "질문 수정에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};

// Q&A 삭제
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });

      Swal.fire({
        title: "삭제가 완료되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        router.push("/customer/questions");
      });
    },
    onError: (error) => {
      console.error("질문 삭제 실패:", error);
      Swal.fire({
        title: "삭제 실패",
        text: "질문 삭제에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};
