interface CwFooterProps {
  /**
   * 版權文字（預設：Copyright © 2025 天下雜誌群）
   */
  copyrightText?: string;
}

/**
 * CwFooter 頁面底部元件
 * 
 * 顯示版權資訊與維護單位
 * 固定在頁面底部，帶有上方陰影效果
 * 
 * @example
 * ```tsx
 * <CwFooter copyrightText="Copyright © 2025 天下雜誌群" />
 * ```
 */
export function CwFooter({ copyrightText = 'Copyright © 2025 天下雜誌群' }: CwFooterProps) {
  return (
    <footer 
      className="w-full bg-white relative"
      style={{ boxShadow: '0px -2px 15px 0px rgba(196, 201, 211, 0.6)' }}
      data-name="CwFooter"
    >
      <div className="flex items-center justify-center size-full">
        <div className="flex items-center justify-center p-[10px] relative size-full">
          <p 
            className="text-[#1c1c1c] text-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '19.6px',
            }}
          >
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}