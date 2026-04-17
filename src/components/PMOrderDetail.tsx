import React, { useState, useRef } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable } from "./CwTable";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwTextarea } from "./CwTextarea";
import { CwPagination } from "./CwPagination";
import { OrderProcessFlow, OrderProcessStep } from "./OrderProcessFlow";
import { CwTooltip } from "./CwTooltip";
import { CwPopup } from "./CwPopup";
import { CwEmptyState } from "./CwEmptyState";
import { CwTab } from "./CwTab";
import { ERPOrderItems } from "./ERPOrderItems";
import { OMGOrderHeader } from "./OMGOrderHeader";
import { CwDrawer } from "./CwDrawer";
import { CwButton } from "./CwButton";
import { Info, HelpCircle, ChevronDown, ChevronRight, ArrowRight, Eye, ArrowDown, ChevronLeft } from "lucide-react";

// 出貨資訊 Tab 獨立元件（state 隔離，避免影響父層重新渲染）
const allShipData = [
  {
    id: 'SI001',
    legalEntity: '天下',
    orderNo: 'CW2025010001',
    productCode: 'GCV00001',
    productName: '天下雜誌 1 年期（26 期）',
    pickDate: '2025-05-16',
    actualShipDate: '2025-05-17',
    shipMethod: '1001 郵寄一般',
    trackingNo: 'TW123456789',
    batchNo: 'B20250517001',
    shipQty: 1,
    owner: '天下',
    setCode: '',
    omsProgress: 'S',
    omsExecStatus: '出貨完成',
    omsChangeDate: '2025-05-17',
    shipWarehouse: 'A01',
  },
  {
    id: 'SI002',
    legalEntity: '康健',
    orderNo: 'CW2025010001',
    productCode: 'CHV00002',
    productName: '康健雜誌 半年期（6 期）',
    pickDate: '2025-06-03',
    actualShipDate: '2025-06-04',
    shipMethod: '1001 郵寄一般',
    trackingNo: 'TW987654321',
    batchNo: 'B20250604002',
    shipQty: 2,
    owner: '康健',
    setCode: 'SET001',
    omsProgress: 'S',
    omsExecStatus: '出貨完成',
    omsChangeDate: '2025-06-04',
    shipWarehouse: 'A01',
  },
  {
    id: 'SI003',
    legalEntity: '親子',
    orderNo: 'CW2025010001',
    productCode: 'PCT00003',
    productName: '親子天下 1 年期（12 期）',
    pickDate: '',
    actualShipDate: '',
    shipMethod: '',
    trackingNo: '',
    batchNo: '',
    shipQty: '',
    owner: '親子',
    setCode: '',
    omsProgress: 'P',
    omsExecStatus: '等待',
    omsChangeDate: '2025-06-10',
    shipWarehouse: 'A01',
  },
];

const allSuspendResumeData = [
  { id: 'SR001', originalOrderNo: '102862682', customerCode: '1679128', customerName: 'JEFF', payerCode: '1679128', payerName: 'JEFF', orderDate: '', shipCustomerName: 'JEFF', shipCustomerCode: '1679128', shipAddress: '台北市大同區中正路100號 103', suspendNote: '' },
  { id: 'SR002', originalOrderNo: '102971345', customerCode: '1234567', customerName: '李小華', payerCode: '1234567', payerName: '李小華', orderDate: '', shipCustomerName: '李小華', shipCustomerCode: '1234567', shipAddress: '台中市南屯區公益路二段', suspendNote: '' },
];

const allReturnResendData = [
  { id: 'RR001', applyDate: '2025-06-05', status: '已補寄', originalOrderNo: '102862682', customerCode: '1679128', returnReason: '', actualReturnDate: '', suspended: '', suspendReason: '', shipNote: '', approvalDate: '2025-06-08', orderType: 'CW補書單', customerName: 'JEFF', contact: '', shipMethod: '1002 郵寄 限時', shipCustomerName: 'JEFF', shipAddress: '台北市大同區中正路100號 10F', shipCustomerCode: '1679128', shipRecipient: 'JEFF', resendReason: '', remark: '', orderAmount: '3,980', publishShip: 'Y', sourceDesc: '官網訂閱', sourceNo: 'WEB20250605001', processNo: 'PRO20250606001', channelCode: 'CH001', channelDesc: '天下雜誌官網', salesName: '陳小明' },
  { id: 'RR002', applyDate: '2025-07-12', status: '待補寄', originalOrderNo: '102971345', customerCode: '1234567', returnReason: '', actualReturnDate: '', suspended: '', suspendReason: '', shipNote: '', approvalDate: '', orderType: 'CW補書單', customerName: '李小華', contact: '', shipMethod: '1002 郵寄 限時', shipCustomerName: '李小華', shipAddress: '台中市南屯區公益路二段', shipCustomerCode: '1234567', shipRecipient: '李小華', resendReason: '', remark: '', orderAmount: '1,980', publishShip: 'Y', sourceDesc: '門市訂閱', sourceNo: 'STR20250712001', processNo: 'PRO20250713001', channelCode: 'CH002', channelDesc: '康健門市', salesName: '林大華' },
  { id: 'RR003', applyDate: '2025-08-22', status: '已補寄', originalOrderNo: '103045678', customerCode: '9876543', returnReason: '', actualReturnDate: '', suspended: '', suspendReason: '', shipNote: '', approvalDate: '2025-08-26', orderType: 'CW補書單', customerName: '張美玲', contact: '', shipMethod: '2001 宅配', shipCustomerName: '張美玲', shipAddress: '高雄市新興區中正三路', shipCustomerCode: '9876543', shipRecipient: '張美玲', resendReason: '', remark: '', orderAmount: '2,500', publishShip: 'N', sourceDesc: '電話訂閱', sourceNo: 'TEL20250822001', processNo: 'PRO20250823001', channelCode: 'CH003', channelDesc: '親子天下電話', salesName: '王美玲' },
];

const allAddressChangeData = [
  { id: 'AC001', originalOrderNo: 'CW2025010001', customerCode: 'C001680443', customerName: '王大明', customerContact: '王大明', status: '已處理', cancelReason: '01_改地址／收件人', remark: '', approvalDate: '2025-06-02', applyDate: '2025-06-01', oldAddress: '台北市大同區民權西路 103', oldRecipient: 'JEFF', oldMobile: '0912-345-678', newAddress: '台北市信義區信義路五段7號', newRecipient: '王大明', newMobile: '0933-111-222', shipMethod: '1001 郵寄一般' },
  { id: 'AC002', originalOrderNo: 'CW2025020002', customerCode: 'C001234567', customerName: '李小華', customerContact: '李小華', status: '待處理', cancelReason: '01_改地址／收件人', remark: '', approvalDate: '', applyDate: '2025-07-15', oldAddress: '台中市西屯區台灣大道三段', oldRecipient: '李小華', oldMobile: '0966-777-888', newAddress: '台中市南屯區公益路二段', newRecipient: '李小華', newMobile: '0966-777-888', shipMethod: '1001 郵寄一般' },
  { id: 'AC003', originalOrderNo: 'CW2025030003', customerCode: 'C009876543', customerName: '張美玲', customerContact: '張美玲', status: '已取消', cancelReason: '02_改收件人', remark: '客戶要求取消', approvalDate: '2025-08-21', applyDate: '2025-08-20', oldAddress: '高雄市左營區博愛二路', oldRecipient: '張美玲', oldMobile: '0922-555-666', newAddress: '高雄市新興區中正三路', newRecipient: '張美玲', newMobile: '0922-555-666', shipMethod: '2001 宅配' },
];

const OMS_PROGRESS_MAP: Record<string, { label: string; color: string; bg: string; desc: string }> = {
  P: { label: 'P', color: '#7c808c', bg: '#f0f2f5', desc: '等候中未下發' },
  A: { label: 'A', color: '#0078d4', bg: '#e3f2fd', desc: '正在配出庫單號，等待物流（例如黑貓）回應' },
  I: { label: 'I', color: '#f57c00', bg: '#fff4e5', desc: '已下發WMS，等待WMS回覆' },
  S: { label: 'S', color: '#16a34a', bg: '#e8f5e9', desc: '已下發WMS，且WMS回覆成功' },
  E: { label: 'E', color: '#dc2626', bg: '#fef2f2', desc: '已下發WMS，但WMS回覆錯誤' },
};

function OmsProgressTag({ code }: { code: string }) {
  const cfg = OMS_PROGRESS_MAP[code];
  if (!cfg) return <span>{code}</span>;
  return (
    <div className="relative group inline-block">
      <span
        className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-[4px] text-[12px] font-[600] cursor-default select-none"
        style={{ color: cfg.color, background: cfg.bg }}
      >
        {cfg.label}
      </span>
      {/* Tooltip */}
      <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[300] hidden group-hover:block pointer-events-none">
        <div
          className="whitespace-nowrap rounded-[6px] px-[10px] py-[6px] text-[12px] text-white shadow-lg"
          style={{ background: '#1c1c1c', fontWeight: 350 }}
        >
          {code}：{cfg.desc}
        </div>
        {/* arrow */}
        <div className="mx-auto mt-[-1px] w-0 h-0" style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1c1c1c', width: 'fit-content' }} />
      </div>
    </div>
  );
}

function DrawerActions() {
  return (
    <>
      <CwButton variant="secondary" appearance="outlined" disabled>暫存</CwButton>
      <CwButton variant="secondary" appearance="outlined" disabled>複製訂單</CwButton>
      <CwButton variant="secondary" appearance="outlined" disabled>清空</CwButton>
      <CwButton variant="destructive" appearance="outlined" disabled>取消</CwButton>
    </>
  );
}

function ShipInfoTab() {
  const [hideWaiting, setHideWaiting] = useState(false);
  const shipData = hideWaiting
    ? allShipData.filter((r) => r.omsProgress !== 'P')
    : allShipData;

  return (
    <div className="space-y-[12px]">
      <label className="flex items-center gap-[8px] cursor-pointer select-none w-fit">
        <input
          type="checkbox"
          checked={hideWaiting}
          onChange={(e) => setHideWaiting(e.target.checked)}
          className="sr-only"
        />
        <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-[5px] border transition-colors shrink-0 ${
          hideWaiting ? 'bg-[#0078d4] border-[#0078d4]' : 'bg-white border-[#7c808c]'
        }`}>
          {hideWaiting && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>隱藏等待中未下發訂單</span>
      </label>
      <CwTable
        dataSource={shipData}
        columns={[
          { key: 'legalEntity', title: '法人', width: '80px' },
          { key: 'orderNo', title: '訂單單號', width: '140px' },
          { key: 'productCode', title: '產品料號', width: '110px' },
          { key: 'productName', title: '產品名稱', width: '200px' },
          { key: 'pickDate', title: '撿貨日期', width: '110px' },
          { key: 'actualShipDate', title: '實際出貨日期', width: '120px' },
          { key: 'shipMethod', title: '出貨方式', width: '130px' },
          { key: 'trackingNo', title: '追蹤號碼', width: '130px' },
          { key: 'batchNo', title: '批次號碼', width: '130px' },
          { key: 'shipQty', title: '出貨數量', width: '90px', align: 'center' },
          { key: 'owner', title: '貨主', width: '80px' },
          { key: 'setCode', title: '套書碼', width: '90px' },
          { key: 'omsProgress', title: 'OMS進度', width: '100px', align: 'center', render: (v) => <OmsProgressTag code={String(v)} /> },
          { key: 'omsExecStatus', title: 'OMS執行狀態', width: '120px' },
          { key: 'omsChangeDate', title: 'OMS異動日', width: '110px' },
          { key: 'shipWarehouse', title: '出貨倉', width: '90px' },
        ]}
        rowKey="id"
      />
    </div>
  );
}

// Helper components for the detail layouts


// 子項目資料型別
interface OrderSubItemData {
  id: string;
  parentId: number;
  productCode: string;
  productName: string;
  unitPrice: string;
  quantity: number;
  totalPrice: string;
  isGift: string;
  shippingStatus: string;
  shippingMethod: string;
  shippingCost: string;
  recipientId?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  recipientAddress?: string;
}

// 模擬訂單明細資料
const mockOrderItems: (OrderSubItemData & { children?: OrderSubItemData[] })[] = [
  {
    id: '1',
    parentId: 0,
    productCode: 'CW202501',
    productName: '天下雜誌一年 24 期',
    unitPrice: '3,980 元',
    quantity: 1,
    totalPrice: '3,980 元',
    isGift: 'N',
    shippingStatus: '部分寄出',
    shippingMethod: '宅配',
    shippingCost: '0 元',
    recipientId: '1680443',
    recipientPhone: '0912-345-678',
    recipientEmail: 'jeff@example.com',
    recipientAddress: '台北市大同區民權西路 103 號 10 樓',
    children: [
      {
        id: '1-1',
        parentId: 1,
        productCode: 'BK202501',
        productName: '【贈品】天下嚴選好書',
        unitPrice: '0 元',
        quantity: 1,
        totalPrice: '0 元',
        isGift: 'Y',
        shippingStatus: '已寄出',
        shippingMethod: '宅配',
        shippingCost: '0 元',
        recipientId: '1680443',
        recipientPhone: '0912-345-678',
        recipientEmail: 'jeff@example.com',
        recipientAddress: '台北市大同區民權西路 103 號 10 樓',
      }
    ]
  },
  {
    id: '2',
    parentId: 0,
    productCode: 'CW202502',
    productName: '天下雜誌半年 12 期',
    unitPrice: '2,100 元',
    quantity: 1,
    totalPrice: '2,100 元',
    isGift: 'N',
    shippingStatus: '待核單',
    shippingMethod: '掛號',
    shippingCost: '80 元',
    recipientId: '1680444',
    recipientPhone: '0988-777-666',
    recipientEmail: 'jeff+2@example.com',
    recipientAddress: '台中市西屯區台灣大道三段 99 號',
  },
  {
    id: '3',
    parentId: 0,
    productCode: 'DG202501',
    productName: '天下全閱讀數位版 (一年)',
    unitPrice: '1,980 元',
    quantity: 1,
    totalPrice: '1,980 元',
    isGift: 'N',
    shippingStatus: '已完成',
    shippingMethod: '數位開通',
    shippingCost: '0 元',
    recipientId: '1680445',
    recipientPhone: '0912-345-678',
    recipientEmail: 'jeff+3@example.com',
    recipientAddress: '—',
  },
];

export interface PMOrderDetailProps {
  orderId?: number;
  orderType?: 'service' | 'erp' | 'omg';
  /** 鎖定顯示的 tab，設定後隱藏主 tab 切換列 */
  fixedTab?: 'service' | 'erp';
  onClose?: () => void;
}

export function PMOrderDetail({ orderId, orderType = 'service', fixedTab, onClose }: PMOrderDetailProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showOrderStatusPopup, setShowOrderStatusPopup] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]); // 追蹤展開的行
  const [activeTab, setActiveTab] = useState<'service' | 'erp' | 'omg'>(orderType); // 主 Tab：it-admin / OMG
  const [activeErpTab, setActiveErpTab] = useState<'header' | 'items' | 'addressChange' | 'suspendResume' | 'cancel' | 'deliveryChange' | 'returnResend' | 'shipInfo'>('header'); // 統一 Tab
  const [selectedChangeOrderId, setSelectedChangeOrderId] = useState<string | null>(null);
  const [showChangeOrderDetail, setShowChangeOrderDetail] = useState(false);
  const [addressCancelReason, setAddressCancelReason] = useState('');
  const [deliveryChangeForm, setDeliveryChangeForm] = useState({
    originalShipMethod: '宅配到府',
    originalShipDesc: '使用嘉里大榮配送，包含樓層搬運服務。',
    newShipMethod: '超商取貨 (7-ELEVEN)',
    newShipDesc: '門市代碼: 123456 (信義門市)',
    storeCode: '123456',
    storeName: '信義門市',
  });
  
  // 訂單明細區域的 ref
  const orderDetailRef = useRef<HTMLDivElement>(null);

  const orderItems = mockOrderItems;
  const totalItems = orderItems.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 切換行展開/收合
  const toggleRowExpansion = (itemId: string) => {
    setExpandedRows((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // 全部展開或全部收合
  const toggleAllExpansion = () => {
    const itemsWithChildren = orderItems.filter(item => item.children && item.children.length > 0);
    const allExpanded = itemsWithChildren.every(item => expandedRows.includes(item.id));
    
    if (allExpanded) {
      // 全部收合
      setExpandedRows([]);
    } else {
      // 全部展開
      setExpandedRows(itemsWithChildren.map(item => item.id));
    }
  };

  // 檢查是否全部展開
  const itemsWithChildren = orderItems.filter(item => item.children && item.children.length > 0);
  const allExpanded = itemsWithChildren.length > 0 && itemsWithChildren.every(item => expandedRows.includes(item.id));

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "訂單管理", href: "/orders" },
    { label: "訂單查詢", href: "/order-query" },
    { label: "訂單詳細記錄" }
  ];

  const handleBreadcrumbNavigate = (_href: string, index: number) => {
    // 點擊「訂單查詢」(index 2) 或更上層，返回列表頁
    if (index <= 2 && onClose) {
      onClose();
    }
  };

  // 滾動到訂單明細區域
  const scrollToOrderDetail = () => {
    if (orderDetailRef.current) {
      orderDetailRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // 訂單處理流程步驟
  const processSteps: OrderProcessStep[] = [
    { id: '1', label: '訂單確認', status: 'pending' },
    { id: '2', label: '付款確認', status: 'pending' },
    { id: '3', label: '出貨準備', status: 'pending' },
    { 
      id: '4', 
      label: '商品出貨', 
      status: 'pending', 
      detail: '詳細',
      tooltipContent: '商品全部都寄出的時間點（若僅部分寄出，仍會視為進行中）',
      onDetailClick: scrollToOrderDetail
    },
    { id: '5', label: '完成', status: 'pending' },
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <div className="flex items-center gap-[12px]">
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-[4px] text-[14px] text-[#0078d4] hover:text-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif] whitespace-nowrap"
            style={{ fontWeight: 350 }}
          >
            <ChevronLeft size={16} />
            返回列表
          </button>
        )}
        <CwTitle
          title="訂單詳細記錄"
          breadcrumbs={breadcrumbs}
          onBreadcrumbNavigate={handleBreadcrumbNavigate}
        />
      </div>

      {/* 【主要 Tab 切換：it-admin / OMG】- fixedTab 時隱藏 */}
      {!fixedTab && (
        <CwTab
          items={[
            { id: 'service', label: '中台訂單' },
            { id: 'erp', label: 'ERP訂單' },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as 'service' | 'erp' | 'omg')}
        />
      )}

      {/* ========== it-admin 訂單內容 ========== */}
      {(fixedTab ? fixedTab === 'service' : activeTab === 'service') && (
        <div className="space-y-[20px]">
          {/* 共用欄位 */}
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px]">
            <CwInput label="原訂單號碼" value="CW2025010001" disabled readOnly />
            <CwInput label="訂單日期" value="2025-10-07" disabled readOnly />
            <CwInput label="訂單客戶名稱" value="王小明" disabled readOnly />
            <CwInput label="客戶訂單編號" value="C001234567" disabled readOnly />
          </div>
          {/* 訂單處理流程 - 只在 it-admin 訂單中顯示 */}
          <OrderProcessFlow steps={processSteps} />
          {/* 訂單表頭 */}
          <div className="space-y-[16px]">
            {/* 訂單資訊 */}
            <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th colSpan={3} className="bg-[#e9ebf2] px-[10px] py-[15px] text-left border-b border-[#cdcdcd]">
                      <span style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '14px', fontWeight: 500, color: '#1c1c1c' }}>訂單資訊</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#cdcdcd]">
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                      訂單編號 <CwTooltip content="系統自動產生的唯一訂單識別碼"><HelpCircle className="w-[14px] h-[14px] text-[#01579b] cursor-help inline" /></CwTooltip>：520708735
                    </td>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                      來源系統 <CwTooltip content="訂單來源系統代碼"><HelpCircle className="w-[14px] h-[14px] text-[#01579b] cursor-help inline" /></CwTooltip>：IS
                    </td>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">來源編號：</td>
                  </tr>
                  <tr className="border-b border-[#cdcdcd]">
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                      訂單日期 <CwTooltip content="會員下單的時間"><HelpCircle className="w-[14px] h-[14px] text-[#01579b] cursor-help inline" /></CwTooltip>：2025-10-07 09:30:42
                    </td>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                      付款日期 <CwTooltip content="訂單完成付款的時間"><HelpCircle className="w-[14px] h-[14px] text-[#01579b] cursor-help inline" /></CwTooltip>：2025-10-07 09:35:12
                    </td>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">
                      訂單狀態 <CwTooltip content="點擊查看狀態說明"><Info className="w-[14px] h-[14px] text-[#01579b] cursor-help inline" onClick={() => setShowOrderStatusPopup(true)} /></CwTooltip>：已出貨
                    </td>
                  </tr>
                  <tr>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                      付款方式：信用卡一次付清
                    </td>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                      訂單金額：NT$ 3,980
                    </td>
                    <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">
                      發票號碼：UX-12345678
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 訂單明細內容 */}
            <div ref={orderDetailRef} className="space-y-[12px]">
              <div className="flex items-center justify-between">
                <h3 className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]" style={{fontSize: 18}}>訂單明細</h3>
                <div className="flex items-center gap-[12px]">
                  <CwInput 
                    placeholder="搜尋商品名稱或編號" 
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-[240px]"
                  />
                  <button 
                    onClick={toggleAllExpansion}
                    className="flex items-center gap-[4px] px-[20px] py-[6px] rounded-[var(--radius)] border border-[#01579b] text-[#01579b] hover:bg-[#e6f7ff] transition-colors font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] whitespace-nowrap"
                  >
                    {allExpanded ? '全部收合' : '全部展開'}
                  </button>
                </div>
              </div>

              {/* 明細表格 */}
              <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#e9ebf2]">
                      <th className="w-[50px] px-[10px] py-[15px]"></th>
                      <th className="px-[10px] py-[15px] text-left font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border-b border-[#cdcdcd]">商品資訊</th>
                      <th className="w-[120px] px-[10px] py-[15px] text-right font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border-b border-[#cdcdcd]">單價</th>
                      <th className="w-[80px] px-[10px] py-[15px] text-center font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border-b border-[#cdcdcd]">數量</th>
                      <th className="w-[120px] px-[10px] py-[15px] text-right font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border-b border-[#cdcdcd]">總計</th>
                      <th className="w-[150px] px-[10px] py-[15px] text-left font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border-b border-[#cdcdcd]">配送資訊</th>
                      <th className="w-[120px] px-[10px] py-[15px] text-left font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border-b border-[#cdcdcd]">出貨狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-[60px]">
                          <CwEmptyState text="查無訂單明細資料" />
                        </td>
                      </tr>
                    ) : (
                      orderItems.map((item) => {
                        const isExpanded = expandedRows.includes(item.id);
                        const hasChildren = item.children && item.children.length > 0;

                        return (
                          <React.Fragment key={item.id}>
                            <tr className={`border-b border-[#cdcdcd] hover:bg-[#f8f9fb] transition-colors ${isExpanded ? 'bg-[#f0f4f8]' : ''}`}>
                              <td className="px-[10px] py-[15px] text-center">
                                {hasChildren && (
                                  <button onClick={() => toggleRowExpansion(item.id)}>
                                    {isExpanded ? <ChevronDown className="w-[18px] h-[18px] text-[#7c808c]" /> : <ChevronRight className="w-[18px] h-[18px] text-[#7c808c]" />}
                                  </button>
                                )}
                              </td>
                              <td className="px-[10px] py-[15px]">
                                <div className="space-y-[4px]">
                                  <div className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c]">{item.productName}</div>
                                  <div className="font-['Noto_Sans_TC',_sans-serif] text-[12px] font-[350] text-[#7c808c]">商品編碼：{item.productCode}</div>
                                </div>
                              </td>
                              <td className="px-[10px] py-[15px] text-right">
                                <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">{item.unitPrice}</span>
                              </td>
                              <td className="px-[10px] py-[15px] text-center">
                                <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">{item.quantity}</span>
                              </td>
                              <td className="px-[10px] py-[15px] text-right">
                                <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c]">{item.totalPrice}</span>
                              </td>
                              <td className="px-[10px] py-[15px]">
                                <div className="space-y-[2px]">
                                  <div className="font-['Noto_Sans_TC',_sans-serif] text-[12px] font-[350] text-[#1c1c1c]">{item.shippingMethod}</div>
                                  <div className="font-['Noto_Sans_TC',_sans-serif] text-[12px] font-[350] text-[#7c808c] truncate w-[130px]" title={item.recipientAddress}>
                                    收件：{item.recipientAddress}
                                  </div>
                                </div>
                              </td>
                              <td className="px-[10px] py-[15px]">
                                <div className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#01579b]">{item.shippingStatus}</div>
                              </td>
                            </tr>
                            
                            {/* 子項目 (贈品等) */}
                            {isExpanded && hasChildren && item.children?.map((child) => (
                              <tr key={child.id} className="bg-[#fcfdfe] border-b border-[#cdcdcd]">
                                <td className="px-[10px] py-[15px]"></td>
                                <td className="px-[10px] py-[15px] pl-[30px]">
                                  <div className="flex items-center gap-[8px]">
                                    <span className="px-[4px] py-[1px] bg-[#e53935] text-white text-[10px] rounded-[2px]">贈品</span>
                                    <div className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#4a4a4a]">{child.productName}</div>
                                  </div>
                                </td>
                                <td className="px-[10px] py-[15px] text-right text-[#7c808c] text-[14px] font-[350]">{child.unitPrice}</td>
                                <td className="px-[10px] py-[15px] text-center text-[#7c808c] text-[14px] font-[350]">{child.quantity}</td>
                                <td className="px-[10px] py-[15px] text-right text-[#7c808c] text-[14px] font-[350]">{child.totalPrice}</td>
                                <td className="px-[10px] py-[15px] text-[#7c808c] text-[12px] font-[350]">{child.shippingMethod}</td>
                                <td className="px-[10px] py-[15px] text-[#7c808c] text-[14px] font-[350]">{child.shippingStatus}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 分頁控制 */}
            {orderItems.length > 0 && (
              <CwPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                pageSizeOptions={[10, 20, 50]}
              />
            )}
          </div>
        </div>
      )}

      {/* ========== OMG（ERP）訂單內容 ========== */}
      {(fixedTab ? fixedTab === 'erp' : activeTab === 'erp') && (
        <div className="space-y-[20px]">
          {/* 共用欄位 */}
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px]">
            <CwInput label="原訂單號碼" value="CW2025010001" disabled readOnly />
            <CwInput label="訂單日期" value="2025-10-07" disabled readOnly />
            <CwInput label="訂單客戶名稱" value="王小明" disabled readOnly />
            <CwInput label="客戶訂單編號" value="C001234567" disabled readOnly />
          </div>
          {/* OMG 子 Tab + 異動單 Tab 同列顯示 */}
          <CwTab
            items={[
              { id: 'header', label: '訂單表頭' },
              { id: 'items', label: '訂單明細' },
              { id: 'addressChange', label: '改址單' },
              { id: 'returnResend', label: '退件補寄單' },
              { id: 'suspendResume', label: '止復寄單' },
              { id: 'deliveryChange', label: '改出貨方式' },
              { id: 'cancel', label: '退訂單' },
              { id: 'shipInfo', label: '出貨資訊' },
            ]}
            activeId={activeErpTab}
            onChange={(id) => setActiveErpTab(id as typeof activeErpTab)}
          />

          {activeErpTab === 'header' && <OMGOrderHeader />}
          {activeErpTab === 'items' && <ERPOrderItems />}

          {/* 【異動單內容】 */}
          <div>

            {/* 異動單內容：列表 */}
            <div>
                {activeErpTab === 'addressChange' && (
                  <CwTable
                    dataSource={allAddressChangeData}
                    columns={[
                      { key: 'id', title: '改址單號碼', width: '120px' },
                      { key: 'status', title: '狀態', width: '90px' },
                      { key: 'applyDate', title: '申請日期', width: '110px' },
                      { key: 'oldAddress', title: '原出貨地址', width: '180px' },
                      { key: 'oldRecipient', title: '原出貨收件人', width: '110px' },
                      { key: 'oldMobile', title: '原出貨手機', width: '120px' },
                      { key: 'newAddress', title: '新出貨地址', width: '180px' },
                      { key: 'newRecipient', title: '新出貨收件人', width: '110px' },
                      { key: 'newMobile', title: '新出貨手機', width: '120px' },
                      { key: 'shipMethod', title: '出貨方式', width: '130px' },
                      {
                        key: 'action',
                        title: '功能',
                        width: '80px',
                        align: 'center',
                        render: (_, record: any) => (
                          <CwTooltip content="檢視詳情">
                            <button onClick={() => { setSelectedChangeOrderId(record.id); setAddressCancelReason(allAddressChangeData.find(x => x.id === record.id)?.cancelReason ?? ''); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                              <Eye className="w-[16px] h-[16px] text-[#7c808c]" />
                            </button>
                          </CwTooltip>
                        )
                      }
                    ]}
                    rowKey="id"
                  />
                )}

                {activeErpTab === 'suspendResume' && (
                  <CwTable
                    dataSource={[
                      { id: 'SR001', lineNo: '1', productCode: 'GCV00002', productName: '天下雜誌2期', subStart: '25-JUN-2025', subEnd: '21-JAN-2026', remaining: '2', suspendPeriod: '840', suspendDate: '07-JAN-2026', suspendReason: '7.其他', suspendStatus: '已核單', approvalDate: '03-JUN-2026' },
                      { id: 'SR002', lineNo: '2', productCode: 'CHV00003', productName: '康健雜誌3期', subStart: '01-AUG-2025', subEnd: '31-DEC-2025', remaining: '4', suspendPeriod: '500', suspendDate: '15-NOV-2025', suspendReason: '1.客戶申請', suspendStatus: '待核單', approvalDate: '' },
                    ]}
                    columns={[
                      { key: 'lineNo', title: '原行號', width: '70px', align: 'center' },
                      { key: 'productCode', title: '產品料號', width: '110px' },
                      { key: 'productName', title: '產品名稱', width: '150px' },
                      { key: 'subStart', title: '訂閱起期', width: '110px' },
                      { key: 'subEnd', title: '訂閱迄期', width: '110px' },
                      { key: 'remaining', title: '剩餘期數', width: '90px', align: 'center' },
                      { key: 'suspendPeriod', title: '止寄期/日期', width: '110px' },
                      { key: 'suspendReason', title: '止寄原因', width: '120px' },
                      { key: 'suspendStatus', title: '止寄狀態', width: '100px' },
                      { key: 'approvalDate', title: '止寄核單日期', width: '120px' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', render: (_, record: any) => (
                        <CwTooltip content="檢視詳情">
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            <Eye className="w-[16px] h-[16px] text-[#7c808c]" />
                          </button>
                        </CwTooltip>
                      )}
                    ]}
                    rowKey="id"
                  />
                )}

                {activeErpTab === 'cancel' && (
                  <CwTable
                    dataSource={[
                      { id: 'CO001', applyDate: '2025-08-01', reason: '客戶不滿意服務品質', amount: '2,500', status: '已完成' },
                      { id: 'CO002', applyDate: '2025-10-12', reason: '重複訂購', amount: '1,980', status: '待核准' },
                      { id: 'CO003', applyDate: '2025-11-05', reason: '預算考量', amount: '3,200', status: '已退款' },
                      { id: 'CO004', applyDate: '2025-12-01', reason: '搬家無法收件', amount: '890', status: '已處理' },
                    ]}
                    columns={[
                      { key: 'id', title: '單號', width: '100px' },
                      { key: 'applyDate', title: '退訂日期', width: '120px' },
                      { key: 'reason', title: '原因', width: '200px' },
                      { key: 'amount', title: '金額', width: '120px' },
                      { key: 'status', title: '狀態', width: '100px' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', render: (_, record: any) => (
                        <CwTooltip content="檢視詳情">
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            <Eye className="w-[16px] h-[16px] text-[#7c808c]" />
                          </button>
                        </CwTooltip>
                      )}
                    ]}
                    rowKey="id"
                  />
                )}

                {activeErpTab === 'deliveryChange' && (
                  <CwTable
                    dataSource={[
                      {
                        id: 'DC001',
                        applyDate: '2025-09-01',
                        originalOrderNo: 'OD123456',
                        productCode: 'GCV00002',
                        productName: '天下雜誌2期',
                        oldShipMethod: '宅配',
                        newShipMethod: '超取',
                        amount: 'NT$ 380',
                        status: '已處理',
                      },
                    ]}
                    columns={[
                      { key: 'id', title: '改出貨方式單號', width: '130px' },
                      { key: 'applyDate', title: '改出貨方式單日期', width: '130px' },
                      { key: 'originalOrderNo', title: '原訂單號碼', width: '130px' },
                      { key: 'productCode', title: '產品料號', width: '110px' },
                      { key: 'productName', title: '產品名稱', width: '150px' },
                      { key: 'oldShipMethod', title: '原出貨方式', width: '110px' },
                      { key: 'newShipMethod', title: '新出貨方式', width: '110px' },
                      { key: 'amount', title: '金額', width: '90px', align: 'right' },
                      { key: 'status', title: '改出貨方式單狀態', width: '140px' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', render: (_, record: any) => (
                        <CwTooltip content="檢視詳情">
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            <Eye className="w-[16px] h-[16px] text-[#7c808c]" />
                          </button>
                        </CwTooltip>
                      )}
                    ]}
                    rowKey="id"
                  />
                )}

                {activeErpTab === 'returnResend' && (
                  <CwTable
                    dataSource={allReturnResendData.map(r => ({
                      id: r.id,
                      productCode: 'GCV00001',
                      productName: '天下雜誌 1 年期（26 期）',
                      qty: 1,
                      shipWarehouse: 'A01',
                      publishShip: 'Y',
                      shipDate: r.applyDate,
                      customerName: r.customerName,
                      recipient: r.shipRecipient || r.customerName,
                      address: r.shipAddress,
                      dispatchNote: r.shipNote,
                      processStatus: r.status,
                      execStatus: r.status === '已補寄' ? '完成' : '等待',
                    }))}
                    columns={[
                      { key: 'productCode', title: '訂單料號', width: '110px' },
                      { key: 'productName', title: '訂單產品', width: '200px' },
                      { key: 'qty', title: '數量', width: '70px', align: 'center' },
                      { key: 'shipWarehouse', title: '出貨倉', width: '80px' },
                      { key: 'publishShip', title: '發行出貨', width: '90px', align: 'center' },
                      { key: 'shipDate', title: '出貨日期', width: '110px' },
                      { key: 'customerName', title: '出貨客戶名稱', width: '120px' },
                      { key: 'recipient', title: '出貨收件人', width: '110px' },
                      { key: 'address', title: '出貨地址', width: '200px' },
                      { key: 'dispatchNote', title: '下發註記', width: '100px' },
                      { key: 'processStatus', title: '處理狀態', width: '100px' },
                      { key: 'execStatus', title: '執行狀態', width: '100px' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', render: (_, record: any) => (
                        <CwTooltip content="檢視詳情">
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            <Eye className="w-[16px] h-[16px] text-[#7c808c]" />
                          </button>
                        </CwTooltip>
                      )}
                    ]}
                    rowKey="id"
                  />
                )}

                {activeErpTab === 'shipInfo' && <ShipInfoTab />}
              </div>
            </div>

          {/* 底部操作按鈕列 */}
          <div className="flex items-center justify-end gap-[8px] border-t border-[#c4c9d3] pt-[16px]">
            <CwButton variant="primary" appearance="filled" disabled>核單</CwButton>
            <CwButton variant="destructive" appearance="outlined" disabled>刪除</CwButton>
          </div>
        </div>
      )}

      {/* 改址單 Drawer */}
      {(() => {
        const rec = allAddressChangeData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwDrawer
            open={showChangeOrderDetail && activeErpTab === 'addressChange'}
            onClose={() => setShowChangeOrderDetail(false)}
            title={`改址詳情 - ${selectedChangeOrderId}`}
            initialWidth={500}
          >
            {rec && (
              <div className="space-y-[16px]">

                {/* 訂單編號 */}
                <CwInput label="訂單編號" value={rec.originalOrderNo} disabled readOnly />

                {/* 解配原因（移至最上方，控制底下欄位） */}
                <CwSelect
                  label="解配原因"
                  value={addressCancelReason}
                  options={[
                    { label: '01_改地址／收件人', value: '01_改地址／收件人' },
                    { label: '02_改收件人', value: '02_改收件人' },
                    { label: '03_其他', value: '03_其他' },
                  ]}
                  onChange={(v) => setAddressCancelReason(Array.isArray(v) ? v[0] ?? '' : v)}
                />

                {/* 改址資訊 */}
                <div className="rounded-[10px] border border-[#e0d5f3] bg-[#faf8fe] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-[600] text-[#553399]" style={{ fontWeight: 700 }}>改址資訊</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CwSelect
                      label="改址單狀態"
                      value={rec.status}
                      options={[
                        { label: '輸入', value: '輸入' },
                        { label: '待處理', value: '待處理' },
                        { label: '已處理', value: '已處理' },
                        { label: '已取消', value: '已取消' },
                      ]}
                      disabled={!addressCancelReason}
                    />
                    <CwInput label="核單日期" defaultValue={rec.approvalDate} disabled readOnly />
                  </div>
                </div>

                {/* 原出貨 → 新出貨 流程 */}
                <div>
                  {/* 原出貨資訊（唯讀） */}
                  <div className="rounded-t-[10px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 pt-3 pb-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#7c808c] text-white text-[10px] font-[600] shrink-0">舊</span>
                      <p className="text-sm font-[600] text-[#4b5563]" style={{ fontWeight: 700 }}>原出貨資訊</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <CwInput label="原出貨收件人" value={rec.oldRecipient} disabled readOnly />
                      <CwInput label="原出貨手機" value={rec.oldMobile} disabled readOnly />
                      <div className="col-span-2">
                        <CwInput label="原出貨地址" value={rec.oldAddress} disabled readOnly />
                      </div>
                    </div>
                  </div>

                  {/* 箭頭分隔 */}
                  <div className="flex items-center justify-center border-l border-r border-[#e4e7ec] bg-white py-2">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-2 bg-[#c4c9d3]" />
                      <ArrowDown className="w-4 h-4 text-[#0078d4]" />
                      <div className="w-px h-2 bg-[#c4c9d3]" />
                    </div>
                  </div>

                  {/* 新出貨資訊（可編輯） */}
                  <div className="rounded-b-[10px] border border-[#bfdbfe] bg-[#f0f7ff] px-4 pt-3 pb-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#0078d4] text-white text-[10px] font-[600] shrink-0">新</span>
                      <p className="text-sm font-[600] text-[#1e3a8a]" style={{ fontWeight: 700 }}>新出貨資訊</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <CwInput label="新出貨收件人" defaultValue={rec.newRecipient} disabled={!addressCancelReason} />
                      <CwInput label="新出貨手機" defaultValue={rec.newMobile} disabled={!addressCancelReason} />
                      <div className="col-span-2">
                        <CwInput label="新出貨地址" defaultValue={rec.newAddress} disabled={!addressCancelReason} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 備註 */}
                <div className="rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
                  <p className="text-sm font-[600] text-[#4b5563] mb-3">備註</p>
                  <CwTextarea defaultValue={rec.remark} rows={3} disabled={!addressCancelReason} />
                </div>
              </div>
            )}
          </CwDrawer>
        );
      })()}

      {/* 止復寄單 Drawer */}
      {(() => {
        const rec = allSuspendResumeData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwDrawer
            open={showChangeOrderDetail && activeErpTab === 'suspendResume'}
            onClose={() => setShowChangeOrderDetail(false)}
            title={`止復寄詳情 - ${selectedChangeOrderId}`}
            initialWidth={520}
          >
            {rec && (
              <div className="space-y-[20px]">
                <div className="flex justify-end gap-[8px]"><DrawerActions /></div>
                {/* 訂單資訊 */}
                    <div className="col-span-2">
                      <p className="text-[13px] text-[#33475b] mb-1" >原訂單號碼</p>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <CwInput defaultValue={rec.originalOrderNo} />
                        </div>
                      </div>
                    </div>
                <div className="rounded-[10px] border border-[#d8e3f1] bg-[#f8fbff] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-[600] text-[#183b78]"  style={{ fontWeight: 700 }}>訂單資訊</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <CwInput label="止復寄單號碼" value={rec.id} disabled readOnly />
                    </div>
                    <CwInput label="訂單客戶編號" value={rec.customerCode} disabled readOnly />
                    <CwInput label="訂單客戶名稱" value={rec.customerName} disabled readOnly />
                    <CwInput label="付款客戶編號" value={rec.payerCode} disabled readOnly />
                    <CwInput label="付款客戶名稱" value={rec.payerName} disabled readOnly />
                  </div>
                </div>

                {/* 出貨資訊 */}
                <div className="rounded-[10px] border border-[#d8e3f1] bg-[#fff] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-[600] text-[#1c1c1c]"  style={{ fontWeight: 700 }}>出貨資訊</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <CwInput label="訂單日期" defaultValue={rec.orderDate} />
                    </div>
                    <CwInput label="出貨客戶名稱" value={rec.shipCustomerName} disabled readOnly />
                    <CwInput label="出貨客戶編號" value={rec.shipCustomerCode} disabled readOnly />
                    <div className="col-span-2">
                      <CwInput label="出貨地址" value={rec.shipAddress} disabled readOnly />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CwDrawer>
        );
      })()}

      {/* 退訂單 Drawer */}
      {(() => {
        const cancelData = [
          { id: 'CO001', applyDate: '2025-08-01', reason: '客戶不滿意服務品質', amount: '2,500', status: '已完成', applicant: '陳小明 (客服)', refundBank: '國泰世華 (013)', refundAccount: '12345', refundMethod: '匯款' },
          { id: 'CO002', applyDate: '2025-10-12', reason: '重複訂購', amount: '1,980', status: '待核准', applicant: '王大明 (客服)', refundBank: '台灣銀行 (004)', refundAccount: '67890', refundMethod: '匯款' },
          { id: 'CO003', applyDate: '2025-11-05', reason: '預算考量', amount: '3,200', status: '已退款', applicant: '李志遠 (客服)', refundBank: '玉山銀行 (808)', refundAccount: '11223', refundMethod: '信用卡退刷' },
          { id: 'CO004', applyDate: '2025-12-01', reason: '搬家無法收件', amount: '890', status: '已處理', applicant: '張美玲 (客服)', refundBank: '中信銀行 (822)', refundAccount: '44556', refundMethod: '匯款' },
        ];
        const rec = cancelData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwDrawer
            open={showChangeOrderDetail && activeErpTab === 'cancel'}
            onClose={() => setShowChangeOrderDetail(false)}
            title={`退訂單詳情 - ${selectedChangeOrderId}`}
            initialWidth={520}
          >
            {rec && (
              <div className="space-y-[20px]">
                <div className="flex justify-end gap-[8px]"><DrawerActions /></div>

                {/* 退訂資訊 */}
                <div className="rounded-[10px] border border-[#d8e3f1] bg-[#f8fbff] p-4">
                  <p className="text-[14px] text-[#183b78] mb-[12px]" style={{ fontWeight: 700 }}>退訂資訊</p>
                  <div className="grid grid-cols-2 gap-[12px]">
                    <div className="col-span-2">
                      <CwInput label="退訂單號碼" value={rec.id} disabled readOnly />
                    </div>
                    <CwInput label="退訂日期" value={rec.applyDate} disabled readOnly />
                    <CwSelect
                      label="退訂狀態"
                      value={rec.status}
                      options={[
                        { value: '待核准', label: '待核准' },
                        { value: '已完成', label: '已完成' },
                        { value: '已退款', label: '已退款' },
                        { value: '已處理', label: '已處理' },
                      ]}
                      disabled
                    />
                    <div className="col-span-2">
                      <CwInput label="退訂原因" value={rec.reason} disabled readOnly />
                    </div>
                    <CwInput label="退款金額" value={`NT$ ${rec.amount}`} disabled readOnly />
                    <CwInput label="申請人" value={rec.applicant} disabled readOnly />
                  </div>
                </div>

                {/* 退款資訊 */}
                <div className="rounded-[10px] border border-[#d8e3f1] bg-[#f8fbff] p-4">
                  <p className="text-[14px] text-[#183b78] mb-[12px]" style={{ fontWeight: 700 }}>退款資訊</p>
                  <div className="grid grid-cols-2 gap-[12px]">
                    <CwInput label="退款銀行" value={rec.refundBank} disabled readOnly />
                    <CwInput label="帳號後五碼" value={rec.refundAccount} disabled readOnly />
                    <div className="col-span-2">
                      <CwSelect
                        label="退款方式"
                        value={rec.refundMethod}
                        options={[
                          { value: '匯款', label: '匯款' },
                          { value: '信用卡退刷', label: '信用卡退刷' },
                          { value: '現金', label: '現金' },
                        ]}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* 審核歷程 */}
                <div className="bg-[#f9f9f9] p-4 border rounded">
                  <p className="text-sm font-medium mb-2">審核歷程：</p>
                  <div className="space-y-2 text-xs text-[#7c808c]">
                    <p>2025-08-01 10:00 - 提交退訂申請 (原因: 服務品質)</p>
                    <p>2025-08-02 14:30 - 客服主管初審通過</p>
                    <p>2025-08-05 09:00 - 財務部完成退款作業</p>
                  </div>
                </div>

                {/* 底部按鈕 */}
                <div className="flex items-center justify-end gap-[8px] border-t border-[#c4c9d3] pt-[16px]">
                  <CwButton variant="primary" appearance="filled" disabled>核單</CwButton>
                  <CwButton variant="destructive" appearance="outlined" disabled>刪除</CwButton>
                </div>
              </div>
            )}
          </CwDrawer>
        );
      })()}

      {/* 改出貨方式單 Drawer */}
      <CwDrawer
        open={showChangeOrderDetail && activeErpTab === 'deliveryChange'}
        onClose={() => setShowChangeOrderDetail(false)}
        title={`改出貨方式 - ${selectedChangeOrderId}`}
        initialWidth={520}
      >
        <div className="space-y-6">
          <div className="flex justify-end gap-[8px] pb-[4px]"><DrawerActions /></div>
          <p className="text-sm text-[#7c808c]">變更物流管道與配送規則</p>
          <div className="space-y-4">
            <div className="p-4 bg-[#fcfcff] border border-[#d9e2ef] rounded-lg">
              <p className="text-sm font-semibold text-[#1c1c1c]"  style={{ fontWeight: 500, fontSize: '18px' }}>變更前</p>
              <p className="text-xs text-[#7c808c]">目前出貨方式</p>
              <div className="grid grid-cols-1 gap-3 mt-3">
                <CwSelect
                  label="出貨方式"
                  value={deliveryChangeForm.originalShipMethod}
                  options={[
                    { label: '宅配到府', value: '宅配到府' },
                    { label: '超商取貨 (7-ELEVEN)', value: '超商取貨 (7-ELEVEN)' },
                    { label: '超商取貨 (全家)', value: '超商取貨 (全家)' },
                  ]}
                  onChange={(value) => setDeliveryChangeForm((prev) => ({ ...prev, originalShipMethod: value as string }))}
                />
                <CwInput
                  label="出貨方式說明"
                  value={deliveryChangeForm.originalShipDesc}
                  onChange={(e) => setDeliveryChangeForm((prev) => ({ ...prev, originalShipDesc: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="text-[#01579b] w-6 h-6 rotate-90" />
            </div>

            <div className="p-4 bg-[#f0f7ff] border border-[#c7e0ff] rounded-lg">
              <p className="text-sm text-[#0078d4]"  style={{ fontWeight: 500, fontSize: '18px' }}>變更後</p>
              <p className="text-xs text-[#7c808c]">新的出貨方式</p>
              <div className="grid grid-cols-1 gap-3 mt-3">
                <CwSelect
                  label="出貨方式"
                  value={deliveryChangeForm.newShipMethod}
                  options={[
                    { label: '宅配到府', value: '宅配到府' },
                    { label: '超商取貨 (7-ELEVEN)', value: '超商取貨 (7-ELEVEN)' },
                    { label: '超商取貨 (全家)', value: '超商取貨 (全家)' },
                  ]}
                  onChange={(value) => setDeliveryChangeForm((prev) => ({ ...prev, newShipMethod: value as string }))}
                />
                <CwInput
                  label="出貨方式說明"
                  value={deliveryChangeForm.newShipDesc}
                  onChange={(e) => setDeliveryChangeForm((prev) => ({ ...prev, newShipDesc: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-3">
                  <CwInput
                    label="門市代碼"
                    value={deliveryChangeForm.storeCode}
                    onChange={(e) => setDeliveryChangeForm((prev) => ({ ...prev, storeCode: e.target.value }))}
                  />
                  <CwInput
                    label="門市名稱"
                    value={deliveryChangeForm.storeName}
                    onChange={(e) => setDeliveryChangeForm((prev) => ({ ...prev, storeName: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CwDrawer>

      {/* 退件補寄單 Drawer */}
      {(() => {
        const rec = allReturnResendData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwDrawer
            open={showChangeOrderDetail && activeErpTab === 'returnResend'}
            onClose={() => setShowChangeOrderDetail(false)}
            title={`退件補寄詳情 - ${selectedChangeOrderId}`}
            initialWidth={560}
          >
            {rec && (
              <div className="space-y-[16px]">
                <div className="flex justify-end gap-[8px]"><DrawerActions /></div>
                    <div className="col-span-2">
                      <p className="text-[13px] text-[#1c1c1c] mb-1" style={{ fontWeight: 500 }}>原訂單號碼</p>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <CwInput defaultValue={rec.originalOrderNo} />
                        </div>

                      </div>
                    </div>
                {/* 退件資訊 */}
                <div className="rounded-[10px] border border-[#e8a87c] bg-[#fff8f4] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-[600] text-[#d97706]">退件資訊</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CwInput label="退件補寄單號" value={rec.id} disabled readOnly />
                    <CwInput label="退件補寄單日期" value={rec.applyDate} disabled readOnly />
                    <CwInput label="退件補寄單狀態" value={rec.status} disabled readOnly />
                    <CwInput label="訂單客戶編號" value={rec.customerCode} disabled readOnly />
                    <CwInput label="退件原因" defaultValue={rec.returnReason} />
                    <CwInput label="實際退件單日期" defaultValue={rec.actualReturnDate} />
                    <CwSelect
                      label="暫停處理"
                      value={rec.suspended}
                      options={[
                        { label: '否', value: '' },
                        { label: '是', value: '是' },
                      ]}
                    />
                    <CwInput label="暫止原因" defaultValue={rec.suspendReason} />
                    <div className="col-span-2">
                      <CwInput label="出貨注意事項" defaultValue={rec.shipNote} />
                    </div>
                  </div>
                </div>

                {/* 出貨資訊 */}
                <div className="rounded-[10px] border border-[#d8e3f1] bg-[#f8fbff] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-[600] text-[#1e3a8a]">出貨資訊</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CwInput label="核單日期" defaultValue={rec.approvalDate} />
                    <CwInput label="訂單類型" value={rec.orderType} disabled readOnly />
                    <CwInput label="訂單客戶名稱" value={rec.customerName} disabled readOnly />
                    <CwInput label="聯絡方式" defaultValue={rec.contact} />
                    <CwInput label="出貨方式" value={rec.shipMethod} disabled readOnly />
                    <CwInput label="出貨客戶名稱" value={rec.shipCustomerName} disabled readOnly />
                    <div className="col-span-2">
                      <CwInput label="出貨地址" value={rec.shipAddress} disabled readOnly />
                    </div>
                    <CwInput label="出貨客戶編號" value={rec.shipCustomerCode} disabled readOnly />
                    <CwInput label="出貨收件人" defaultValue={rec.shipRecipient} />
                    <div className="col-span-2">
                      <CwInput label="補寄原因" defaultValue={rec.resendReason} />
                    </div>
                  </div>
                </div>

                {/* 備註 */}
                <div className="rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
                  <p className="text-sm font-[600] text-[#4b5563] mb-3">備註</p>
                  <CwTextarea defaultValue={rec.remark} rows={3} />
                </div>
              </div>
            )}
          </CwDrawer>
        );
      })()}

      {/* 訂單狀態說明 Popup */}
      <CwPopup
        open={showOrderStatusPopup}
        onClose={() => setShowOrderStatusPopup(false)}
        title="訂單狀態 - 說明對照表"
        size="md"
        closableByMask={true}
        buttons={[
          {
            label: '確認',
            variant: 'primary',
            appearance: 'filled',
            onClick: () => setShowOrderStatusPopup(false),
          },
        ]}
      >
        <div className="w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border border-[#cdcdcd] bg-[#e9ebf2]">
                  狀態代碼
                </th>
                <th className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[500] text-[#1c1c1c] border border-[#cdcdcd] bg-[#e9ebf2]">
                  說明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  未核單
                </td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  訂單尚未進入核單流程
                </td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  待出貨
                </td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  訂單已核准，等待出貨
                </td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  已出貨
                </td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  訂單已完成出貨
                </td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  取消
                </td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  已執行退單，但並無退款動作
                </td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  退款
                </td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border border-[#cdcdcd]">
                  已執行退單，且已完成退款
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CwPopup>
    </div>
  );
}

PMOrderDetail.displayName = 'PMOrderDetail';
