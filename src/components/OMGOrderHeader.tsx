import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { ChevronDown, ChevronRight, Info, Search, X } from "lucide-react";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwDatePicker } from "./CwDatePicker";
import { CwTooltip } from "./CwTooltip";

// ── Mock 資料 ───────────────────────────────────────────────

const mockCustomers = [
  { id: 1, code: 'C001234', name: '王小明', phone: '02-25074855', address: '台北市中山區中山北路二段7號' },
  { id: 2, code: 'C002345', name: '李大華', phone: '02-29538888', address: '新北市板橋區文化路一段188號' },
  { id: 3, code: 'C003456', name: '陳美玲', phone: '04-22580777', address: '台中市西屯區台灣大道三段99號' },
  { id: 4, code: 'C004567', name: '張志遠', phone: '07-33335555', address: '高雄市前鎮區中山三路6號' },
  { id: 5, code: 'C005678', name: '林淑芬', phone: '06-23456789', address: '台南市東區裕農路198號' },
  { id: 6, code: '1679128', name: 'JEFF',   phone: '0912-345-678', address: '台北市大同區民權西路103號' },
  { id: 7, code: 'C007890', name: '洪建志', phone: '08-33335566', address: '屏東市民生路55號' },
];

const mockShippingMethods = [
  { id: 1, code: '1001', name: '郵寄一般' },
  { id: 2, code: '1002', name: '郵寄限時' },
  { id: 3, code: '1005', name: '郵寄-一般航空' },
  { id: 4, code: '1006', name: '郵寄-掛號水陸' },
  { id: 5, code: '1007', name: '郵寄-掛號航空' },
  { id: 6, code: '1008', name: '郵寄-限時掛號' },
  { id: 7, code: '1009', name: '郵寄-指定宅配' },
  { id: 8, code: '2001', name: '宅配' },
];

const mockPlans = [
  { id: 1, code: 'PROMO2025',  name: '天下雜誌年訂優惠',   discount: '10%', startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 2, code: 'SPRING2025', name: '春季特惠專案',        discount: '15%', startDate: '2025-03-01', endDate: '2025-05-31' },
  { id: 3, code: 'SUMMER2025', name: '夏季暢讀方案',        discount: '12%', startDate: '2025-06-01', endDate: '2025-08-31' },
  { id: 4, code: 'VIP15',      name: 'VIP 會員專享',        discount: '15%', startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 5, code: 'NEWUSER25',  name: '新用戶首購優惠',      discount: '25%', startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 6, code: 'BUNDLE50',   name: '套購優惠方案',        discount: '50%', startDate: '2025-02-01', endDate: '2025-12-31' },
  { id: 7, code: 'GCV-W',      name: '天下雜誌週訂方案',    discount: '0%',  startDate: '2025-01-01', endDate: '2025-12-31' },
  { id: 8, code: 'GCV-Y',      name: '天下雜誌年訂方案',    discount: '0%',  startDate: '2025-01-01', endDate: '2025-12-31' },
];

// ── OMG 訂單表頭資料型別 ─────────────────────────────────────

export interface OMGOrderHeaderData {
  // 基本訂單資訊
  sourceSystem: string;
  customerGiveDate: string;
  orderNumber: string;
  memberAccount: string;
  cancelOrderNumber: string;
  processNumber: string;
  sourceNumber: string;
  directIndirectCollect: string;
  agreeMarketing: string;
  agreeMarketingDate: string;
  orderDate: string;
  omgOrderType: string;
  planCode: string;
  channelCode: string;
  trackingCode: string;
  salesperson: string;

  // 出貨資訊
  shipCustomerCode: string;
  shipCustomerName: string;
  shipRecipient: string;
  shipAddress: string;
  postage: string;
  shipMethod: string;
  specialPackageInstruction: string;
  deliveryNote: string;
  convenienceStore: string;

  // 發票資訊
  invoiceCustomerCode: string;
  invoiceCustomerName: string;
  invoiceRecipient: string;
  invoiceAddress: string;
  invoiceIssueMethod: string;
  invoiceIssueDescription: string;
  invoiceTitle: string;
  taxIdNumber: string;
  invoiceNotifyEmail: string;
  invoiceDonation: string;
  carrierType: string;
  carrierCode: string;
  invoiceDate: string;

  // 付款資訊
  paymentCustomerCode: string;
  paymentCustomerName: string;
  paymentAddress: string;
  orderCustomerCode: string;
  orderCustomerName: string;
  creditCardLast4: string;
  paymentMethod: string;
  remittanceNumber: string;
  remittanceDate: string;
  creditCardType: string;
  creditCardNumber: string;
  creditCardExpiry: string;
  cardBackCode: string;
  creditCardHolder: string;
  creditCardAuthCode: string;
  authReplyCode: string;
  creditCardPaymentBank: string;
  advancePaymentNumber: string;
  orderAmount: string;
  paymentCondition: string;
  advancePaymentBalance: string;
  writeOffRecord: string;

  // 其他訂單資訊
  recommendCustomerCode: string;
  recommendCustomerName: string;
  freeReading: string;
  freeReadingReason: string;
  freeReadingDepartment: string;
  tagNote: string;
  pauseProcessing: string;
  pauseReason: string;
  approvalDate: string;
  omgOrderStatus: string;
  omgOrderNote: string;
  legalEntity: string;
  virtualContactPhone: string;
}

// ── 模擬資料（view 模式展示用）────────────────────────────────

const mockOMGOrderHeader: OMGOrderHeaderData = {
  sourceSystem: '',
  customerGiveDate: '',
  orderNumber: '102862818',
  memberAccount: '',
  cancelOrderNumber: '',
  processNumber: '',
  sourceNumber: '',
  directIndirectCollect: '1',
  agreeMarketing: '1',
  agreeMarketingDate: '',
  orderDate: '',
  omgOrderType: '',
  planCode: '',
  channelCode: '',
  trackingCode: '',
  salesperson: '',
  shipCustomerCode: '1679128',
  shipCustomerName: 'JEFF',
  shipRecipient: '',
  shipAddress: '台北市中山區網路轉單，i',
  postage: '0',
  shipMethod: '1001',
  specialPackageInstruction: '',
  deliveryNote: 'N',
  convenienceStore: '',
  invoiceCustomerCode: '1679128',
  invoiceCustomerName: 'JEFF',
  invoiceRecipient: '',
  invoiceAddress: '台北市中山區網路轉單，i',
  invoiceIssueMethod: '6',
  invoiceIssueDescription: '',
  invoiceTitle: 'JEFF',
  taxIdNumber: '',
  invoiceNotifyEmail: 'polk200276+3@gmail.com',
  invoiceDonation: '',
  carrierType: '會員載具',
  carrierCode: '1679128',
  invoiceDate: '',
  paymentCustomerCode: '1679128',
  paymentCustomerName: 'JEFF',
  paymentAddress: '台北市中山區網路轉單，POLK2...',
  orderCustomerCode: '1679128',
  orderCustomerName: 'JEFF',
  creditCardLast4: '',
  paymentMethod: 'E',
  remittanceNumber: '',
  remittanceDate: '',
  creditCardType: '',
  creditCardNumber: '',
  creditCardExpiry: '',
  cardBackCode: '',
  creditCardHolder: '',
  creditCardAuthCode: '',
  authReplyCode: '',
  creditCardPaymentBank: '',
  advancePaymentNumber: '102862818',
  orderAmount: '0',
  paymentCondition: '',
  advancePaymentBalance: '',
  writeOffRecord: '',
  recommendCustomerCode: '',
  recommendCustomerName: '',
  freeReading: 'N',
  freeReadingReason: '',
  freeReadingDepartment: '',
  tagNote: '',
  pauseProcessing: 'N',
  pauseReason: '',
  approvalDate: '',
  omgOrderStatus: '輸入',
  omgOrderNote: '',
  legalEntity: '',
  virtualContactPhone: '',
};

// 新增訂單的空白初始值
const emptyOrderHeader: OMGOrderHeaderData = {
  sourceSystem: '',
  customerGiveDate: '',
  orderNumber: '',
  memberAccount: '',
  cancelOrderNumber: '',
  processNumber: '',
  sourceNumber: '',
  directIndirectCollect: '',
  agreeMarketing: '',
  agreeMarketingDate: '',
  orderDate: '',
  omgOrderType: '',
  planCode: '',
  channelCode: '',
  trackingCode: '',
  salesperson: '',
  shipCustomerCode: '',
  shipCustomerName: '',
  shipRecipient: '',
  shipAddress: '',
  postage: '',
  shipMethod: '',
  specialPackageInstruction: '',
  deliveryNote: 'N',
  convenienceStore: '',
  invoiceCustomerCode: '',
  invoiceCustomerName: '',
  invoiceRecipient: '',
  invoiceAddress: '',
  invoiceIssueMethod: '',
  invoiceIssueDescription: '',
  invoiceTitle: '',
  taxIdNumber: '',
  invoiceNotifyEmail: '',
  invoiceDonation: '',
  carrierType: '',
  carrierCode: '',
  invoiceDate: '',
  paymentCustomerCode: '',
  paymentCustomerName: '',
  paymentAddress: '',
  orderCustomerCode: '',
  orderCustomerName: '',
  creditCardLast4: '',
  paymentMethod: '',
  remittanceNumber: '',
  remittanceDate: '',
  creditCardType: '',
  creditCardNumber: '',
  creditCardExpiry: '',
  cardBackCode: '',
  creditCardHolder: '',
  creditCardAuthCode: '',
  authReplyCode: '',
  creditCardPaymentBank: '',
  advancePaymentNumber: '',
  orderAmount: '0',
  paymentCondition: '',
  advancePaymentBalance: '',
  writeOffRecord: '',
  recommendCustomerCode: '',
  recommendCustomerName: '',
  freeReading: 'N',
  freeReadingReason: '',
  freeReadingDepartment: '',
  tagNote: '',
  pauseProcessing: 'N',
  pauseReason: '',
  approvalDate: '',
  omgOrderStatus: '輸入',
  omgOrderNote: '',
  legalEntity: '',
  virtualContactPhone: '',
};

// ── PopupSearchInput（與 NewPMOrderManagement 一致的 UI）────────

function PopupSearchInput({
  label, value, onChange, onOpen, onClear, disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onOpen: () => void;
  onClear: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full h-[35px] px-[12px] pr-[64px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif] ${disabled ? 'bg-[#e9ebf2] cursor-not-allowed text-[#7c808c]' : 'bg-white'}`}
          style={{ fontWeight: 350 }}
        />
        {value && !disabled && (
          <button type="button" onClick={onClear} className="absolute right-[36px] w-[24px] h-[24px] flex items-center justify-center text-[#7c808c] hover:text-[#1c1c1c] transition-colors">
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          onClick={onOpen}
          disabled={disabled}
          className={`absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] flex items-center justify-center transition-colors ${disabled ? 'bg-[#e9ebf2] text-[#c4c9d3] cursor-not-allowed' : 'bg-white hover:bg-[#f5f7fa] text-[#01579b]'}`}
        >
          <Search size={14} />
        </button>
      </div>
    </div>
  );
}

// ── 摺疊面板設定 ────────────────────────────────────────────

type SectionKey = 'basic' | 'shipping' | 'invoice' | 'payment' | 'other';

const sections: { key: SectionKey; title: string }[] = [
  { key: 'basic',    title: '基本訂單資訊' },
  { key: 'shipping', title: '出貨資訊' },
  { key: 'invoice',  title: '發票資訊' },
  { key: 'payment',  title: '付款資訊' },
  { key: 'other',    title: '其他訂單資訊' },
];

// ── 客戶 Popup target 型別 ──────────────────────────────────

type CustomerPopupTarget = {
  codeKey: keyof OMGOrderHeaderData;
  nameKey: keyof OMGOrderHeaderData;
  title: string;
} | null;

// ── OMGOrderHeader 元件 ─────────────────────────────────────

export type OMGOrderHeaderRef = { validate: () => boolean };

export const OMGOrderHeader = forwardRef<OMGOrderHeaderRef, {
  defaultExpandAll?: boolean;
  mode?: 'view' | 'create' | 'edit';
}>(function OMGOrderHeader({
  defaultExpandAll = false,
  mode = 'view',
}, ref) {
  const editable = mode === 'create' || mode === 'edit';

  // ── 展開/收合 state ──
  const [expandedSections, setExpandedSections] = useState<SectionKey[]>(
    defaultExpandAll ? sections.map((s) => s.key) : ['basic']
  );

  // ── 表單 state（create 模式用空白值，view 模式用 mock 資料）──
  const [form, setForm] = useState<OMGOrderHeaderData>(
    mode === 'create' ? emptyOrderHeader : mockOMGOrderHeader
  );

  // ── 驗證 errors state ──
  const [errors, setErrors] = useState<Partial<Record<keyof OMGOrderHeaderData, string>>>({});

  const setField = (key: keyof OMGOrderHeaderData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  // ── 客戶 Popup state ──
  const [activeCustomerPopup, setActiveCustomerPopup] = useState<CustomerPopupTarget>(null);
  const [customerKeyword, setCustomerKeyword] = useState('');
  const customerPopupRef = useRef<HTMLDivElement>(null);

  // ── 出貨方式 Popup state ──
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [shippingKeyword, setShippingKeyword] = useState('');
  const shippingPopupRef = useRef<HTMLDivElement>(null);

  // ── 方案 Popup state ──
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [planKeyword, setPlanKeyword] = useState('');
  const planPopupRef = useRef<HTMLDivElement>(null);

  // ── 點擊外部關閉 popup ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (activeCustomerPopup && customerPopupRef.current && !customerPopupRef.current.contains(e.target as Node)) {
        setActiveCustomerPopup(null); setCustomerKeyword('');
      }
      if (showShippingPopup && shippingPopupRef.current && !shippingPopupRef.current.contains(e.target as Node)) {
        setShowShippingPopup(false); setShippingKeyword('');
      }
      if (showPlanPopup && planPopupRef.current && !planPopupRef.current.contains(e.target as Node)) {
        setShowPlanPopup(false); setPlanKeyword('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activeCustomerPopup, showShippingPopup, showPlanPopup]);

  // ── 過濾清單 ──
  const filteredCustomers = customerKeyword
    ? mockCustomers.filter(
        (c) =>
          c.code.toLowerCase().includes(customerKeyword.toLowerCase()) ||
          c.name.toLowerCase().includes(customerKeyword.toLowerCase())
      )
    : mockCustomers;

  const filteredShipping = shippingKeyword
    ? mockShippingMethods.filter(
        (s) =>
          s.code.includes(shippingKeyword) ||
          s.name.toLowerCase().includes(shippingKeyword.toLowerCase())
      )
    : mockShippingMethods;

  const filteredPlans = planKeyword
    ? mockPlans.filter(
        (p) =>
          p.code.toLowerCase().includes(planKeyword.toLowerCase()) ||
          p.name.toLowerCase().includes(planKeyword.toLowerCase())
      )
    : mockPlans;

  // ── 選擇處理 ──
  const handleSelectCustomer = (code: string, name: string) => {
    if (!activeCustomerPopup) return;
    setField(activeCustomerPopup.codeKey, code);
    setField(activeCustomerPopup.nameKey, name);
    setActiveCustomerPopup(null);
    setCustomerKeyword('');
  };

  const handleSelectShipping = (code: string, name: string) => {
    setField('shipMethod', `${code}-${name}`);
    setShowShippingPopup(false);
    setShippingKeyword('');
  };

  const handleSelectPlan = (code: string) => {
    setField('planCode', code);
    setShowPlanPopup(false);
    setPlanKeyword('');
  };

  // ── 開啟 customer popup 的 helper ──
  const openCustomerPopup = (codeKey: keyof OMGOrderHeaderData, nameKey: keyof OMGOrderHeaderData, title: string) => {
    setActiveCustomerPopup({ codeKey, nameKey, title });
    setCustomerKeyword('');
  };

  // ── 折疊控制 ──
  const toggleSection = (key: SectionKey) =>
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const toggleAll = () =>
    setExpandedSections(
      expandedSections.length === sections.length ? [] : sections.map((s) => s.key)
    );

  // ── 條件必填規則 ──
  const isElectronicInvoice = form.invoiceIssueMethod === '6' && !form.taxIdNumber;
  const isRemittance = form.paymentMethod === '2';
  const isCreditCard = form.paymentMethod === '1' || form.paymentMethod === '4';
  const isFreeReading = form.freeReading === 'Y';
  const isPaused = form.pauseProcessing === 'Y';

  // 訂單金額為 0 時自動設贈閱為「是」
  useEffect(() => {
    if (editable && form.orderAmount === '0') {
      setField('freeReading', 'Y');
    }
  }, [form.orderAmount, editable]);

  // ── 驗證 ──
  const ERR = '此欄位為必填';
  useImperativeHandle(ref, () => ({
    validate(): boolean {
      const e: Partial<Record<keyof OMGOrderHeaderData, string>> = {};
      if (!form.sourceSystem) e.sourceSystem = ERR;
      if (!form.directIndirectCollect) e.directIndirectCollect = ERR;
      if (!form.agreeMarketing) e.agreeMarketing = ERR;
      if (!form.orderDate) e.orderDate = ERR;
      if (!form.omgOrderType) e.omgOrderType = ERR;
      if (!form.channelCode) e.channelCode = ERR;
      if (!form.shipCustomerCode) e.shipCustomerCode = ERR;
      if (!form.shipMethod) e.shipMethod = ERR;
      if (!form.invoiceIssueMethod) e.invoiceIssueMethod = ERR;
      if (!form.paymentMethod) e.paymentMethod = ERR;
      if (!form.legalEntity) e.legalEntity = ERR;
      if (isElectronicInvoice) {
        if (!form.carrierType) e.carrierType = ERR;
        if (!form.carrierCode) e.carrierCode = ERR;
      }
      if (isRemittance) {
        if (!form.remittanceNumber) e.remittanceNumber = ERR;
        if (!form.remittanceDate) e.remittanceDate = ERR;
      }
      if (isCreditCard) {
        if (!form.creditCardType) e.creditCardType = ERR;
        if (!form.creditCardNumber) e.creditCardNumber = ERR;
      }
      if (isFreeReading) {
        if (!form.freeReadingReason) e.freeReadingReason = ERR;
        if (!form.freeReadingDepartment) e.freeReadingDepartment = ERR;
      }
      if (isPaused) {
        if (!form.pauseReason) e.pauseReason = ERR;
      }
      setErrors(e);
      if (Object.keys(e).length > 0) {
        setExpandedSections(sections.map((s) => s.key));
      }
      return Object.keys(e).length === 0;
    },
  }));

  // ── 欄位渲染輔助元件（均在 render scope 內，可存取 editable/form）──

  const labelStyle = { fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 350 };
  const RequiredLabel = ({ text }: { text: string }) => (
    <label className="block text-foreground" style={labelStyle}>
      {text}<span style={{ color: '#E53E3E' }}> *</span>
    </label>
  );
  const ErrorText = ({ fKey }: { fKey: keyof OMGOrderHeaderData }) =>
    errors[fKey] ? <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E' }}>{errors[fKey]}</p> : null;

  const ReadField = ({ label, fKey, required }: { label: string; fKey: keyof OMGOrderHeaderData; required?: boolean }) => {
    if (required && editable) {
      return (
        <div className="flex flex-col gap-1">
          <RequiredLabel text={label} />
          <CwInput value={form[fKey] as string} error={errors[fKey]} disabled readOnly />
        </div>
      );
    }
    return <CwInput label={label} value={form[fKey] as string} error={errors[fKey]} disabled readOnly />;
  };

  const TextField = ({ label, fKey, required }: { label: string; fKey: keyof OMGOrderHeaderData; required?: boolean }) => {
    if (required && editable) {
      return (
        <div className="flex flex-col gap-1">
          <RequiredLabel text={label} />
          <CwInput value={form[fKey] as string} error={errors[fKey]} onChange={(e) => setField(fKey, e.target.value)} />
        </div>
      );
    }
    return (
      <CwInput
        label={label}
        value={form[fKey] as string}
        error={errors[fKey]}
        disabled={!editable}
        readOnly={!editable}
        onChange={(e) => setField(fKey, e.target.value)}
      />
    );
  };

  const SelectField = ({
    label, fKey, options, placeholder, required,
  }: {
    label: string;
    fKey: keyof OMGOrderHeaderData;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
  }) => {
    const val = form[fKey] as string;
    if (!editable) {
      const matched = options.find((o) => o.value === val);
      return <CwInput label={label} value={matched?.label ?? val} disabled readOnly />;
    }
    return (
      <div className="flex flex-col gap-1">
        {required ? <RequiredLabel text={label} /> : <label className="block text-foreground" style={labelStyle}>{label}</label>}
        <CwSelect
          value={val}
          options={options}
          placeholder={placeholder ?? '請選擇'}
          error={!!errors[fKey]}
          onChange={(v) => setField(fKey, Array.isArray(v) ? v[0] ?? '' : v)}
        />
        <ErrorText fKey={fKey} />
      </div>
    );
  };

  const DateField = ({ label, fKey, required }: { label: string; fKey: keyof OMGOrderHeaderData; required?: boolean }) => {
    if (!editable) return <CwInput label={label} value={form[fKey] as string} disabled readOnly />;
    return (
      <div className="flex flex-col gap-1">
        {required ? <RequiredLabel text={label} /> : <label className="block text-foreground" style={labelStyle}>{label}</label>}
        <CwDatePicker onChange={(d) => setField(fKey, d ? d.toISOString().slice(0, 10) : '')} />
        <ErrorText fKey={fKey} />
      </div>
    );
  };

  // PopupSearchInput 在 create 模式下作為帶搜尋按鈕的輸入；view 模式退化為唯讀欄位
  const PopupField = ({
    label, fKey, onOpen, required,
  }: {
    label: string;
    fKey: keyof OMGOrderHeaderData;
    onOpen: () => void;
    required?: boolean;
  }) => {
    if (!editable) return <CwInput label={label} value={form[fKey] as string} disabled readOnly />;
    return (
      <div className="flex flex-col gap-1">
        {required ? <RequiredLabel text={label} /> : <label className="block text-foreground" style={labelStyle}>{label}</label>}
        <PopupSearchInput
          label=""
          value={form[fKey] as string}
          onChange={(v) => setField(fKey, v)}
          onOpen={onOpen}
          onClear={() => setField(fKey, '')}
        />
        <ErrorText fKey={fKey} />
      </div>
    );
  };

  // Section 折疊標題列
  const SectionHeader = ({ skey, title }: { skey: SectionKey; title: string }) => (
    <button
      onClick={() => toggleSection(skey)}
      className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
    >
      <div className="flex items-center gap-[12px]">
        {expandedSections.includes(skey) ? (
          <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
        ) : (
          <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
        )}
        <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">{title}</span>
      </div>
    </button>
  );

  // ── Render ──────────────────────────────────────────────

  return (
    <div className="space-y-[16px]">
      {/* 標題列 */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#1c1c1c]" style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '16px', fontWeight: 500 }}>
          訂單表頭
        </h3>
        <button
          onClick={toggleAll}
          className="px-[12px] py-[6px] rounded-[var(--radius)] border border-[#01579b] text-[#01579b] hover:bg-[#e6f7ff] transition-colors font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350]"
        >
          {expandedSections.length === sections.length ? '全部收合' : '全部展開'}
        </button>
      </div>

      <div className="space-y-[12px]">

        {/* ── 1. 基本訂單資訊 ── */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <SectionHeader skey="basic" title="基本訂單資訊" />
          {expandedSections.includes('basic') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <SelectField label="來源系統" fKey="sourceSystem" options={[]} required />
                <DateField label="客戶給單日" fKey="customerGiveDate" />
                <ReadField label="訂單編號" fKey="orderNumber" />
                <ReadField label="會員帳號" fKey="memberAccount" />
                <SelectField label="退訂單單號" fKey="cancelOrderNumber" options={[]} />
                <TextField label="流程單號" fKey="processNumber" />
                <TextField label="來源單號" fKey="sourceNumber" />
                <SelectField
                  label="直/間接蒐集"
                  fKey="directIndirectCollect" required
                  options={[
                    { value: '1', label: '1 直接' },
                    { value: '2', label: '2 間接' },
                  ]}
                />
                <div className="flex flex-col gap-1">
                  <label className="block text-foreground" style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 350 }}>同意行銷<span style={{ color: '#E53E3E' }}> *</span></label>
                  <div className="flex gap-[8px]">
                    <div className="flex-1 min-w-0">
                      {editable ? (
                        <CwSelect
                          value={form.agreeMarketing}
                          options={[
                            { value: '1', label: '1 同意' },
                            { value: '2', label: '2 不同意' },
                            { value: 'A', label: 'A 不確定' },
                          ]}
                          placeholder="請選擇"
                          error={!!errors.agreeMarketing}
                          onChange={(v) => setField('agreeMarketing', Array.isArray(v) ? v[0] ?? '' : v)}
                        />
                      ) : (
                        <CwInput value={(() => { const o = [{ value: '1', label: '1 同意' }, { value: '2', label: '2 不同意' }, { value: 'A', label: 'A 不確定' }].find(o => o.value === form.agreeMarketing); return o?.label ?? form.agreeMarketing; })()} disabled readOnly />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {editable ? (
                        <CwDatePicker
                          disabled={form.agreeMarketing !== '1'}
                          onChange={(d) => setField('agreeMarketingDate', d ? d.toISOString().slice(0, 10) : '')}
                        />
                      ) : (
                        <CwInput value={form.agreeMarketingDate || '—'} disabled readOnly />
                      )}
                    </div>
                  </div>
                  {errors.agreeMarketing && <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E' }}>{errors.agreeMarketing}</p>}
                </div>
                <DateField label="訂單日期" fKey="orderDate" required />
                <TextField label="OMG 訂單類型" fKey="omgOrderType" required />
                {/* 方案代碼：Popup 搜尋 */}
                <PopupField
                  label="方案代碼"
                  fKey="planCode"
                  onOpen={() => { setShowPlanPopup(true); setPlanKeyword(''); }}
                />
                <SelectField label="通路代碼" fKey="channelCode" options={[]} required/>
                <SelectField label="行銷追蹤碼" fKey="trackingCode" options={[]} />
                <SelectField label="業務員名" fKey="salesperson" options={[]} />
              </div>
            </div>
          )}
        </div>

        {/* ── 2. 出貨資訊 ── */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <SectionHeader skey="shipping" title="出貨資訊" />
          {expandedSections.includes('shipping') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                {/* 出貨客戶編號 + 名稱：共用客戶 Popup */}
                <PopupField
                  label="出貨客戶編號"
                  fKey="shipCustomerCode"
                  onOpen={() => openCustomerPopup('shipCustomerCode', 'shipCustomerName', '出貨客戶')} required
                />
                <PopupField
                  label="出貨客戶名稱"
                  fKey="shipCustomerName"
                  onOpen={() => openCustomerPopup('shipCustomerCode', 'shipCustomerName', '出貨客戶')}
                />
                {/* 出貨收件人：也使用客戶 Popup，只填入名稱 */}
                <PopupField
                  label="出貨收件人"
                  fKey="shipRecipient"
                  onOpen={() => openCustomerPopup('shipRecipient', 'shipRecipient', '出貨收件人')}
                />
                <div className="col-span-2">
                  <TextField label="出貨地址" fKey="shipAddress" />
                </div>
                <TextField label="運費" fKey="postage" />
                {/* 出貨方式：Popup 搜尋 */}
                <PopupField
                  label="出貨方式"
                  fKey="shipMethod"
                  onOpen={() => { setShowShippingPopup(true); setShippingKeyword(''); }} required
                />
                <TextField label="特殊包裝指示" fKey="specialPackageInstruction" />
                <SelectField
                  label="出催款單"
                  fKey="deliveryNote"
                  options={[
                    { value: 'N', label: '否' },
                    { value: 'Y', label: '是' },
                  ]}
                />
                <TextField label="超商店鋪" fKey="convenienceStore" />
              </div>
            </div>
          )}
        </div>

        {/* ── 3. 發票資訊 ── */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <SectionHeader skey="invoice" title="發票資訊" />
          {expandedSections.includes('invoice') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <PopupField
                  label="發票客戶編號"
                  fKey="invoiceCustomerCode"
                  onOpen={() => openCustomerPopup('invoiceCustomerCode', 'invoiceCustomerName', '發票客戶')}
                />
                <PopupField
                  label="發票客戶名稱"
                  fKey="invoiceCustomerName"
                  onOpen={() => openCustomerPopup('invoiceCustomerCode', 'invoiceCustomerName', '發票客戶')}
                />
                <TextField label="發票收件人" fKey="invoiceRecipient" />
                <div className="col-span-2">
                  <TextField label="發票地址" fKey="invoiceAddress" />
                </div>
                <SelectField
                  label="發票開立方式"
                  fKey="invoiceIssueMethod" required
                  options={[
                    { value: 'N', label: 'N：一般開立' },
                    { value: '0', label: '0：不產生' },
                    { value: '3', label: '3：隨貨產生' },
                    { value: '4', label: '4：月結淨額' },
                    { value: '5', label: '5：月結全額' },
                    { value: '6', label: '6：電子發票' },
                  ]}
                />
                <TextField label="發票開立說明" fKey="invoiceIssueDescription" />
                <TextField label="發票抬頭" fKey="invoiceTitle" />
                <TextField label="統一編號" fKey="taxIdNumber" />
                <TextField label="發票通知 Email" fKey="invoiceNotifyEmail" />
                <SelectField label="發票捐贈碼" fKey="invoiceDonation" options={[]} />
                {/* 載具類型：create 模式加 tooltip；view 模式純文字 */}
                {editable ? (
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 400 }}>載具類型{isElectronicInvoice && <span style={{ color: '#E53E3E' }}> *</span>}</span>
                      <CwTooltip content="統編有值無法選取載具類型">
                        <Info className="w-[14px] h-[14px] text-[#01579b] cursor-help shrink-0" />
                      </CwTooltip>
                    </div>
                    <CwSelect
                      value={form.carrierType}
                      options={[
                        { value: '會員載具', label: '會員載具' },
                        { value: '手機條碼', label: '手機條碼' },
                        { value: '自然人憑證', label: '自然人憑證' },
                      ]}
                      disabled={!!form.taxIdNumber}
                      error={!!errors.carrierType}
                      onChange={(v) => setField('carrierType', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                    {errors.carrierType && <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E' }}>{errors.carrierType}</p>}
                  </div>
                ) : (
                  <CwInput label="載具類型" value={form.carrierType} disabled readOnly />
                )}
                <TextField label="發票載具碼" fKey="carrierCode" required={isElectronicInvoice} />
                <DateField label="發票日期" fKey="invoiceDate" />
              </div>
            </div>
          )}
        </div>

        {/* ── 4. 付款資訊 ── */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <SectionHeader skey="payment" title="付款資訊" />
          {expandedSections.includes('payment') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <PopupField
                  label="付款客戶編號"
                  fKey="paymentCustomerCode"
                  onOpen={() => openCustomerPopup('paymentCustomerCode', 'paymentCustomerName', '付款客戶')}
                />
                <PopupField
                  label="付款客戶名稱"
                  fKey="paymentCustomerName"
                  onOpen={() => openCustomerPopup('paymentCustomerCode', 'paymentCustomerName', '付款客戶')}
                />
                <div className="col-span-2">
                  <TextField label="付款寄送地址" fKey="paymentAddress" />
                </div>
                <PopupField
                  label="訂單客戶編號"
                  fKey="orderCustomerCode"
                  onOpen={() => openCustomerPopup('orderCustomerCode', 'orderCustomerName', '訂單客戶')}
                />
                <PopupField
                  label="訂單客戶名稱"
                  fKey="orderCustomerName"
                  onOpen={() => openCustomerPopup('orderCustomerCode', 'orderCustomerName', '訂單客戶')}
                />
                <ReadField label="信用卡號後 4 碼" fKey="creditCardLast4" />
                <SelectField
                  label="付款方式"
                  fKey="paymentMethod"
                  required
                  options={[
                    { value: '5', label: '5：ATM' },
                    { value: '3', label: '3：應收票據' },
                    { value: '1', label: '1：信用卡' },
                    { value: '4', label: '4：信用卡-網路' },
                    { value: '2', label: '2：劃撥' },
                    { value: '7', label: '7：互轉' },
                    { value: '6', label: '6：贈閱' },
                    { value: '8', label: '8：消費券' },
                    { value: '9', label: '9：LINEPAY' },
                    { value: 'E', label: 'E：綠界' },
                  ]}
                />
                <TextField label="劃撥單號" fKey="remittanceNumber" required={isRemittance} />
                <DateField label="劃撥日期" fKey="remittanceDate" required={isRemittance} />
                <SelectField label="信用卡類型" fKey="creditCardType" options={[]} required={isCreditCard} />
                <TextField label="信用卡卡號" fKey="creditCardNumber" required={isCreditCard} />
                <DateField label="信用卡有效期" fKey="creditCardExpiry" />
                <ReadField label="卡背面 3 碼" fKey="cardBackCode" />
                <TextField label="信用卡持有者" fKey="creditCardHolder" />
                <TextField label="信用卡授權碼" fKey="creditCardAuthCode" />
                <TextField label="授權回覆碼" fKey="authReplyCode" />
                <ReadField label="信用卡請款銀行" fKey="creditCardPaymentBank" />
                <TextField label="預收款單號" fKey="advancePaymentNumber" />
                <ReadField label="訂單金額" fKey="orderAmount" />
                <SelectField
                  label="付款條件"
                  fKey="paymentCondition"
                  options={[
                    { value: '即期付款', label: '即期付款' },
                    { value: '月結30天', label: '月結30天' },
                    { value: '月結60天', label: '月結60天' },
                  ]}
                />
                <ReadField label="預收款餘額" fKey="advancePaymentBalance" />
                <div className="col-span-2">
                  <TextField label="沖銷紀錄" fKey="writeOffRecord" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 5. 其他訂單資訊 ── */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <SectionHeader skey="other" title="其他訂單資訊" />
          {expandedSections.includes('other') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <PopupField
                  label="推薦客戶編號"
                  fKey="recommendCustomerCode"
                  onOpen={() => openCustomerPopup('recommendCustomerCode', 'recommendCustomerName', '推薦客戶')}
                />
                <PopupField
                  label="推薦客戶名稱"
                  fKey="recommendCustomerName"
                  onOpen={() => openCustomerPopup('recommendCustomerCode', 'recommendCustomerName', '推薦客戶')}
                />
                <SelectField
                  label="贈閱"
                  fKey="freeReading"
                  options={[
                    { value: 'N', label: '否' },
                    { value: 'Y', label: '是' },
                  ]}
                />
                <SelectField label="贈閱原因" fKey="freeReadingReason" options={[]} required={isFreeReading} />
                <SelectField label="贈閱部門" fKey="freeReadingDepartment" options={[]} required={isFreeReading} />
                <TextField label="標籤備註" fKey="tagNote" />
                <SelectField
                  label="暫停處理"
                  fKey="pauseProcessing"
                  options={[
                    { value: 'N', label: '否' },
                    { value: 'Y', label: '是' },
                  ]}
                />
                <SelectField
                  label="暫停原因"
                  fKey="pauseReason"
                  required={isPaused}
                  options={[
                    { value: '代單', label: '代單' },
                    { value: '代確認訂單資料', label: '代確認訂單資料' },
                  ]}
                />
                <ReadField label="核單日期" fKey="approvalDate" />
                <ReadField label="OMG 訂單狀態" fKey="omgOrderStatus" />
                <TextField label="OMG 訂單備註" fKey="omgOrderNote" />
                <ReadField label="法人" fKey="legalEntity" required/>
                <ReadField label="虛擬聯絡電話" fKey="virtualContactPhone" />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── 客戶搜尋 Popup ── */}
      {activeCustomerPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setActiveCustomerPopup(null); setCustomerKeyword(''); }}>
          <div ref={customerPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[700px] max-h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇{activeCustomerPopup.title}</h3>
              <button onClick={() => { setActiveCustomerPopup(null); setCustomerKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋客編或名稱" value={customerKeyword} onChange={(e) => setCustomerKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">客編代碼</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">客戶名稱</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">電話</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">地址</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? filteredCustomers.map((c) => (
                    <tr key={c.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{c.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{c.name}</td>
                      <td className="px-[16px] py-[12px] text-[#7c808c]">{c.phone}</td>
                      <td className="px-[16px] py-[12px] text-[#7c808c] truncate max-w-[180px]" title={c.address}>{c.address}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectCustomer(c.code, c.name)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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

      {/* ── 出貨方式搜尋 Popup ── */}
      {showShippingPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowShippingPopup(false); setShippingKeyword(''); }}>
          <div ref={shippingPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇出貨方式</h3>
              <button onClick={() => { setShowShippingPopup(false); setShippingKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋代碼或名稱" value={shippingKeyword} onChange={(e) => setShippingKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredShipping.length > 0 ? filteredShipping.map((s) => (
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

      {/* ── 方案搜尋 Popup ── */}
      {showPlanPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowPlanPopup(false); setPlanKeyword(''); }}>
          <div ref={planPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[640px] max-h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇方案</h3>
              <button onClick={() => { setShowPlanPopup(false); setPlanKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋方案代碼或名稱" value={planKeyword} onChange={(e) => setPlanKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredPlans.length > 0 ? filteredPlans.map((p) => (
                    <tr key={p.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{p.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{p.name}</td>
                      <td className="px-[16px] py-[12px] text-center text-[#0078d4]">{p.discount}</td>
                      <td className="px-[16px] py-[12px] text-center text-[#7c808c]">{p.startDate} ~ {p.endDate}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectPlan(p.code)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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
});
