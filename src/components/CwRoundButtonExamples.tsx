import { CwRoundButton } from "./CwRoundButton";

/**
 * CwRoundButton 組件使用範例
 * 圓形按鈕，用於表格內的操作
 * Hover 時 icon 會變色
 */
export function CwRoundButtonExamples() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <h2 className="mb-6">CwRoundButton 組件使用範例</h2>
      
      {/* 基本使用 */}
      <section className="space-y-4">
        <h3>1. 基本操作按鈕</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          預設狀態為灰色 (#7C808C)，Hover 時變為藍色 (#01579B)
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="refresh" aria-label="刷新" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              刷新
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="view" aria-label="查看" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              查看
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="edit" aria-label="編輯" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              編輯
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="search" aria-label="搜尋" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              搜尋
            </span>
          </div>
        </div>
      </section>

      {/* 危險操作按鈕 */}
      <section className="space-y-4">
        <h3>2. 危險操作按鈕</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          使用 destructive 屬性，Hover 時變為紅色 (#B33C12)
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="delete" destructive aria-label="刪除" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              刪除
            </span>
          </div>
        </div>
      </section>

      {/* 禁用狀態 */}
      <section className="space-y-4">
        <h3>3. 禁用狀態</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          禁用時顯示為灰色 (#CDCDCD)，且不可點擊
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="refresh" disabled aria-label="刷新" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              刷新（禁用）
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="view" disabled aria-label="查看" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              查看（禁用）
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="edit" disabled aria-label="編輯" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              編輯（禁用）
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <CwRoundButton icon="delete" destructive disabled aria-label="刪除" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              刪除（禁用）
            </span>
          </div>
        </div>
      </section>

      {/* 表格應用範例 */}
      <section className="space-y-4">
        <h3>4. 表格內應用範例</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          在表格操作欄中使用
        </p>
        <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#e9ebf2]">
              <tr>
                <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-base)' }}>#</th>
                <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-base)' }}>姓名</th>
                <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-base)' }}>帳號</th>
                <th className="px-4 py-3 text-center" style={{ fontSize: 'var(--text-base)' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border hover:bg-muted/5">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">王小明</td>
                <td className="px-4 py-3">wang001</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <CwRoundButton icon="view" aria-label="查看" />
                    <CwRoundButton icon="edit" aria-label="編輯" />
                    <CwRoundButton icon="delete" destructive aria-label="刪除" />
                  </div>
                </td>
              </tr>
              <tr className="border-t border-border hover:bg-muted/5">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">李小華</td>
                <td className="px-4 py-3">lee002</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <CwRoundButton icon="view" aria-label="查看" />
                    <CwRoundButton icon="edit" aria-label="編輯" />
                    <CwRoundButton icon="delete" destructive aria-label="刪除" />
                  </div>
                </td>
              </tr>
              <tr className="border-t border-border hover:bg-muted/5">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">張小美</td>
                <td className="px-4 py-3">chang003</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <CwRoundButton icon="view" aria-label="查看" />
                    <CwRoundButton icon="edit" disabled aria-label="編輯" />
                    <CwRoundButton icon="delete" destructive disabled aria-label="刪除" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          第三行示範了禁用狀態的應用場景
        </p>
      </section>

      {/* 圖標類型總覽 */}
      <section className="space-y-4">
        <h3>5. 圖標類型總覽</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="flex flex-col items-center gap-3 p-4 hover:bg-muted/10 rounded-[var(--radius)] transition-colors">
              <CwRoundButton icon="refresh" aria-label="刷新" />
              <div className="text-center">
                <p style={{ fontSize: 'var(--text-base)' }}>refresh</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  刷新/重置
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-4 hover:bg-muted/10 rounded-[var(--radius)] transition-colors">
              <CwRoundButton icon="view" aria-label="查看" />
              <div className="text-center">
                <p style={{ fontSize: 'var(--text-base)' }}>view</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  查看/檢視
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-4 hover:bg-muted/10 rounded-[var(--radius)] transition-colors">
              <CwRoundButton icon="edit" aria-label="編輯" />
              <div className="text-center">
                <p style={{ fontSize: 'var(--text-base)' }}>edit</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  編輯
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-4 hover:bg-muted/10 rounded-[var(--radius)] transition-colors">
              <CwRoundButton icon="search" aria-label="搜尋" />
              <div className="text-center">
                <p style={{ fontSize: 'var(--text-base)' }}>search</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  搜尋/查詢
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-4 hover:bg-muted/10 rounded-[var(--radius)] transition-colors">
              <CwRoundButton icon="delete" destructive aria-label="刪除" />
              <div className="text-center">
                <p style={{ fontSize: 'var(--text-base)' }}>delete</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  刪除（危險）
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default CwRoundButtonExamples;