// hooks/Board/DeleteBoard.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteBoard } from "@/app/service/board/DeleteBoard";
import Swal from "sweetalert2";

const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["boards"] });

      Swal.fire("삭제가 완료되었습니다.");
      router.push("/Tech");
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
      Swal.fire("게시글 삭제 실패");
    },
  });
};

export default useDeleteBoard;
