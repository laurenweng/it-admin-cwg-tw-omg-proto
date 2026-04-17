import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CwInput } from "./CwInput";

// OMG 訂單表頭資料型別
export interface OMGOrderHeaderData {
  // 基本訂單資訊
  sourceDescription: string;
  customerGiveDate: string;
  orderNumber: string;
  priceTable: string;
  memberAccount: string;
  cancelOrderNumber: string;
  processNumber: string;
  sourceNumber: string;
  projectCode: string;
  directIndirectCollect: string;
  agreeMarketing: string;
  orderDate: string;
  lastTransactionDate: string;
  orderType: string;
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

  // 付款資訊
  paymentCustomerCode: string;
  paymentCustomerName: string;
  paymentAddress: string;
  orderCustomerCode: string;
  orderCustomerName: string;
  creditCardLast4: string;
  invoiceDate: string;
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
  recommendCustomerCode: string;
  recommendCustomerName: string;
  freeReading: string;
  freeReadingReason: string;
  freeReadingDepartment: string;
  specialNote: string;
  pauseProcessing: string;
  pauseReason: string;
  creditCardPaymentBank: string;

  // 其他訂單資訊
  advancePaymentNumber: string;
  orderAmount: string;
  paymentCondition: string;
  advancePaymentBalance: string;
  writeOffRecord: string;
  approvalDate: string;
  orderStatus: string;
  note: string;
  virtualContactPhone: string;
}

// 模擬 OMG 訂單表頭資料
const mockOMGOrderHeader: OMGOrderHeaderData = {
  // 基本訂單資訊
  sourceDescription: '',
  customerGiveDate: '',
  orderNumber: '102862818',
  priceTable: '雜誌整售價格表',
  memberAccount: '',
  cancelOrderNumber: '',
  processNumber: '',
  sourceNumber: '',
  projectCode: '',
  directIndirectCollect: '1 直接',
  agreeMarketing: '1 同意 07-OCT-25 10:12',
  orderDate: '07-OCT-2025',
  lastTransactionDate: '15-OCT-2025',
  orderType: 'CW訂單單',
  planCode: 'GC231000 天下雜誌25期+金國話...',
  channelCode: 'CA 客戶服務',
  trackingCode: '',
  salesperson: '',

  // 出貨資訊
  shipCustomerCode: '1679128',
  shipCustomerName: 'JEFF',
  shipRecipient: '',
  shipAddress: '台北市中山區網路轉單，i',
  postage: '0',
  shipMethod: '1001 郵寄一般',
  specialPackageInstruction: '',
  deliveryNote: '否',
  convenienceStore: '',

  // 發票資訊
  invoiceCustomerCode: '1679128',
  invoiceCustomerName: 'JEFF',
  invoiceRecipient: '',
  invoiceAddress: '台北市中山區網路轉單，i',
  invoiceIssueMethod: '6 電子發票',
  invoiceIssueDescription: '',
  invoiceTitle: 'JEFF',
  taxIdNumber: '',
  invoiceNotifyEmail: 'polk200276+3@gmail.com',
  invoiceDonation: '',
  carrierType: '會員載具',
  carrierCode: '1679128',

  // 付款資訊
  paymentCustomerCode: '1679128',
  paymentCustomerName: 'JEFF',
  paymentAddress: '台北市中山區網路轉單，POLK2...',
  orderCustomerCode: '1679128',
  orderCustomerName: 'JEFF',
  creditCardLast4: '',
  invoiceDate: '07-OCT-2025',
  paymentMethod: '綠界',
  remittanceNumber: '',
  remittanceDate: '',
  creditCardType: '',
  creditCardNumber: '',
  creditCardExpiry: '',
  cardBackCode: '',
  creditCardHolder: '',
  creditCardAuthCode: '',
  authReplyCode: '',
  recommendCustomerCode: '',
  recommendCustomerName: '',
  freeReading: '否',
  freeReadingReason: '',
  freeReadingDepartment: '',
  specialNote: '',
  pauseProcessing: '否',
  pauseReason: '',
  creditCardPaymentBank: '',

  // 其他訂單資訊
  advancePaymentNumber: '102862818',
  orderAmount: '4137',
  paymentCondition: '即期付款',
  advancePaymentBalance: '',
  writeOffRecord: '',
  approvalDate: '07-OCT-2025',
  orderStatus: '已核單',
  note: '20251015 effwu@cw.com.tw, 無芋權註銷換\nowenhuang+dev@cwbook0918@cw.com.tw 換',
  virtualContactPhone: '',
};

// 摺疊面板分類
type SectionKey = 'basic' | 'shipping' | 'invoice' | 'payment' | 'other';

interface SectionConfig {
  key: SectionKey;
  title: string;
  icon?: React.ReactNode;
}

const sections: SectionConfig[] = [
  { key: 'basic', title: '基本訂單資訊' },
  { key: 'shipping', title: '出貨資訊' },
  { key: 'invoice', title: '發票資訊' },
  { key: 'payment', title: '付款資訊' },
  { key: 'other', title: '其他訂單資訊' },
];

// OMG 訂單表頭元件
export function OMGOrderHeader() {
  // 預設展開基本訂單資訊
  const [expandedSections, setExpandedSections] = useState<SectionKey[]>(['basic']);
  const data = mockOMGOrderHeader;

  const toggleSection = (key: SectionKey) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    if (expandedSections.length === sections.length) {
      setExpandedSections([]);
    } else {
      setExpandedSections(sections.map((s) => s.key));
    }
  };

  // 欄位顯示元件（disabled input）
  const Field = ({ label, value }: { label: string; value: string }) => (
    <CwInput label={label} value={value} disabled readOnly />
  );

  return (
    <div className="space-y-[16px]">
      {/* 標題與全部展開/收合按鈕 */}
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

      {/* 摺疊面板 */}
      <div className="space-y-[12px]">
        {/* 基本訂單資訊 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <button
            onClick={() => toggleSection('basic')}
            className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-[12px]">
              {expandedSections.includes('basic') ? (
                <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
              ) : (
                <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
              )}
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">
                基本訂單資訊
              </span>
            </div>
          </button>
          {expandedSections.includes('basic') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <Field label="訂單號碼" value={data.orderNumber} />
                <Field label="訂單日期" value={data.orderDate} />
                <Field label="最後交易日" value={data.lastTransactionDate} />
                <Field label="訂單類型" value={data.orderType} />
                <Field label="訂單狀態" value={data.orderStatus} />
                <Field label="價格表" value={data.priceTable} />
                <Field label="會員帳號" value={data.memberAccount} />
                <Field label="方案代碼" value={data.planCode} />
                <Field label="通路代碼" value={data.channelCode} />
                <Field label="來源描述" value={data.sourceDescription} />
                <Field label="客戶給單日" value={data.customerGiveDate} />
                <Field label="流程單號" value={data.processNumber} />
                <Field label="來源單號" value={data.sourceNumber} />
                <Field label="專案代碼" value={data.projectCode} />
                <Field label="退訂單單號" value={data.cancelOrderNumber} />
                <Field label="直/間接蒐集" value={data.directIndirectCollect} />
                <Field label="同意行銷" value={data.agreeMarketing} />
                <Field label="追蹤碼" value={data.trackingCode} />
                <Field label="業務員" value={data.salesperson} />
              </div>
            </div>
          )}
        </div>

        {/* 出貨資訊 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-[12px]">
              {expandedSections.includes('shipping') ? (
                <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
              ) : (
                <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
              )}
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">
                出貨資訊
              </span>
            </div>
          </button>
          {expandedSections.includes('shipping') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <Field label="出貨客戶編號" value={data.shipCustomerCode} />
                <Field label="出貨客戶名稱" value={data.shipCustomerName} />
                <Field label="出貨收件人" value={data.shipRecipient} />
                <div className="col-span-2">
                  <Field label="出貨地址" value={data.shipAddress} />
                </div>
                <Field label="出貨方式" value={data.shipMethod} />
                <Field label="郵資" value={data.postage} />
                <Field label="特殊包裝指示" value={data.specialPackageInstruction} />
                <Field label="出催款單" value={data.deliveryNote} />
                <Field label="超商店鋪" value={data.convenienceStore} />
              </div>
            </div>
          )}
        </div>

        {/* 發票資訊 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <button
            onClick={() => toggleSection('invoice')}
            className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-[12px]">
              {expandedSections.includes('invoice') ? (
                <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
              ) : (
                <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
              )}
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">
                發票資訊
              </span>
            </div>
          </button>
          {expandedSections.includes('invoice') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <Field label="發票客戶編號" value={data.invoiceCustomerCode} />
                <Field label="發票客戶名稱" value={data.invoiceCustomerName} />
                <Field label="發票收件人" value={data.invoiceRecipient} />
                <Field label="發票抬頭" value={data.invoiceTitle} />
                <div className="col-span-2">
                  <Field label="發票地址" value={data.invoiceAddress} />
                </div>
                <Field label="發票開立方式" value={data.invoiceIssueMethod} />
                <Field label="發票開立說明" value={data.invoiceIssueDescription} />
                <Field label="統一編號" value={data.taxIdNumber} />
                <Field label="發票通知Email" value={data.invoiceNotifyEmail} />
                <Field label="發票捐贈" value={data.invoiceDonation} />
                <Field label="載具類型" value={data.carrierType} />
                <Field label="載具碼" value={data.carrierCode} />
              </div>
            </div>
          )}
        </div>

        {/* 付款資訊 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <button
            onClick={() => toggleSection('payment')}
            className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-[12px]">
              {expandedSections.includes('payment') ? (
                <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
              ) : (
                <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
              )}
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">
                付款資訊
              </span>
            </div>
          </button>
          {expandedSections.includes('payment') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <Field label="付款客戶編號" value={data.paymentCustomerCode} />
                <Field label="付款客戶名稱" value={data.paymentCustomerName} />
                <div className="col-span-2">
                  <Field label="付款送地址" value={data.paymentAddress} />
                </div>
                <Field label="訂單客戶編號" value={data.orderCustomerCode} />
                <Field label="訂單客戶名稱" value={data.orderCustomerName} />
                <Field label="付款方式" value={data.paymentMethod} />
                <Field label="發票日期" value={data.invoiceDate} />
                <Field label="劃撥單號" value={data.remittanceNumber} />
                <Field label="劃撥日期" value={data.remittanceDate} />
                <Field label="信用卡類型" value={data.creditCardType} />
                <Field label="信用卡號後4碼" value={data.creditCardLast4} />
                <Field label="信用卡卡號" value={data.creditCardNumber} />
                <Field label="信用卡有效期" value={data.creditCardExpiry} />
                <Field label="卡背面3碼" value={data.cardBackCode} />
                <Field label="信用卡持有者" value={data.creditCardHolder} />
                <Field label="信用卡授權碼" value={data.creditCardAuthCode} />
                <Field label="授權回覆碼" value={data.authReplyCode} />
                <Field label="信用卡請款銀行" value={data.creditCardPaymentBank} />
                <Field label="推薦客戶編號" value={data.recommendCustomerCode} />
                <Field label="推薦客戶名稱" value={data.recommendCustomerName} />
                <Field label="贈閱" value={data.freeReading} />
                <Field label="贈閱原因" value={data.freeReadingReason} />
                <Field label="贈閱部門" value={data.freeReadingDepartment} />
                <Field label="特殊備註" value={data.specialNote} />
                <Field label="暫停處理" value={data.pauseProcessing} />
                <Field label="暫止原因" value={data.pauseReason} />
              </div>
            </div>
          )}
        </div>

        {/* 其他訂單資訊 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <button
            onClick={() => toggleSection('other')}
            className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-[12px]">
              {expandedSections.includes('other') ? (
                <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
              ) : (
                <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
              )}
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">
                其他訂單資訊
              </span>
            </div>
          </button>
          {expandedSections.includes('other') && (
            <div className="px-[20px] py-[20px] bg-white">
              <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
                <Field label="預收款單號" value={data.advancePaymentNumber} />
                <Field label="訂單金額" value={data.orderAmount} />
                <Field label="付款條件" value={data.paymentCondition} />
                <Field label="預收款餘額" value={data.advancePaymentBalance} />
                <Field label="核單日期" value={data.approvalDate} />
                <Field label="訂單狀態" value={data.orderStatus} />
                <Field label="虛擬聯絡電話" value={data.virtualContactPhone} />
                <div className="col-span-2">
                  <Field label="沖帳記錄" value={data.writeOffRecord} />
                </div>
                {data.note && (
                  <div className="col-span-4">
                    <div className="font-['Noto_Sans_TC',_sans-serif] text-[12px] font-[350] text-[#7c808c] mb-[4px]">
                      註記
                    </div>
                    <textarea
                      disabled
                      readOnly
                      value={data.note}
                      rows={3}
                      className="w-full px-[12px] py-[8px] rounded-[4px] border border-[#c4c9d3] bg-[#e9ebf2] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] resize-none cursor-not-allowed"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
