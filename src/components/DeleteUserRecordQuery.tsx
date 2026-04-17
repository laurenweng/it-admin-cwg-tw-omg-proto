import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { CwBreadcrumbs } from "./CwBreadcrumbs";
import { CwInput } from "./CwInput";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { CwButton } from "./CwButton";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwPagination } from "./CwPagination";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { StatusTag } from "./StatusTag";

// 審核狀態選項
const reviewStatusOptions: CwSelectOption[] = [
  { value: "pending", label: "未審核" },
  { value: "completed", label: "審核完成" },
  { value: "rejected", label: "駁回申請" },
  { value: "completed_sent", label: "審核完成(已寄信)" },
  { value: "contacting", label: "聯繫中" },
];

// 回報狀態選項
const reportStatusOptions: CwSelectOption[] = [
  { value: "not_reported", label: "未回報" },
  { value: "partial_reported", label: "部分回報" },
  { value: "partial_reported_undeletable", label: "部分回報 (含有無法刪除)" },
  { value: "completed", label: "已回報完成" },
  { value: "completed_undeletable", label: "已回報完成 (含有無法刪除)" },
  { value: "overdue", label: "逾期" },
];

// 未完成負責人選項
const incompleteOwnerOptions: CwSelectOption[] = [
  { value: "all", label: "全部" },
  { value: "user1", label: "張三" },
  { value: "user2", label: "李四" },
];

// 未回報平台選項
const unreportedPlatformOptions: CwSelectOption[] = [
  { value: "erp", label: "ERP" },
  { value: "survey_center", label: "調查中心" },
  { value: "91book", label: "91網書" },
  { value: "group_auth", label: "集團會員認證系統" },
  { value: "cw_it", label: "天下技術IT" },
  { value: "health_it", label: "康健技術IT" },
  { value: "cheers_it", label: "Cheers技術IT" },
];

// 表格資料
const tableData = [
  {
    id: 1,
    applicationNumber: "1208",
    email: "bruce.sung+202511250934 3@cw.com.tw",
    type: "未審核",
    reviewStatus: "未審核",
    reviewOpinion: "",
    reportStatus: "",
    expiryDate: "2025-12-05 09:34:18"
  },
  {
    id: 2,
    applicationNumber: "1207",
    email: "bruce.sung+202511250934 7@cw.com.tw",
    type: "未審核",
    reviewStatus: "未審核",
    reviewOpinion: "",
    reportStatus: "",
    expiryDate: "2025-12-05 09:34:13"
  },
  {
    id: 3,
    applicationNumber: "1206",
    email: "bruce.sung+202511250926 7@cw.com.tw",
    type: "未審核",
    reviewStatus: "未審核",
    reviewOpinion: "",
    reportStatus: "",
    expiryDate: "2025-12-05 09:26:32"
  },
  {
    id: 4,
    applicationNumber: "1205",
    email: "bruce.sung+202511250926 7@cw.com.tw",
    type: "審核中",
    reviewStatus: "審核中",
    reviewOpinion: "",
    reportStatus: "",
    expiryDate: "2025-12-05 09:26:26"
  }
];

interface DeleteUserRecordQueryProps {
  onViewRecord?: (applicationNumber: string) => void;
}

export function DeleteUserRecordQuery({ onViewRecord }: DeleteUserRecordQueryProps) {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [incompleteOwner, setIncompleteOwner] = useState("");
  const [unreportedPlatform, setUnreportedPlatform] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 處理查詢
  const handleSearch = () => {
    console.log("查詢條件:", {
      applicationNumber,
      email,
      reviewStatus,
      reportStatus,
      incompleteOwner,
      unreportedPlatform
    });
    setCurrentPage(1);
  };

  // 計算當前頁的數據
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = tableData.slice(startIndex, endIndex);

  // 表格欄位定義
  const columns: CwTableColumn[] = [
    { key: "applicationNumber", title: "申請單號", width: "100px" },
    { key: "email", title: "Email", width: "250px" },
    { 
      key: "reviewStatus", 
      title: "審核狀態", 
      width: "150px",
      render: (value: any) => (
        <StatusTag variant="default">{value}</StatusTag>
      )
    },
    { key: "reviewOpinion", title: "審核意見", width: "150px" },
    { key: "reportStatus", title: "回報狀態", width: "150px" },
    { key: "expiryDate", title: "刪除到期日", width: "180px" },
    { 
      key: "action", 
      title: "操作", 
      width: "80px", 
      align: "center",
      render: (value: any, record: any) => (
        <CwTooltip content="檢視">
          <CwRoundButton 
            icon="view" 
            onClick={() => onViewRecord?.(record.applicationNumber)} 
          />
        </CwTooltip>
      )
    }
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        title="刪除用戶紀錄查詢"
        breadcrumbs={
          <CwBreadcrumbs
            items={[
              { label: "首頁", href: "/" },
              { label: "個資刪除管理", href: "/privacy-deletion" },
              { label: "刪除用戶紀錄查詢" },
            ]}
          />
        }
      />

      {/* 搜尋表單 */}
      <div className="space-y-[16px]">
        <div className="grid grid-cols-6 gap-[12px]">
          <CwInput
            placeholder="請輸入申請單號"
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
          />
          <CwInput
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CwSelect
            options={reviewStatusOptions}
            value={reviewStatus}
            onChange={(value) => setReviewStatus(value)}
            placeholder="審核狀態"
            clearable
          />
          <CwSelect
            options={reportStatusOptions}
            value={reportStatus}
            onChange={(value) => setReportStatus(value)}
            placeholder="回覆狀態"
            clearable
          />
          <CwSelect
            options={incompleteOwnerOptions}
            value={incompleteOwner}
            onChange={(value) => setIncompleteOwner(value)}
            placeholder="未完成負責人"
            clearable
          />
          <CwSelect
            options={unreportedPlatformOptions}
            value={unreportedPlatform}
            onChange={(value) => setUnreportedPlatform(value)}
            placeholder="未回覆平台"
            clearable
          />
        </div>
        <div className="flex justify-end">
          <CwButton
            variant="primary"
            appearance="filled"
            onClick={handleSearch}
          >
            查詢
          </CwButton>
        </div>
      </div>

      {/* 表格 */}
      <CwTable
        columns={columns}
        dataSource={currentPageData}
        emptyText="沒有資料"
      />

      {/* 分頁 */}
      <CwPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={tableData.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}