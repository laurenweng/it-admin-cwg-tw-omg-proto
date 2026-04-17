import { CwTextButton } from "./CwTextButton";

export function CwTextButtonExamples() {
  return (
    <div className="space-y-6">
      {/* 基本使用 */}
      <div className="space-y-3">
        <h4>基本使用</h4>
        <div className="flex flex-wrap items-center gap-6">
          <CwTextButton 
            label="檢視詳情" 
            icon="document" 
            variant="primary" 
            onClick={() => console.log("檢視詳情")} 
          />
          <CwTextButton 
            label="編輯資料" 
            icon="edit" 
            variant="primary" 
            onClick={() => console.log("編輯資料")} 
          />
          <CwTextButton 
            label="下載檔案" 
            icon="download" 
            variant="primary" 
            onClick={() => console.log("下載檔案")} 
          />
          <CwTextButton 
            label="複製內容" 
            icon="copy" 
            variant="primary" 
            onClick={() => console.log("複製內容")} 
          />
        </div>
      </div>

      {/* 危險操作 */}
      <div className="space-y-3">
        <h4>危險操作（Destructive）</h4>
        <div className="flex flex-wrap items-center gap-6">
          <CwTextButton 
            label="取消關聯" 
            icon="close" 
            variant="destructive" 
            onClick={() => console.log("取消關聯")} 
          />
          <CwTextButton 
            label="刪除項目" 
            icon="delete" 
            variant="destructive" 
            onClick={() => console.log("刪除項目")} 
          />
        </div>
      </div>

      {/* 無圖標 */}
      <div className="space-y-3">
        <h4>無圖標</h4>
        <div className="flex flex-wrap items-center gap-6">
          <CwTextButton 
            label="查看更多" 
            variant="primary" 
            onClick={() => console.log("查看更多")} 
          />
          <CwTextButton 
            label="取消操作" 
            variant="destructive" 
            onClick={() => console.log("取消操作")} 
          />
        </div>
      </div>

      {/* 禁用狀態 */}
      <div className="space-y-3">
        <h4>禁用狀態</h4>
        <div className="flex flex-wrap items-center gap-6">
          <CwTextButton 
            label="檢視詳情" 
            icon="document" 
            variant="primary" 
            disabled 
          />
          <CwTextButton 
            label="取消關聯" 
            icon="close" 
            variant="destructive" 
            disabled 
          />
        </div>
      </div>

      {/* 表格中使用範例 */}
      <div className="space-y-3">
        <h4>表格中使用範例</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          文字按鈕主要用於表格操作欄位，提供清楚的文字說明配合圖標
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500]">訂戶編號</th>
                <th className="px-4 py-3 text-left font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500]">訂戶姓名</th>
                <th className="px-4 py-3 text-center font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500]">檢視訂戶</th>
                <th className="px-4 py-3 text-center font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500]">功能</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-['Noto_Sans_TC',_sans-serif] text-[14px]">1234567</td>
                <td className="px-4 py-3 font-['Noto_Sans_TC',_sans-serif] text-[14px]">王小明</td>
                <td className="px-4 py-3 text-center">
                  <CwTextButton 
                    label="檢視詳情" 
                    icon="document" 
                    variant="primary" 
                    onClick={() => console.log("檢視訂戶")} 
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <CwTextButton 
                    label="取消關聯" 
                    icon="close" 
                    variant="destructive" 
                    onClick={() => console.log("取消關聯")} 
                  />
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-['Noto_Sans_TC',_sans-serif] text-[14px]">7654321</td>
                <td className="px-4 py-3 font-['Noto_Sans_TC',_sans-serif] text-[14px]">陳美玲</td>
                <td className="px-4 py-3 text-center">
                  <CwTextButton 
                    label="檢視詳情" 
                    icon="document" 
                    variant="primary" 
                    onClick={() => console.log("檢視訂戶")} 
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <CwTextButton 
                    label="取消關聯" 
                    icon="close" 
                    variant="destructive" 
                    onClick={() => console.log("取消關聯")} 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 使用說明 */}
      <div className="space-y-3 bg-muted p-4 rounded-[var(--radius)]">
        <h4>使用說明</h4>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          <li>文字按鈕主要用於表格操作欄位，提供比圓形按鈕更清楚的文字說明</li>
          <li>支援 primary（藍色）和 destructive（紅色）兩種顏色變體</li>
          <li>可選擇性添加圖標，增強視覺辨識度</li>
          <li>hover 時顏色會變深，提供視覺反饋</li>
          <li>禁用狀態會顯示半透明並無法點擊</li>
          <li>適合需要明確說明操作內容的場景，如「檢視詳情」、「取消關聯」等</li>
        </ul>
      </div>
    </div>
  );
}
