import { ReactNode, useState } from "react";
import svgPaths from "../imports/svg-pbn6s9gttt";
import { CwEmptyState } from "./CwEmptyState";

// 排序方向
export type SortDirection = 'asc' | 'desc' | null;

// 表格欄位定義
export interface CwSortTableColumn<T = any> {
  /** 欄位唯一識別 */
  key: string;
  /** 欄位標題 */
  title: string;
  /** 
   * 欄位寬度設定
   * - 設定固定寬度時使用像素值（例如 "60px" 或 "120px"）
   * - 不設定時欄位會自動填滿剩餘空間（使用 auto）
   * - 當有多個固定寬度欄位時，表格會自動支援左右捲動
   */
  width?: string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 自定義渲染函數 */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** 欄位對齊方式 */
  align?: 'left' | 'center' | 'right';
}

// 表格 Props
export interface CwSortTableProps<T = any> {
  /** 表格欄位定義 */
  columns: CwSortTableColumn<T>[];
  /** 表格資料 */
  dataSource: T[];
  /** 資料的唯一鍵值欄位名稱 */
  rowKey?: string | ((record: T) => string | number);
  /** 空狀態顯示 */
  emptyText?: string;
  /** 表格容器類名 */
  className?: string;
  /** 排序變更回調（選填，如果不提供會使用內建排序） */
  onSort?: (key: string, direction: SortDirection, sortedData: T[]) => void;
}

// 排序圖標組件
function SortIcon({ active, direction }: { active: boolean; direction?: SortDirection }) {
  const baseColor = '#7c808c';
  const activeColor = '#01579b';
  
  // 根據狀態決定使用哪個圖標
  let pathData = svgPaths.p126fa300; // 預設：雙向箭頭
  let fillColor = baseColor;
  
  if (active && direction === 'asc') {
    pathData = svgPaths.p1ff2f200; // 向上箭頭
    fillColor = activeColor;
  } else if (active && direction === 'desc') {
    pathData = svgPaths.p18612700; // 向下箭頭
    fillColor = activeColor;
  }
  
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" viewBox="0 0 9 14">
        <path d={pathData} fill={fillColor} />
      </svg>
    </div>
  );
}

/**
 * CwSortTable 元件
 * 
 * 帶排序功能的表格元件，支援點擊欄位標頭進行升序或降序排列。
 * 內建客戶端排序功能，也可通過 onSort 回調自定義排序邏輯。
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { key: 'id', title: '#', width: '60px', sortable: true },
 *   { key: 'name', title: '姓名', sortable: true },
 *   { key: 'email', title: 'Email' },
 *   { 
 *     key: 'status', 
 *     title: '狀態', 
 *     width: '100px',
 *     render: (value) => <CwTag>{value}</CwTag>
 *   },
 *   { 
 *     key: 'action', 
 *     title: '操作', 
 *     width: '80px',
 *     align: 'center',
 *     render: (_, record) => <CwRoundButton icon="view" />
 *   }
 * ];
 * 
 * <CwSortTable 
 *   columns={columns} 
 *   dataSource={data} 
 *   rowKey="id"
 * />
 * ```
 */
export function CwSortTable<T = any>({
  columns,
  dataSource,
  rowKey = 'id',
  emptyText = '沒有資料',
  className = '',
  onSort,
}: CwSortTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sortedData, setSortedData] = useState<T[]>(dataSource);

  // 取得行的唯一鍵值
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey] ?? index;
  };

  // 內建排序函數
  const sortData = (data: T[], key: string, direction: SortDirection): T[] => {
    if (!direction) return [...dataSource];
    
    return [...data].sort((a, b) => {
      const aValue = (a as any)[key];
      const bValue = (b as any)[key];
      
      // 處理 null/undefined
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? 1 : -1;
      if (bValue == null) return direction === 'asc' ? -1 : 1;
      
      // 數字比較
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // 字串比較
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr, 'zh-TW');
      return direction === 'asc' ? comparison : -comparison;
    });
  };

  // 處理排序點擊
  const handleSortClick = (columnKey: string) => {
    let newDirection: SortDirection = 'asc';
    
    if (sortKey === columnKey) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }
    
    setSortKey(newDirection ? columnKey : null);
    setSortDirection(newDirection);
    
    const newSortedData = sortData(dataSource, columnKey, newDirection);
    setSortedData(newSortedData);
    
    // 如果有提供外部回調，則呼叫
    if (onSort) {
      onSort(columnKey, newDirection, newSortedData);
    }
  };

  // 當 dataSource 改變時，重新排序
  React.useEffect(() => {
    if (sortKey && sortDirection) {
      const newSortedData = sortData(dataSource, sortKey, sortDirection);
      setSortedData(newSortedData);
    } else {
      setSortedData(dataSource);
    }
  }, [dataSource, sortKey, sortDirection]);

  const displayData = sortDirection ? sortedData : dataSource;

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="bg-white relative rounded-[var(--radius)] border border-[#c4c9d3] min-w-full inline-block">
        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {columns.map((column) => (
              <col 
                key={column.key} 
                style={{ width: column.width || 'auto' }}
              />
            ))}
          </colgroup>
          
          {/* 表頭 */}
          <thead>
            <tr className="bg-[#e9ebf2]">
              {columns.map((column) => {
                const isActive = sortKey === column.key;
                const isSortable = column.sortable;
                
                return (
                  <th 
                    key={column.key}
                    className="px-[10px] py-[15px] text-left border-b border-[#cdcdcd] first:rounded-tl-[var(--radius)] last:rounded-tr-[var(--radius)]"
                  >
                    {isSortable ? (
                      <button
                        onClick={() => handleSortClick(column.key)}
                        className="flex gap-[4px] items-center w-full cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <span 
                          className="whitespace-nowrap"
                          style={{
                            fontFamily: 'var(--font-noto-sans-tc)',
                            fontSize: '14px',
                            fontWeight: 'var(--font-weight-500)',
                            lineHeight: '19.6px',
                            color: '#1c1c1c',
                          }}
                        >
                          {column.title}
                        </span>
                        <SortIcon active={isActive} direction={isActive ? sortDirection : undefined} />
                      </button>
                    ) : (
                      <div className={`flex gap-[4px] items-center w-full ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : ''}`}>
                        <span 
                          className="whitespace-nowrap"
                          style={{
                            fontFamily: 'var(--font-noto-sans-tc)',
                            fontSize: '14px',
                            fontWeight: 'var(--font-weight-500)',
                            lineHeight: '19.6px',
                            color: '#1c1c1c',
                          }}
                        >
                          {column.title}
                        </span>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          
          {/* 資料列 */}
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="h-[120px]"
                  style={{ height: '120px' }}
                >
                  <CwEmptyState text={emptyText} />
                </td>
              </tr>
            ) : (
              displayData.map((record, index) => (
                <tr 
                  key={getRowKey(record, index)}
                  className="border-b border-[#cdcdcd] last:border-b-0"
                >
                  {columns.map((column) => {
                    const value = (record as any)[column.key];
                    const content = column.render 
                      ? column.render(value, record, index)
                      : value;
                    
                    return (
                      <td 
                        key={column.key}
                        className="px-[10px] py-[15px]"
                        style={{
                          textAlign: column.align || 'left',
                        }}
                      >
                        {typeof content === 'string' || typeof content === 'number' ? (
                          <div className={`font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] break-words`}>
                            {content}
                          </div>
                        ) : (
                          content
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CwSortTable.displayName = 'CwSortTable';

// 導入 React
import * as React from 'react';