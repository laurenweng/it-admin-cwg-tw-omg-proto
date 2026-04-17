import { useState } from 'react';
import { CwDrawer } from './CwDrawer';
import { CwButton } from './CwButton';
import { CwInput } from './CwInput';
import { CwToast } from './CwToast';

/**
 * CwDrawer 元件使用範例
 */
export function CwDrawerExamples() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [resizableOpen, setResizableOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const mockData = [
    { id: 1, name: '王小明', email: 'wang@example.com', phone: '0912-345-678' },
    { id: 2, name: '李小華', email: 'lee@example.com', phone: '0923-456-789' },
    { id: 3, name: '張小美', email: 'chang@example.com', phone: '0934-567-890' },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(mockData.length - 1, prev + 1));
  };

  const handleSave = () => {
    setFormOpen(false);
    setToastMessage('資料已儲存');
    setShowToast(true);
  };

  return (
    <div className="space-y-8">
      {/* 基本使用 */}
      <section className="space-y-4">
        <h4>1. 基本使用</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          基本的抽屜元件，從右側滑出，點擊遮罩或關閉按鈕可關閉
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-2xl">
          <CwButton variant="primary" appearance="filled" onClick={() => setBasicOpen(true)}>
            開啟基本抽屜
          </CwButton>
          <CwButton variant="primary" appearance="filled" onClick={() => setFormOpen(true)}>
            開啟編輯表單
          </CwButton>
          <CwButton variant="primary" appearance="filled" onClick={() => {
            setCurrentIndex(0);
            setNavigationOpen(true);
          }}>
            開啟逐筆瀏覽
          </CwButton>
          <CwButton variant="primary" appearance="filled" onClick={() => setResizableOpen(true)}>
            可調整大小
          </CwButton>
        </div>

        <CwDrawer
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="基本抽屜"
        >
          <div className="space-y-4">
            <p>這是一個基本的抽屜元件範例。</p>
            <p>抽屜用於顯示補充內容或可編輯內容，不會覆蓋整個頁面。</p>
            <p>使用者可以專注於抽屜內的內容，同時仍能看到背後的主要頁面。</p>
          </div>
        </CwDrawer>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 表單編輯 */}
      <section className="space-y-4">
        <h4>2. 表單編輯</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          在抽屜中進行表單編輯，完成後儲存或取消
        </p>
        <CwButton variant="primary" appearance="filled" onClick={() => setFormOpen(true)}>
          開啟編輯表單
        </CwButton>

        <CwDrawer
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="編輯會員資料"
          closableByMask={false}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <label>姓名</label>
              <CwInput placeholder="請輸入姓名" defaultValue="王小明" />
            </div>
            <div className="space-y-3">
              <label>Email</label>
              <CwInput placeholder="請輸入 Email" defaultValue="wang@example.com" />
            </div>
            <div className="space-y-3">
              <label>電話</label>
              <CwInput placeholder="請輸入電話" defaultValue="0912-345-678" />
            </div>
            <div className="space-y-3">
              <label>地址</label>
              <CwInput placeholder="請輸入地址" defaultValue="台北市信義區信義路五段7號" />
            </div>

            {/* 按鈕組 */}
            <div className="flex gap-3 pt-4">
              <CwButton variant="primary" appearance="outline" onClick={() => setFormOpen(false)}>
                取消
              </CwButton>
              <CwButton variant="primary" appearance="filled" onClick={handleSave}>
                儲存
              </CwButton>
            </div>
          </div>
        </CwDrawer>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 逐筆切換 */}
      <section className="space-y-4">
        <h4>3. 逐筆切換導航</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          使用上下按鈕在多筆資料間切換，適合檢視列表資料的詳細內容
        </p>
        <CwButton variant="primary" appearance="filled" onClick={() => {
          setCurrentIndex(0);
          setNavigationOpen(true);
        }}>
          開啟逐筆瀏覽
        </CwButton>

        <CwDrawer
          open={navigationOpen}
          onClose={() => setNavigationOpen(false)}
          title={`會員詳情 (${currentIndex + 1}/${mockData.length})`}
          showPrevious
          showNext
          onPrevious={handlePrevious}
          onNext={handleNext}
          disablePrevious={currentIndex === 0}
          disableNext={currentIndex === mockData.length - 1}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-muted-foreground">會員 ID</label>
              <p>{mockData[currentIndex].id}</p>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground">姓名</label>
              <p>{mockData[currentIndex].name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground">Email</label>
              <p>{mockData[currentIndex].email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground">電話</label>
              <p>{mockData[currentIndex].phone}</p>
            </div>
          </div>
        </CwDrawer>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 可調整大小 */}
      <section className="space-y-4">
        <h4>4. 可調整大小</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          拖動左側邊緣可調整抽屜寬度，適應不同內容需求
        </p>
        <CwButton variant="primary" appearance="filled" onClick={() => setResizableOpen(true)}>
          開啟可調整大小的抽屜
        </CwButton>

        <CwDrawer
          open={resizableOpen}
          onClose={() => setResizableOpen(false)}
          title="可調整大小的抽屜"
          initialWidth={500}
          minWidth={300}
          maxWidth={900}
          resizable={true}
        >
          <div className="space-y-4">
            <p>拖動抽屜左側邊緣可以調整寬度。</p>
            <p>最小寬度：300px</p>
            <p>最大寬度：900px</p>
            <p>預設寬度：500px</p>
            
            <div className="mt-6 p-4 bg-muted/5 rounded-[var(--radius)]">
              <h4 className="mb-2">使用提示</h4>
              <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
                <li>• 將滑鼠移到抽屜左側邊緣</li>
                <li>• 游標會變成雙向箭頭</li>
                <li>• 按住滑鼠左鍵拖動即可調整寬度</li>
              </ul>
            </div>
          </div>
        </CwDrawer>
      </section>

      {/* Toast 通知 */}
      {showToast && (
        <CwToast
          type="success"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}