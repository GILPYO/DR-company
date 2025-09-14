import { supabase } from "@/app/lib/supabaseClient";

interface SignUpData {
  email: string;
  password: string;
  username: string;
  phone_number: string;
}

export const signUpWithEmail = async ({
  email,
  password,
  username,
  phone_number,
}: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        phone_number,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        username,
        email,
        phone_number,
      },
    ]);

    if (profileError) {
      console.error("프로필 저장 에러:", profileError);
    }
  }

  return data;
};
