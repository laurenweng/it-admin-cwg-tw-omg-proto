import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { CwInput, CopyIcon } from "./CwInput";
import { CwTextarea } from "./CwTextarea";
import { CwButton } from "./CwButton";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { CwTable } from "./CwTable";
import { StatusTag } from "./StatusTag";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CwTableColumn {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, record: any) => React.ReactNode;
}

// 回報狀態表格資料
const reportData = [
  {
    id: 1,
    systemName: "SF",
    responsiblePerson: "",
    status: "審核完成",
    reason: "已完成為不可當銷",
    updateTime: "2025-11-05 16:45",
  }
];

export function DeleteUserRecordInfo() {
  const [customerNumber, setCustomerNumber] = useState("");
  const [reviewOpinion, setReviewOpinion] = useState("");

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "個資刪除管理", href: "/privacy-deletion" },
    { label: "刪除用戶紀錄資訊" }
  ];

  // 複製到剪貼簿
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log("已複製:", text);
  };

  // 回報狀態表格欄位定義
  const columns: CwTableColumn[] = [
    { key: "systemName", title: "系統名稱", width: "100px" },
    { key: "responsiblePerson", title: "負責人員", width: "100px" },
    { 
      key: "status", 
      title: "處理狀態", 
      width: "120px",
      render: (value: any) => (
        <StatusTag variant="success">{value}</StatusTag>
      )
    },
    { key: "reason", title: "原因", width: "200px" },
    { key: "updateTime", title: "更新時間", width: "150px" },
    { 
      key: "action", 
      title: "操作", 
      width: "80px", 
      align: "center",
      render: () => (
        <CwTooltip content="回報 sf">
          <CwRoundButton icon="send" onClick={() => console.log("回報 sf")} />
        </CwTooltip>
      )
    }
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        title="刪除用戶紀錄資訊"
        breadcrumbs={breadcrumbs}
      />

      {/* 主要內容區 - 左右分欄 */}
      <div className="grid grid-cols-[1fr_400px] gap-[30px]">
        {/* 左側區域 */}
        <div className="w-full min-w-0 space-y-[30px]">
          {/* 會員資訊 */}
          <div className="space-y-[16px]">
            <h3 style={{ fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: 500 }}>會員資訊</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[16px]">
              {/* 申請單號 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>申請單號</div>
                <CwInput
                  value="1155"
                  disabled
                  rightIcon={
                    <CwTooltip content="複製">
                      <button type="button" onClick={() => handleCopy("1155")} className="hover:opacity-80">
                        <CopyIcon />
                      </button>
                    </CwTooltip>
                  }
                />
              </div>

              {/* Email */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>Email</div>
                <CwInput
                  value="bruce.sung+20251105164458@cw.com.tw"
                  disabled
                  rightIcon={
                    <CwTooltip content="複製">
                      <button type="button" onClick={() => handleCopy("bruce.sung+20251105164458@cw.com.tw")} className="hover:opacity-80">
                        <CopyIcon />
                      </button>
                    </CwTooltip>
                  }
                />
              </div>

              {/* 姓名 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>姓名</div>
                <CwInput
                  value="B*********t"
                  disabled
                />
              </div>

              {/* 手機 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>手機</div>
                <CwInput
                  value="0912345678"
                  disabled
                  rightIcon={
                    <CwTooltip content="複製">
                      <button type="button" onClick={() => handleCopy("0912345678")} className="hover:opacity-80">
                        <CopyIcon />
                      </button>
                    </CwTooltip>
                  }
                />
              </div>

              {/* 客戶編號 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>客戶編號</div>
                <CwInput
                  value=""
                  disabled
                />
              </div>

              {/* 類型 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>類型</div>
                <div>
                  <CwButton variant="primary" appearance="outline">
                    會員
                  </CwButton>
                </div>
              </div>
            </div>

            {/* CRM ID */}
            <div className="flex items-center gap-[12px]">
              <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350, minWidth: '80px' }}>CRM ID：</div>
              <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>無</div>
            </div>
          </div>

          {/* 分隔線 */}
          <hr className="border-t border-border/30" />

          {/* 權益綁定 */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px]">
              <h3 style={{ fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: 500 }}>權益綁定</h3>
              <span style={{ fontFamily: 'Noto Sans TC', fontSize: '12px', fontWeight: 350, color: '#c00000' }}>*以Email查詢有無綁定會員</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[12px]">
              <div className="flex items-center gap-[12px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350, minWidth: '150px' }}>91會員：</div>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>無</div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350, minWidth: '150px' }}>親子91會員資料：</div>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>無</div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350, minWidth: '150px' }}>親子Teachify會員：</div>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>無</div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350, minWidth: '150px' }}>有效訂閱權益：</div>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>無</div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350, minWidth: '150px' }}>數位講堂：</div>
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>無</div>
              </div>
            </div>
          </div>

          {/* 分隔線 */}
          <hr className="border-t border-border/30" />

          {/* 回報狀態 */}
          <div className="space-y-[16px]">
            <h3 style={{ fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: 500 }}>回報狀態</h3>
            
            <CwTable
              columns={columns}
              dataSource={reportData}
              emptyText="沒有資料"
            />
          </div>
        </div>

        {/* 右側區域 */}
        <div className="space-y-[30px] bg-[#fafbfc] p-[24px] rounded-[var(--radius-card)]">
          {/* 狀態標籤 */}
          <div className="flex justify-center">
            <div className="w-[140px] h-[140px] rounded-full border-[4px] border-[#7c808c] flex items-center justify-center">
              <span style={{ fontFamily: 'Noto Sans TC', fontSize: '24px', fontWeight: 500, color: '#7c808c' }}>未核准</span>
            </div>
          </div>

          {/* 建立資訊 */}
          <div className="space-y-[16px]">
            <h3 style={{ fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: 500 }}>建立資訊</h3>
            
            <div className="space-y-[12px]">
              {/* 建立者 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>建立者</div>
                <CwInput
                  value="bruce.sung+20251105164458@cw.com.tw"
                  disabled
                />
              </div>

              {/* 建立日 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>建立日</div>
                <CwInput
                  value="2025/11/05 16:45"
                  disabled
                />
              </div>

              {/* 刪除到期日 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>刪除到期日</div>
                <CwInput
                  value="2025/11/15 16:45"
                  disabled
                />
              </div>

              {/* 客戶編號 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>客戶編號</div>
                <div className="flex items-start gap-[12px]">
                  <CwTextarea
                    placeholder="請輸入客戶編號，多組請用「,」區隔，最多十組"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                  />
                  <CwTooltip content="重新查詢">
                    <CwRoundButton 
                      icon="search" 
                      onClick={() => console.log("重新查詢客戶編號:", customerNumber)} 
                    />
                  </CwTooltip>
                </div>
              </div>

              {/* 審核意見 */}
              <div className="space-y-[8px]">
                <div style={{ fontFamily: 'Noto Sans TC', fontSize: '14px', fontWeight: 350 }}>審核意見</div>
                <div>
                  <CwTextarea
                    placeholder="請輸入審核意見（駁回申請必填）"
                    value={reviewOpinion}
                    onChange={(e) => setReviewOpinion(e.target.value)}
                  />
                  <div 
                    className="text-right mt-[4px]"
                    style={{ 
                      fontFamily: 'Noto Sans TC', 
                      fontSize: '12px', 
                      fontWeight: 350,
                      color: '#7c808c'
                    }}
                  >
                    最後更新時間：2025-11-05 16:45:06
                  </div>
                </div>
              </div>
            </div>

            {/* 按鈕組 */}
            <div className="flex flex-col items-end gap-[12px] mt-[20px]">
              {/* 第一排：暫存 */}
              <div className="flex justify-end">
                <CwButton variant="primary" appearance="outline" onClick={() => console.log("暫存")}>
                  暫存
                </CwButton>
              </div>
              
              {/* 第二排：返回列表、通過、駁回申請 */}
              <div className="flex gap-[12px]">
                <CwButton variant="primary" appearance="outline" onClick={() => window.history.back()}>
                  返回列表
                </CwButton>
                <CwButton variant="primary" appearance="filled" onClick={() => console.log("通過")}>
                  通過
                </CwButton>
                <CwButton variant="destructive" appearance="filled" onClick={() => console.log("駁回申請")}>
                  駁回申請
                </CwButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}