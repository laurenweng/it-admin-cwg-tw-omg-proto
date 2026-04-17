import { Bell } from 'lucide-react';
import svgPaths from '../imports/svg-hab56z9clt';

interface CwHeaderProps {
  /**
   * 選單切換回調函數
   */
  onMenuToggle?: () => void;
  /**
   * 系統名稱（預設：客服系統）
   */
  systemName?: string;
  /**
   * 使用者名稱（預設：陳曉菁）
   */
  userName?: string;
  /**
   * 通知點擊回調
   */
  onNotificationClick?: () => void;
  /**
   * 會員點擊回調
   */
  onUserClick?: () => void;
  /**
   * 是否顯示通知紅點
   */
  hasNotification?: boolean;
}

/**
 * CwHeader 頁面頂部元件
 * 
 * 顯示系統名稱、登入者資訊、通知、選單收合按鈕
 * 寬度為 100%，可依據使用者螢幕寬度自動縮放
 * 
 * @example
 * ```tsx
 * <CwHeader
 *   onMenuToggle={handleMenuToggle}
 *   systemName="客服系統"
 *   userName="陳曉菁"
 *   onNotificationClick={handleNotification}
 *   hasNotification={true}
 * />
 * ```
 */
export function CwHeader({
  onMenuToggle,
  systemName = '客服系統',
  userName = '陳曉菁',
  onNotificationClick,
  onUserClick,
  hasNotification = false,
}: CwHeaderProps) {
  return (
    <header 
      className="w-full h-[60px] flex items-center justify-between px-[30px] bg-[#7eaa82] shadow-[var(--elevation-sm)]"
      data-name="CwHeader"
    >
      {/* 左側：選單按鈕 + 系統名稱 */}
      <div className="flex items-center gap-[35px]">
        {/* 系統名稱 */}
        <div className="flex items-center h-[28px] overflow-clip">
          <div 
            className="font-['Noto_Sans_TC:Light',_sans-serif] text-white"
            style={{
              fontSize: '20px',
              fontWeight: 300,
              lineHeight: '28px',
            }}
          >
            {systemName}
          </div>
        </div>

        {/* 選單按鈕 */}
        <button
          onClick={onMenuToggle}
          className="relative size-[20px] hover:opacity-80 transition-opacity"
          aria-label="切換選單"
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g>
              <path d={svgPaths.p2b877d00} fill="white" />
            </g>
          </svg>
        </button>
      </div>

      {/* 右側：通知 + 會員 */}
      <div className="flex items-center gap-[14px]">
        {/* 通知按鈕 */}
        <button
          onClick={onNotificationClick}
          className="relative hover:opacity-80 transition-opacity"
          aria-label="通知"
        >
          <Bell className="size-[18px] text-white" />
          {hasNotification && (
            <span 
              className="absolute -top-[2px] -right-[2px] size-[8px] bg-destructive rounded-full"
              aria-label="有新通知"
            />
          )}
        </button>

        {/* 會員圖標 */}
        <button
          onClick={onUserClick}
          className="relative size-[14px] hover:opacity-80 transition-opacity"
          aria-label="會員資料"
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g>
              <path d={svgPaths.p2ad9bf90} fill="white" />
            </g>
          </svg>
        </button>

        {/* 使用者名稱 */}
        <div 
          className="font-['Noto_Sans_TC:DemiLight',_sans-serif] text-white"
          style={{
            fontSize: '16px',
            fontWeight: 350,
            lineHeight: '22.4px',
          }}
        >
          {userName}
        </div>
      </div>
    </header>
  );
}