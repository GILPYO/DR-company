"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSignIn from "../hooks/Auth/useSignIn";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();
  const { mutate, isPending } = useSignIn();

  const onSubmit = (data: LoginForm) => {
    mutate(data);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center px-[20px]">
      <div className="w-full max-w-[500px] h-[532px] flex flex-col justify-center items-center border border-[#888888] px-[57px]">
        <h1 className="text-[#121212] font-[600] text-[30px] mb-[40px]">
          로그인
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center gap-[15px]"
        >
          <input
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다",
              },
            })}
            className="w-full min-w-[326px] border border-[#888888] h-[40px] px-[14px] placeholder:text-[14px] placeholder:text-[#888888] focus:outline-none focus:border-[#2565ae]"
            type="email"
            placeholder="이메일"
          />
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            })}
            className="w-full min-w-[326px] border border-[#888888] h-[40px] px-[14px] placeholder:text-[14px] placeholder:text-[#888888] focus:outline-none focus:border-[#2565ae]"
            type="password"
            placeholder="비밀번호"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full min-w-[326px] h-[60px] bg-[#2565ae] text-white font-[600] text-[20px] mt-[10px] hover:bg-[#1e4f87] transition-colors disabled:opacity-50"
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <div className="w-full h-[1px] bg-[#e3e3e3] mt-[60px]"></div>
        <div className="w-full min-w-[326px] flex items-center justify-center mt-[41px] gap-[12px]">
          <button
            onClick={() => router.push("/Signup")}
            className="flex items-center justify-center w-full h-[44px] bg-[#10336d] font-[600] text-[16px] text-white hover:bg-[#0c2651] transition-colors"
          >
            회원가입
          </button>
          <button className="flex items-center justify-center w-full h-[44px] bg-[#ffffff] border border-[#888888] font-[600] text-[16px] text-[#888888] whitespace-nowrap p-[12px] hover:bg-[#f5f5f5] transition-colors">
            아이디/비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
