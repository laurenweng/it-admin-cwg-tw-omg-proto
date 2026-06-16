import { useState, useRef, useEffect } from "react";
import { Plus, X, Search } from "lucide-react";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwTable, CwTableColumn } from "./CwTable";

// ── 型別定義 ────────────────────────────────────────────────

export interface CreateOrderItemData {
  id: number;
  // 定價
  productCode: string;
  productName: string;
  startPeriod: string;
  endPeriod: string;
  quantity: number;
  unitPrice: number;
  discount: string;
  sellPrice: number;
  actualAmount: number;
  transactionType: string;
  taxType: string;
  // 出貨
  requireDate: string;
  agreeMarketing: string;
  agreeMarketingDate: string;
  shipCustomerCode: string;
  shipCustomerName: string;
  shipAddress: string;
  shipRecipient: string;
  shipMethod: string;
  grade: string;
  discountMark: string;
  reserver: string;
  shipWarehouse: string;
  bookShowLocation: string;
  // 其他
  autoRenew: string;
  planCode: string;
  planName: string;
  isShipped?: boolean;
}

// ── 業務規則對照表 ───────────────────────────────────────────

const TRANSACTION_TAX_MAP: Record<string, string> = {
  '訂閱': '內含稅', '新訂': '內含稅', '續訂': '內含稅', '加訂': '內含稅',
};


// ── 表頭預設值（從 OMGOrderHeader mock 資料同步）────────────────

const HEADER_DEFAULTS = {
  shipCustomerCode: '1679128',
  shipCustomerName: 'JEFF',
  shipAddress:      '台北市中山區網路轉單，i',
  shipMethod:       '1001 郵寄一般',
  agreeMarketing:   '1',
};

// ── 空白表單初始值 ────────────────────────────────────────────

const today = () => new Date().toISOString().slice(0, 10);

// ── 方案 Mock 資料（每個方案帶自己的產品明細）────────────────

interface MockPlan {
  id: number;
  code: string;
  name: string;
  discount: string;
  startDate: string;
  endDate: string;
  items: Omit<CreateOrderItemData, 'id'>[];
}

const mockPlans: MockPlan[] = [
  {
    id: 1, code: 'GC17070009', name: '天下雜誌5期=275元', discount: '0%', startDate: '2025-01-01', endDate: '2025-12-31',
    items: [
      { productCode: 'GCV00001', productName: '天下雜誌 1 年期（26 期）', startPeriod: '2025-01', endPeriod: '2025-05', quantity: 5, unitPrice: 55, discount: '0', sellPrice: 55, actualAmount: 275, transactionType: '新訂', taxType: '內含稅', requireDate: today(), agreeMarketing: HEADER_DEFAULTS.agreeMarketing, agreeMarketingDate: '', shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode, shipCustomerName: HEADER_DEFAULTS.shipCustomerName, shipAddress: HEADER_DEFAULTS.shipAddress, shipRecipient: '', shipMethod: HEADER_DEFAULTS.shipMethod, grade: '', discountMark: 'N', reserver: '', shipWarehouse: '', bookShowLocation: '', autoRenew: 'N', planCode: 'GC17070009', planName: '天下雜誌5期=275元', isShipped: false },
    ],
  },
  {
    id: 2, code: 'CH18030012', name: '康健雜誌3期+贈品組=480元', discount: '0%', startDate: '2025-01-01', endDate: '2025-12-31',
    items: [
      { productCode: 'CHV00002', productName: '康健雜誌 半年期（6 期）', startPeriod: '2025-03', endPeriod: '2025-05', quantity: 3, unitPrice: 160, discount: '0', sellPrice: 160, actualAmount: 480, transactionType: '新訂', taxType: '內含稅', requireDate: today(), agreeMarketing: HEADER_DEFAULTS.agreeMarketing, agreeMarketingDate: '', shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode, shipCustomerName: HEADER_DEFAULTS.shipCustomerName, shipAddress: HEADER_DEFAULTS.shipAddress, shipRecipient: '', shipMethod: HEADER_DEFAULTS.shipMethod, grade: '', discountMark: 'N', reserver: '', shipWarehouse: '', bookShowLocation: '', autoRenew: 'N', planCode: 'CH18030012', planName: '康健雜誌3期+贈品組=480元', isShipped: false },
      { productCode: 'P005',     productName: '康健雜誌紙本季訂',         startPeriod: '',         endPeriod: '',         quantity: 1, unitPrice: 0,   discount: '0', sellPrice: 0,   actualAmount: 0,   transactionType: '加訂', taxType: '內含稅', requireDate: today(), agreeMarketing: HEADER_DEFAULTS.agreeMarketing, agreeMarketingDate: '', shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode, shipCustomerName: HEADER_DEFAULTS.shipCustomerName, shipAddress: HEADER_DEFAULTS.shipAddress, shipRecipient: '', shipMethod: HEADER_DEFAULTS.shipMethod, grade: '', discountMark: 'N', reserver: '', shipWarehouse: '', bookShowLocation: '', autoRenew: 'N', planCode: 'CH18030012', planName: '康健雜誌3期+贈品組=480元', isShipped: false },
    ],
  },
  {
    id: 3, code: 'PC20250601', name: '親子天下半年訂+數位閱讀=990元', discount: '0%', startDate: '2025-01-01', endDate: '2025-12-31',
    items: [
      { productCode: 'P003', productName: '親子天下紙本半年訂', startPeriod: '2025-06', endPeriod: '2025-11', quantity: 1, unitPrice: 780, discount: '0', sellPrice: 780, actualAmount: 780,  transactionType: '新訂', taxType: '內含稅', requireDate: today(), agreeMarketing: HEADER_DEFAULTS.agreeMarketing, agreeMarketingDate: '', shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode, shipCustomerName: HEADER_DEFAULTS.shipCustomerName, shipAddress: HEADER_DEFAULTS.shipAddress, shipRecipient: '', shipMethod: HEADER_DEFAULTS.shipMethod, grade: '', discountMark: 'N', reserver: '', shipWarehouse: '', bookShowLocation: '', autoRenew: 'N', planCode: 'PC20250601', planName: '親子天下半年訂+數位閱讀=990元', isShipped: false },
      { productCode: 'P004', productName: '親子天下數位年訂',   startPeriod: '2025-06', endPeriod: '2026-05', quantity: 1, unitPrice: 210, discount: '0', sellPrice: 210, actualAmount: 210,  transactionType: '加訂', taxType: '內含稅', requireDate: today(), agreeMarketing: HEADER_DEFAULTS.agreeMarketing, agreeMarketingDate: '', shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode, shipCustomerName: HEADER_DEFAULTS.shipCustomerName, shipAddress: HEADER_DEFAULTS.shipAddress, shipRecipient: '', shipMethod: HEADER_DEFAULTS.shipMethod, grade: '', discountMark: 'N', reserver: '', shipWarehouse: '', bookShowLocation: '', autoRenew: 'N', planCode: 'PC20250601', planName: '親子天下半年訂+數位閱讀=990元', isShipped: false },
    ],
  },
  {
    id: 4, code: 'PROMO2025', name: '天下雜誌年訂優惠', discount: '10%', startDate: '2025-01-01', endDate: '2025-12-31',
    items: [
      { productCode: 'GCV00001', productName: '天下雜誌 1 年期（26 期）', startPeriod: '', endPeriod: '', quantity: 1, unitPrice: 2380, discount: '10', sellPrice: 2142, actualAmount: 2142, transactionType: '新訂', taxType: '內含稅', requireDate: today(), agreeMarketing: HEADER_DEFAULTS.agreeMarketing, agreeMarketingDate: '', shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode, shipCustomerName: HEADER_DEFAULTS.shipCustomerName, shipAddress: HEADER_DEFAULTS.shipAddress, shipRecipient: '', shipMethod: HEADER_DEFAULTS.shipMethod, grade: '', discountMark: 'N', reserver: '', shipWarehouse: '', bookShowLocation: '', autoRenew: 'N', planCode: 'PROMO2025', planName: '天下雜誌年訂優惠', isShipped: false },
    ],
  },
];

const emptyForm = (): Omit<CreateOrderItemData, 'id'> => ({
  productCode: '', productName: '',
  startPeriod: '', endPeriod: '',
  quantity: 1, unitPrice: 0, discount: '0',
  sellPrice: 0, actualAmount: 0,
  transactionType: '', taxType: '',
  requireDate: today(),
  agreeMarketing:   HEADER_DEFAULTS.agreeMarketing,
  agreeMarketingDate: '',
  shipCustomerCode: HEADER_DEFAULTS.shipCustomerCode,
  shipCustomerName: HEADER_DEFAULTS.shipCustomerName,
  shipAddress:      HEADER_DEFAULTS.shipAddress,
  shipRecipient: '',
  shipMethod:       HEADER_DEFAULTS.shipMethod,
  grade: '', discountMark: 'N',
  reserver: '', shipWarehouse: '',
  bookShowLocation: '',
  autoRenew: 'N', planCode: '', planName: '',
  isShipped: false,
});

// ── 計算輔助 ─────────────────────────────────────────────────

function calcPrices(unitPrice: number, discountStr: string, quantity: number) {
  const pct = parseFloat(discountStr) || 0;
  const sellPrice = Math.round(unitPrice * (1 - pct / 100));
  const actualAmount = sellPrice * quantity;
  return { sellPrice, actualAmount };
}

// ── 通用 PopupSearchInput ────────────────────────────────────

function PopupSearchInput({
  label, value, onChange, onOpen, onClear, required, error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onOpen: () => void;
  onClear: () => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">
        {label}{required && <span style={{ color: '#E53E3E' }}> *</span>}
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-[35px] px-[12px] pr-[64px] border rounded-[4px] text-[14px] text-[#1c1c1c] bg-white font-['Noto_Sans_TC',_sans-serif] ${error ? 'border-[#E53E3E] bg-[#fff6f4]' : 'border-[#c4c9d3]'}`}
          style={{ fontWeight: 350 }}
        />
        {value && (
          <button type="button" onClick={onClear} className="absolute right-[36px] w-[24px] h-[24px] flex items-center justify-center text-[#7c808c] hover:text-[#1c1c1c]">
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] bg-white hover:bg-[#f5f7fa] flex items-center justify-center text-[#01579b]"
        >
          <Search size={14} />
        </button>
      </div>
      {error && <p className="text-[12px]" style={{ color: '#E53E3E' }}>{error}</p>}
    </div>
  );
}


// ── SectionTitle ──────────────────────────────────────────────

function SectionTitle({ children }: { children: string }) {
  return (
    <p className="text-[#1c1c1c] border-b border-[#c4c9d3] pb-[8px] mb-[16px]"
      style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '14px', fontWeight: 500 }}>
      {children}
    </p>
  );
}

type FormErrors = Partial<Record<keyof Omit<CreateOrderItemData, 'id'>, string>>;

// ── CreateOrderItems 主元件 ───────────────────────────────────

export function CreateOrderItems() {
  const [items, setItems] = useState<CreateOrderItemData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<CreateOrderItemData, 'id'>>(emptyForm());
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const nextId = useRef(1);

  // ── popup states ──
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [planKeyword,   setPlanKeyword]   = useState('');

  const planPopupRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉方案 popup
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (showPlanPopup && planPopupRef.current && !planPopupRef.current.contains(t)) { setShowPlanPopup(false); setPlanKeyword(''); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPlanPopup]);

  // ── 過濾清單 ──
  const filteredPlans = planKeyword ? mockPlans.filter(p => p.code.toLowerCase().includes(planKeyword.toLowerCase()) || p.name.includes(planKeyword)) : mockPlans;

  // ── form 更新輔助 ──
  const setF = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'unitPrice' || key === 'discount' || key === 'quantity') {
        const up  = key === 'unitPrice'  ? (value as number) : prev.unitPrice;
        const dis = key === 'discount'   ? (value as string) : prev.discount;
        const qty = key === 'quantity'   ? (value as number) : prev.quantity;
        const { sellPrice, actualAmount } = calcPrices(up, dis, qty);
        return { ...next, sellPrice, actualAmount };
      }
      if (key === 'transactionType') {
        const taxType = TRANSACTION_TAX_MAP[value as string] ?? prev.taxType;
        return { ...next, taxType };
      }
      if (key === 'planCode') {
        const plan = mockPlans.find(p => p.code === (value as string));
        return { ...next, planName: plan?.name ?? next.planName };
      }
      return next;
    });
    setFormErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  };

  // ── 訂閱類判斷 ──

  // ── 選擇 Popup 項目 ──
  const handleSelectPlan = (code: string, name: string) => {
    setForm(prev => ({ ...prev, planCode: code, planName: name }));
    setFormErrors(prev => { const n = { ...prev }; delete n.planCode; return n; });
    setShowPlanPopup(false); setPlanKeyword('');
  };

  // ── 開啟 / 關閉 Modal ──
  const openModal = () => {
    setForm(emptyForm());
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleConfirm = () => {
    const errs: FormErrors = {};
    if (!form.planCode) errs.planCode = '此欄位為必填';
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    const plan = mockPlans.find(p => p.code === form.planCode);
    if (plan) {
      const newItems = plan.items.map(item => ({ id: nextId.current++, ...item }));
      setItems(prev => [...prev, ...newItems]);
    }
    setShowModal(false);
    setFormErrors({});
  };

  // ── inline 更新明細欄位 ──
  const updateItem = (id: number, field: keyof CreateOrderItemData, value: string | number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const editCell = (r: CreateOrderItemData, field: keyof CreateOrderItemData) =>
    <CwInput value={String(r[field] ?? '')} onChange={(e) => updateItem(r.id, field, e.target.value)} />;

  const selectCell = (r: CreateOrderItemData, field: keyof CreateOrderItemData, options: { value: string; label: string }[]) =>
    <CwSelect value={String(r[field] ?? '')} options={options} onChange={(v) => updateItem(r.id, field, Array.isArray(v) ? v[0] ?? '' : v)} />;

  // ── 搜尋過濾明細列表 ──
  const keyword = searchKeyword.trim().toLowerCase();
  const displayItems = keyword
    ? items.filter(i => i.productCode.toLowerCase().includes(keyword) || i.productName.includes(keyword))
    : items;

  // ── 表格欄位定義 ──
  const fixedCols: CwTableColumn<CreateOrderItemData>[] = [
    { key: 'productCode', title: '產品料號', width: '120px' },
    { key: 'productName', title: '產品名稱', width: '200px' },
  ];

  const pricingCols: CwTableColumn<CreateOrderItemData>[] = [
    ...fixedCols,
    {
      key: 'transactionType', title: '交易型態', width: '110px',
      render: (_: any, r: CreateOrderItemData) => selectCell(r, 'transactionType', [
        { value: '訂閱', label: '訂閱' }, { value: '新訂', label: '新訂' },
        { value: '續訂', label: '續訂' }, { value: '加訂', label: '加訂' },
      ]),
    },
    { key: 'startPeriod',  title: '訂閱起期',    width: '110px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'startPeriod') },
    { key: 'endPeriod',    title: '訂閱迄期',    width: '110px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'endPeriod') },
    { key: 'quantity',     title: '數量',         width: '90px',  render: (_: any, r: CreateOrderItemData) =>
        <CwInput value={String(r.quantity)} onChange={(e) => updateItem(r.id, 'quantity', Number(e.target.value) || 0)} /> },
    { key: 'unitPrice',    title: '單位定價',     width: '110px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'discount',     title: '折扣',         width: '90px',  render: (_: any, r: CreateOrderItemData) => editCell(r, 'discount') },
    { key: 'sellPrice',    title: '單位售價',     width: '110px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'actualAmount', title: '實際銷售金額', width: '130px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    {
      key: 'taxType', title: '稅別', width: '110px',
      render: (_: any, r: CreateOrderItemData) => selectCell(r, 'taxType', [
        { value: '內含稅', label: '內含稅' }, { value: '外加稅', label: '外加稅' }, { value: '免稅', label: '免稅' },
      ]),
    },
  ];

  const shippingCols: CwTableColumn<CreateOrderItemData>[] = [
    ...fixedCols,
    { key: 'requireDate',        title: '需求日',       width: '130px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'requireDate') },
    {
      key: 'agreeMarketing', title: '同意行銷', width: '120px',
      render: (_: any, r: CreateOrderItemData) => selectCell(r, 'agreeMarketing', [
        { value: '1', label: '1 同意' }, { value: '2', label: '2 不同意' }, { value: 'A', label: 'A 不確定' },
      ]),
    },
    { key: 'agreeMarketingDate', title: '同意行銷日期', width: '130px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'agreeMarketingDate') },
    { key: 'shipCustomerCode',   title: '出貨客戶編號', width: '130px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'shipCustomerCode') },
    { key: 'shipCustomerName',   title: '出貨客戶名稱', width: '130px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'shipCustomerName') },
    { key: 'shipAddress',        title: '出貨地址',     width: '200px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'shipAddress') },
    { key: 'shipRecipient',      title: '出貨收件人',   width: '120px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'shipRecipient') },
    { key: 'shipMethod',         title: '出貨方式',     width: '130px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'shipMethod') },
    { key: 'grade',              title: '品級',         width: '80px',  render: (_: any, r: CreateOrderItemData) => editCell(r, 'grade') },
    {
      key: 'discountMark', title: '折扣標', width: '90px', align: 'center',
      render: (_: any, r: CreateOrderItemData) => selectCell(r, 'discountMark', [
        { value: 'Y', label: 'Y' }, { value: 'N', label: 'N' },
      ]),
    },
    { key: 'reserver',         title: '保留者', width: '110px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'reserver') },
    { key: 'shipWarehouse',    title: '出貨倉', width: '100px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'shipWarehouse') },
    { key: 'bookShowLocation', title: '書展儲位', width: '100px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'bookShowLocation') },
  ];

  const otherCols: CwTableColumn<CreateOrderItemData>[] = [
    ...fixedCols,
    {
      key: 'autoRenew', title: '自動續訂', width: '110px',
      render: (_: any, r: CreateOrderItemData) => selectCell(r, 'autoRenew', [
        { value: 'Y', label: 'Y' }, { value: 'N', label: 'N' },
      ]),
    },
    { key: 'planCode', title: '方案代碼', width: '120px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'planCode') },
    { key: 'planName', title: '方案名稱', width: '200px', render: (_: any, r: CreateOrderItemData) => editCell(r, 'planName') },
  ];


  // ── Render ────────────────────────────────────────────────

  return (
    <div className="space-y-[12px]">

      {/* 工具列 */}
      <div className="flex items-center justify-between">
        <button
          onClick={openModal}
          className="flex items-center gap-[6px] px-[14px] py-[8px] bg-[#0078d4] text-white rounded-[6px] text-[14px] font-[500] font-['Noto_Sans_TC',_sans-serif] hover:bg-[#106ebe] transition-colors"
        >
          <Plus size={16} />
          新增明細
        </button>
        <div className="flex items-center gap-[8px]">
          <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c] whitespace-nowrap" style={{ fontWeight: 350 }}>搜尋：</label>
          <CwInput
            placeholder="輸入關鍵字過濾"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            width="240px"
          />
        </div>
      </div>

      {/* 定價、出貨、其他表格：有明細才顯示 */}
      {items.length > 0 && (
        <>
          {/* 定價表格 */}
          <div>
            <SectionTitle>定價</SectionTitle>
            <div className="overflow-x-auto">
              <CwTable dataSource={displayItems} columns={pricingCols} rowKey="id" emptyText="尚無資料" />
            </div>
          </div>

          {/* 出貨表格 */}
          <div>
            <SectionTitle>出貨</SectionTitle>
            <div className="overflow-x-auto">
              <CwTable dataSource={displayItems} columns={shippingCols} rowKey="id" emptyText="尚無資料" />
            </div>
          </div>

          {/* 其他表格 */}
          <div>
            <SectionTitle>其他</SectionTitle>
            <div className="overflow-x-auto">
              <CwTable dataSource={displayItems} columns={otherCols} rowKey="id" emptyText="尚無資料" />
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          新增明細 Modal
      ════════════════════════════════════════════════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[1300] flex items-center justify-center p-[20px]">
          <div className="bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.18)] w-full max-w-[480px] flex flex-col">

            {/* Modal 標題列 */}
            <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#e5e7eb] shrink-0">
              <h3 className="text-[18px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>新增訂單明細</h3>
              <button onClick={closeModal} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* 內容 */}
            <div className="px-[24px] py-[20px]">
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px]">
                <PopupSearchInput
                  label="方案代碼"
                  required
                  value={form.planCode}
                  error={formErrors.planCode}
                  onChange={(v) => setF('planCode', v)}
                  onOpen={() => { setShowPlanPopup(true); setPlanKeyword(''); }}
                  onClear={() => { setForm(prev => ({ ...prev, planCode: '', planName: '' })); setFormErrors(p => { const n = {...p}; delete n.planCode; return n; }); }}
                />
                <CwInput label="方案名稱" value={form.planName} disabled readOnly />
              </div>
            </div>

            {/* Modal 底部按鈕 */}
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e5e7eb] shrink-0">
              <button
                onClick={closeModal}
                className="px-[20px] py-[9px] rounded-[6px] border border-[#c4c9d3] text-[#1c1c1c] text-[14px] font-['Noto_Sans_TC',_sans-serif] hover:bg-[#f5f7fa] transition-colors"
                style={{ fontWeight: 350 }}
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="px-[20px] py-[9px] rounded-[6px] bg-[#0078d4] text-white text-[14px] font-['Noto_Sans_TC',_sans-serif] font-[500] hover:bg-[#106ebe] transition-colors"
              >
                確認新增
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 方案搜尋 Popup */}
      {showPlanPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1400] flex items-center justify-center" onClick={() => { setShowPlanPopup(false); setPlanKeyword(''); }}>
          <div ref={planPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[620px] max-h-[560px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>選擇方案</h3>
              <button onClick={() => { setShowPlanPopup(false); setPlanKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c]"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋方案代碼或名稱" value={planKeyword} onChange={(e) => setPlanKeyword(e.target.value)} autoFocus
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">方案代碼</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">方案名稱</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">折扣</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">有效期</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlans.length > 0 ? filteredPlans.map(p => (
                    <tr key={p.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{p.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{p.name}</td>
                      <td className="px-[16px] py-[12px] text-center text-[#0078d4]">{p.discount}</td>
                      <td className="px-[16px] py-[12px] text-center text-[#7c808c]">{p.startDate} ~ {p.endDate}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectPlan(p.code, p.name)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-[16px] py-[32px] text-center text-[#7c808c]">查無符合資料</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
