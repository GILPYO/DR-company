"use client";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full h-[481px] bg-[#F5F5F5] py-12 px-5">
      {/* 로고 */}
      <div className="flex justify-center mb-8">
        <Image
          src="/logo.png" // 로고 경로
          alt="용광산업 로고"
          width={120}
          height={80}
          className="object-contain"
        />
      </div>

      {/* 메뉴 링크 */}
      <div className="flex justify-center items-center gap-4 mb-8 text-[#333] text-[14px] md:text-[18px] whitespace-nowrap">
        <Link href="/introduce" className="hover:text-[#4A7BC0]">
          회사소개
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/privacy" className="hover:text-[#4A7BC0]">
          개인정보처리방침
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/terms" className="hover:text-[#4A7BC0]">
          서비스 이용약관
        </Link>
      </div>

      {/* 회사 정보 */}
      <div className="text-center text-[#666] text-[14px] md:text-[15px] leading-relaxed space-y-2">
        <p>사업자 등록번호 : 568-86-03002</p>
        <p>주소 : 경기도 김포시 양촌읍 황금3로7번길 73</p>
        <div className="flex justify-center gap-8 flex-wrap">
          <p>TEL : 032-569-4650</p>
          <p>FAX : 032-569-2637</p>
        </div>
        <p>E-mail : yongkwang23@naver.com</p>
      </div>

      {/* Copyright */}
      <div className="text-center text-[#999] text-[13px] md:text-[14px] mt-8">
        <p>Copyright © 주식회사 용광산업 All right Reserved</p>
      </div>
    </footer>
  );
}
