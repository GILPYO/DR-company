"use client";

import { getUserName } from "@/app/service/board/GetBoard";
import { useQuery } from "@tanstack/react-query";

export const useUserName = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserName(userId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });
};
