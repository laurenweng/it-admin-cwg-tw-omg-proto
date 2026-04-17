import { useState } from 'react';
import { CwHeader } from './CwHeader';
import { CwToast } from './CwToast';

/**
 * CwHeader 元件使用範例
 */
export function CwHeaderExamples() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'warning' | 'error' | 'question'>('info');
  const [hasNotification, setHasNotification] = useState(true);

  const handleMenuToggle = () => {
    setToastMessage('選單切換功能');
    setToastType('info');
    setShowToast(true);
  };

  const handleNotificationClick = () => {
    setToastMessage('通知面板開啟');
    setToastType('info');
    setShowToast(true);
    setHasNotification(false);
  };

  const handleUserClick = () => {
    setToastMessage('會員選單開啟');
    setToastType('info');
    setShowToast(true);
  };

  return (
    <div className="space-y-8">
      {/* 基本使用 */}
      <section className="space-y-4">
        <h4>1. 基本使用</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          頁面頂部元件，顯示系統名稱、登入者資訊、通知和選單按鈕
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden">
          <CwHeader
            onMenuToggle={handleMenuToggle}
            systemName="客服系統"
            userName="陳曉菁"
            onNotificationClick={handleNotificationClick}
            onUserClick={handleUserClick}
            hasNotification={hasNotification}
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 自訂系統名稱與使用者 */}
      <section className="space-y-4">
        <h4>2. 自訂系統名稱與使用者</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          可自訂系統名稱和使用者名稱
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden">
          <CwHeader
            onMenuToggle={handleMenuToggle}
            systemName="訂單管理系統"
            userName="王小明"
            onNotificationClick={handleNotificationClick}
            onUserClick={handleUserClick}
            hasNotification={false}
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 通知紅點 */}
      <section className="space-y-4">
        <h4>3. 通知紅點提示</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當有新通知時，鈴鐺圖標會顯示紅色圓點提示
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden">
          <CwHeader
            onMenuToggle={handleMenuToggle}
            systemName="會員管理系統"
            userName="李小華"
            onNotificationClick={() => {
              setToastMessage('您有 3 則未讀通知');
              setToastType('info');
              setShowToast(true);
            }}
            onUserClick={handleUserClick}
            hasNotification={true}
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 使用說明 */}
      <section className="space-y-4">
        <h4>4. 使用說明</h4>
        <div className="space-y-3">
          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">元件特色</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• 寬度 100%，高度固定 60px</li>
              <li>• 綠色背景（#7eaa82），與系統設計風格一致</li>
              <li>• 左側包含選單按鈕和系統名稱</li>
              <li>• 右側包含通知按鈕、會員圖標和使用者名稱</li>
              <li>• 通知按鈕可顯示紅點提示（hasNotification 屬性）</li>
              <li>• 所有按鈕都有 hover 效果</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">使用時機</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• 固定出現在所有頁面的頂部</li>
              <li>• 提供全域導航和系統資訊</li>
              <li>• 顯示登入者資訊和通知狀態</li>
              <li>• 控制側邊選單的展開與收合</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/5 rounded-[var(--radius)]">
            <h4 className="mb-2">主要屬性</h4>
            <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
              <li>• <strong>onMenuToggle</strong>：選單切換回調函數</li>
              <li>• <strong>systemName</strong>：系統名稱（預設：客服系統）</li>
              <li>• <strong>userName</strong>：使用者名稱（預設：陳曉菁）</li>
              <li>• <strong>onNotificationClick</strong>：通知按鈕點擊回調</li>
              <li>• <strong>onUserClick</strong>：會員圖標點擊回調</li>
              <li>• <strong>hasNotification</strong>：是否顯示通知紅點（預設：false）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Toast 通知 */}
      {showToast && (
        <CwToast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}