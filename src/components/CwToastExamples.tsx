import { useState } from 'react';
import { CwToast, ToastType } from './CwToast';
import { CwButton } from './CwButton';

export function CwToastExamples() {
  const [activeToast, setActiveToast] = useState<{
    type: ToastType;
    message: string;
    closable: boolean;
  } | null>(null);

  const showToast = (type: ToastType, message: string, closable: boolean = false) => {
    setActiveToast({ type, message, closable });
  };

  const hideToast = () => {
    setActiveToast(null);
  };

  return (
    <div className="space-y-10">
      {/* 範例 1：不同類型的 Toast（無關閉按鈕） */}
      <div className="space-y-3">
        <h4>1. 不同類型的 Toast（自動關閉）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          預設 3 秒後自動關閉，不顯示關閉按鈕。
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('info', '儲存成功')}
          >
            Info Toast
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('success', '儲存成功')}
          >
            Success Toast
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('warning', '請至少輸入一個條件')}
          >
            Warning Toast
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('error', '輸入密碼為空白')}
          >
            Error Toast
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('question', '輸入密碼為空白')}
          >
            Question Toast
          </CwButton>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 範例 2：帶關閉按鈕的 Toast */}
      <div className="space-y-3">
        <h4>2. 帶關閉按鈕的 Toast</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          需要使用者手動關閉的訊息，適用於重要提示或需要確認的訊息。
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('info', '儲存成功', true)}
          >
            Info（可關閉）
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('success', '儲存成功', true)}
          >
            Success（可關閉）
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('warning', '請至少輸入一個條件', true)}
          >
            Warning（可關閉）
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('error', '輸入密碼為空白', true)}
          >
            Error（可關閉）
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('question', '輸入密碼為空白', true)}
          >
            Question（可關閉）
          </CwButton>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 範例 3：較長的訊息 */}
      <div className="space-y-3">
        <h4>3. 較長的訊息</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          訊息較長時會自動換行，建議配合增加 duration 時間或使用可關閉按鈕。
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('warning', '您輸入的資料格式不正確，請檢查後重新輸入', true)}
          >
            較長的警告訊息
          </CwButton>
          <CwButton
            variant="primary"
            appearance="outlined"
            onClick={() => showToast('error', '系統發生錯誤，請稍後再試或聯繫系統管理員', true)}
          >
            較長的錯誤訊息
          </CwButton>
        </div>
      </div>

      {/* Toast 顯示區域 */}
      {activeToast && (
        <CwToast
          type={activeToast.type}
          message={activeToast.message}
          closable={activeToast.closable}
          onClose={hideToast}
          duration={activeToast.closable ? 0 : 3000}
          visible={true}
        />
      )}
    </div>
  );
}