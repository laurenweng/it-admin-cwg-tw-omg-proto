import svgPaths from "./svg-hab56z9clt";

function Link() {
  return (
    <div className="h-[28px] overflow-clip relative shrink-0 w-[250px]" data-name="Link">
      <div className="absolute flex flex-col font-['Noto_Sans_TC:Light',_sans-serif] font-light h-[28px] justify-center leading-[0] left-[85px] text-[20px] text-white top-[14px] translate-y-[-50%] w-[80.323px]">
        <p className="leading-[28px]">客服系統</p>
      </div>
    </div>
  );
}

function CwIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="CwIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="CwIcon">
          <path d={svgPaths.p2b877d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11274() {
  return (
    <div className="absolute content-stretch flex gap-[35px] items-center left-0 top-[14.5px]">
      <Link />
      <CwIcon />
    </div>
  );
}

function CwIcon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CwIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d={svgPaths.p2ad9bf90} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[14px] items-center left-[1345.75px] top-[17.3px]">
      <CwIcon1 />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] h-[22.4px] justify-center leading-[0] relative shrink-0 text-[16px] text-white w-[48.347px]">
        <p className="leading-[22.4px]">翁羽汝</p>
      </div>
    </div>
  );
}

export default function CwHeader() {
  return (
    <div className="bg-[#7eaa82] relative size-full" data-name="CwHeader">
      <Frame11274 />
      <Frame1 />
    </div>
  );
}