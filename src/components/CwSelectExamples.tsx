import { useState } from 'react';
import { CwSelect, CwSelectOption } from './CwSelect';

/**
 * CwSelect 元件使用範例
 */
export function CwSelectExamples() {
  // 基本選項
  const basicOptions: CwSelectOption[] = [
    { value: '1', label: '項目一' },
    { value: '2', label: '項目二' },
    { value: '3', label: '項目三' },
  ];

  // 較多選項
  const moreOptions: CwSelectOption[] = [
    { value: '1', label: '陳柏凱' },
    { value: '2', label: '王小明' },
    { value: '3', label: '李小華' },
    { value: '4', label: '張大同' },
    { value: '5', label: '林小美' },
    { value: '6', label: '黃志明' },
    { value: '7', label: '劉曉雯' },
    { value: '8', label: '吳建宏' },
  ];

  // 帶禁用選項
  const optionsWithDisabled: CwSelectOption[] = [
    { value: '1', label: '可選項目一' },
    { value: '2', label: '禁用項目', disabled: true },
    { value: '3', label: '可選項目二' },
    { value: '4', label: '可選項目三' },
  ];

  // 狀態管理
  const [singleValue1, setSingleValue1] = useState<string>('');
  const [singleValue2, setSingleValue2] = useState<string>('2');
  const [singleValue3, setSingleValue3] = useState<string>('');
  const [multiValue1, setMultiValue1] = useState<string[]>([]);
  const [multiValue2, setMultiValue2] = useState<string[]>(['1', '3']);
  const [searchValue, setSearchValue] = useState<string>('');
  const [errorValue, setErrorValue] = useState<string>('');

  return (
    <div className="space-y-8">
      {/* 基本單選 */}
      <section className="space-y-4">
        <h4>1. 基本單選</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          最基本的下拉選擇功能
        </p>
        <div className="grid grid-cols-3 gap-4">
          <CwSelect
            options={basicOptions}
            value={singleValue1}
            onChange={(val) => setSingleValue1(val as string)}
            placeholder="請選擇項目"
            width="200px"
          />
          <CwSelect
            options={basicOptions}
            value={singleValue2}
            onChange={(val) => setSingleValue2(val as string)}
            placeholder="請選擇項目"
            width="200px"
          />
          <CwSelect
            options={basicOptions}
            value={singleValue1}
            onChange={(val) => setSingleValue1(val as string)}
            placeholder="請選擇項目"
            disabled
            width="200px"
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 帶標籤和清除按鈕 */}
      <section className="space-y-4">
        <h4>2. 帶標籤和清除按鈕</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          使用 label 屬性顯示標籤，clearable 屬性啟用清除功能
        </p>
        <div className="grid grid-cols-3 gap-4">
          <CwSelect
            label="選擇項目"
            options={basicOptions}
            value={singleValue2}
            onChange={(val) => setSingleValue2(val as string)}
            placeholder="請選擇"
            clearable
            width="200px"
          />
          <CwSelect
            label="選擇社工"
            options={moreOptions}
            value={singleValue3}
            onChange={(val) => setSingleValue3(val as string)}
            placeholder="請選擇社工"
            clearable
            width="200px"
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 多選模式 */}
      <section className="space-y-4">
        <h4>3. 多選模式</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          使用 multiple 屬性啟用多選，已選項目會以 tag 標記顯示
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CwSelect
            label="多選項目"
            options={moreOptions}
            value={multiValue1}
            onChange={(val) => setMultiValue1(val as string[])}
            placeholder="請選擇多個項目"
            multiple
            clearable
            width="300px"
          />
          <CwSelect
            label="已選擇項目"
            options={moreOptions}
            value={multiValue2}
            onChange={(val) => setMultiValue2(val as string[])}
            placeholder="請選擇多個項目"
            multiple
            clearable
            width="300px"
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 可搜尋模式 */}
      <section className="space-y-4">
        <h4>4. 可搜尋模式</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          使用 searchable 屬性啟用搜尋功能，適合選項較多的情況
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CwSelect
            label="搜尋並選擇"
            options={moreOptions}
            value={searchValue}
            onChange={(val) => setSearchValue(val as string)}
            placeholder="輸入關鍵字搜尋"
            searchable
            clearable
            width="300px"
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 禁用選項 */}
      <section className="space-y-4">
        <h4>5. 禁用選項</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          可以設定特定選項為禁用狀態
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CwSelect
            label="包含禁用選項"
            options={optionsWithDisabled}
            value={singleValue1}
            onChange={(val) => setSingleValue1(val as string)}
            placeholder="請選擇"
            width="200px"
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 錯誤狀態 */}
      <section className="space-y-4">
        <h4>6. 錯誤狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當驗證失敗時顯示錯誤樣式和訊息
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CwSelect
            label="必填欄位"
            options={basicOptions}
            value={errorValue}
            onChange={(val) => setErrorValue(val as string)}
            placeholder="請選擇項目"
            error={!errorValue}
            errorMessage="此欄位為必填"
            width="200px"
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 完整範例 */}
      <section className="space-y-4">
        <h4>7. 完整範例組合</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          在表單中的實際應用
        </p>
        <div className="space-y-4 max-w-[600px]">
          <CwSelect
            label="選擇部門"
            options={[
              { value: 'sales', label: '業務部' },
              { value: 'tech', label: '技術部' },
              { value: 'hr', label: '人資部' },
              { value: 'finance', label: '財務部' },
            ]}
            value={singleValue1}
            onChange={(val) => setSingleValue1(val as string)}
            placeholder="請選擇部門"
            clearable
          />

          <CwSelect
            label="選擇負責人（多選）"
            options={moreOptions}
            value={multiValue1}
            onChange={(val) => setMultiValue1(val as string[])}
            placeholder="請選擇負責人"
            multiple
            searchable
            clearable
          />

          <CwSelect
            label="專案狀態"
            options={[
              { value: 'planning', label: '規劃中' },
              { value: 'processing', label: '進行中' },
              { value: 'completed', label: '已完成' },
              { value: 'cancelled', label: '已取消' },
            ]}
            value={singleValue3}
            onChange={(val) => setSingleValue3(val as string)}
            placeholder="請選擇狀態"
            clearable
          />
        </div>
      </section>
    </div>
  );
}
