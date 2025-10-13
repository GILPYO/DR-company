import Image from "next/image";

export function CompanyIntro() {
  return (
    <div className="w-full max-w-[768px] mx-auto px-[20px] py-[40px]">
      <Image
        src="/banner1.png"
        alt="banner1"
        width={768}
        height={300}
        className="object-cover rounded-lg mb-[30px]"
      />

      {/* 제목 */}
      <h2 className="text-[16px] text-gray-900 mb-6">
        안녕하세요. 주식회사 용광산업입니다.
      </h2>

      {/* 본문 내용 */}
      <div className="text-gray-700 text-[15px] leading-relaxed space-y-6">
        <p>
          저희 용광산업은 린나이코리아㈜의 협력업체로서 보일러 부품 파이프등을
          포함한 정품 연도를 최고의 품질로 생산하여 내수와 해외 수출의 전반적인
          시장 발전과 삼중관 및 콘덴싱 상향 연도 등의 기술 특허로 끊임없는
          신제품 개발 투자에도 노력을 기울이고 있습니다.
        </p>

        <p>
          일관성있는 품질관리로 고객 만족과 약속을 최우선으로 생각하여 신뢰를
          높이며 사회적인 기업의 책임을 가지고 협력사와 공정한 거래를 통한 공존
          공영을 추구하여 임직원에게 보람과 행복을 제공하는 기업의 사회적 책임과
          의무를 다하는 혁신적인 기업이 되도록 최선을 다하겠습니다.
        </p>

        <p className="text-center font-medium">감사합니다.</p>
      </div>

      {/* 회사명 */}
      <div className="mt-10 text-left">
        <p className="text-[15px] font-bold text-gray-900">
          (주)용광산업 대표이사 &nbsp;&nbsp;여 광 구
        </p>
      </div>

      {/* 구분선 */}
      <div className="w-full h-[1px] bg-gray-300 mt-12"></div>
    </div>
  );
}
