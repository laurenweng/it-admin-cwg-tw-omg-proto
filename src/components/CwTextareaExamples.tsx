import { useState } from "react";
import { CwTextarea } from "./CwTextarea";

export function CwTextareaExamples() {
  const [basicValue, setBasicValue] = useState("");
  const [withLabelValue, setWithLabelValue] = useState("");
  const [errorValue, setErrorValue] = useState("這是錯誤的內容");
  const [disabledValue] = useState("這個欄位已被禁用，無法編輯");

  return (
    <div className="space-y-6">
      {/* 基本使用 */}
      <div className="space-y-3">
        <h4>基本使用</h4>
        <CwTextarea
          placeholder="請輸入內容..."
          value={basicValue}
          onChange={(e) => setBasicValue(e.target.value)}
        />
      </div>

      {/* 帶標籤 */}
      <div className="space-y-3">
        <h4>帶標籤</h4>
        <CwTextarea
          label="描述"
          placeholder="請輸入描述..."
          value={withLabelValue}
          onChange={(e) => setWithLabelValue(e.target.value)}
        />
      </div>

      {/* 自訂樣式 */}
      <div className="space-y-3">
        <h4>自訂樣式（使用 style 或 className）</h4>
        <CwTextarea
          label="詳細說明"
          placeholder="請輸入詳細說明..."
          value=""
          onChange={() => {}}
          style={{ minHeight: '150px' }}
        />
      </div>

      {/* 錯誤狀態 */}
      <div className="space-y-3">
        <h4>錯誤狀態</h4>
        <CwTextarea
          label="審核意見"
          placeholder="請輸入審核意見（駁回申請必填）"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
          error={!errorValue ? "審核意見為必填項目" : ""}
        />
      </div>

      {/* 禁用狀態 */}
      <div className="space-y-3">
        <h4>禁用狀態</h4>
        <CwTextarea
          label="系統備註"
          placeholder="此欄位無法編輯"
          value={disabledValue}
          disabled
          onChange={() => {}}
        />
      </div>

      {/* 實際應用範例：審核意見 */}
      <div className="space-y-3">
        <h4>實際應用範例：審核意見</h4>
        <div className="space-y-[8px]">
          <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>審核意見</div>
          <div>
            <CwTextarea
              placeholder="請輸入審核意見（駁回申請必填）"
              value=""
              onChange={() => {}}
            />
            <div 
              className="text-right mt-[4px]"
              style={{ 
                fontFamily: 'Noto Sans TC', 
                fontSize: '12px', 
                fontWeight: 350,
                color: '#7c808c'
              }}
            >
              最後更新時間：2025-11-05 16:45:06
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
