export function CompanyOrganization() {
  return (
    <div className="w-full max-w-4xl mx-auto px-5 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
        조직도
      </h2>

      <div className="flex flex-col items-center">
        {/* 대표이사 */}
        <div className="relative">
          <div className="bg-white border-2 border-yellow-400 rounded-lg px-8 py-4 text-center shadow-md w-60">
            <h3 className="text-lg font-bold text-gray-800 mb-1">대표이사</h3>
            <p className="text-sm text-gray-600">CEO</p>
          </div>
          {/* 세로선 아래로 */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-400"></div>
        </div>

        {/* 전무이사 */}
        <div className="relative mt-12">
          <div className="bg-white border-2 border-[#ffa517] rounded-lg px-8 py-4 text-center shadow-md w-60">
            <h3 className="text-lg font-bold text-gray-800 mb-1">전무이사</h3>
            <p className="text-sm text-gray-600">Executive Vice President</p>
          </div>
          {/* 세로선 아래로 */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-400"></div>
        </div>

        {/* 이사 */}
        <div className="relative mt-12">
          <div className="bg-white border-2 border-cyan-500 rounded-lg px-8 py-4 text-center shadow-md w-60">
            <h3 className="text-lg font-bold text-gray-800 mb-1">이사</h3>
            <p className="text-sm text-gray-600">
              Associate Executive Director
            </p>
          </div>
          {/* 세로선 아래로 */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
        </div>

        {/* 가로 연결선 */}
        <div className="relative w-full flex justify-center mt-8">
          <div className="w-full max-w-xl h-0.5 bg-gray-400"></div>
        </div>

        {/* 각 부서들 */}
        <div className="flex justify-center gap-5 mt-1 flex-wrap">
          {[
            "연구개발\n전담부서",
            "영업부",
            "생산부",
            "관리부",
            "품질관리부",
            "안전관리부",
          ].map((dept, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* 세로 연결선 */}
              <div className="w-0.5 h-8 bg-gray-400 mb-2"></div>
              {/* 부서 박스 */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-center shadow-sm w-24 h-16 flex items-center justify-center">
                <p className="text-xs font-medium text-gray-800 leading-tight whitespace-pre-line">
                  {dept}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 구분선 */}
      <div className="w-full h-px bg-gray-300 mt-16"></div>
    </div>
  );
}
