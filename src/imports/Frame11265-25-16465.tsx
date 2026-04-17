import svgPaths from "./svg-pbn6s9gttt";
import imgImage from "figma:asset/f75db175b92e7a875504f15622cffaa8ab456505.png";

function Frame1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame1 key={i} />
      ))}
    </div>
  );
}

function Frame11() {
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

function Frame15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame11 key={i} />
      ))}
    </div>
  );
}

function Frame20() {
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
        <Frame20 key={i} />
      ))}
    </div>
  );
}

function CwTable() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[806px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame9 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame15 key={i} />
      ))}
      <Frame6 />
    </div>
  );
}

function CwIcon() {
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

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon />
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame24 key={i} />
      ))}
    </div>
  );
}

function Frame32() {
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

function Frame36() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame32 key={i} />
      ))}
    </div>
  );
}

function Frame42() {
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

function Frame46() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(4).keys()].map((_, i) => (
        <Frame42 key={i} />
      ))}
    </div>
  );
}

function CwTable1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[806px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame31 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame36 key={i} />
      ))}
      <Frame46 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(3).keys()].map((_, i) => (
        <Frame47 key={i} />
      ))}
    </div>
  );
}

function Frame51() {
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

function Frame54() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(3).keys()].map((_, i) => (
        <Frame51 key={i} />
      ))}
    </div>
  );
}

function Frame59() {
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

function Frame62() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(3).keys()].map((_, i) => (
        <Frame59 key={i} />
      ))}
    </div>
  );
}

function CwTable2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[568px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame50 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame54 key={i} />
      ))}
      <Frame62 />
    </div>
  );
}

function CwIcon4() {
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

function Frame63() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon4 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame63 />
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(3).keys()].map((_, i) => (
        <Frame64 key={i} />
      ))}
    </div>
  );
}

function Frame70() {
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

function Frame73() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(3).keys()].map((_, i) => (
        <Frame70 key={i} />
      ))}
    </div>
  );
}

function Frame78() {
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

function Frame81() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(3).keys()].map((_, i) => (
        <Frame78 key={i} />
      ))}
    </div>
  );
}

function CwTable3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[568px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame69 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame73 key={i} />
      ))}
      <Frame81 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(2).keys()].map((_, i) => (
        <Frame82 key={i} />
      ))}
    </div>
  );
}

function Frame85() {
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

function Frame87() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(2).keys()].map((_, i) => (
        <Frame85 key={i} />
      ))}
    </div>
  );
}

function Frame91() {
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

function Frame93() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(2).keys()].map((_, i) => (
        <Frame91 key={i} />
      ))}
    </div>
  );
}

function CwTable4() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[330px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame84 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame87 key={i} />
      ))}
      <Frame93 />
    </div>
  );
}

function CwIcon7() {
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

function Frame94() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon7 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame94 />
        </div>
      </div>
    </div>
  );
}

function Frame98() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(2).keys()].map((_, i) => (
        <Frame95 key={i} />
      ))}
    </div>
  );
}

function Frame99() {
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

function Frame101() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(2).keys()].map((_, i) => (
        <Frame99 key={i} />
      ))}
    </div>
  );
}

function Frame105() {
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

function Frame107() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(2).keys()].map((_, i) => (
        <Frame105 key={i} />
      ))}
    </div>
  );
}

function CwTable5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[330px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame98 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame101 key={i} />
      ))}
      <Frame107 />
    </div>
  );
}

function Frame108() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame109() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame108 />
    </div>
  );
}

function Frame110() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">內容</p>
        </div>
      </div>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame110 />
    </div>
  );
}

function Frame114() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:Medium',_sans-serif] font-medium leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">內容</p>
        </div>
      </div>
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame114 />
    </div>
  );
}

function CwTable6() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[92px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame109 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame111 key={i} />
      ))}
      <Frame115 />
    </div>
  );
}

function CwIcon9() {
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

function Frame116() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon9 />
    </div>
  );
}

function Frame117() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame116 />
        </div>
      </div>
    </div>
  );
}

function Frame118() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame117 />
    </div>
  );
}

function Frame119() {
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

function Frame120() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame119 />
    </div>
  );
}

function Frame123() {
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

function Frame124() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame123 />
    </div>
  );
}

function CwTable7() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[92px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame118 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame120 key={i} />
      ))}
      <Frame124 />
    </div>
  );
}

function Frame125() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame129() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(5).keys()].map((_, i) => (
        <Frame125 key={i} />
      ))}
    </div>
  );
}

function Frame130() {
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

function Frame135() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(5).keys()].map((_, i) => (
        <Frame130 key={i} />
      ))}
    </div>
  );
}

function Frame142() {
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

function Frame147() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(5).keys()].map((_, i) => (
        <Frame142 key={i} />
      ))}
    </div>
  );
}

function CwTable8() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[1044px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame129 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame135 key={i} />
      ))}
      <Frame147 />
    </div>
  );
}

function CwIcon10() {
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

function Frame148() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon10 />
    </div>
  );
}

function Frame149() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame148 />
        </div>
      </div>
    </div>
  );
}

function Frame158() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(5).keys()].map((_, i) => (
        <Frame149 key={i} />
      ))}
    </div>
  );
}

function Frame159() {
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

function Frame164() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(5).keys()].map((_, i) => (
        <Frame159 key={i} />
      ))}
    </div>
  );
}

function Frame171() {
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

function Frame176() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(5).keys()].map((_, i) => (
        <Frame171 key={i} />
      ))}
    </div>
  );
}

function CwTable9() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[1044px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame158 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame164 key={i} />
      ))}
      <Frame176 />
    </div>
  );
}

function Frame177() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame183() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(6).keys()].map((_, i) => (
        <Frame177 key={i} />
      ))}
    </div>
  );
}

function Frame184() {
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

function Frame190() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(6).keys()].map((_, i) => (
        <Frame184 key={i} />
      ))}
    </div>
  );
}

function Frame198() {
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

function Frame204() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(6).keys()].map((_, i) => (
        <Frame198 key={i} />
      ))}
    </div>
  );
}

function CwTable10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[1282px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame183 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame190 key={i} />
      ))}
      <Frame204 />
    </div>
  );
}

function CwIcon15() {
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

function Frame205() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon15 />
    </div>
  );
}

function Frame206() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame205 />
        </div>
      </div>
    </div>
  );
}

function Frame217() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(6).keys()].map((_, i) => (
        <Frame206 key={i} />
      ))}
    </div>
  );
}

function Frame218() {
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

function Frame224() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(6).keys()].map((_, i) => (
        <Frame218 key={i} />
      ))}
    </div>
  );
}

function Frame232() {
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

function Frame238() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(6).keys()].map((_, i) => (
        <Frame232 key={i} />
      ))}
    </div>
  );
}

function CwTable11() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[1282px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame217 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame224 key={i} />
      ))}
      <Frame238 />
    </div>
  );
}

function Frame239() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame246() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(7).keys()].map((_, i) => (
        <Frame239 key={i} />
      ))}
    </div>
  );
}

function Frame247() {
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

function Frame254() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(7).keys()].map((_, i) => (
        <Frame247 key={i} />
      ))}
    </div>
  );
}

function Frame263() {
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

function Frame270() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(7).keys()].map((_, i) => (
        <Frame263 key={i} />
      ))}
    </div>
  );
}

function CwTable12() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[1520px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame246 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame254 key={i} />
      ))}
      <Frame270 />
    </div>
  );
}

function CwIcon21() {
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

function Frame271() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon21 />
    </div>
  );
}

function Frame272() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame271 />
        </div>
      </div>
    </div>
  );
}

function Frame285() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(7).keys()].map((_, i) => (
        <Frame272 key={i} />
      ))}
    </div>
  );
}

function Frame286() {
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

function Frame293() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(7).keys()].map((_, i) => (
        <Frame286 key={i} />
      ))}
    </div>
  );
}

function Frame302() {
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

function Frame309() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(7).keys()].map((_, i) => (
        <Frame302 key={i} />
      ))}
    </div>
  );
}

function CwTable13() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[1520px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame285 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame293 key={i} />
      ))}
      <Frame309 />
    </div>
  );
}

function Frame310() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame317() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(8).keys()].map((_, i) => (
        <Frame310 key={i} />
      ))}
    </div>
  );
}

function Frame318() {
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

function Frame326() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(8).keys()].map((_, i) => (
        <Frame318 key={i} />
      ))}
    </div>
  );
}

function Frame336() {
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

function Frame344() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(8).keys()].map((_, i) => (
        <Frame336 key={i} />
      ))}
    </div>
  );
}

function CwTable14() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[77px] rounded-[4px] top-[1758px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame317 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame326 key={i} />
      ))}
      <Frame344 />
    </div>
  );
}

function CwIcon28() {
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

function Frame345() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon28 />
    </div>
  );
}

function Frame346() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame345 />
        </div>
      </div>
    </div>
  );
}

function Frame361() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(8).keys()].map((_, i) => (
        <Frame346 key={i} />
      ))}
    </div>
  );
}

function Frame362() {
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

function Frame370() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {[...Array(8).keys()].map((_, i) => (
        <Frame362 key={i} />
      ))}
    </div>
  );
}

function Frame380() {
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

function Frame388() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      {[...Array(8).keys()].map((_, i) => (
        <Frame380 key={i} />
      ))}
    </div>
  );
}

function CwTable15() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[2633px] rounded-[4px] top-[1758px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame361 />
      {[...Array(2).keys()].map((_, i) => (
        <Frame370 key={i} />
      ))}
      <Frame388 />
    </div>
  );
}

function Frame389() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame393() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame389 key={i} />
      ))}
    </div>
  );
}

function ImageWrap() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable16() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[806px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame393 />
      <CwIconEmptyStates />
    </div>
  );
}

function ImageWrap1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap1 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon36() {
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

function Frame394() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon36 />
    </div>
  );
}

function Frame395() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame394 />
        </div>
      </div>
    </div>
  );
}

function Frame402() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(4).keys()].map((_, i) => (
        <Frame395 key={i} />
      ))}
    </div>
  );
}

function CwTable17() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[806px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates1 />
      <Frame402 />
    </div>
  );
}

function Frame403() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame406() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(3).keys()].map((_, i) => (
        <Frame403 key={i} />
      ))}
    </div>
  );
}

function ImageWrap2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates2() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap2 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable18() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[568px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame406 />
      <CwIconEmptyStates2 />
    </div>
  );
}

function ImageWrap3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates3() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap3 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon40() {
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

function Frame407() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon40 />
    </div>
  );
}

function Frame408() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame407 />
        </div>
      </div>
    </div>
  );
}

function Frame413() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(3).keys()].map((_, i) => (
        <Frame408 key={i} />
      ))}
    </div>
  );
}

function CwTable19() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[568px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates3 />
      <Frame413 />
    </div>
  );
}

function Frame414() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame416() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(2).keys()].map((_, i) => (
        <Frame414 key={i} />
      ))}
    </div>
  );
}

function ImageWrap4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates4() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap4 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable20() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[330px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame416 />
      <CwIconEmptyStates4 />
    </div>
  );
}

function ImageWrap5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap5 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon43() {
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

function Frame417() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon43 />
    </div>
  );
}

function Frame418() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame417 />
        </div>
      </div>
    </div>
  );
}

function Frame421() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(2).keys()].map((_, i) => (
        <Frame418 key={i} />
      ))}
    </div>
  );
}

function CwTable21() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[330px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates5 />
      <Frame421 />
    </div>
  );
}

function Frame422() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame423() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame422 />
    </div>
  );
}

function ImageWrap6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates6() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap6 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable22() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[92px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame423 />
      <CwIconEmptyStates6 />
    </div>
  );
}

function ImageWrap7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates7() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap7 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon45() {
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

function Frame424() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon45 />
    </div>
  );
}

function Frame425() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame424 />
        </div>
      </div>
    </div>
  );
}

function Frame426() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame425 />
    </div>
  );
}

function CwTable23() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[92px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates7 />
      <Frame426 />
    </div>
  );
}

function Frame427() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame432() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(5).keys()].map((_, i) => (
        <Frame427 key={i} />
      ))}
    </div>
  );
}

function ImageWrap8() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates8() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap8 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable24() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[1044px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame432 />
      <CwIconEmptyStates8 />
    </div>
  );
}

function ImageWrap9() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates9() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap9 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon46() {
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

function Frame433() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon46 />
    </div>
  );
}

function Frame434() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame433 />
        </div>
      </div>
    </div>
  );
}

function Frame443() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(5).keys()].map((_, i) => (
        <Frame434 key={i} />
      ))}
    </div>
  );
}

function CwTable25() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[1044px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates9 />
      <Frame443 />
    </div>
  );
}

function Frame444() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame450() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(6).keys()].map((_, i) => (
        <Frame444 key={i} />
      ))}
    </div>
  );
}

function ImageWrap10() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates10() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap10 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable26() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[1282px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame450 />
      <CwIconEmptyStates10 />
    </div>
  );
}

function ImageWrap11() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates11() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap11 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon51() {
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

function Frame451() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon51 />
    </div>
  );
}

function Frame452() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame451 />
        </div>
      </div>
    </div>
  );
}

function Frame463() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(6).keys()].map((_, i) => (
        <Frame452 key={i} />
      ))}
    </div>
  );
}

function CwTable27() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[1282px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates11 />
      <Frame463 />
    </div>
  );
}

function Frame464() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame471() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(7).keys()].map((_, i) => (
        <Frame464 key={i} />
      ))}
    </div>
  );
}

function ImageWrap12() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates12() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap12 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable28() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[1520px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame471 />
      <CwIconEmptyStates12 />
    </div>
  );
}

function CwIcon57() {
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

function Frame472() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon57 />
    </div>
  );
}

function Frame473() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame472 />
        </div>
      </div>
    </div>
  );
}

function Frame486() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(7).keys()].map((_, i) => (
        <Frame473 key={i} />
      ))}
    </div>
  );
}

function ImageWrap13() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates13() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap13 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable29() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[1520px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame486 />
      <CwIconEmptyStates13 />
    </div>
  );
}

function Frame487() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] w-full">項目</p>
        </div>
      </div>
    </div>
  );
}

function Frame495() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(8).keys()].map((_, i) => (
        <Frame487 key={i} />
      ))}
    </div>
  );
}

function ImageWrap14() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates14() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap14 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwTable30() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[1225px] rounded-[4px] top-[1758px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame495 />
      <CwIconEmptyStates14 />
    </div>
  );
}

function ImageWrap15() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

function CwIconEmptyStates15() {
  return (
    <div className="absolute content-stretch flex flex-col items-center translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="CwIcon/empty-states" style={{ top: "calc(50% + 24.5px)", left: "calc(50% + 0.5px)" }}>
      <ImageWrap15 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}

function CwIcon64() {
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

function Frame496() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[19.6px] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">項目</p>
      <CwIcon64 />
    </div>
  );
}

function Frame497() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[10px] py-[15px] relative w-full">
          <Frame496 />
        </div>
      </div>
    </div>
  );
}

function Frame512() {
  return (
    <div className="bg-[#e9ebf2] content-stretch flex items-center relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#cdcdcd] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      {[...Array(8).keys()].map((_, i) => (
        <Frame497 key={i} />
      ))}
    </div>
  );
}

function CwTable31() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[200px] items-start left-[3781px] rounded-[4px] top-[1758px] w-[1115px]" data-name="CwTable">
      <div aria-hidden="true" className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <CwIconEmptyStates15 />
      <Frame512 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute h-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[8.75px]" data-name="Component 1" style={{ left: "calc(50% + 0.375px)" }}>
      <div className="absolute bottom-0 left-[-0.02%] right-[-0.02%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
          <g id="Component 1">
            <path d={svgPaths.p126fa300} fill="var(--fill-0, #7C808C)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BaseCwTableSortIcon() {
  return (
    <div className="absolute left-[77px] overflow-clip size-[18px] top-[2262px]" data-name="_Base / CwTable / sort icon">
      <Component1 />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute h-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[8.75px]" data-name="Component 1" style={{ left: "calc(50% + 0.375px)" }}>
      <div className="absolute bottom-0 left-[-0.02%] right-[-0.02%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
          <g id="Component 1">
            <path d={svgPaths.p1ff2f200} fill="var(--fill-0, #7C808C)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BaseCwTableSortIcon1() {
  return (
    <div className="absolute left-[109px] overflow-clip size-[18px] top-[2262px]" data-name="_Base / CwTable / sort icon">
      <Component2 />
    </div>
  );
}

function Component3() {
  return (
    <div className="absolute h-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[8.75px]" data-name="Component 1" style={{ left: "calc(50% + 0.375px)" }}>
      <div className="absolute bottom-0 left-0 right-[-0.02%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
          <g id="Component 1">
            <path d={svgPaths.p18612700} fill="var(--fill-0, #7C808C)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BaseCwTableSortIcon2() {
  return (
    <div className="absolute left-[141px] overflow-clip size-[18px] top-[2262px]" data-name="_Base / CwTable / sort icon">
      <Component3 />
    </div>
  );
}

export default function Frame11265() {
  return (
    <div className="bg-white relative size-full">
      <CwTable />
      <CwTable1 />
      <CwTable2 />
      <CwTable3 />
      <CwTable4 />
      <CwTable5 />
      <CwTable6 />
      <CwTable7 />
      <CwTable8 />
      <CwTable9 />
      <CwTable10 />
      <CwTable11 />
      <CwTable12 />
      <CwTable13 />
      <CwTable14 />
      <CwTable15 />
      <CwTable16 />
      <CwTable17 />
      <CwTable18 />
      <CwTable19 />
      <CwTable20 />
      <CwTable21 />
      <CwTable22 />
      <CwTable23 />
      <CwTable24 />
      <CwTable25 />
      <CwTable26 />
      <CwTable27 />
      <CwTable28 />
      <CwTable29 />
      <CwTable30 />
      <CwTable31 />
      <BaseCwTableSortIcon />
      <BaseCwTableSortIcon1 />
      <BaseCwTableSortIcon2 />
    </div>
  );
}