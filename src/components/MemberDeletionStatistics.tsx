import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";

export function MemberDeletionStatistics() {
  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "個資刪除管理", href: "/privacy-deletion" },
    { label: "會員刪除統計資料" }
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        title="會員刪除統計資料"
        breadcrumbs={breadcrumbs}
      />

      {/* 建立中提示 */}
      <div className="py-[40px] text-center">
        <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
          建立中...
        </p>
      </div>
    </div>
  );
}
