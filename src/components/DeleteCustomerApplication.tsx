import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwInput } from "./CwInput";
import { CwRadio } from "./CwRadio";
import { CwButton } from "./CwButton";
import { CwCheckbox } from "./CwCheckbox";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { Upload, ExternalLink } from "lucide-react";

// 表格資料類型
interface BlacklistUser {
  id: number;
  name: string;
  email: string;
  account: string;
  sfCrmId: string;
  phone: string;
  subscriberId: string;
  accountType: string;
}

export function DeleteCustomerApplication() {
  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "個資刪除管理", href: "/privacy-deletion" },
    { label: "刪除個資申請單" }
  ];

  // 表單狀態
  const [customerIdType, setCustomerIdType] = useState<"with-id" | "without-id">("with-id");
  const [customerIds, setCustomerIds] = useState("");
  const [sfCrmId, setSfCrmId] = useState("");
  const [sfCrmLink, setSfCrmLink] = useState("");

  // 查詢表單狀態
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchSubscriberId, setSearchSubscriberId] = useState("");

  // 手動建檔表單狀態
  const [manualName, setManualName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualAccountTypes, setManualAccountTypes] = useState<string[]>([]);

  // 表格資料
  const [blacklistData, setBlacklistData] = useState<BlacklistUser[]>([]);

  // 處理查詢
  const handleSearch = () => {
    console.log("查詢", { searchEmail, searchPhone, searchSubscriberId });
    // TODO: 實作查詢邏輯
  };

  // 處理帳型選擇
  const handleAccountTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setManualAccountTypes([...manualAccountTypes, type]);
    } else {
      setManualAccountTypes(manualAccountTypes.filter(t => t !== type));
    }
  };

  // 處理檔案上傳
  const handleFileUpload = () => {
    console.log("上傳檔案");
    // TODO: 實作檔案上傳邏輯
  };

  // 表格欄位定義
  const columns: CwTableColumn<BlacklistUser>[] = [
    {
      key: "id",
      title: "#",
      width: "60px",
      align: "left",
    },
    {
      key: "name",
      title: "姓名",
      width: "120px",
      align: "left",
    },
    {
      key: "email",
      title: "Email",
      align: "left",
    },
    {
      key: "account",
      title: "帳號",
      width: "120px",
      align: "left",
    },
    {
      key: "sfCrmId",
      title: "SF CRM ID",
      width: "140px",
      align: "left",
    },
    {
      key: "phone",
      title: "手機",
      width: "120px",
      align: "left",
    },
    {
      key: "subscriberId",
      title: "訂戶編號",
      width: "120px",
      align: "left",
    },
    {
      key: "accountType",
      title: "帳型",
      width: "100px",
      align: "left",
    },
    {
      key: "action",
      title: "操作",
      width: "80px",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <CwTooltip content="刪除">
            <CwRoundButton 
              icon="delete" 
              variant="destructive"
              onClick={() => console.log("刪除", record.id)}
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
        title="刪除個資申請單"
        breadcrumbs={breadcrumbs}
      />

      {/* 查詢區塊 */}
      <div className="flex gap-[12px]">
        <CwInput
          placeholder="Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <CwInput
          placeholder="手機"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <CwInput
          placeholder="訂戶編號"
          value={searchSubscriberId}
          onChange={(e) => setSearchSubscriberId(e.target.value)}
        />
        <CwButton
          variant="primary"
          appearance="filled"
          onClick={handleSearch}
        >
          查詢
        </CwButton>
      </div>

      {/* SF加入黑名單按鈕 */}
      <div>
        <CwButton
          variant="primary"
          appearance="outlined"
          onClick={() => window.open('https://example.com/sf-blacklist', '_blank')}
          leftIcon={<ExternalLink className="w-4 h-4" />}
        >
          SF加入黑名單
        </CwButton>
      </div>

      {/* 表格 */}
      <CwTable
        columns={columns}
        dataSource={blacklistData}
        rowKey="id"
        emptyText="輸入Email/手機/訂戶編號以查詢"
      />

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 手動建檔區塊 */}
      <div className="space-y-6">
        <h3 
          style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: '16px',
            fontWeight: 'var(--font-weight-500)',
            color: '#1c1c1c',
            lineHeight: '1.5',
          }}
        >
          手動建檔
        </h3>

        <div className="space-y-4">
          {/* 用戶姓名 */}
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
              用戶姓名：
            </label>
            <CwInput
              placeholder="請輸入用戶姓名"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              width="800px"
            />
          </div>

          {/* 用戶Email */}
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
              用戶Email：
            </label>
            <CwInput
              placeholder="請輸入用戶Email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              width="800px"
            />
          </div>

          {/* 用戶手機 */}
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
              用戶手機：
            </label>
            <CwInput
              placeholder="請輸入用戶手機"
              value={manualPhone}
              onChange={(e) => setManualPhone(e.target.value)}
              width="800px"
            />
          </div>

          {/* 用戶類型 */}
          <div className="flex items-start gap-3">
            <label 
              className="w-[140px] shrink-0 pt-[6px]"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              用戶類型：
            </label>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <CwCheckbox
                  id="account-type-member"
                  checked={manualAccountTypes.includes("member")}
                  onChange={(checked) => handleAccountTypeChange("member", checked)}
                />
                <label 
                  htmlFor="account-type-member"
                  className="cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-300)',
                    color: '#1c1c1c',
                  }}
                >
                  會員
                </label>
              </div>
              <div className="flex items-center gap-2">
                <CwCheckbox
                  id="account-type-subscriber"
                  checked={manualAccountTypes.includes("subscriber")}
                  onChange={(checked) => handleAccountTypeChange("subscriber", checked)}
                />
                <label 
                  htmlFor="account-type-subscriber"
                  className="cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-300)',
                    color: '#1c1c1c',
                  }}
                >
                  訂戶
                </label>
              </div>
            </div>
          </div>

          {/* 請上傳用戶提出的刪除申請表 - 不受對齊限制 */}
          <div className="flex items-center gap-3">
            <label 
              className="shrink-0 whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              請上傳用戶提出的刪除申請表：
            </label>
            <CwButton
              variant="primary"
              appearance="outlined"
              onClick={handleFileUpload}
              leftIcon={<Upload className="w-4 h-4" />}
            >
              上傳個資刪除申請表
            </CwButton>
          </div>
        </div>
      </div>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 客戶編號區塊 */}
      <div className="space-y-4">
        {/* 客戶編號與無客戶編號 - 同一排 */}
        <div className="flex items-center gap-3">
          <div className="w-[140px] shrink-0 flex items-center gap-2">
            <CwRadio
              id="with-customer-id"
              name="customer-id-type"
              checked={customerIdType === "with-id"}
              onChange={(checked) => checked && setCustomerIdType("with-id")}
            />
            <label 
              htmlFor="with-customer-id"
              className="cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              客戶編號：
            </label>
          </div>
          <CwInput
            placeholder="請輸入客戶編號(多組客戶編號用半形逗號隔開，最多十組)"
            value={customerIds}
            onChange={(e) => setCustomerIds(e.target.value)}
            disabled={customerIdType !== "with-id"}
            width="800px"
          />
          <div className="flex items-center gap-2 ml-6">
            <CwRadio
              id="without-customer-id"
              name="customer-id-type"
              checked={customerIdType === "without-id"}
              onChange={(checked) => checked && setCustomerIdType("without-id")}
            />
            <label 
              htmlFor="without-customer-id"
              className="cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: '14px',
                fontWeight: 'var(--font-weight-300)',
                color: '#1c1c1c',
              }}
            >
              無客戶編號
            </label>
          </div>
        </div>

        {/* SF CRM ID */}
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
            SF CRM ID：
          </label>
          <CwInput
            placeholder="請輸入CRM ID"
            value={sfCrmId}
            onChange={(e) => setSfCrmId(e.target.value)}
            width="800px"
          />
        </div>

        {/* SF CRM Link */}
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
            SF CRM Link：
          </label>
          <CwInput
            placeholder="請輸入CRM Link"
            value={sfCrmLink}
            onChange={(e) => setSfCrmLink(e.target.value)}
            width="800px"
          />
        </div>
      </div>

      {/* 底部按鈕 */}
      <div className="flex justify-end gap-3 pt-4">
        <CwButton
          variant="primary"
          appearance="outlined"
          onClick={() => console.log("取消")}
        >
          取消
        </CwButton>
        <CwButton
          variant="primary"
          appearance="filled"
          onClick={() => console.log("送出")}
        >
          送出
        </CwButton>
      </div>
    </div>
  );
}