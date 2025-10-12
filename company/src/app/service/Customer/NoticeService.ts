// service/customer/NoticeService.ts
import { supabase } from "@/app/lib/supabaseClient";

export interface NoticePost {
  id: number;
  title: string;
  content: string;
  img_url: string[];
  created_at: string;
}

export interface PaginatedNotices {
  data: NoticePost[];
  count: number;
  totalPages: number;
  currentPage: number;
}

// 페이지네이션된 공지사항 가져오기
export const getNoticesWithPagination = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedNotices> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { count } = await supabase
    .from("notice")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("notice")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    count: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  };
};

// 모든 공지사항 가져오기
export const getAllNotices = async (): Promise<NoticePost[]> => {
  const { data, error } = await supabase
    .from("notice")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

// 공지사항 상세 조회
export const getNoticeById = async (id: number): Promise<NoticePost> => {
  const { data, error } = await supabase
    .from("notice")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// 공지사항 생성
export interface NewNoticePost {
  title: string;
  content: string;
  img_url?: string[];
}

export const createNotice = async (noticeData: NewNoticePost) => {
  const { data, error } = await supabase
    .from("notice")
    .insert(noticeData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 공지사항 수정
export interface UpdateNoticePost {
  id: number;
  title?: string;
  content?: string;
  img_url?: string[];
}

export const updateNotice = async (noticeData: UpdateNoticePost) => {
  const { id, ...updateData } = noticeData;

  const { data, error } = await supabase
    .from("notice")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 공지사항 삭제
export const deleteNotice = async (id: number) => {
  const { data, error } = await supabase.from("notice").delete().eq("id", id);

  if (error) throw error;
  return data;
};
