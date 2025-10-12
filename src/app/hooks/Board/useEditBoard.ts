"use client";

import { updateBoard, UpdateBoardPost } from "@/app/service/board/UpdateBoard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function useUpdateBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", data.id] });

      Swal.fire("게시글이 수정되었습니다.");
      router.push(`/Tech/${data.id}`);
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
      Swal.fire("게시글 수정에 실패했습니다.");
    },
  });
}
