"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/app/service/Auth/SignUpWithEmail";

export type SignUp = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
};

const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignUp) => signUpWithEmail(data.email, data.password),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      router.push("/");
    },
    onError: (error: string) => {
      alert("회원가입에 실패했습니다.");
    },
  });
};

export default useSignUp;
