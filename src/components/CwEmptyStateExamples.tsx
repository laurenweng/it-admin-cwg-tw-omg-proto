import React from 'react';
import { CwEmptyState } from './CwEmptyState';
import { CwButton } from './CwButton';

export const CwEmptyStateExamples: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2>CwEmptyState 元件範例</h2>
        <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-base)' }}>
          用於顯示無資料時的視覺提示，包含圖像和文字。
        </p>
      </div>

      <hr className="border-t border-border/30" />

      {/* 預設狀態 */}
      <div className="space-y-3">
        <h4>1. 預設狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          使用預設的「沒有資料」文字提示。
        </p>
        <div className="border border-border rounded-[var(--radius)] bg-white p-6">
          <CwEmptyState />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 自訂文字 */}
      <div className="space-y-3">
        <h4>2. 自訂文字</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          可以通過 text 屬性自訂空狀態的提示文字。
        </p>
        <div className="border border-border rounded-[var(--radius)] bg-white p-6">
          <CwEmptyState text="查詢無結果" />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 搭配操作按鈕 */}
      <div className="space-y-3">
        <h4>3. 搭配操作按鈕</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當需要引導使用者進行下一步操作時，可以在空狀態下方加入 CwButton。
        </p>
        <div className="border border-border rounded-[var(--radius)] bg-white p-6">
          <div className="flex flex-col items-center gap-4">
            <CwEmptyState text="目前沒有任何項目" />
            <CwButton variant="primary" appearance="filled">
              新增第一個項目
            </CwButton>
          </div>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 不同場景的應用 */}
      <div className="space-y-3">
        <h4>4. 不同場景的應用</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          根據不同使用場景，自訂合適的提示文字。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-[var(--radius)] bg-white p-4">
            <p className="mb-2" style={{ fontSize: 'var(--text-base)' }}>查詢結果為空：</p>
            <CwEmptyState text="找不到符合條件的資料" />
          </div>
          <div className="border border-border rounded-[var(--radius)] bg-white p-4">
            <p className="mb-2" style={{ fontSize: 'var(--text-base)' }}>訂單列表為空：</p>
            <CwEmptyState text="目前沒有訂單記錄" />
          </div>
          <div className="border border-border rounded-[var(--radius)] bg-white p-4">
            <p className="mb-2" style={{ fontSize: 'var(--text-base)' }}>通知列表為空：</p>
            <CwEmptyState text="目前沒有新通知" />
          </div>
          <div className="border border-border rounded-[var(--radius)] bg-white p-4">
            <p className="mb-2" style={{ fontSize: 'var(--text-base)' }}>購物車為空：</p>
            <CwEmptyState text="購物車是空的" />
          </div>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 表格中的應用 */}
      <div className="space-y-3">
        <h4>5. 表格中的應用</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          CwTable、CwSortTable 和 CwTableSet 元件已內建此空狀態顯示，當 dataSource 為空時會自動顯示。無需手動添加 CwEmptyState 元件。
        </p>
        <div className="bg-[#f4f4f4] p-4 rounded-[var(--radius)]">
          <pre className="text-sm overflow-x-auto">
            <code>{`<CwTable
  columns={columns}
  dataSource={[]}
  rowKey="id"
  emptyText="目前沒有會員資料"
/>`}</code>
          </pre>
        </div>
      </div>

    </div>
  );
};
