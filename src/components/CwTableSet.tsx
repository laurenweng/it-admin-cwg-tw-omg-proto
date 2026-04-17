import React from 'react';
import { Search } from 'lucide-react';
import { CwSortTable, CwSortTableColumn } from './CwSortTable';
import { CwPagination } from './CwPagination';

export interface CwTableSetProps<T> {
  /** 標題 */
  title: string;
  /** 表格欄位定義 */
  columns: CwSortTableColumn<T>[];
  /** 資料來源 */
  dataSource: T[];
  /** 資料唯一識別鍵 */
  rowKey: keyof T;
  /** 是否顯示搜尋框（預設 true） */
  showSearch?: boolean;
  /** 搜尋框 placeholder */
  searchPlaceholder?: string;
  /** 搜尋關鍵字 */
  searchValue?: string;
  /** 搜尋變更回調 */
  onSearchChange?: (value: string) => void;
  /** 當前頁碼 */
  currentPage?: number;
  /** 每頁顯示筆數 */
  pageSize?: number;
  /** 總筆數 */
  totalItems?: number;
  /** 頁碼變更回調 */
  onPageChange?: (page: number) => void;
  /** 每頁顯示筆數變更回調 */
  onPageSizeChange?: (size: number) => void;
  /** 是否顯示分頁（預設 true） */
  showPagination?: boolean;
  /** 排序變更回調 */
  onSort?: (key: keyof T, direction: 'asc' | 'desc' | null) => void;
  /** 空狀態文字 */
  emptyText?: string;
}

export function CwTableSet<T extends Record<string, any>>({
  title,
  columns,
  dataSource,
  rowKey,
  showSearch = true,
  searchPlaceholder = '請輸入文字',
  searchValue = '',
  onSearchChange,
  currentPage = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  onPageSizeChange,
  showPagination = true,
  onSort,
  emptyText,
}: CwTableSetProps<T>) {
  const total = totalItems !== undefined ? totalItems : dataSource.length;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="content-stretch flex flex-col gap-[10px] items-end relative w-full">
      {/* 標題與搜尋 */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <h3 className="font-['Noto_Sans_TC',_sans-serif] font-medium leading-[normal] relative shrink-0 text-[#1c1c1c] text-nowrap whitespace-pre" style={{ fontSize: 'var(--text-lg)' }}>
          {title}
        </h3>
        {showSearch && (
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] relative shrink-0 text-[#1c1c1c] text-nowrap whitespace-pre" style={{ fontSize: 'var(--text-base)' }}>
              搜尋：
            </p>
            <div className="bg-white box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[12px] py-0 relative rounded-[4px] shrink-0 w-[200px]">
              <div aria-hidden="true" className="absolute border border-[#7c808c] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                <Search size={14} className="shrink-0 text-[#c4c9d3]" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="basis-0 font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] grow min-h-px min-w-px relative shrink-0 text-[#1c1c1c] bg-transparent border-none outline-none placeholder:text-[#cdcdcd]"
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 表格與分頁 */}
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
        <CwSortTable
          columns={columns}
          dataSource={dataSource}
          rowKey={rowKey}
          onSort={onSort}
          emptyText={emptyText}
        />
        
        {showPagination && (
          <CwPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={onPageChange || (() => {})}
            onPageSizeChange={onPageSizeChange || (() => {})}
          />
        )}
      </div>
    </div>
  );
}

CwTableSet.displayName = 'CwTableSet';