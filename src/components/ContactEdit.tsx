import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwRadio } from "./CwRadio";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { CwPopup } from "./CwPopup";
import { Plus } from "lucide-react";

// 窗口資料類型
interface ContactPerson {
  id: number;
  name: string;
  email: string;
}

interface ContactEditProps {
  contactId?: number;
  onBack: () => void;
}

export function ContactEdit({ contactId, onBack }: ContactEditProps) {
  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "個資刪除管理", href: "/privacy-deletion" },
    { label: "編輯名單刪除小組窗口" }
  ];

  // 表單狀態
  const [platformCode, setPlatformCode] = useState("erp");
  const [platformName, setPlatformName] = useState("ERP");
  const [remark, setRemark] = useState("");
  const [notificationStatus, setNotificationStatus] = useState<"停通知" | "需回報">("需回報");

  // 窗口列表
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);

  // Popup 狀態
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");

  // 處理新增窗口
  const handleAddContact = () => {
    setIsAddPopupOpen(true);
  };

  // 處理確認新增
  const handleConfirmAdd = () => {
    if (newContactName.trim() && newContactEmail.trim()) {
      const newContact: ContactPerson = {
        id: Date.now(),
        name: newContactName,
        email: newContactEmail,
      };
      setContactPersons(prev => [...prev, newContact]);
      // 重置表單並關閉 Popup
      setNewContactName("");
      setNewContactEmail("");
      setIsAddPopupOpen(false);
    }
  };

  // 處理取消新增
  const handleCancelAdd = () => {
    setNewContactName("");
    setNewContactEmail("");
    setIsAddPopupOpen(false);
  };

  // 處理編輯窗口
  const handleEditContact = (id: number) => {
    console.log("編輯窗口", id);
    // TODO: 開啟編輯介面
  };

  // 處理刪除窗口
  const handleDeleteContact = (id: number) => {
    console.log("刪除窗口", id);
    setContactPersons(prev => prev.filter(contact => contact.id !== id));
  };

  // 處理返回
  const handleBack = () => {
    onBack();
  };

  // 處理儲存
  const handleSave = () => {
    console.log("儲存資料", {
      platformCode,
      platformName,
      remark,
      notificationStatus,
      contactPersons
    });
    // TODO: 呼叫 API 儲存資料
    onBack();
  };

  // 表格欄位定義
  const columns: CwTableColumn<ContactPerson>[] = [
    {
      key: "name",
      title: "窗口姓名",
      align: "left",
    },
    {
      key: "email",
      title: "Email",
      align: "left",
    },
    {
      key: "action",
      title: "操作",
      width: "80px",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <CwTooltip content="編輯">
            <CwRoundButton 
              icon="edit" 
              variant="primary"
              onClick={() => handleEditContact(record.id)}
            />
          </CwTooltip>
          <CwTooltip content="刪除">
            <CwRoundButton 
              icon="delete" 
              variant="destructive"
              onClick={() => handleDeleteContact(record.id)}
            />
          </CwTooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="px-[30px] py-[20px] flex flex-col h-full">
      <div className="flex-1 space-y-[20px]">
        {/* 頁面標題 */}
        <CwTitle 
          title="編輯名單刪除小組窗口"
          breadcrumbs={breadcrumbs}
        />

        {/* 表單區域 */}
        <div className="space-y-4">
          {/* 平台系統代碼 */}
          <div className="flex items-center gap-3">
            <label 
              className="w-[140px] shrink-0"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              平台系統代碼：
            </label>
            <CwInput
              value={platformCode}
              onChange={(e) => setPlatformCode(e.target.value)}
              width="800px"
            />
          </div>

          {/* 平台名稱 */}
          <div className="flex items-center gap-3">
            <label 
              className="w-[140px] shrink-0"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              平台名稱：
            </label>
            <CwInput
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              width="800px"
            />
          </div>

          {/* 備註 */}
          <div className="flex items-center gap-3">
            <label 
              className="w-[140px] shrink-0"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              備註：
            </label>
            <CwInput
              placeholder="請輸入備註"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              width="800px"
            />
          </div>

          {/* 通知狀態 */}
          <div className="flex items-center gap-3">
            <label 
              className="w-[140px] shrink-0"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
            </label>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <CwRadio
                  id="notification-stop"
                  name="notification-status"
                  checked={notificationStatus === "停通知"}
                  onChange={(checked) => checked && setNotificationStatus("停通知")}
                />
                <label 
                  htmlFor="notification-stop"
                  className="cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-300)',
                    color: '#1c1c1c',
                  }}
                >
                  停通知
                </label>
              </div>
              <div className="flex items-center gap-2">
                <CwRadio
                  id="notification-report"
                  name="notification-status"
                  checked={notificationStatus === "需回報"}
                  onChange={(checked) => checked && setNotificationStatus("需回報")}
                />
                <label 
                  htmlFor="notification-report"
                  className="cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-300)',
                    color: '#1c1c1c',
                  }}
                >
                  需回報
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 新增窗口按鈕 */}
        <div>
          <CwButton
            variant="primary"
            appearance="filled"
            onClick={handleAddContact}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            新增窗口
          </CwButton>
        </div>

        {/* 窗口列表表格 */}
        <CwTable
          columns={columns}
          dataSource={contactPersons}
          rowKey="id"
          emptyText="尚無窗口資料"
        />
      </div>

      {/* 底部按鈕 */}
      <div className="flex justify-end gap-3 pt-6">
        <CwButton
          variant="primary"
          appearance="outlined"
          onClick={handleBack}
        >
          返回
        </CwButton>
        <CwButton
          variant="primary"
          appearance="filled"
          onClick={handleSave}
        >
          儲存
        </CwButton>
      </div>

      {/* 新增窗口 Popup */}
      <CwPopup
        open={isAddPopupOpen}
        onClose={handleCancelAdd}
        title="新增窗口"
        size="md"
        showFooter={false}
      >
        <div className="space-y-6">
          <div>
            <div 
              className="mb-2"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              窗口姓名
            </div>
            <CwInput
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
            />
          </div>

          <div>
            <div 
              className="mb-2"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              Email
            </div>
            <CwInput
              value={newContactEmail}
              onChange={(e) => setNewContactEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <CwButton
              variant="primary"
              appearance="outlined"
              onClick={handleCancelAdd}
            >
              取消
            </CwButton>
            <CwButton
              variant="primary"
              appearance="filled"
              onClick={handleConfirmAdd}
            >
              確認
            </CwButton>
          </div>
        </div>
      </CwPopup>
    </div>
  );
}