import Image from "next/image";

export default function Main() {
  return (
    <section className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-start">
      <div className="relative w-full h-[552px]">
        <Image
          src="/HomeImgM.png"
          alt="홈 메인 이미지"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* 텍스트 오버레이 */}
        <div className="absolute z-50 left-[20px] top-1/2 -translate-y-1/2 ">
          <div>
            <p className="text-white text-[40px] leading-tight drop-shadow">
              정확한 설계,
            </p>
            <p className="text-white text-[40px] leading-tight drop-shadow">
              믿을 수 있는 연도
            </p>
            <p className="text-white text-[40px] font-semibold drop-shadow">
              용광산업
            </p>
          </div>
          <div className="mt-[30px]">
            <p className="text-white text-[20px] leading-tight drop-shadow">
              검증된 기술력과 공인 인증으로
            </p>
            <p className="text-white text-[20px] leading-tight drop-shadow">
              완성하는 차별화된 연도 제작
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-center justify-start px-[20] py-[80px]">
        <h2>ABOUT US</h2>
      </div>
    </section>
  );
}
