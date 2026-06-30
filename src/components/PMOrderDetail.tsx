import React, { useState, useRef, useEffect } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable } from "./CwTable";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwPagination } from "./CwPagination";
import { OrderProcessFlow, OrderProcessStep } from "./OrderProcessFlow";
import { CwTooltip } from "./CwTooltip";
import { CwPopup } from "./CwPopup";
import { CwEmptyState } from "./CwEmptyState";
import { CwTab } from "./CwTab";
import { ERPOrderItems } from "./ERPOrderItems";
import { OMGOrderHeader, OMGOrderHeaderRef } from "./OMGOrderHeader";
import { CwButton } from "./CwButton";
import { CwTextarea } from "./CwTextarea";
import { PopupSelectField } from "./PopupSelectField";
import { Info, HelpCircle, ChevronDown, ChevronRight, ChevronLeft, Eye, ArrowDown, Pencil, Copy, Check, X, Search } from "lucide-react";

// 出貨資訊 Tab 獨立元件（state 隔離，避免影響父層重新渲染）
const allShipData = [
  { id: 'SI001', legalEntity: '天下', orderNo: 'CW2025010001', productCode: 'GCV00001', productName: '天下雜誌 1 年期（26 期）', pickDate: '2025-05-16', actualShipDate: '2025-05-17', shipMethod: '1001 郵寄一般', trackingNo: 'TW123456789', outboundNo: 'OUT20250517001', batchNo: 'B20250517001', shipQty: 1, owner: '天下', setCode: '', omsProgress: 'S', omsExecStatus: '出貨完成', omsChangeDate: '2025-05-17', shipWarehouse: 'A01' },
  { id: 'SI002', legalEntity: '天下', orderNo: 'CW2025010001', productCode: 'GCV00002', productName: '天下雜誌 加購禮（限定版）', pickDate: '2025-05-18', actualShipDate: '2025-05-19', shipMethod: '廠商直送', trackingNo: 'VD456789123', outboundNo: 'OUT20250519002', batchNo: 'B20250519002', shipQty: 1, owner: '廠商', setCode: '', omsProgress: 'S', omsExecStatus: '廠商出貨', omsChangeDate: '2025-05-19', shipWarehouse: '' },
  { id: 'SI004', legalEntity: '康健', orderNo: 'CW2025010001', productCode: 'CHV00002', productName: '康健雜誌 半年期（6 期）', pickDate: '2025-06-03', actualShipDate: '2025-06-04', shipMethod: '1001 郵寄一般', trackingNo: 'TW987654321', outboundNo: 'OUT20250604002', batchNo: 'B20250604002', shipQty: 2, owner: '康健', setCode: 'SET001', omsProgress: 'S', omsExecStatus: '出貨完成', omsChangeDate: '2025-06-04', shipWarehouse: 'A01' },
  { id: 'SI005', legalEntity: '親子', orderNo: 'CW2025010001', productCode: 'PCT00003', productName: '親子天下 1 年期（12 期）', pickDate: '', actualShipDate: '', shipMethod: '', trackingNo: '', outboundNo: '', batchNo: '', shipQty: '', owner: '親子', setCode: '', omsProgress: 'P', omsExecStatus: '等待', omsChangeDate: '2025-06-10', shipWarehouse: 'A01' },
];

const allSuspendResumeData = [
  { id: 'SR001', originalOrderNo: '102862682', customerCode: '1679128', customerName: 'JEFF', payerCode: '1679128', payerName: 'JEFF', orderDate: '', shipCustomerName: 'JEFF', shipCustomerCode: '1679128', shipAddress: '台北市大同區中正路100號 103', suspendNote: '' },
  { id: 'SR002', originalOrderNo: '102971345', customerCode: '1234567', customerName: '李小華', payerCode: '1234567', payerName: '李小華', orderDate: '', shipCustomerName: '李小華', shipCustomerCode: '1234567', shipAddress: '台中市南屯區公益路二段', suspendNote: '' },
];

const SUSPEND_REASON_OPTIONS = [
  { value: '1', label: '1 讀者出國' },
  { value: '2', label: '2 讀者當兵' },
  { value: '3', label: '3 2期雜誌被退回' },
  { value: '4', label: '4 應收帳款未付' },
  { value: '5', label: '5 贈閱-地址不正確' },
  { value: '5.1', label: '5.1 贈閱--無此人' },
  { value: '6', label: '6 書商/電銷/內部同仁 通知先止寄' },
  { value: '7', label: '7 其他' },
  { value: '8', label: '8 待異動先止寄' },
  { value: '9', label: '9 讀者忙，暫無時間看' },
  { value: '13', label: '13 修改起期' },
  { value: '14', label: '14 轉單/建單錯誤，修改起迄期' },
  { value: '15', label: '15 原含Cheers單止寄，依循止寄' },
];

const RR_SUSPEND_REASON_OPTIONS = [
  { value: '01', label: '01_單純新增退件單' },
  { value: '02', label: '02_補寄且暫不出貨' },
  { value: '03', label: '03_中獎電子發票無地址可寄' },
];

const RETURN_REASON_OPTIONS = [
  { value: '1', label: '1 查無此人' },
  { value: '2', label: '2 遷移不明' },
  { value: '3', label: '3 查無此址' },
  { value: '4', label: '4 招領逾期' },
  { value: '5', label: '5 地址欠詳' },
  { value: '6', label: '6 地址改編' },
  { value: '7', label: '7 重複收件' },
  { value: '8', label: '8 更改訂閱期間' },
  { value: '9', label: '9 不訂閱' },
  { value: '10', label: '10 不准進口' },
  { value: '11', label: '11 原因不明' },
  { value: '12', label: '12 瑕疵-內文錯誤' },
  { value: '13', label: '13 瑕疵-空白頁等印刷問題' },
  { value: '14', label: '14 瑕疵-缺跳頁等裝訂問題' },
  { value: '15', label: '15 瑕疵-破損' },
  { value: '16', label: '16 瑕疵-運送中損壞' },
];

const RESEND_REASON_OPTIONS = [
  { value: '1', label: '1 遺失補寄' },
  { value: '2', label: '2 改址補寄' },
  { value: '3', label: '3 二次補寄' },
  { value: '4', label: '4 建單錯誤補寄' },
  { value: '5', label: '5 寄錯補寄' },
  { value: '6', label: '6 漏裝補寄' },
  { value: '7', label: '7 退件補寄' },
  { value: '8', label: '8 更換贈品' },
  { value: '9', label: '9 瑕疵-內文錯誤' },
  { value: '10', label: '10 瑕疵-空白頁等印刷問題' },
  { value: '11', label: '11 瑕疵-缺跳頁等裝訂問題' },
  { value: '12', label: '12 瑕疵-破損' },
  { value: '13', label: '13 瑕疵-運送中損壞' },
  { value: '14', label: '14 瑕疵-水漬' },
  { value: '15', label: '15 瑕疵-其他' },
  { value: '16', label: '16 其他' },
];

const SUSPEND_PERIOD_ENTRIES = (() => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day = 1, month = 3, year = 2028;
  const entries: { num: string; date: string }[] = [];
  for (let i = 0; i < 30; i++) {
    const num = String(845 + i);
    const date = `${String(day).padStart(2, '0')}-${months[month]}-${year}`;
    entries.push({ num, date });
    day += 14;
    while (day > daysInMonth[month]) {
      day -= daysInMonth[month];
      month++;
      if (month >= 12) { month = 0; year++; }
    }
  }
  return entries;
})();

const SUSPEND_PERIOD_NUM_OPTIONS = SUSPEND_PERIOD_ENTRIES.map(e => e.num);
const SUSPEND_PERIOD_DATE_OPTIONS = SUSPEND_PERIOD_ENTRIES.map(e => e.date);
const PERIOD_NUM_TO_DATE: Record<string, string> = Object.fromEntries(SUSPEND_PERIOD_ENTRIES.map(e => [e.num, e.date]));
const PERIOD_DATE_TO_NUM: Record<string, string> = Object.fromEntries(SUSPEND_PERIOD_ENTRIES.map(e => [e.date, e.num]));

interface SuspendResumeLine {
  seq: number;
  productCode: string;
  productName: string;
  subscribeFrom: string;
  subscribeTo: string;
  remaining: number;
  suspendPeriodNum: string;
  suspendPeriodDate: string;
  suspendReason: string;
  suspendStatus: string;
}

const SUSPEND_RESUME_LINES: Record<string, SuspendResumeLine[]> = {
  SR001: [
    { seq: 1, productCode: 'GCV00062', productName: '天下雜誌62期', subscribeFrom: '01-APR-2026', subscribeTo: '30-AUG-2028', remaining: 58, suspendPeriodNum: '849', suspendPeriodDate: '27-MAY-2028', suspendReason: '', suspendStatus: '輸入' },
    { seq: 2, productCode: 'GH202505110', productName: '(特刊110)腸壽力', subscribeFrom: '01-APR-2026', subscribeTo: '30-AUG-2028', remaining: 58, suspendPeriodNum: '845', suspendPeriodDate: '01-APR-2028', suspendReason: '7', suspendStatus: '已核單' },
  ],
  SR002: [
    { seq: 1, productCode: 'CHV00003', productName: '康健雜誌3期', subscribeFrom: '01-JAN-2026', subscribeTo: '31-DEC-2027', remaining: 24, suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '', suspendStatus: '輸入' },
  ],
};

const allReturnResendData = [
  { id: 'RR001', legalEntity: '81 天下', applyDate: '2025-06-05', status: '已補寄', originalOrderNo: '102862682', customerCode: '1679128', returnReason: '', actualReturnDate: '', suspended: '', suspendReason: '', shipNote: '', approvalDate: '2025-06-08', orderType: 'CW補書單', customerName: 'JEFF', contact: '', shipMethod: '1002 郵寄 限時', shipCustomerName: 'JEFF', shipAddress: '台北市大同區中正路100號 10F', shipCustomerCode: '1679128', shipRecipient: 'JEFF', resendReason: '遺失補寄', remark: '', orderAmount: '3,980', publishShip: 'Y', sourceDesc: '官網訂閱', sourceNo: 'WEB20250605001', processNo: 'PRO20250606001', channelCode: 'CH001', channelDesc: '天下雜誌官網', salesName: '陳小明', productCode: 'GCV00002', productName: '天下雜誌2期', publishReturnReason: '地址不符', qty: 1, dispatchDate: '2025-06-07', actualShipDate: '2025-06-08', trackingNo: 'TK20250608001', outboundNo: 'OUT20250608001', batchNo: 'BAT2506A', omsProgress: 'S', omsExecStatus: '成功', omsChangeDate: '2025-06-08' },
  { id: 'RR002', legalEntity: '88 康健', applyDate: '2025-07-12', status: '待補寄', originalOrderNo: '102971345', customerCode: '1234567', returnReason: '', actualReturnDate: '', suspended: '', suspendReason: '', shipNote: '', approvalDate: '', orderType: 'CW補書單', customerName: '李小華', contact: '', shipMethod: '1002 郵寄 限時', shipCustomerName: '李小華', shipAddress: '台中市南屯區公益路二段', shipCustomerCode: '1234567', shipRecipient: '李小華', resendReason: '包裝破損', remark: '', orderAmount: '1,980', publishShip: 'Y', sourceDesc: '門市訂閱', sourceNo: 'STR20250712001', processNo: 'PRO20250713001', channelCode: 'CH002', channelDesc: '康健門市', salesName: '林大華', productCode: 'CHV00003', productName: '康健雜誌3期', publishReturnReason: '收件人不在', qty: 2, dispatchDate: '', actualShipDate: '', trackingNo: '', outboundNo: '', batchNo: '', omsProgress: 'P', omsExecStatus: '等待中', omsChangeDate: '' },
  { id: 'RR003', legalEntity: '82 親子', applyDate: '2025-08-22', status: '已補寄', originalOrderNo: '103045678', customerCode: '9876543', returnReason: '', actualReturnDate: '', suspended: '', suspendReason: '', shipNote: '', approvalDate: '2025-08-26', orderType: 'CW補書單', customerName: '張美玲', contact: '', shipMethod: '2001 宅配', shipCustomerName: '張美玲', shipAddress: '高雄市新興區中正三路', shipCustomerCode: '9876543', shipRecipient: '張美玲', resendReason: '客戶申請', remark: '', orderAmount: '2,500', publishShip: 'N', sourceDesc: '電話訂閱', sourceNo: 'TEL20250822001', processNo: 'PRO20250823001', channelCode: 'CH003', channelDesc: '親子天下電話', salesName: '王美玲', productCode: 'PCK00010', productName: '親子天下10期', publishReturnReason: '地址錯誤', qty: 1, dispatchDate: '2025-08-25', actualShipDate: '2025-08-26', trackingNo: 'TK20250826003', outboundNo: 'OUT20250826003', batchNo: 'BAT2508C', omsProgress: 'S', omsExecStatus: '成功', omsChangeDate: '2025-08-26' },
];

const allAddressChangeData = [
  { id: 'AC001', legalEntity: '81 天下', originalOrderNo: 'CW2025010001', customerCode: 'C001680443', customerName: '王大明', customerContact: '王大明', status: '已處理', cancelReason: '01_改地址／收件人', remark: '', approvalDate: '2025-06-02', applyDate: '2025-06-01', productCode: 'GCV00002', productName: '天下雜誌2期', oldAddress: '台北市大同區民權西路 103', oldRecipient: 'JEFF', oldMobile: '0912-345-678', newAddress: '台北市信義區信義路五段7號', newRecipient: '王大明', newMobile: '0933-111-222', shipMethod: '1001 郵寄一般' },
  { id: 'AC002', legalEntity: '88 康健', originalOrderNo: 'CW2025020002', customerCode: 'C001234567', customerName: '李小華', customerContact: '李小華', status: '待處理', cancelReason: '01_改地址／收件人', remark: '', approvalDate: '', applyDate: '2025-07-15', productCode: 'CHV00003', productName: '康健雜誌3期', oldAddress: '台中市西屯區台灣大道三段', oldRecipient: '李小華', oldMobile: '0966-777-888', newAddress: '台中市南屯區公益路二段', newRecipient: '李小華', newMobile: '0966-777-888', shipMethod: '1001 郵寄一般' },
  { id: 'AC003', legalEntity: '82 親子', originalOrderNo: 'CW2025030003', customerCode: 'C009876543', customerName: '張美玲', customerContact: '張美玲', status: '已取消', cancelReason: '02_改收件人', remark: '客戶要求取消', approvalDate: '2025-08-21', applyDate: '2025-08-20', productCode: 'PCK00010', productName: '親子天下10期', oldAddress: '高雄市左營區博愛二路', oldRecipient: '張美玲', oldMobile: '0922-555-666', newAddress: '高雄市新興區中正三路', newRecipient: '張美玲', newMobile: '0922-555-666', shipMethod: '2001 宅配' },
];

const mockCurrentOrderItems = [
  { id: 1, productCode: 'GCV00002', productName: '天下雜誌2期', orderStatus: '輸入', shipRecipient: 'JEFF', mobile: '0912-345-678', shipAddress: '台北市大同區民權西路 103', shipMethod: '1001 郵寄一般' },
  { id: 2, productCode: 'GH202505110', productName: '(特刊110)腸壽力', orderStatus: '輸入', shipRecipient: 'JEFF', mobile: '0912-345-678', shipAddress: '台北市大同區民權西路 103', shipMethod: '1001 郵寄一般' },
];

const OMS_PROGRESS_MAP: Record<string, { label: string; color: string; bg: string; desc: string }> = {
  P: { label: 'P', color: '#7c808c', bg: '#f0f2f5', desc: '等候中未下發' },
  A: { label: 'A', color: '#0078d4', bg: '#e3f2fd', desc: '正在配出庫單號，等待物流（例如黑貓）回應' },
  I: { label: 'I', color: '#f57c00', bg: '#fff4e5', desc: '已下發WMS，等待WMS回覆' },
  S: { label: 'S', color: '#16a34a', bg: '#e8f5e9', desc: '已下發WMS，且WMS回覆成功' },
  E: { label: 'E', color: '#dc2626', bg: '#fef2f2', desc: '已下發WMS，但WMS回覆錯誤' },
};

const ORACLE_MONTH: Record<string, string> = {
  JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
  JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
};
const formatOracleDate = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [dd, mon, yyyy] = parts;
  const mm = ORACLE_MONTH[mon.toUpperCase()];
  return mm ? `${yyyy}-${mm}-${dd}` : dateStr;
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


const SHIP_OMS_EXEC_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  '出貨完成': { bg: '#e6f7ee', color: '#16a34a' },
  '廠商出貨': { bg: '#e3f2fd', color: '#0078d4' },
  '等待':     { bg: '#f0f2f5', color: '#7c808c' },
  '等待中':   { bg: '#f0f2f5', color: '#7c808c' },
};

function ShipInfoTab() {
  const [hideWaiting, setHideWaiting] = useState(false);
  const [copiedShipCell, setCopiedShipCell] = useState<string | null>(null);
  const shipData = hideWaiting
    ? allShipData.filter((r) => r.omsProgress !== 'P')
    : allShipData;

  const handleCopyShipCell = (cellKey: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedShipCell(cellKey);
    setTimeout(() => setCopiedShipCell(null), 1500);
  };
  const renderShipCopy = (value: string, cellKey: string) => (
    <div className="flex items-center gap-[6px]">
      <span>{value}</span>
      <button onClick={() => handleCopyShipCell(cellKey, value)} className="shrink-0 text-[#7c808c] hover:text-[#0078d4] transition-colors">
        {copiedShipCell === cellKey
          ? <Check className="w-[14px] h-[14px] text-[#16a34a]" />
          : <Copy className="w-[14px] h-[14px]" />}
      </button>
    </div>
  );

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
          { key: 'orderNo', title: '訂單單號', width: '145px', render: (value: string, record: any) => renderShipCopy(value, `${record.id}-orderNo`) },
          { key: 'omsExecStatus', title: 'OMS執行狀態', width: '120px', render: (value: string) => {
            const style = SHIP_OMS_EXEC_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
            return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
          }},
          { key: 'productCode', title: '產品料號', width: '140px', render: (value: string, record: any) => renderShipCopy(value, `${record.id}-productCode`) },
          { key: 'productName', title: '產品名稱', width: '200px' },
          { key: 'pickDate', title: '撿貨日期', width: '110px' },
          { key: 'actualShipDate', title: '實際出貨日期', width: '120px' },
          { key: 'shipMethod', title: '出貨方式', width: '130px' },
          { key: 'trackingNo', title: '追蹤號碼', width: '130px' },
          { key: 'outboundNo', title: '出庫單號', width: '145px', render: (value: string, record: any) => renderShipCopy(value, `${record.id}-outboundNo`) },
          { key: 'batchNo', title: '批次號碼', width: '120px' },
          { key: 'shipQty', title: '出貨數量', width: '90px', align: 'center' },
          { key: 'owner', title: '貨主', width: '80px' },
          { key: 'setCode', title: '套書碼', width: '90px' },
          { key: 'omsProgress', title: 'OMS進度', width: '100px', align: 'center', render: (v: any) => <OmsProgressTag code={String(v)} /> },
          { key: 'omsChangeDate', title: 'OMS異動日', width: '110px' },
          { key: 'shipWarehouse', title: '出貨倉', width: '90px' },
        ]}
        rowKey="id"
      />
    </div>
  );
}

const AUDIT_CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  '聯絡資訊': { bg: '#e6f7ee', color: '#16a34a' },
  '基本資料': { bg: '#e3f2fd', color: '#0078d4' },
  '地址':     { bg: '#fef9c3', color: '#b45309' },
};

const mockAuditHistory = [
  { id: 'AH001', time: '2025/03/15 - 14:32:01', operator: '林小華',  category: '聯絡資訊', field: '聯絡電話',   before: '02-2345-6789',          after: '02-9876-5432' },
  { id: 'AH002', time: '2025/03/10 - 09:15:44', operator: '系統',    category: '基本資料', field: '訂閱到期日', before: '2025-03-09',             after: '2026-03-09' },
  { id: 'AH003', time: '2025/02/28 - 16:05:22', operator: '陳美玲',  category: '聯絡資訊', field: '電子郵件',   before: 'old.email@example.com', after: 'new.email@example.com' },
  { id: 'AH004', time: '2025/02/20 - 11:48:09', operator: '王大明',  category: '基本資料', field: '客戶名稱',   before: '天下集團採購部舊版',     after: '天下集團採購部' },
  { id: 'AH005', time: '2025/01/08 - 10:00:00', operator: '系統',    category: '地址',     field: '帳號狀態',   before: '停用',                  after: '啟用' },
];

function AuditHistoryTab() {
  return (
    <CwTable
      dataSource={mockAuditHistory}
      rowKey="id"
      columns={[
        { key: 'time',     title: '操作時間', width: '170px' },
        { key: 'operator', title: '操作者',   width: '90px' },
        {
          key: 'category', title: '分類', width: '100px',
          render: (v: any) => {
            const s = AUDIT_CATEGORY_STYLE[v as string] ?? { bg: '#f3f4f6', color: '#6b7280' };
            return (
              <span
                className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px]"
                style={{ background: s.bg, color: s.color, fontWeight: 500 }}
              >
                {v}
              </span>
            );
          },
        },
        {
          key: 'field', title: '異動欄位', width: '120px',
          render: (v: any) => (
            <span className="text-[#0078d4] font-['Noto_Sans_TC',_sans-serif] text-[14px]" style={{ fontWeight: 350 }}>{v}</span>
          ),
        },
        { key: 'before', title: '變更前', width: '200px' },
        { key: 'after',  title: '變更後', width: '200px' },
      ]}
    />
  );
}

// ── 串接紀錄 ──────────────────────────────────────────────────────────────
interface ApiRecordData {
  id: string;
  time: string;
  eventName: string;
  direction: '呼出' | '呼入';
  targetSystem: string;
  status: '成功' | '失敗' | '逾時';
  httpCode: number;
  duration: number; // ms
  requestPayload?: string;
  responsePayload?: string;
}

const API_STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  '成功': { bg: '#e6f7ee', color: '#16a34a' },
  '失敗': { bg: '#fef2f2', color: '#dc2626' },
  '逾時': { bg: '#fff7ed', color: '#c2410c' },
};

const mockApiRecords: ApiRecordData[] = [
  {
    id: 'AR001',
    time: '2025/05/14 - 10:23:41',
    eventName: '建立訂單',
    direction: '呼出',
    targetSystem: 'ERP',
    status: '成功',
    httpCode: 200,
    duration: 312,
    requestPayload:  '{"orderNo":"CW2025010001","productCode":"GCV00001","quantity":1}',
    responsePayload: '{"success":true,"erpOrderId":"ERP-88001"}',
  },
  {
    id: 'AR002',
    time: '2025/05/14 - 10:24:05',
    eventName: '付款授權',
    direction: '呼出',
    targetSystem: '金流',
    status: '成功',
    httpCode: 200,
    duration: 876,
    requestPayload:  '{"amount":2142,"currency":"TWD","cardToken":"tok_xxx"}',
    responsePayload: '{"authCode":"A00123","status":"approved"}',
  },
  {
    id: 'AR003',
    time: '2025/05/16 - 08:10:00',
    eventName: '出貨通知',
    direction: '呼入',
    targetSystem: '物流',
    status: '成功',
    httpCode: 200,
    duration: 54,
    requestPayload:  '{"trackingNo":"TW123456789","shipDate":"2025-05-17"}',
    responsePayload: '{"received":true}',
  },
  {
    id: 'AR004',
    time: '2025/05/17 - 14:55:22',
    eventName: '會員資料同步',
    direction: '呼出',
    targetSystem: '會員系統',
    status: '失敗',
    httpCode: 500,
    duration: 3001,
    requestPayload:  '{"memberId":"1679128","fields":["email","mobile"]}',
    responsePayload: '{"error":"Internal Server Error"}',
  },
  {
    id: 'AR005',
    time: '2025/05/18 - 09:02:11',
    eventName: '會員資料同步',
    direction: '呼出',
    targetSystem: '會員系統',
    status: '成功',
    httpCode: 200,
    duration: 198,
    requestPayload:  '{"memberId":"1679128","fields":["email","mobile"]}',
    responsePayload: '{"success":true}',
  },
];

function ApiRecordsTab() {
  return (
    <CwTable
      dataSource={mockApiRecords}
      rowKey="id"
      columns={[
        { key: 'time',       title: '時間',     width: '170px', render: (v: any) => <span className="text-[#7c808c]">{v}</span> },
        { key: 'eventName',  title: '事件名稱', width: '130px', render: (v: any) => <span style={{ fontWeight: 500 }}>{v}</span> },
        {
          key: 'direction', title: '方向', width: '80px',
          render: (v: any) => (
            <span
              className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px]"
              style={{
                background: v === '呼出' ? '#eff6ff' : '#f0fdf4',
                color:      v === '呼出' ? '#2563eb' : '#16a34a',
                fontWeight: 500,
              }}
            >
              {v}
            </span>
          ),
        },
        { key: 'targetSystem', title: '對象系統', width: '110px' },
        {
          key: 'status', title: '狀態', width: '90px',
          render: (v: any) => {
            const s = API_STATUS_STYLE[v as string] ?? { bg: '#f3f4f6', color: '#6b7280' };
            return (
              <span
                className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px]"
                style={{ background: s.bg, color: s.color, fontWeight: 500 }}
              >
                {v}
              </span>
            );
          },
        },
        {
          key: 'httpCode', title: 'HTTP', width: '70px', align: 'center',
          render: (v: any) => <span style={{ color: (v as number) >= 400 ? '#dc2626' : '#1c1c1c' }}>{v}</span>,
        },
        {
          key: 'duration', title: '耗時', width: '90px', align: 'right',
          render: (v: any) => (
            <span style={{ color: (v as number) >= 1000 ? '#c2410c' : '#7c808c' }}>
              {(v as number).toLocaleString()} ms
            </span>
          ),
        },
      ]}
    />
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

const PAYMENT_METHOD_OPTIONS = [
  { value: '1', label: '1：信用卡' },
  { value: '2', label: '2：劃撥' },
  { value: '3', label: '3：應收票據' },
  { value: '4', label: '4：信用卡-網路' },
  { value: '5', label: '5：ATM' },
  { value: '6', label: '6：贈閱' },
  { value: '7', label: '7：互轉' },
  { value: '8', label: '8：消費券' },
  { value: '9', label: '9：LINEPAY' },
  { value: 'E', label: 'E：綠界' },
];

const CHANNEL_CODE_OPTIONS_DELIVERY = [
  { value: 'AC',          label: 'AC 天下廣告',                   searchValue: 'AC 天下廣告' },
  { value: 'AH',          label: 'AH 康健廣告',                   searchValue: 'AH 康健廣告' },
  { value: 'AJ',          label: 'AJ Cheers廣告',                 searchValue: 'AJ Cheers廣告' },
  { value: 'AK',          label: 'AK 親子廣告',                   searchValue: 'AK 親子廣告' },
  { value: 'BA',          label: 'BA 航空公司',                   searchValue: 'BA 航空公司' },
  { value: 'BB',          label: 'BB 團訂',                       searchValue: 'BB 團訂' },
  { value: 'BU004',       label: 'BU004 團訂策略聯盟國語日報',    searchValue: 'BU004 團訂策略聯盟國語日報' },
  { value: 'CA',          label: 'CA 客戶服務',                   searchValue: 'CA 客戶服務' },
  { value: 'DA',          label: 'DA 外資',                       searchValue: 'DA 外資' },
  { value: 'GB',          label: 'GB 團購',                       searchValue: 'GB 團購' },
  { value: 'GP',          label: 'GP 天下團體授權系統',           searchValue: 'GP 天下團體授權系統' },
  { value: 'IAP_ANDROID', label: 'IAP_ANDROID APP_ANDROID',       searchValue: 'IAP_ANDROID APP_ANDROID' },
  { value: 'IAP_IOS',     label: 'IAP_IOS APP_IOS',               searchValue: 'IAP_IOS APP_IOS' },
  { value: 'IB',          label: 'IB 親子天下線上學校',           searchValue: 'IB 親子天下線上學校' },
  { value: 'IC',          label: 'IC 天下網路書店',               searchValue: 'IC 天下網路書店' },
  { value: 'IE',          label: 'IE 活動平台',                   searchValue: 'IE 活動平台' },
  { value: 'IF',          label: 'IF 活動平台',                   searchValue: 'IF 活動平台' },
  { value: 'IH',          label: 'IH 康健電商',                   searchValue: 'IH 康健電商' },
  { value: 'IHA',         label: 'IHA 康健金流',                  searchValue: 'IHA 康健金流' },
  { value: 'IHB',         label: 'IHB 康健 Kolable',              searchValue: 'IHB 康健 Kolable' },
  { value: 'IM',          label: 'IM Master Cheers',              searchValue: 'IM Master Cheers' },
  { value: 'IP',          label: 'IP 親子天下網路書店',           searchValue: 'IP 親子天下網路書店' },
  { value: 'IPA',         label: 'IPA 親子報名系統',              searchValue: 'IPA 親子報名系統' },
  { value: 'IPF',         label: 'IPF 親子翻轉教育',              searchValue: 'IPF 親子翻轉教育' },
  { value: 'IPL',         label: 'IPL 親子學Kolable線上學習平台', searchValue: 'IPL 親子學Kolable線上學習平台' },
  { value: 'IPN',         label: 'IPN 親子翻轉教育序號兌換',      searchValue: 'IPN 親子翻轉教育序號兌換' },
  { value: 'IPP',         label: 'IPP 親子Premium',               searchValue: 'IPP 親子Premium' },
  { value: 'IPS',         label: 'IPS 親子蝦皮',                  searchValue: 'IPS 親子蝦皮' },
  { value: 'IPT',         label: 'IPT 親子主題站台',              searchValue: 'IPT 親子主題站台' },
  { value: 'IR',          label: 'IR 親子月月聽APP網頁版',        searchValue: 'IR 親子月月聽APP網頁版' },
  { value: 'IRS',         label: 'IRS 親子學SeeMi',               searchValue: 'IRS 親子學SeeMi' },
  { value: 'IRZ',         label: 'IRZ 親子學佐羅力',              searchValue: 'IRZ 親子學佐羅力' },
  { value: 'IS',          label: 'IS SECANT平台',                 searchValue: 'IS SECANT平台' },
  { value: 'ITM',         label: 'ITM 台哥大代銷',                searchValue: 'ITM 台哥大代銷' },
  { value: 'IU',          label: 'IU 聯賣平台',                   searchValue: 'IU 聯賣平台' },
  { value: 'MA',          label: 'MA 平面郵購',                   searchValue: 'MA 平面郵購' },
  { value: 'OC',          label: 'OC 直銷商社會',                 searchValue: 'OC 直銷商社會' },
  { value: 'OF',          label: 'OF 直銷商海外',                 searchValue: 'OF 直銷商海外' },
  { value: 'OI',          label: 'OI 直銷商網路',                 searchValue: 'OI 直銷商網路' },
  { value: 'OIA',         label: 'OIA 直銷外賣平台',              searchValue: 'OIA 直銷外賣平台' },
  { value: 'OS',          label: 'OS 直銷商校園',                 searchValue: 'OS 直銷商校園' },
  { value: 'OX',          label: 'OX 直銷商特通',                 searchValue: 'OX 直銷商特通' },
  { value: 'RA',          label: 'RA 經銷',                       searchValue: 'RA 經銷' },
  { value: 'RF',          label: 'RF 海外',                       searchValue: 'RF 海外' },
  { value: 'RI',          label: 'RI 網路',                       searchValue: 'RI 網路' },
  { value: 'RS',          label: 'RS 校園',                       searchValue: 'RS 校園' },
  { value: 'RW',          label: 'RW 量販',                       searchValue: 'RW 量販' },
  { value: 'RX',          label: 'RX 特通',                       searchValue: 'RX 特通' },
  { value: 'TA',          label: 'TA 電話行銷',                   searchValue: 'TA 電話行銷' },
  { value: 'TC845',       label: 'TC845 電銷內部新訂陳玉佩',      searchValue: 'TC845 電銷內部新訂陳玉佩' },
  { value: 'VA',          label: 'VA 展售',                       searchValue: 'VA 展售' },
  { value: 'X',           label: 'X 其他通路',                    searchValue: 'X 其他通路' },
];

const SHIP_METHOD_OPTIONS = [
  { value: '1001', label: '1001 郵寄一般' },
  { value: '1002', label: '1002 郵寄限時' },
  { value: '1005', label: '1005 郵寄-一般航空' },
  { value: '1006', label: '1006 郵寄-掛號水陸' },
  { value: '1007', label: '1007 郵寄-掛號航空' },
  { value: '1008', label: '1008 郵寄-限時掛號' },
  { value: '1009', label: '1009 郵寄-指定宅配' },
  { value: '1010', label: '1010 郵寄-郵箱' },
  { value: '1011', label: '1011 郵寄-發票掛號' },
  { value: '2001', label: '2001 宅配' },
  { value: '4021', label: '4021 合併寄送-農委會動植物防疫檢疫局' },
  { value: '4022', label: '4022 合併寄送-洋基通運股份有限公司行' },
  { value: '4023', label: '4023 合併寄送-大榮汽車貨運公司福委會' },
  { value: '9010', label: '9010 系統判定-水陸小包掛號' },
  { value: '9011', label: '9011 系統判定-航空雜誌掛號' },
  { value: '9012', label: '9012 系統判定-航空印刷品掛號' },
  { value: '9013', label: '9013 系統判定-航空小包掛號' },
  { value: '9014', label: '9014 系統判定-水陸包裹' },
  { value: '9015', label: '9015 系統判定-航空包裹' },
];

const CREDIT_CARD_TYPE_OPTIONS_DELIVERY = [
  { value: 'AMEX',    label: 'American Express' },
  { value: 'DINERS',  label: "Diner's Club" },
  { value: 'DISCOVER',label: 'Discover' },
  { value: 'JCB',     label: 'JCB' },
  { value: 'MC',      label: 'Master Card' },
  { value: 'OTHERS',  label: 'Others' },
  { value: 'UN',      label: '聯合信用卡' },
  { value: 'VISA',    label: 'Visa' },
];

const DELIVERY_PRODUCT_MAP: Record<string, {
  name: string;
  remaining: string;
  shipCustomerCode: string;
  shipCustomerName: string;
  shipRecipient: string;
  shipCustomerAddress: string;
  amount: string;
  originalShipMethod: string;
}> = {
  'CW202501': {
    name: '天下雜誌一年 24 期',
    remaining: '20',
    shipCustomerCode: '1680443',
    shipCustomerName: '王大明',
    shipRecipient: '王大明',
    shipCustomerAddress: '台北市大同區民權西路 103 號 10 樓',
    amount: '3980',
    originalShipMethod: '1001',
  },
  'CW202502': {
    name: '天下雜誌半年 12 期',
    remaining: '8',
    shipCustomerCode: '1680444',
    shipCustomerName: '陳小華',
    shipRecipient: '陳小華',
    shipCustomerAddress: '台中市西屯區台灣大道三段 99 號',
    amount: '2100',
    originalShipMethod: '2001',
  },
  'DG202501': {
    name: '天下全閱讀數位版 (一年)',
    remaining: '10',
    shipCustomerCode: '1680445',
    shipCustomerName: '林美玲',
    shipRecipient: '林美玲',
    shipCustomerAddress: '—',
    amount: '1980',
    originalShipMethod: '',
  },
};

export interface OrderHeaderInfo {
  sourceSystem: string;
  orderNumber: string;
  sourceOrderNumber: string;
  orderDate: string;
  omgOrderType: string;
  omgStatus: string;
  omgOrderNote: string;
  legalEntity: string;
}

const CHANGE_ORDER_TYPES = [
  { id: 'CAD', name: '改地址',    desc: '更換收件地址，自下一期起生效' },
  { id: 'RSD', name: '退貨補寄',  desc: '退件：收到瑕疵品後讓發行將書收回倉庫；補寄：客戶未收到商品時重新出貨（一般商品及雜誌適用，數位產品不適用）' },
  { id: 'STP', name: '止寄',      desc: '暫停雜誌後續出貨，直到復寄為止' },
  { id: 'RSM', name: '復寄',      desc: '解除雜誌止寄，恢復正常出貨排程' },
  { id: 'CSH', name: '改出貨方式', desc: '更換物流方式，費用依新方式計算' },
  { id: 'CAN', name: '退訂',      desc: '取消訂閱，停止後續出貨與收費' },
];

const CHANGE_TYPE_TO_TAB: Record<string, 'addressChange' | 'suspendResume' | 'deliveryChange' | 'returnResend' | 'cancel'> = {
  CAD: 'addressChange',
  RSD: 'returnResend',
  STP: 'suspendResume',
  RSM: 'suspendResume',
  CSH: 'deliveryChange',
  CAN: 'cancel',
};

const CHANGE_TYPE_TITLE: Record<string, string> = {
  CAD: '新增改址單',
  RSD: '新增退件補寄單',
  STP: '新增止寄單',
  RSM: '新增復寄單',
  CSH: '新增改出貨方式',
  CAN: '新增退訂單',
};

const CANCEL_REASON_OPTIONS = [
  { value: '01', label: '01_改地址/收件人' },
  { value: '02', label: '02_改手機' },
  { value: '03', label: '03_改客戶主檔名字' },
  { value: '04', label: '04_改出貨備註' },
  { value: '05', label: '05_修改標籤備註' },
];

const MOCK_ORIGINAL_ORDER_OPTIONS = [
  { code: 'OMG-2026-000001', name: 'OMG-2026-000001' },
  { code: 'OMG-2026-000002', name: 'OMG-2026-000002' },
  { code: '102862682', name: '102862682' },
  { code: '102971345', name: '102971345' },
];

const MOCK_RECIPIENT_OPTIONS = [
  { code: 'JEFF', name: 'JEFF' },
  { code: '王大明', name: '王大明' },
  { code: '李小華', name: '李小華' },
  { code: '張美玲', name: '張美玲' },
];

const MOCK_MOBILE_OPTIONS = [
  { code: '0912-345-678', name: '0912-345-678' },
  { code: '0923-456-789', name: '0923-456-789' },
  { code: '0934-567-890', name: '0934-567-890' },
];

const MOCK_ADDRESS_OPTIONS = [
  { code: '台北市大同區民權西路 103', name: '台北市大同區民權西路 103' },
  { code: '台北市信義區信義路五段 7 號', name: '台北市信義區信義路五段 7 號' },
  { code: '新北市板橋區文化路一段 100 號', name: '新北市板橋區文化路一段 100 號' },
];

export interface PMOrderDetailProps {
  orderId?: number;
  orderType?: 'erp' | 'service' | 'omg';
  /** 訂單的來源類型陣列，決定哪些 tab 有資料 */
  orderTypes?: ('service' | 'erp' | 'omg')[];
  orderHeaderInfo?: OrderHeaderInfo;
  onClose?: () => void;
  /** 'create' 時改為新增訂單模式（標題／麵包屑不同） */
  mode?: 'view' | 'create';
  /** 初始編輯模式，預設 true（編輯）；傳 false 可直接開啟檢視模式 */
  initialEditMode?: boolean;
}

export function PMOrderDetail({ orderId: _orderId, orderType = 'erp', orderTypes, orderHeaderInfo, onClose, mode = 'view', initialEditMode = true }: PMOrderDetailProps) {
  // 判斷哪些 tab 有實際資料
  const hasService = !orderTypes || orderTypes.includes('service');
  const hasOmgOrErp = !orderTypes || orderTypes.includes('omg') || orderTypes.includes('erp');

  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showOrderStatusPopup, setShowOrderStatusPopup] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]); // 追蹤展開的行
  const [activeTab, setActiveTab] = useState<'service' | 'erp' | 'omg'>(orderType); // 主 Tab：it-admin / OMG
  const [activeErpTab, setActiveErpTab] = useState<'header' | 'items' | 'addressChange' | 'suspendResume' | 'cancel' | 'deliveryChange' | 'returnResend' | 'shipInfo' | 'auditHistory' | 'apiRecords'>('header'); // 統一 Tab
  const [selectedChangeOrderId, setSelectedChangeOrderId] = useState<string | null>(null);
  const [showChangeOrderDetail, setShowChangeOrderDetail] = useState(false);
  const [changeOrderReasonCode, setChangeOrderReasonCode] = useState('');
  const [deliveryChangeForm, setDeliveryChangeForm] = useState({
    changeOrderDate: '12-MAR-2026',
    originalOrderNo: 'CW2025010001',
    changeOrderNo: '',
    orderCustomerCode: 'C001680443',
    orderCustomerName: '王大明',
    orderCustomerContact: '',
    originalOrderType: 'CK訂閱單',
    remark: '',
    selectedProduct: '整張訂單',
    productName: '',
    remainingPeriods: '',
    shipCustomerCode: '',
    shipCustomerName: '',
    shipRecipient: '',
    shipCustomerAddress: '',
    amount: '',
    originalShipMethod: '',
    newShipMethod: '',
    paymentTerms: '即期付款',
    approvalDate: '',
    paymentCustomerCode: 'C001680443',
    paymentCustomerName: '王大明',
    invoiceRecipient: '',
    invoiceCustomerCode: 'C001680443',
    invoiceCustomerName: '王大明',
    invoiceNote: '',
    invoiceCustomerAddress: '台北市大同區民權西路 103 號 10 樓',
    invoiceType: '6 電子發票',
    invoiceEmail: 'jeff@example.com',
    invoiceTitle: '',
    unifiedNumber: '',
    channelCode: 'IP',
    channelName: '親子天下網路書店',
    paymentMethod: '1',
    spliceOrderNo: '',
    spliceDate: '',
    creditCardType: 'VISA',
    creditCardNo: '',
    creditCardExpiry: '',
    cardHolder: '',
    authCode: '',
    changeOrderStatus: '輸入',
    creditCardReplyCode: '',
  });
  
  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const [showNewChangeOrderPopup, setShowNewChangeOrderPopup] = useState(false);
  const [selectedChangeOrderType, setSelectedChangeOrderType] = useState<string | null>(null);
  const [isCreatingChangeOrder, setIsCreatingChangeOrder] = useState(false);
  const [selectItemOrderNo, setSelectItemOrderNo] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const [showReturnResendSaveConfirm, setShowReturnResendSaveConfirm] = useState(false);
  const [returnResendSubType, setReturnResendSubType] = useState<'return-only' | 'resend-only' | 'both'>('both');
  const [addressChangeNew, setAddressChangeNew] = useState({ recipient: '', mobile: '', address: '' });
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCell, setCopiedCell] = useState<string | null>(null);
  const handleCopyCell = (cellKey: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedCell(cellKey);
    setTimeout(() => setCopiedCell(null), 1500);
  };
  const renderWithCopy = (value: string, cellKey: string) => (
    <div className="flex items-center gap-[6px]">
      <span>{value}</span>
      <button onClick={() => handleCopyCell(cellKey, value)} className="shrink-0 text-[#7c808c] hover:text-[#0078d4] transition-colors">
        {copiedCell === cellKey
          ? <Check className="w-[14px] h-[14px] text-[#16a34a]" />
          : <Copy className="w-[14px] h-[14px]" />}
      </button>
    </div>
  );
  const [suspendResumeSubTab, setSuspendResumeSubTab] = useState<'suspend' | 'resume'>('suspend');
  const [suspendRowEdits, setSuspendRowEdits] = useState<Record<string, { suspendPeriodNum: string; suspendPeriodDate: string; suspendReason: string; paused?: boolean }>>({});
  const [cancelSubscriptionRowEdits, setCancelSubscriptionRowEdits] = useState<Record<string, { startPeriod: string; startDate: string; endPeriod: string; endDate: string }>>({});
  const [addressChangeRemark, setAddressChangeRemark] = useState('');
  const [returnResendForm, setReturnResendForm] = useState({ originalOrderNo: '', orderType: '', shipMethod: '', shipNote: '', remark: '' });
  const [cancelForm, setCancelForm] = useState({ cancelMethod: '', cancelReason: '', remark: '', discountMail: '', newOrderNo: '', fullReadBenefit: '', pauseProcess: '', pauseReason: '' });
  const headerRef = useRef<OMGOrderHeaderRef>(null);


  // 訂單明細區域的 ref
  const orderDetailRef = useRef<HTMLDivElement>(null);

  const handleDeliveryProductChange = (productCode: string) => {
    if (productCode === '整張訂單') {
      setDeliveryChangeForm(prev => ({
        ...prev,
        selectedProduct: '整張訂單',
        productName: '',
        remainingPeriods: '',
        shipCustomerCode: '',
        shipCustomerName: '',
        shipRecipient: '',
        shipCustomerAddress: '',
        amount: '',
        originalShipMethod: '1001',
      }));
    } else {
      const productData = DELIVERY_PRODUCT_MAP[productCode];
      if (productData) {
        setDeliveryChangeForm(prev => ({
          ...prev,
          selectedProduct: productCode,
          productName: productData.name,
          remainingPeriods: productData.remaining,
          shipCustomerCode: productData.shipCustomerCode,
          shipCustomerName: productData.shipCustomerName,
          shipRecipient: productData.shipRecipient,
          shipCustomerAddress: productData.shipCustomerAddress,
          amount: productData.amount,
          originalShipMethod: productData.originalShipMethod,
        }));
      }
    }
  };

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

  // 改出貨方式 popup - 付款方式條件顯示
  const isRemittance = deliveryChangeForm.paymentMethod === '2';
  const isCreditCard = deliveryChangeForm.paymentMethod === '1' || deliveryChangeForm.paymentMethod === '4';

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "訂單管理", href: "/orders" },
    { label: "訂單查詢", href: "/order-query" },
    { label: mode === 'create' ? "新增訂單" : "訂單詳細記錄" }
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
      <div className="flex items-center gap-[16px]">
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] transition-colors"
          >
            <ChevronLeft className="w-[18px] h-[18px] text-[#7c808c]" />
          </button>
        )}
        <CwTitle
          title={mode === 'create' ? "新增訂單" : "訂單詳細記錄"}
          breadcrumbs={breadcrumbs}
          onBreadcrumbNavigate={handleBreadcrumbNavigate}
          titleRight={mode !== 'create' ? (
            <label className="flex items-center gap-[8px] cursor-pointer select-none">
              <div
                className={`relative w-[40px] h-[22px] rounded-full transition-colors ${isEditMode ? 'bg-[#0078d4]' : 'bg-[#c4c9d3]'}`}
                onClick={() => setIsEditMode(v => !v)}
              >
                <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${isEditMode ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} />
              </div>
              <span className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                {isEditMode ? '編輯模式' : '檢視模式'}
              </span>
            </label>
          ) : undefined}
        />
      </div>

      {/* 【主要 Tab 切換：OMG訂單 / 中台訂單】 */}
      <CwTab
        items={[
          { id: 'erp', label: 'OMG訂單' },
          { id: 'service', label: '中台訂單' },
        ]}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as 'erp' | 'service')}
      />

      {/* ========== 中台訂單內容 ========== */}
      {activeTab === 'service' && (!hasService ? (
        <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
          <span className="text-[14px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">查無資料</span>
        </div>
      ) : (
        <div className="space-y-[20px] my-[30px]  mx-[30px]">
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

          {/* 金額總計 */}
          <div className="rounded-[6px] overflow-hidden">
            <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa] border-b border-[#e5e7eb]">
              <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>明細總計（不含運費）：</span>
              <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>8,060 元</span>
            </div>
            <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa] border-b border-[#e5e7eb]">
              <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>運費：</span>
              <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>0 元</span>
            </div>
            <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa]">
              <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>訂單總金額（含運費）：</span>
              <span className="text-[14px] text-[#0078d4] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 700 }}>8,060 元</span>
            </div>
          </div>
        </div>
      ))}

      {/* ========== OMG（ERP）訂單內容 ========== */}
      {activeTab === 'erp' && (!hasOmgOrErp ? (
        <div className="flex items-center justify-center" style={{ minHeight: '400px' }}>
          <span className="text-[14px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">查無資料</span>
        </div>
      ) : (
        <div className="space-y-[30px] mx-[30px]">
          {/* 訂單基本資訊 */}
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[24px] my-[30px] mb-[60px]">
            {([
              ['來源系統',   orderHeaderInfo?.sourceSystem    ?? '—'],
              ['訂單編號',   orderHeaderInfo?.orderNumber     ?? '—'],
              ['來源單號',   orderHeaderInfo?.sourceOrderNumber ?? '—'],
              ['訂單日期',   orderHeaderInfo?.orderDate       ?? '—'],
              ['OMG 訂單類型', orderHeaderInfo?.omgOrderType  ?? '—'],
              ['OMG 訂單狀態', orderHeaderInfo?.omgStatus     ?? '—'],
              ['OMG 訂單備註', orderHeaderInfo?.omgOrderNote  ?? '—'],
              ['法人',       orderHeaderInfo?.legalEntity     ?? '—'],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} className="flex flex-col gap-[4px]">
                <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 400 }}>{label}</span>
                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>{value}</span>
              </div>
            ))}
          </div>
          {/* 操作按鈕列 */}
          <div className="flex justify-start">
            {isEditMode && <CwButton variant="primary" appearance="filled" onClick={() => { setSelectedItemId(null); setSelectItemOrderNo(orderHeaderInfo?.orderNumber ?? 'OMG-2026-000001'); setSelectedChangeOrderType(null); setShowNewChangeOrderPopup(true); }}>＋ 新增異動單</CwButton>}
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
              { id: 'auditHistory', label: '審核歷程' },
              { id: 'apiRecords',   label: '串接紀錄' },
            ]}
            activeId={activeErpTab}
            onChange={(id) => setActiveErpTab(id as typeof activeErpTab)}
          />

          {activeErpTab === 'header' && (
            <>
              <OMGOrderHeader
                ref={headerRef}
                mode={isEditMode ? 'edit' : 'view'}
              />
              {/* 金額總計 */}
              <div className="mt-[16px] rounded-[6px] overflow-hidden">
                <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>訂單金額（未稅）：</span>
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>8,320 元</span>
                </div>
                <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>5%稅額：</span>
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>416 元</span>
                </div>
                <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>運費：</span>
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>0 元</span>
                </div>
                <div className="flex items-center justify-between px-[20px] py-[12px] bg-[#f5f7fa]">
                  <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>訂單總金額（含運費）：</span>
                  <span className="text-[14px] text-[#0078d4] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 700 }}>8,736 元</span>
                </div>
              </div>
            </>
          )}
          {activeErpTab === 'items' && <ERPOrderItems canEdit={isEditMode} />}

          {/* 【異動單內容】 */}
          <div>

            {/* 異動單內容：列表 */}
            <div>
                {activeErpTab === 'addressChange' && (
                  <CwTable
                    dataSource={allAddressChangeData}
                    columns={[
                      { key: 'cancelReason', title: '解配原因', width: '200px' },
                      { key: 'id', title: '改址單號', width: '110px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-id`) },
                      { key: 'status', title: '改址單狀態', width: '100px', render: (value: string) => {
                        const ADDRESS_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                          '已處理': { bg: '#f0f2f5', color: '#7c808c' },
                          '待處理': { bg: '#fff8e1', color: '#f59e0b' },
                          '已取消': { bg: '#fce8e8', color: '#e53935' },
                        };
                        const style = ADDRESS_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                        return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                      }},
                      { key: 'applyDate', title: '改址單日期', width: '110px' },
                      { key: 'originalOrderNo', title: '原訂單號碼', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-originalOrderNo`) },
                      { key: 'productCode', title: '改址產品料號', width: '140px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-productCode`) },
                      { key: 'productName', title: '改址產品名稱', width: '150px' },
                      { key: 'oldAddress', title: '原出貨地址', width: '180px' },
                      { key: 'oldRecipient', title: '原收件人', width: '100px' },
                      { key: 'oldMobile', title: '原手機', width: '120px' },
                      { key: 'newAddress', title: '新出貨地址', width: '180px' },
                      { key: 'newRecipient', title: '新收件人', width: '100px' },
                      { key: 'newMobile', title: '新手機', width: '120px' },
                      {
                        key: 'action',
                        title: '功能',
                        width: '80px',
                        align: 'center',
                        sticky: true,
                        render: (_, record: any) => (
                          <CwTooltip content={isEditMode ? '編輯' : '檢視'}>
                            <button onClick={() => { setSelectedChangeOrderId(record.id); const reason = allAddressChangeData.find(x => x.id === record.id)?.cancelReason ?? ''; setChangeOrderReasonCode(reason.split('_')[0]); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                              {isEditMode ? <Pencil className="w-[16px] h-[16px] text-[#7c808c]" /> : <Eye className="w-[16px] h-[16px] text-[#7c808c]" />}
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
                      { id: 'SR001', legalEntity: '81 天下', applyDate: '2025-06-03', originalOrderNo: '102862682', productCode: 'GCV00002', productName: '天下雜誌2期', remaining: '2', suspendDate: '2026-01-07', resumeDate: '2026-03-07', resumeStatus: '已核單', suspendStatus: '已核單' },
                      { id: 'SR002', legalEntity: '88 康健', applyDate: '2025-07-20', originalOrderNo: '102971345', productCode: 'CHV00003', productName: '康健雜誌3期', remaining: '4', suspendDate: '2025-11-15', resumeDate: '', resumeStatus: '', suspendStatus: '待核單' },
                    ]}
                    columns={[
                      { key: 'id', title: '止復寄單號', width: '110px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-id`) },
                      { key: 'suspendStatus', title: '止寄單狀態', width: '100px', render: (value: string) => {
                        const SUSPEND_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                          '已核單': { bg: '#e6f7ee', color: '#16a34a' },
                          '待核單': { bg: '#fff8e1', color: '#f59e0b' },
                        };
                        const style = SUSPEND_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                        return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                      }},
                      { key: 'resumeStatus', title: '復寄單狀態', width: '100px', render: (value: string) => {
                        if (!value) return null;
                        const RESUME_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                          '已核單': { bg: '#e6f7ee', color: '#16a34a' },
                          '待核單': { bg: '#fff8e1', color: '#f59e0b' },
                        };
                        const style = RESUME_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                        return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                      }},
                      { key: 'applyDate', title: '止復寄單日期', width: '120px' },
                      { key: 'originalOrderNo', title: '原訂單號碼', width: '120px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-originalOrderNo`) },
                      { key: 'productCode', title: '產品料號', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-productCode`) },
                      { key: 'productName', title: '產品名稱', width: '150px' },
                      { key: 'remaining', title: '剩餘期數', width: '90px', align: 'center' },
                      { key: 'suspendDate', title: '止寄日期', width: '110px' },
                      { key: 'resumeDate', title: '復寄日期', width: '110px' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', sticky: true, render: (_: any, record: any) => (
                        <CwTooltip content={isEditMode ? '編輯' : '檢視'}>
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setSuspendResumeSubTab('suspend'); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            {isEditMode ? <Pencil className="w-[16px] h-[16px] text-[#7c808c]" /> : <Eye className="w-[16px] h-[16px] text-[#7c808c]" />}
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
                      { id: 'CO001', legalEntity: '81 天下', applyDate: '2025-08-01', originalOrderNo: '102862682', cancelMethod: '全退', amount: '2,500', refundMethod: '原路退回', pauseProcess: '否', pauseReason: '', status: '已完成', financeDate: '2025-08-05', financeRemark: '' },
                      { id: 'CO002', legalEntity: '88 康健', applyDate: '2025-10-12', originalOrderNo: '102971345', cancelMethod: '部分退', amount: '1,980', refundMethod: '匯款', pauseProcess: '是', pauseReason: '客戶確認中', status: '待核准', financeDate: '', financeRemark: '' },
                      { id: 'CO003', legalEntity: '82 親子', applyDate: '2025-11-05', originalOrderNo: '103045678', cancelMethod: '全退', amount: '3,200', refundMethod: '信用卡退刷', pauseProcess: '否', pauseReason: '', status: '已退款', financeDate: '2025-11-10', financeRemark: '已確認退款' },
                      { id: 'CO004', legalEntity: '81 天下', applyDate: '2025-12-01', originalOrderNo: '103112233', cancelMethod: '全退', amount: '890', refundMethod: '原路退回', pauseProcess: '否', pauseReason: '', status: '已處理', financeDate: '2025-12-03', financeRemark: '' },
                    ]}
                    columns={[
                      { key: 'id', title: '退訂單號', width: '100px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-id`) },
                      { key: 'status', title: '退訂單狀態', width: '100px', render: (value: string) => {
                        const CANCEL_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                          '已完成': { bg: '#e6f7ee', color: '#16a34a' },
                          '已退款': { bg: '#e3f2fd', color: '#0078d4' },
                          '已處理': { bg: '#f0f2f5', color: '#7c808c' },
                          '待核准': { bg: '#fff8e1', color: '#f59e0b' },
                        };
                        const style = CANCEL_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                        return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                      }},
                      { key: 'applyDate', title: '退訂單日期', width: '110px' },
                      { key: 'originalOrderNo', title: '原訂單號碼', width: '120px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-originalOrderNo`) },
                      { key: 'cancelMethod', title: '訂單退法', width: '90px', render: (value: string) => {
                        const CANCEL_METHOD_STYLES: Record<string, { bg: string; color: string }> = {
                          '全退':   { bg: '#fce8e8', color: '#e53935' },
                          '部分退': { bg: '#fff8e1', color: '#f59e0b' },
                        };
                        const style = CANCEL_METHOD_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                        return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                      }},
                      { key: 'amount', title: '退訂金額', width: '90px', align: 'right' },
                      { key: 'refundMethod', title: '退款方式', width: '110px' },
                      { key: 'pauseProcess', title: '暫停處理', width: '80px', align: 'center', render: (value: string) =>
                        value === '是'
                          ? <Check className="w-[18px] h-[18px] text-[#16a34a] mx-auto" />
                          : <X className="w-[18px] h-[18px] text-[#e53935] mx-auto" />
                      },
                      { key: 'pauseReason', title: '暫止原因', width: '100px' },
                      { key: 'financeDate', title: '財務處理日', width: '110px' },
                      { key: 'financeRemark', title: '財務處理備註', width: '150px' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', sticky: true, render: (_: any, record: any) => (
                        <CwTooltip content={isEditMode ? '編輯' : '檢視'}>
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            {isEditMode ? <Pencil className="w-[16px] h-[16px] text-[#7c808c]" /> : <Eye className="w-[16px] h-[16px] text-[#7c808c]" />}
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
                        legalEntity: '81 天下',
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
                      { key: 'id', title: '改出貨方式單號', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-id`) },
                      { key: 'status', title: '改出貨方式單狀態', width: '140px', render: (value: string) => {
                        const DELIVERY_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                          '已處理': { bg: '#f0f2f5', color: '#7c808c' },
                          '待處理': { bg: '#fff8e1', color: '#f59e0b' },
                          '已取消': { bg: '#fce8e8', color: '#e53935' },
                        };
                        const style = DELIVERY_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                        return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                      }},
                      { key: 'applyDate', title: '改出貨方式單日期', width: '130px' },
                      { key: 'originalOrderNo', title: '原訂單號碼', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-originalOrderNo`) },
                      { key: 'productCode', title: '產品料號', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-productCode`) },
                      { key: 'productName', title: '產品名稱', width: '150px' },
                      { key: 'oldShipMethod', title: '原出貨方式', width: '110px' },
                      { key: 'newShipMethod', title: '新出貨方式', width: '110px' },
                      { key: 'amount', title: '金額', width: '90px', align: 'right' },
                      { key: 'action', title: '功能', width: '80px', align: 'center', sticky: true, render: (_: any, record: any) => (
                        <CwTooltip content={isEditMode ? '編輯' : '檢視'}>
                          <button onClick={() => { setSelectedChangeOrderId(record.id); setShowChangeOrderDetail(true); }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                            {isEditMode ? <Pencil className="w-[16px] h-[16px] text-[#7c808c]" /> : <Eye className="w-[16px] h-[16px] text-[#7c808c]" />}
                          </button>
                        </CwTooltip>
                      )}
                    ]}
                    rowKey="id"
                  />
                )}

                {activeErpTab === 'returnResend' && (
                  <div className="space-y-[16px]">
                    {/* 退件補寄 */}
                    <div>
                      <div className="flex items-center gap-[8px] mb-[8px] px-[2px]">
                        <span className="text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>退件補寄</span>
                      </div>
                      <CwTable
                        dataSource={allReturnResendData}
                        columns={[
                              { key: 'id', title: '退件補寄單號', width: '110px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-id`) },
                          { key: 'applyDate', title: '退件補寄單日期', width: '130px' },
                          { key: 'shipCustomerCode', title: '出貨客編', width: '100px' },
                          { key: 'shipCustomerName', title: '出貨客戶', width: '100px' },
                          { key: 'shipRecipient', title: '出貨收件人', width: '100px' },
                          { key: 'productCode', title: '產品料號', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-productCode`) },
                          { key: 'productName', title: '產品名稱', width: '150px' },
                          { key: 'publishReturnReason', title: '發行出貨退件原因', width: '140px' },
                          { key: 'resendReason', title: '補寄原因', width: '100px' },
                          { key: 'qty', title: '數量', width: '60px', align: 'center' },
                          { key: 'status', title: '補寄單狀態', width: '100px', render: (value: string) => {
                            const RESEND_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                              '已補寄': { bg: '#e6f7ee', color: '#16a34a' },
                              '待補寄': { bg: '#fff8e1', color: '#f59e0b' },
                            };
                            const style = RESEND_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                            return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                          }},
                          { key: 'shipAddress', title: '出貨地址', width: '200px' },
                          { key: 'action', title: '功能', width: '80px', align: 'center', sticky: true, render: (_: any, record: any) => (
                            <CwTooltip content={isEditMode ? '編輯' : '檢視'}>
                              <button onClick={() => {
                                setSelectedChangeOrderId(record.id);
                                const found = allReturnResendData.find(r => r.id === record.id);
                                const hasReturn = !!found?.returnReason;
                                const hasResend = !!found?.resendReason;
                                setReturnResendSubType(hasReturn && hasResend ? 'both' : hasResend ? 'resend-only' : 'return-only');
                                setShowChangeOrderDetail(true);
                              }} className="w-[32px] h-[32px] rounded-full border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                                {isEditMode ? <Pencil className="w-[16px] h-[16px] text-[#7c808c]" /> : <Eye className="w-[16px] h-[16px] text-[#7c808c]" />}
                              </button>
                            </CwTooltip>
                          )}
                        ]}
                        rowKey="id"
                      />
                    </div>
                    {/* 補寄出貨資訊 */}
                    <div>
                      <div className="flex items-center gap-[8px] mb-[8px] px-[2px]">
                        <span className="text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>補寄出貨資訊</span>
                      </div>
                      <CwTable
                        dataSource={allReturnResendData}
                        columns={[
                          { key: 'originalOrderNo', title: '訂單單號', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-originalOrderNo`) },
                          { key: 'productCode', title: '產品料號', width: '130px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-productCode`) },
                          { key: 'productName', title: '產品名稱', width: '150px' },
                          { key: 'dispatchDate', title: '撥貨日期', width: '110px' },
                          { key: 'actualShipDate', title: '實際出貨日期', width: '120px' },
                          { key: 'shipMethod', title: '出貨方式', width: '130px' },
                          { key: 'trackingNo', title: '追蹤號碼', width: '130px' },
                          { key: 'outboundNo', title: '出庫單號', width: '140px', render: (value: string, record: any) => renderWithCopy(value, `${record.id}-outboundNo`) },
                          { key: 'batchNo', title: '批次號碼', width: '110px' },
                          { key: 'omsProgress', title: 'OMS進度', width: '90px', align: 'center', render: (val: any) => <OmsProgressTag code={val} /> },
                          { key: 'omsExecStatus', title: 'OMS執行狀態', width: '110px', render: (value: string) => {
                            const OMS_EXEC_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
                              '成功':   { bg: '#e6f7ee', color: '#16a34a' },
                              '出貨完成': { bg: '#e6f7ee', color: '#16a34a' },
                              '廠商出貨': { bg: '#e3f2fd', color: '#0078d4' },
                              '等待中': { bg: '#f0f2f5', color: '#7c808c' },
                              '等待':   { bg: '#f0f2f5', color: '#7c808c' },
                            };
                            const style = OMS_EXEC_STATUS_STYLES[value] ?? { bg: '#f0f2f5', color: '#7c808c' };
                            return <span className="inline-block px-[8px] py-[2px] rounded-[4px] text-[12px] whitespace-nowrap" style={{ background: style.bg, color: style.color, fontWeight: 500 }}>{value}</span>;
                          }},
                          { key: 'omsChangeDate', title: 'OMS異動日', width: '110px' },
                        ]}
                        rowKey="id"
                      />
                    </div>
                  </div>
                )}

                {activeErpTab === 'shipInfo' && <ShipInfoTab />}
                {activeErpTab === 'auditHistory' && <AuditHistoryTab />}
                {activeErpTab === 'apiRecords'   && <ApiRecordsTab />}
              </div>
            </div>

          {/* 底部操作按鈕列 */}
          <div className="flex items-center justify-between border-t border-[#c4c9d3] pt-[16px]">
            {onClose && (
              <CwButton variant="primary" appearance="outlined" onClick={onClose}>
                {isEditMode ? '取消' : '返回'}
              </CwButton>
            )}
            <div className="flex items-center gap-[8px]">
              {orderHeaderInfo?.omgStatus === '輸入' ? (
                <>
                  <CwButton variant="primary" appearance="outlined">暫存</CwButton>
                  <CwButton variant="primary" appearance="filled">建立訂單(核單)</CwButton>
                </>
              ) : (
                <CwButton variant="primary" appearance="outlined" disabled={!isEditMode} onClick={() => { headerRef.current?.validate(); }}>儲存</CwButton>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* 改址單 Popup */}
      {(() => {
        const rec = allAddressChangeData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwPopup
            open={showChangeOrderDetail && activeErpTab === 'addressChange'}
            onClose={() => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); }}
            title={isCreatingChangeOrder ? (CHANGE_TYPE_TITLE[selectedChangeOrderType ?? ''] ?? '新增改址單') : '訂單改址'}
            size="fit"
            closableByMask={false}
            buttons={isEditMode ? [
              { label: '取消', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
              { label: '儲存', variant: 'primary', appearance: 'filled', onClick: () => {} },
            ] : [
              { label: '關閉', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
            ]}
          >
            {(rec !== undefined || isCreatingChangeOrder) && (
              <div className="space-y-[16px]">

                {/* 原訂閱單號碼 */}
                <PopupSelectField
                  label="原訂閱單號碼"
                  value={isCreatingChangeOrder ? selectItemOrderNo : (rec?.originalOrderNo ?? '')}
                  onChange={(v) => setSelectItemOrderNo(v)}
                  options={MOCK_ORIGINAL_ORDER_OPTIONS}
                  disabled={!isCreatingChangeOrder}
                  popupTitle="選擇原訂閱單"
                />

                {/* 固定資訊區 */}
                <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-3">
                  <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>改址基本資訊</p>
                  <div className="grid grid-cols-2 gap-x-[24px] gap-y-0">
                    {/* 左欄（全灰底 = disabled） */}
                    <div className="space-y-0 divide-y divide-[#e4e7ec]">
                      {[
                        { label: '改址單號碼', value: rec?.id ?? '' },
                        { label: '訂單客戶編號', value: rec?.customerCode ?? '' },
                        { label: '訂單客戶名稱', value: rec?.customerName ?? '' },
                        { label: '訂單客戶聯絡人', value: rec?.customerContact ?? '' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                          <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                          <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    {/* 右欄（改址單狀態/解配原因/備註 白底；核單日期灰底） */}
                    <div className="space-y-0 divide-y divide-[#e4e7ec]">
                      <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[80px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>改址單狀態</span>
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.status ?? ''}</span>
                      </div>
                      <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[80px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>解配原因</span>
                        <div className="flex-1">
                          <CwSelect
                            value={changeOrderReasonCode}
                            options={CANCEL_REASON_OPTIONS}
                            onChange={(value) => setChangeOrderReasonCode(value as string)}
                            disabled={!isEditMode && !isCreatingChangeOrder}
                          />
                        </div>
                      </div>
                      <div className="flex items-start min-h-[72px] py-[6px] gap-[8px]">
                        <span className="w-[80px] shrink-0 text-[12px] text-[#7c808c] pt-[4px]" style={{ fontWeight: 400 }}>備註</span>
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <div className="flex-1">
                            <CwInput
                              value={isCreatingChangeOrder ? addressChangeRemark : (rec?.remark ?? '')}
                              onChange={(e) => setAddressChangeRemark(e.target.value)}
                            />
                          </div>
                        ) : (
                          <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[60px] leading-[20px] whitespace-pre-wrap" style={{ fontWeight: 400 }}>{rec?.remark ?? ''}</span>
                        )}
                      </div>
                      <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[80px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>核單日期</span>
                        <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.approvalDate ?? ''}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 原出貨 → 新出貨 流程 */}
                {(() => {
                  const canEdit = isEditMode || isCreatingChangeOrder;
                  const code = changeOrderReasonCode;

                  if (code === '04' || code === '05') {
                    const isShipRemark = code === '04';
                    const oldLabel = isShipRemark ? '原出貨備註' : '原標籤備註';
                    const newLabel = isShipRemark ? '新出貨備註' : '新標籤備註';
                    return (
                      <div>
                        {!isCreatingChangeOrder && (
                          <>
                            <div className="rounded-t-[10px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 pt-3 pb-4 space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#7c808c] text-white text-[10px] font-[600] shrink-0">舊</span>
                                <p className="text-sm text-[#4b5563]" style={{ fontWeight: 700 }}>{oldLabel}</p>
                              </div>
                              <textarea
                                className="w-full text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[6px] min-h-[72px] leading-[20px] resize-none outline-none"
                                style={{ fontWeight: 400 }}
                                value={rec?.remark ?? ''}
                                disabled
                                readOnly
                              />
                            </div>
                            <div className="flex items-center justify-center border-l border-r border-[#e4e7ec] bg-white py-2">
                              <div className="flex flex-col items-center">
                                <div className="w-px h-2 bg-[#c4c9d3]" />
                                <ArrowDown className="w-4 h-4 text-[#0078d4]" />
                                <div className="w-px h-2 bg-[#c4c9d3]" />
                              </div>
                            </div>
                          </>
                        )}
                        <div className={isCreatingChangeOrder ? 'rounded-[10px] border border-[#bfdbfe] bg-[#f0f7ff] px-4 pt-3 pb-4 space-y-3' : 'rounded-b-[10px] border border-[#bfdbfe] bg-[#f0f7ff] px-4 pt-3 pb-4 space-y-3'}>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#0078d4] text-white text-[10px] font-[600] shrink-0">新</span>
                            <p className="text-sm text-[#1e3a8a]" style={{ fontWeight: 700 }}>{newLabel}</p>
                          </div>
                          <textarea
                            className={`w-full text-[13px] border border-[#c4c9d3] rounded-[4px] px-[8px] py-[6px] min-h-[72px] leading-[20px] resize-none outline-none ${canEdit ? 'bg-white text-[#1c1c1c]' : 'bg-[#f0f2f5] text-[#7c808c]'}`}
                            style={{ fontWeight: 400 }}
                            defaultValue=""
                            disabled={!canEdit}
                          />
                        </div>
                      </div>
                    );
                  }

                  // codes 01 / 02 / 03 / '' — address / recipient / mobile layout
                  const recipientEditable = canEdit && (code === '01' || code === '03');
                  const mobileEditable = canEdit && code === '02';
                  const addressEditable = canEdit && code === '01';
                  return (
                    <div>
                      {!isCreatingChangeOrder && (
                        <>
                          <div className="rounded-t-[10px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 pt-3 pb-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#7c808c] text-white text-[10px] font-[600] shrink-0">舊</span>
                              <p className="text-sm font-[600] text-[#4b5563]" style={{ fontWeight: 700 }}>原出貨資訊</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <CwInput label="原出貨收件人" value={rec?.oldRecipient ?? ''} disabled readOnly />
                              <CwInput label="原出貨手機" value={rec?.oldMobile ?? ''} disabled readOnly />
                              <div className="col-span-2 flex items-end gap-[8px]">
                                <div className="flex-1">
                                  <CwInput label="原出貨地址" value={rec?.oldAddress ?? ''} disabled readOnly />
                                </div>
                                <CwTooltip content={copiedAddress ? '已複製！' : '複製地址'}>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(rec?.oldAddress ?? '');
                                      setCopiedAddress(true);
                                      setTimeout(() => setCopiedAddress(false), 2000);
                                    }}
                                    className="shrink-0 w-[36px] h-[36px] rounded-[6px] border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors mb-[1px]"
                                  >
                                    {copiedAddress ? <Check className="w-[16px] h-[16px] text-[#16a34a]" /> : <Copy className="w-[16px] h-[16px] text-[#7c808c]" />}
                                  </button>
                                </CwTooltip>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center border-l border-r border-[#e4e7ec] bg-white py-2">
                            <div className="flex flex-col items-center">
                              <div className="w-px h-2 bg-[#c4c9d3]" />
                              <ArrowDown className="w-4 h-4 text-[#0078d4]" />
                              <div className="w-px h-2 bg-[#c4c9d3]" />
                            </div>
                          </div>
                        </>
                      )}
                      <div className={isCreatingChangeOrder ? 'rounded-[10px] border border-[#bfdbfe] bg-[#f0f7ff] px-4 pt-3 pb-4 space-y-3' : 'rounded-b-[10px] border border-[#bfdbfe] bg-[#f0f7ff] px-4 pt-3 pb-4 space-y-3'}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#0078d4] text-white text-[10px] font-[600] shrink-0">新</span>
                          <p className="text-sm font-[600] text-[#1e3a8a]" style={{ fontWeight: 700 }}>新出貨資訊</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <PopupSelectField
                            label="新出貨收件人"
                            value={isCreatingChangeOrder ? addressChangeNew.recipient : (rec?.newRecipient ?? '')}
                            onChange={(v) => setAddressChangeNew(prev => ({ ...prev, recipient: v }))}
                            options={MOCK_RECIPIENT_OPTIONS}
                            disabled={!recipientEditable}
                          />
                          <PopupSelectField
                            label="新出貨手機"
                            value={isCreatingChangeOrder ? addressChangeNew.mobile : (rec?.newMobile ?? '')}
                            onChange={(v) => setAddressChangeNew(prev => ({ ...prev, mobile: v }))}
                            options={MOCK_MOBILE_OPTIONS}
                            disabled={!mobileEditable}
                          />
                          <div className="col-span-2">
                            <PopupSelectField
                              label="新出貨地址"
                              value={isCreatingChangeOrder ? addressChangeNew.address : (rec?.newAddress ?? '')}
                              onChange={(v) => setAddressChangeNew(prev => ({ ...prev, address: v }))}
                              options={MOCK_ADDRESS_OPTIONS}
                              disabled={!addressEditable}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              </div>
            )}
          </CwPopup>
        );
      })()}

      {/* 止復寄單 Popup */}
      {(() => {
        const rec = allSuspendResumeData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwPopup
            open={showChangeOrderDetail && activeErpTab === 'suspendResume'}
            onClose={() => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); }}
            title={isCreatingChangeOrder ? (CHANGE_TYPE_TITLE[selectedChangeOrderType ?? ''] ?? '新增止復寄單') : `訂單止復寄 - ${selectedChangeOrderId}`}
            size="fit"
            closableByMask={false}
            buttons={isEditMode ? [
              { label: '取消', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
              { label: '儲存', variant: 'primary', appearance: 'filled', onClick: () => {} },
            ] : [
              { label: '關閉', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
            ]}
          >
            {(rec !== undefined || isCreatingChangeOrder) && (
              <div className="space-y-[16px]">

                {/* 原訂閱單號碼 */}
                <PopupSelectField
                  label="原訂閱單號碼"
                  value={rec?.originalOrderNo ?? ''}
                  options={[]}
                  disabled={!isCreatingChangeOrder}
                  onChange={() => {}}
                  popupTitle="選擇原訂單"
                  searchPlaceholder="搜尋訂單號碼"
                />

                <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-3">
                  <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>止復寄基本資訊</p>
                  <div className="grid grid-cols-2 gap-x-[24px]">
                    {/* 左欄 */}
                    <div className="divide-y divide-[#e4e7ec]">
                      <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>止復寄單號碼</span>
                        <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.id ?? ''}</span>
                      </div>
                      <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原訂單號碼</span>
                        <div className="flex-1">
                          <PopupSelectField
                            value={rec?.originalOrderNo ?? ''}
                            options={[]}
                            disabled={!isCreatingChangeOrder}
                            onChange={() => {}}
                            popupTitle="選擇原訂單"
                            searchPlaceholder="搜尋訂單號碼"
                          />
                        </div>
                      </div>
                      {([
                        { label: '訂單客戶編號', value: rec?.customerCode ?? '' },
                        { label: '訂單客戶名稱', value: rec?.customerName ?? '' },
                        { label: '付款客戶編號', value: rec?.payerCode ?? '' },
                        { label: '付款客戶名稱', value: rec?.payerName ?? '' },
                      ] as { label: string; value: string }[]).map(({ label, value }) => (
                        <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                          <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                          <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    {/* 右欄 */}
                    <div className="divide-y divide-[#e4e7ec]">
                      {([
                        { label: '訂單日期', value: rec?.orderDate ?? '' },
                        { label: '出貨客戶名稱', value: rec?.shipCustomerName ?? '' },
                        { label: '出貨客戶編號', value: rec?.shipCustomerCode ?? '' },
                        { label: '出貨地址', value: rec?.shipAddress ?? '' },
                      ] as { label: string; value: string }[]).map(({ label, value }) => (
                        <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                          <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                          <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 止寄 / 復寄 Tab */}
                <div>
                  <CwTab
                    items={[
                      { id: 'suspend', label: '止寄' },
                      { id: 'resume', label: '復寄' },
                    ]}
                    activeId={suspendResumeSubTab}
                    onChange={(id) => setSuspendResumeSubTab(id as 'suspend' | 'resume')}
                  />

                  <div className="mt-[16px]">
                    {suspendResumeSubTab === 'suspend' && (() => {
                      const lines: SuspendResumeLine[] = selectedChangeOrderId
                        ? (SUSPEND_RESUME_LINES[selectedChangeOrderId] ?? [])
                        : mockCurrentOrderItems.map((item, index) => ({
                            seq: index + 1,
                            productCode: item.productCode,
                            productName: item.productName,
                            subscribeFrom: '01-APR-2026',
                            subscribeTo: '30-AUG-2028',
                            remaining: 58,
                            suspendPeriodNum: '',
                            suspendPeriodDate: '',
                            suspendReason: '',
                            suspendStatus: '',
                          }));
                      const canEdit = isEditMode || isCreatingChangeOrder;
                      return (
                        <CwTable
                          dataSource={lines}
                          rowKey="seq"
                          columns={[
                            { key: 'seq', title: '原行號', width: '60px', align: 'center' },
                            { key: 'productCode', title: '產品料號', width: '110px' },
                            { key: 'productName', title: '產品名稱', width: '150px' },
                            { key: 'subscribeFrom', title: '訂閱起期', width: '100px', render: (v: string) => formatOracleDate(v) },
                            { key: 'subscribeTo', title: '訂閱迄期', width: '100px', render: (v: string) => formatOracleDate(v) },
                            { key: 'remaining', title: '剩餘期數', width: '80px', align: 'center' },
                            {
                              key: 'suspendPeriodNum',
                              title: '止寄期數/日期',
                              width: '160px',
                              render: (_: string, record: SuspendResumeLine) => {
                                const rowKey = `${selectedChangeOrderId ?? 'new'}-${record.seq}`;
                                const currentNum = suspendRowEdits[rowKey]?.suspendPeriodNum ?? record.suspendPeriodNum;
                                const currentDate = suspendRowEdits[rowKey]?.suspendPeriodDate ?? record.suspendPeriodDate;
                                return (
                                  <div className="flex flex-col gap-[6px]">
                                    <PopupSelectField
                                      value={currentNum}
                                      options={SUSPEND_PERIOD_NUM_OPTIONS.map(num => ({ code: num, name: num }))}
                                      placeholder="期數"
                                      disabled={!canEdit}
                                      onChange={(val) => setSuspendRowEdits(prev => {
                                        const existing = prev[rowKey] ?? { suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '' };
                                        return { ...prev, [rowKey]: { ...existing, suspendPeriodNum: val, suspendPeriodDate: PERIOD_NUM_TO_DATE[val] ?? existing.suspendPeriodDate } };
                                      })}
                                    />
                                    <PopupSelectField
                                      value={currentDate}
                                      options={SUSPEND_PERIOD_DATE_OPTIONS.map(date => ({ code: date, name: date }))}
                                      placeholder="日期"
                                      disabled={!canEdit}
                                      onChange={(val) => setSuspendRowEdits(prev => {
                                        const existing = prev[rowKey] ?? { suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '' };
                                        return { ...prev, [rowKey]: { ...existing, suspendPeriodDate: val, suspendPeriodNum: PERIOD_DATE_TO_NUM[val] ?? existing.suspendPeriodNum } };
                                      })}
                                    />
                                  </div>
                                );
                              },
                            },
                            {
                              key: 'suspendReason',
                              title: '止寄原因',
                              width: '220px',
                              render: (value: string, record: SuspendResumeLine) => {
                                const rowKey = `${selectedChangeOrderId ?? 'new'}-${record.seq}`;
                                const currentValue = suspendRowEdits[rowKey]?.suspendReason ?? value;
                                return (
                                  <CwSelect
                                    value={currentValue}
                                    options={SUSPEND_REASON_OPTIONS}
                                    placeholder="選擇原因"
                                    disabled={!canEdit}
                                    onChange={(val) => setSuspendRowEdits(prev => {
                                      const existing = prev[rowKey] ?? { suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '' };
                                      return { ...prev, [rowKey]: { ...existing, suspendReason: val as string } };
                                    })}
                                  />
                                );
                              },
                            },
                            { key: 'suspendStatus', title: '止寄狀態', width: '90px' },
                          ]}
                        />
                      );
                    })()}

                    {suspendResumeSubTab === 'resume' && (() => {
                      const lines: SuspendResumeLine[] = selectedChangeOrderId
                        ? (SUSPEND_RESUME_LINES[selectedChangeOrderId] ?? [])
                        : mockCurrentOrderItems.map((item, index) => ({
                            seq: index + 1,
                            productCode: item.productCode,
                            productName: item.productName,
                            subscribeFrom: '01-APR-2026',
                            subscribeTo: '30-AUG-2028',
                            remaining: 58,
                            suspendPeriodNum: '',
                            suspendPeriodDate: '',
                            suspendReason: '',
                            suspendStatus: '',
                          }));
                      const canEdit = isEditMode || isCreatingChangeOrder;

                      return (
                        <CwTable
                          dataSource={lines}
                          rowKey="seq"
                          columns={[
                            { key: 'seq', title: '原行號', width: '60px', align: 'center' },
                            { key: 'productCode', title: '產品料號', width: '110px' },
                            { key: 'productName', title: '產品名稱', width: '150px' },
                            { key: 'subscribeFrom', title: '訂閱起期', width: '100px', render: (v: string) => formatOracleDate(v) },
                            { key: 'subscribeTo', title: '訂閱迄期', width: '100px', render: (v: string) => formatOracleDate(v) },
                            { key: 'remaining', title: '剩餘期數', width: '80px', align: 'center' },
                            {
                              key: 'resumePeriodNum',
                              title: '復寄期數/日期',
                              width: '160px',
                              render: (_: any, record: SuspendResumeLine) => {
                                const rowKey = `resume-${selectedChangeOrderId ?? 'new'}-${record.seq}`;
                                const currentNum = suspendRowEdits[rowKey]?.suspendPeriodNum ?? '';
                                const currentDate = suspendRowEdits[rowKey]?.suspendPeriodDate ?? '';
                                return (
                                  <div className="flex flex-col gap-[6px]">
                                    <PopupSelectField
                                      value={currentNum}
                                      options={SUSPEND_PERIOD_NUM_OPTIONS.map(num => ({ code: num, name: num }))}
                                      placeholder="期數"
                                      onChange={(val) => setSuspendRowEdits(prev => {
                                        const existing = prev[rowKey] ?? { suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '' };
                                        return { ...prev, [rowKey]: { ...existing, suspendPeriodNum: val, suspendPeriodDate: PERIOD_NUM_TO_DATE[val] ?? existing.suspendPeriodDate } };
                                      })}
                                    />
                                    <PopupSelectField
                                      value={currentDate}
                                      options={SUSPEND_PERIOD_DATE_OPTIONS.map(date => ({ code: date, name: date }))}
                                      placeholder="日期"
                                      onChange={(val) => setSuspendRowEdits(prev => {
                                        const existing = prev[rowKey] ?? { suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '' };
                                        return { ...prev, [rowKey]: { ...existing, suspendPeriodDate: val, suspendPeriodNum: PERIOD_DATE_TO_NUM[val] ?? existing.suspendPeriodNum } };
                                      })}
                                    />
                                  </div>
                                );
                              },
                            },
                            { key: 'resumeStatus', title: '復寄狀態', width: '90px', render: () => '' },
                            {
                              key: 'paused',
                              title: '暫止',
                              width: '60px',
                              align: 'center',
                              render: (_: any, record: SuspendResumeLine) => {
                                const rowKey = `resume-${selectedChangeOrderId ?? 'new'}-${record.seq}`;
                                const paused = suspendRowEdits[rowKey]?.paused ?? false;
                                return (
                                  <input
                                    type="checkbox"
                                    checked={paused}
                                    disabled
                                    onChange={(e) => setSuspendRowEdits(prev => {
                                      const existing = prev[rowKey] ?? { suspendPeriodNum: '', suspendPeriodDate: '', suspendReason: '' };
                                      return { ...prev, [rowKey]: { ...existing, paused: e.target.checked } };
                                    })}
                                    className="w-[15px] h-[15px] cursor-not-allowed accent-[#0078d4]"
                                  />
                                );
                              },
                            },
                            { key: 'resumeApprovalDate', title: '復寄核單日期', width: '110px', render: () => '' },
                          ]}
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </CwPopup>
        );
      })()}

      {/* 退訂單 Popup */}
      {(() => {
        const cancelShipItems: Record<string, { seq: number; refundMethod: string; productCode: string; productName: string; shipper: string; originalOrderNo: string; lineNo: string; returnQty: number; unitPrice: number; discount: number; unitSalePrice: number; salesReturnAmount: number; returnReason: string; returnDesc: string }[]> = {
          CO001: [
            { seq: 1, refundMethod: '不退貨不退款', productCode: 'BK10001', productName: '小行星偵探解謎1-5套書', shipper: '發行', originalOrderNo: '50200001', lineNo: '64117140', returnQty: 0, unitPrice: 650, discount: 52, unitSalePrice: 315, salesReturnAmount: 315, returnReason: '', returnDesc: '' },
            { seq: 2, refundMethod: '不退貨不退款', productCode: 'BK10002', productName: '小行星偵探解謎6-10套書', shipper: '發行', originalOrderNo: '50200001', lineNo: '64117141', returnQty: 0, unitPrice: 650, discount: 52, unitSalePrice: 315, salesReturnAmount: 315, returnReason: '', returnDesc: '' },
            { seq: 3, refundMethod: '不退貨不退款', productCode: 'DU20001', productName: '【法國Maped】國民三角發', shipper: '發行', originalOrderNo: '50200001', lineNo: '64117127', returnQty: 0, unitPrice: 120, discount: 10, unitSalePrice: 108, salesReturnAmount: 108, returnReason: '', returnDesc: '' },
            { seq: 4, refundMethod: '不退貨不退款', productCode: 'DK30001', productName: '小行星樂樂造型包', shipper: '發行', originalOrderNo: '50200001', lineNo: '64117142', returnQty: 0, unitPrice: 599, discount: 100, unitSalePrice: 0, salesReturnAmount: 0, returnReason: '', returnDesc: '' },
          ],
          CO002: [],
          CO003: [],
          CO004: [],
        };
        const cancelSubscriptionItems: Record<string, { seq: number; productCode: string; productName: string; startPeriod: string; startDate: string; endPeriod: string; endDate: string }[]> = {
          CO001: [
            { seq: 1, productCode: 'GHV00004', productName: '康健雜誌4期', startPeriod: '202501', startDate: '2025-01-01', endPeriod: '202512', endDate: '2025-12-31' },
          ],
          CO002: [],
          CO003: [],
          CO004: [],
        };
        const cancelProducts: Record<string, { seq: number; productCode: string; productName: string }[]> = {
          CO001: [
            { seq: 1, productCode: 'GHV00004', productName: '康健雜誌4期' },
            { seq: 2, productCode: 'GH202505110', productName: '(特刊110)腸壽力' },
          ],
          CO002: [{ seq: 1, productCode: 'CHV00003', productName: '康健雜誌3期' }],
          CO003: [{ seq: 1, productCode: 'PCK00010', productName: '親子天下10期' }],
          CO004: [{ seq: 1, productCode: 'GCV00001', productName: '天下雜誌 1 年期（26 期）' }],
        };
        const cancelData = [
          { id: 'CO001', originalOrderNo: '102862682', orderDate: '15-JUL-2025', cancelMethod: '訂閱單退訂', cancelReason: '3202_91_(廠商)取消單', remark: '91退訂日 20250616', discountMail: '', newOrderNo: '', fullReadBenefit: '', orderCustomerCode: 'CW1679128', orderCustomerName: 'JEFF', shipCustomerCode: 'CW1679128', shipCustomerName: 'JEFF', payerCode: 'CW1679128', payerName: 'JEFF 股份有限公司', invoiceCustomerCode: 'CW1679128', invoiceCustomerName: 'JEFF 股份有限公司', invoiceMethod: '4月結淨額', cancelOrderNo: '102862733', sourceOrderNo: '102862682-01', orderType: 'CW退訂退貨單', status: '已核單', channelCode: '天下網路書店', paymentMethod: '2應收票據', pauseProcess: '', pauseReason: '', approvalDate: '15-JUL-2025', prepaidBalance: '10', internalMagazineFee: '0', giftFee: '', externalMagazineFee: '', activityFee: '', subscriptionRefund: '0', orderCancelRefund: '0', refundMethod: '', bankBranch: '', accountName: '', accountAddress: '' },
          { id: 'CO002', originalOrderNo: '102971345', orderDate: '12-OCT-2025', cancelMethod: '部分退', cancelReason: '重複訂購', remark: '', discountMail: '', newOrderNo: '', fullReadBenefit: '', orderCustomerCode: 'CW1234567', orderCustomerName: '李小華', shipCustomerCode: 'CW1234567', shipCustomerName: '李小華', payerCode: 'CW1234567', payerName: '李小華', invoiceCustomerCode: 'CW1234567', invoiceCustomerName: '李小華', invoiceMethod: '月結', cancelOrderNo: '102971346', sourceOrderNo: '102971345-01', orderType: 'CW退訂退貨單', status: '待核單', channelCode: '康健網路書店', paymentMethod: '1現金', pauseProcess: '是', pauseReason: '客戶確認中', approvalDate: '', prepaidBalance: '', internalMagazineFee: '', giftFee: '', externalMagazineFee: '', activityFee: '', subscriptionRefund: '', orderCancelRefund: '', refundMethod: '', bankBranch: '', accountName: '', accountAddress: '' },
          { id: 'CO003', originalOrderNo: '103045678', orderDate: '05-NOV-2025', cancelMethod: '全退', cancelReason: '預算考量', remark: '', discountMail: '', newOrderNo: '', fullReadBenefit: '', orderCustomerCode: 'CW9876543', orderCustomerName: '張美玲', shipCustomerCode: 'CW9876543', shipCustomerName: '張美玲', payerCode: 'CW9876543', payerName: '張美玲', invoiceCustomerCode: 'CW9876543', invoiceCustomerName: '張美玲', invoiceMethod: '月結', cancelOrderNo: '103045679', sourceOrderNo: '103045678-01', orderType: 'CW退訂退貨單', status: '已退款', channelCode: '親子天下官網', paymentMethod: '3信用卡', pauseProcess: '', pauseReason: '', approvalDate: '10-NOV-2025', prepaidBalance: '', internalMagazineFee: '', giftFee: '', externalMagazineFee: '', activityFee: '', subscriptionRefund: '', orderCancelRefund: '', refundMethod: '', bankBranch: '', accountName: '', accountAddress: '' },
          { id: 'CO004', originalOrderNo: '103112233', orderDate: '01-DEC-2025', cancelMethod: '全退', cancelReason: '搬家無法收件', remark: '', discountMail: '', newOrderNo: '', fullReadBenefit: '', orderCustomerCode: 'CW1112233', orderCustomerName: '王大明', shipCustomerCode: 'CW1112233', shipCustomerName: '王大明', payerCode: 'CW1112233', payerName: '王大明', invoiceCustomerCode: 'CW1112233', invoiceCustomerName: '王大明', invoiceMethod: '月結', cancelOrderNo: '103112234', sourceOrderNo: '103112233-01', orderType: 'CW退訂退貨單', status: '已處理', channelCode: '天下網路書店', paymentMethod: '2應收票據', pauseProcess: '', pauseReason: '', approvalDate: '03-DEC-2025', prepaidBalance: '', internalMagazineFee: '', giftFee: '', externalMagazineFee: '', activityFee: '', subscriptionRefund: '', orderCancelRefund: '', refundMethod: '', bankBranch: '', accountName: '', accountAddress: '' },
        ];
        const rec = cancelData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwPopup
            open={showChangeOrderDetail && activeErpTab === 'cancel'}
            onClose={() => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); }}
            title={isCreatingChangeOrder ? '新增退訂單' : `訂單退訂 - ${selectedChangeOrderId}`}
            size="fit"
            closableByMask={false}
            buttons={[
              { label: '清空',     variant: 'secondary', appearance: 'outlined', onClick: () => {} },
              { label: '取消',     variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
              { label: '儲存',     variant: 'primary',   appearance: 'outlined', onClick: () => {} },
              { label: '核單',     variant: 'primary',   appearance: 'filled',   onClick: () => {} },
              { label: '建立新訂單', variant: 'primary',  appearance: 'filled',   onClick: () => {} },
            ]}
          >
            {(rec !== undefined || isCreatingChangeOrder) && (
              <div className="space-y-[16px]">
              <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-3">
                <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>退訂基本資訊</p>
                <div className="grid grid-cols-3 gap-x-[24px]">

                  {/* 左欄 */}
                  <div className="space-y-0 divide-y divide-[#e4e7ec]">
                    {/* 原訂單號碼 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[6px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原訂單號碼</span>
                      <div className="flex-1">
                        <PopupSelectField
                          value={rec?.originalOrderNo ?? ''}
                          options={[]}
                          placeholder="原訂單號碼"
                          disabled={!isEditMode && !isCreatingChangeOrder}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                    {/* 訂單日期 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單日期</span>
                      <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.orderDate ?? ''}</span>
                    </div>
                    {/* 訂單退法 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[6px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單退法</span>
                      <div className="flex-1">
                        <PopupSelectField
                          value={isCreatingChangeOrder ? cancelForm.cancelMethod : (rec?.cancelMethod ?? '')}
                          options={[]}
                          placeholder="訂單退法"
                          disabled={!isEditMode && !isCreatingChangeOrder}
                          onChange={(val) => setCancelForm(prev => ({ ...prev, cancelMethod: val }))}
                        />
                      </div>
                    </div>
                    {/* 退訂原因 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>退訂原因</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwInput
                            value={isCreatingChangeOrder ? cancelForm.cancelReason : (rec?.cancelReason ?? '')}
                            onChange={(e) => setCancelForm(prev => ({ ...prev, cancelReason: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.cancelReason ?? ''}</span>
                      )}
                    </div>
                    {/* 備註 */}
                    <div className="flex items-start min-h-[72px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c] pt-[4px]" style={{ fontWeight: 400 }}>備註</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwTextarea
                            value={isCreatingChangeOrder ? cancelForm.remark : (rec?.remark ?? '')}
                            onChange={(e) => setCancelForm(prev => ({ ...prev, remark: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[60px] leading-[20px] whitespace-pre-wrap" style={{ fontWeight: 400 }}>{rec?.remark ?? ''}</span>
                      )}
                    </div>
                    {/* 折讓單 mail */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>折讓單 mail</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwInput
                            value={isCreatingChangeOrder ? cancelForm.discountMail : (rec?.discountMail ?? '')}
                            onChange={(e) => setCancelForm(prev => ({ ...prev, discountMail: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.discountMail ?? ''}</span>
                      )}
                    </div>
                    {/* 新單單號 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>新單單號</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwInput
                            value={isCreatingChangeOrder ? cancelForm.newOrderNo : (rec?.newOrderNo ?? '')}
                            onChange={(e) => setCancelForm(prev => ({ ...prev, newOrderNo: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.newOrderNo ?? ''}</span>
                      )}
                    </div>
                    {/* 全閱讀權益（訂戶贈閱） */}
                    <div className="flex items-start min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>全閱讀權益（訂戶贈閱）</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwInput
                            value={isCreatingChangeOrder ? cancelForm.fullReadBenefit : (rec?.fullReadBenefit ?? '')}
                            onChange={(e) => setCancelForm(prev => ({ ...prev, fullReadBenefit: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.fullReadBenefit ?? ''}</span>
                      )}
                    </div>
                  </div>

                  {/* 中欄 */}
                  <div className="space-y-0 divide-y divide-[#e4e7ec]">
                    {[
                      { label: '訂單客戶編號', value: rec?.orderCustomerCode ?? '' },
                      { label: '訂單客戶名稱', value: rec?.orderCustomerName ?? '' },
                      { label: '出貨客戶編號', value: rec?.shipCustomerCode ?? '' },
                      { label: '出貨客戶名稱', value: rec?.shipCustomerName ?? '' },
                      { label: '付款客戶編號', value: rec?.payerCode ?? '' },
                      { label: '付款客戶名稱', value: rec?.payerName ?? '' },
                      { label: '發票客戶編號', value: rec?.invoiceCustomerCode ?? '' },
                      { label: '發票客戶名稱', value: rec?.invoiceCustomerName ?? '' },
                      { label: '發票開立方式', value: rec?.invoiceMethod ?? '' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                        <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* 右欄 */}
                  <div className="space-y-0 divide-y divide-[#e4e7ec]">
                    {[
                      { label: '退訂單號',    value: rec?.cancelOrderNo ?? '' },
                      { label: '原單來源單號', value: rec?.sourceOrderNo ?? '' },
                      { label: '訂單類型',    value: rec?.orderType ?? '' },
                      { label: '訂單狀態',    value: rec?.status ?? '' },
                      { label: '通路代碼',    value: rec?.channelCode ?? '' },
                      { label: '付款方式',    value: rec?.paymentMethod ?? '' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                        <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                      </div>
                    ))}
                    {/* 暫停處理 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>暫停處理</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwSelect
                            value={isCreatingChangeOrder ? cancelForm.pauseProcess : (rec?.pauseProcess ?? '')}
                            options={[
                              { value: '', label: '' },
                              { value: '是', label: '是' },
                              { value: '否', label: '否' },
                            ]}
                            onChange={(val) => setCancelForm(prev => ({ ...prev, pauseProcess: val }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.pauseProcess ?? ''}</span>
                      )}
                    </div>
                    {/* 暫止原因 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>暫止原因</span>
                      {(isEditMode || isCreatingChangeOrder) ? (
                        <div className="flex-1">
                          <CwInput
                            value={isCreatingChangeOrder ? cancelForm.pauseReason : (rec?.pauseReason ?? '')}
                            onChange={(e) => setCancelForm(prev => ({ ...prev, pauseReason: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <span className="flex-1 text-[13px] text-[#1c1c1c] border border-[#c4c9d3] rounded-[4px] bg-white px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.pauseReason ?? ''}</span>
                      )}
                    </div>
                    {/* 核單日期 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>核單日期</span>
                      <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.approvalDate ?? ''}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 訂購品項 */}
              <div>
                <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>訂購品項</p>
                <CwTable
                  dataSource={cancelProducts[rec?.id ?? ''] ?? []}
                  rowKey="seq"
                  columns={[
                    { key: 'seq', title: '序號', width: '60px', align: 'center' },
                    { key: 'productCode', title: '產品料號', width: '140px' },
                    { key: 'productName', title: '產品名稱' },
                  ]}
                />
                <div className="flex items-center gap-[8px] mt-[12px]">
                  <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>網站訂單金額</span>
                  <CwSelect
                    value=""
                    options={[
                      { value: '不需扣', label: '不需扣' },
                      { value: '需扣', label: '需扣' },
                    ]}
                  />
                </div>

                {/* 出貨明細 */}
                <p className="text-[13px] text-[#1c1c1c] mt-[16px] mb-[8px]" style={{ fontWeight: 600 }}>出貨明細</p>
                <CwTable
                  dataSource={cancelShipItems[rec?.id ?? ''] ?? []}
                  rowKey="seq"
                  columns={[
                    { key: 'seq',                title: '序號',       width: '52px',  align: 'center' },
                    { key: 'refundMethod',       title: '退貨退款方式', width: '110px' },
                    { key: 'productCode',        title: '產品料號',    width: '110px' },
                    { key: 'productName',        title: '產品名稱',    width: '180px' },
                    { key: 'shipper',            title: '誰出貨',      width: '70px' },
                    { key: 'originalOrderNo',    title: '原訂單號碼',  width: '110px' },
                    { key: 'lineNo',             title: '行號碼',      width: '90px' },
                    { key: 'returnQty',          title: '退回數量',    width: '70px', align: 'center' },
                    { key: 'unitPrice',          title: '單位定價',    width: '80px', align: 'right' },
                    { key: 'discount',           title: '折扣%',      width: '60px', align: 'right' },
                    { key: 'unitSalePrice',      title: '單位售價',    width: '80px', align: 'right' },
                    { key: 'salesReturnAmount',  title: '銷退金額',    width: '80px', align: 'right' },
                    { key: 'returnReason',       title: '退貨原因',    width: '90px' },
                    { key: 'returnDesc',         title: '退貨描述',    width: '90px' },
                  ]}
                />
                <div className="flex items-center gap-[8px] mt-[8px]">
                  <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原寄送客戶</span>
                  <span className="flex-[1] text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.shipCustomerCode ?? ''}</span>
                  <span className="flex-[3] text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{rec?.shipCustomerName ?? ''}</span>
                </div>

                {/* 單一品項退訂明細 + 訂閱品項退訂明細（左右並排） */}
                <div className="flex gap-[16px] mt-[16px] items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>單一品項退訂明細</p>
                    <CwTable
                      dataSource={cancelShipItems[rec?.id ?? ''] ?? []}
                      rowKey="seq"
                      columns={[
                        { key: 'seq',         title: '序號',     width: '60px', align: 'center' },
                        { key: 'productCode', title: '產品料號', width: '140px' },
                        { key: 'productName', title: '產品名稱' },
                        { key: 'activityFee', title: '活動手續費', width: '100px', align: 'right' },
                      ]}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>訂閱品項退訂明細</p>
                <CwTable
                  dataSource={cancelSubscriptionItems[rec?.id ?? ''] ?? []}
                  rowKey="seq"
                  columns={[
                    { key: 'seq',         title: '序號',     width: '52px', align: 'center' },
                    { key: 'productCode', title: '訂閱產品', width: '120px' },
                    { key: 'productName', title: '產品名稱' },
                    {
                      key: 'startPeriod',
                      title: '起期',
                      width: '150px',
                      render: (_: string, record: { seq: number; productCode: string; productName: string; startPeriod: string; startDate: string; endPeriod: string; endDate: string }) => {
                        const rowKey = `${rec?.id ?? 'new'}-${record.seq}-start`;
                        const currentPeriod = cancelSubscriptionRowEdits[rowKey]?.startPeriod ?? record.startPeriod;
                        const currentDate   = cancelSubscriptionRowEdits[rowKey]?.startDate   ?? record.startDate;
                        return (
                          <div className="flex flex-col gap-[6px]">
                            <PopupSelectField
                              value={currentPeriod}
                              options={[]}
                              placeholder="期數"
                              disabled={!isEditMode}
                              onChange={(val) => setCancelSubscriptionRowEdits(prev => {
                                const existing = prev[rowKey] ?? { startPeriod: '', startDate: '', endPeriod: '', endDate: '' };
                                return { ...prev, [rowKey]: { ...existing, startPeriod: val } };
                              })}
                            />
                            <PopupSelectField
                              value={currentDate}
                              options={[]}
                              placeholder="日期"
                              disabled={!isEditMode}
                              onChange={(val) => setCancelSubscriptionRowEdits(prev => {
                                const existing = prev[rowKey] ?? { startPeriod: '', startDate: '', endPeriod: '', endDate: '' };
                                return { ...prev, [rowKey]: { ...existing, startDate: val } };
                              })}
                            />
                          </div>
                        );
                      },
                    },
                    {
                      key: 'endPeriod',
                      title: '迄期',
                      width: '150px',
                      render: (_: string, record: { seq: number; productCode: string; productName: string; startPeriod: string; startDate: string; endPeriod: string; endDate: string }) => {
                        const rowKey = `${rec?.id ?? 'new'}-${record.seq}-end`;
                        const currentPeriod = cancelSubscriptionRowEdits[rowKey]?.endPeriod ?? record.endPeriod;
                        const currentDate   = cancelSubscriptionRowEdits[rowKey]?.endDate   ?? record.endDate;
                        return (
                          <div className="flex flex-col gap-[6px]">
                            <PopupSelectField
                              value={currentPeriod}
                              options={[]}
                              placeholder="期數"
                              disabled={!isEditMode}
                              onChange={(val) => setCancelSubscriptionRowEdits(prev => {
                                const existing = prev[rowKey] ?? { startPeriod: '', startDate: '', endPeriod: '', endDate: '' };
                                return { ...prev, [rowKey]: { ...existing, endPeriod: val } };
                              })}
                            />
                            <PopupSelectField
                              value={currentDate}
                              options={[]}
                              placeholder="日期"
                              disabled={!isEditMode}
                              onChange={(val) => setCancelSubscriptionRowEdits(prev => {
                                const existing = prev[rowKey] ?? { startPeriod: '', startDate: '', endPeriod: '', endDate: '' };
                                return { ...prev, [rowKey]: { ...existing, endDate: val } };
                              })}
                            />
                          </div>
                        );
                      },
                    },
                  ]}
                />
                  </div>
                </div>
              </div>

                {/* 費用資訊 */}
                <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-3">
                  <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>費用資訊</p>
                  {/* 上方：費用欄位（3欄） */}
                  <div className="grid grid-cols-3 gap-x-[24px]">
                    {[
                      { label: '預收款餘額',   value: rec?.prepaidBalance ?? '' },
                      { label: '內部雜誌收費', value: rec?.internalMagazineFee ?? '' },
                      { label: '贈品收費',     value: rec?.giftFee ?? '' },
                      { label: '外部雜誌收費', value: rec?.externalMagazineFee ?? '' },
                      { label: '活動手續費',   value: rec?.activityFee ?? '' },
                      { label: '訂閱退款金額', value: rec?.subscriptionRefund ?? '' },
                      { label: '訂單銷退金額', value: rec?.orderCancelRefund ?? '' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px] border-b border-[#e4e7ec]">
                        <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                        <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {/* 下方：退款資訊（3欄） */}
                  <div className="mt-[4px] pt-[4px] border-t border-[#e4e7ec] grid grid-cols-3 gap-x-[24px]">
                    {[
                      { label: '退款方式',              value: rec?.refundMethod ?? '' },
                      { label: '銀行與分行別／匯票抬頭', value: rec?.bankBranch ?? '' },
                      { label: '戶名／匯票收件人',       value: rec?.accountName ?? '' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px] border-b border-[#e4e7ec]">
                        <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                        <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[28px] leading-[20px]" style={{ fontWeight: 400 }}>{value}</span>
                      </div>
                    ))}
                    {/* 帳號／匯票收件地址：跨3欄 */}
                    <div className="col-span-3 flex items-start py-[6px] gap-[8px]">
                      <span className="shrink-0 whitespace-nowrap text-[12px] text-[#7c808c] pt-[4px]" style={{ fontWeight: 400 }}>帳號／匯票收件地址</span>
                      <span className="flex-1 text-[13px] text-[#7c808c] border border-[#c4c9d3] rounded-[4px] bg-[#f0f2f5] px-[8px] py-[4px] min-h-[80px] leading-[20px] whitespace-pre-wrap" style={{ fontWeight: 400 }}>{rec?.accountAddress ?? ''}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </CwPopup>
        );
      })()}

      {/* 改出貨方式單 Popup */}
      <CwPopup
        open={showChangeOrderDetail && activeErpTab === 'deliveryChange'}
        onClose={() => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); }}
        title={isCreatingChangeOrder ? '新增改出貨方式' : `改出貨方式 - ${selectedChangeOrderId}`}
        size="fit"
        closableByMask={false}
        buttons={(isEditMode || isCreatingChangeOrder) ? [
          { label: '取消', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
          { label: '儲存', variant: 'primary', appearance: 'filled', onClick: () => {} },
        ] : [
          { label: '關閉', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
        ]}
      >
        <div className="space-y-[16px]">

          {/* ===== 第一區塊：客戶基本資料 ===== */}
          <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-0 divide-y divide-[#e4e7ec]">
            <div className="py-[8px]">
              <span className="text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>客戶基本資料</span>
            </div>
            {/* Row 1: 改出貨方式單日期 | 原訂單號碼 | 改出貨方式單號 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>改出貨方式單日期</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.changeOrderDate} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, changeOrderDate: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原訂單號碼</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.originalOrderNo} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>改出貨方式單號</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.changeOrderNo} disabled /></div>
                </div>
              </div>
            </div>
            {/* Row 2: 訂單客戶編號 | 訂單客戶名稱 | 訂單客戶聯絡人 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單客戶編號</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.orderCustomerCode} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單客戶名稱</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.orderCustomerName} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單客戶聯絡人</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.orderCustomerContact} disabled /></div>
                </div>
              </div>
            </div>
            {/* Row 3: 原訂單類型 | 備註（含通知財務退款按鈕） */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原訂單類型</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.originalOrderType} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[40px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>備註</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.remark} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, remark: e.target.value }))} /></div>
                </div>
              </div>
              <div className="flex items-center py-[6px]">
                <button
                  onClick={() => {}}
                  className="text-[12px] text-[#0078d4] border border-[#0078d4] rounded-[4px] px-[10px] py-[4px] bg-white hover:bg-[#f0f7ff] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  通知財務退款
                </button>
              </div>
            </div>
          </div>

          {/* ===== 第二區塊：異動產品 ===== */}
          <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-0 divide-y divide-[#e4e7ec]">
            <div className="py-[8px]">
              <span className="text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>異動產品</span>
            </div>
            {/* Row 1: 異動產品 | 產品名稱 | 剩餘期數 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>異動產品</span>
                  <div className="flex-1">
                    <CwSelect
                      value={deliveryChangeForm.selectedProduct}
                      onChange={(v) => handleDeliveryProductChange(v as string)}
                      options={[
                        ...mockOrderItems.filter(item => item.isGift !== 'Y').map(item => ({ label: item.productCode, value: item.productCode })),
                        { label: '整張訂單', value: '整張訂單' },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>產品名稱</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.productName} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>剩餘期數</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.remainingPeriods} disabled /></div>
                </div>
              </div>
            </div>
            {/* Row 2: 出貨客戶編號 | 出貨客戶名稱 | 出貨收件人 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>出貨客戶編號</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.shipCustomerCode} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>出貨客戶名稱</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.shipCustomerName} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>出貨收件人</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.shipRecipient} disabled /></div>
                </div>
              </div>
            </div>
            {/* Row 3: 出貨客戶地址（整行） */}
            <div className="py-[6px]">
              <div className="flex items-center min-h-[36px] gap-[8px]">
                <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>出貨客戶地址</span>
                <div className="flex-1"><CwInput value={deliveryChangeForm.shipCustomerAddress} disabled /></div>
              </div>
            </div>
            {/* Row 4: 金額 | 原出貨方式 | 新出貨方式 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>金額<span className="text-[#c00000] ml-[2px]">*</span></span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.amount} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, amount: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原出貨方式</span>
                  <div className="flex-1">
                    <CwSelect
                      value={deliveryChangeForm.originalShipMethod}
                      options={SHIP_METHOD_OPTIONS}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>新出貨方式<span className="text-[#c00000] ml-[2px]">*</span></span>
                  <div className="flex-1">
                    <CwSelect
                      value={deliveryChangeForm.newShipMethod}
                      options={SHIP_METHOD_OPTIONS}
                      searchable
                      onChange={(value) => setDeliveryChangeForm(prev => ({ ...prev, newShipMethod: value as string }))}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Row 5: (空) | 付款條件 | 核單日期 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="min-h-[36px] py-[6px]" />
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>付款條件<span className="text-[#c00000] ml-[2px]">*</span></span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.paymentTerms} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, paymentTerms: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>核單日期</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.approvalDate} disabled /></div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 第三區塊：出貨、發票、付款 ===== */}
          <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-0 divide-y divide-[#e4e7ec]">
            <div className="py-[8px]">
              <span className="text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>出貨、發票、付款相關資訊</span>
            </div>
            {/* Row 1: 付款客戶編號 | 付款客戶名稱 | 發票收件人 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>付款客戶編號</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.paymentCustomerCode} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>付款客戶名稱</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.paymentCustomerName} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票收件人</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceRecipient} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, invoiceRecipient: e.target.value }))} /></div>
                </div>
              </div>
            </div>
            {/* Row 2: 發票客戶編號 | 發票客戶名稱 | 發票開立說明 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票客戶編號</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceCustomerCode} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, invoiceCustomerCode: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票客戶名稱</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceCustomerName} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, invoiceCustomerName: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票開立說明</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceNote} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, invoiceNote: e.target.value }))} /></div>
                </div>
              </div>
            </div>
            {/* Row 3: 發票客戶地址（整行） */}
            <div className="py-[6px]">
              <div className="flex items-center min-h-[36px] gap-[8px]">
                <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票客戶地址</span>
                <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceCustomerAddress} disabled /></div>
              </div>
            </div>
            {/* Row 4: 發票開立方式 | 發票通知mail | (空) */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票開立方式</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceType} disabled /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票通知mail</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceEmail} disabled /></div>
                </div>
              </div>
              <div className="min-h-[36px] py-[6px]" />
            </div>
            {/* Row 5: 發票抬頭 | 統一編號 | 通路代碼 */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>發票抬頭</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.invoiceTitle} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, invoiceTitle: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>統一編號</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.unifiedNumber} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, unifiedNumber: e.target.value }))} /></div>
                </div>
              </div>
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>通路代碼</span>
                  <div className="flex-1">
                    <CwSelect
                      value={deliveryChangeForm.channelCode}
                      options={CHANNEL_CODE_OPTIONS_DELIVERY}
                      searchable
                      onChange={(value) => setDeliveryChangeForm(prev => ({ ...prev, channelCode: value as string }))}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Row 6: 付款方式 | 割接單號（isRemittance）| 割接日期（isRemittance） */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>付款方式</span>
                  <div className="flex-1">
                    <CwSelect
                      value={deliveryChangeForm.paymentMethod}
                      options={PAYMENT_METHOD_OPTIONS}
                      onChange={(value) => setDeliveryChangeForm(prev => ({ ...prev, paymentMethod: value as string }))}
                    />
                  </div>
                </div>
              </div>
              {isRemittance ? (
                <>
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>割接單號</span>
                      <div className="flex-1"><CwInput value={deliveryChangeForm.spliceOrderNo} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, spliceOrderNo: e.target.value }))} /></div>
                    </div>
                  </div>
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>割接日期</span>
                      <div className="flex-1"><CwInput value={deliveryChangeForm.spliceDate} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, spliceDate: e.target.value }))} /></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="min-h-[36px] py-[6px]" />
                  <div className="min-h-[36px] py-[6px]" />
                </>
              )}
            </div>
            {/* Row 7+8: 信用卡欄位（isCreditCard 才顯示） */}
            {isCreditCard && (
              <>
                <div className="grid grid-cols-3 gap-x-[16px]">
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>信用卡類型</span>
                      <div className="flex-1">
                        <CwSelect
                          value={deliveryChangeForm.creditCardType}
                          options={CREDIT_CARD_TYPE_OPTIONS_DELIVERY}
                          onChange={(value) => setDeliveryChangeForm(prev => ({ ...prev, creditCardType: value as string }))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>信用卡卡號<span className="text-[#c00000] ml-[2px]">*</span></span>
                      <div className="flex-1"><CwInput value={deliveryChangeForm.creditCardNo} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, creditCardNo: e.target.value }))} /></div>
                    </div>
                  </div>
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>信用卡有效日期<span className="text-[#c00000] ml-[2px]">*</span></span>
                      <div className="flex-1"><CwInput value={deliveryChangeForm.creditCardExpiry} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, creditCardExpiry: e.target.value }))} /></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-[16px]">
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>信用卡持有者</span>
                      <div className="flex-1"><CwInput value={deliveryChangeForm.cardHolder} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, cardHolder: e.target.value }))} /></div>
                    </div>
                  </div>
                  <div className="py-[6px]">
                    <div className="flex items-center min-h-[36px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>信用卡授權碼</span>
                      <div className="flex-1"><CwInput value={deliveryChangeForm.authCode} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, authCode: e.target.value }))} /></div>
                    </div>
                  </div>
                  <div className="min-h-[36px] py-[6px]" />
                </div>
              </>
            )}
            {/* Row 9: 異動單態 | 信用卡回覆碼（isCreditCard）| (空) */}
            <div className="grid grid-cols-3 gap-x-[16px]">
              <div className="py-[6px]">
                <div className="flex items-center min-h-[36px] gap-[8px]">
                  <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>異動單態</span>
                  <div className="flex-1"><CwInput value={deliveryChangeForm.changeOrderStatus} disabled /></div>
                </div>
              </div>
              {isCreditCard ? (
                <div className="py-[6px]">
                  <div className="flex items-center min-h-[36px] gap-[8px]">
                    <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>信用卡回覆碼</span>
                    <div className="flex-1"><CwInput value={deliveryChangeForm.creditCardReplyCode} onChange={(e) => setDeliveryChangeForm(prev => ({ ...prev, creditCardReplyCode: e.target.value }))} /></div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[36px] py-[6px]" />
              )}
              <div className="min-h-[36px] py-[6px]" />
            </div>
          </div>

        </div>
      </CwPopup>

      {/* 退件補寄單 Popup */}
      {(() => {
        const rec = allReturnResendData.find(r => r.id === selectedChangeOrderId);
        return (
          <CwPopup
            open={showChangeOrderDetail && activeErpTab === 'returnResend'}
            onClose={() => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); }}
            title={isCreatingChangeOrder ? (CHANGE_TYPE_TITLE[selectedChangeOrderType ?? ''] ?? '新增退件補寄單') : `訂單退件補寄 - ${selectedChangeOrderId}`}
            size="fit"
            closableByMask={false}
            buttons={(isEditMode || isCreatingChangeOrder) ? [
              { label: '清除', variant: 'secondary', appearance: 'outlined', onClick: () => {} },
              { label: '取消', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
              { label: '存檔', variant: 'secondary', appearance: 'filled', onClick: () => setShowReturnResendSaveConfirm(true) },
              { label: '核單', variant: 'primary' as const, appearance: 'filled' as const, onClick: () => {} },
            ] : [
              { label: '關閉', variant: 'secondary', appearance: 'outlined', onClick: () => { setShowChangeOrderDetail(false); setIsCreatingChangeOrder(false); } },
              { label: '核單', variant: 'primary' as const, appearance: 'filled' as const, onClick: () => {} },
            ]}
          >
            {(rec !== undefined || isCreatingChangeOrder) && (
              <div className="space-y-[16px]">
              <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f7f8fa] px-4 py-3">
                <p className="text-[13px] text-[#1c1c1c] mb-[8px]" style={{ fontWeight: 600 }}>退件補寄基本資訊</p>
                <div className="grid grid-cols-2 gap-x-[24px]">
                  {/* 左欄 */}
                  <div className="divide-y divide-[#e4e7ec]">
                    {([
                      { label: '退件補寄單號', value: rec?.id ?? '' },
                      { label: '退件補寄單日期', value: rec?.applyDate ?? '' },
                      { label: '退件補寄單狀態', value: rec?.status ?? '' },
                    ]).map(({ label, value }) => (
                      <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                        <div className="flex-1"><CwInput value={value} disabled /></div>
                      </div>
                    ))}
                    {/* 原訂單號碼 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>原訂單號碼</span>
                      <div className="flex-1">
                        <PopupSelectField
                          value={isCreatingChangeOrder ? returnResendForm.originalOrderNo : (rec?.originalOrderNo ?? '')}
                          onChange={(value) => setReturnResendForm(prev => ({ ...prev, originalOrderNo: value }))}
                          disabled={!isCreatingChangeOrder}
                          options={[
                            { code: '102862682', name: 'JEFF' },
                            { code: '102971345', name: '李小華' },
                            { code: '103045678', name: '張美玲' },
                          ]}
                          popupTitle="選擇訂單號碼"
                          searchPlaceholder="搜尋訂單號碼"
                        />
                      </div>
                    </div>
                    {/* 訂單客戶編號 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單客戶編號</span>
                      <div className="flex-1"><CwInput value={rec?.customerCode ?? ''} disabled /></div>
                    </div>
                    {/* 退件原因 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>退件原因</span>
                      <div className="flex-1">
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <CwSelect value={rec?.returnReason ?? ''} options={RETURN_REASON_OPTIONS} placeholder="請選擇退件原因" />
                        ) : (
                          <CwInput value={rec?.returnReason ?? ''} disabled />
                        )}
                      </div>
                    </div>
                    {/* 實際退件單日期 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>實際退件單日期</span>
                      <div className="flex-1"><CwInput value={rec?.actualReturnDate ?? ''} disabled /></div>
                    </div>
                    {/* 暫停處理 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>暫停處理</span>
                      <div className="flex-1">
                        <CwInput
                          value={returnResendSubType === 'resend-only' ? '是' : (rec?.suspended ?? '')}
                          disabled
                        />
                      </div>
                    </div>
                    {/* 暫止原因 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>暫止原因</span>
                      <div className="flex-1">
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <CwSelect
                            value={rec?.suspendReason ?? ''}
                            options={RR_SUSPEND_REASON_OPTIONS}
                            placeholder="請選擇暫止原因"
                            disabled={returnResendSubType !== 'resend-only'}
                          />
                        ) : (
                          <CwInput value={rec?.suspendReason ?? ''} disabled />
                        )}
                      </div>
                    </div>
                    {/* 出貨注意事項 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[110px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>出貨注意事項</span>
                      <div className="flex-1">
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <CwInput
                            value={isCreatingChangeOrder ? returnResendForm.shipNote : (rec?.shipNote ?? '')}
                            onChange={(e) => setReturnResendForm(prev => ({ ...prev, shipNote: e.target.value }))}
                          />
                        ) : (
                          <CwInput value={rec?.shipNote ?? ''} disabled />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 中欄 */}
                  <div className="divide-y divide-[#e4e7ec]">
                    {/* 核單日期 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>核單日期</span>
                      <div className="flex-1"><CwInput value={rec?.approvalDate ?? ''} disabled /></div>
                    </div>
                    {/* 訂單類型 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>訂單類型</span>
                      <div className="flex-1">
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <CwInput
                            value={isCreatingChangeOrder ? returnResendForm.orderType : (rec?.orderType ?? '')}
                            onChange={(e) => setReturnResendForm(prev => ({ ...prev, orderType: e.target.value }))}
                          />
                        ) : (
                          <CwInput value={rec?.orderType ?? ''} disabled />
                        )}
                      </div>
                    </div>
                    {/* 訂單客戶名稱、聯絡方式 */}
                    {(['訂單客戶名稱', '聯絡方式'] as const).map((label) => {
                      const value = label === '訂單客戶名稱' ? (rec?.customerName ?? '') : (rec?.contact ?? '');
                      return (
                        <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                          <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                          <div className="flex-1"><CwInput value={value} disabled /></div>
                        </div>
                      );
                    })}
                    {/* 出貨方式 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>出貨方式</span>
                      <div className="flex-1">
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <CwInput
                            value={isCreatingChangeOrder ? returnResendForm.shipMethod : (rec?.shipMethod ?? '')}
                            onChange={(e) => setReturnResendForm(prev => ({ ...prev, shipMethod: e.target.value }))}
                          />
                        ) : (
                          <CwInput value={rec?.shipMethod ?? ''} disabled />
                        )}
                      </div>
                    </div>
                    {/* 出貨客戶名稱、出貨地址、出貨客戶編號、出貨收件人 */}
                    {([
                      { label: '出貨客戶名稱', value: rec?.shipCustomerName ?? '' },
                      { label: '出貨地址',     value: rec?.shipAddress ?? '' },
                      { label: '出貨客戶編號', value: rec?.shipCustomerCode ?? '' },
                      { label: '出貨收件人',   value: rec?.shipRecipient ?? '' },
                    ]).map(({ label, value }) => (
                      <div key={label} className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                        <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>{label}</span>
                        <div className="flex-1"><CwInput value={value} disabled /></div>
                      </div>
                    ))}
                    {/* 補寄原因 */}
                    <div className="flex items-center min-h-[36px] py-[6px] gap-[8px]">
                      <span className="w-[96px] shrink-0 text-[12px] text-[#7c808c]" style={{ fontWeight: 400 }}>補寄原因</span>
                      <div className="flex-1">
                        {(isEditMode || isCreatingChangeOrder) ? (
                          <CwSelect value={rec?.resendReason ?? ''} options={RESEND_REASON_OPTIONS} placeholder="請選擇補寄原因" />
                        ) : (
                          <CwInput value={rec?.resendReason ?? ''} disabled />
                        )}
                      </div>
                    </div>
                  </div>

                </div>
                {/* 備註（兩欄共用） */}
                <div className="border-t border-[#e4e7ec] pt-[6px] mt-[0px] flex items-start gap-[8px] py-[6px]">
                  <span className="w-[80px] shrink-0 text-[12px] text-[#7c808c] pt-[4px]" style={{ fontWeight: 400 }}>備註</span>
                  <div className="flex-1">
                    {(isEditMode || isCreatingChangeOrder) ? (
                      <CwTextarea
                        value={isCreatingChangeOrder ? returnResendForm.remark : (rec?.remark ?? '')}
                        onChange={(e) => setReturnResendForm(prev => ({ ...prev, remark: e.target.value }))}
                        rows={3}
                      />
                    ) : (
                      <CwTextarea value={rec?.remark ?? ''} disabled rows={3} />
                    )}
                  </div>
                </div>
              </div>

              {/* 明細 table */}
              <div>
                <p className="text-[13px] text-[#1c1c1c] mb-[8px] px-[2px]" style={{ fontWeight: 600 }}>補寄明細</p>
                <CwTable
                  rowKey="productCode"
                  dataSource={[{
                    productCode: rec?.productCode ?? '',
                    productName: rec?.productName ?? '',
                    qty: String(rec?.qty ?? ''),
                    shipWarehouse: '',
                    publishShip: rec?.publishShip ?? '',
                    shipDate: rec?.dispatchDate ?? '',
                    shipCustomerName: rec?.shipCustomerName ?? '',
                    shipRecipient: rec?.shipRecipient ?? '',
                    shipAddress: rec?.shipAddress ?? '',
                    omsProgress: rec?.omsProgress ?? '',
                    status: rec?.status ?? '',
                    omsExecStatus: rec?.omsExecStatus ?? '',
                  }]}
                  columns={[
                    {
                      key: 'productCode',
                      title: '訂單料號',
                      width: '280px',
                      render: (value: string) => (
                        <PopupSelectField
                          value={value}
                          onChange={() => {}}
                          disabled={!isEditMode && !isCreatingChangeOrder}
                          options={mockCurrentOrderItems.map(item => ({ code: item.productCode, name: item.productName }))}
                          popupTitle="選擇訂單料號"
                          searchPlaceholder="搜尋料號或產品名稱"
                        />
                      ),
                    },
                    {
                      key: 'productName',
                      title: '訂單產品',
                      width: '150px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'qty',
                      title: '數量',
                      width: '70px',
                      render: (value: string) => <CwInput value={value} readOnly onChange={() => {}} textAlign="center" style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'shipWarehouse',
                      title: '出貨倉',
                      width: '90px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'publishShip',
                      title: '發行出貨',
                      width: '90px',
                      render: (value: string) => <CwInput value={value} disabled textAlign="center" style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'shipDate',
                      title: '出貨日期',
                      width: '110px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'shipCustomerName',
                      title: '出貨客戶名稱',
                      width: '120px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'shipRecipient',
                      title: '出貨收件人',
                      width: '110px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'shipAddress',
                      title: '出貨地址',
                      width: '200px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'omsProgress',
                      title: '下發註記',
                      width: '90px',
                      render: (value: string) => <CwInput value={value} disabled textAlign="center" style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'status',
                      title: '處理狀態',
                      width: '90px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                    {
                      key: 'omsExecStatus',
                      title: '執行狀態',
                      width: '90px',
                      render: (value: string) => <CwInput value={value} disabled style={{ fontWeight: 400 }} />,
                    },
                  ]}
                />
              </div>

              </div>
            )}
          </CwPopup>
        );
      })()}

      {/* 退件補寄存檔確認 Popup */}
      <CwPopup
        open={showReturnResendSaveConfirm}
        onClose={() => setShowReturnResendSaveConfirm(false)}
        title="確認存檔"
        size="sm"
        closableByMask={false}
        buttons={[
          { label: '取消', variant: 'secondary', appearance: 'outlined', onClick: () => setShowReturnResendSaveConfirm(false) },
          { label: '確認存檔', variant: 'primary', appearance: 'filled', onClick: () => { setShowReturnResendSaveConfirm(false); } },
        ]}
      >
        <div className="space-y-[12px]">
          <div className="flex items-start gap-[10px] rounded-[8px] bg-[#fff8e1] border border-[#f59e0b] px-[16px] py-[14px]">
            <svg className="shrink-0 mt-[1px]" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5L16.5 15H1.5L9 1.5Z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" strokeLinejoin="round"/>
              <path d="M9 7V10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="12.5" r="0.75" fill="white"/>
            </svg>
            <p className="text-[13px] text-[#92400e] leading-[20px]" style={{ fontWeight: 400 }}>
              退件資訊儲存後將直接觸發入庫作業，請確認以下資訊正確無誤後再執行存檔。
            </p>
          </div>
          <p className="text-[13px] text-[#1c1c1c] leading-[20px]" style={{ fontWeight: 400 }}>
            確定要儲存本筆退件補寄資訊嗎？
          </p>
        </div>
      </CwPopup>

      {/* 新增異動單 Popup */}
      <CwPopup
        open={showNewChangeOrderPopup}
        onClose={() => setShowNewChangeOrderPopup(false)}
        title="新增異動單"
        size="xl"
        closableByMask={false}
        buttons={[
          { label: '取消', variant: 'secondary', appearance: 'outlined', onClick: () => setShowNewChangeOrderPopup(false) },
          { label: '確認', variant: 'primary', appearance: 'filled', onClick: () => {
            if (!selectedChangeOrderType) return;
            // CSH（改出貨方式）允許不選訂單明細，其他類型必須選
            if (selectedChangeOrderType !== 'CSH' && !selectedItemId) return;
            const targetTab = CHANGE_TYPE_TO_TAB[selectedChangeOrderType];
            const item = selectedItemId ? mockCurrentOrderItems.find(i => i.id === selectedItemId) : null;
            setAddressChangeNew({
              recipient: item?.shipRecipient ?? '',
              mobile: item?.mobile ?? '',
              address: item?.shipAddress ?? '',
            });
            if (selectedChangeOrderType === 'CSH') {
              const selectedProduct = item ? item.productCode : '整張訂單';
              const productData = selectedProduct !== '整張訂單' ? DELIVERY_PRODUCT_MAP[selectedProduct] : null;
              setDeliveryChangeForm(prev => ({
                ...prev,
                selectedProduct,
                productName: productData?.name ?? '',
                remainingPeriods: productData?.remaining ?? '',
                shipCustomerCode: productData?.shipCustomerCode ?? '',
                shipCustomerName: productData?.shipCustomerName ?? '',
                shipRecipient: productData?.shipRecipient ?? '',
                shipCustomerAddress: productData?.shipCustomerAddress ?? '',
                amount: productData?.amount ?? '',
                originalShipMethod: productData?.originalShipMethod ?? '1001-郵寄-一般',
              }));
            }
            setShowNewChangeOrderPopup(false);
            setSelectedChangeOrderId(null);
            setIsCreatingChangeOrder(true);
            if (selectedChangeOrderType === 'RSD') setReturnResendSubType('both');
            setActiveErpTab(targetTab);
            if (targetTab === 'suspendResume') {
              setSuspendResumeSubTab(selectedChangeOrderType === 'RSM' ? 'resume' : 'suspend');
            }
            setShowChangeOrderDetail(true);
          }},
        ]}
      >
        <div className="space-y-[20px]">
          {/* 訂單號碼 */}
          <div>
            <p className="text-[13px] text-[#33475b] mb-[6px]">訂單號碼</p>
            <div className="flex gap-[8px] items-center">
              <div className="flex-1">
                <CwInput value={selectItemOrderNo} onChange={(e) => setSelectItemOrderNo(e.target.value)} placeholder="輸入訂單號碼" />
              </div>
              <button className="shrink-0 w-[36px] h-[36px] rounded-[6px] border border-[#c4c9d3] bg-white hover:bg-[#f0f2f5] flex items-center justify-center transition-colors">
                <Search className="w-[16px] h-[16px] text-[#7c808c]" />
              </button>
            </div>
          </div>

          <div className="border-t border-[#e4e7ec]" />

          {/* 選擇異動類型 */}
          <div className="space-y-[12px]">
            <p className="text-[14px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>選擇異動類型</p>
            <div className="grid grid-cols-2 gap-[8px]">
              {CHANGE_ORDER_TYPES.map((type) => {
                const selected = selectedChangeOrderType === type.id;
                return (
                  <div
                    key={type.id}
                    onClick={() => { setSelectedChangeOrderType(type.id); setSelectedItemId(null); }}
                    className="flex items-center gap-[12px] px-[16px] py-[14px] rounded-[8px] border cursor-pointer transition-colors"
                    style={{ borderColor: selected ? '#0078d4' : '#e0e4ef', background: selected ? '#eff6ff' : '#ffffff' }}
                  >
                    <div
                      className="shrink-0 w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center"
                      style={{ borderColor: selected ? '#0078d4' : '#c4c9d3', background: 'white' }}
                    >
                      {selected && <div className="w-[10px] h-[10px] rounded-full bg-[#0078d4]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 600 }}>{type.name}</p>
                      <p className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif] mt-[2px]" style={{ fontWeight: 350 }}>{type.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 選擇訂單明細（選定異動類型後才顯示） */}
          {selectedChangeOrderType && (
            <>
              <div className="border-t border-[#e4e7ec]" />
              <div className="space-y-[12px]">
                <div className="flex items-center gap-[6px]">
                  <p className="text-[14px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>
                    {selectedChangeOrderType === 'RSD' ? '選擇出貨明細' : '選擇訂單明細'}
                  </p>
                  {selectedChangeOrderType === 'CSH' && (
                    <CwTooltip content="不選擇訂單明細，即為更改整張訂單的出貨方式">
                      <HelpCircle className="w-[14px] h-[14px] text-[#7c808c] cursor-help" />
                    </CwTooltip>
                  )}
                </div>
                {selectedChangeOrderType === 'RSD' ? (
                  <CwTable
                    dataSource={allShipData}
                    rowKey="id"
                    columns={[
                      { key: 'radio', title: '', width: '48px', align: 'center',
                        render: (_: any, record: any) => (
                          <div
                            className="shrink-0 w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center cursor-pointer mx-auto"
                            style={{ borderColor: selectedItemId === record.id ? '#0078d4' : '#c4c9d3', background: 'white' }}
                            onClick={() => setSelectedItemId(record.id)}
                          >
                            {selectedItemId === record.id && <div className="w-[8px] h-[8px] rounded-full bg-[#0078d4]" />}
                          </div>
                        ),
                      },
                      { key: 'orderNo', title: '訂單單號', width: '130px' },
                      { key: 'productCode', title: '產品料號', width: '110px' },
                      { key: 'productName', title: '產品名稱', width: '200px' },
                      { key: 'pickDate', title: '撿貨日期', width: '110px' },
                      { key: 'actualShipDate', title: '實際出貨日期', width: '120px' },
                      { key: 'shipMethod', title: '出貨方式', width: '130px' },
                      { key: 'trackingNo', title: '追蹤號碼', width: '130px' },
                      { key: 'outboundNo', title: '出庫單號', width: '130px' },
                      { key: 'batchNo', title: '批次號碼', width: '120px' },
                      { key: 'shipQty', title: '出貨數量', width: '90px', align: 'center' },
                      { key: 'owner', title: '貨主', width: '80px' },
                      { key: 'setCode', title: '套書碼', width: '90px' },
                      { key: 'omsProgress', title: 'OMS進度', width: '100px', align: 'center', render: (v: any) => <OmsProgressTag code={String(v)} /> },
                      { key: 'omsExecStatus', title: 'OMS執行狀態', width: '120px' },
                      { key: 'omsChangeDate', title: 'OMS異動日', width: '110px' },
                      { key: 'shipWarehouse', title: '出貨倉', width: '90px' },
                    ]}
                    rowStyle={(record: any) => selectedItemId === record.id ? { background: '#eff6ff' } : {}}
                  />
                ) : (
                  <CwTable
                    dataSource={mockCurrentOrderItems}
                    rowKey="id"
                    columns={[
                      { key: 'radio', title: '', width: '48px', align: 'center',
                        render: (_: any, record: any) => (
                          <div
                            className="shrink-0 w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center cursor-pointer mx-auto"
                            style={{ borderColor: selectedItemId === record.id ? '#0078d4' : '#c4c9d3', background: 'white' }}
                            onClick={() => setSelectedItemId(record.id)}
                          >
                            {selectedItemId === record.id && <div className="w-[8px] h-[8px] rounded-full bg-[#0078d4]" />}
                          </div>
                        ),
                      },
                      { key: 'productCode', title: '產品料號', width: '120px' },
                      { key: 'productName', title: '產品名稱', width: '200px' },
                      { key: 'orderStatus', title: '訂單狀態', width: '90px' },
                      { key: 'shipRecipient', title: '出貨收件人', width: '110px' },
                      { key: 'mobile', title: '出貨手機', width: '130px' },
                      { key: 'shipAddress', title: '出貨地址', width: '220px' },
                      { key: 'shipMethod', title: '出貨方式', width: '130px' },
                    ]}
                    rowStyle={(record: any) => selectedItemId === record.id ? { background: '#eff6ff' } : {}}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </CwPopup>

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
