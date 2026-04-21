import { useState, useRef, useEffect } from "react";
import { Plus, X, Search } from "lucide-react";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwDatePicker } from "./CwDatePicker";
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

// ── Mock 資料 ────────────────────────────────────────────────

const mockProducts = [
  { id: 1, code: 'GCV00001', name: '天下雜誌 1 年期（26 期）' },
  { id: 2, code: 'CHV00002', name: '康健雜誌 半年期（6 期）' },
  { id: 3, code: 'P003',     name: '親子天下紙本半年訂' },
  { id: 4, code: 'P004',     name: '親子天下數位年訂' },
  { id: 5, code: 'P005',     name: '康健雜誌紙本季訂' },
  { id: 6, code: 'P008',     name: '遠見雜誌紙本年訂' },
];

const mockCustomers = [
  { id: 1, code: 'C001234', name: '王小明', address: '台北市中山區中山北路二段7號' },
  { id: 2, code: 'C002345', name: '李大華', address: '新北市板橋區文化路一段188號' },
  { id: 3, code: 'C003456', name: '陳美玲', address: '台中市西屯區台灣大道三段99號' },
  { id: 4, code: '1679128', name: 'JEFF',   address: '台北市大同區民權西路103號' },
  { id: 5, code: 'C005678', name: '林淑芬', address: '台南市東區裕農路198號' },
];

const mockShippingMethods = [
  { id: 1, code: '1001', name: '郵寄一般' },
  { id: 2, code: '1002', name: '郵寄限時' },
  { id: 3, code: '1005', name: '郵寄-一般航空' },
  { id: 4, code: '1006', name: '郵寄-掛號水陸' },
  { id: 5, code: '1007', name: '郵寄-掛號航空' },
  { id: 6, code: '1009', name: '郵寄-指定宅配' },
  { id: 7, code: '2001', name: '宅配' },
];

const mockPlans = [
  { id: 1, code: 'PROMO2025',  name: '天下雜誌年訂優惠',  discount: '10%', startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 2, code: 'SPRING2025', name: '春季特惠專案',       discount: '15%', startDate: '2025-03-01', endDate: '2025-05-31' },
  { id: 3, code: 'VIP15',      name: 'VIP 會員專享',       discount: '15%', startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 4, code: 'NEWUSER25',  name: '新用戶首購優惠',     discount: '25%', startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 5, code: 'GCV-Y',      name: '天下雜誌年訂方案',   discount: '0%',  startDate: '2025-01-01', endDate: '2025-12-31' },
];

// ── 業務規則對照表 ───────────────────────────────────────────

const PRODUCT_DEFAULT_TRANSACTION: Record<string, string> = {
  'GCV00001': '新訂', 'CHV00002': '新訂',
  'P003': '新訂', 'P004': '新訂', 'P005': '新訂', 'P008': '新訂',
};

const TRANSACTION_TAX_MAP: Record<string, string> = {
  '訂閱': '內含稅', '新訂': '內含稅', '續訂': '內含稅', '加訂': '內含稅',
};

const SUBSCRIPTION_TYPES = new Set(['訂閱', '新訂', '續訂', '加訂']);

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

// ── RequiredLabel ──────────────────────────────────────────────

function RequiredLabel({ children }: { children: string }) {
  return (
    <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">
      {children}<span style={{ color: '#E53E3E' }}> *</span>
    </label>
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
  const [activeTab, setActiveTab] = useState<'pricing' | 'shipping' | 'other'>('pricing');
  const [form, setForm] = useState<Omit<CreateOrderItemData, 'id'>>(emptyForm());
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const nextId = useRef(1);

  // ── popup states ──
  const [showProductPopup,  setShowProductPopup]  = useState(false);
  const [productKeyword,    setProductKeyword]    = useState('');
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [customerKeyword,   setCustomerKeyword]   = useState('');
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [shippingKeyword,   setShippingKeyword]   = useState('');
  const [showPlanPopup,     setShowPlanPopup]     = useState(false);
  const [planKeyword,       setPlanKeyword]       = useState('');

  const productPopupRef  = useRef<HTMLDivElement>(null);
  const customerPopupRef = useRef<HTMLDivElement>(null);
  const shippingPopupRef = useRef<HTMLDivElement>(null);
  const planPopupRef     = useRef<HTMLDivElement>(null);

  // 點擊外部關閉各 popup
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (showProductPopup  && productPopupRef.current  && !productPopupRef.current.contains(t))  { setShowProductPopup(false);  setProductKeyword(''); }
      if (showCustomerPopup && customerPopupRef.current && !customerPopupRef.current.contains(t)) { setShowCustomerPopup(false); setCustomerKeyword(''); }
      if (showShippingPopup && shippingPopupRef.current && !shippingPopupRef.current.contains(t)) { setShowShippingPopup(false); setShippingKeyword(''); }
      if (showPlanPopup     && planPopupRef.current     && !planPopupRef.current.contains(t))     { setShowPlanPopup(false);     setPlanKeyword(''); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showProductPopup, showCustomerPopup, showShippingPopup, showPlanPopup]);

  // ── 過濾清單 ──
  const filteredProducts  = productKeyword  ? mockProducts.filter(p => p.code.toLowerCase().includes(productKeyword.toLowerCase()) || p.name.includes(productKeyword))  : mockProducts;
  const filteredCustomers = customerKeyword ? mockCustomers.filter(c => c.code.includes(customerKeyword) || c.name.includes(customerKeyword)) : mockCustomers;
  const filteredShipping  = shippingKeyword ? mockShippingMethods.filter(s => s.code.includes(shippingKeyword) || s.name.includes(shippingKeyword)) : mockShippingMethods;
  const filteredPlans     = planKeyword     ? mockPlans.filter(p => p.code.toLowerCase().includes(planKeyword.toLowerCase()) || p.name.includes(planKeyword)) : mockPlans;

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
  const isSubscription = SUBSCRIPTION_TYPES.has(form.transactionType);
  const isShipped = !!form.isShipped;

  // ── 選擇 Popup 項目 ──
  const handleSelectProduct = (code: string, name: string) => {
    const transactionType = PRODUCT_DEFAULT_TRANSACTION[code] ?? '';
    const taxType = TRANSACTION_TAX_MAP[transactionType] ?? '';
    setForm(prev => {
      const { sellPrice, actualAmount } = calcPrices(prev.unitPrice, prev.discount, prev.quantity);
      return { ...prev, productCode: code, productName: name, transactionType, taxType, sellPrice, actualAmount };
    });
    setFormErrors(prev => { const n = { ...prev }; delete n.productCode; delete n.transactionType; return n; });
    setShowProductPopup(false); setProductKeyword('');
  };

  const handleSelectCustomer = (code: string, name: string, address: string) => {
    setForm(prev => ({ ...prev, shipCustomerCode: code, shipCustomerName: name, shipAddress: address }));
    setFormErrors(prev => { const n = { ...prev }; delete n.shipCustomerCode; delete n.shipAddress; return n; });
    setShowCustomerPopup(false); setCustomerKeyword('');
  };

  const handleSelectShipping = (code: string, name: string) => {
    setF('shipMethod', `${code} ${name}`);
    setShowShippingPopup(false); setShippingKeyword('');
  };

  const handleSelectPlan = (code: string, name: string) => {
    setForm(prev => ({ ...prev, planCode: code, planName: name }));
    setShowPlanPopup(false); setPlanKeyword('');
  };

  // ── 開啟 / 關閉 Modal ──
  const openModal = () => {
    setForm(emptyForm());
    setFormErrors({});
    setActiveTab('pricing');
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleConfirm = () => {
    const errs: FormErrors = {};
    const REQ = '此欄位為必填';
    if (!form.productCode) errs.productCode = REQ;
    if (isSubscription && !form.startPeriod) errs.startPeriod = REQ;
    if (isSubscription && !form.endPeriod) errs.endPeriod = REQ;
    if (!form.requireDate) errs.requireDate = REQ;
    if (!form.shipCustomerCode) errs.shipCustomerCode = REQ;
    if (!form.shipAddress) errs.shipAddress = REQ;
    if (!form.shipRecipient) errs.shipRecipient = REQ;
    if (!form.shipMethod) errs.shipMethod = REQ;
    if (!form.shipWarehouse) errs.shipWarehouse = REQ;
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      if (errs.productCode || errs.startPeriod || errs.endPeriod) setActiveTab('pricing');
      else setActiveTab('shipping');
      return;
    }
    setItems(prev => [...prev, { id: nextId.current++, ...form }]);
    setShowModal(false);
    setFormErrors({});
  };

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
    { key: 'startPeriod',     title: '訂閱起期',     width: '100px' },
    { key: 'endPeriod',       title: '訂閱迄期',     width: '100px' },
    { key: 'quantity',        title: '數量',          width: '70px',  align: 'center' },
    { key: 'unitPrice',       title: '單位定價',      width: '110px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'discount',        title: '折扣',          width: '70px',  align: 'center', render: (v: any) => `${v}%` },
    { key: 'sellPrice',       title: '單位售價',      width: '110px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'actualAmount',    title: '實際銷售金額',  width: '130px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'transactionType', title: '交易型態',      width: '90px' },
    { key: 'taxType',         title: '稅別',          width: '80px' },
  ];

  const shippingCols: CwTableColumn<CreateOrderItemData>[] = [
    ...fixedCols,
    { key: 'requireDate',      title: '需求日',       width: '110px' },
    { key: 'agreeMarketing',   title: '同意行銷',     width: '100px', align: 'center', render: (v: any) => ({ '1': '1 同意', '2': '2 不同意', 'A': 'A 不確定' }[v as string] ?? v) },
    { key: 'shipCustomerCode', title: '出貨客戶編號', width: '120px' },
    { key: 'shipCustomerName', title: '出貨客戶名稱', width: '120px' },
    { key: 'shipAddress',      title: '出貨地址',     width: '200px' },
    { key: 'shipRecipient',    title: '出貨收件人',   width: '110px' },
    { key: 'shipMethod',       title: '出貨方式',     width: '130px' },
    { key: 'grade',            title: '品級',          width: '70px',  align: 'center' },
    { key: 'discountMark',     title: '折扣標',       width: '80px',  align: 'center' },
    { key: 'reserver',         title: '保留者',       width: '100px' },
    { key: 'shipWarehouse',    title: '出貨倉',       width: '90px' },
    { key: 'bookShowLocation', title: '書展儲位',     width: '100px' },
  ];

  const otherCols: CwTableColumn<CreateOrderItemData>[] = [
    ...fixedCols,
    { key: 'autoRenew', title: '自動續訂', width: '90px',  align: 'center' },
    { key: 'planCode',  title: '方案代碼', width: '120px' },
    { key: 'planName',  title: '方案名稱', width: '200px' },
  ];

  const tabs = [
    { key: 'pricing'  as const, label: '定價' },
    { key: 'shipping' as const, label: '出貨' },
    { key: 'other'    as const, label: '其他' },
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
      </div>

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

      {/* ═══════════════════════════════════════════════════════
          新增明細 Modal
      ════════════════════════════════════════════════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[1300] flex items-center justify-center p-[20px]">
          <div className="bg-white rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.18)] w-full max-w-[760px] max-h-[90vh] flex flex-col">

            {/* Modal 標題列 */}
            <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#e5e7eb] shrink-0">
              <h3 className="text-[18px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>新增訂單明細</h3>
              <button onClick={closeModal} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tab 列 */}
            <div className="flex border-b border-[#e5e7eb] shrink-0 px-[24px]">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-[16px] py-[12px] text-[14px] font-['Noto_Sans_TC',_sans-serif] border-b-[2px] transition-colors ${
                    activeTab === t.key
                      ? 'border-[#0078d4] text-[#0078d4] font-[600]'
                      : 'border-transparent text-[#7c808c] hover:text-[#1c1c1c]'
                  }`}
                  style={{ fontWeight: activeTab === t.key ? 600 : 350 }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 內容：可捲動 */}
            <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">

              {/* ── 定價 Tab ── */}
              {activeTab === 'pricing' && (
                <div className="space-y-[16px]">
                  <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px]">
                    {/* 產品料號：Popup 搜尋 */}
                    <PopupSearchInput
                      label="產品料號"
                      required
                      value={form.productCode}
                      error={formErrors.productCode}
                      onChange={(v) => setF('productCode', v)}
                      onOpen={() => { setShowProductPopup(true); setProductKeyword(''); }}
                      onClear={() => { setForm(prev => ({ ...prev, productCode: '', productName: '' })); setFormErrors(p => { const n = {...p}; delete n.productCode; return n; }); }}
                    />
                    {/* 產品名稱：選產品後自動帶入，唯讀 */}
                    <CwInput label="產品名稱" value={form.productName} disabled readOnly />

                    {/* 訂閱起期：訂閱類必填 */}
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">
                        訂閱起期{isSubscription && <span style={{ color: '#E53E3E' }}> *</span>}
                      </label>
                      <CwInput
                        value={form.startPeriod}
                        placeholder="例：782"
                        error={formErrors.startPeriod}
                        onChange={(e) => setF('startPeriod', e.target.value)}
                      />
                    </div>

                    {/* 訂閱迄期：訂閱類必填 */}
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">
                        訂閱迄期{isSubscription && <span style={{ color: '#E53E3E' }}> *</span>}
                      </label>
                      <CwInput
                        value={form.endPeriod}
                        placeholder="例：807"
                        error={formErrors.endPeriod}
                        onChange={(e) => setF('endPeriod', e.target.value)}
                      />
                    </div>

                    {/* 數量：預設 1 */}
                    <CwInput
                      label="數量"
                      value={String(form.quantity)}
                      disabled={isShipped}
                      readOnly={isShipped}
                      onChange={(e) => setF('quantity', parseInt(e.target.value, 10) || 0)}
                    />
                    {/* 單位定價 */}
                    <CwInput
                      label="單位定價"
                      value={String(form.unitPrice)}
                      onChange={(e) => setF('unitPrice', parseFloat(e.target.value) || 0)}
                    />
                    {/* 折扣 */}
                    <CwInput
                      label="折扣（%）"
                      value={form.discount}
                      placeholder="輸入數字，如 10 代表 10%"
                      onChange={(e) => setF('discount', e.target.value)}
                    />
                    {/* 單位售價：自動計算 */}
                    <CwInput label="單位售價" value={`NT$ ${form.sellPrice.toLocaleString()}`} disabled readOnly />
                    {/* 實際銷售金額：自動計算 */}
                    <div className="col-span-2">
                      <CwInput label="實際銷售金額" value={`NT$ ${form.actualAmount.toLocaleString()}`} disabled readOnly />
                    </div>
                    {/* 交易型態：由料號自動帶出預設值 */}
                    <CwSelect
                      label="交易型態"
                      value={form.transactionType}
                      options={[
                        { value: '訂閱', label: '訂閱' },
                        { value: '新訂', label: '新訂' },
                        { value: '續訂', label: '續訂' },
                        { value: '加訂', label: '加訂' },
                      ]}
                      placeholder="請選擇"
                      onChange={(v) => setF('transactionType', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                    {/* 稅別：由交易型態自動帶出 */}
                    <CwSelect
                      label="稅別"
                      value={form.taxType}
                      options={[
                        { value: '內含稅', label: '內含稅' },
                        { value: '外加稅', label: '外加稅' },
                        { value: '免稅',   label: '免稅' },
                      ]}
                      placeholder="請選擇"
                      onChange={(v) => setF('taxType', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                  </div>
                </div>
              )}

              {/* ── 出貨 Tab ── */}
              {activeTab === 'shipping' && (
                <div className="space-y-[16px]">
                  {form.productCode && (
                    <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px] p-[12px] bg-[#f5f7fa] rounded-[6px]">
                      <CwInput label="產品料號" value={form.productCode} disabled readOnly />
                      <CwInput label="產品名稱" value={form.productName} disabled readOnly />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px]">

                    {/* 需求日：預設當日 */}
                    <div className="flex flex-col gap-[6px]">
                      <RequiredLabel>需求日</RequiredLabel>
                      <CwDatePicker
                        value={form.requireDate ? new Date(form.requireDate) : null}
                        onChange={(d) => setF('requireDate', d ? d.toISOString().slice(0, 10) : '')}
                      />
                      {formErrors.requireDate && <p className="text-[12px]" style={{ color: '#E53E3E' }}>{formErrors.requireDate}</p>}
                    </div>

                    {/* 同意行銷：預設從表頭同步 */}
                    <CwSelect
                      label="同意行銷"
                      value={form.agreeMarketing}
                      options={[
                        { value: '1', label: '1 同意' },
                        { value: '2', label: '2 不同意' },
                        { value: 'A', label: 'A 不確定' },
                      ]}
                      onChange={(v) => setF('agreeMarketing', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                    {/* 同意行銷日期 */}
                    <CwDatePicker
                      label="同意行銷日期"
                      disabled={form.agreeMarketing !== '1'}
                      onChange={(d) => setF('agreeMarketingDate', d ? d.toISOString().slice(0, 10) : '')}
                    />

                    {/* 出貨客戶編號：預設從表頭同步，可修改 */}
                    <PopupSearchInput
                      label="出貨客戶編號"
                      required
                      value={form.shipCustomerCode}
                      error={formErrors.shipCustomerCode}
                      onChange={(v) => setF('shipCustomerCode', v)}
                      onOpen={() => { setShowCustomerPopup(true); setCustomerKeyword(''); }}
                      onClear={() => { setForm(prev => ({ ...prev, shipCustomerCode: '', shipCustomerName: '', shipAddress: '' })); setFormErrors(p => { const n = {...p}; delete n.shipCustomerCode; return n; }); }}
                    />
                    {/* 出貨客戶名稱：自動帶入，唯讀 */}
                    <CwInput label="出貨客戶名稱" value={form.shipCustomerName} disabled readOnly />
                    {/* 出貨地址 */}
                    <div className="col-span-2">
                      <CwInput label="出貨地址" value={form.shipAddress} error={formErrors.shipAddress} onChange={(e) => setF('shipAddress', e.target.value)} />
                    </div>
                    {/* 出貨收件人 */}
                    <CwInput label="出貨收件人" value={form.shipRecipient} error={formErrors.shipRecipient} onChange={(e) => setF('shipRecipient', e.target.value)} />
                    {/* 出貨方式：從表頭同步 */}
                    <PopupSearchInput
                      label="出貨方式"
                      required
                      value={form.shipMethod}
                      error={formErrors.shipMethod}
                      onChange={(v) => setF('shipMethod', v)}
                      onOpen={() => { setShowShippingPopup(true); setShippingKeyword(''); }}
                      onClear={() => setF('shipMethod', '')}
                    />
                    {/* 品級 */}
                    <CwInput label="品級" value={form.grade} onChange={(e) => setF('grade', e.target.value)} />
                    {/* 折扣標 */}
                    <CwSelect
                      label="折扣標"
                      value={form.discountMark}
                      options={[{ value: 'Y', label: 'Y' }, { value: 'N', label: 'N' }]}
                      onChange={(v) => setF('discountMark', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                    {/* 保留者 */}
                    <CwInput label="保留者" value={form.reserver} onChange={(e) => setF('reserver', e.target.value)} />
                    {/* 出貨倉：已出貨時 disabled */}
                    <CwInput
                      label="出貨倉"
                      value={form.shipWarehouse}
                      error={formErrors.shipWarehouse}
                      disabled={isShipped}
                      readOnly={isShipped}
                      onChange={(e) => setF('shipWarehouse', e.target.value)}
                    />
                    {/* 書展儲位：已出貨時 disabled */}
                    <CwInput
                      label="書展儲位"
                      value={form.bookShowLocation}
                      disabled={isShipped}
                      readOnly={isShipped}
                      onChange={(e) => setF('bookShowLocation', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* ── 其他 Tab ── */}
              {activeTab === 'other' && (
                <div className="space-y-[16px]">
                  {form.productCode && (
                    <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px] p-[12px] bg-[#f5f7fa] rounded-[6px]">
                      <CwInput label="產品料號" value={form.productCode} disabled readOnly />
                      <CwInput label="產品名稱" value={form.productName} disabled readOnly />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-x-[20px] gap-y-[16px]">
                    {/* 自動續訂 */}
                    <CwSelect
                      label="自動續訂"
                      value={form.autoRenew}
                      options={[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]}
                      onChange={(v) => setF('autoRenew', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                    {/* 方案代碼：Popup 搜尋，選取後自動帶入方案名稱 */}
                    <PopupSearchInput
                      label="方案代碼"
                      value={form.planCode}
                      onChange={(v) => setF('planCode', v)}
                      onOpen={() => { setShowPlanPopup(true); setPlanKeyword(''); }}
                      onClear={() => setForm(prev => ({ ...prev, planCode: '', planName: '' }))}
                    />
                    {/* 方案名稱：依方案代碼自動帶出，唯讀 */}
                    <div className="col-span-2">
                      <CwInput label="方案名稱" value={form.planName} disabled readOnly />
                    </div>
                  </div>
                </div>
              )}

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

      {/* ═══════════════════════════════════════════════════════
          產品搜尋 Popup
      ════════════════════════════════════════════════════════ */}
      {showProductPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1400] flex items-center justify-center" onClick={() => { setShowProductPopup(false); setProductKeyword(''); }}>
          <div ref={productPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[560px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>選擇產品</h3>
              <button onClick={() => { setShowProductPopup(false); setProductKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c]"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋料號或名稱" value={productKeyword} onChange={(e) => setProductKeyword(e.target.value)} autoFocus
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">料號</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">產品名稱</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? filteredProducts.map(p => (
                    <tr key={p.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{p.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{p.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectProduct(p.code, p.name)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={3} className="px-[16px] py-[32px] text-center text-[#7c808c]">查無符合資料</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          客戶搜尋 Popup
      ════════════════════════════════════════════════════════ */}
      {showCustomerPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1400] flex items-center justify-center" onClick={() => { setShowCustomerPopup(false); setCustomerKeyword(''); }}>
          <div ref={customerPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[640px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>選擇出貨客戶</h3>
              <button onClick={() => { setShowCustomerPopup(false); setCustomerKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c]"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋客編或名稱" value={customerKeyword} onChange={(e) => setCustomerKeyword(e.target.value)} autoFocus
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">客編</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">名稱</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">地址</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? filteredCustomers.map(c => (
                    <tr key={c.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{c.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{c.name}</td>
                      <td className="px-[16px] py-[12px] text-[#7c808c] truncate max-w-[180px]" title={c.address}>{c.address}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectCustomer(c.code, c.name, c.address)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="px-[16px] py-[32px] text-center text-[#7c808c]">查無符合資料</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          出貨方式搜尋 Popup
      ════════════════════════════════════════════════════════ */}
      {showShippingPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1400] flex items-center justify-center" onClick={() => { setShowShippingPopup(false); setShippingKeyword(''); }}>
          <div ref={shippingPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[420px] max-h-[480px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>選擇出貨方式</h3>
              <button onClick={() => { setShowShippingPopup(false); setShippingKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c]"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋代碼或名稱" value={shippingKeyword} onChange={(e) => setShippingKeyword(e.target.value)} autoFocus
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">代碼</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">名稱</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipping.length > 0 ? filteredShipping.map(s => (
                    <tr key={s.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{s.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{s.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectShipping(s.code, s.name)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={3} className="px-[16px] py-[32px] text-center text-[#7c808c]">查無符合資料</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          方案搜尋 Popup
      ════════════════════════════════════════════════════════ */}
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
