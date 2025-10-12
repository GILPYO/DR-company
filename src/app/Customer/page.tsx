"use client";

import { Suspense } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CustomerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (!category) {
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

export default function CustomerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          로딩 중...
        </div>
      }
    >
      <CustomerContent />
    </Suspense>
  );
}
