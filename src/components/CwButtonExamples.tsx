import { CwButton, PlusIcon } from "./CwButton";
import { Search, RotateCcw, Edit, Trash2, Download, Upload, X } from "lucide-react";

/**
 * CwButton 組件使用範例
 * 展示所有可能的使用情境
 */
export function CwButtonExamples() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <h2 className="mb-6">CwButton 組件使用範例</h2>
      
      {/* 實心按鈕 - 帶圖標和文字 */}
      <section className="space-y-4">
        <h3>1. 實心按鈕 - 帶圖標和文字</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          Icon 顏色會自動匹配文字顏色，實心按鈕時為白色
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton 
            variant="primary"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="destructive"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="success"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="secondary"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="info"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="disabled"
            disabled
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
        </div>
      </section>

      {/* 實心按鈕 - 只有文字 */}
      <section className="space-y-4">
        <h3>2. 實心按鈕 - 只有文字</h3>
        <div className="flex flex-wrap gap-4">
          <CwButton variant="primary">
            搜尋
          </CwButton>
          
          <CwButton variant="destructive">
            搜尋
          </CwButton>
          
          <CwButton variant="success">
            搜尋
          </CwButton>
          
          <CwButton variant="secondary">
            搜尋
          </CwButton>
          
          <CwButton variant="info">
            搜尋
          </CwButton>
          
          <CwButton variant="disabled" disabled>
            搜尋
          </CwButton>
        </div>
      </section>

      {/* 實心按鈕 - 只有圖標 */}
      <section className="space-y-4">
        <h3>3. 實心按鈕 - 只有圖標</h3>
        <div className="flex flex-wrap gap-4">
          <CwButton 
            variant="primary"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="destructive"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="success"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="secondary"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="info"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="disabled"
            disabled
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
        </div>
      </section>

      {/* 線框按鈕 - 帶圖標和文字 */}
      <section className="space-y-4">
        <h3>4. 線框按鈕 - 帶圖標和文字</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          Icon 顏色會自動匹配文字顏色，線框按鈕時為對應的變體顏色
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton 
            variant="primary"
            appearance="outlined"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="destructive"
            appearance="outlined"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="success"
            appearance="outlined"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="secondary"
            appearance="outlined"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="info"
            appearance="outlined"
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="disabled"
            appearance="outlined"
            disabled
            leftIcon={<PlusIcon />}
          >
            搜尋
          </CwButton>
        </div>
      </section>

      {/* 線框按鈕 - 只有文字 */}
      <section className="space-y-4">
        <h3>5. 線框按鈕 - 只有文字</h3>
        <div className="flex flex-wrap gap-4">
          <CwButton variant="primary" appearance="outlined">
            搜尋
          </CwButton>
          
          <CwButton variant="destructive" appearance="outlined">
            搜尋
          </CwButton>
          
          <CwButton variant="success" appearance="outlined">
            搜尋
          </CwButton>
          
          <CwButton variant="secondary" appearance="outlined">
            搜尋
          </CwButton>
          
          <CwButton variant="info" appearance="outlined">
            搜尋
          </CwButton>
          
          <CwButton variant="disabled" appearance="outlined" disabled>
            搜尋
          </CwButton>
        </div>
      </section>

      {/* 線框按鈕 - 只有圖標 */}
      <section className="space-y-4">
        <h3>6. 線框按鈕 - 只有圖標</h3>
        <div className="flex flex-wrap gap-4">
          <CwButton 
            variant="primary"
            appearance="outlined"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="destructive"
            appearance="outlined"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="success"
            appearance="outlined"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="secondary"
            appearance="outlined"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="info"
            appearance="outlined"
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
          
          <CwButton 
            variant="disabled"
            appearance="outlined"
            disabled
            iconOnly
            leftIcon={<PlusIcon />}
            aria-label="新增"
          />
        </div>
      </section>

      {/* 使用 Lucide 圖標 */}
      <section className="space-y-4">
        <h3>7. 使用 Lucide 圖標</h3>
        <div className="flex flex-wrap gap-4">
          <CwButton 
            variant="primary"
            leftIcon={<Search className="h-[14px] w-[14px]" />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="secondary"
            appearance="outlined"
            leftIcon={<RotateCcw className="h-[14px] w-[14px]" />}
          >
            重置
          </CwButton>
          
          <CwButton 
            variant="info"
            leftIcon={<Edit className="h-[14px] w-[14px]" />}
          >
            編輯
          </CwButton>
          
          <CwButton 
            variant="destructive"
            leftIcon={<Trash2 className="h-[14px] w-[14px]" />}
          >
            刪除
          </CwButton>
          
          <CwButton 
            variant="success"
            leftIcon={<Download className="h-[14px] w-[14px]" />}
          >
            下載
          </CwButton>
          
          <CwButton 
            variant="primary"
            appearance="outlined"
            leftIcon={<Upload className="h-[14px] w-[14px]" />}
          >
            上傳
          </CwButton>
        </div>
      </section>

      {/* 實際應用範例 */}
      <section className="space-y-4">
        <h3>8. 實際應用範例 - 表單操作</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          主按鈕使用 Primary 實心，次要按鈕使用 Primary outline
        </p>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-4">
            <div>
              <label className="block mb-2">會員姓名</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-border rounded-[var(--radius)]"
                placeholder="請輸入會員姓名"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<RotateCcw className="h-[14px] w-[14px]" />}
              >
                取消
              </CwButton>
              
              <CwButton 
                variant="primary"
                leftIcon={<Search className="h-[14px] w-[14px]" />}
              >
                確認送出
              </CwButton>
            </div>
          </div>
        </div>
      </section>

      {/* 實際應用範例 - 卡片操作 */}
      <section className="space-y-4">
        <h3>9. 實際應用範例 - 卡片操作</h3>
        <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
          <div className="space-y-4">
            <h4>會員資訊</h4>
            <p className="text-muted-foreground">這裡是會員的詳細資訊內容...</p>
            
            <div className="flex gap-3">
              <CwButton 
                variant="info"
                leftIcon={<Edit className="h-[14px] w-[14px]" />}
              >
                編輯
              </CwButton>
              
              <CwButton 
                variant="destructive"
                appearance="outlined"
                leftIcon={<Trash2 className="h-[14px] w-[14px]" />}
              >
                刪除
              </CwButton>
            </div>
          </div>
        </div>
      </section>

      {/* 禁用狀態說明 */}
      <section className="space-y-4">
        <h3>10. 禁用狀態</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          禁用狀態下按鈕呈現灰色，且不可點擊
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton 
            variant="primary"
            disabled
            leftIcon={<Search className="h-[14px] w-[14px]" />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="primary"
            appearance="outlined"
            disabled
            leftIcon={<Search className="h-[14px] w-[14px]" />}
          >
            搜尋
          </CwButton>
          
          <CwButton 
            variant="primary"
            disabled
          >
            搜尋
          </CwButton>
        </div>
      </section>

      {/* 按鈕層級設計原則 */}
      <section className="space-y-4">
        <h3>11. 按鈕層級設計原則</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          同一頁面中，主要操作使用 Primary 實心，其他按鈕使用 Primary outline，保持視覺層級
        </p>
        
        <div className="space-y-6">
          {/* 搜尋列範例 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">搜尋列範例</h4>
            <div className="flex gap-3">
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<RotateCcw className="h-[14px] w-[14px]" />}
              >
                清除
              </CwButton>
              <CwButton 
                variant="primary"
                leftIcon={<Search className="h-[14px] w-[14px]" />}
              >
                查詢條件
              </CwButton>
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<PlusIcon />}
              >
                新增會員
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              「查詢」為主要操作使用實心，「清除」和「新增」為次要操作使用 outline
            </p>
          </div>

          {/* 表單送出範例 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">表單送出範例</h4>
            <div className="flex gap-3 justify-end">
              <CwButton 
                variant="primary"
                appearance="outlined"
              >
                取消
              </CwButton>
              <CwButton 
                variant="primary"
              >
                確認送出
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              「確認送出」為主要操作使用實心，「取消」為次要操作使用 outline
            </p>
          </div>

          {/* 多操作範例 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">多操作範例（根據特性添加 icon）</h4>
            <div className="flex gap-3">
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<Edit className="h-[14px] w-[14px]" />}
              >
                編輯
              </CwButton>
              <CwButton 
                variant="primary"
                leftIcon={<Download className="h-[14px] w-[14px]" />}
              >
                匯出資料
              </CwButton>
              <CwButton 
                variant="destructive"
                appearance="outlined"
                leftIcon={<Trash2 className="h-[14px] w-[14px]" />}
              >
                刪除
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              主操作「匯出」使用實心，次要操作使用 outline，危險操作使用 destructive 變體
            </p>
          </div>
        </div>
      </section>

      {/* 按鈕組排列規則 */}
      <section className="space-y-4">
        <h3>12. 按鈕組排列規則（重要）</h3>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          當畫面中有多個 CwButton 為一組時，按鈕排列順序由左至右依序為：<strong>取消(outline) {'>'} outline {'>'} 實心 {'>'} 刪除(實心)</strong>
        </p>
        
        <div className="space-y-6">
          {/* 標準四按鈕組 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">標準四按鈕組合</h4>
            <div className="flex gap-2">
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<X className="h-[14px] w-[14px]" />}
              >
                取消
              </CwButton>
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<Edit className="h-[14px] w-[14px]" />}
              >
                編輯
              </CwButton>
              <CwButton 
                variant="primary"
                leftIcon={<PlusIcon />}
              >
                新增
              </CwButton>
              <CwButton 
                variant="destructive"
                leftIcon={<Trash2 className="h-[14px] w-[14px]" />}
              >
                刪除
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              由左至右：取消(outline) → 編輯(outline) → 新增(實心) → 刪除(實心 destructive)
            </p>
          </div>

          {/* 三按鈕組 - 無取消 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">三按鈕組合（無取消按鈕）</h4>
            <div className="flex gap-2">
              <CwButton 
                variant="primary"
                appearance="outlined"
                leftIcon={<Edit className="h-[14px] w-[14px]" />}
              >
                編輯
              </CwButton>
              <CwButton 
                variant="primary"
                leftIcon={<Download className="h-[14px] w-[14px]" />}
              >
                匯出
              </CwButton>
              <CwButton 
                variant="destructive"
                leftIcon={<Trash2 className="h-[14px] w-[14px]" />}
              >
                刪除
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              無取消按鈕時：編輯(outline) → 匯出(實心) → 刪除(實心 destructive)
            </p>
          </div>

          {/* 雙按鈕組 - 確認與取消 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">雙按鈕組合（確認與取消）</h4>
            <div className="flex gap-2 justify-end">
              <CwButton 
                variant="primary"
                appearance="outlined"
              >
                取消
              </CwButton>
              <CwButton 
                variant="primary"
              >
                確認
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              對話框或表單：取消(outline) → 確認(實心)
            </p>
          </div>

          {/* 雙按鈕組 - 操作與刪除 */}
          <div className="bg-card p-6 rounded-[var(--radius-card)] border border-border">
            <h4 className="mb-4">雙按鈕組合（操作與刪除）</h4>
            <div className="flex gap-2">
              <CwButton 
                variant="primary"
                leftIcon={<Edit className="h-[14px] w-[14px]" />}
              >
                編輯
              </CwButton>
              <CwButton 
                variant="destructive"
                leftIcon={<Trash2 className="h-[14px] w-[14px]" />}
              >
                刪除
              </CwButton>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: 'var(--text-sm)' }}>
              只有主操作和刪除：編輯(實心) → 刪除(實心 destructive)
            </p>
          </div>

          {/* 錯誤示範 */}
          <div className="bg-destructive/5 p-6 rounded-[var(--radius-card)] border-2 border-destructive/20">
            <h4 className="mb-4 text-destructive">❌ 錯誤示範</h4>
            <div className="space-y-3">
              <div>
                <div className="flex gap-2 mb-2">
                  <CwButton variant="destructive" leftIcon={<Trash2 className="h-[14px] w-[14px]" />}>
                    刪除
                  </CwButton>
                  <CwButton variant="primary">
                    新增
                  </CwButton>
                  <CwButton variant="primary" appearance="outlined">
                    取消
                  </CwButton>
                </div>
                <p className="text-destructive" style={{ fontSize: 'var(--text-sm)' }}>
                  ✗ 順序錯誤：刪除不應該放在最左邊
                </p>
              </div>
              
              <div>
                <div className="flex gap-2 mb-2">
                  <CwButton variant="primary">
                    確認
                  </CwButton>
                  <CwButton variant="primary" appearance="outlined">
                    取消
                  </CwButton>
                </div>
                <p className="text-destructive" style={{ fontSize: 'var(--text-sm)' }}>
                  ✗ 順序錯誤：取消應該在確認左邊
                </p>
              </div>
            </div>
          </div>

          {/* 規則總結 */}
          <div className="bg-primary/5 p-6 rounded-[var(--radius-card)] border border-primary/20">
            <h4 className="mb-3 text-primary">📋 排列規則總結</h4>
            <div className="space-y-2 text-foreground" style={{ fontSize: 'var(--text-base)' }}>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <p><strong>取消按鈕</strong>：永遠放在最左邊，使用 Primary outline</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <p><strong>次要操作</strong>：放在中間偏左，使用 Primary outline，可加 icon</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <p><strong>主要操作</strong>：放在中間偏右，使用 Primary 實心，可加 icon</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <p><strong>刪除按鈕</strong>：永遠放在最右邊，使用 Destructive 實心，必須加 icon</p>
              </div>
              <div className="flex items-start gap-2 mt-4 pt-4 border-t border-primary/20">
                <span className="text-primary font-bold">⚠️</span>
                <p><strong>注意</strong>：不是所有按鈕組都需要包含全部四種，但有出現時必須遵守此順序</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CwButtonExamples;