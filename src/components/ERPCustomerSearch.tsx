import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { CwRoundButton } from "./CwRoundButton";
import { ERPCustomerDetail } from "./ERPCustomerDetail";
import { ERPCustomerCreate } from "./ERPCustomerCreate";

// ── 型別定義 ──────────────────────────────────────────────────

// 一筆聯絡/地址資料
interface ContactRecord {
  contact: string;
  mobile: string;
  email: string;
  phone: string;
  address: string;
  isPrimary: boolean;
}

// 客戶主資料
interface ERPCustomerData {
  id: string;
  customerNumber: string;
  customerName: string;
  taxId: string;
  status: string;
  customerIdentity?: string;
  marketingConsentDate?: string;
  lastTransactionDate?: string;
  updatedAt?: string;
  contacts: ContactRecord[];
}

// 表格列資料（關閉明細：主要資料；開啟明細：各組展開）
interface CustomerRow {
  rowId: string;
  customerNumber: string;
  customerName: string;
  taxId: string;
  status: string;
  customerIdentity?: string;
  updatedAt?: string;
  contact: string;
  mobile: string;
  email: string;
  phone: string;
  address: string;
  isPrimary: boolean;
  // 用於跳轉詳情
  _raw: ERPCustomerData;
}

// ── Mock 資料 ─────────────────────────────────────────────────

const mockERPCustomers: ERPCustomerData[] = [
  {
    id: 'ec1',
    customerNumber: 'C001234',
    customerName: '王小明',
    taxId: '12345678',
    status: 'active',
    customerIdentity: '個人',
    marketingConsentDate: '2024-03-15',
    lastTransactionDate: '2025-11-20',
    updatedAt: '2026-04-18 09:32',
    contacts: [
      { contact: '王小明', mobile: '0912345678', email: 'wangxm@example.com', phone: '02-25074855', address: '台北市中山區中山北路二段7號', isPrimary: true },
      { contact: '王小明', mobile: '0912345678', email: 'wangxm@example.com', phone: '02-25074855', address: '新北市新店區中正路88號', isPrimary: false },
    ],
  },
  {
    id: 'ec2',
    customerNumber: 'C002345',
    customerName: '宏達股份有限公司',
    taxId: '23456789',
    status: 'active',
    customerIdentity: '公司',
    marketingConsentDate: '2023-08-01',
    lastTransactionDate: '2026-01-05',
    updatedAt: '2026-04-15 14:10',
    contacts: [
      { contact: '李大華', mobile: '0923456789', email: 'contact@htc.com.tw', phone: '02-29538888', address: '新北市板橋區文化路一段188號', isPrimary: true },
      { contact: '陳秘書', mobile: '0923456700', email: 'secretary@htc.com.tw', phone: '02-29538889', address: '新北市板橋區文化路一段188號', isPrimary: false },
      { contact: '林採購', mobile: '0956001234', email: 'purchase@htc.com.tw', phone: '02-29538890', address: '台北市信義區松仁路100號', isPrimary: false },
    ],
  },
  {
    id: 'ec3',
    customerNumber: 'C003456',
    customerName: '陳美玲',
    taxId: '',
    status: 'inactive',
    customerIdentity: '個人',
    marketingConsentDate: '',
    lastTransactionDate: '2024-06-30',
    updatedAt: '2025-03-02 11:05',
    contacts: [
      { contact: '陳美玲', mobile: '0934567890', email: 'chenml@example.com', phone: '04-22580777', address: '台中市西屯區台灣大道三段99號', isPrimary: true },
    ],
  },
  {
    id: 'ec4',
    customerNumber: 'C004567',
    customerName: '志遠國際貿易有限公司',
    taxId: '34567890',
    status: 'active',
    customerIdentity: '公司',
    marketingConsentDate: '2025-01-10',
    lastTransactionDate: '2026-02-14',
    updatedAt: '2026-04-20 08:47',
    contacts: [
      { contact: '張志遠', mobile: '0945678901', email: 'zhangzr@example.com', phone: '07-33335555', address: '高雄市前鎮區中山三路6號', isPrimary: true },
      { contact: '財務部', mobile: '0945000001', email: 'finance@zhiyuan.com', phone: '07-33335556', address: '高雄市前鎮區中山三路6號', isPrimary: false },
      { contact: '業務部', mobile: '0945000002', email: 'sales@zhiyuan.com',   phone: '07-33335557', address: '台北市大安區忠孝東路四段100號', isPrimary: false },
    ],
  },
  {
    id: 'ec5',
    customerNumber: 'C005678',
    customerName: '林淑芬',
    taxId: '',
    status: 'inactive',
    customerIdentity: '個人',
    marketingConsentDate: '',
    lastTransactionDate: '2023-12-01',
    updatedAt: '2024-01-08 16:22',
    contacts: [
      { contact: '林淑芬', mobile: '0956789012', email: 'linsf@example.com', phone: '06-23456789', address: '台南市東區裕農路198號', isPrimary: true },
    ],
  },
  {
    id: 'ec6',
    customerNumber: 'C006789',
    customerName: '天下文化事業股份有限公司',
    taxId: '45678901',
    status: 'active',
    customerIdentity: '公司',
    marketingConsentDate: '2022-05-20',
    lastTransactionDate: '2026-03-01',
    updatedAt: '2026-03-28 10:00',
    contacts: [
      { contact: '黃文龍', mobile: '0967890123', email: 'huang.wl@cwgv.com.tw', phone: '02-23560678', address: '台北市中正區重南路1號', isPrimary: true },
      { contact: '客服中心', mobile: '0967890000', email: 'service@cwgv.com.tw',  phone: '02-23560679', address: '台北市中正區重南路1號', isPrimary: false },
    ],
  },
  {
    id: 'ec7',
    customerNumber: 'C007890',
    customerName: '洪建志',
    taxId: '',
    status: 'active',
    customerIdentity: '個人',
    marketingConsentDate: '2024-11-08',
    lastTransactionDate: '2025-09-15',
    updatedAt: '2025-10-01 13:38',
    contacts: [
      { contact: '洪建志', mobile: '0978901234', email: 'hung.jz@example.com', phone: '08-33335566', address: '屏東市民生路55號', isPrimary: true },
    ],
  },
  {
    id: 'ec8',
    customerNumber: 'C008901',
    customerName: '邱雅玲國際股份有限公司',
    taxId: '56789012',
    status: 'inactive',
    customerIdentity: '公司',
    marketingConsentDate: '2021-07-19',
    lastTransactionDate: '2024-04-22',
    updatedAt: '2024-05-10 09:15',
    contacts: [
      { contact: '邱雅玲', mobile: '0989012345', email: 'chiu.yl@example.com', phone: '04-77778888', address: '彰化市中山路88號', isPrimary: true },
      { contact: '行政部', mobile: '0989000001', email: 'admin@chiu.com',      phone: '04-77778889', address: '台中市南區建國路200號', isPrimary: false },
    ],
  },
];

// ── 客戶狀態選項 ──────────────────────────────────────────────
const customerStatusOptions: CwSelectOption[] = [
  { value: '', label: 'ALL' },
  { value: 'active', label: 'active' },
  { value: 'inactive', label: 'inactive' },
];

// ── 五欄組合唯一 key（去重用）──────────────────────────────────
const contactKey = (c: ContactRecord) =>
  `${c.contact}|${c.mobile}|${c.email}|${c.phone}|${c.address}`;

// ── 區塊標題 ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>
      {children}
    </p>
  );
}

// ── 主元件 ────────────────────────────────────────────────────
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
  const [showCreate, setShowCreate] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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
      客戶編號: '', 客戶名稱: '', 統編: '', 地址: '',
      聯絡人: '', Email: '', 手機: '', 市話: '', 客戶狀態: '',
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
        if (target.tagName !== 'TEXTAREA') { e.preventDefault(); handleSearch(); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── 過濾客戶（主資料層級）──────────────────────────────────────
  const filteredCustomers: ERPCustomerData[] = hasSearched
    ? mockERPCustomers.filter(c => {
        if (searchForm.客戶編號 && !c.customerNumber.toLowerCase().includes(searchForm.客戶編號.toLowerCase())) return false;
        if (searchForm.客戶名稱 && !c.customerName.includes(searchForm.客戶名稱)) return false;
        if (searchForm.統編 && !c.taxId.includes(searchForm.統編)) return false;
        if (searchForm.客戶狀態 && c.status !== searchForm.客戶狀態) return false;
        // 聯絡/地址欄位：只要有任一 contact 符合就保留
        const anyContact = (fn: (cr: ContactRecord) => boolean) => c.contacts.some(fn);
        if (searchForm.地址   && !anyContact(cr => cr.address.includes(searchForm.地址))) return false;
        if (searchForm.聯絡人 && !anyContact(cr => cr.contact.includes(searchForm.聯絡人))) return false;
        if (searchForm.Email  && !anyContact(cr => cr.email.toLowerCase().includes(searchForm.Email.toLowerCase()))) return false;
        if (searchForm.手機   && !anyContact(cr => cr.mobile.includes(searchForm.手機))) return false;
        if (searchForm.市話   && !anyContact(cr => cr.phone.includes(searchForm.市話))) return false;
        return true;
      })
    : [];

  // ── 展開成表格列 ──────────────────────────────────────────────
  // 關閉明細：每個客戶只出現主要那筆
  // 開啟明細：每個客戶展開成多列，五欄組合去重
  const tableRows: CustomerRow[] = filteredCustomers.flatMap(c => {
    const base = {
      customerNumber:   c.customerNumber,
      customerName:     c.customerName,
      taxId:            c.taxId,
      status:           c.status,
      customerIdentity: c.customerIdentity,
      updatedAt:        c.updatedAt,
      _raw:             c,
    };

    if (!showContactDetail) {
      // 關閉明細：只顯示主要聯絡資料那一列
      const primary = c.contacts.find(cr => cr.isPrimary) ?? c.contacts[0];
      return [{
        rowId:    `${c.id}_primary`,
        ...base,
        contact:   primary.contact,
        mobile:    primary.mobile,
        email:     primary.email,
        phone:     primary.phone,
        address:   primary.address,
        isPrimary: true,
      }];
    }

    // 開啟明細：展開，五欄組合去重
    const seen = new Set<string>();
    return c.contacts
      .filter(cr => {
        const k = contactKey(cr);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .map((cr, i) => ({
        rowId:    `${c.id}_${i}`,
        ...base,
        contact:   cr.contact,
        mobile:    cr.mobile,
        email:     cr.email,
        phone:     cr.phone,
        address:   cr.address,
        isPrimary: cr.isPrimary,
      }));
  });

  const pagedRows = tableRows.slice(0, displayCount);

  // 無限滾動
  useEffect(() => {
    if (!tableContainerRef.current || isLoadingMore) return;
    const container = tableContainerRef.current;
    const handler = () => {
      if (
        container.scrollHeight - (container.scrollTop + container.clientHeight) < 100 &&
        displayCount < tableRows.length
      ) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayCount(prev => Math.min(prev + 10, tableRows.length));
          setIsLoadingMore(false);
        }, 1000);
      }
    };
    container.addEventListener('scroll', handler);
    return () => container.removeEventListener('scroll', handler);
  }, [tableRows.length, displayCount, isLoadingMore]);

  // ── 欄位定義 ──────────────────────────────────────────────────
  const columns: CwTableColumn<CustomerRow>[] = [
    { key: 'customerNumber', title: '客戶編號', width: '120px', stickyLeft: true },
    { key: 'customerName',   title: '客戶名稱', width: '180px', stickyLeft: true },
    {
      key: 'status' as any,
      title: '客戶狀態',
      width: '90px',
      align: 'center',
      render: (_v, r) => {
        const map: Record<string, { bg: string; color: string }> = {
          active:   { bg: '#f0fdf4', color: '#166534' },
          inactive: { bg: '#f3f4f6', color: '#4b5563' },
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
    { key: 'taxId',   title: '統編',   width: '100px' },

    { key: 'contact', title: '聯絡人', width: '100px',
      render: (_v, r) => (
        <span className="flex items-center gap-[4px]">
          {r.isPrimary && (
            <span
              className="inline-block px-[4px] py-[1px] rounded text-[10px] font-[600] shrink-0"
              style={{ background: '#e0f2fe', color: '#0369a1' }}
            >
              主
            </span>
          )}
          {r.contact}
        </span>
      ),
    },
    { key: 'mobile',  title: '手機',   width: '120px' },
    { key: 'phone',   title: '市話',   width: '130px' },
    { key: 'email',   title: 'Email',  width: '200px' },
    { key: 'address', title: '地址',   width: '260px' },
    {
      key: 'updatedAt' as any,
      title: '資料更新時間',
      width: '150px',
      render: (_v, r) => (
        <span
          className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#4b5563] tabular-nums"
          style={{ fontWeight: 350 }}
        >
          {r.updatedAt ?? '—'}
        </span>
      ),
    },
    {
      key: 'actions' as any,
      title: '功能',
      width: '64px',
      align: 'center',
      sticky: true,
      render: (_v, r) => (
        <div className="flex items-center justify-center">
          <CwRoundButton icon="view" title="查看" onClick={() => setSelectedCustomer(r._raw)} />
        </div>
      ),
    },
  ];

  // 關閉明細時隱藏聯絡欄（只留主要那筆，欄位精簡）
  const visibleColumns = showContactDetail
    ? columns
    : columns.filter(c => !(['contact', 'mobile', 'phone', 'email', 'address'] as string[]).includes(c.key as string));

  if (showCreate) {
    return <ERPCustomerCreate onClose={() => setShowCreate(false)} />;
  }

  if (selectedCustomer) {
    const primary = selectedCustomer.contacts.find(cr => cr.isPrimary) ?? selectedCustomer.contacts[0];
    return (
      <ERPCustomerDetail
        customer={{
          customerNumber:       selectedCustomer.customerNumber,
          customerName:         selectedCustomer.customerName,
          taxId:                selectedCustomer.taxId,
          status:               selectedCustomer.status,
          customerIdentity:     selectedCustomer.customerIdentity,
          marketingConsentDate: selectedCustomer.marketingConsentDate,
          lastTransactionDate:  selectedCustomer.lastTransactionDate,
          address: primary.address,
          contact: primary.contact,
          email:   primary.email,
          mobile:  primary.mobile,
          phone:   primary.phone,
        }}
        onClose={() => setSelectedCustomer(null)}
      />
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: '首頁', href: '/' },
    { label: 'ERP', href: '/erp' },
    { label: 'ERP 客戶查詢' },
  ];

  // 顯示筆數文字（關閉明細：客戶數；開啟明細：聯絡組合數）
  const countLabel = showContactDetail
    ? `共 ${tableRows.length} 筆（${filteredCustomers.length} 位客戶）`
    : `共 ${filteredCustomers.length} 位客戶`;

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
            <CwInput label="客戶編號" placeholder="客戶編號" value={searchForm.客戶編號} onChange={(e) => handleInputChange('客戶編號', e.target.value)} />
            <CwInput label="客戶名稱" placeholder="客戶名稱" value={searchForm.客戶名稱} onChange={(e) => handleInputChange('客戶名稱', e.target.value)} />
            <CwInput label="統編"     placeholder="統編"     value={searchForm.統編}     onChange={(e) => handleInputChange('統編', e.target.value)} />
            <CwInput label="地址"     placeholder="地址"     value={searchForm.地址}     onChange={(e) => handleInputChange('地址', e.target.value)} />
          </div>
          <div className="grid grid-cols-4 gap-[12px] items-end">
            <CwInput label="聯絡人" placeholder="聯絡人" value={searchForm.聯絡人} onChange={(e) => handleInputChange('聯絡人', e.target.value)} />
            <CwInput label="Email"  placeholder="Email"  value={searchForm.Email}  onChange={(e) => handleInputChange('Email', e.target.value)} />
            <CwInput label="手機"   placeholder="手機"   value={searchForm.手機}   onChange={(e) => handleInputChange('手機', e.target.value)} />
            <CwInput label="市話"   placeholder="市話"   value={searchForm.市話}   onChange={(e) => handleInputChange('市話', e.target.value)} />
          </div>
          <div className="grid grid-cols-4 gap-[12px] items-end">
            <CwSelect label="客戶狀態" value={searchForm.客戶狀態} onChange={(v) => handleInputChange('客戶狀態', v as string)} options={customerStatusOptions} placeholder="全部" />
          </div>
        </div>

        {/* ── 底部按鈕 ── */}
        <div className="flex items-center justify-between pt-[4px]">
          <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw size={14} />} onClick={handleReset}>清除</CwButton>
          <div className="flex items-center gap-[8px]">
            <CwButton variant="primary" appearance="filled" onClick={() => setShowCreate(true)}>新增客戶</CwButton>
            <CwButton variant="primary" appearance="filled" type="submit">查詢</CwButton>
          </div>
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
                onChange={(e) => { setShowContactDetail(e.target.checked); setDisplayCount(10); }}
                className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer"
              />
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
                展示 地址/聯絡資料 明細
              </span>
            </label>
            <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
              {countLabel}
            </span>
          </div>

          {/* 開啟明細時顯示說明 */}
          {showContactDetail && (
            <p className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
              每列為「聯絡人・手機・Email・市話・地址」的不重複組合；<span style={{ background: '#e0f2fe', color: '#0369a1', fontWeight: 600, padding: '1px 4px', borderRadius: 3 }}>主</span> 標示為該客戶的主要聯絡資料
            </p>
          )}

          <div ref={tableContainerRef} className="overflow-auto max-h-[calc(100vh-420px)]">
            <CwTable
              columns={visibleColumns}
              dataSource={pagedRows}
              rowKey="rowId"
              emptyText="查無符合條件的客戶資料"
            />
          </div>

          {isLoadingMore && (
            <div className="flex justify-center py-[12px]">
              <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>載入中…</span>
            </div>
          )}

          {!isLoadingMore && displayCount >= tableRows.length && tableRows.length > 0 && (
            <div className="flex justify-center py-[12px]">
              <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                已顯示全部 {tableRows.length} 筆
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

