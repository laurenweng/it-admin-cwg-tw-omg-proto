function BackgroundBorder() {
  return (
    <div className="bg-[#f4f4f4] relative rounded-[10px] shrink-0 size-[20px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute bg-[#555555] left-1/2 rounded-[5px] size-[10px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Background" />
    </div>
  );
}

function CwRadio() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[29.16px] top-[27px]" data-name="CwRadio">
      <BackgroundBorder />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[16.5px] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] w-[84.33px]">
        <p className="leading-[19.6px]">結清併入新約</p>
      </div>
    </div>
  );
}

function CwRadio1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[29.16px] top-[61px]" data-name="CwRadio">
      <div className="bg-[#f4f4f4] relative rounded-[10px] shrink-0 size-[20px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[16.5px] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] w-[28.369px]">
        <p className="leading-[19.6px]">結清</p>
      </div>
    </div>
  );
}

function CwRadio2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[29.16px] top-[95px]" data-name="CwRadio">
      <div className="bg-[#e9ebf2] relative rounded-[10px] shrink-0 size-[20px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[16.5px] justify-center leading-[0] relative shrink-0 text-[#7c808c] text-[14px] w-[84.33px]">
        <p className="leading-[19.6px]">結清併入新約</p>
      </div>
    </div>
  );
}

function CwRadio3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[56.369px]" data-name="CwRadio">
      <div className="bg-[#fff6f4] relative rounded-[10px] shrink-0 size-[20px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-[#c00000] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[16.5px] justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[14px] w-[28.369px]">
        <p className="leading-[19.6px]">結清</p>
      </div>
    </div>
  );
}

function CwRadio4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-start left-[29px] top-[129px] w-[72.311px]" data-name="CwRadio">
      <CwRadio3 />
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[16.8px] leading-[16.8px] relative shrink-0 text-[#c00000] text-[12px] w-full">這是錯誤訊息</p>
    </div>
  );
}

export default function Frame11266() {
  return (
    <div className="bg-white relative size-full">
      <CwRadio />
      <CwRadio1 />
      <CwRadio2 />
      <CwRadio4 />
    </div>
  );
}