"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import Swal from "sweetalert2";

const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      Swal.fire("로그아웃이 완료되었습니다!");
      router.push("/");
    },
    onError: (error: any) => {
      Swal.fire(error.message || "로그아웃에 실패했습니다.");
    },
  });
};

export default useSignOut;
