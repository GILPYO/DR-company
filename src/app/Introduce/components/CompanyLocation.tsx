import Image from "next/image";

export function CompanyLocation() {
  return (
    <div className="w-full max-w-[768px] mx-auto px-[20px] py-[40px]">
      <h2 className="text-[24px] font-bold text-[#333] mb-[40px] text-center">
        오시는길
      </h2>

      {/* 지도 영역 */}
      <div className="relative w-full h-[255px] bg-[#e9e9e9] rounded-lg mb-[30px] flex items-center justify-center border border-[#ddd]">
        <span className="text-[#999] text-[14px]">
          <Image src={"/Location.png"} alt="Location" fill objectFit="cover" />
        </span>
      </div>

      {/* 본사 정보 */}
      <div className="space-y-[20px]">
        <h3 className="text-[20px] font-bold text-[#333]">본사</h3>

        <div className="bg-[#f9f9f9] rounded-lg p-[24px] space-y-[16px]">
          {/* 주소 */}
          <div>
            <p className="text-[16px] text-[#333] leading-relaxed">
              경기도 김포시 양촌읍 황금3로7번길 73
            </p>
            <p className="text-[14px] text-[#666] mt-[4px]">(우편번호 10048)</p>
          </div>

          {/* 연락처 */}
          <div className="space-y-[8px] pt-[16px] border-t border-[#e0e0e0]">
            <div className="flex items-center gap-[12px]">
              <span className="text-[14px] font-bold text-[#2565ae] min-w-[40px]">
                TEL.
              </span>
              <span className="text-[15px] text-[#333]">032-569-4650</span>
            </div>

            <div className="flex items-center gap-[12px]">
              <span className="text-[14px] font-bold text-[#2565ae] min-w-[40px]">
                FAX.
              </span>
              <span className="text-[15px] text-[#333]">032-569-2637</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 구분선 */}
      <div className="w-full h-[1px] bg-[#e0e0e0] mt-[60px]"></div>
    </div>
  );
}
