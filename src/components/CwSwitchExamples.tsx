import React, { useState } from 'react';
import { CwSwitch } from './CwSwitch';
import { toast } from 'sonner@2.0.3';

export const CwSwitchExamples: React.FC = () => {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [notificationSwitch, setNotificationSwitch] = useState(true);
  const [emailSwitch, setEmailSwitch] = useState(false);
  const [autoSaveSwitch, setAutoSaveSwitch] = useState(true);
  const [errorSwitch, setErrorSwitch] = useState(false);

  const handleNotificationChange = (checked: boolean) => {
    setNotificationSwitch(checked);
    toast.success(checked ? '已啟用通知' : '已停用通知');
  };

  const handleEmailChange = (checked: boolean) => {
    setEmailSwitch(checked);
    toast.success(checked ? '已啟用電子郵件通知' : '已停用電子郵件通知');
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSaveSwitch(checked);
    toast.success(checked ? '已啟用自動儲存' : '已停用自動儲存');
  };

  return (
    <div className="space-y-6">
      {/* 基本開關 */}
      <div className="space-y-3">
        <h4>1. 基本開關（無標籤）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          最基本的開關形式，需要在外部提供說明文字。
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span>關閉狀態：</span>
            <CwSwitch checked={false} onChange={() => {}} />
          </div>
          <div className="flex items-center gap-3">
            <span>開啟狀態：</span>
            <CwSwitch checked={true} onChange={() => {}} />
          </div>
          <div className="flex items-center gap-3">
            <span>互動式：</span>
            <CwSwitch checked={basicSwitch} onChange={setBasicSwitch} />
          </div>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 帶標籤的開關 */}
      <div className="space-y-3">
        <h4>2. 帶標籤的開關</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          開關應搭配明確的文字說明，讓使用者清楚了解「開」與「關」代表什麼意思。
        </p>
        <div className="grid grid-cols-2 gap-6">
          <CwSwitch
            label="啟用通知"
            checked={notificationSwitch}
            onChange={handleNotificationChange}
            labelPosition="top"
          />
          <CwSwitch
            label="接收電子郵件"
            checked={emailSwitch}
            onChange={handleEmailChange}
            labelPosition="top"
          />
          <CwSwitch
            label="自動儲存"
            checked={autoSaveSwitch}
            onChange={handleAutoSaveChange}
            labelPosition="top"
          />
          <CwSwitch
            label="顯示進階設定"
            checked={false}
            onChange={() => {}}
            labelPosition="top"
          />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 標籤位置 */}
      <div className="space-y-3">
        <h4>3. 標籤位置變化</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          標籤可以放置在上方、下方、左側或右側。
        </p>
        <div className="space-y-4">
          <CwSwitch
            label="標籤在上方"
            checked={true}
            onChange={() => {}}
            labelPosition="top"
          />
          <CwSwitch
            label="標籤在下方"
            checked={true}
            onChange={() => {}}
            labelPosition="bottom"
          />
          <CwSwitch
            label="標籤在左側"
            checked={true}
            onChange={() => {}}
            labelPosition="left"
          />
          <CwSwitch
            label="標籤在右側"
            checked={true}
            onChange={() => {}}
            labelPosition="right"
          />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 禁用狀態 */}
      <div className="space-y-3">
        <h4>4. 禁用狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          開關可以被禁用，顯示為半透明且無法點擊。
        </p>
        <div className="flex items-center gap-6">
          <CwSwitch
            label="禁用（關閉）"
            checked={false}
            onChange={() => {}}
            disabled={true}
            labelPosition="top"
          />
          <CwSwitch
            label="禁用（開啟）"
            checked={true}
            onChange={() => {}}
            disabled={true}
            labelPosition="top"
          />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 錯誤狀態 */}
      <div className="space-y-3">
        <h4>5. 錯誤狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當開關處於錯誤狀態時，會顯示紅色樣式和錯誤訊息。
        </p>
        <div className="space-y-4">
          <CwSwitch
            label="同意服務條款"
            checked={errorSwitch}
            onChange={setErrorSwitch}
            error={!errorSwitch}
            errorMessage="您必須同意服務條款才能繼續"
            labelPosition="top"
          />
          <CwSwitch
            label="錯誤狀態（開啟）"
            checked={true}
            onChange={() => {}}
            error={true}
            errorMessage="此開關發生錯誤"
            labelPosition="top"
          />
        </div>
      </div>


    </div>
  );
};