import { useState, useRef, useEffect } from "react";
import { RotateCcw, ChevronDown, ChevronRight, ChevronUp, Search, X } from "lucide-react";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwPagination } from "./CwPagination";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { StatusTag } from "./StatusTag";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { CwTab, CwTabItem } from "./CwTab";
import { PMOrderDetail } from "./PMOrderDetail";
import { CwDatePicker } from "./CwDatePicker";
import { CwCheckbox } from "./CwCheckbox";
import { ExactSearchInput } from "./ExactSearchInput";

// 訂單資料型別定義
interface OrderData {
  id: number;
  sourceSystem: string;
  orderNumber: string;
  orderDate: string;
  sourceProduct: string;
  orderAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
}

// ERP 訂單資料型別定義
interface ERPOrderData {
  id: number;
  companyCode: string;
  orderNumber: string;
  orderDate: string;
  productCode: string;
  productName: string;
  startDate: string;
  endDate: string;
  quantity: number;
  customerNumber: string;
  customerName: string;
  shippingAddress: string;
}

// 促銷方案資料型別
interface PromotionCodeData {
  id: number;
  code: string;
  name: string;
  discount: string;
  startDate: string;
  endDate: string;
  description: string;
}

// 促銷方案虛擬資料（20筆）
const mockPromotionCodes: PromotionCodeData[] = [
  { id: 1, code: 'PROMO2025', name: '天下雜誌年訂優惠', discount: '10%', startDate: '2025-01-01', endDate: '2025-12-31', description: '年訂優惠方案' },
  { id: 2, code: 'SPRING2025', name: '春季特惠專案', discount: '15%', startDate: '2025-03-01', endDate: '2025-05-31', description: '春季限定優惠' },
  { id: 3, code: 'SUMMER2025', name: '夏季暢讀方案', discount: '12%', startDate: '2025-06-01', endDate: '2025-08-31', description: '夏季閱讀優惠' },
  { id: 4, code: 'AUTUMN2025', name: '秋季知識饗宴', discount: '18%', startDate: '2025-09-01', endDate: '2025-11-30', description: '秋季特別優惠' },
  { id: 5, code: 'WINTER2025', name: '冬季溫暖角落', discount: '20%', startDate: '2025-12-01', endDate: '2025-12-31', description: '冬季最高折扣' },
  { id: 6, code: 'ANNUAL10', name: '年度大促銷 10% 優惠', discount: '10%', startDate: '2025-01-15', endDate: '2025-12-15', description: '全年有效優惠' },
  { id: 7, code: 'BUNDLE50', name: '套購優惠方案', discount: '50%', startDate: '2025-02-01', endDate: '2025-12-31', description: '限定套購組合' },
  { id: 8, code: 'NEWUSER25', name: '新用戶首購優惠', discount: '25%', startDate: '2025-01-01', endDate: '2025-12-31', description: '提供新用戶特別折扣' },
  { id: 9, code: 'VIP15', name: 'VIP 會員專享', discount: '15%', startDate: '2025-01-01', endDate: '2025-12-31', description: 'VIP 會員限定方案' },
  { id: 10, code: 'FLASH20', name: '限時閃購', discount: '20%', startDate: '2025-03-15', endDate: '2025-03-31', description: '限時特價優惠' },
  { id: 11, code: 'REFER10', name: '推薦有獎計畫', discount: '10%', startDate: '2025-01-01', endDate: '2025-12-31', description: '推薦他人購買優惠' },
  { id: 12, code: 'LOYALTY30', name: '忠誠客戶獎勵', discount: '30%', startDate: '2025-04-01', endDate: '2025-06-30', description: '長期客戶感謝回饋' },
  { id: 13, code: 'SEASONAL05', name: '季節轉換折扣', discount: '5%', startDate: '2025-02-15', endDate: '2025-03-30', description: '季節交替優惠' },
  { id: 14, code: 'COMBO35', name: '多本組合購優惠', discount: '35%', startDate: '2025-05-01', endDate: '2025-08-31', description: '購買多冊享受優惠' },
  { id: 15, code: 'UPGRADE22', name: '升級方案折扣', discount: '22%', startDate: '2025-03-01', endDate: '2025-12-31', description: '升級訂閱方案優惠' },
  { id: 16, code: 'EARLYBIRD12', name: '早鳥優惠', discount: '12%', startDate: '2025-01-01', endDate: '2025-02-28', description: '提前購買享優惠' },
  { id: 17, code: 'SOCIAL08', name: '社群分享折扣', discount: '8%', startDate: '2025-01-01', endDate: '2025-12-31', description: '分享文章即享折扣' },
  { id: 18, code: 'BIRTHDAY18', name: '生日月份特惠', discount: '18%', startDate: '2025-01-01', endDate: '2025-12-31', description: '生日月份特別優惠' },
  { id: 19, code: 'CLEARANCE40', name: '庫存清貨', discount: '40%', startDate: '2025-07-15', endDate: '2025-08-15', description: '清倉大特價' },
  { id: 20, code: 'HOLIDAY16', name: '假期購物節', discount: '16%', startDate: '2025-11-01', endDate: '2025-12-25', description: '假期季節限定優惠' },
];

// 模擬客服訂單資料
const mockOrderData: OrderData[] = [
  { id: 1, sourceSystem: '天下雜誌', orderNumber: 'CW2025010001', orderDate: '2025-01-15', sourceProduct: '天下雜誌年訂方案', orderAmount: 2980, paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '已完成' },
  { id: 2, sourceSystem: '親子天下', orderNumber: 'PK2025010023', orderDate: '2025-01-18', sourceProduct: '親子天下半年訂閱', orderAmount: 1490, paymentMethod: 'ATM轉帳', paymentStatus: '待付款', orderStatus: '處理中' },
  { id: 3, sourceSystem: '康健雜誌', orderNumber: 'CH2025010045', orderDate: '2025-01-20', sourceProduct: '康健雜誌季訂方案', orderAmount: 890, paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '已完成' },
];

// 模擬 ERP 訂單資料
const mockERPOrderData: ERPOrderData[] = [
  { id: 1, companyCode: 'CW', orderNumber: '102862680', orderDate: '2025-05-12', productCode: 'GCV00001', productName: '天下雜誌1週', startDate: '2025-05-14', endDate: '2025-07-09', quantity: 1, customerNumber: '1679128', customerName: 'JEFF', shippingAddress: '台北市大同區民權西路 103' },
  { id: 2, companyCode: 'CW', orderNumber: '52070730', orderDate: '2025-06-12', productCode: '', productName: '', startDate: '', endDate: '', quantity: 1, customerNumber: '1679128', customerName: 'JEFF', shippingAddress: '' },
  { id: 3, companyCode: 'CW', orderNumber: '102862724', orderDate: '2025-06-09', productCode: 'KCAA00012', productName: '天下雜誌 (2萬1)', startDate: '', endDate: '', quantity: 1, customerNumber: '1679128', customerName: 'JEFF', shippingAddress: '台北市大同區民權西路 103' },
  { id: 4, companyCode: 'CW', orderNumber: '102862724', orderDate: '2025-06-09', productCode: 'GCV00025', productName: '', startDate: '2026-04-13', endDate: '2027-04-28', quantity: 1, customerNumber: '1679128', customerName: 'JEFF', shippingAddress: '台北市大同區民權西路 103' },
];

const sourceSystemOptions: CwSelectOption[] = [
  { value: 'cw', label: '天下雜誌' },
  { value: 'pk', label: '親子天下' },
  { value: 'ch', label: '康健雜誌' },
];
const statusOptions: CwSelectOption[] = [
  { value: 'processing', label: '處理中' },
  { value: 'completed', label: '已完成' },
];
const midStatusOptions: CwSelectOption[] = [
  { value: 's1', label: '待處理' },
  { value: 's2', label: '已出貨' },
];
const orderTypeOptions: CwSelectOption[] = [
  { value: 't1', label: '一般訂單' },
  { value: 't2', label: '續訂單' },
];
const shippingMethodOptions: CwSelectOption[] = [
  { value: 'm1', label: '常溫郵寄' },
  { value: 'm2', label: '宅配' },
];
const paymentMethodOptions: CwSelectOption[] = [
  { value: 'credit', label: '信用卡' },
  { value: 'atm', label: 'ATM' },
];
const paymentStatusOptions: CwSelectOption[] = [
  { value: 'p1', label: '已付款' },
  { value: 'p2', label: '未付款' },
];
const creatorCompanyOptions: CwSelectOption[] = [
  { value: 'cw', label: '天下事業群' },
];
const creatorOptions: CwSelectOption[] = [
  { value: 'userA', label: '王小明' },
];

export function PMOrderManagement() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchForm, setSearchForm] = useState<Record<string, any>>({
    '訂單編號 起': "", '來源單號 起': "", '流程單號 起': "",
    '出貨客戶編號': "", '出貨客戶姓名': "", '出貨地址': "",
    '出貨收件人電話': "", '產品編號': "", '方案代碼': "",
    '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單編號 迄': "", '來源單號 迄': "", '流程單號 迄': "", '異動單號': "",
    '訂單客戶編號': "", '訂單客戶姓名': "", '付款客戶編號': "",
    '付款客戶姓名': "", '發票客戶編號': "", '發票客戶名稱': "",
    '出貨收件人': "", '統一編號': "", '會員帳號': "", '會員姓名': "",
    '會員Email': "", '會員手機': "", '出貨收件人Email': "",
    '出貨收件人手機': "", '產品名稱': "", '方案名稱': "",
    '行銷追蹤碼': "", '通路代碼': "", '通路名稱': "",
    '具有實體庫代碼': "", '具有實體庫名稱': "", '來源系統': "",
    'OMG 訂單狀態': "", '中台 訂單狀態': "", '出貨備註': "",
    '訂單備註': "", 'OMG 訂單類型': "", '出貨方式': "",
    '暫停處理': false, '是否為急需單': false, '信用卡卡號': "", '發票號碼': "",
    '建單法人': "", '建單人員': "", '付款方式': "", '付款狀態': "",
    '實體商品相關': false, '實體結案單': false, '展示明細': false,
    '展示訂單備註': false, '查無相關數位商品時間': false,
  });
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedOrderType, setSelectedOrderType] = useState<'service' | 'erp'>('service');
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<'service' | 'erp'>('service');
  
  // 促銷方案相關 state
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [promotionPopupKeyword, setPromotionPopupKeyword] = useState('');
  const promotionPopupRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  // 關閉 promotion popup 事件處理
  useEffect(() => {
    if (!showPromotionPopup) return;
    const handler = (e: MouseEvent) => {
      if (promotionPopupRef.current && !promotionPopupRef.current.contains(e.target as Node)) {
        setShowPromotionPopup(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPromotionPopup]);

  // 搜尋促銷方案
  const filteredPromotions = promotionPopupKeyword
    ? mockPromotionCodes.filter(
        (p) =>
          p.code.toLowerCase().includes(promotionPopupKeyword.toLowerCase()) ||
          p.name.toLowerCase().includes(promotionPopupKeyword.toLowerCase())
      )
    : mockPromotionCodes;

  // 選擇促銷方案
  const handleSelectPromotion = (code: string) => {
    handleInputChange('方案代碼', code);
    setShowPromotionPopup(false);
    setPromotionPopupKeyword('');
  };

  const handleClear = () => {
    setSearchForm({
      '訂單編號 起': "", '來源單號 起': "", '流程單號 起': "",
      '出貨客戶編號': "", '出貨客戶姓名': "", '出貨地址': "",
      '出貨收件人電話': "", '產品編號': "", '方案代碼': "",
      '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
      '訂單編號 迄': "", '來源單號 迄': "", '流程單號 迄': "", '異動單號': "",
      '訂單客戶編號': "", '訂單客戶姓名': "", '付款客戶編號': "",
      '付款客戶姓名': "", '發票客戶編號': "", '發票客戶名稱': "",
      '出貨收件人': "", '統一編號': "", '會員帳號': "", '會員姓名': "",
      '會員Email': "", '會員手機': "", '出貨收件人Email': "",
      '出貨收件人手機': "", '產品名稱': "", '方案名稱': "",
      '行銷追蹤碼': "", '通路代碼': "", '通路名稱': "",
      '具有實體庫代碼': "", '具有實體庫名稱': "", '來源系統': "",
      'OMG 訂單狀態': "", '中台 訂單狀態': "", '出貨備註': "",
      '訂單備註': "", 'OMG 訂單類型': "", '出貨方式': "",
      '暫停處理': false, '是否為急需單': false, '信用卡卡號': "", '發票號碼': "",
      '建單法人': "", '建單人員': "", '付款方式': "", '付款狀態': "",
      '實體商品相關': false, '實體結案單': false, '展示明細': false,
      '展示訂單備註': false, '查無相關數位商品時間': false,
    });
    setHasSearched(false);
  };

  const handleSearch = () => {
    setHasSearched(true);
    setCurrentPage(1);
  };

  const handleView = (record: OrderData | ERPOrderData, type: 'service' | 'erp') => {
    setSelectedOrderId(record.id);
    setSelectedOrderType(type);
    setShowDetail(true);
  };

  const getOrderStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case '已完成': return 'success';
      case '處理中': return 'warning';
      case '已取消': return 'error';
      default: return 'default';
    }
  };

  const serviceColumns: CwTableColumn<OrderData>[] = [
    { key: 'id', title: '#', width: '60px', align: 'center' },
    { key: 'sourceSystem', title: '來源系統', width: '120px' },
    { key: 'orderNumber', title: '訂單編號', width: '150px' },
    { key: 'orderDate', title: '訂單日期', width: '120px' },
    { key: 'sourceProduct', title: '來源產品', width: '200px' },
    { key: 'orderAmount', title: '訂單金額', width: '120px', align: 'right', render: (v) => `NT$ ${v.toLocaleString()}` },
    { key: 'paymentMethod', title: '付款方式', width: '120px' },
    { key: 'paymentStatus', title: '付款狀態', width: '100px' },
    { key: 'orderStatus', title: '訂單狀態', width: '100px', render: (v, r) => <StatusTag variant={getOrderStatusVariant(r.orderStatus)}>{r.orderStatus}</StatusTag> },
    { key: 'actions', title: '功能', width: '80px', align: 'center', render: (_, r) => <CwRoundButton icon="view" onClick={() => handleView(r, 'service')} /> },
  ];

  const erpColumns: CwTableColumn<ERPOrderData>[] = [
    { key: 'id', title: '#', width: '60px', align: 'center' },
    { key: 'companyCode', title: '法人', width: '80px' },
    { key: 'orderNumber', title: '訂單號碼', width: '130px' },
    { key: 'orderDate', title: '訂單日期', width: '120px' },
    { key: 'productCode', title: '產品編號', width: '120px' },
    { key: 'productName', title: '產品名稱', width: '180px' },
    { key: 'customerNumber', title: '出貨客戶編號', width: '130px' },
    { key: 'customerName', title: '出貨客戶名稱', width: '120px' },
    { key: 'actions', title: '功能', width: '80px', align: 'center', render: (_, r) => <CwRoundButton icon="view" onClick={() => handleView(r, 'erp')} /> },
  ];

  if (showDetail) {
    return <PMOrderDetail orderId={selectedOrderId || undefined} orderType={selectedOrderType} onClose={() => setShowDetail(false)} />;
  }

  const orderData = hasSearched ? mockOrderData : [];
  const erpOrderData = hasSearched ? mockERPOrderData : [];
  const totalItems = activeTab === 'service' ? orderData.length : erpOrderData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const tabItems: CwTabItem[] = [
    { id: 'service', label: `客服訂單 (${orderData.length})` },
    { id: 'erp', label: `ERP 訂單 (${erpOrderData.length})` },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "訂單管理", href: "/orders" },
    { label: "訂單列表" }
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <CwTitle title="訂單列表" breadcrumbs={breadcrumbs} />

      <div className="bg-white p-[20px] rounded-[8px] shadow-sm border border-[#e5e7eb] space-y-[16px]">
        {/* 預設搜尋條件 */}
        <div className="grid grid-cols-5 gap-[12px] items-end">
          <CwInput label="訂單編號 起" placeholder="文本輸入" value={searchForm['訂單編號 起']} onChange={(e) => handleInputChange('訂單編號 起', e.target.value)} />
          <CwInput label="來源單號 起" placeholder="文本輸入" value={searchForm['來源單號 起']} onChange={(e) => handleInputChange('來源單號 起', e.target.value)} />
          <CwInput label="流程單號 起" placeholder="文本輸入" value={searchForm['流程單號 起']} onChange={(e) => handleInputChange('流程單號 起', e.target.value)} />
          <ExactSearchInput label="出貨客戶編號" placeholder="文本輸入" searchType="customer" value={searchForm['出貨客戶編號']} onChange={(v) => handleInputChange('出貨客戶編號', v)} />
          <ExactSearchInput label="出貨客戶姓名" placeholder="文本輸入" searchType="customer" value={searchForm['出貨客戶姓名']} onChange={(v) => handleInputChange('出貨客戶姓名', v)} />
          <ExactSearchInput label="出貨地址" placeholder="文本輸入" searchType="customer" value={searchForm['出貨地址']} onChange={(v) => handleInputChange('出貨地址', v)} />
          <CwInput label="出貨收件人電話" placeholder="文本輸入" value={searchForm['出貨收件人電話']} onChange={(e) => handleInputChange('出貨收件人電話', e.target.value)} />
          <ExactSearchInput label="產品編號" placeholder="文本輸入" searchType="product" value={searchForm['產品編號']} onChange={(v) => handleInputChange('產品編號', v)} />
          {/* 方案代碼搜尋 */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">方案代碼</label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="輸入促銷方案代碼"
                value={searchForm['方案代碼']}
                onChange={(e) => handleInputChange('方案代碼', e.target.value)}
                className="w-full h-[32px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              />
              <button
                onClick={() => {
                  setShowPromotionPopup(true);
                  setPromotionPopupKeyword('');
                }}
                className="absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] bg-white hover:bg-[#f5f7fa] flex items-center justify-center text-[#01579b] transition-colors"
                title="搜尋促銷方案"
              >
                <Search size={16} />
              </button>
              {searchForm['方案代碼'] && (
                <button
                  onClick={() => handleInputChange('方案代碼', '')}
                  className="absolute right-[36px] w-[24px] h-[24px] text-[#7c808c] hover:text-[#1c1c1c] transition-colors"
                  title="清除"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 進階選項 */}
        {showAdvanced && (
          <div className="pt-[16px] mt-[16px] border-t border-[#e5e7eb] space-y-[16px]">
            <div className="grid grid-cols-5 gap-[12px] items-end">
              <CwDatePicker label="訂單起日" placeholder="日期(含時間選單)" value={searchForm['訂單起日']} onChange={(v) => handleInputChange('訂單起日', v)} />
              <CwDatePicker label="訂單迄日" placeholder="日期(含時間選單)" value={searchForm['訂單迄日']} onChange={(v) => handleInputChange('訂單迄日', v)} />
              <CwInput label="訂單編號 迄" placeholder="文本輸入" value={searchForm['訂單編號 迄']} onChange={(e) => handleInputChange('訂單編號 迄', e.target.value)} />
              <CwInput label="來源單號 迄" placeholder="文本輸入" value={searchForm['來源單號 迄']} onChange={(e) => handleInputChange('來源單號 迄', e.target.value)} />
              <CwInput label="流程單號 迄" placeholder="文本輸入" value={searchForm['流程單號 迄']} onChange={(e) => handleInputChange('流程單號 迄', e.target.value)} />
              <CwInput label="異動單號" placeholder="文本輸入" value={searchForm['異動單號']} onChange={(e) => handleInputChange('異動單號', e.target.value)} />
              <ExactSearchInput label="訂單客戶編號" placeholder="文本輸入" searchType="customer" value={searchForm['訂單客戶編號']} onChange={(v) => handleInputChange('訂單客戶編號', v)} />
              <ExactSearchInput label="訂單客戶姓名" placeholder="文本輸入" searchType="customer" value={searchForm['訂單客戶姓名']} onChange={(v) => handleInputChange('訂單客戶姓名', v)} />
              <ExactSearchInput label="付款客戶編號" placeholder="文本輸入" searchType="customer" value={searchForm['付款客戶編號']} onChange={(v) => handleInputChange('付款客戶編號', v)} />
              <ExactSearchInput label="付款客戶姓名" placeholder="文本輸入" searchType="customer" value={searchForm['付款客戶姓名']} onChange={(v) => handleInputChange('付款客戶姓名', v)} />
              <ExactSearchInput label="發票客戶編號" placeholder="文本輸入" searchType="customer" value={searchForm['發票客戶編號']} onChange={(v) => handleInputChange('發票客戶編號', v)} />
              <ExactSearchInput label="發票客戶名稱" placeholder="文本輸入" searchType="customer" value={searchForm['發票客戶名稱']} onChange={(v) => handleInputChange('發票客戶名稱', v)} />
              <ExactSearchInput label="出貨收件人" placeholder="文本輸入" searchType="customer" value={searchForm['出貨收件人']} onChange={(v) => handleInputChange('出貨收件人', v)} />
              <ExactSearchInput label="統一編號" placeholder="文本輸入" searchType="generic" value={searchForm['統一編號']} onChange={(v) => handleInputChange('統一編號', v)} />
              <CwInput label="會員帳號" placeholder="文本輸入" value={searchForm['會員帳號']} onChange={(e) => handleInputChange('會員帳號', e.target.value)} />
              <CwInput label="會員姓名" placeholder="文本輸入" value={searchForm['會員姓名']} onChange={(e) => handleInputChange('會員姓名', e.target.value)} />
              <CwInput label="會員Email" placeholder="文本輸入" value={searchForm['會員Email']} onChange={(e) => handleInputChange('會員Email', e.target.value)} />
              <CwInput label="會員手機" placeholder="文本輸入" value={searchForm['會員手機']} onChange={(e) => handleInputChange('會員手機', e.target.value)} />
              <CwInput label="出貨收件人Email" placeholder="文本輸入" value={searchForm['出貨收件人Email']} onChange={(e) => handleInputChange('出貨收件人Email', e.target.value)} />
              <CwInput label="出貨收件人手機" placeholder="文本輸入" value={searchForm['出貨收件人手機']} onChange={(e) => handleInputChange('出貨收件人手機', e.target.value)} />
              <ExactSearchInput label="產品名稱" placeholder="文本輸入" searchType="product" value={searchForm['產品名稱']} onChange={(v) => handleInputChange('產品名稱', v)} />
              <ExactSearchInput label="方案名稱" placeholder="文本輸入" searchType="plan" value={searchForm['方案名稱']} onChange={(v) => handleInputChange('方案名稱', v)} />
              <ExactSearchInput label="行銷追蹤碼" placeholder="文本輸入" searchType="generic" value={searchForm['行銷追蹤碼']} onChange={(v) => handleInputChange('行銷追蹤碼', v)} />
              <ExactSearchInput label="通路代碼" placeholder="文本輸入" searchType="channel" value={searchForm['通路代碼']} onChange={(v) => handleInputChange('通路代碼', v)} />
              <ExactSearchInput label="通路名稱" placeholder="文本輸入" searchType="channel" value={searchForm['通路名稱']} onChange={(v) => handleInputChange('通路名稱', v)} />
              <ExactSearchInput label="具有實體庫代碼" placeholder="文本輸入" searchType="generic" value={searchForm['具有實體庫代碼']} onChange={(v) => handleInputChange('具有實體庫代碼', v)} />
              <ExactSearchInput label="具有實體庫名稱" placeholder="文本輸入" searchType="generic" value={searchForm['具有實體庫名稱']} onChange={(v) => handleInputChange('具有實體庫名稱', v)} />
            </div>
            <div className="grid grid-cols-5 gap-[12px] items-end mt-[12px]">
              <CwSelect label="來源系統" placeholder="下拉選單" options={sourceSystemOptions} searchable clearable value={searchForm['來源系統']} onChange={(v) => handleInputChange('來源系統', v)} />
              <CwSelect label="OMG 訂單狀態" placeholder="下拉選單" options={statusOptions} searchable clearable value={searchForm['OMG 訂單狀態']} onChange={(v) => handleInputChange('OMG 訂單狀態', v)} />
              <CwSelect label="中台 訂單狀態" placeholder="下拉選單" options={midStatusOptions} searchable clearable value={searchForm['中台 訂單狀態']} onChange={(v) => handleInputChange('中台 訂單狀態', v)} />
              <CwSelect label="OMG 訂單類型" placeholder="下拉選單" options={orderTypeOptions} searchable clearable value={searchForm['OMG 訂單類型']} onChange={(v) => handleInputChange('OMG 訂單類型', v)} />
              <CwSelect label="出貨方式" placeholder="下拉選單" options={shippingMethodOptions} searchable clearable value={searchForm['出貨方式']} onChange={(v) => handleInputChange('出貨方式', v)} />
              <CwInput label="出貨備註" placeholder="文本輸入" value={searchForm['出貨備註']} onChange={(e) => handleInputChange('出貨備註', e.target.value)} />
              <CwInput label="訂單備註" placeholder="文本輸入" value={searchForm['訂單備註']} onChange={(e) => handleInputChange('訂單備註', e.target.value)} />
              <CwInput label="信用卡卡號" placeholder="文本輸入" value={searchForm['信用卡卡號']} onChange={(e) => handleInputChange('信用卡卡號', e.target.value)} />
              <CwInput label="發票號碼" placeholder="文本輸入" value={searchForm['發票號碼']} onChange={(e) => handleInputChange('發票號碼', e.target.value)} />
              <CwSelect label="建單法人" placeholder="下拉選單" options={creatorCompanyOptions} searchable clearable value={searchForm['建單法人']} onChange={(v) => handleInputChange('建單法人', v)} />
              <CwSelect label="建單人員" placeholder="下拉選單" options={creatorOptions} searchable clearable value={searchForm['建單人員']} onChange={(v) => handleInputChange('建單人員', v)} />
              <CwSelect label="付款方式" placeholder="下拉選單" options={paymentMethodOptions} searchable clearable value={searchForm['付款方式']} onChange={(v) => handleInputChange('付款方式', v)} />
              <CwSelect label="付款狀態" placeholder="下拉選單" options={paymentStatusOptions} searchable clearable value={searchForm['付款狀態']} onChange={(v) => handleInputChange('付款狀態', v)} />
            </div>
            <div className="grid grid-cols-5 gap-[12px] items-center mt-[12px] py-[10px]">
              <CwCheckbox label="暫停處理" checked={searchForm['暫停處理']} onChange={(e) => handleInputChange('暫停處理', e.target.checked)} />
              <CwCheckbox label="是否為急需單" checked={searchForm['是否為急需單']} onChange={(e) => handleInputChange('是否為急需單', e.target.checked)} />
              <CwCheckbox label="實體商品相關" checked={searchForm['實體商品相關']} onChange={(e) => handleInputChange('實體商品相關', e.target.checked)} />
              <CwCheckbox label="實體結案單" checked={searchForm['實體結案單']} onChange={(e) => handleInputChange('實體結案單', e.target.checked)} />
              <CwCheckbox label="展示明細" checked={searchForm['展示明細']} onChange={(e) => handleInputChange('展示明細', e.target.checked)} />
              <CwCheckbox label="展示訂單備註" checked={searchForm['展示訂單備註']} onChange={(e) => handleInputChange('展示訂單備註', e.target.checked)} />
              <CwCheckbox label="查無相關數位商品時間" checked={searchForm['查無相關數位商品時間']} onChange={(e) => handleInputChange('查無相關數位商品時間', e.target.checked)} />
            </div>
          </div>
        )}

        {/* 控制列 */}
        <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-[16px]">
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-[4px] text-[#0078d4] text-[14px] font-[500] hover:opacity-80">
            {showAdvanced ? <><ChevronUp size={16} /> 收合進階選項</> : <><ChevronDown size={16} /> 展開進階選項</>}
          </button>
          <div className="flex gap-[10px]">
            <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw size={14} />} onClick={handleClear}>清除</CwButton>
            <CwButton variant="primary" appearance="filled" onClick={handleSearch}>查詢</CwButton>
          </div>
        </div>
      </div>

      {/* 搜尋結果 */}
      {hasSearched && (
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] whitespace-nowrap">簡易搜尋：</label>
            <CwInput placeholder="輸入關鍵字過濾" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} width="300px" />
          </div>
          <CwTab items={tabItems} activeId={activeTab} onChange={(id) => { setActiveTab(id as 'service' | 'erp'); setCurrentPage(1); }} />
          <div className="content-stretch flex flex-col gap-[10px] items-start">
            {activeTab === 'service' ? (
              <CwTable columns={serviceColumns} dataSource={orderData} rowKey="id" emptyText="沒有資料" />
            ) : (
              <CwTable columns={erpColumns} dataSource={erpOrderData} rowKey="id" emptyText="沒有資料" />
            )}
            {totalItems > 0 && <CwPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} pageSizeOptions={[10, 20, 50]} />}
          </div>
        </div>
      )}

      {/* 促銷方案搜尋 Popup */}
      {showPromotionPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => setShowPromotionPopup(false)}>
          <div
            ref={promotionPopupRef}
            className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[600px] max-h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇促銷方案</h3>
              <button
                onClick={() => setShowPromotionPopup(false)}
                className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 搜尋 Input */}
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input
                type="text"
                placeholder="搜尋促銷方案代碼或名稱"
                value={promotionPopupKeyword}
                onChange={(e) => setPromotionPopupKeyword(e.target.value)}
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              />
            </div>

            {/* 表格區域 */}
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
                  {filteredPromotions.length > 0 ? (
                    filteredPromotions.map((promo) => (
                      <tr key={promo.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                        <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{promo.code}</td>
                        <td className="px-[16px] py-[12px] text-[#1c1c1c]">{promo.name}</td>
                        <td className="px-[16px] py-[12px] text-center text-[#0078d4]">{promo.discount}</td>
                        <td className="px-[16px] py-[12px] text-center text-[#7c808c]">
                          {promo.startDate} ~ {promo.endDate}
                        </td>
                        <td className="px-[16px] py-[12px] text-center">
                          <button
                            onClick={() => handleSelectPromotion(promo.code)}
                            className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#1e3a8a] transition-colors"
                          >
                            選擇
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-[16px] py-[32px] text-center text-[#7c808c]">
                        查無符合的促銷方案
                      </td>
                    </tr>
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

PMOrderManagement.displayName = 'PMOrderManagement';
