import { useState } from "react";
import { CwInput } from "./CwInput";
import svgPaths from "../imports/svg-o4v9zcm50l";

interface CwPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

// 導航圖標組件
function Group1({ disabled }: { disabled?: boolean }) {
  return (
    <div className="h-[15px] relative w-[11.003px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 15">
        <g id="Group 1">
          <path d={svgPaths.p3bfca280} fill={disabled ? "#C4C9D3" : "#1C1C1C"} id="Vector" />
          <rect fill={disabled ? "#C4C9D3" : "#1C1C1C"} height="15" id="Vertical Divider" rx="1" width="2" x="9.00262" />
        </g>
      </svg>
    </div>
  );
}

function FirstPageIcon({ disabled }: { disabled?: boolean }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute flex h-[15px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[11.003px]" style={{ top: "calc(50% + 0.5px)", left: "calc(50% - 0.501px)" }}>
        <div className="flex-none rotate-[180deg]">
          <Group1 disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

function Group2({ disabled }: { disabled?: boolean }) {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g id="Group 1">
          <path d={svgPaths.p124c5e80} fill={disabled ? "#C4C9D3" : "#1C1C1C"} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function PrevPageIcon({ disabled }: { disabled?: boolean }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute flex inset-[15%_30.62%_17.47%_30%] items-center justify-center">
        <div className="flex-none h-[13.505px] rotate-[180deg] w-[7.877px]">
          <Group2 disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

function NextPageIcon({ disabled }: { disabled?: boolean }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute inset-[15%_30.62%_17.47%_30%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
          <g id="Group 1">
            <path d={svgPaths.p124c5e80} fill={disabled ? "#C4C9D3" : "#1C1C1C"} id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LastPageIcon({ disabled }: { disabled?: boolean }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="CwIcon">
      <div className="absolute h-[15px] translate-x-[-50%] translate-y-[-50%] w-[11.003px]" style={{ top: "calc(50% + 0.5px)", left: "calc(50% - 0.499px)" }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 15">
          <g id="Group 1">
            <path d={svgPaths.p3bfca280} fill={disabled ? "#C4C9D3" : "#1C1C1C"} id="Vector" />
            <rect fill={disabled ? "#C4C9D3" : "#1C1C1C"} height="15" id="Vertical Divider" rx="1" width="2" x="9.00262" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DropdownIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="CwIcon">
      <div className="absolute left-1/2 size-[12px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="absolute left-0 size-[12px] top-0" data-name="Component 1">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <g id="Component 1">
              <path d={svgPaths.p3d0f1180} fill="#1C1C1C" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function CwPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100]
}: CwPaginationProps) {
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageInputChange = (value: string) => {
    setInputPage(value);
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(inputPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  return (
    <div className="content-stretch flex items-center justify-between relative w-full" data-name="CwPagination">
      {/* 左側導航 */}
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="第一頁"
        >
          <FirstPageIcon disabled={currentPage === 1} />
        </button>
        
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="上一頁"
        >
          <PrevPageIcon disabled={currentPage === 1} />
        </button>
        
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
          <CwInput
            type="number"
            value={inputPage}
            onChange={(e) => handlePageInputChange(e.target.value)}
            onBlur={handlePageInputBlur}
            onKeyDown={handlePageInputKeyDown}
            textAlign="center"
            width="w-[60px]"
            aria-label="當前頁碼"
          />
          
          <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[12px] text-nowrap whitespace-pre">/</p>
          
          <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] w-[18px]">{totalPages}</p>
        </div>
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="下一頁"
        >
          <NextPageIcon disabled={currentPage === totalPages} />
        </button>
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="最後一頁"
        >
          <LastPageIcon disabled={currentPage === totalPages} />
        </button>
      </div>
      
      {/* 右側資訊 */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
        <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-[14px] text-nowrap whitespace-pre">
          第 {startItem} - {endItem} of {totalItems}
        </p>
        
        {/* 每頁數量選擇器 */}
        {onPageSizeChange && (
          <div className="relative">
            <button
              onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
              className="bg-white h-[35px] relative rounded-[4px] shrink-0 w-[120px]"
              aria-label="選擇每頁顯示數量"
            >
              <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
                  <p className="basis-0 font-['Noto_Sans_TC',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#1c1c1c] text-[14px]">
                    {pageSize} / page
                  </p>
                  <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 size-[18px]">
                    <DropdownIcon />
                  </div>
                </div>
              </div>
            </button>
            
            {/* 下拉選單 */}
            {showPageSizeDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowPageSizeDropdown(false)}
                />
                <div className="absolute top-full mt-1 right-0 bg-white border border-[#7c808c] rounded-[4px] shadow-lg z-20 w-[120px]">
                  {pageSizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        onPageSizeChange(size);
                        setShowPageSizeDropdown(false);
                        onPageChange(1); // 重置到第一頁
                      }}
                      className="w-full px-[12px] py-[8px] text-left hover:bg-gray-100 font-['Noto_Sans_TC',_sans-serif] font-[350] text-[14px] text-[#1c1c1c]"
                    >
                      {size} / page
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}