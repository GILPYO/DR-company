import { supabase } from "@/app/lib/supabaseClient";

export const deleteBoard = async (id: number): Promise<void> => {
  const { error } = await supabase.from("board").delete().eq("id", id);

  if (error) {
    throw error;
  }
};
