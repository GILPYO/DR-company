import { supabase } from "@/app/lib/supabaseClient";

interface SignInData {
  email: string;
  password: string;
}

export const signInWithEmail = async ({ email, password }: SignInData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};
