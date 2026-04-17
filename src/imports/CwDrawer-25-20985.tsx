import svgPaths from "./svg-xmyjr9hq1k";

function Component1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_25_20835)" id="Component 1">
          <path d={svgPaths.p1f94f780} fill="var(--fill-0, #7C808C)" id="Vector" stroke="var(--stroke-1, #7C808C)" strokeWidth="0.54413" />
        </g>
        <defs>
          <clipPath id="clip0_25_20835">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Leave1Cf30D9CSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[14px]" data-name="leave-1cf30d9c.svg fill">
      <Component1 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Image">
      <Leave1Cf30D9CSvgFill />
    </div>
  );
}

function CwIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <Image />
    </div>
  );
}

function Component12() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[26px]" data-name="Component 12">
      <CwIcon />
    </div>
  );
}

function Group1() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g id="Group 1">
          <path d={svgPaths.p124c5e80} fill="var(--fill-0, #1C1C1C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute flex inset-[30%_15%_30.62%_17.47%] items-center justify-center">
        <div className="flex-none h-[13.505px] rotate-[90deg] w-[7.877px]">
          <Group1 />
        </div>
      </div>
    </div>
  );
}

function Component13() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[26px]" data-name="Component 13">
      <CwIcon1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g id="Group 1">
          <path d={svgPaths.p124c5e80} fill="var(--fill-0, #1C1C1C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CwIcon2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute flex inset-[30.62%_17.47%_30%_15%] items-center justify-center">
        <div className="flex-none h-[13.505px] rotate-[270deg] w-[7.877px]">
          <Group2 />
        </div>
      </div>
    </div>
  );
}

function Component14() {
  return (
    <div className="box-border content-stretch flex items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[26px]" data-name="Component 14">
      <CwIcon2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full" data-name="Container">
      <Component12 />
      <Component13 />
      <Component14 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full" data-name="Margin">
      <Container />
    </div>
  );
}

function Container1() {
  return <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" data-name="Container" />;
}

function Background() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0 w-full" data-name="Background">
      <div className="overflow-auto size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[24px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

export default function CwDrawer() {
  return (
    <div className="bg-white relative size-full" data-name="CwDrawer">
      <div className="max-w-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit min-w-inherit pl-[21px] pr-[20px] py-[20px] relative size-full">
          <Margin />
          <Background />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.5px] border-[rgba(28,28,28,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}