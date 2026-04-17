import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { CwDrawer } from "./CwDrawer";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwTable, CwTableColumn } from "./CwTable";

// ERP 訂單品項資料型別
export interface ERPOrderItemData {
  id: number;
  orderStatus: string;
  note: string;
  virtualPhone: string;
  mobile: string;
  productCode: string;
  productName: string;
  startPeriod: string;
  startDate: string;
  endPeriod: string;
  endDate: string;
  quantity: number;
  unitPrice: number;
  discount: string;
  sellPrice: number;
  actualAmount: number;
  transactionType: string;
  taxType: string;
  requireDate: string;
  agreeMarketing: string;
  shipCustomerCode: string;
  shipCustomerName: string;
  shipAddress: string;
  shipRecipient: string;
  shipMethod: string;
  grade: string;
  discountMark: string;
  reserver: string;
  shipWarehouse: string;
  bookshelfLocation: string; // 書展儲位（有值 = 已出貨）
  autoRenew: string;
  licenseStartDate: string;
  licenseEndDate: string;
  email: string;
  promotionCode: string;
  planDescription: string;
}



// 判斷是否為已出貨資料
const isShipped = (item: ERPOrderItemData) => item.bookshelfLocation !== '';

// 模擬 ERP 訂單品項資料
const mockERPOrderItems: ERPOrderItemData[] = [
  {
    id: 1,
    orderStatus: '輸入',
    note: '客戶要求提前寄送',
    virtualPhone: '0912-345-678',
    mobile: '0912-345-678',
    productCode: 'GCV00001',
    productName: '天下雜誌 1 年期（26 期）',
    startPeriod: '782',
    startDate: '2025-05-14',
    endPeriod: '807',
    endDate: '2026-05-13',
    quantity: 1,
    unitPrice: 2380,
    discount: '10%',
    sellPrice: 2142,
    actualAmount: 2142,
    transactionType: '訂閱',
    taxType: '內含稅',
    requireDate: '2025-05-20',
    agreeMarketing: '是',
    shipCustomerCode: '1679128',
    shipCustomerName: 'JEFF',
    shipAddress: '台北市大同區民權西路 103 號',
    shipRecipient: 'JEFF',
    shipMethod: '1001 郵寄一般',
    grade: 'A',
    discountMark: 'Y',
    reserver: '王小明',
    shipWarehouse: '台北倉',
    bookshelfLocation: '',
    autoRenew: '是',
    licenseStartDate: '2025-05-14',
    licenseEndDate: '2026-05-13',
    email: 'polk200276+1@gmail.com',
    promotionCode: 'PROMO2025',
    planDescription: '天下雜誌年訂優惠方案',
  },
  {
    id: 2,
    orderStatus: '止寄',
    note: '',
    virtualPhone: '',
    mobile: '0933-456-789',
    productCode: 'CHV00002',
    productName: '康健雜誌 半年期（6 期）',
    startPeriod: '312',
    startDate: '2025-06-01',
    endPeriod: '317',
    endDate: '2025-11-30',
    quantity: 2,
    unitPrice: 1188,
    discount: '15%',
    sellPrice: 1009,
    actualAmount: 2018,
    transactionType: '新訂',
    taxType: '內含稅',
    requireDate: '2025-06-05',
    agreeMarketing: '否',
    shipCustomerCode: '1679128',
    shipCustomerName: 'JEFF',
    shipAddress: '台北市大同區民權西路 103 號',
    shipRecipient: 'JEFF',
    shipMethod: '1001 郵寄一般',
    grade: 'B',
    discountMark: 'N',
    reserver: '',
    shipWarehouse: '台北倉',
    bookshelfLocation: '',
    autoRenew: '否',
    licenseStartDate: '2025-06-01',
    licenseEndDate: '2025-11-30',
    email: 'polk200276+1@gmail.com',
    promotionCode: '',
    planDescription: '康健雜誌半年訂閱',
  },
  {
    id: 3,
    orderStatus: '正常',
    note: '',
    virtualPhone: '',
    mobile: '0912-345-678',
    productCode: 'GCV00001',
    productName: '天下雜誌 1 年期（26 期）',
    startPeriod: '782',
    startDate: '2025-05-14',
    endPeriod: '807',
    endDate: '2026-05-13',
    quantity: 1,
    unitPrice: 2380,
    discount: '10%',
    sellPrice: 2142,
    actualAmount: 2142,
    transactionType: '訂閱',
    taxType: '內含稅',
    requireDate: '2025-05-20',
    agreeMarketing: '是',
    shipCustomerCode: '1679128',
    shipCustomerName: 'JEFF',
    shipAddress: '台北市大同區民權西路 103 號',
    shipRecipient: 'JEFF',
    shipMethod: '1001 郵寄一般',
    grade: 'A',
    discountMark: 'Y',
    reserver: '',
    shipWarehouse: '台北倉',
    bookshelfLocation: 'A-12-3',
    autoRenew: '是',
    licenseStartDate: '2025-05-14',
    licenseEndDate: '2026-05-13',
    email: 'polk200276+1@gmail.com',
    promotionCode: 'PROMO2025',
    planDescription: '天下雜誌年訂優惠方案',
  },
  {
    id: 4,
    orderStatus: '退訂',
    note: '',
    virtualPhone: '',
    mobile: '0933-456-789',
    productCode: 'CHV00002',
    productName: '康健雜誌 半年期（6 期）',
    startPeriod: '312',
    startDate: '2025-06-01',
    endPeriod: '317',
    endDate: '2025-11-30',
    quantity: 2,
    unitPrice: 1188,
    discount: '15%',
    sellPrice: 1009,
    actualAmount: 2018,
    transactionType: '新訂',
    taxType: '內含稅',
    requireDate: '2025-06-05',
    agreeMarketing: '否',
    shipCustomerCode: '1679128',
    shipCustomerName: 'JEFF',
    shipAddress: '台北市大同區民權西路 103 號',
    shipRecipient: 'JEFF',
    shipMethod: '1001 郵寄一般',
    grade: 'B',
    discountMark: 'N',
    reserver: '',
    shipWarehouse: '台北倉',
    bookshelfLocation: 'B-05-7',
    autoRenew: '否',
    licenseStartDate: '2025-06-01',
    licenseEndDate: '2025-11-30',
    email: 'polk200276+1@gmail.com',
    promotionCode: '',
    planDescription: '康健雜誌半年訂閱',
  },
];

// 區段標題
function SectionTitle({ children }: { children: string }) {
  return (
    <p
      className="text-[#1c1c1c] border-b border-[#c4c9d3] pb-[8px] mb-[16px]"
      style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '14px', fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

// ERP 訂單明細元件
export function ERPOrderItems() {
  const [selectedItem, setSelectedItem] = useState<ERPOrderItemData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showShipped, setShowShipped] = useState(false);
  // 促銷方案相關 state
  const [promotionCodeSearch, setPromotionCodeSearch] = useState('');
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [promotionPopupKeyword, setPromotionPopupKeyword] = useState('');
  const promotionPopupRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉 promotion popup
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

  // 依 showShipped 過濾
  const baseItems = showShipped
    ? mockERPOrderItems
    : mockERPOrderItems.filter((item) => !isShipped(item));

  // 搜尋過濾
  const keyword = searchKeyword.trim().toLowerCase();
  const filteredItems = keyword
    ? baseItems.filter(
        (item) =>
          item.productCode.toLowerCase().includes(keyword) ||
          item.productName.toLowerCase().includes(keyword) ||
          item.orderStatus.toLowerCase().includes(keyword)
      )
    : baseItems;

  // 用於 drawer 上下筆（在 filteredItems 裡）
  const currentIndex = selectedItem
    ? filteredItems.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) setSelectedItem(filteredItems[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1)
      setSelectedItem(filteredItems[currentIndex + 1]);
  };

  const openDrawer = (item: ERPOrderItemData) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };


  // 選擇促銷方案
  const handleSelectPromotion = (code: string) => {
    setPromotionCodeSearch(code);
    setShowPromotionPopup(false);
    setPromotionPopupKeyword('');
  };

  // 清除促銷方案代碼
  const handleClearPromotionCode = () => {
    setPromotionCodeSearch('');
  };

  // 固定前綴欄（每個 table 共用）
  const fixedCols: CwTableColumn<ERPOrderItemData>[] = [
    { key: 'productCode', title: '產品料號', width: '120px' },
    {
      key: 'shipped_tag' as any, title: '', width: '72px', align: 'center',
      render: (_: any, r: ERPOrderItemData) =>
        isShipped(r) ? (
          <span
            className="inline-block px-[6px] py-[2px] rounded-[4px] text-[11px] font-[500]"
            style={{ color: '#16a34a', background: '#16a34a18' }}
          >
            已出貨
          </span>
        ) : null,
    },
    { key: 'productName', title: '產品名稱', width: '200px' },
  ];

  const pricingCols: CwTableColumn<ERPOrderItemData>[] = [
    ...fixedCols,
    { key: 'startPeriod', title: '起訂期數', width: '90px' },
    { key: 'startDate', title: '起訂日期', width: '110px' },
    { key: 'endPeriod', title: '迄訂期數', width: '90px' },
    { key: 'endDate', title: '迄訂日期', width: '110px' },
    { key: 'quantity', title: '數量', width: '70px', align: 'center' },
    { key: 'unitPrice', title: '單位定價', width: '110px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'discount', title: '折扣', width: '70px', align: 'center' },
    { key: 'sellPrice', title: '單位售價', width: '110px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'actualAmount', title: '實際銷售金額', width: '130px', align: 'right', render: (v: any) => `NT$ ${(v as number).toLocaleString()}` },
    { key: 'transactionType', title: '交易型態', width: '90px' },
    { key: 'taxType', title: '稅別', width: '80px' },
  ];

  const shippingCols: CwTableColumn<ERPOrderItemData>[] = [
    ...fixedCols,
    { key: 'requireDate', title: '需求日', width: '110px' },
    { key: 'agreeMarketing', title: '同意行銷', width: '90px', align: 'center' },
    { key: 'shipCustomerCode', title: '出貨客戶編號', width: '120px' },
    { key: 'shipCustomerName', title: '出貨客戶名稱', width: '120px' },
    { key: 'shipAddress', title: '出貨地址', width: '200px' },
    { key: 'shipRecipient', title: '出貨收件人', width: '110px' },
    { key: 'shipMethod', title: '出貨方式', width: '130px' },
    { key: 'grade', title: '品級', width: '70px', align: 'center' },
    { key: 'discountMark', title: '折扣標', width: '80px', align: 'center' },
    { key: 'reserver', title: '保留者', width: '100px' },
    { key: 'shipWarehouse', title: '出貨倉', width: '90px' },
    { key: 'bookshelfLocation', title: '書展儲位', width: '100px' },
  ];

  const otherCols: CwTableColumn<ERPOrderItemData>[] = [
    ...fixedCols,
    { key: 'autoRenew', title: '自動續訂', width: '90px', align: 'center' },
    { key: 'licenseStartDate', title: '知識庫授權起期', width: '130px' },
    { key: 'licenseEndDate', title: '知識庫授權迄期', width: '130px' },
    { key: 'email', title: 'Email', width: '180px' },
    { key: 'mobile', title: '手機', width: '120px' },
    { key: 'promotionCode', title: '促銷方案代碼', width: '120px' },
    { key: 'planDescription', title: '方案描述', width: '180px' },
  ];

  return (
    <div className="space-y-[12px]">

      {/* ── 搜尋列（對齊新訂單列表風格） ── */}
      <div className="flex items-center justify-between">

        {/* 左：已出貨資料 checkbox */}
        <div className="flex items-center gap-[20px]">
          <label className="flex items-center gap-[8px] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showShipped}
              onChange={(e) => setShowShipped(e.target.checked)}
              className="sr-only"
            />
            <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-[5px] border transition-colors shrink-0 ${
              showShipped ? 'bg-[#16a34a] border-[#16a34a]' : 'bg-white border-[#7c808c]'
            }`}>
              {showShipped && (
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>已出貨資料</span>
          </label>
        </div>

        {/* 右：搜尋 input */}
        <div className="flex items-center gap-[8px]">
          <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] whitespace-nowrap">搜尋：</label>
          <CwInput
            placeholder="輸入關鍵字過濾"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            width="240px"
          />
        </div>
      </div>

      {/* 定價 table */}
      <div>
        <SectionTitle>定價</SectionTitle>
        <div className="overflow-x-auto">
          <CwTable
            dataSource={filteredItems}
            columns={pricingCols}
            rowKey="id"
            emptyText="查無訂單明細資料"
          />
        </div>
      </div>

      {/* 出貨 table */}
      <div>
        <SectionTitle>出貨</SectionTitle>
        <div className="overflow-x-auto">
          <CwTable
            dataSource={filteredItems}
            columns={shippingCols}
            rowKey="id"
            emptyText="查無訂單明細資料"
          />
        </div>
      </div>

      {/* 其他 table */}
      <div>
        <SectionTitle>其他</SectionTitle>
        <div className="overflow-x-auto">
          <CwTable
            dataSource={filteredItems}
            columns={otherCols}
            rowKey="id"
            emptyText="查無訂單明細資料"
          />
        </div>
      </div>

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

      {/* 詳細資訊 Drawer */}
      {selectedItem && (
        <CwDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedItem.productName}
          initialWidth={560}
          showPrevious
          showNext
          disablePrevious={currentIndex <= 0}
          disableNext={currentIndex >= filteredItems.length - 1}
          onPrevious={handlePrevious}
          onNext={handleNext}
        >
          <div className="space-y-[24px]">

            {/* 基本資訊（對應列表固定欄） */}
            <div>
              <SectionTitle>基本資訊</SectionTitle>
              <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px]">
                <CwInput label="產品料號" value={selectedItem.productCode} disabled readOnly />
                <CwInput label="訂單狀態" value={selectedItem.orderStatus} disabled readOnly />
                <div className="col-span-2">
                  <CwInput label="產品名稱" value={selectedItem.productName} disabled readOnly />
                </div>
              </div>
            </div>

            {/* 定價資訊（對應列表「定價」欄位群） */}
            <div>
              <SectionTitle>定價資訊</SectionTitle>
              <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px]">
                <CwInput label="起訂期數" value={selectedItem.startPeriod} disabled readOnly />
                <CwInput label="起訂日期" value={selectedItem.startDate} disabled readOnly />
                <CwInput label="迄訂期數" value={selectedItem.endPeriod} disabled readOnly />
                <CwInput label="迄訂日期" value={selectedItem.endDate} disabled readOnly />
                <CwInput label="數量" value={String(selectedItem.quantity)} disabled readOnly />
                <CwInput label="單位定價" value={`NT$ ${selectedItem.unitPrice.toLocaleString()}`} disabled readOnly />
                <CwInput label="折扣" value={selectedItem.discount} disabled readOnly />
                <CwInput label="單位售價" value={`NT$ ${selectedItem.sellPrice.toLocaleString()}`} disabled readOnly />
                <div className="col-span-2">
                  <CwInput label="實際銷售金額" value={`NT$ ${selectedItem.actualAmount.toLocaleString()}`} disabled readOnly />
                </div>
                <CwSelect label="交易型態" value={selectedItem.transactionType} options={[{ value: '訂閱', label: '訂閱' }, { value: '新訂', label: '新訂' }, { value: '續訂', label: '續訂' }, { value: '加訂', label: '加訂' }]} disabled />
                <CwSelect label="稅別" value={selectedItem.taxType} options={[{ value: '內含稅', label: '內含稅' }, { value: '外加稅', label: '外加稅' }, { value: '免稅', label: '免稅' }]} disabled />
              </div>
            </div>

            {/* 出貨資訊（對應列表「出貨」欄位群） */}
            <div>
              <SectionTitle>出貨資訊</SectionTitle>
              <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px]">
                <CwInput label="需求日" value={selectedItem.requireDate} disabled readOnly />
                <CwSelect label="同意行銷" value={selectedItem.agreeMarketing} options={[{ value: '是', label: '是' }, { value: '否', label: '否' }]} disabled />
                <CwInput label="出貨客戶編號" value={selectedItem.shipCustomerCode} disabled readOnly />
                <CwInput label="出貨客戶名稱" value={selectedItem.shipCustomerName} disabled readOnly />
                <div className="col-span-2">
                  <CwInput label="出貨地址" value={selectedItem.shipAddress} disabled readOnly />
                </div>
                <CwInput label="出貨收件人" value={selectedItem.shipRecipient} disabled readOnly />
                <CwInput label="出貨方式" value={selectedItem.shipMethod} disabled readOnly />
                <CwInput label="品級" value={selectedItem.grade} disabled readOnly />
                <CwSelect label="折扣標" value={selectedItem.discountMark} options={[{ value: 'Y', label: 'Y' }, { value: 'N', label: 'N' }]} disabled />
                <CwInput label="保留者" value={selectedItem.reserver || '—'} disabled readOnly />
                <CwInput label="出貨倉" value={selectedItem.shipWarehouse} disabled readOnly />
                {selectedItem.bookshelfLocation && (
                  <CwInput label="書展儲位" value={selectedItem.bookshelfLocation} disabled readOnly />
                )}
              </div>
            </div>

            {/* 其他資訊（對應列表「其他」欄位群） */}
            <div>
              <SectionTitle>其他資訊</SectionTitle>
              <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px]">
                <CwSelect label="自動續訂" value={selectedItem.autoRenew} options={[{ value: '是', label: '是' }, { value: '否', label: '否' }]} disabled />
                <CwInput label="知識庫授權起期" value={selectedItem.licenseStartDate} disabled readOnly />
                <CwInput label="知識庫授權迄期" value={selectedItem.licenseEndDate} disabled readOnly />
                <CwInput label="Email" value={selectedItem.email} disabled readOnly />
                <CwInput label="手機" value={selectedItem.mobile || '—'} disabled readOnly />
                <CwInput label="虛擬聯絡電話" value={selectedItem.virtualPhone || '—'} disabled readOnly />
                <CwInput label="促銷方案代碼" value={selectedItem.promotionCode || '—'} disabled readOnly />
                <div className="col-span-2">
                  <CwInput label="方案描述" value={selectedItem.planDescription || '—'} disabled readOnly />
                </div>
                {selectedItem.note && (
                  <div className="col-span-2">
                    <CwInput label="註記" value={selectedItem.note} disabled readOnly />
                  </div>
                )}
              </div>
            </div>

          </div>
        </CwDrawer>
      )}
    </div>
  );
}
