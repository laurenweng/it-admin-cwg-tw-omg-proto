import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { ERPCustomerDetail } from "./ERPCustomerDetail";

// ── 客戶資料型別 ──────────────────────────────────────────────
interface ERPCustomerData {
  id: string;
  customerNumber: string;
  customerName: string;
  taxId: string;
  address: string;
  contact: string;
  email: string;
  mobile: string;
  phone: string;
  status: string;
  customerIdentity?: string;
  marketingConsentDate?: string;
  lastTransactionDate?: string;
}

// ── Mock 資料 ─────────────────────────────────────────────────
const mockERPCustomers: ERPCustomerData[] = [
  {
    id: 'ec1',
    customerNumber: 'C001234',
    customerName: '王小明',
    taxId: '12345678',
    address: '台北市中山區中山北路二段7號',
    contact: '王小明',
    email: 'wangxm@example.com',
    mobile: '0912345678',
    phone: '02-25074855',
    status: 'active',
    customerIdentity: '個人',
    marketingConsentDate: '2024-03-15',
    lastTransactionDate: '2025-11-20',
  },
  {
    id: 'ec2',
    customerNumber: 'C002345',
    customerName: '宏達股份有限公司',
    taxId: '23456789',
    address: '新北市板橋區文化路一段188號',
    contact: '李大華',
    email: 'contact@htc.com.tw',
    mobile: '0923456789',
    phone: '02-29538888',
    status: 'active',
    customerIdentity: '公司',
    marketingConsentDate: '2023-08-01',
    lastTransactionDate: '2026-01-05',
  },
  {
    id: 'ec3',
    customerNumber: 'C003456',
    customerName: '陳美玲',
    taxId: '',
    address: '台中市西屯區台灣大道三段99號',
    contact: '陳美玲',
    email: 'chenml@example.com',
    mobile: '0934567890',
    phone: '04-22580777',
    status: 'inactive',
    customerIdentity: '個人',
    marketingConsentDate: '',
    lastTransactionDate: '2024-06-30',
  },
  {
    id: 'ec4',
    customerNumber: 'C004567',
    customerName: '志遠國際貿易有限公司',
    taxId: '34567890',
    address: '高雄市前鎮區中山三路6號',
    contact: '張志遠',
    email: 'zhangzr@example.com',
    mobile: '0945678901',
    phone: '07-33335555',
    status: 'active',
    customerIdentity: '公司',
    marketingConsentDate: '2025-01-10',
    lastTransactionDate: '2026-02-14',
  },
  {
    id: 'ec5',
    customerNumber: 'C005678',
    customerName: '林淑芬',
    taxId: '',
    address: '台南市東區裕農路198號',
    contact: '林淑芬',
    email: 'linsf@example.com',
    mobile: '0956789012',
    phone: '06-23456789',
    status: 'inactive',
    customerIdentity: '個人',
    marketingConsentDate: '',
    lastTransactionDate: '2023-12-01',
  },
  {
    id: 'ec6',
    customerNumber: 'C006789',
    customerName: '天下文化事業股份有限公司',
    taxId: '45678901',
    address: '台北市中正區重南路1號',
    contact: '黃文龍',
    email: 'huang.wl@cwgv.com.tw',
    mobile: '0967890123',
    phone: '02-23560678',
    status: 'active',
    customerIdentity: '公司',
    marketingConsentDate: '2022-05-20',
    lastTransactionDate: '2026-03-01',
  },
  {
    id: 'ec7',
    customerNumber: 'C007890',
    customerName: '洪建志',
    taxId: '',
    address: '屏東市民生路55號',
    contact: '洪建志',
    email: 'hung.jz@example.com',
    mobile: '0978901234',
    phone: '08-33335566',
    status: 'active',
    customerIdentity: '個人',
    marketingConsentDate: '2024-11-08',
    lastTransactionDate: '2025-09-15',
  },
  {
    id: 'ec8',
    customerNumber: 'C008901',
    customerName: '邱雅玲國際股份有限公司',
    taxId: '56789012',
    address: '彰化市中山路88號',
    contact: '邱雅玲',
    email: 'chiu.yl@example.com',
    mobile: '0989012345',
    phone: '04-77778888',
    status: 'inactive',
    customerIdentity: '公司',
    marketingConsentDate: '2021-07-19',
    lastTransactionDate: '2024-04-22',
  },
];

// ── 客戶狀態選項 ──────────────────────────────────────────────
const customerStatusOptions: CwSelectOption[] = [
  { value: '', label: 'ALL' },
  { value: 'active', label: 'active' },
  { value: 'inactive', label: 'inactive' },
];

// ── 區塊標題 ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>
      {children}
    </p>
  );
}

// ── 元件 ──────────────────────────────────────────────────────
export function ERPCustomerSearch() {
  const [searchForm, setSearchForm] = useState({
    客戶編號: '',
    客戶名稱: '',
    統編: '',
    地址: '',
    聯絡人: '',
    Email: '',
    手機: '',
    市話: '',
    客戶狀態: '',
  });

  const [showContactDetail, setShowContactDetail] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ERPCustomerData | null>(null);
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // used by scroll handler below
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (key: string, value: string) => {
    setSearchForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setHasSearched(true);
    setDisplayCount(10);
  };

  const handleReset = () => {
    setSearchForm({
      客戶編號: '',
      客戶名稱: '',
      統編: '',
      地址: '',
      聯絡人: '',
      Email: '',
      手機: '',
      市話: '',
      客戶狀態: '',
    });
    setShowContactDetail(false);
    setHasSearched(false);
    setDisplayCount(10);
  };

  // Enter 執行查詢
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleSearch();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // 過濾資料
  const filteredCustomers: ERPCustomerData[] = hasSearched
    ? mockERPCustomers.filter(c => {
        if (searchForm.客戶編號 && !c.customerNumber.toLowerCase().includes(searchForm.客戶編號.toLowerCase())) return false;
        if (searchForm.客戶名稱 && !c.customerName.includes(searchForm.客戶名稱)) return false;
        if (searchForm.統編 && !c.taxId.includes(searchForm.統編)) return false;
        if (searchForm.地址 && !c.address.includes(searchForm.地址)) return false;
        if (searchForm.聯絡人 && !c.contact.includes(searchForm.聯絡人)) return false;
        if (searchForm.Email && !c.email.toLowerCase().includes(searchForm.Email.toLowerCase())) return false;
        if (searchForm.手機 && !c.mobile.includes(searchForm.手機)) return false;
        if (searchForm.市話 && !c.phone.includes(searchForm.市話)) return false;
        if (searchForm.客戶狀態 && c.status !== searchForm.客戶狀態) return false;
        return true;
      })
    : [];

  const pagedCustomers = filteredCustomers.slice(0, displayCount);

  // 無限滾動
  useEffect(() => {
    if (!tableContainerRef.current || isLoadingMore) return;
    const container = tableContainerRef.current;
    const handler = () => {
      if (
        container.scrollHeight - (container.scrollTop + container.clientHeight) < 100 &&
        displayCount < filteredCustomers.length
      ) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayCount(prev => Math.min(prev + 10, filteredCustomers.length));
          setIsLoadingMore(false);
        }, 1000);
      }
    };
    container.addEventListener('scroll', handler);
    return () => container.removeEventListener('scroll', handler);
  }, [filteredCustomers.length, displayCount, isLoadingMore]);

  // 欄位定義
  const columns: CwTableColumn<ERPCustomerData>[] = [
    { key: 'customerNumber', title: '客戶編號', width: '120px', stickyLeft: true },
    { key: 'customerName', title: '客戶名稱', width: '200px', stickyLeft: true },
    {
      key: 'status' as any,
      title: '客戶狀態',
      width: '90px',
      align: 'center',
      render: (_v, r) => {
        const map: Record<string, { bg: string; color: string }> = {
          'active':   { bg: '#f0fdf4', color: '#166534' },
          'inactive': { bg: '#f3f4f6', color: '#4b5563' },
        };
        const style = map[r.status] ?? { bg: '#f3f4f6', color: '#4b5563' };
        return (
          <span
            className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[12px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]"
            style={{ backgroundColor: style.bg, color: style.color, fontWeight: 500 }}
          >
            {r.status}
          </span>
        );
      },
    },
    { key: 'taxId', title: '統編', width: '100px' },
    ...(showContactDetail ? [
      { key: 'address', title: '地址', width: '260px' } as CwTableColumn<ERPCustomerData>,
      { key: 'mobile', title: '手機', width: '120px' } as CwTableColumn<ERPCustomerData>,
      { key: 'phone', title: '市話', width: '130px' } as CwTableColumn<ERPCustomerData>,
      { key: 'email', title: 'Email', width: '200px' } as CwTableColumn<ERPCustomerData>,
      { key: 'contact', title: '聯絡人', width: '100px' } as CwTableColumn<ERPCustomerData>,
    ] : []),
    {
      key: 'actions' as any,
      title: '功能',
      width: '80px',
      align: 'center',
      sticky: true,
      render: (_v, r) => (
        <div className="flex items-center justify-center">
          <button
            onClick={() => setSelectedCustomer(r)}
            className="px-[8px] text-[#0078d4] text-[12px] hover:bg-[#e6f2fb] transition-colors whitespace-nowrap font-['Noto_Sans_TC',_sans-serif] underline"
            style={{ fontWeight: 350 }}
          >查看</button>
        </div>
      ),
    },
  ];

  if (selectedCustomer) {
    return (
      <ERPCustomerDetail
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: '首頁', href: '/' },
    { label: 'ERP', href: '/erp' },
    { label: 'ERP 客戶查詢' },
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <CwTitle title="ERP 客戶查詢" breadcrumbs={breadcrumbs} />

      <form
        className="bg-white space-y-[16px]"
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
      >
        {/* ── 查詢欄位 ── */}
        <div className="space-y-[12px] border-b border-gray-200 pb-[20px]">
          <div className="grid grid-cols-4 gap-[12px] items-end">
            <CwInput
              label="客戶編號"
              placeholder="客戶編號"
              value={searchForm.客戶編號}
              onChange={(e) => handleInputChange('客戶編號', e.target.value)}
            />
            <CwInput
              label="客戶名稱"
              placeholder="客戶名稱"
              value={searchForm.客戶名稱}
              onChange={(e) => handleInputChange('客戶名稱', e.target.value)}
            />
            <CwInput
              label="統編"
              placeholder="統編"
              value={searchForm.統編}
              onChange={(e) => handleInputChange('統編', e.target.value)}
            />
            <CwInput
              label="地址"
              placeholder="地址"
              value={searchForm.地址}
              onChange={(e) => handleInputChange('地址', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-[12px] items-end">
            <CwInput
              label="聯絡人"
              placeholder="聯絡人"
              value={searchForm.聯絡人}
              onChange={(e) => handleInputChange('聯絡人', e.target.value)}
            />
            <CwInput
              label="Email"
              placeholder="Email"
              value={searchForm.Email}
              onChange={(e) => handleInputChange('Email', e.target.value)}
            />
            <CwInput
              label="手機"
              placeholder="手機"
              value={searchForm.手機}
              onChange={(e) => handleInputChange('手機', e.target.value)}
            />
            <CwInput
              label="市話"
              placeholder="市話"
              value={searchForm.市話}
              onChange={(e) => handleInputChange('市話', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-[12px] items-end">

            {/* 客戶狀態 */}
            <CwSelect
              label="客戶狀態"
              value={searchForm.客戶狀態}
              onChange={(v) => handleInputChange('客戶狀態', v as string)}
              options={customerStatusOptions}
              placeholder="全部"
            />

          </div>
        </div>

        {/* ── 底部按鈕 ── */}
        <div className="flex items-center justify-between pt-[4px]">
          <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw size={14} />} onClick={handleReset}>清除</CwButton>
          <CwButton variant="primary" appearance="filled" type="submit">查詢</CwButton>
        </div>
      </form>

      {/* ── 查詢結果 ── */}
      {hasSearched && (
        <div className="space-y-[12px]">
          <div className="flex items-center justify-between">

            {/* 展示 地址/聯絡資料 明細 */}
            <label className="flex items-center gap-[8px] cursor-pointer select-none pb-[4px]">
              <input
                type="checkbox"
                checked={showContactDetail}
                onChange={(e) => setShowContactDetail(e.target.checked)}
                className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer"
              />
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
                展示 地址/聯絡資料 明細
              </span>
            </label>
            <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
              共 {filteredCustomers.length} 筆
            </span>
          </div>

          <div ref={tableContainerRef} className="overflow-auto max-h-[calc(100vh-420px)]">
            <CwTable
              columns={columns}
              dataSource={pagedCustomers}
              rowKey="id"
              emptyText="查無符合條件的客戶資料"
            />
          </div>

          {isLoadingMore && (
            <div className="flex justify-center py-[12px]">
              <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                載入中…
              </span>
            </div>
          )}

          {!isLoadingMore && displayCount >= filteredCustomers.length && filteredCustomers.length > 0 && (
            <div className="flex justify-center py-[12px]">
              <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                已顯示全部 {filteredCustomers.length} 筆
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
