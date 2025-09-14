"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/app/service/Auth/SignUpWithEmail";
import Swal from "sweetalert2";

export type SignUp = {
  email: string;
  password: string;
  username: string;
  phone_number: string;
};

const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignUp) => signUpWithEmail(data),
    onSuccess: () => {
      Swal.fire("회원가입이 완료되었습니다! 이메일을 확인해주세요.");
      router.push("/");
    },
    onError: (error: any) => {
      Swal.fire(error.message || "회원가입에 실패했습니다.");
    },
  });
};

export default useSignUp;
