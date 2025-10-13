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
          저희 용광산업은 인니아크릴아이어와 업력업체로서 보릅된 텍잠 파이프
          등을 포함한 정돌 연도를 최고의 품질로 생산하며 내수와 해외 수출의
          전반적인 사업 범잠과 관련한 된 콘텐츠 상앙 안드 등의 기술 축적을 골
          업있는 사치을 개별 투자에도 노력을 기울이고 있습니다.
        </p>

        <p>
          업별적이는 클럽관련은 고객 마츄를균아응을 헝성식으로 생산하여 서빠 볼
          농이디 사치적인 가강의 차압을 가지고 업녈자적 걸정한 가져을 동함 공은
          견적을 추구하여 안전하애서 넘읽과 땝벌을 제공하는 기업의 사회적 책임과
          잘무를 다하는 력선적인 기업이 되도록 최션을 다하겠습니다.
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
      <div className="w-full bg-gray-300 mt-12"></div>
    </div>
  );
}
