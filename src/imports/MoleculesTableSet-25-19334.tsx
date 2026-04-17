import svgPaths from "./svg-556ok6hbt9";

function CwIcon() {
  return (
    <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="CwIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_8_4097)" id="CwIcon">
          <path d={svgPaths.p125fe80} fill="var(--fill-0, #C4C9D3)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_8_4097">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CwIcon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="CwIcon">
      <CwIcon />
    </div>
  );
}

function Frame23() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
      <CwIcon1 />
      <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#cdcdcd] text-[14px]">請輸入文字</p>
    </div>
  );
}

function CwInput() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 w-[200px]" data-name="CwInput">
      <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame23 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">搜尋：</p>
      <CwInput />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#1c1c1c] text-[20px] text-nowrap whitespace-pre">標題名稱</p>
      <Frame4 />
    </div>
  );
}

function CwIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="CwIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="CwIcon">
          <path d={svgPaths.p1c6de0f0} fill="var(--fill-0, #7C808C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame1 key={i} />
      ))}
    </div>
  );
}

function Frame17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">內容</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame17 key={i} />
      ))}
    </div>
  );
}

function Frame27() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">內容</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(4).keys()].map((_, i) => (
        <Frame27 key={i} />
      ))}
    </div>
  );
}

function CwTable() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame15 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame21 key={i} />
      ))}
      <Frame6 />
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[15px] relative w-[11.003px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 15">
        <g id="Group 1">
          <path d={svgPaths.p3bfca280} fill="var(--fill-0, #C4C9D3)" id="Vector" />
          <rect fill="var(--fill-0, #C4C9D3)" height="15" id="Vertical Divider" rx="1" width="2" x="9.00262" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute flex h-[15px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[11.003px]" style={{ top: "calc(50% + 0.5px)", left: "calc(50% - 0.501px)" }}>
        <div className="flex-none rotate-[180deg]">
          <Group1 />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g id="Group 1">
          <path d={svgPaths.p124c5e80} fill="var(--fill-0, #C4C9D3)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute flex inset-[15%_30.62%_17.47%_30%] items-center justify-center">
        <div className="flex-none h-[13.505px] rotate-[180deg] w-[7.877px]">
          <Group2 />
        </div>
      </div>
    </div>
  );
}

function CwInput1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 w-[60px]" data-name="CwInput">
      <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px] text-center">1</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <CwInput1 />
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap whitespace-pre">/</p>
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] w-[18px]">10</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[15%_30.62%_17.47%_30%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g id="Group 1">
          <path d={svgPaths.p124c5e80} fill="var(--fill-0, #1C1C1C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon8() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute h-[15px] translate-x-[-50%] translate-y-[-50%] w-[11.003px]" style={{ top: "calc(50% + 0.5px)", left: "calc(50% - 0.499px)" }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 15">
        <g id="Group 1">
          <path d={svgPaths.p3bfca280} fill="var(--fill-0, #1C1C1C)" id="Vector" />
          <rect fill="var(--fill-0, #1C1C1C)" height="15" id="Vertical Divider" rx="1" width="2" x="9.00262" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon9() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <Group4 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <CwIcon6 />
      <CwIcon7 />
      <Frame31 />
      <CwIcon8 />
      <CwIcon9 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute left-0 size-[12px] top-0" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Component 1">
          <path d={svgPaths.p3d0f1180} fill="var(--fill-0, #1C1C1C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute left-1/2 size-[12px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <Component1 />
    </div>
  );
}

function CwIcon10() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="CwIcon">
      <Frame16 />
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 size-[18px]" data-name="icon">
      <CwIcon10 />
    </div>
  );
}

function CwInput2() {
  return (
    <div className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-full" data-name="CwInput">
      <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
          <p className="basis-0 font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">10 / page</p>
          <Icon />
        </div>
      </div>
    </div>
  );
}

function BaseCwPaginationPagesSelector() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[120px]" data-name="_Base / CwPagination / pages selector">
      <CwInput2 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">1 - 10</p>
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">of</p>
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">100</p>
      <BaseCwPaginationPagesSelector />
    </div>
  );
}

function CwPagination() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="CwPagination">
      <Frame8 />
      <Frame32 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <CwTable />
      <CwPagination />
    </div>
  );
}

export default function MoleculesTableSet() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-end relative size-full" data-name="Molecules / table set">
      <Frame10 />
      <Frame9 />
    </div>
  );
}