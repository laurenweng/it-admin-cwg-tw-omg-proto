import svgPaths from "./svg-y9qoi4ez0u";

interface BaseCwDateRangePickerCalculatorProps {
  direction?: "bottom" | "top";
  date?: "連選" | "已選" | "空值";
}

function BaseCwDateRangePickerCalculator({ direction = "bottom", date = "空值" }: BaseCwDateRangePickerCalculatorProps) {
  const element = <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />;
  if (direction === "bottom" && date === "已選") {
    return (
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="direction=bottom, date=已選">
        {element}
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[233px] w-[16.971px]">
          <div className="flex-none rotate-[225deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
          <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
              <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
              <div className="min-w-inherit size-full">
                <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                          <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                        </div>
                      </div>
                      <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">2</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">4</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">5</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">6</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">7</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">8</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">9</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">11</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">12</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">13</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">14</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">15</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">16</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">17</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">18</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                          <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                            <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">19</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">20</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">21</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">22</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">23</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">25</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">26</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">27</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">28</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">29</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">30</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (direction === "bottom" && date === "連選") {
    return (
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="direction=bottom, date=連選">
        {element}
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
          <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
              <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
              <div className="min-w-inherit size-full">
                <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute bg-[#d1ebff] h-[28px] left-[17.01px] top-[1.93px] w-[85px]" />
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                          <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                        </div>
                      </div>
                      <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">2</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-[#d1ebff] h-[28px] left-0 top-[1.93px] w-[238px]" />
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">4</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">5</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">6</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">7</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">8</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">9</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-[#d1ebff] h-[28px] left-0 top-[1.93px] w-[238px]" />
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">11</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">12</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">13</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">14</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">15</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">16</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">17</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-[#d1ebff] h-[28px] left-[153px] top-[1.93px] w-[85px]" />
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">18</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                          <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                            <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">19</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">20</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">21</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                          <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                        </div>
                      </div>
                      <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">22</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">23</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">25</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">26</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">27</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">28</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">29</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">30</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16px] top-[233px] w-[16.971px]">
          <div className="flex-none rotate-[225deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (direction === "top" && date === "已選") {
    return (
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="direction=top, date=已選">
        {element}
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
          <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
            <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
            <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
                <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                      <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
                <div className="min-w-inherit size-full">
                  <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="absolute inset-0 overflow-clip" data-name="Container">
                          <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                            <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                          </div>
                        </div>
                        <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">1</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">2</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">4</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">5</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">6</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">7</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">8</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">9</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">11</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">12</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">13</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">14</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">15</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">16</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">17</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">18</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                          <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                            <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                              <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">19</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">20</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">21</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">22</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">23</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">25</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">26</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">27</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">28</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">29</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">30</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">31</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[-8px] w-[16.971px]">
          <div className="flex-none rotate-[45deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (direction === "top" && date === "連選") {
    return (
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="direction=top, date=連選">
        {element}
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[-8px] w-[16.971px]">
          <div className="flex-none rotate-[45deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
          <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
              <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
              <div className="min-w-inherit size-full">
                <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute bg-[#d1ebff] h-[28px] left-[17.01px] top-[1.93px] w-[85px]" />
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                          <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                        </div>
                      </div>
                      <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">2</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-[#d1ebff] h-[28px] left-0 top-[1.93px] w-[238px]" />
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">4</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">5</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">6</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">7</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">8</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">9</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-[#d1ebff] h-[28px] left-0 top-[1.93px] w-[238px]" />
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">11</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">12</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">13</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">14</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">15</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">16</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">17</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="absolute bg-[#d1ebff] h-[28px] left-[153px] top-[1.93px] w-[85px]" />
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">18</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                          <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                            <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">19</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">20</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">21</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                          <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                        </div>
                      </div>
                      <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">22</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">23</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">25</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">26</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">27</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">28</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">29</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">30</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (direction === "top" && date === "空值") {
    return (
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="direction=top, date=空值">
        {element}
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
          <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
            <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
            <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
                <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                      <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
                <div className="min-w-inherit size-full">
                  <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">1</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">2</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">4</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">5</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">6</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">7</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">8</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">9</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">11</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">12</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">13</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">14</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">15</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">16</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">17</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">18</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                          <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                            <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                              <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                            </div>
                          </div>
                        </div>
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">19</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">20</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">21</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">22</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">23</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">25</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">26</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">27</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">28</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">29</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">30</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">31</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[-8px] w-[16.971px]">
          <div className="flex-none rotate-[45deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] size-full" data-name="direction=bottom, date=空值">
      {element}
      <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
        <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
              <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g id="SVG">
                      <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g id="SVG">
                      <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[16.971px] items-center justify-center left-[16px] top-[233px] w-[16.971px]">
        <div className="flex-none rotate-[225deg]">
          <div className="bg-white relative size-[12px]">
            <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
        <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
            <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                  <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
            <div className="min-w-inherit size-full">
              <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                  </div>
                  <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                    <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                  </div>
                </div>
                <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                  <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                  <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                  <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                  <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">1</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">2</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">3</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">4</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">5</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">6</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">7</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">8</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">9</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">10</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">11</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">12</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">13</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">14</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">15</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">16</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">17</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">18</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                      <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                        <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                          <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                        </div>
                      </div>
                    </div>
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                      <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">19</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">20</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">21</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">22</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">23</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">24</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">25</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">26</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">27</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">28</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">29</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">30</p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                    <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="leading-[28px] whitespace-pre">31</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionBottomDatepickerOpenTypeDisabledFalse() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=bottom, datepicker=open, type=連選值, disabled=false">
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
        <BaseCwDateRangePickerCalculator date="連選" />
      </div>
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_4px_0px_#01579b]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionBottomDatepickerOpenTypeDisabledFalse1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=bottom, datepicker=open, type=單選值, disabled=false">
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="_Base / CwDateRangePicker / calculator">
        <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[233px] w-[16.971px]">
          <div className="flex-none rotate-[225deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
          <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
              <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
              <div className="min-w-inherit size-full">
                <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute inset-0 overflow-clip" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                          <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                        </div>
                      </div>
                      <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">2</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">4</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">5</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">6</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">7</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">8</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">9</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">11</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">12</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">13</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">14</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">15</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">16</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">17</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">18</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                          <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                            <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">19</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">20</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">21</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">22</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">23</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">25</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">26</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">27</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">28</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">29</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">30</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_4px_0px_#01579b]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionNoneDatepickerCloseTypeDisabledTrue() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=none, datepicker=close, type=連選值, disabled=true">
      <div className="bg-[#e9ebf2] h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionNoneDatepickerCloseTypeDisabledFalse() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=none, datepicker=close, type=連選值, disabled=false">
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionNoneDatepickerCloseTypeDisabledTrue1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=none, datepicker=close, type=單選值, disabled=true">
      <div className="bg-[#e9ebf2] h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionNoneDatepickerCloseTypeDisabledFalse1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=none, datepicker=close, type=單選值, disabled=false">
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionTopDatepickerOpenTypeDisabledFalse() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=top, datepicker=open, type=連選值, disabled=false">
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_4px_0px_#01579b]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
        <BaseCwDateRangePickerCalculator direction="top" date="連選" />
      </div>
    </div>
  );
}

function DirectionTopDatepickerOpenTypeDisabledFalse1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=top, datepicker=open, type=單選值, disabled=false">
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_4px_0px_#01579b]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">2025-05-01</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
        <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
          <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
            <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
            <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
                <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                      <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
                <div className="min-w-inherit size-full">
                  <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="absolute inset-0 overflow-clip" data-name="Container">
                          <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34px]" data-name="Container">
                            <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" data-name="Background" />
                          </div>
                        </div>
                        <div className="bg-[#0078d4] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月1日 星期四">
                          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">1</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">2</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">4</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">5</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">6</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">7</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">8</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">9</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">11</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">12</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">13</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">14</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">15</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">16</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">17</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">18</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                          <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                            <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                              <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">19</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">20</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">21</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">22</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">23</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">25</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">26</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">27</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">28</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">29</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">30</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[20px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">31</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[-8px] w-[16.971px]">
          <div className="flex-none rotate-[45deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionBottomDatepickerOpenTypeDisabledFalse2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=bottom, datepicker=open, type=空值, disabled=false">
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-full" data-name="_Base / CwDateRangePicker / calculator">
        <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16px] top-[233px] w-[16.971px]">
          <div className="flex-none rotate-[225deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
          <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
              <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
              <div className="min-w-inherit size-full">
                <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">2</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">4</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">5</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">6</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">7</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">8</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">9</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">11</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">12</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">13</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">14</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">15</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">16</p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">17</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">18</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                        <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                          <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                            <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                          </div>
                        </div>
                      </div>
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                        <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">19</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">20</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">21</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">22</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">23</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">25</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">26</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">27</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">28</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">29</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">30</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                      <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                        <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <p className="leading-[28px] whitespace-pre">31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_4px_0px_#01579b]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#cdcdcd] text-[14px]">請選擇日期</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionNoneDatepickerCloseTypeDisabledTrue2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=none, datepicker=close, type=空值, disabled=true">
      <div className="bg-[#e9ebf2] h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#cdcdcd] text-[14px]">請選擇日期</p>
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionNoneDatepickerCloseTypeDisabledFalse2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=none, datepicker=close, type=空值, disabled=false">
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#cdcdcd] text-[14px]">請選擇日期</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionTopDatepickerOpenTypeDisabledFalse2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="direction=top, datepicker=open, type=空值, disabled=false">
      <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwDateRangePicker">
        <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_0px_4px_0px_#01579b]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#cdcdcd] text-[14px]">請選擇日期</p>
            <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]" data-name="select-down">
              <div className="relative shrink-0 size-[12px]" data-name="Group">
                <div className="absolute inset-[-5.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Group">
                      <path d={svgPaths.p19cd9af2} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                      <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" id="Vector_2" />
                      <path d="M3.66667 1V3M10.3333 1V3" id="Vector_3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
        <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
          <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                  <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="SVG">
                        <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[250px]" data-name="_Base / CwDateRangePicker / calculator">
          <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0" data-name="Container">
            <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="relative shrink-0 size-[23.99px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p2d947e00} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px]" data-name="Button">
                    <div className="h-[23.99px] relative shrink-0 w-[24px]" data-name="SVG">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="SVG">
                          <path d={svgPaths.p248cbb20} id="Vector" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
            <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]" data-name="Container">
                <div className="relative rounded-[3.5px] shrink-0 w-full" data-name="Button">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                      <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">5月 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="min-w-[232px] relative shrink-0 w-full" data-name="Container">
                <div className="min-w-inherit size-full">
                  <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">日</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">一</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">二</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">三</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">四</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">五</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-center px-0 py-[8px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <p className="font-['Noto_Sans_TC:Bold',_sans-serif] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">六</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 grow min-h-[32px] min-w-px self-stretch shrink-0" data-name="Rectangle" />
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">1</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月2日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">2</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月3日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月4日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">4</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月5日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">5</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月6日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">6</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月7日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">7</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月8日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">8</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月9日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">9</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月10日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月11日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">11</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月12日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">12</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月13日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">13</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[33.99px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月14日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">14</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月15日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">15</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34.01px]" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月16日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">16</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center min-h-[32px] relative self-stretch shrink-0 w-[34px]" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月17日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">17</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月18日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">18</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="absolute bottom-0 left-0 overflow-clip right-[-0.01px] top-0" data-name="Container">
                          <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[34.01px]" data-name="Container">
                            <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background+Border">
                              <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                            </div>
                          </div>
                        </div>
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月19日 星期一">
                          <div className="flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#0078d4] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">19</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月20日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">20</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月21日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">21</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月22日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">22</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月23日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">23</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月24日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月25日 星期日">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">25</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月26日 星期一">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">26</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月27日 星期二">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">27</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月28日 星期三">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">28</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月29日 星期四">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">29</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px]" data-name="Button - 2025年5月30日 星期五">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">30</p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex grow items-center justify-center min-h-[32px] min-w-px relative self-stretch shrink-0" data-name="Container">
                        <div className="box-border content-stretch flex h-[28px] items-center justify-center pb-[0.73px] pt-0 px-0 relative rounded-[9999px] shrink-0 w-[27.99px]" data-name="Button - 2025年5月31日 星期六">
                          <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <p className="leading-[28px] whitespace-pre">31</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.971px] items-center justify-center left-[16.52px] top-[-8px] w-[16.971px]">
          <div className="flex-none rotate-[45deg]">
            <div className="bg-white relative size-[12px]">
              <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame11268() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20px] top-[114px] w-[250px]" data-name="direction=top, datepicker=open, type=空值, disabled=false">
        <DirectionTopDatepickerOpenTypeDisabledFalse2 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20px] top-[24px] w-[250px]" data-name="direction=none, datepicker=close, type=空值, disabled=false">
        <DirectionNoneDatepickerCloseTypeDisabledFalse2 />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col gap-[8px] items-start left-[20px] top-[69px] w-[250px]" data-name="direction=none, datepicker=close, type=空值, disabled=true">
        <DirectionNoneDatepickerCloseTypeDisabledTrue2 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20px] top-[459px] w-[250px]" data-name="direction=bottom, datepicker=open, type=空值, disabled=false">
        <DirectionBottomDatepickerOpenTypeDisabledFalse2 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[287px] top-[114px] w-[250px]" data-name="direction=top, datepicker=open, type=單選值, disabled=false">
        <DirectionTopDatepickerOpenTypeDisabledFalse1 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[554px] top-[114px] w-[250px]" data-name="direction=top, datepicker=open, type=連選值, disabled=false">
        <DirectionTopDatepickerOpenTypeDisabledFalse />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[287px] top-[24px] w-[250px]" data-name="direction=none, datepicker=close, type=單選值, disabled=false">
        <DirectionNoneDatepickerCloseTypeDisabledFalse1 />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col gap-[8px] items-start left-[287px] top-[69px] w-[250px]" data-name="direction=none, datepicker=close, type=單選值, disabled=true">
        <DirectionNoneDatepickerCloseTypeDisabledTrue1 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[554px] top-[24px] w-[250px]" data-name="direction=none, datepicker=close, type=連選值, disabled=false">
        <DirectionNoneDatepickerCloseTypeDisabledFalse />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col gap-[8px] items-start left-[554px] top-[69px] w-[250px]" data-name="direction=none, datepicker=close, type=連選值, disabled=true">
        <DirectionNoneDatepickerCloseTypeDisabledTrue />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[287px] top-[459px] w-[250px]" data-name="direction=bottom, datepicker=open, type=單選值, disabled=false">
        <DirectionBottomDatepickerOpenTypeDisabledFalse1 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[554px] top-[459px] w-[250px]" data-name="direction=bottom, datepicker=open, type=連選值, disabled=false">
        <DirectionBottomDatepickerOpenTypeDisabledFalse />
      </div>
    </div>
  );
}