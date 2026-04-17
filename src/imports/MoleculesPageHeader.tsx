function Link() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_0.8px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#7c808c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">首頁</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#cdcdcd] border-[0px_0px_0.8px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#222327] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">客制單查詢</p>
      </div>
    </div>
  );
}

function CwBreadcrumbs() {
  return (
    <div className="content-stretch flex gap-[5.6px] items-center relative shrink-0" data-name="CwBreadcrumbs">
      <Link />
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7c808c] text-[12.6px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">/</p>
      </div>
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] relative shrink-0 text-[#7c808c] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">ERP查詢</p>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7c808c] text-[12.6px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">/</p>
      </div>
      <Link1 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="basis-0 flex flex-col font-['Inter:Medium',_'Noto_Sans_JP:Medium',_sans-serif] font-medium grow h-[22.8px] justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1c1c1c] text-[24px]">
        <p className="leading-[normal]">個案列表</p>
      </div>
      <CwBreadcrumbs />
    </div>
  );
}

export default function MoleculesPageHeader() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[10px] relative size-full" data-name="Molecules / page header">
      <Frame87 />
    </div>
  );
}