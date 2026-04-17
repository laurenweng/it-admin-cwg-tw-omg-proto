import svgPaths from "./svg-s2qjgrp75b";

function CwButton() {
  return (
    <div className="box-border content-stretch flex h-[35px] items-center justify-center min-h-[35px] min-w-[100px] px-[15px] py-[5px] relative rounded-[4px] shrink-0" data-name="CwButton">
      <div aria-hidden="true" className="absolute border border-[#01579b] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Noto_Sans_TC:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#01579b] text-[14px] text-center text-nowrap">
        <p className="leading-[19.6px] whitespace-pre">取消</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Component 1">
          <path d={svgPaths.p16034800} fill="var(--fill-0, #01579B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="CwIcon">
      <Component1 />
    </div>
  );
}

function SlotText() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="slot-text">
      <div className="flex flex-col font-['Noto_Sans_TC:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#01579b] text-[14px] text-center text-nowrap">
        <p className="leading-[19.6px] whitespace-pre">編輯</p>
      </div>
    </div>
  );
}

function CwButton1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center min-h-[35px] min-w-[100px] px-[15px] py-[5px] relative rounded-[4px] shrink-0" data-name="CwButton">
      <div aria-hidden="true" className="absolute border border-[#01579b] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIcon />
      <SlotText />
    </div>
  );
}

function CwIcon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CwIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d={svgPaths.p2f64c1f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SlotText1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="slot-text">
      <div className="flex flex-col font-['Noto_Sans_TC:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[19.6px] whitespace-pre">新增</p>
      </div>
    </div>
  );
}

function CwButton2() {
  return (
    <div className="bg-[#01579b] box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center min-h-[35px] min-w-[100px] px-[15px] py-[5px] relative rounded-[4px] shrink-0" data-name="CwButton">
      <div aria-hidden="true" className="absolute border border-[#01579b] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIcon1 />
      <SlotText1 />
    </div>
  );
}

function CwIcon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CwIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d={svgPaths.p350e4130} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SlotText2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="slot-text">
      <div className="flex flex-col font-['Noto_Sans_TC:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[19.6px] whitespace-pre">刪除</p>
      </div>
    </div>
  );
}

function CwButton3() {
  return (
    <div className="bg-[#c00000] box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center min-h-[35px] min-w-[100px] px-[15px] py-[5px] relative rounded-[4px] shrink-0" data-name="CwButton">
      <div aria-hidden="true" className="absolute border border-[#c00000] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIcon2 />
      <SlotText2 />
    </div>
  );
}

export default function MoleculesButtonGroup() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="Molecules / button group">
      <CwButton />
      <CwButton1 />
      <CwButton2 />
      <CwButton3 />
    </div>
  );
}