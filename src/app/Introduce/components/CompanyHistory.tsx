import Image from "next/image";

export function CompanyHistory() {
  const historyData = [
    {
      year: "2024",
      items: [{ month: "1월", content: "자본 증자" }],
    },
    {
      year: "2023",
      items: [
        { month: "8월", content: "(주)용광산업 창립" },
        {
          month: "9월",
          content: "(주)용광 인수\n린나이코리아㈜  협력업체 등록",
        },
        { month: "10월", content: "카자흐스탄 연도 수출 개시" },
        {
          month: "12월",
          content: "ISO 9001 / ISO 45001 취득\n리시아 연도 수출 개시",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-[768px] mx-auto px-[20px] py-[40px]">
      {/* 로고 섹션 */}
      <div className="flex justify-center mb-[60px]">
        <div className="relative">
          {/* 로고 원형 배경 */}
          <div className="w-[120px] h-[120px] border-2 border-dashed border-[#2565AE] rounded-full flex items-center justify-center bg-white">
            <div className="w-[80px] h-[80px] flex items-center justify-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={103.41}
                height={103.41}
              />
            </div>
          </div>

          {/* 연결선 */}
          <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2">
            <div className="w-[2px] h-[40px] bg-[#e0e0e0]"></div>
            <div className="w-[8px] h-[8px] bg-[#2565ae] rounded-full -ml-[3px]"></div>
          </div>
        </div>
      </div>

      {/* 타임라인 */}
      <div className="space-y-[20px]">
        {historyData.map((yearData, yearIndex) => (
          <div key={yearData.year} className="relative">
            {/* 연도 헤더 */}
            <div className="bg-white border border-[#e0e0e0] rounded-lg p-[20px] shadow-sm mb-[20px]">
              <h3 className="text-[24px] font-bold text-[#2565ae] mb-[16px]">
                {yearData.year}
              </h3>

              {/* 해당 연도의 이벤트들 */}
              <div className="space-y-[12px]">
                {yearData.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-[8px] items-start">
                    <span className="text-[14px] font-semibold text-[#2565ae] w-[50px] text-center bg-[#f0f5ff] px-[8px] py-[4px] rounded">
                      {item.month}
                    </span>
                    <div className="flex-1">
                      {item.content.split("\n").map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="text-[15px] text-[#121212] leading-[22px]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 타임라인 연결선 (마지막 항목이 아닌 경우) */}
            {yearIndex < historyData.length - 1 && (
              <div className="flex justify-center mb-[20px]">
                <div className="w-[2px] h-[30px] bg-[#e0e0e0]"></div>
                <div className="absolute bottom-0 w-[8px] h-[8px] bg-[#2565ae] rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 구분선 */}
      <div className="w-full h-[1px] bg-[#e0e0e0] mt-[60px]"></div>
    </div>
  );
}
