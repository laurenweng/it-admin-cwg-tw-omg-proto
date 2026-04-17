import svgPaths from "./svg-n5swa2v9wg";

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-[70px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative w-[70px]">
        <p className="absolute font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] leading-[21px] left-0 text-[#cdcdcd] text-[14px] text-nowrap top-[-1.5px] whitespace-pre">請選擇項目</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[21px] items-center overflow-clip relative w-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[31.23%_6.24%_18.75%_6.24%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 6">
          <path d={svgPaths.p27c7fe00} fill="var(--fill-0, #1C1C1C)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[12px]">
        <Icon />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[35px] items-center justify-between left-0 pl-[12px] pr-[14px] py-0 rounded-[4px] top-0 w-[200px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[35px] left-0 rounded-[4px] top-0 w-[200px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

export default function CwSelect() {
  return (
    <div className="relative size-full" data-name="CwSelect">
      <Container2 />
      <Container3 />
    </div>
  );
}