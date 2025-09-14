"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/app/service/Auth/SignInWithEmail";
import Swal from "sweetalert2";

export type SignIn = {
  email: string;
  password: string;
};

const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignIn) => signInWithEmail(data),
    onSuccess: () => {
      Swal.fire("로그인이 완료되었습니다!");
      router.push("/");
    },
    onError: (error: any) => {
      Swal.fire(error.message || "로그인에 실패했습니다.");
    },
  });
};

export default useSignIn;
