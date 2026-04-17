import { ReactNode } from "react";

export interface CwTabItem {
  id: string;
  label: string;
}

interface CwTabProps {
  /**
   * 標籤項目列表
   */
  items: CwTabItem[];
  /**
   * 當前選中的標籤 ID
   */
  activeId: string;
  /**
   * 標籤切換回調函數
   */
  onChange: (id: string) => void;
}

/**
 * CwTab 標籤頁元件
 * 
 * 用於在同一頁面中切換不同內容區塊的標籤導航元件。
 * 
 * @example
 * ```tsx
 * const tabs = [
 *   { id: "tab1", label: "標籤一" },
 *   { id: "tab2", label: "標籤二" },
 * ];
 * 
 * <CwTab
 *   items={tabs}
 *   activeId={activeTab}
 *   onChange={setActiveTab}
 * />
 * ```
 */
export function CwTab({ items, activeId, onChange }: CwTabProps) {
  return (
    <div className="flex gap-[20px] border-b border-border/30">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`pb-[10px] px-[4px] font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[14px] transition-colors relative ${
            activeId === item.id
              ? "text-[#01579b]"
              : "text-[#7c808c] hover:text-[#1c1c1c]"
          }`}
        >
          {item.label}
          {activeId === item.id && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#01579b]" />
          )}
        </button>
      ))}
    </div>
  );
}

CwTab.displayName = 'CwTab';
