import React, { useState } from 'react';
import { CwPopup, CwPopupButton } from './CwPopup';
import { CwButton } from './CwButton';
import { CwSelect } from './CwSelect';
import { CwInput } from './CwInput';

export const CwPopupExamples: React.FC = () => {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [warningPopup, setWarningPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [questionPopup, setQuestionPopup] = useState(false);
  const [scrollPopup, setScrollPopup] = useState(false);
  const [noHeaderPopup, setNoHeaderPopup] = useState(false);
  const [noFooterPopup, setNoFooterPopup] = useState(false);
  const [topCenterPopup, setTopCenterPopup] = useState(false);
  const [smPopup, setSmPopup] = useState(false);
  const [mdPopup, setMdPopup] = useState(false);
  const [lgPopup, setLgPopup] = useState(false);
  const [xlPopup, setXlPopup] = useState(false);
  const [fitPopup, setFitPopup] = useState(false);
  const [formPopup, setFormPopup] = useState(false);
  
  // 表單 Popup 狀態
  const [formName, setFormName] = useState('');
  const [formDepartment, setFormDepartment] = useState('');
  const [formRole, setFormRole] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState('');

  // 確認型按鈕（不可點擊 mask 關閉）
  const confirmButtons: CwPopupButton[] = [
    {
      label: '取消',
      variant: 'primary',
      appearance: 'outlined',
      onClick: () => setConfirmPopup(false),
    },
    {
      label: '確認',
      variant: 'primary',
      appearance: 'filled',
      onClick: () => {
        console.log('已確認');
        setConfirmPopup(false);
      },
    },
  ];

  // 一般型按鈕（可點擊 mask 關閉）
  const generalButtons: CwPopupButton[] = [
    {
      label: '關閉',
      variant: 'primary',
      appearance: 'outlined',
      onClick: () => {},
    },
  ];

  // 三按鈕組（取消 > outline > 實心）
  const threeButtons: CwPopupButton[] = [
    {
      label: '取消',
      variant: 'primary',
      appearance: 'outlined',
      onClick: () => setWarningPopup(false),
    },
    {
      label: '稍後再說',
      variant: 'primary',
      appearance: 'outlined',
      onClick: () => {
        console.log('稍後再說');
        setWarningPopup(false);
      },
    },
    {
      label: '立即處理',
      variant: 'primary',
      appearance: 'filled',
      onClick: () => {
        console.log('立即處理');
        setWarningPopup(false);
      },
    },
  ];

  // 刪除型按鈕（取消 > 刪除）
  const deleteButtons: CwPopupButton[] = [
    {
      label: '取消',
      variant: 'primary',
      appearance: 'outlined',
      onClick: () => setErrorPopup(false),
    },
    {
      label: '刪除',
      variant: 'destructive',
      appearance: 'filled',
      onClick: () => {
        console.log('已刪除');
        setErrorPopup(false);
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 基本使用 */}
      <div className="space-y-3">
        <h4>1. 確認型 Popup（不可點擊 mask 關閉）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          用於需要強制使用者確認意圖的場景，不可點擊遮罩關閉，必須透過按鈕操作。
        </p>
        <div className="flex gap-4">
          <CwButton variant="primary" onClick={() => setConfirmPopup(true)}>
            開啟確認 Popup
          </CwButton>
        </div>
      </div>

      {/* 不同類型 */}
      <div className="space-y-3">
        <h4>2. 不同類型的 Popup（可點擊 mask 關閉）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          一般用途的 Popup 可以點擊遮罩快速關閉，並根據類型顯示對應圖標。
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton variant="info" onClick={() => setInfoPopup(true)}>
            Info Popup
          </CwButton>
          <CwButton variant="primary" onClick={() => setSuccessPopup(true)}>
            Success Popup
          </CwButton>
          <CwButton variant="secondary" onClick={() => setWarningPopup(true)}>
            Warning Popup
          </CwButton>
          <CwButton variant="destructive" onClick={() => setErrorPopup(true)}>
            Error Popup
          </CwButton>
          <CwButton variant="primary" appearance="outlined" onClick={() => setQuestionPopup(true)}>
            Question Popup
          </CwButton>
        </div>
      </div>

      {/* 可滾動內容 */}
      <div className="space-y-3">
        <h4>3. 可滾動內容（帶漸變效果）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當內容過多時，啟用滾動並顯示頂部和底部的漸變提示。
        </p>
        <div className="flex gap-4">
          <CwButton variant="primary" onClick={() => setScrollPopup(true)}>
            開啟滾動 Popup
          </CwButton>
        </div>
      </div>

      {/* Header/Footer 變化 */}
      <div className="space-y-3">
        <h4>4. Header / Footer 顯示控制</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          可以選擇性隱藏 Header 或 Footer，但不可同時隱藏兩者。
        </p>
        <div className="flex gap-4">
          <CwButton variant="primary" appearance="outlined" onClick={() => setNoHeaderPopup(true)}>
            無 Header Popup
          </CwButton>
          <CwButton variant="primary" appearance="outlined" onClick={() => setNoFooterPopup(true)}>
            無 Footer Popup
          </CwButton>
        </div>
      </div>

      {/* 尺寸規格 */}
      <div className="space-y-3">
        <h4>5. 尺寸規格</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          提供五種尺寸選擇：sm (400px)、md (400-800px)、lg (400-976px)、xl (400-1080px)、fit (400px-80%)。
        </p>
        <div className="flex flex-wrap gap-4">
          <CwButton variant="primary" appearance="outlined" onClick={() => setSmPopup(true)}>
            SM (400px)
          </CwButton>
          <CwButton variant="primary" appearance="outlined" onClick={() => setMdPopup(true)}>
            MD (800px)
          </CwButton>
          <CwButton variant="primary" appearance="outlined" onClick={() => setLgPopup(true)}>
            LG (976px)
          </CwButton>
          <CwButton variant="primary" appearance="outlined" onClick={() => setXlPopup(true)}>
            XL (1080px)
          </CwButton>
          <CwButton variant="primary" appearance="outlined" onClick={() => setFitPopup(true)}>
            Fit (80%)
          </CwButton>
        </div>
      </div>

      {/* 定位說明 */}
      <div className="space-y-3">
        <h4>6. 定位說明</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          所有 Popup 統一距離頂部 70px，水平居中，確保在不同場景下保持一致的視覺位置。
        </p>
        <div className="flex gap-4">
          <CwButton variant="primary" onClick={() => setTopCenterPopup(true)}>
            測試定位 Popup
          </CwButton>
        </div>
      </div>

      {/* Popup 內使用 CwSelect */}
      <div className="space-y-3">
        <h4>7. Popup 內使用表單元件（CwSelect）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          測試在 Popup 內使用 CwSelect，下拉選單應該能正確顯示在最上層，不會被 Popup 的滾動區域裁切。Footer 固定在底部，Body 可滾動。
        </p>
        <div className="flex gap-4">
          <CwButton variant="primary" onClick={() => setFormPopup(true)}>
            開啟表單 Popup
          </CwButton>
        </div>
      </div>

      {/* Popup 實例 */}
      {/* 確認型 Popup */}
      <CwPopup
        open={confirmPopup}
        onClose={() => setConfirmPopup(false)}
        title="確認離開"
        closableByMask={false}
        buttons={confirmButtons}
      >
        <p>您有變更尚未儲存，確定要離開嗎？</p>
      </CwPopup>

      {/* Info Popup */}
      <CwPopup
        open={infoPopup}
        onClose={() => setInfoPopup(false)}
        title="系統通知"
        type="info"
        buttons={[
          {
            label: '我知道了',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setInfoPopup(false),
          },
        ]}
      >
        <p>系統將在今晚 22:00 進行維護，預計需要 2 小時。維護期間將無法使用系統功能，請提前儲存您的工作。</p>
      </CwPopup>

      {/* Success Popup */}
      <CwPopup
        open={successPopup}
        onClose={() => setSuccessPopup(false)}
        title="操作成功"
        type="success"
        buttons={[
          {
            label: '確定',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setSuccessPopup(false),
          },
        ]}
      >
        <p>會員資料已成功儲存！</p>
      </CwPopup>

      {/* Warning Popup */}
      <CwPopup
        open={warningPopup}
        onClose={() => setWarningPopup(false)}
        title="警告"
        type="warning"
        buttons={threeButtons}
      >
        <p>此操作可能會影響系統其他功能，建議您先備份相關資料後再進行操作。</p>
      </CwPopup>

      {/* Error Popup */}
      <CwPopup
        open={errorPopup}
        onClose={() => setErrorPopup(false)}
        title="刪除確認"
        type="error"
        closableByMask={false}
        buttons={deleteButtons}
      >
        <p>刪除後將無法復原，確定要刪除此會員資料嗎？</p>
      </CwPopup>

      {/* Question Popup */}
      <CwPopup
        open={questionPopup}
        onClose={() => setQuestionPopup(false)}
        title="選擇操作"
        type="question"
        buttons={[
          {
            label: '取消',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setQuestionPopup(false),
          },
          {
            label: '匯出為 Excel',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => {
              console.log('匯出 Excel');
              setQuestionPopup(false);
            },
          },
          {
            label: '匯出為 PDF',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => {
              console.log('匯出 PDF');
              setQuestionPopup(false);
            },
          },
        ]}
      >
        <p>請選擇您要匯出的檔案格式：</p>
      </CwPopup>

      {/* 可滾動 Popup */}
      <CwPopup
        open={scrollPopup}
        onClose={() => setScrollPopup(false)}
        title="使用條款與隱私政策"
        scrollGradient={true}
        maxHeight="400px"
        buttons={[
          {
            label: '不同意',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setScrollPopup(false),
          },
          {
            label: '同意並繼續',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => {
              console.log('已同意');
              setScrollPopup(false);
            },
          },
        ]}
      >
        <div className="space-y-4">
          <h4>第一條 總則</h4>
          <p>本系統使用條款（以下簡稱「本條款」）規範您使用本系統所提供之各項服務的相關權利義務。當您使用本系統時，即表示您已閱讀、瞭解並同意接受本條款之所有內容。</p>
          
          <h4>第二條 服務內容</h4>
          <p>本系統提供的服務包括但不限於會員管理、資料查詢、報表匯出等功能。我們保留隨時修改或中斷服務的權利。</p>
          
          <h4>第三條 使用者義務</h4>
          <p>使用者應妥善保管帳號及密碼，不得將帳號借予他人使用。使用者應遵守相關法律規定，不得利用本系統從事違法或不當行為。</p>
          
          <h4>第四條 隱私權保護</h4>
          <p>我們重視您的隱私權保護，並遵循相關法律規定。您的個人資料將僅用於提供服務之目的，不會未經同意提供給第三方。</p>
          
          <h4>第五條 智慧財產權</h4>
          <p>本系統所使用之軟體、程式、網站內容等，其著作權、商標權等智慧財產權均屬本公司或其授權人所有。</p>
          
          <h4>第六條 免責聲明</h4>
          <p>本系統不保證服務不會中斷或無錯誤。對於因使用或無法使用本服務所導致的任何損害，本公司不負任何賠償責任。</p>
          
          <h4>第七條 條款修改</h4>
          <p>我們保留隨時修改本條款的權利。修改後的條款將公告於系統內，繼續使用本服務即視為同意修改後的條款。</p>
        </div>
      </CwPopup>

      {/* 無 Header Popup */}
      <CwPopup
        open={noHeaderPopup}
        onClose={() => setNoHeaderPopup(false)}
        showHeader={false}
        buttons={[
          {
            label: '關閉',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setNoHeaderPopup(false),
          },
        ]}
      >
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h3>恭喜！</h3>
          <p>您已成功完成註冊流程。</p>
        </div>
      </CwPopup>

      {/* 無 Footer Popup */}
      <CwPopup
        open={noFooterPopup}
        onClose={() => setNoFooterPopup(false)}
        title="快速提示"
        showFooter={false}
      >
        <div className="space-y-3">
          <p>點擊右上角的 ✕ 按鈕或按 ESC 鍵即可關閉此提示。</p>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            此類型的 Popup 適合用於簡單的提示訊息，不需要使用者進行選擇。
          </p>
        </div>
      </CwPopup>

      {/* 測試定位 Popup */}
      <CwPopup
        open={topCenterPopup}
        onClose={() => setTopCenterPopup(false)}
        title="重要提醒"
        closableByMask={false}
        buttons={[
          {
            label: '稍後處理',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setTopCenterPopup(false),
          },
          {
            label: '立即查看',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => {
              console.log('查看詳情');
              setTopCenterPopup(false);
            },
          },
        ]}
      >
        <p>您有 3 筆待處理的審核申請，請盡快處理以免影響申請者的權益。</p>
      </CwPopup>

      {/* 尺寸範例 - SM */}
      <CwPopup
        open={smPopup}
        onClose={() => setSmPopup(false)}
        title="SM 尺寸 (400px)"
        size="sm"
        type="info"
        buttons={[
          {
            label: '關閉',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setSmPopup(false),
          },
        ]}
      >
        <p>這是 SM 尺寸的 Popup，固定寬度 400px，適用於簡單確認或短訊息提示。</p>
      </CwPopup>

      {/* 尺寸範例 - MD */}
      <CwPopup
        open={mdPopup}
        onClose={() => setMdPopup(false)}
        title="MD 尺寸 (800px)"
        size="md"
        type="success"
        buttons={[
          {
            label: '取消',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setMdPopup(false),
          },
          {
            label: '確認',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setMdPopup(false),
          },
        ]}
      >
        <p>這是 MD 尺寸的 Popup，最大寬度 800px，最小寬度 400px，適用於一般表單或內容展示。這是預設尺寸。</p>
      </CwPopup>

      {/* 尺寸範例 - LG */}
      <CwPopup
        open={lgPopup}
        onClose={() => setLgPopup(false)}
        title="LG 尺寸 (976px)"
        size="lg"
        type="warning"
        buttons={[
          {
            label: '取消',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setLgPopup(false),
          },
          {
            label: '稍後再說',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setLgPopup(false),
          },
          {
            label: '立即處理',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setLgPopup(false),
          },
        ]}
      >
        <p>這是 LG 尺寸的 Popup，最大寬度 976px，最小寬度 400px，適用於複雜表單或需要較寬空間的內容展示。</p>
      </CwPopup>

      {/* 尺寸範例 - XL */}
      <CwPopup
        open={xlPopup}
        onClose={() => setXlPopup(false)}
        title="XL 尺寸 (1080px)"
        size="xl"
        type="question"
        buttons={[
          {
            label: '取消',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setXlPopup(false),
          },
          {
            label: '匯出為 Excel',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setXlPopup(false),
          },
          {
            label: '匯出為 PDF',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setXlPopup(false),
          },
        ]}
      >
        <p>這是 XL 尺寸的 Popup，最大寬度 1080px，最小寬度 400px，適用於需要大量資訊展示的內容，例如詳細報表、圖表或多欄位表單。</p>
      </CwPopup>

      {/* 尺寸範例 - Fit */}
      <CwPopup
        open={fitPopup}
        onClose={() => setFitPopup(false)}
        title="Fit 尺寸 (符合視窗)"
        size="fit"
        type="error"
        closableByMask={false}
        buttons={[
          {
            label: '取消',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => setFitPopup(false),
          },
          {
            label: '刪除',
            variant: 'destructive',
            appearance: 'filled',
            onClick: () => setFitPopup(false),
          },
        ]}
      >
        <p>這是 Fit 尺寸的 Popup，最大寬度為視窗寬度的 80%，最小寬度 400px，會隨視窗尺寸自動調整，適用於響應式設計需求或內容寬度不確定的場景。</p>
      </CwPopup>

      {/* 表單 Popup - 測試 CwSelect */}
      <CwPopup
        open={formPopup}
        onClose={() => setFormPopup(false)}
        title="新增會員"
        size="md"
        closableByMask={false}
        buttons={[
          {
            label: '取消',
            variant: 'primary',
            appearance: 'outlined',
            onClick: () => {
              setFormPopup(false);
              setFormName('');
              setFormDepartment('');
              setFormRole([]);
              setFormStatus('');
            },
          },
          {
            label: '儲存',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => {
              console.log('儲存表單', { formName, formDepartment, formRole, formStatus });
              setFormPopup(false);
              setFormName('');
              setFormDepartment('');
              setFormRole([]);
              setFormStatus('');
            },
          },
        ]}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            測試 Footer 固定在底部，Body 可滾動，以及 CwSelect 下拉選單正確顯示。
          </p>
          
          <CwInput
            label="姓名"
            placeholder="請輸入姓名"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <CwSelect
            label="部門"
            options={[
              { value: '1', label: '技術部' },
              { value: '2', label: '行銷部' },
              { value: '3', label: '業務部' },
              { value: '4', label: '人資部' },
              { value: '5', label: '財務部' },
            ]}
            value={formDepartment}
            onChange={(value) => setFormDepartment(value as string)}
            placeholder="請選擇部門"
            clearable
          />

          <CwSelect
            label="角色（多選）"
            options={[
              { value: '1', label: '系統管理員' },
              { value: '2', label: '內容編輯' },
              { value: '3', label: '資料分析師' },
              { value: '4', label: '客服人員' },
              { value: '5', label: '一般使用者' },
            ]}
            value={formRole}
            onChange={(value) => setFormRole(value as string[])}
            placeholder="請選擇角色"
            multiple
            clearable
          />

          <CwSelect
            label="狀態（可搜尋）"
            options={[
              { value: '1', label: '啟用中' },
              { value: '2', label: '停用中' },
              { value: '3', label: '待審核' },
              { value: '4', label: '已封鎖' },
              { value: '5', label: '試用期' },
              { value: '6', label: '已過期' },
              { value: '7', label: '維護中' },
              { value: '8', label: '暫時關閉' },
              { value: '9', label: '正常運作' },
              { value: '10', label: '需要更新' },
            ]}
            value={formStatus}
            onChange={(value) => setFormStatus(value as string)}
            placeholder="搜尋並選擇狀態"
            searchable
            clearable
          />

          <div className="space-y-2">
            <h5>測試滾動</h5>
            <p>以下是一些填充內容，用來測試當內容過多時，Body 區域可以滾動，而 Footer 保持固定在底部。</p>
            <p>第一段內容：這是一個測試段落，用來增加內容高度。</p>
            <p>第二段內容：當內容超過 Popup 的最大高度時，應該可以上下滾動查看所有內容。</p>
            <p>第三段內容：Footer 的按鈕應該始終固定在 Popup 底部，不會隨著滾動而移動。</p>
            <p>第四段內容：CwSelect 的下拉選單應該使用 fixed 定位，並顯示在最上層（z-index: 5000）。</p>
            <p>第五段內容：即使在 Popup 內滾動，下拉選單的位置也會跟著 CwSelect 輸入框自動調整。</p>
            <p>第六段內容：這樣可以確保使用者能夠順利操作表單，不會因為滾動或層級問題而無法選擇選項。</p>
          </div>
        </div>
      </CwPopup>
    </div>
  );
};
