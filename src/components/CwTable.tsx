import React, { ReactNode } from "react";
import { CwEmptyState } from "./CwEmptyState";

// 排序方向
export type SortDirection = 'asc' | 'desc' | null;

// 表格欄位定義
export interface CwTableColumn<T = any> {
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
  /** 是否固定粘性定位
   * - 設定 true 時，該欄位會固定在表格右邊不隨卷軸滾動
   */
  sticky?: boolean;
  /** 是否固定在表格左邊不隨卷軸滾動 */
  stickyLeft?: boolean;
}

// 表格 Props
export interface CwTableProps<T = any> {
  /** 表格欄位定義 */
  columns: CwTableColumn<T>[];
  /** 表格資料 */
  dataSource: T[];
  /** 資料的唯一鍵值欄位名稱 */
  rowKey?: string | ((record: T) => string | number);
  /** 當前排序欄位 */
  sortKey?: string | null;
  /** 當前排序方向 */
  sortDirection?: SortDirection;
  /** 排序變更回調 */
  onSort?: (key: string, direction: SortDirection) => void;
  /** 空狀態顯示 */
  emptyText?: string;
  /** 表格容器類名 */
  className?: string;
  /** 自訂列樣式 */
  rowStyle?: (record: T, index: number) => React.CSSProperties;
}

/**
 * CwTable 元件
 * 
 * 通用表格元件，支援自定義渲染、空狀態等功能。
 * 欄位可以填滿整個畫面，支援固定寬度和自動填滿的混合使用。
 * 當內容過多時會自動啟用水平捲動。
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { key: 'id', title: '#', width: '60px' },
 *   { key: 'name', title: '姓名' }, // 不設定 width，自動填滿剩餘空間
 *   { key: 'email', title: 'Email' }, // 不設定 width，自動填滿剩餘空間
 *   { key: 'phone', title: '電話', width: '140px' },
 *   { 
 *     key: 'status',
 *     title: '狀態',
 *     width: '100px',
 *     render: (value) => <StatusTag variant="success">{value}</StatusTag>
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
 * <CwTable 
 *   columns={columns} 
 *   dataSource={data} 
 *   rowKey="id"
 * />
 * ```
 */
export function CwTable<T = any>({
  columns,
  dataSource,
  rowKey = 'id',
  sortKey,
  sortDirection,
  onSort,
  emptyText = '沒有資料',
  className = '',
  rowStyle,
}: CwTableProps<T>) {
  // 計算 sticky 欄位的 right 位置
  const getStickyColumnRight = (columnIndex: number): string => {
    let rightValue = 0;
    for (let i = columnIndex + 1; i < columns.length; i++) {
      const width = columns[i].width;
      if (width) {
        const numValue = parseInt(width);
        rightValue += numValue;
      }
    }
    return `${rightValue}px`;
  };

  // 計算 stickyLeft 欄位的 left 位置
  const getStickyColumnLeft = (columnIndex: number): string => {
    let leftValue = 0;
    for (let i = 0; i < columnIndex; i++) {
      if (columns[i].stickyLeft && columns[i].width) {
        leftValue += parseInt(columns[i].width!);
      }
    }
    return `${leftValue}px`;
  };

  // 取得行的唯一鍵值
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey] ?? index;
  };

  // 處理排序點擊
  const handleSortClick = (columnKey: string) => {
    if (!onSort) return;
    
    let newDirection: SortDirection = 'asc';
    if (sortKey === columnKey) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }
    onSort(columnKey, newDirection);
  };

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
            <tr className="bg-[#e9ebf2] border-b border-[#cdcdcd]">
              {columns.map((column, colIndex) => {
                return (
                  <th 
                    key={column.key}
                    className="px-[10px] py-[15px] text-left"
                    style={{
                      borderRight: colIndex < columns.length - 1 ? '1px solid #cdcdcd' : 'none',
                      ...(column.sticky ? {
                        position: 'sticky',
                        right: getStickyColumnRight(colIndex),
                        backgroundColor: '#e9ebf2',
                        zIndex: 10,
                      } : {}),
                      ...(column.stickyLeft ? {
                        position: 'sticky',
                        left: getStickyColumnLeft(colIndex),
                        backgroundColor: '#e9ebf2',
                        zIndex: 10,
                      } : {}),
                    }}
                  >
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
                  </th>
                );
              })}
            </tr>
          </thead>
          
          {/* 資料列 */}
          <tbody>
            {dataSource.length === 0 ? (
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
              dataSource.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  className="border-b border-[#cdcdcd] last:border-b-0"
                  style={rowStyle ? rowStyle(record, index) : undefined}
                >
                  {columns.map((column, colIndex) => {
                    const value = (record as any)[column.key];
                    const content = column.render 
                      ? column.render(value, record, index)
                      : value;
                    
                    // 取得行的背景色
                    const rowBgColor = rowStyle ? rowStyle(record, index)?.backgroundColor : undefined;
                    
                    return (
                      <td 
                        key={column.key}
                        className="px-[10px] py-[15px]"
                        style={{
                          textAlign: column.align || 'left',
                          borderRight: colIndex < columns.length - 1 ? '1px solid #cdcdcd' : 'none',
                          ...(column.sticky ? {
                            position: 'sticky',
                            right: getStickyColumnRight(colIndex),
                            backgroundColor: rowBgColor || '#ffffff',
                            zIndex: 9,
                          } : {}),
                          ...(column.stickyLeft ? {
                            position: 'sticky',
                            left: getStickyColumnLeft(colIndex),
                            backgroundColor: rowBgColor || '#ffffff',
                            zIndex: 9,
                          } : {}),
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

CwTable.displayName = 'CwTable';