"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllBoards, getBoardById } from "@/app/service/board/GetBoard";

export const useGetAllBoard = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getAllBoards,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export const useGetBoardById = (id: number) => {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardById(id),
    enabled: !!id, // id가 있을 때만 실행
    staleTime: 5 * 60 * 1000,
  });
};
