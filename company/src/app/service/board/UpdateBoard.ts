import { supabase } from "@/app/lib/supabaseClient";

export interface UpdateBoardPost {
  id: number;
  title?: string;
  content?: string;
  img_url?: string[];
}

export const updateBoard = async (boardData: UpdateBoardPost) => {
  const { id, ...updateData } = boardData;

  const { data, error } = await supabase
    .from("board")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
