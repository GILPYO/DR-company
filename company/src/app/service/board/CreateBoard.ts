import { supabase } from "@/app/lib/supabaseClient";

export interface NewBoardPost {
  aouther?: string;
  title: string;
  content: string;
  img_url?: string[];
}

export const createBoard = async (post: NewBoardPost) => {
  const { data, error } = await supabase
    .from("board")
    .insert([post])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
