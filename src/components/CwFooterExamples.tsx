import { CwFooter } from './CwFooter';

/**
 * CwFooter 元件使用範例
 */
export function CwFooterExamples() {
  return (
    <div className="space-y-8">
      {/* 基本使用 */}
      <section className="space-y-4">
        <h4>1. 基本使用</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          頁面底部元件，顯示版權資訊與維護單位
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden">
          <CwFooter />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 自訂版權文字 */}
      <section className="space-y-4">
        <h4>2. 自訂版權文字</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          可自訂版權資訊內容
        </p>
        <div className="space-y-4">
          <div className="border border-border rounded-[var(--radius)] overflow-hidden">
            <CwFooter copyrightText="Copyright © 2025 天下雜誌群" />
          </div>
          <div className="border border-border rounded-[var(--radius)] overflow-hidden">
            <CwFooter copyrightText="© 2025 All Rights Reserved" />
          </div>
          <div className="border border-border rounded-[var(--radius)] overflow-hidden">
            <CwFooter copyrightText="版權所有 © 2025 | 技術支援：資訊部" />
          </div>
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 使用說明 */}
      <section className="space-y-4">
        <h4>3. 使用說明</h4>
        <div className="space-y-3">
          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">元件特色</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• 寬度 100%，高度自動適應內容</li>
              <li>• 白色背景，帶有上方陰影效果</li>
              <li>• 文字內容居中顯示</li>
              <li>• 固定 padding 10px</li>
              <li>• 文字使用 Noto Sans TC，14px，黑色</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">使用時機</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• 固定出現在所有頁面的底部</li>
              <li>• 顯示版權資訊</li>
              <li>• 顯示維護單位或技術支援資訊</li>
              <li>• 提供法律聲明或相關連結</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">主要屬性</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• <strong>copyrightText</strong>：版權文字（預設：Copyright © 2025 天下雜誌群）</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">設計規範</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• 文字內容應簡潔明確，通常包含年份和公司/組織名稱</li>
              <li>• 避免放置過多資訊或複雜內容</li>
              <li>• 保持單行顯示，確保在不同螢幕寬度下都能完整閱讀</li>
              <li>• 上方陰影用於區分頁面內容和底部資訊</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}