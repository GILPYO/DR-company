import { supabase } from "@/app/lib/supabaseClient";

export interface BoardPost {
  id: number;
  aouther: string;
  title: string;
  content: string;
  img_url: string[];
  created_at: string;
}

export interface PaginatedBoards {
  data: BoardPost[];
  count: number;
  totalPages: number;
  currentPage: number;
}

// 🔥 페이지네이션된 게시글 가져오기
export const getBoardsWithPagination = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedBoards> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 전체 개수 가져오기
  const { count } = await supabase
    .from("board")
    .select("*", { count: "exact", head: true });

  // 페이지네이션된 데이터 가져오기
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  return {
    data: data || [],
    count: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  };
};

// 기존 함수들 유지
export const getAllBoards = async (): Promise<BoardPost[]> => {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const getBoardById = async (id: number): Promise<BoardPost> => {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserName = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("username 조회 실패:", error);
    return "알 수 없음";
  }

  return data?.username || "알 수 없음";
};
