export default function CwTooltip() {
  return (
    <div className="bg-[rgba(28,28,28,0.8)] relative rounded-[4px] size-full" data-name="CwTooltip">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[5px] py-[2px] relative size-full">
          <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white">
            <p className="leading-[19.6px] whitespace-pre">下載</p>
          </div>
          <div className="absolute h-[6px] left-1/2 top-[-6px] translate-x-[-50%] w-[12px]" data-name="Border">
            <div aria-hidden="true" className="absolute border-[0px_6px_6px] border-[rgba(28,28,28,0.8)] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}