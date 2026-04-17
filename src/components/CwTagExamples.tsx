import { useState } from 'react';
import { CwTag } from './CwTag';

/**
 * CwTag 元件使用範例
 */
export function CwTagExamples() {
  const [tags1, setTags1] = useState(['陳柏凱', '王小明', '李大華']);
  const [tags2, setTags2] = useState(['前端開發', 'React', 'TypeScript', 'Tailwind CSS']);

  const handleRemoveTag1 = (index: number) => {
    setTags1(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveTag2 = (index: number) => {
    setTags2(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 space-y-8 bg-background">
      <div>
        <h1 className="mb-6">CwTag 元件範例</h1>
        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>
          標籤元件，用於顯示已選擇的項目，支援關閉按鈕以取消選取。
        </p>
      </div>

      {/* 基本使用 - 可關閉 */}
      <section className="space-y-4">
        <h3>1. 基本使用 - 可關閉標籤</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="flex flex-wrap gap-2">
            <CwTag label="陳柏凱" onClose={() => console.log('關閉標籤')} />
            <CwTag label="王小明" onClose={() => console.log('關閉標籤')} />
            <CwTag label="李大華" onClose={() => console.log('關閉標籤')} />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          預設顯示關閉按鈕，點擊可觸發 onClose 回調
        </p>
      </section>

      {/* 不可關閉 */}
      <section className="space-y-4">
        <h3>2. 不可關閉標籤</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="flex flex-wrap gap-2">
            <CwTag label="唯讀標籤" closable={false} />
            <CwTag label="不可移除" closable={false} />
            <CwTag label="固定標籤" closable={false} />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          設定 closable={false} 隱藏關閉按鈕
        </p>
      </section>

      {/* 動態標籤 */}
      <section className="space-y-4">
        <h3>3. 動態標籤 - 可移除</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border space-y-4">
          <div>
            <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>
              已選擇的成員（{tags1.length}）：
            </p>
            <div className="flex flex-wrap gap-2">
              {tags1.map((tag, index) => (
                <CwTag 
                  key={index} 
                  label={tag} 
                  onClose={() => handleRemoveTag1(index)} 
                />
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>
              已選擇的技能（{tags2.length}）：
            </p>
            <div className="flex flex-wrap gap-2">
              {tags2.map((tag, index) => (
                <CwTag 
                  key={index} 
                  label={tag} 
                  onClose={() => handleRemoveTag2(index)} 
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          點擊 X 按鈕可移除標籤
        </p>
      </section>

      {/* 不同長度的標籤 */}
      <section className="space-y-4">
        <h3>4. 不同長度的標籤</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="flex flex-wrap gap-2">
            <CwTag label="短" onClose={() => console.log('關閉')} />
            <CwTag label="中等長度標籤" onClose={() => console.log('關閉')} />
            <CwTag label="這是一個比較長的標籤文字" onClose={() => console.log('關閉')} />
            <CwTag label="超級長的標籤文字可能會需要換行處理但這裡會保持單行顯示" onClose={() => console.log('關閉')} />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          標籤文字會保持單行顯示，使用 whitespace-nowrap
        </p>
      </section>

      {/* 在輸入框中使用 */}
      <section className="space-y-4">
        <h3>5. 在輸入框中使用</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="bg-white border border-border rounded-[var(--radius)] px-[12px] py-[6px] min-h-[35px] flex flex-wrap items-center gap-2">
            <CwTag label="陳柏凱" onClose={() => console.log('關閉')} />
            <CwTag label="王小明" onClose={() => console.log('關閉')} />
            <CwTag label="李大華" onClose={() => console.log('關閉')} />
            <input
              type="text"
              placeholder="輸入更多..."
              className="flex-1 min-w-[100px] outline-none bg-transparent"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: 'var(--text-base)',
                fontWeight: '350'
              }}
            />
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          模擬多選輸入框的使用情境
        </p>
      </section>

      {/* 實際應用場景 */}
      <section className="space-y-4">
        <h3>6. 實際應用場景</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border space-y-6">
          <div>
            <label className="block mb-2">已選擇的社工：</label>
            <div className="bg-white border border-border rounded-[var(--radius)] p-3 min-h-[60px]">
              <div className="flex flex-wrap gap-2">
                <CwTag label="張社工" onClose={() => console.log('移除')} />
                <CwTag label="林社工" onClose={() => console.log('移除')} />
                <CwTag label="陳社工" onClose={() => console.log('移除')} />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <label className="block mb-2">已選擇的標籤：</label>
            <div className="bg-white border border-border rounded-[var(--radius)] p-3 min-h-[60px]">
              <div className="flex flex-wrap gap-2">
                <CwTag label="緊急" onClose={() => console.log('移除')} />
                <CwTag label="待處理" onClose={() => console.log('移除')} />
                <CwTag label="高優先級" onClose={() => console.log('移除')} />
                <CwTag label="需追蹤" onClose={() => console.log('移除')} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 程式碼範例 */}
      <section className="space-y-4">
        <h3>7. 程式碼範例</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <pre className="text-foreground overflow-x-auto" style={{ fontSize: 'var(--text-sm)' }}>
{`import { CwTag } from "./components/CwTag";

// 基本使用
<CwTag 
  label="標籤文字" 
  onClose={() => console.log('關閉標籤')} 
/>

// 不可關閉
<CwTag 
  label="固定標籤" 
  closable={false} 
/>

// 動態標籤列表
const [tags, setTags] = useState(['標籤1', '標籤2']);

const handleRemove = (index: number) => {
  setTags(prev => prev.filter((_, i) => i !== index));
};

<div className="flex flex-wrap gap-2">
  {tags.map((tag, index) => (
    <CwTag 
      key={index}
      label={tag}
      onClose={() => handleRemove(index)}
    />
  ))}
</div>`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default CwTagExamples;