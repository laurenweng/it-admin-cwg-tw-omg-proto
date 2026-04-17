import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";

/**
 * CwTitle 元件使用範例
 * 展示各種使用情境
 */
export function CwTitleExamples() {
  const handleNavigate = (href: string, index: number) => {
    console.log(`導航到: ${href}, 索引: ${index}`);
  };

  // 範例 1: 兩層麵包屑
  const breadcrumbs2Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "會員查詢" }
  ];

  // 範例 2: 三層麵包屑
  const breadcrumbs3Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "會員管理", href: "/members" },
    { label: "會員查詢" }
  ];

  // 範例 3: 四層麵包屑
  const breadcrumbs4Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "ERP查詢", href: "/erp" },
    { label: "ERP查詢", href: "/erp/query" },
    { label: "客制單查詢" }
  ];

  // 範例 4: 五層麵包屑
  const breadcrumbs5Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "ERP查詢", href: "/erp" },
    { label: "訂單管理", href: "/erp/orders" },
    { label: "訂單詳情", href: "/erp/orders/123" },
    { label: "編輯訂單" }
  ];

  return (
    <div className="p-8 space-y-8 bg-background">
      <div>
        <h1 className="mb-6">CwTitle 元件範例</h1>
        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>
          頁面標題元件，由標題文字與麵包屑導航組成，出現在每一頁內容區域的上方。
        </p>
      </div>

      {/* 基本使用 - 兩層 */}
      <section className="space-y-4">
        <h3>1. 基本使用 - 兩層麵包屑</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwTitle 
            title="會員查詢" 
            breadcrumbs={breadcrumbs2Levels}
            onBreadcrumbNavigate={handleNavigate}
          />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          最簡單的結構，標題在左側，麵包屑在右側
        </p>
      </section>

      {/* 三層麵包屑 */}
      <section className="space-y-4">
        <h3>2. 三層麵包屑</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwTitle 
            title="會員查詢" 
            breadcrumbs={breadcrumbs3Levels}
            onBreadcrumbNavigate={handleNavigate}
          />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          常見的三層結構，清楚顯示頁面位置
        </p>
      </section>

      {/* 四層麵包屑 */}
      <section className="space-y-4">
        <h3>3. 四層麵包屑</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwTitle 
            title="客制單查詢" 
            breadcrumbs={breadcrumbs4Levels}
            onBreadcrumbNavigate={handleNavigate}
          />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          較深的層級結構
        </p>
      </section>

      {/* 五層麵包屑（最大） */}
      <section className="space-y-4">
        <h3>4. 五層麵包屑（最大）</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwTitle 
            title="編輯訂單" 
            breadcrumbs={breadcrumbs5Levels}
            onBreadcrumbNavigate={handleNavigate}
          />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          最多支援 5 層麵包屑
        </p>
      </section>

      {/* 實際應用場景 */}
      <section className="space-y-4">
        <h3>5. 實際應用場景</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border space-y-6">
          <div>
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>會員列表頁：</p>
            <CwTitle 
              title="會員列表" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "會員列表" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>

          <div className="border-t border-border pt-6">
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>會員詳情頁：</p>
            <CwTitle 
              title="會員詳情" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "會員管理", href: "/members" },
                { label: "會員詳情" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>

          <div className="border-t border-border pt-6">
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>訂單管理頁：</p>
            <CwTitle 
              title="訂單管理" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "ERP查詢", href: "/erp" },
                { label: "訂單管理" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>

          <div className="border-t border-border pt-6">
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>個案列表頁（Figma 範例）：</p>
            <CwTitle 
              title="個案列表" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "ERP查詢", href: "/erp" },
                { label: "客制單查詢" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>
        </div>
      </section>

      {/* 不同標題長度 */}
      <section className="space-y-4">
        <h3>6. 不同標題長度</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border space-y-6">
          <div>
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>短標題：</p>
            <CwTitle 
              title="設定" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "設定" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>

          <div className="border-t border-border pt-6">
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>中等長度標題：</p>
            <CwTitle 
              title="系統管理與設定" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "系統管理", href: "/system" },
                { label: "系統管理與設定" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>

          <div className="border-t border-border pt-6">
            <p className="mb-3" style={{ fontSize: 'var(--text-sm)' }}>較長標題：</p>
            <CwTitle 
              title="社工管理與個案追蹤系統" 
              breadcrumbs={[
                { label: "首頁", href: "/" },
                { label: "個案管理", href: "/cases" },
                { label: "社工管理與個案追蹤系統" }
              ]}
              onBreadcrumbNavigate={handleNavigate}
            />
          </div>
        </div>
      </section>

      {/* 程式碼範例 */}
      <section className="space-y-4">
        <h3>7. 程式碼範例</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <pre className="text-foreground overflow-x-auto" style={{ fontSize: 'var(--text-sm)' }}>
{`import { CwTitle } from "./components/CwTitle";
import { BreadcrumbItem } from "./components/CwBreadcrumbs";

function MyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "會員管理", href: "/members" },
    { label: "會員查詢" }
  ];

  const handleNavigate = (href: string, index: number) => {
    // 執行路由跳轉
    window.location.href = href;
  };

  return (
    <div className="px-[30px] py-[20px] space-y-6">
      <CwTitle 
        title="會員查詢" 
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleNavigate}
      />
      
      {/* 頁面內容 */}
      <div>...</div>
    </div>
  );
}`}
          </pre>
        </div>
      </section>

      {/* 最佳實踐 */}
      <section className="space-y-4">
        <h3>9. 最佳實踐</h3>
        <div className="bg-secondary/5 p-6 rounded-[var(--radius-card)] border border-secondary/20">
          <h4 className="mb-3 text-secondary">✨ 建議</h4>
          <div className="space-y-2 text-foreground" style={{ fontSize: 'var(--text-base)' }}>
            <div className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              <p>每個頁面都應該使用 CwTitle 元件，提供一致的頁面標題體驗</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              <p>標題文字應該簡潔明瞭，清楚描述當前頁面的功能</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              <p>麵包屑應該準確反映頁面的層級結構</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              <p>建議將 CwTitle 放在內容區域的最上方，與主要內容保持適當間距</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CwTitleExamples;