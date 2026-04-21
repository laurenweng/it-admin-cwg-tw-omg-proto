import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTab } from "./CwTab";
import { CwEmptyState } from "./CwEmptyState";

export interface ERPCustomerInfo {
  customerNumber: string;
  customerName: string;
  taxId: string;
  address: string;
  contact: string;
  email: string;
  mobile: string;
  phone: string;
  status: string;
  // 新增欄位
  customerIdentity?: string;
  marketingConsentDate?: string;
  lastTransactionDate?: string;
}

interface ERPCustomerDetailProps {
  customer: ERPCustomerInfo;
  onClose: () => void;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  active:   { bg: '#f0fdf4', color: '#166534' },
  inactive: { bg: '#f3f4f6', color: '#4b5563' },
};

type TabId = 'address' | 'contact' | 'other' | 'subscription' | 'relation';

const TABS: { id: TabId; label: string }[] = [
  { id: 'address',      label: '地址' },
  { id: 'contact',      label: '聯絡資訊' },
  { id: 'other',        label: '其他資訊' },
  { id: 'subscription', label: '訂閱年資' },
  { id: 'relation',     label: '客戶關聯' },
];

export function ERPCustomerDetail({ customer, onClose }: ERPCustomerDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('address');

  const breadcrumbs: BreadcrumbItem[] = [
    { label: '首頁', href: '/' },
    { label: 'ERP', href: '/erp' },
    { label: 'ERP 客戶查詢', href: '/erp-customer-search' },
    { label: customer.customerName },
  ];

  const handleBreadcrumbNavigate = (_href: string, index: number) => {
    if (index <= 2) onClose();
  };

  const statusStyle = STATUS_STYLE[customer.status] ?? { bg: '#f3f4f6', color: '#4b5563' };

  const headerFields: [string, React.ReactNode][] = [
    ['客戶名稱', customer.customerName || '—'],
    ['客戶身分', customer.customerIdentity || '—'],
    ['狀態', (
      <span
        className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[12px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]"
        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, fontWeight: 500 }}
      >
        {customer.status}
      </span>
    )],
    ['客戶編號', customer.customerNumber || '—'],
    ['統一編號', customer.taxId || '—'],
    ['同意行銷更改日期', customer.marketingConsentDate || '—'],
    ['最後交易', customer.lastTransactionDate || '—'],
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <CwTitle
        title="ERP 客戶明細"
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
      />

      <div className="space-y-[30px] mx-[30px]">
        {/* 上方：客戶基本資料 */}
        <div className="grid grid-cols-4 gap-x-[24px] gap-y-[24px] my-[30px] mb-[40px]">
          {headerFields.map(([label, value]) => (
            <div key={label as string} className="flex flex-col gap-[4px]">
              <span
                className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 400 }}
              >
                {label}
              </span>
              {typeof value === 'string' ? (
                <span
                  className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                  style={{ fontWeight: 350 }}
                >
                  {value}
                </span>
              ) : (
                value
              )}
            </div>
          ))}
        </div>

        {/* 下方：頁籤 */}
        <CwTab
          items={TABS}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
        />

        <div className="py-[12px]">
          <CwEmptyState text="尚無資料" />
        </div>
      </div>
    </div>
  );
}
