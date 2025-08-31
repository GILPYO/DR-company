"use client";
import useSignUp, { SignUp } from "../hooks/Auth/useSignUp";
import { useForm } from "react-hook-form";

export default function Login() {
  const { mutate } = useSignUp();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: SignUp) => {
    mutate(data);
  };

  return (
    <div className="w-fill h-[100vh] flex items-center justify-center px-[20px]">
      <div className="w-full h-[532px] flex flex-col justify-center items-center border border-[#888888]">
        <h1>로그인</h1>
      </div>
    </div>
  );
}
