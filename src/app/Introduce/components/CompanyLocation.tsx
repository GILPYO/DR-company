import Image from "next/image";
import { cn } from "@/app/lib/utils";

export function CompanyLocation() {
  return (
    <div
      className={cn(
        "w-full max-w-[768px] mx-auto px-[20px] py-[40px]",
        "pc:max-w-[1280px] pc:px-[60px] pc:py-[60px] pc:gap-[40px]"
      )}
    >
      <h2
        className={cn(
          "text-[24px] font-bold text-[#333] mb-[40px] text-center",
          "pc:text-[28px] pc:mb-[50px]"
        )}
      >
        오시는길
      </h2>

      {/* PC: 가로 배치, 모바일: 세로 배치 */}
      <div
        className={cn("flex flex-col", "pc:flex-row pc:gap-12 pc:items-start")}
      >
        {/* 본사 정보 - PC: 왼쪽, 모바일: 아래 */}
        <div className={cn("space-y-[20px] order-2", "pc:order-1 pc:flex-1")}>
          <h3
            className={cn(
              "text-[20px] font-bold text-[#333]",
              "pc:text-[24px]"
            )}
          >
            본사
          </h3>

          {/* 주소 */}
          <div className="flex flex-col gap-[4px]">
            <p
              className={cn(
                "text-[16px] text-[#333] leading-relaxed",
                "pc:text-[18px]"
              )}
            >
              경기도 김포시 양촌읍 황금3로7번길 73
            </p>
            <p
              className={cn(
                "text-[14px] text-[#666] mt-[4px]",
                "pc:text-[15px]"
              )}
            >
              (우편번호 10048)
            </p>

            {/* 연락처 */}
            <div
              className={cn(
                "space-y-[8px] pt-[16px] border-t border-[#e0e0e0]",
                "pc:pt-[20px]"
              )}
            >
              <div className="flex items-center gap-[12px]">
                <span
                  className={cn(
                    "text-[14px] font-bold text-[#2565ae] min-w-[40px]",
                    "pc:text-[15px]"
                  )}
                >
                  TEL.
                </span>
                <span
                  className={cn("text-[15px] text-[#333]", "pc:text-[16px]")}
                >
                  032-569-4650
                </span>
              </div>

              <div className="flex items-center gap-[12px]">
                <span
                  className={cn(
                    "text-[14px] font-bold text-[#2565ae] min-w-[40px]",
                    "pc:text-[15px]"
                  )}
                >
                  FAX.
                </span>
                <span
                  className={cn("text-[15px] text-[#333]", "pc:text-[16px]")}
                >
                  032-569-2637
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 지도 영역 - PC: 오른쪽, 모바일: 위 */}
        <div
          className={cn(
            "relative w-full h-[255px] bg-[#e9e9e9] rounded-lg mb-[30px] flex items-center justify-center border border-[#ddd] order-1",
            "pc:order-2 pc:w-[600px] pc:h-[400px] pc:flex-shrink-0 pc:mb-0"
          )}
        >
          <Image
            src={"/Location.png"}
            alt="Location"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* 하단 구분선 */}
      <div
        className={cn("w-full h-[1px] bg-[#e0e0e0] mt-[60px]", "pc:mt-[80px]")}
      ></div>
    </div>
  );
}
