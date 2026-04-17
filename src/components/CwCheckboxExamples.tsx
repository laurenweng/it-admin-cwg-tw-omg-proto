import { useState } from 'react';
import { CwCheckbox } from './CwCheckbox';

/**
 * CwCheckbox 元件使用範例
 */
export function CwCheckboxExamples() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: true,
    item3: false,
  });
  const [errorChecked, setErrorChecked] = useState(false);

  // 層級選擇範例
  const [parentChecked, setParentChecked] = useState(false);
  const [parentIndeterminate, setParentIndeterminate] = useState(false);
  const [children, setChildren] = useState({
    child1: false,
    child2: false,
    child3: false,
  });

  // 更新父級狀態
  const updateParentState = (newChildren: typeof children) => {
    const checkedCount = Object.values(newChildren).filter(Boolean).length;
    const totalCount = Object.keys(newChildren).length;
    
    if (checkedCount === 0) {
      setParentChecked(false);
      setParentIndeterminate(false);
    } else if (checkedCount === totalCount) {
      setParentChecked(true);
      setParentIndeterminate(false);
    } else {
      setParentChecked(false);
      setParentIndeterminate(true);
    }
  };

  // 處理父級點擊
  const handleParentChange = (checked: boolean) => {
    setParentChecked(checked);
    setParentIndeterminate(false);
    const newChildren = {
      child1: checked,
      child2: checked,
      child3: checked,
    };
    setChildren(newChildren);
  };

  // 處理子級點擊
  const handleChildChange = (key: keyof typeof children, checked: boolean) => {
    const newChildren = { ...children, [key]: checked };
    setChildren(newChildren);
    updateParentState(newChildren);
  };

  // 多層級結構範例
  const [features, setFeatures] = useState({
    userManagement: {
      checked: false,
      indeterminate: false,
      children: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      }
    },
    contentManagement: {
      checked: false,
      indeterminate: false,
      children: {
        view: true,
        create: true,
        edit: false,
        delete: false,
      }
    },
  });

  const updateFeatureState = (featureKey: keyof typeof features) => {
    const feature = features[featureKey];
    const checkedCount = Object.values(feature.children).filter(Boolean).length;
    const totalCount = Object.keys(feature.children).length;
    
    setFeatures(prev => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        checked: checkedCount === totalCount,
        indeterminate: checkedCount > 0 && checkedCount < totalCount,
      }
    }));
  };

  const handleFeatureParentChange = (featureKey: keyof typeof features, checked: boolean) => {
    const newChildren = Object.keys(features[featureKey].children).reduce((acc, key) => {
      acc[key as keyof typeof features[typeof featureKey]['children']] = checked;
      return acc;
    }, {} as typeof features[typeof featureKey]['children']);

    setFeatures(prev => ({
      ...prev,
      [featureKey]: {
        checked,
        indeterminate: false,
        children: newChildren,
      }
    }));
  };

  const handleFeatureChildChange = (
    featureKey: keyof typeof features,
    childKey: keyof typeof features[typeof featureKey]['children'],
    checked: boolean
  ) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        children: {
          ...prev[featureKey].children,
          [childKey]: checked,
        }
      }
    }));
    
    // 延遲更新父級狀態以確保子級狀態已更新
    setTimeout(() => updateFeatureState(featureKey), 0);
  };

  return (
    <div className="p-8 space-y-8 bg-background">
      <div>
        <h1 className="mb-6">CwCheckbox 元件範例</h1>
        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>
          多選元件，支援基本勾選、部分選擇、禁用和錯誤狀態。在層級結構中可明確顯示全選與部分選擇的差異。
        </p>
      </div>

      {/* 基本使用 */}
      <section className="space-y-4">
        <h3>1. 基本使用</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-4">
            <CwCheckbox 
              label="基本勾選" 
              checked={basicChecked}
              onChange={(e) => setBasicChecked(e.target.checked)}
            />
            <CwCheckbox 
              label="已勾選" 
              checked={true}
              onChange={() => {}}
            />
            <CwCheckbox 
              label="未勾選" 
              checked={false}
              onChange={() => {}}
            />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          點擊切換勾選狀態
        </p>
      </section>

      {/* 部分選擇狀態 */}
      <section className="space-y-4">
        <h3>2. 部分選擇狀態（Indeterminate）</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-2">
            <CwCheckbox 
              label="全選（部分選擇）" 
              checked={parentChecked}
              indeterminate={parentIndeterminate}
              onChange={(e) => handleParentChange(e.target.checked)}
            />
            <div className="ml-8 space-y-2">
              <CwCheckbox 
                label="選項 1" 
                checked={children.child1}
                onChange={(e) => handleChildChange('child1', e.target.checked)}
              />
              <CwCheckbox 
                label="選項 2" 
                checked={children.child2}
                onChange={(e) => handleChildChange('child2', e.target.checked)}
              />
              <CwCheckbox 
                label="選項 3" 
                checked={children.child3}
                onChange={(e) => handleChildChange('child3', e.target.checked)}
              />
            </div>
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          當部分子選項被勾選時，父選項顯示橫線（部分選擇狀態）
        </p>
      </section>

      {/* 禁用狀態 */}
      <section className="space-y-4">
        <h3>3. 禁用狀態</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-4">
            <CwCheckbox 
              label="禁用（未勾選）" 
              disabled
              checked={false}
            />
            <CwCheckbox 
              label="禁用（已勾選）" 
              disabled
              checked={true}
            />
            <CwCheckbox 
              label="禁用（部分選擇）" 
              disabled
              indeterminate
            />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          禁用狀態下無法點擊，顯示為灰色
        </p>
      </section>

      {/* 錯誤狀態 */}
      <section className="space-y-4">
        <h3>4. 錯誤狀態</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-4">
            <CwCheckbox 
              label="必須同意條款" 
              checked={errorChecked}
              onChange={(e) => setErrorChecked(e.target.checked)}
              error={!errorChecked ? "請勾選以繼續" : ""}
            />
            <CwCheckbox 
              label="改版" 
              checked={false}
              error="這是錯誤訊息"
            />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          錯誤狀態顯示紅色邊框和錯誤訊息
        </p>
      </section>

      {/* 無標籤 */}
      <section className="space-y-4">
        <h3>5. 無標籤</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="flex gap-4 items-center">
            <CwCheckbox checked={false} onChange={() => {}} />
            <CwCheckbox checked={true} onChange={() => {}} />
            <CwCheckbox indeterminate onChange={() => {}} />
            <CwCheckbox disabled checked={false} />
            <CwCheckbox disabled checked={true} />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          可以不顯示標籤文字，只顯示 checkbox 本身
        </p>
      </section>

      {/* 多層級權限管理 */}
      <section className="space-y-4">
        <h3>6. 實際應用 - 多層級權限管理</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-4">
            {/* 使用者管理 */}
            <div className="space-y-2">
              <CwCheckbox 
                label="使用者管理" 
                checked={features.userManagement.checked}
                indeterminate={features.userManagement.indeterminate}
                onChange={(e) => handleFeatureParentChange('userManagement', e.target.checked)}
              />
              <div className="ml-8 space-y-2">
                <CwCheckbox 
                  label="查看" 
                  checked={features.userManagement.children.view}
                  onChange={(e) => handleFeatureChildChange('userManagement', 'view', e.target.checked)}
                />
                <CwCheckbox 
                  label="新增" 
                  checked={features.userManagement.children.create}
                  onChange={(e) => handleFeatureChildChange('userManagement', 'create', e.target.checked)}
                />
                <CwCheckbox 
                  label="編輯" 
                  checked={features.userManagement.children.edit}
                  onChange={(e) => handleFeatureChildChange('userManagement', 'edit', e.target.checked)}
                />
                <CwCheckbox 
                  label="刪除" 
                  checked={features.userManagement.children.delete}
                  onChange={(e) => handleFeatureChildChange('userManagement', 'delete', e.target.checked)}
                />
              </div>
            </div>

            {/* 內容管理 */}
            <div className="space-y-2">
              <CwCheckbox 
                label="內容管理" 
                checked={features.contentManagement.checked}
                indeterminate={features.contentManagement.indeterminate}
                onChange={(e) => handleFeatureParentChange('contentManagement', e.target.checked)}
              />
              <div className="ml-8 space-y-2">
                <CwCheckbox 
                  label="查看" 
                  checked={features.contentManagement.children.view}
                  onChange={(e) => handleFeatureChildChange('contentManagement', 'view', e.target.checked)}
                />
                <CwCheckbox 
                  label="新增" 
                  checked={features.contentManagement.children.create}
                  onChange={(e) => handleFeatureChildChange('contentManagement', 'create', e.target.checked)}
                />
                <CwCheckbox 
                  label="編輯" 
                  checked={features.contentManagement.children.edit}
                  onChange={(e) => handleFeatureChildChange('contentManagement', 'edit', e.target.checked)}
                />
                <CwCheckbox 
                  label="刪除" 
                  checked={features.contentManagement.children.delete}
                  onChange={(e) => handleFeatureChildChange('contentManagement', 'delete', e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          在權限管理中，父選項的狀態會根據子選項自動更新
        </p>
      </section>

      {/* 表單應用 */}
      <section className="space-y-4">
        <h3>7. 表單應用</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border space-y-6">
          <div>
            <label className="block mb-3">興趣愛好（可多選）</label>
            <div className="space-y-2">
              <CwCheckbox 
                label="閱讀" 
                checked={checkedItems.item1}
                onChange={(e) => setCheckedItems(prev => ({ ...prev, item1: e.target.checked }))}
              />
              <CwCheckbox 
                label="運動" 
                checked={checkedItems.item2}
                onChange={(e) => setCheckedItems(prev => ({ ...prev, item2: e.target.checked }))}
              />
              <CwCheckbox 
                label="旅遊" 
                checked={checkedItems.item3}
                onChange={(e) => setCheckedItems(prev => ({ ...prev, item3: e.target.checked }))}
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="space-y-2">
              <CwCheckbox 
                label="我已閱讀並同意服務條款" 
                checked={false}
                error="請勾選以繼續"
              />
              <CwCheckbox 
                label="訂閱電子報（選填）" 
                checked={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 程式碼範例 */}
      <section className="space-y-4">
        <h3>8. 程式碼範例</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <pre className="text-foreground overflow-x-auto" style={{ fontSize: 'var(--text-sm)' }}>
{`import { CwCheckbox } from "./components/CwCheckbox";

// 基本使用
<CwCheckbox 
  label="選項 1" 
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// 部分選擇（層級結構）
<CwCheckbox 
  label="全選" 
  checked={allChecked}
  indeterminate={someChecked}
  onChange={(e) => handleSelectAll(e.target.checked)}
/>

// 錯誤狀態
<CwCheckbox 
  label="必須同意條款" 
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  error={!agreed ? "請勾選以繼續" : ""}
/>

// 禁用狀態
<CwCheckbox 
  label="禁用選項" 
  disabled
  checked={true}
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default CwCheckboxExamples;