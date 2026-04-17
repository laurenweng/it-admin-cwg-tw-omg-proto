import { useState, ReactNode, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-zwyayb95c2";

export interface CwSidemenuItem {
  /**
   * 項目唯一識別碼
   */
  id: string;
  /**
   * 項目顯示文字
   */
  label: string;
  /**
   * 項目圖標（僅第一層需要）
   */
  icon?: ReactNode;
  /**
   * 子項目列表（第二層）
   */
  children?: CwSidemenuItem[];
}

interface CwSidemenuProps {
  /**
   * 菜單項目列表
   */
  items: CwSidemenuItem[];
  /**
   * 當前選中的項目 ID
   */
  activeId?: string;
  /**
   * 項目點擊回調
   */
  onItemClick?: (itemId: string) => void;
  /**
   * 預設展開的項目 ID 列表
   */
  defaultExpandedIds?: string[];
  /**
   * 是否收合（僅顯示圖標）
   */
  collapsed?: boolean;
}

/**
 * CwSidemenu 側邊選單元件
 * 
 * 支援最多 2 層結構的導航選單
 * 第一層必須有圖標，第二層不需要圖標
 * 有子項目時可展開/收合
 * 
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: 'member',
 *     label: '會員管理',
 *     icon: <Users />,
 *     children: [
 *       { id: 'member-search', label: '會員查詢' }
 *     ]
 *   }
 * ];
 * 
 * <CwSidemenu 
 *   items={items} 
 *   activeId="member-search"
 *   onItemClick={(id) => console.log(id)}
 * />
 * ```
 */
export function CwSidemenu({
  items,
  activeId,
  onItemClick,
  defaultExpandedIds = [],
  collapsed = false,
}: CwSidemenuProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ top: number } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpanded = (itemId: string) => {
    setExpandedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: CwSidemenuItem, hasChildren: boolean) => {
    if (collapsed) {
      // 縮合模式下，點擊直接觸發導航
      if (!hasChildren) {
        onItemClick?.(item.id);
      }
      return;
    }

    if (hasChildren) {
      toggleExpanded(item.id);
    } else {
      onItemClick?.(item.id);
    }
  };

  const handleMouseEnter = (item: CwSidemenuItem, event: React.MouseEvent<HTMLButtonElement>) => {
    if (!collapsed) return;

    // 清除之前的 timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPosition({ top: rect.top });
    setHoveredItemId(item.id);
  };

  const handleMouseLeave = () => {
    if (!collapsed) return;

    // 延遲隱藏，讓使用者有時間移動到懸浮選單
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItemId(null);
      setHoverPosition(null);
    }, 300);
  };

  const handleHoverMenuEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleHoverMenuLeave = () => {
    setHoveredItemId(null);
    setHoverPosition(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const renderFirstLevelItem = (item: CwSidemenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.includes(item.id);
    const isActive = activeId === item.id;
    const isHovered = hoveredItemId === item.id;

    return (
      <div key={item.id} className="w-full relative">
        {/* 第一層項目 */}
        <button
          className={`box-border content-stretch flex gap-[10px] h-[44px] items-center py-[10px] w-full hover:bg-[#7eaa82] transition-colors ${
            collapsed ? "px-[22px] justify-center" : "px-[28px]"
          } ${isActive && !hasChildren ? "bg-[#96a895]" : ""}`}
          onClick={() => handleItemClick(item, hasChildren)}
          onMouseEnter={(e) => handleMouseEnter(item, e)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Icon */}
          {item.icon && (
            <div className="shrink-0 size-[20px] flex items-center justify-center text-white">
              {item.icon}
            </div>
          )}

          {/* Label */}
          {!collapsed && (
            <div className="basis-0 flex flex-col grow justify-start min-h-px min-w-px">
              <p
                className="leading-[20px] text-white text-left"
                style={{
                  fontFamily: 'var(--font-noto-sans-tc)',
                  fontSize: '14px',
                  fontWeight: 350,
                }}
              >
                {item.label}
              </p>
            </div>
          )}

          {/* 展開/收合圖標 */}
          {!collapsed && hasChildren && (
            <div className="shrink-0 size-[20px] flex items-center justify-center">
              <div
                className={`transition-transform ${
                  isExpanded ? "rotate-90" : ""
                }`}
                style={{ width: "7.877px", height: "13.505px" }}
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    d={svgPaths.p124c5e80}
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          )}
        </button>

        {/* 第二層子項目 */}
        {!collapsed && hasChildren && isExpanded && (
          <div className="w-full">
            {item.children?.map((child) => renderSecondLevelItem(child))}
          </div>
        )}

        {/* 縮合模式 Hover 展開選單 */}
        {collapsed && isHovered && hoverPosition && (
          <div
            className="fixed left-16 bg-[#568853] shadow-lg z-[5000] rounded-r-[4px] min-w-[200px]"
            style={{
              top: `${hoverPosition.top}px`,
            }}
            onMouseEnter={handleHoverMenuEnter}
            onMouseLeave={handleHoverMenuLeave}
          >
            {/* 第一層項目 */}
            <button
              className={`box-border content-stretch flex gap-[10px] h-[44px] items-center px-[28px] py-[10px] w-full hover:bg-[#7eaa82] transition-colors ${
                isActive && !hasChildren ? "bg-[#96a895]" : ""
              }`}
              onClick={() => {
                handleItemClick(item, hasChildren);
                setHoveredItemId(null);
              }}
            >
              <div className="basis-0 flex flex-col grow justify-start min-h-px min-w-px">
                <p
                  className="leading-[20px] text-white text-left"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 350,
                  }}
                >
                  {item.label}
                </p>
              </div>
            </button>

            {/* 子項目 */}
            {hasChildren && item.children?.map((child) => {
              const childIsActive = activeId === child.id;
              return (
                <button
                  key={child.id}
                  className={`box-border content-stretch flex gap-[10px] h-[44px] items-center px-[28px] py-[10px] w-full hover:bg-[#7eaa82] transition-colors ${
                    childIsActive ? "bg-[#96a895]" : ""
                  }`}
                  onClick={() => {
                    onItemClick?.(child.id);
                    setHoveredItemId(null);
                  }}
                >
                  <div className="shrink-0 size-[20px]" />
                  <div className="basis-0 flex flex-col grow justify-start min-h-px min-w-px">
                    <p
                      className="leading-[20px] text-white text-left"
                      style={{
                        fontFamily: 'var(--font-noto-sans-tc)',
                        fontSize: '14px',
                        fontWeight: 350,
                      }}
                    >
                      {child.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderSecondLevelItem = (item: CwSidemenuItem) => {
    const isActive = activeId === item.id;

    return (
      <button
        key={item.id}
        className={`box-border content-stretch flex gap-[10px] h-[44px] items-center px-[28px] py-[10px] w-full hover:bg-[#7eaa82] transition-colors ${
          isActive ? "bg-[#96a895]" : ""
        }`}
        onClick={() => onItemClick?.(item.id)}
      >
        {/* 空白圖標位置（保持對齊） */}
        <div className="shrink-0 size-[20px]" />

        {/* Label */}
        <div className="basis-0 flex flex-col grow justify-start min-h-px min-w-px">
          <p
            className="leading-[20px] text-white text-left"
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              fontSize: '14px',
              fontWeight: 350,
            }}
          >
            {item.label}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div
      className={`bg-[#568853] box-border content-stretch flex flex-col items-start px-0 py-[20px] self-stretch overflow-y-auto transition-all duration-300 ${
        collapsed ? "w-16" : "w-[250px]"
      }`}
      data-name="CwSidemenu"
    >
      {items.map((item) => renderFirstLevelItem(item))}
    </div>
  );
}