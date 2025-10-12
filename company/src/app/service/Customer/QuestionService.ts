// service/customer/QuestionService.ts
import { supabase } from "@/app/lib/supabaseClient";

export interface QuestionPost {
  id: number;
  title: string;
  content: string;
  img_url: string[];
  created_at: string;
  author_id: string;
}

export interface PaginatedQuestions {
  data: QuestionPost[];
  count: number;
  totalPages: number;
  currentPage: number;
}

// 페이지네이션된 Q&A 가져오기
export const getQuestionsWithPagination = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedQuestions> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { count } = await supabase
    .from("questions")
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("questions")
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

// 모든 Q&A 가져오기
export const getAllQuestions = async (): Promise<QuestionPost[]> => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

// Q&A 상세 조회
export const getQuestionById = async (id: number): Promise<QuestionPost> => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// Q&A 생성
export interface NewQuestionPost {
  title: string;
  content: string;
  author_id: string;
  img_url?: string[];
}

export const createQuestion = async (questionData: NewQuestionPost) => {
  const { data, error } = await supabase
    .from("questions")
    .insert(questionData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Q&A 수정
export interface UpdateQuestionPost {
  id: number;
  title?: string;
  content?: string;
  img_url?: string[];
}

export const updateQuestion = async (questionData: UpdateQuestionPost) => {
  const { id, ...updateData } = questionData;

  const { data, error } = await supabase
    .from("questions")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Q&A 삭제
export const deleteQuestion = async (id: number) => {
  const { data, error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return data;
};
