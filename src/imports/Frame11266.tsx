import svgPaths from "./svg-495l9f1hqz";

function CwCheckbox() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[45px]" data-name="CwCheckbox">
      <div className="bg-white relative rounded-[5px] shrink-0 size-[20px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[5px]" />
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap">
        <p className="leading-[19.6px] whitespace-pre">基本勾選</p>
      </div>
    </div>
  );
}

function CwCheckbox1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[129px]" data-name="CwCheckbox">
      <div className="bg-[#f4f4f4] relative rounded-[5px] shrink-0 size-[20px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-[5px]" />
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#7c808c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">禁用</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Background+Border">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Background+Border">
          <path d={svgPaths.p23478671} fill="var(--fill-0, #01579B)" />
          <path d={svgPaths.p23478671} stroke="var(--stroke-0, #01579B)" />
          <path d={svgPaths.pf9cce00} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function CwCheckbox2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[73px]" data-name="CwCheckbox">
      <BackgroundBorder />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">改版</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#01579b] relative rounded-[5px] shrink-0 size-[20px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#01579b] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="absolute bg-white h-[2px] left-[3px] top-[9px] w-[14px]" data-name="Horizontal Divider" />
    </div>
  );
}

function CwCheckbox3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[38px] top-[101px]" data-name="CwCheckbox">
      <BackgroundBorder1 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">改版</p>
      </div>
    </div>
  );
}

function Bcrm() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="bcrm">
      <div className="bg-[#fff6f4] relative rounded-[5px] shrink-0 size-[20px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#c00000] border-solid inset-0 pointer-events-none rounded-[5px]" />
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">改版</p>
      </div>
    </div>
  );
}

function CwCheckbox4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[38px] top-[157px] w-[72.311px]" data-name="CwCheckbox">
      <Bcrm />
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[16.8px] leading-[16.8px] relative shrink-0 text-[#c00000] text-[12px] w-full">這是錯誤訊息</p>
    </div>
  );
}

export default function Frame11266() {
  return (
    <div className="bg-white relative size-full">
      <CwCheckbox />
      <CwCheckbox1 />
      <CwCheckbox2 />
      <CwCheckbox3 />
      <CwCheckbox4 />
    </div>
  );
}