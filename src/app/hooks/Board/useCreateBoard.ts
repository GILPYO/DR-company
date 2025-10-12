"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createBoard } from "@/app/service/board/CreateBoard";

const useCreateBoard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      Swal.fire("게시글 작성 완료");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.push("/Tech");
    },
    onError: (error) => {
      Swal.fire("게시글 작성 실패");
    },
  });
};

export default useCreateBoard;
