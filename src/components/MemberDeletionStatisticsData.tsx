import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { CwBreadcrumbs } from "./CwBreadcrumbs";
import { CwSelect } from "./CwSelect";
import { CwButton } from "./CwButton";
import { CwTable, CwTableColumn } from "./CwTable";

interface MonthlyData {
  year: string;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  total: number;
  average: number;
}

/**
 * MemberDeletionStatisticsData 會員刪除統計資料頁面
 * 
 * 顯示會員刪除的月份統計資料
 */
export function MemberDeletionStatisticsData() {
  const [startYear, setStartYear] = useState("2025");
  const [endYear, setEndYear] = useState("2025");

  // 年份選項（2020-2030）
  const yearOptions = Array.from({ length: 11 }, (_, i) => ({
    value: String(2020 + i),
    label: `${2020 + i}年`,
  }));

  // 模擬資料
  const [dataSource] = useState<MonthlyData[]>([
    {
      year: "2025",
      january: 24,
      february: 32,
      march: 19,
      april: 50,
      may: 25,
      june: 52,
      july: 86,
      august: 106,
      september: 51,
      october: 112,
      november: 104,
      december: 0,
      total: 661,
      average: 55.08,
    },
  ]);

  // 表格欄位定義
  const columns: CwTableColumn<MonthlyData>[] = [
    {
      key: "year",
      title: "刪除個資",
      width: "100px",
      align: "left",
    },
    {
      key: "january",
      title: "一月",
      width: "80px",
      align: "left",
    },
    {
      key: "february",
      title: "二月",
      width: "80px",
      align: "left",
    },
    {
      key: "march",
      title: "三月",
      width: "80px",
      align: "left",
    },
    {
      key: "april",
      title: "四月",
      width: "80px",
      align: "left",
    },
    {
      key: "may",
      title: "五月",
      width: "80px",
      align: "left",
    },
    {
      key: "june",
      title: "六月",
      width: "80px",
      align: "left",
    },
    {
      key: "july",
      title: "七月",
      width: "80px",
      align: "left",
    },
    {
      key: "august",
      title: "八月",
      width: "80px",
      align: "left",
    },
    {
      key: "september",
      title: "九月",
      width: "80px",
      align: "left",
    },
    {
      key: "october",
      title: "十月",
      width: "80px",
      align: "left",
    },
    {
      key: "november",
      title: "十一月",
      width: "80px",
      align: "left",
    },
    {
      key: "december",
      title: "十二月",
      width: "80px",
      align: "left",
    },
    {
      key: "total",
      title: "合計",
      width: "80px",
      align: "left",
    },
    {
      key: "average",
      title: "月平均",
      width: "80px",
      align: "left",
    },
  ];

  const handleSearch = () => {
    console.log("搜尋:", { startYear, endYear });
    // 這裡可以加入實際的搜尋邏輯
  };

  return (
    <div className="flex flex-col w-full px-[30px] py-[20px]">
      {/* 標題與麵包屑 */}
      <CwTitle
        title="會員刪除統計資料"
        breadcrumbs={
          <CwBreadcrumbs
            items={[
              { label: "首頁", href: "/" },
              { label: "值資刪除管理", href: "/deletion-management" },
              { label: "會員刪除統計資料" },
            ]}
          />
        }
      />

      {/* 搜尋條件區域 */}
      <div className="flex items-center gap-[10px] mt-[20px]">
        {/* 開始年份 */}
        <div className="w-[400px]">
          <CwSelect
            options={yearOptions}
            value={startYear}
            onChange={setStartYear}
            placeholder="請選擇年份"
          />
        </div>

        {/* 至 */}
        <span
          className="text-[var(--color-text-primary)]"
          style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: '14px',
            fontWeight: 350,
          }}
        >
          至
        </span>

        {/* 結束年份 */}
        <div className="w-[400px]">
          <CwSelect
            options={yearOptions}
            value={endYear}
            onChange={setEndYear}
            placeholder="請選擇年份"
          />
        </div>

        {/* 搜尋按鈕 */}
        <CwButton variant="primary" onClick={handleSearch}>
          搜尋
        </CwButton>
      </div>

      {/* 統計表格 */}
      <div className="mt-[30px]">
        <CwTable columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
}