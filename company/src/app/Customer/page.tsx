"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CustomerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (!category) {
      // 기본값으로 공지사항으로 리다이렉트
      router.replace("/Customer/notice");
    } else if (category === "notice") {
      router.replace("/Customer/notice");
    } else if (category === "qna") {
      router.replace("/Customer/qna");
    }
  }, [category, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">페이지를 이동 중입니다...</p>
    </div>
  );
}
