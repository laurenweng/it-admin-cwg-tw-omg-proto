import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwRadio } from "./CwRadio";
import { CwTextarea } from "./CwTextarea";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { CwPopup } from "./CwPopup";
import { StatusTag } from "./StatusTag";
import { Plus } from "lucide-react";

// 聯絡人資料類型
interface Contact {
  id: number;
  platform: string;
  contactName: string;
  email: string;
  remark: string;
  notificationStatus: "需回報" | "停通知";
}

interface ContactMaintenanceProps {
  onEdit: (id: number) => void;
}

export function ContactMaintenance({ onEdit }: ContactMaintenanceProps) {
  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "個資刪除管理", href: "/privacy-deletion" },
    { label: "名單刪除小組窗口維護" }
  ];

  // 表格資料
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      platform: "ERP",
      contactName: "林佳慧",
      email: "jiahulin@cw.com.tw",
      remark: "",
      notificationStatus: "需回報"
    },
    {
      id: 5,
      platform: "讀者中心",
      contactName: "世彥",
      email: "shihyen@cw.com.tw",
      remark: "",
      notificationStatus: "停通知"
    },
    {
      id: 6,
      platform: "91開書",
      contactName: "廖雅薰",
      email: "ll@cw.com.tw",
      remark: "",
      notificationStatus: "需回報"
    },
    {
      id: 7,
      platform: "集團會員認證系統",
      contactName: "張嘉柔",
      email: "anitachang@cw.com.tw",
      remark: "中台會員相關資料，包含PrismaDB儲存的所有資料，Member, Customer, MemberProfile, EpaperSubscribe, UserJourney等等",
      notificationStatus: "需回報"
    },
    {
      id: 8,
      platform: "天下技術IT",
      contactName: "劉佳豪",
      email: "brendonliu@cw.com.tw",
      remark: "",
      notificationStatus: "需回報"
    }
  ]);

  // Popup 狀態
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRemark, setNewRemark] = useState("");
  const [newNotificationStatus, setNewNotificationStatus] = useState<"需回報" | "停通知">("需回報");

  // 處理新增
  const handleAdd = () => {
    setIsAddPopupOpen(true);
  };

  // 處理確認新增
  const handleConfirmAdd = () => {
    if (newPlatform.trim() && newContactName.trim() && newEmail.trim()) {
      const newContact: Contact = {
        id: Date.now(),
        platform: newPlatform,
        contactName: newContactName,
        email: newEmail,
        remark: newRemark,
        notificationStatus: newNotificationStatus,
      };
      setContacts(prev => [...prev, newContact]);
      // 重置表單並關閉 Popup
      setNewPlatform("");
      setNewContactName("");
      setNewEmail("");
      setNewRemark("");
      setNewNotificationStatus("需回報");
      setIsAddPopupOpen(false);
    }
  };

  // 處理取消新增
  const handleCancelAdd = () => {
    setNewPlatform("");
    setNewContactName("");
    setNewEmail("");
    setNewRemark("");
    setNewNotificationStatus("需回報");
    setIsAddPopupOpen(false);
  };

  // 處理編輯
  const handleEdit = (id: number) => {
    console.log("編輯聯絡人", id);
    onEdit(id);
  };

  // 處理刪除
  const handleDelete = (id: number) => {
    console.log("刪除聯絡人", id);
    // TODO: 顯示刪除確認 Popup
  };

  // 表格欄位定義
  const columns: CwTableColumn<Contact>[] = [
    {
      key: "id",
      title: "id",
      width: "60px",
      align: "left",
    },
    {
      key: "platform",
      title: "平台系統",
      width: "180px",
      align: "left",
    },
    {
      key: "contact",
      title: "負責窗口姓名 / Email",
      align: "left",
      render: (_, record) => {
        if (!record.contactName && !record.email) {
          return "/";
        }
        return (
          <div style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: '14px',
            fontWeight: 'var(--font-weight-350)',
            color: '#1c1c1c',
          }}>
            {record.contactName} / {record.email}
          </div>
        );
      },
    },
    {
      key: "remark",
      title: "備註",
      align: "left",
    },
    {
      key: "notificationStatus",
      title: "通知",
      width: "100px",
      align: "left",
      render: (_, record) => (
        <StatusTag 
          variant={record.notificationStatus === "需回報" ? "primary" : "default"}
        >
          {record.notificationStatus}
        </StatusTag>
      ),
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
              onClick={() => handleEdit(record.id)}
            />
          </CwTooltip>
          <CwTooltip content="刪除">
            <CwRoundButton 
              icon="delete" 
              variant="destructive"
              onClick={() => handleDelete(record.id)}
            />
          </CwTooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        title="名單刪除小組窗口維護"
        breadcrumbs={breadcrumbs}
      />

      {/* 新增按鈕 */}
      <div>
        <CwButton
          variant="primary"
          appearance="filled"
          onClick={handleAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          新增
        </CwButton>
      </div>

      {/* 表格 */}
      <CwTable
        columns={columns}
        dataSource={contacts}
        rowKey="id"
      />

      {/* 新增聯絡人 Popup */}
      <CwPopup
        open={isAddPopupOpen}
        onClose={handleCancelAdd}
        title="新增聯絡人"
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
              平台系統
            </div>
            <CwInput
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
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
              負責窗口姓名
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
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
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
              備註
            </div>
            <CwTextarea
              value={newRemark}
              onChange={(e) => setNewRemark(e.target.value)}
              style={{ minHeight: '100px' }}
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
              通知狀態
            </div>
            <div className="flex gap-6">
              <CwRadio
                label="需回報"
                name="notificationStatus"
                checked={newNotificationStatus === "需回報"}
                onChange={() => setNewNotificationStatus("需回報")}
              />
              <CwRadio
                label="停通知"
                name="notificationStatus"
                checked={newNotificationStatus === "停通知"}
                onChange={() => setNewNotificationStatus("停通知")}
              />
            </div>
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