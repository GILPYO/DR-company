"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSignUp from "../hooks/Auth/useSignUp";
import Swal from "sweetalert2";

interface SignupForm {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone_number: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();
  const router = useRouter();
  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: SignupForm) => {
    if (data.password !== data.passwordConfirm) {
      Swal.fire("비밀번호가 일치하지 않습니다.");
      return;
    }

    mutate({
      email: data.email,
      password: data.password,
      username: data.username,
      phone_number: data.phone_number,
    });
  };

  return (
    <div className="w-full min-h-screen px-[20px] flex flex-col items-center justify-start py-[40px]">
      <h1 className="text-[#121212] font-[600] text-[24px] mb-[55px]">
        회원가입
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[400px] space-y-[40px]"
      >
        {/* 이메일 */}
        <div className="flex items-center">
          <label className="text-[16px] font-medium text-[#363636] w-[100px]">
            이메일
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다",
              },
            })}
            type="email"
            placeholder="이메일 (필수)"
            className="flex-1 border border-[#ddd] h-[40px] px-[12px] text-[14px] placeholder:text-[#999] focus:outline-none focus:border-[#2565ae]"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm ml-[100px]">
            {errors.email.message}
          </p>
        )}

        {/* 이메일 */}
        <div className="flex items-center">
          <label className="text-[16px] font-medium text-[#363636] w-[100px]">
            이름
          </label>
          <input
            {...register("username", {
              required: "이름을 입력해주세요",
              pattern: {
                value: /^[A-Za-z가-힣]{2,10}$/,
                message: "올바른 이름 형식이 아닙니다",
              },
            })}
            type="text"
            placeholder="이름 (필수)"
            className="flex-1 border border-[#ddd] h-[40px] px-[12px] text-[14px] placeholder:text-[#999] focus:outline-none focus:border-[#2565ae]"
          />
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm ml-[100px]">
            {errors.username.message}
          </p>
        )}

        {/* 비밀번호 */}
        <div className="flex items-center">
          <label className="text-[16px] font-medium text-[#363636] w-[100px]">
            비밀번호
          </label>
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            })}
            type="password"
            placeholder="비밀번호 (필수)"
            className="flex-1 border border-[#ddd] h-[40px] px-[12px] text-[14px] placeholder:text-[#999] focus:outline-none focus:border-[#2565ae]"
          />
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm ml-[100px]">
            {errors.password.message}
          </span>
        )}

        {/* 비밀번호 확인 */}
        <div className="flex items-center">
          <label className="text-[16px] font-medium text-[#363636] w-[100px]">
            비밀번호 확인
          </label>
          <input
            {...register("passwordConfirm", {
              required: "비밀번호 확인을 입력해주세요",
            })}
            type="password"
            placeholder="비밀번호 확인 (필수)"
            className="flex-1 border border-[#ddd] h-[40px] px-[12px] text-[14px] placeholder:text-[#999] focus:outline-none focus:border-[#2565ae]"
          />
        </div>
        {errors.passwordConfirm && (
          <span className="text-red-500 text-sm ml-[100px]">
            {errors.passwordConfirm.message}
          </span>
        )}

        {/* 핸드폰 번호 */}
        <div className="flex items-center">
          <label className="text-[16px] font-medium text-[#363636] w-[100px]">
            핸드폰 번호
          </label>
          <input
            {...register("phone_number", {
              required: "핸드폰 번호를 입력해주세요",
            })}
            type="tel"
            placeholder="핸드폰 번호 (필수)"
            className="flex-1 border border-[#ddd] h-[40px] px-[12px] text-[14px] placeholder:text-[#999] focus:outline-none focus:border-[#2565ae]"
          />
        </div>
        {errors.phone_number && (
          <p className="text-red-500 text-sm ml-[100px]">
            {errors.phone_number.message}
          </p>
        )}

        {/* 제출 버튼 */}
        <div className="pt-[20px]">
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-[50px] bg-[#2565ae] text-white font-[600] text-[18px] hover:bg-[#1e4f87] transition-colors disabled:opacity-50"
          >
            {isPending ? "처리 중..." : "회원가입"}
          </button>
        </div>
      </form>

      <div className="mt-[30px]">
        <button
          onClick={() => router.push("/Login")}
          className="text-[#2565ae] text-[14px] hover:underline"
        >
          이미 계정이 있으신가요? 로그인하기
        </button>
      </div>
    </div>
  );
}
