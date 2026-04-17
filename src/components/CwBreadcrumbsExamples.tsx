import { CwBreadcrumbs, BreadcrumbItem } from "./CwBreadcrumbs";

/**
 * CwBreadcrumbs 組件使用範例
 * 展示所有可能的使用情境
 */
export function CwBreadcrumbsExamples() {
  // 範例 1: 兩層階層
  const breadcrumbs2Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "客制單查詢" }
  ];

  // 範例 2: 三層階層
  const breadcrumbs3Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "ERP查詢", href: "/erp" },
    { label: "客制單查詢" }
  ];

  // 範例 3: 四層階層
  const breadcrumbs4Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "ERP查詢", href: "/erp" },
    { label: "ERP查詢", href: "/erp/query" },
    { label: "客制單查詢" }
  ];

  // 範例 4: 五層階層
  const breadcrumbs5Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "ERP查詢", href: "/erp" },
    { label: "ERP查詢", href: "/erp/query" },
    { label: "ERP查詢", href: "/erp/query/detail" },
    { label: "客制單查詢" }
  ];

  // 範例 5: 超過五層（會自動截斷到 5 層）
  const breadcrumbsOver5Levels: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "層級 2", href: "/level2" },
    { label: "層級 3", href: "/level3" },
    { label: "層級 4", href: "/level4" },
    { label: "層級 5", href: "/level5" },
    { label: "層級 6", href: "/level6" },
    { label: "當前頁面" }
  ];

  const handleNavigate = (href: string, index: number) => {
    console.log(`導航到: ${href}, 索引: ${index}`);
    // 在實際應用中，這裡會執行路由跳轉
  };

  return (
    <div className="p-8 space-y-8 bg-background">
      <div>
        <h1 className="mb-6">CwBreadcrumbs 元件範例</h1>
        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>
          麵包屑導航元件，用於顯示當前頁面在網站層級結構中的位置。
        </p>
      </div>

      {/* 基本使用 - 兩層 */}
      <section className="space-y-4">
        <h3>1. 兩層階層</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwBreadcrumbs items={breadcrumbs2Levels} onNavigate={handleNavigate} />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          最簡單的麵包屑結構，首頁可點擊，當前頁面不可點擊
        </p>
      </section>

      {/* 三層階層 */}
      <section className="space-y-4">
        <h3>2. 三層階層</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwBreadcrumbs items={breadcrumbs3Levels} onNavigate={handleNavigate} />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          常見的三層結構，首頁和中間層級可點擊
        </p>
      </section>

      {/* 四層階層 */}
      <section className="space-y-4">
        <h3>3. 四層階層</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwBreadcrumbs items={breadcrumbs4Levels} onNavigate={handleNavigate} />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          較深的層級結構
        </p>
      </section>

      {/* 五層階層（最大） */}
      <section className="space-y-4">
        <h3>4. 五層階層（最大）</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwBreadcrumbs items={breadcrumbs5Levels} onNavigate={handleNavigate} />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          最多支援 5 層，避免階層過深影響閱讀
        </p>
      </section>

      {/* 超過五層（自動截斷） */}
      <section className="space-y-4">
        <h3>5. 超過五層（自動截斷）</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <CwBreadcrumbs items={breadcrumbsOver5Levels} onNavigate={handleNavigate} />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          當階層超過 5 層時，自動截取前 5 層顯示
        </p>
      </section>

      {/* 實際應用 - 會員管理 */}
      <section className="space-y-4">
        <h3>6. 實際應用 - 會員管理</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border space-y-4">
          <div>
            <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>會員列表頁面：</p>
            <CwBreadcrumbs 
              items={[
                { label: "首頁", href: "/" },
                { label: "會員管理" }
              ]} 
              onNavigate={handleNavigate} 
            />
          </div>
          
          <div>
            <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>會員詳情頁面：</p>
            <CwBreadcrumbs 
              items={[
                { label: "首頁", href: "/" },
                { label: "會員管理", href: "/members" },
                { label: "會員詳情" }
              ]} 
              onNavigate={handleNavigate} 
            />
          </div>
          
          <div>
            <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>編輯會員頁面：</p>
            <CwBreadcrumbs 
              items={[
                { label: "首頁", href: "/" },
                { label: "會員管理", href: "/members" },
                { label: "會員詳情", href: "/members/123" },
                { label: "編輯會員" }
              ]} 
              onNavigate={handleNavigate} 
            />
          </div>
        </div>
      </section>

      {/* 程式碼範例 */}
      <section className="space-y-4">
        <h3>7. 程式碼範例</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <pre className="text-foreground overflow-x-auto" style={{ fontSize: 'var(--text-sm)' }}>
{`import { CwBreadcrumbs, BreadcrumbItem } from "./components/CwBreadcrumbs";

const breadcrumbs: BreadcrumbItem[] = [
  { label: "首頁", href: "/" },
  { label: "會員管理", href: "/members" },
  { label: "會員詳情" }
];

function MyPage() {
  const handleNavigate = (href: string, index: number) => {
    // 執行路由跳轉
    window.location.href = href;
  };

  return (
    <CwBreadcrumbs 
      items={breadcrumbs} 
      onNavigate={handleNavigate} 
    />
  );
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default CwBreadcrumbsExamples;