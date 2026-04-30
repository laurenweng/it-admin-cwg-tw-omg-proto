import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { Plus, Copy, Check, ChevronDown, ChevronRight } from "lucide-react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTab } from "./CwTab";
import { CwEmptyState } from "./CwEmptyState";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwDrawer } from "./CwDrawer";
import { CwRoundButton } from "./CwRoundButton";
import { CwInput } from "./CwInput";
import { CwButton } from "./CwButton";
import { CwTooltip } from './CwTooltip';
import { CwSelect } from './CwSelect';
import { CwDatePicker } from './CwDatePicker';
import { DateRange } from './CwDateRangePicker';
import { CwPopup } from './CwPopup';
import { CwToast } from './CwToast';
import { CwTextButton } from './CwTextButton';
export interface ERPCustomerInfo {
  customerNumber: string;
  customerName: string;
  taxId: string;
  address: string;
  contact: string;
  email: string;
  mobile: string;
  phone: string;
  status: string;
  // 新增欄位
  customerIdentity?: string;
  agreeMarketing?: string;
  marketingConsentDate?: string;
  lastTransactionDate?: string;
  invoiceTitle?: string;
}

export interface DraftCustomer {
  id: string;
  customerName: string;
  taxId: string;
  customerIdentity: string;
  savedAt: string;
  formData: ERPCustomerInfo;
}

interface ERPCustomerDetailProps {
  customer: ERPCustomerInfo;
  onClose: () => void;
  createMode?: boolean;
  onSaveDraft?: (draft: DraftCustomer) => void;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  active:   { bg: '#f0fdf4', color: '#166534' },
  inactive: { bg: '#f3f4f6', color: '#4b5563' },
};

// ── 地址資料型別 ───────────────────────────────────────────────
interface AddressRecord {
  id: string;
  country: string;
  postalCode: string;
  city: string;               // 城市／直轄市（含行政區，e.g. 台北市中山區）
  street: string;             // 道路門號（排除 country/postalCode/city 後的剩餘內容）
  isPrimary: boolean;         // 主要地址：唯一
  isActive: boolean;          // 生效中：可多個
  isPrimaryShipping: boolean; // 主要寄送地址：唯一
  isPrimaryInvoice: boolean;  // 主要發票地址：唯一
  updatedAt: string;
}

// 組合成完整地址字串，供列表顯示與複製使用
const fullAddress = (r: Pick<AddressRecord, 'country' | 'postalCode' | 'city' | 'street'>) =>
  [r.country === '台灣 Taiwan' ? '' : r.country, r.postalCode, r.city, r.street].filter(Boolean).join(' ');

// 地址表單型別（新增 & 編輯共用）
interface AddressForm {
  country: string;
  postalCode: string;
  city: string;
  street: string;
  isPrimary: boolean;
  isActive: boolean;
  isPrimaryShipping: boolean;
  isPrimaryInvoice: boolean;
}

const EMPTY_FORM: AddressForm = { country: '台灣', postalCode: '', city: '', street: '', isPrimary: false, isActive: true, isPrimaryShipping: false, isPrimaryInvoice: false };

// 國家選項（示範，可依需求擴充）
const COUNTRY_OPTIONS = ['台灣 Taiwan', '中國 China', '日本 Japan', '美國 USA', '香港 HongKong', '新加坡 Singapore', '馬來西亞 Malaysia'];

// 台灣行政區資料
const TW_DISTRICTS: { postalCode: string; city: string }[] = [
  { postalCode: '100', city: '台北市中正區' }, { postalCode: '103', city: '台北市大同區' },
  { postalCode: '104', city: '台北市中山區' }, { postalCode: '105', city: '台北市松山區' },
  { postalCode: '106', city: '台北市大安區' }, { postalCode: '108', city: '台北市萬華區' },
  { postalCode: '110', city: '台北市信義區' }, { postalCode: '111', city: '台北市士林區' },
  { postalCode: '112', city: '台北市北投區' }, { postalCode: '114', city: '台北市內湖區' },
  { postalCode: '115', city: '台北市南港區' }, { postalCode: '116', city: '台北市文山區' },
  { postalCode: '220', city: '新北市板橋區' }, { postalCode: '221', city: '新北市汐止區' },
  { postalCode: '231', city: '新北市新店區' }, { postalCode: '234', city: '新北市永和區' },
  { postalCode: '235', city: '新北市中和區' }, { postalCode: '236', city: '新北市土城區' },
  { postalCode: '238', city: '新北市樹林區' }, { postalCode: '241', city: '新北市三重區' },
  { postalCode: '242', city: '新北市新莊區' }, { postalCode: '244', city: '新北市林口區' },
  { postalCode: '247', city: '新北市蘆洲區' }, { postalCode: '251', city: '新北市淡水區' },
  { postalCode: '300', city: '新竹市東區' },   { postalCode: '302', city: '新竹縣竹北市' },
  { postalCode: '320', city: '桃園市中壢區' }, { postalCode: '324', city: '桃園市平鎮區' },
  { postalCode: '325', city: '桃園市龍潭區' }, { postalCode: '326', city: '桃園市楊梅區' },
  { postalCode: '330', city: '桃園市桃園區' }, { postalCode: '333', city: '桃園市龜山區' },
  { postalCode: '334', city: '桃園市八德區' }, { postalCode: '338', city: '桃園市蘆竹區' },
  { postalCode: '400', city: '台中市中區' },   { postalCode: '401', city: '台中市東區' },
  { postalCode: '402', city: '台中市南區' },   { postalCode: '403', city: '台中市西區' },
  { postalCode: '404', city: '台中市北區' },   { postalCode: '406', city: '台中市北屯區' },
  { postalCode: '407', city: '台中市西屯區' }, { postalCode: '408', city: '台中市南屯區' },
  { postalCode: '411', city: '台中市太平區' }, { postalCode: '412', city: '台中市大里區' },
  { postalCode: '420', city: '台中市豐原區' }, { postalCode: '427', city: '台中市潭子區' },
  { postalCode: '428', city: '台中市大雅區' }, { postalCode: '433', city: '台中市沙鹿區' },
  { postalCode: '436', city: '台中市清水區' }, { postalCode: '437', city: '台中市大甲區' },
  { postalCode: '500', city: '彰化市' },       { postalCode: '542', city: '南投縣草屯鎮' },
  { postalCode: '545', city: '南投縣埔里鎮' }, { postalCode: '551', city: '南投縣南投市' },
  { postalCode: '600', city: '嘉義市東區' },   { postalCode: '612', city: '嘉義縣太保市' },
  { postalCode: '640', city: '雲林縣斗六市' }, { postalCode: '700', city: '台南市中西區' },
  { postalCode: '701', city: '台南市東區' },   { postalCode: '702', city: '台南市南區' },
  { postalCode: '704', city: '台南市北區' },   { postalCode: '708', city: '台南市安平區' },
  { postalCode: '709', city: '台南市安南區' }, { postalCode: '710', city: '台南市永康區' },
  { postalCode: '730', city: '台南市新營區' }, { postalCode: '800', city: '高雄市新興區' },
  { postalCode: '802', city: '高雄市苓雅區' }, { postalCode: '803', city: '高雄市鹽埕區' },
  { postalCode: '804', city: '高雄市鼓山區' }, { postalCode: '806', city: '高雄市前鎮區' },
  { postalCode: '807', city: '高雄市三民區' }, { postalCode: '811', city: '高雄市楠梓區' },
  { postalCode: '813', city: '高雄市左營區' }, { postalCode: '820', city: '高雄市岡山區' },
  { postalCode: '830', city: '高雄市鳳山區' }, { postalCode: '900', city: '屏東市' },
  { postalCode: '950', city: '台東縣台東市' }, { postalCode: '970', city: '花蓮縣花蓮市' },
];

interface PhoneEntry {
  id: string;
  countryCode: string;
  areaCode: string;
  phone: string;
  ext: string;
  type: string;
  purpose?: string;
  isPrimary: boolean;
  isActive: boolean;
  updatedAt: string;
}

interface EmailEntry {
  id: string;
  email: string;
  purpose?: string;
  isPrimary: boolean;
  isActive: boolean;
  updatedAt: string;
}

interface ContactPerson {
  id: string;
  name: string;
  title?: string;
  phones: PhoneEntry[];
  emails: EmailEntry[];
  updatedAt: string;
}

interface PersonForm { name: string; phone: string; email: string; }
interface PhoneForm { countryCode: string; areaCode: string; phone: string; ext: string; type: string; isPrimary: boolean; isActive: boolean; }
interface EmailForm { email: string; isPrimary: boolean; isActive: boolean; }

const PHONE_TYPE_OPTIONS = ["Tel(O)", "Tel(H)", "Mobile", "Fax(O)", "Fax(H)", "Pager", "Telex", "Voice Mail"];

const EMPTY_PHONE_FORM: PhoneForm = { countryCode: '886', areaCode: '', phone: '', ext: '', type: 'Tel(O)', isPrimary: false, isActive: true };
const EMPTY_EMAIL_FORM: EmailForm = { email: '', isPrimary: false, isActive: true };
const EMPTY_PERSON_FORM: PersonForm = { name: '', phone: '', email: '' };

// ── Mock 地址資料（以客戶編號為 key）──────────────────────────────
// isPrimary：全客戶唯一一筆（預設主要地址）
// isActive：可多筆（生效中）
// isPrimaryShipping / isPrimaryInvoice：各唯一一筆
const mockAddressByCustomer: Record<string, AddressRecord[]> = {
  C001234: [
    { id: 'a1', country: '台灣 Taiwan', postalCode: '104', city: '台北市中山區', street: '中山北路二段7號',   isPrimary: true,  isActive: true,  isPrimaryShipping: true,  isPrimaryInvoice: true,  updatedAt: '2026-04-18' },
    { id: 'a2', country: '台灣 Taiwan', postalCode: '231', city: '新北市新店區', street: '中正路88號',         isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2026-02-05' },
    { id: 'a3', country: '台灣 Taiwan', postalCode: '330', city: '桃園市桃園區', street: '中正路500號3樓',     isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2025-09-03' },
    { id: 'a4', country: '台灣 Taiwan', postalCode: '404', city: '台中市北區',   street: '三民路二段119號',    isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2024-11-20' },
    { id: 'a5', country: '日本 Japan',  postalCode: '100-0001', city: '東京都千代田區', street: '千代田1-1 千代田ビル3F', isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2026-03-10' },
  ],
  C002345: [
    { id: 'b1', country: '台灣 Taiwan', postalCode: '220', city: '新北市板橋區', street: '文化路一段188號',    isPrimary: true,  isActive: true,  isPrimaryShipping: true,  isPrimaryInvoice: false, updatedAt: '2026-04-15' },
    { id: 'b2', country: '台灣 Taiwan', postalCode: '110', city: '台北市信義區', street: '松仁路100號',         isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: true,  updatedAt: '2026-01-20' },
    { id: 'b3', country: '台灣 Taiwan', postalCode: '320', city: '桃園市中壢區', street: '中山路500號',         isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2024-11-05' },
    { id: 'b4', country: '台灣 Taiwan', postalCode: '300', city: '新竹市東區',   street: '光復路一段101號',    isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2023-08-14' },
    { id: 'b5', country: '台灣 Taiwan', postalCode: '802', city: '高雄市苓雅區', street: '四維三路2號',         isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2022-03-09' },
  ],
  C003456: [
    { id: 'c1', country: '台灣 Taiwan', postalCode: '407', city: '台中市西屯區', street: '台灣大道三段99號',   isPrimary: true,  isActive: true,  isPrimaryShipping: true,  isPrimaryInvoice: true,  updatedAt: '2025-03-02' },
    { id: 'c2', country: '台灣 Taiwan', postalCode: '406', city: '台中市北屯區', street: '旅順路二段88號',      isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2024-07-18' },
    { id: 'c3', country: '台灣 Taiwan', postalCode: '500', city: '彰化市',       street: '中山路一段265號',    isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2023-12-01' },
  ],
  C004567: [
    { id: 'd1', country: '台灣 Taiwan', postalCode: '806', city: '高雄市前鎮區', street: '中山三路6號',         isPrimary: true,  isActive: true,  isPrimaryShipping: true,  isPrimaryInvoice: false, updatedAt: '2026-04-20' },
    { id: 'd2', country: '台灣 Taiwan', postalCode: '106', city: '台北市大安區', street: '忠孝東路四段100號',   isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: true,  updatedAt: '2026-02-11' },
    { id: 'd3', country: '台灣 Taiwan', postalCode: '701', city: '台南市東區',   street: '東門路一段200號',    isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2025-05-30' },
    { id: 'd4', country: '台灣 Taiwan', postalCode: '900', city: '屏東市',       street: '民族路33號',          isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2024-01-07' },
    { id: 'd5', country: '台灣 Taiwan', postalCode: '600', city: '嘉義市東區',   street: '垂楊路530號',         isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2023-07-14' },
  ],
  C005678: [
    { id: 'e1', country: '台灣 Taiwan', postalCode: '701', city: '台南市東區',   street: '裕農路198號',         isPrimary: true,  isActive: true,  isPrimaryShipping: true,  isPrimaryInvoice: true,  updatedAt: '2024-01-08' },
    { id: 'e2', country: '台灣 Taiwan', postalCode: '700', city: '台南市中西區', street: '民族路二段79號',      isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2023-06-22' },
    { id: 'e3', country: '台灣 Taiwan', postalCode: '807', city: '高雄市三民區', street: '九如一路516號',       isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2022-11-15' },
  ],
  C006789: [
    { id: 'f1', country: '台灣 Taiwan', postalCode: '100', city: '台北市中正區', street: '重南路1號',           isPrimary: true,  isActive: true,  isPrimaryShipping: true,  isPrimaryInvoice: true,  updatedAt: '2026-03-28' },
    { id: 'f2', country: '台灣 Taiwan', postalCode: '115', city: '台北市南港區', street: '經貿二路198號',       isPrimary: false, isActive: true,  isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2025-11-10' },
    { id: 'f3', country: '台灣 Taiwan', postalCode: '221', city: '新北市汐止區', street: '新台五路一段79號',    isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2025-02-14' },
    { id: 'f4', country: '台灣 Taiwan', postalCode: '333', city: '桃園市龜山區', street: '文化一路123號',       isPrimary: false, isActive: false, isPrimaryShipping: false, isPrimaryInvoice: false, updatedAt: '2022-10-19' },
  ],
};
const mockPersonsByCustomer: Record<string, ContactPerson[]> = {
  C001234: [
    { id: 'p1', name: '王小明', title: '業務副理', updatedAt: '2026-04-18',
      phones: [
        { id: 'ph1', countryCode: '886', areaCode: '2', phone: '2563-8888', ext: '123', type: 'Tel(O)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2026-04-18' },
        { id: 'ph1b', countryCode: '886', areaCode: '', phone: '0912-111-222', ext: '', type: 'Mobile', purpose: '手機備用', isPrimary: false, isActive: true, updatedAt: '2026-01-10' },
        { id: 'ph1c', countryCode: '886', areaCode: '', phone: '0933-456-789', ext: '', type: 'Mobile', purpose: '個人手機', isPrimary: false, isActive: true, updatedAt: '2025-11-05' },
        { id: 'ph1d', countryCode: '886', areaCode: '2', phone: '2563-7001', ext: '456', type: 'Tel(O)', purpose: '直線', isPrimary: false, isActive: false, updatedAt: '2025-03-20' },
        { id: 'ph1e', countryCode: '886', areaCode: '2', phone: '2563-6600', ext: '', type: 'Fax(O)', purpose: '傳真', isPrimary: false, isActive: true, updatedAt: '2024-12-01' },
      ],
      emails: [
        { id: 'em1', email: 'wangxm@example.com', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2026-04-18' },
        { id: 'em1b', email: 'wang.xm.biz@gmail.com', purpose: '個人備用', isPrimary: false, isActive: true, updatedAt: '2025-09-01' },
      ],
    },
    { id: 'p2', name: '秘書室', title: '行政秘書', updatedAt: '2026-03-01',
      phones: [
        { id: 'ph2', countryCode: '886', areaCode: '2', phone: '2563-9999', ext: '', type: 'Fax(O)', purpose: '傳真', isPrimary: false, isActive: true, updatedAt: '2026-03-01' },
        { id: 'ph2b', countryCode: '886', areaCode: '2', phone: '2563-8800', ext: '0', type: 'Tel(O)', purpose: '行政主線', isPrimary: true, isActive: true, updatedAt: '2026-03-01' },
      ],
      emails: [
        { id: 'em2', email: 'office@example.com', purpose: '行政往來', isPrimary: true, isActive: true, updatedAt: '2025-11-10' },
        { id: 'em2b', email: 'sec-backup@example.com', purpose: '備用信箱', isPrimary: false, isActive: false, updatedAt: '2024-06-01' },
        { id: 'em2c', email: 'secretary@example.com', purpose: '秘書專用', isPrimary: false, isActive: true, updatedAt: '2025-08-15' },
        { id: 'em2d', email: 'admin-notice@example.com', purpose: '公告通知', isPrimary: false, isActive: true, updatedAt: '2025-06-20' },
        { id: 'em2e', email: 'ceo-office@example.com', purpose: '主管轉發', isPrimary: false, isActive: false, updatedAt: '2024-01-10' },
      ],
    },
    { id: 'p3', name: '採購窗口', title: '採購專員', updatedAt: '2026-01-15',
      phones: [
        { id: 'ph3', countryCode: '886', areaCode: '', phone: '0912-345-678', ext: '', type: 'Mobile', purpose: '採購聯繫', isPrimary: true, isActive: true, updatedAt: '2026-01-15' },
      ],
      emails: [
        { id: 'em3x', email: 'purchase@example.com', purpose: '採購詢價', isPrimary: true, isActive: true, updatedAt: '2026-01-15' },
      ],
    },
    { id: 'p3b', name: '財務部', title: '財務主管', updatedAt: '2025-07-20',
      phones: [
        { id: 'ph3c', countryCode: '886', areaCode: '2', phone: '2563-7777', ext: '88', type: 'Tel(O)', purpose: '財務聯繫', isPrimary: true, isActive: true, updatedAt: '2025-07-20' },
      ],
      emails: [
        { id: 'em3d', email: 'finance@example.com', purpose: '請款對帳', isPrimary: true, isActive: true, updatedAt: '2025-07-20' },
        { id: 'em3e', email: 'acc@example.com', purpose: '會計副本', isPrimary: false, isActive: true, updatedAt: '2025-07-20' },
      ],
    },
  ],
  C002345: [
    { id: 'p4', name: '李大華', title: '業務總監', updatedAt: '2026-04-15',
      phones: [
        { id: 'ph4', countryCode: '886', areaCode: '2', phone: '2234-5678', ext: '66', type: 'Tel(O)', purpose: '業務窗口', isPrimary: true, isActive: true, updatedAt: '2026-04-15' },
        { id: 'ph4b', countryCode: '886', areaCode: '', phone: '0930-888-999', ext: '', type: 'Mobile', purpose: '緊急聯絡', isPrimary: false, isActive: true, updatedAt: '2026-02-01' },
      ],
      emails: [
        { id: 'em4a', email: 'contact@htc.com.tw', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2026-04-15' },
        { id: 'em4b', email: 'li.dahua@htc.com.tw', purpose: '個人信箱', isPrimary: false, isActive: true, updatedAt: '2026-03-10' },
      ],
    },
    { id: 'p5', name: '陳秘書', title: '特助', updatedAt: '2026-02-10',
      phones: [
        { id: 'ph5', countryCode: '886', areaCode: '2', phone: '2234-5679', ext: '', type: 'Tel(O)', purpose: '行政聯繫', isPrimary: true, isActive: true, updatedAt: '2026-02-10' },
      ],
      emails: [
        { id: 'em5a', email: 'secretary@htc.com.tw', purpose: '秘書信箱', isPrimary: true, isActive: true, updatedAt: '2026-01-08' },
      ],
    },
    { id: 'p6', name: '林採購', title: '', updatedAt: '2024-07-22',
      phones: [],
      emails: [
        { id: 'em6a', email: 'purchase@htc.com.tw', purpose: '採購通知', isPrimary: true, isActive: false, updatedAt: '2024-07-22' },
      ],
    },
  ],
  C003456: [
    { id: 'p7', name: '陳美玲', title: '負責人', updatedAt: '2025-03-02',
      phones: [
        { id: 'ph6', countryCode: '886', areaCode: '4', phone: '2258-0777', ext: '', type: 'Tel(H)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2025-03-02' },
        { id: 'ph6b', countryCode: '886', areaCode: '', phone: '0988-123-456', ext: '', type: 'Mobile', purpose: '手機', isPrimary: false, isActive: true, updatedAt: '2025-03-02' },
      ],
      emails: [
        { id: 'em7a', email: 'chenml@example.com', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2025-03-02' },
      ],
    },
    { id: 'p8', name: '客服中心', title: '', updatedAt: '2024-11-16',
      phones: [
        { id: 'ph7', countryCode: '886', areaCode: '4', phone: '2258-0700', ext: '', type: 'Tel(O)', purpose: '客服窗口', isPrimary: true, isActive: true, updatedAt: '2024-11-16' },
        { id: 'ph7b', countryCode: '886', areaCode: '4', phone: '2258-0701', ext: '', type: 'Fax(O)', purpose: '客服傳真', isPrimary: false, isActive: true, updatedAt: '2024-11-16' },
      ],
      emails: [
        { id: 'em7b', email: 'service@example.com', purpose: '客服信箱', isPrimary: true, isActive: true, updatedAt: '2024-11-16' },
      ],
    },
  ],
  C004567: [
    { id: 'p9', name: '張志遠', title: '採購主管', updatedAt: '2026-04-20',
      phones: [
        { id: 'ph8', countryCode: '886', areaCode: '7', phone: '3333-5555', ext: '1', type: 'Tel(O)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2026-04-20' },
        { id: 'ph8b', countryCode: '886', areaCode: '', phone: '0955-222-333', ext: '', type: 'Mobile', purpose: '外出聯絡', isPrimary: false, isActive: true, updatedAt: '2026-01-15' },
      ],
      emails: [
        { id: 'em8a', email: 'zhangzr@example.com', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2026-04-20' },
        { id: 'em8b', email: 'zhang.zhiyuan@corp.com', purpose: '公司信箱', isPrimary: false, isActive: true, updatedAt: '2026-02-01' },
      ],
    },
    { id: 'p10', name: '財務部', title: '財務長', updatedAt: '2026-01-05',
      phones: [
        { id: 'ph9', countryCode: '886', areaCode: '7', phone: '3333-5556', ext: '', type: 'Tel(O)', purpose: '財務往來', isPrimary: true, isActive: true, updatedAt: '2026-01-05' },
      ],
      emails: [
        { id: 'em9a', email: 'finance@zhiyuan.com', purpose: '財務通知', isPrimary: true, isActive: true, updatedAt: '2025-12-01' },
        { id: 'em9b', email: 'cfo@zhiyuan.com', purpose: '財務長信箱', isPrimary: false, isActive: true, updatedAt: '2025-12-01' },
      ],
    },
    { id: 'p11', name: '業務部', title: '', updatedAt: '2025-08-18',
      phones: [
        { id: 'ph10', countryCode: '886', areaCode: '', phone: '0945-000-002', ext: '', type: 'Mobile', purpose: '業務聯繫', isPrimary: true, isActive: true, updatedAt: '2025-08-18' },
      ],
      emails: [],
    },
  ],
  C005678: [
    { id: 'p12', name: '林淑芬', title: '主任', updatedAt: '2024-01-08',
      phones: [
        { id: 'ph11', countryCode: '886', areaCode: '6', phone: '2345-6789', ext: '', type: 'Tel(H)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2024-01-08' },
        { id: 'ph11b', countryCode: '886', areaCode: '', phone: '0966-555-444', ext: '', type: 'Mobile', purpose: '行動電話', isPrimary: false, isActive: true, updatedAt: '2024-01-08' },
      ],
      emails: [
        { id: 'em10a', email: 'linsf@example.com', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2024-01-08' },
      ],
    },
    { id: 'p13', name: '行政部', title: '', updatedAt: '2023-06-22',
      phones: [],
      emails: [
        { id: 'em10b', email: 'admin-old@example.com', purpose: '舊信箱', isPrimary: false, isActive: false, updatedAt: '2023-06-22' },
        { id: 'em10c', email: 'admin@example.com', purpose: '新信箱', isPrimary: true, isActive: true, updatedAt: '2024-03-01' },
      ],
    },
  ],
  C006789: [
    { id: 'p14', name: '黃文龍', title: '總經理', updatedAt: '2026-03-28',
      phones: [
        { id: 'ph12', countryCode: '886', areaCode: '2', phone: '2356-0678', ext: '88', type: 'Tel(O)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2026-03-28' },
        { id: 'ph12b', countryCode: '886', areaCode: '', phone: '0910-888-777', ext: '', type: 'Mobile', purpose: '個人手機', isPrimary: false, isActive: true, updatedAt: '2026-03-28' },
      ],
      emails: [
        { id: 'em11a', email: 'huang.wl@cwgv.com.tw', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2026-03-28' },
        { id: 'em11b', email: 'ceo@cwgv.com.tw', purpose: '總經理信箱', isPrimary: false, isActive: true, updatedAt: '2026-03-28' },
      ],
    },
    { id: 'p15', name: '客服中心', title: '', updatedAt: '2025-10-12',
      phones: [
        { id: 'ph13', countryCode: '886', areaCode: '2', phone: '2356-0679', ext: '', type: 'Tel(O)', purpose: '客服窗口', isPrimary: true, isActive: true, updatedAt: '2025-10-12' },
        { id: 'ph13b', countryCode: '886', areaCode: '2', phone: '2356-0680', ext: '', type: 'Fax(O)', purpose: '傳真', isPrimary: false, isActive: true, updatedAt: '2025-10-12' },
      ],
      emails: [
        { id: 'em12a', email: 'service@cwgv.com.tw', purpose: '客服信箱', isPrimary: true, isActive: true, updatedAt: '2025-06-05' },
        { id: 'em12b', email: 'old-service@cwgv.com.tw', purpose: '舊客服', isPrimary: false, isActive: false, updatedAt: '2023-01-01' },
      ],
    },
    { id: 'p15b', name: '業務部', title: '業務經理', updatedAt: '2025-05-01',
      phones: [
        { id: 'ph13c', countryCode: '886', areaCode: '2', phone: '2356-1100', ext: '5', type: 'Tel(O)', purpose: '業務洽談', isPrimary: true, isActive: true, updatedAt: '2025-05-01' },
      ],
      emails: [
        { id: 'em12c', email: 'sales@cwgv.com.tw', purpose: '業務詢問', isPrimary: true, isActive: true, updatedAt: '2025-05-01' },
      ],
    },
  ],
  C007890: [
    { id: 'p16', name: '洪建志', title: '店長', updatedAt: '2025-10-01',
      phones: [
        { id: 'ph14', countryCode: '886', areaCode: '8', phone: '3333-5566', ext: '', type: 'Tel(H)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2025-10-01' },
        { id: 'ph14b', countryCode: '886', areaCode: '', phone: '0933-777-666', ext: '', type: 'Mobile', purpose: '行動電話', isPrimary: false, isActive: true, updatedAt: '2025-10-01' },
      ],
      emails: [
        { id: 'em13a', email: 'hung.jz@example.com', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2025-10-01' },
      ],
    },
    { id: 'p17', name: '行政窗口', title: '', updatedAt: '2025-08-14',
      phones: [
        { id: 'ph15', countryCode: '886', areaCode: '8', phone: '3333-5567', ext: '', type: 'Tel(O)', purpose: '行政聯繫', isPrimary: true, isActive: true, updatedAt: '2025-08-14' },
      ],
      emails: [
        { id: 'em13b', email: 'admin@example.com', purpose: '行政信箱', isPrimary: true, isActive: true, updatedAt: '2025-08-14' },
      ],
    },
  ],
  C008901: [
    { id: 'p18', name: '邱雅玲', title: '業務代表', updatedAt: '2024-05-10',
      phones: [
        { id: 'ph16', countryCode: '886', areaCode: '4', phone: '7777-8888', ext: '2', type: 'Tel(O)', purpose: '主要聯繫', isPrimary: true, isActive: true, updatedAt: '2024-05-10' },
        { id: 'ph16b', countryCode: '886', areaCode: '', phone: '0922-333-444', ext: '', type: 'Mobile', purpose: '外出聯絡', isPrimary: false, isActive: true, updatedAt: '2024-05-10' },
      ],
      emails: [
        { id: 'em14a', email: 'chiu.yl@example.com', purpose: '主要信件', isPrimary: true, isActive: true, updatedAt: '2024-05-10' },
        { id: 'em14b', email: 'qiu.yaling@work.com', purpose: '公司信箱', isPrimary: false, isActive: true, updatedAt: '2024-05-10' },
      ],
    },
    { id: 'p19', name: '行政部', title: '行政主任', updatedAt: '2024-03-01',
      phones: [
        { id: 'ph17', countryCode: '886', areaCode: '4', phone: '7777-8889', ext: '', type: 'Tel(O)', purpose: '行政往來', isPrimary: true, isActive: true, updatedAt: '2024-03-01' },
      ],
      emails: [
        { id: 'em15a', email: 'admin@chiu.com', purpose: '行政信箱', isPrimary: true, isActive: true, updatedAt: '2024-03-01' },
        { id: 'em15b', email: 'admin-old@chiu.com', purpose: '舊信箱', isPrimary: false, isActive: false, updatedAt: '2023-08-15' },
      ],
    },
    { id: 'p19b', name: '技術支援', title: 'IT工程師', updatedAt: '2023-11-20',
      phones: [
        { id: 'ph17b', countryCode: '886', areaCode: '4', phone: '7777-9000', ext: '100', type: 'Tel(O)', purpose: '技術問題', isPrimary: true, isActive: true, updatedAt: '2023-11-20' },
      ],
      emails: [
        { id: 'em15c', email: 'it@chiu.com', purpose: 'IT支援', isPrimary: true, isActive: true, updatedAt: '2023-11-20' },
      ],
    },
  ],
};
// ── 共用地址表單欄位元件 ──────────────────────────────────────
function AddressFormFields({
  form,
  errors,
  onChange,
}: {
  form: AddressForm;
  errors: Partial<Record<keyof AddressForm, string>>;
  onChange: (field: keyof AddressForm, value: string | boolean) => void;
}) {
  const fieldClass = "flex flex-col gap-[5px]";
  const labelClass = "font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#1c1c1c]";
  const errorClass = "text-[12px] text-[#e53e3e] font-['Noto_Sans_TC',_sans-serif]";

  return (
    <div className="flex flex-col gap-[16px]">
      {/* 國家 */}
      <div className={fieldClass}>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          國家 <span className="text-[#e53e3e]">*</span>
        </label>
        <select
          value={form.country}
          onChange={(e) => {
            onChange('country', e.target.value);
            if (e.target.value !== '台灣') {
              onChange('city', '');
              onChange('postalCode', '');
            }
          }}
          className="h-[35px] px-[10px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif] bg-white focus:outline-none focus:border-[#0078d4]"
          style={{ fontWeight: 350 }}
        >
          {COUNTRY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* 城市、行政區、郵遞區號（合併可搜尋下拉，僅台灣顯示） */}
      {form.country === '台灣' && (() => {
        const [districtOpen, setDistrictOpen] = useState(false);
        const [districtKeyword, setDistrictKeyword] = useState('');
        const districtRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (!districtOpen) return;
          const handler = (e: MouseEvent) => {
            if (districtRef.current && !districtRef.current.contains(e.target as Node)) {
              setDistrictOpen(false);
            }
          };
          document.addEventListener('mousedown', handler);
          return () => document.removeEventListener('mousedown', handler);
        }, [districtOpen]);

        const displayValue = form.city
          ? `${form.postalCode ? form.postalCode + ' ' : ''}${form.city}`
          : '';
        const filtered = TW_DISTRICTS.filter(d =>
          d.postalCode.includes(districtKeyword) ||
          d.city.includes(districtKeyword)
        );

        return (
          <div className={fieldClass} ref={districtRef} style={{ position: 'relative' }}>
            <label className={labelClass} style={{ fontWeight: 500 }}>
              城市、行政區、郵遞區號 <span className="text-[#e53e3e]">*</span>
            </label>
            <div
              className={`flex items-center h-[35px] border rounded-[4px] px-[10px] gap-[6px] cursor-text bg-white transition-colors ${districtOpen ? 'border-[#0078d4]' : 'border-[#c4c9d3] hover:border-[#9ca3af]'}`}
              onClick={() => { setDistrictOpen(true); setDistrictKeyword(''); }}
            >
              {districtOpen ? (
                <input
                  autoFocus
                  value={districtKeyword}
                  onChange={(e) => setDistrictKeyword(e.target.value)}
                  placeholder="輸入郵遞區號或行政區名稱"
                  className="flex-1 outline-none text-[14px] font-['Noto_Sans_TC',_sans-serif] bg-transparent"
                  style={{ fontWeight: 350 }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span
                  className={`flex-1 text-[14px] font-['Noto_Sans_TC',_sans-serif] truncate ${displayValue ? 'text-[#1c1c1c]' : 'text-[#9ca3af]'}`}
                  style={{ fontWeight: 350 }}
                >
                  {displayValue || '請選擇城市、行政區'}
                </span>
              )}
            </div>

            {/* 下拉選項 */}
            {districtOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-[200] bg-white border border-[#c4c9d3] rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] max-h-[220px] overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-[12px] py-[10px] text-[13px] text-[#9ca3af] font-['Noto_Sans_TC',_sans-serif]">
                    查無符合結果
                  </div>
                ) : (
                  filtered.map((d, i) => (
                    <button
                      key={`${d.postalCode}-${d.city}-${i}`}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onChange('postalCode', d.postalCode);
                        onChange('city', d.city);
                        setDistrictOpen(false);
                      }}
                      className="w-full text-left px-[12px] py-[8px] flex items-center gap-[10px] hover:bg-[#e6f2fb] transition-colors"
                    >
                      <span
                        className="text-[12px] text-[#7c808c] tabular-nums font-['Noto_Sans_TC',_sans-serif] w-[36px] shrink-0"
                        style={{ fontWeight: 400 }}
                      >
                        {d.postalCode}
                      </span>
                      <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                        {d.city}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}

            {errors.city && <span className={errorClass}>{errors.city}</span>}
          </div>
        );
      })()}

      {/* 道路門號 */}
      <div className={fieldClass}>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          地址<span className="text-[#e53e3e]">*</span>
        </label>
        <CwInput
          value={form.street}
          placeholder="中山北路二段7號3樓"
          onChange={(e) => onChange('street', e.target.value)}
        />
        {errors.street && <span className={errorClass}>{errors.street}</span>}
      </div>

      {/* 分隔線 */}
      <div className="border-t border-[#f0f0f0] pt-[4px]" />

      {/* 生效 */}
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => onChange('isActive', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer"
        />
        <div className="flex flex-col gap-[2px]">
          <span className="font-['Noto_Sans_TC',_sans-serif] text-[12px] text-[#7c808c]" style={{ fontWeight: 350 }}>
            生效
            <CwTooltip content="勾選表示此地址目前可被使用">
              <Info className="w-[14px] h-[12px] text-[#01579b] cursor-help shrink-0 ml-1" />
            </CwTooltip>
          </span>
        </div>
      </label>

      {/* 主要寄送 */}
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.isPrimaryShipping}
          onChange={(e) => onChange('isPrimaryShipping', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer"
        />
        <div className="flex flex-col gap-[2px]">
          <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
            主要寄送地址(ship to)
            <span>
            <CwTooltip content="每位客戶僅能有一筆主要寄送地址">
              <Info className="w-[14px] h-[12px] text-[#01579b] cursor-help shrink-0 ml-1" />
            </CwTooltip>
            </span>
          </span>
        </div>
      </label>

      {/* 主要發票 */}
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.isPrimaryInvoice}
          onChange={(e) => onChange('isPrimaryInvoice', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer"
        />
        <div className="flex flex-col gap-[2px]">
          <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
            主要付款地址(bill to)        
            <span>
            <CwTooltip content="每位客戶僅能有一筆主要付款地址，作為沖賬用途">
              <Info className="w-[14px] h-[12px] text-[#01579b] cursor-help shrink-0 ml-1" />
            </CwTooltip>
            </span>
          </span>
        </div>
      </label>

    </div>
  );
}

function PersonFormFields({ form, errors, onChange }: {
  form: PersonForm;
  errors: Partial<Record<keyof PersonForm, string>>;
  onChange: (field: keyof PersonForm, value: string) => void;
}) {
  const fc = "flex flex-col gap-[5px]";
  const lc = "font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#1c1c1c]";
  const ec = "text-[12px] text-[#e53e3e] font-['Noto_Sans_TC',_sans-serif]";
  return (
    <div className="flex flex-col gap-[16px]">
      <div className={fc}>
        <label className={lc} style={{ fontWeight: 500 }}>聯絡人名稱 <span className="text-[#e53e3e]">*</span></label>
        <CwInput value={form.name} placeholder="王小明" onChange={(e) => onChange('name', e.target.value)} />
        {errors.name && <span className={ec}>{errors.name}</span>}
      </div>
      <div className={fc}>
        <label className={lc} style={{ fontWeight: 500 }}>電話</label>
        <CwInput value={form.phone} placeholder="0912-345-678" onChange={(e) => onChange('phone', e.target.value)} />
      </div>
      <div className={fc}>
        <label className={lc} style={{ fontWeight: 500 }}>Email</label>
        <CwInput value={form.email} placeholder="user@example.com" onChange={(e) => onChange('email', e.target.value)} />
      </div>
    </div>
  );
}

function PhoneFormFields({ form, errors, onChange }: {
  form: PhoneForm;
  errors: Partial<Record<keyof PhoneForm, string>>;
  onChange: (field: keyof PhoneForm, value: string | boolean) => void;
}) {
  const fc = "flex flex-col gap-[5px]";
  const lc = "font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#1c1c1c]";
  const ec = "text-[12px] text-[#e53e3e] font-['Noto_Sans_TC',_sans-serif]";
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-[1fr_110px] gap-[12px]">
        <div className={fc}>
          <label className={`${lc} flex items-center gap-[4px]`} style={{ fontWeight: 500 }}>
            電話號碼 <span className="text-[#e53e3e]">*</span>
            <CwTooltip content="電話一律加區域號碼，並以「-」區隔，手機號碼不加分隔號">
              <Info className="w-[13px] h-[13px] text-[#01579b] cursor-help shrink-0" />
            </CwTooltip>
          </label>
          <CwInput value={form.phone} placeholder="02-2563-8888" onChange={(e) => onChange('phone', e.target.value)} />
          {errors.phone && <span className={ec}>{errors.phone}</span>}
        </div>
        <div className={fc}>
          <label className={lc} style={{ fontWeight: 500 }}>分機</label>
          <CwInput value={form.ext} placeholder="123" onChange={(e) => onChange('ext', e.target.value)} />
        </div>
      </div>
      <div className={fc}>
        <label className={lc} style={{ fontWeight: 500 }}>電話類型</label>
        <select value={form.type} onChange={(e) => onChange('type', e.target.value)}
          className="h-[35px] px-[10px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif] bg-white focus:outline-none focus:border-[#0078d4]"
          style={{ fontWeight: 350 }}>
          {PHONE_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input type="checkbox" checked={form.isPrimary} onChange={(e) => onChange('isPrimary', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer" />
        <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
          設為主要電話
          <CwTooltip content="同一聯絡人僅能有一筆主要電話，設定後會自動取消其他主要標記">
            <Info className="w-[14px] h-[12px] text-[#01579b] cursor-help shrink-0 ml-1" />
          </CwTooltip>
        </span>
      </label>
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input type="checkbox" checked={form.isActive} onChange={(e) => onChange('isActive', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer" />
        <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>生效中</span>
      </label>
    </div>
  );
}

function EmailFormFields({ form, errors, onChange }: {
  form: EmailForm;
  errors: Partial<Record<keyof EmailForm, string>>;
  onChange: (field: keyof EmailForm, value: string | boolean) => void;
}) {
  const fc = "flex flex-col gap-[5px]";
  const lc = "font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#1c1c1c]";
  const ec = "text-[12px] text-[#e53e3e] font-['Noto_Sans_TC',_sans-serif]";
  return (
    <div className="flex flex-col gap-[16px]">
      <div className={fc}>
        <label className={lc} style={{ fontWeight: 500 }}>Email <span className="text-[#e53e3e]">*</span></label>
        <CwInput value={form.email} placeholder="example@company.com" onChange={(e) => onChange('email', e.target.value)} />
        {errors.email && <span className={ec}>{errors.email}</span>}
      </div>
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input type="checkbox" checked={form.isPrimary} onChange={(e) => onChange('isPrimary', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer" />
        <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
          設為主要 Email
          <CwTooltip content="同一聯絡人僅能有一筆主要 Email，設定後會自動取消其他主要標記">
            <Info className="w-[14px] h-[12px] text-[#01579b] cursor-help shrink-0 ml-1" />
          </CwTooltip>
        </span>
      </label>
      <label className="flex items-center gap-[10px] cursor-pointer select-none">
        <input type="checkbox" checked={form.isActive} onChange={(e) => onChange('isActive', e.target.checked)}
          className="w-[16px] h-[16px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer" />
        <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>生效中</span>
      </label>
    </div>
  );
}

// ── 其他資訊資料型別 ──────────────────────────────────────────
interface CustomerOtherInfo {
  taxIdNumber: string;
  invoiceIssueMethod: string;
  agreeMarketing: string;
  checkoutCycle: string;
  customerCategory: string;
  customerNote: string;
  invoiceTitle: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  childrenCount: string;
  industry: string;
  education: string;
  jobPosition: string;
  annualIncome: string;
  monthlyBookBudget: string;
  frequentBookCategory: string;
  companyName: string;
  jobTitle: string;
  industryClassification: string;
  autoRenewalInvoice: string;
}

const EMPTY_OTHER_INFO: CustomerOtherInfo = {
  taxIdNumber: '',
  invoiceIssueMethod: '6',
  agreeMarketing: '1',
  checkoutCycle: '即期付款',
  customerCategory: '個人客戶',
  customerNote: '',
  invoiceTitle: '',
  gender: '',
  birthDate: '',
  maritalStatus: '',
  childrenCount: '',
  industry: '',
  education: '',
  jobPosition: '',
  annualIncome: '',
  monthlyBookBudget: '',
  frequentBookCategory: '',
  companyName: '',
  jobTitle: '',
  industryClassification: '',
  autoRenewalInvoice: '',
};

// ── 基本資料 tab helper 元件（提升至頂層，避免 render 內重建造成 input 失去 focus）──

const basicLabelStyle: React.CSSProperties = { fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 350 };

function BasicField({ label, children, required, error }: { label: string; children: React.ReactNode; required?: boolean; error?: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <span style={basicLabelStyle}>
        {label}
        {required && <span className="text-[#e53e3e] ml-[2px]">*</span>}
      </span>
      {children}
      {error && <span className="text-[12px] text-[#e53e3e] font-['Noto_Sans_TC',_sans-serif]">{error}</span>}
    </div>
  );
}

function OtherRequiredLabel({ text }: { text: string }) {
  return (
    <label className="block text-foreground" style={basicLabelStyle}>{text}<span style={{ color: '#E53E3E' }}> *</span></label>
  );
}

function OtherErrorText({ error }: { error?: string }) {
  return error ? <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E', fontFamily: 'var(--font-noto-sans-tc)' }}>{error}</p> : null;
}

function OtherTextField({ label, fKey, required, colSpan, value, onChange, error }: {
  label: string; fKey: keyof CustomerOtherInfo; required?: boolean; colSpan?: number;
  value: string; onChange: (fKey: keyof CustomerOtherInfo, val: string) => void; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1" style={colSpan ? { gridColumn: `span ${colSpan}` } : undefined}>
      {required ? <OtherRequiredLabel text={label} /> : <label style={basicLabelStyle}>{label}</label>}
      <CwInput value={value} onChange={e => onChange(fKey, (e as React.ChangeEvent<HTMLInputElement>).target.value)} error={error} />
    </div>
  );
}

function OtherSelectField({ label, fKey, options, required, disabled, value, onChange, error }: {
  label: string; fKey: keyof CustomerOtherInfo; options: { value: string; label: string }[]; required?: boolean; disabled?: boolean;
  value: string; onChange: (fKey: keyof CustomerOtherInfo, val: string) => void; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {required ? <OtherRequiredLabel text={label} /> : <label style={basicLabelStyle}>{label}</label>}
      <CwSelect options={options} value={value} onChange={v => onChange(fKey, v as string)} clearable error={!!error} disabled={disabled} />
      <OtherErrorText error={error} />
    </div>
  );
}

function OtherDateField({ label, fKey, value, onChange }: {
  label: string; fKey: keyof CustomerOtherInfo;
  value: string; onChange: (fKey: keyof CustomerOtherInfo, val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label style={basicLabelStyle}>{label}</label>
      <CwDatePicker value={value ? new Date(value) : null} onChange={d => onChange(fKey, d ? d.toISOString().slice(0, 10) : '')} />
    </div>
  );
}

// ── 訂閱年資資料型別 ──────────────────────────────────────────
interface PubSeniority {
  firstSubDate: string;
  firstSubNum: string;
  recentSubDate: string;
  recentSubNum: string;
  recentEndDate: string;
  recentEndNum: string;
  totalSubNum: string;
  totalSubYears: string;
}

interface SubscriptionSeniority {
  lastOrderDate: string;
  // 天下訂閱
  commonwealth: PubSeniority;
  commonwealthDigital: PubSeniority;
  smileQuarterly: PubSeniority;
  smileDigital: PubSeniority;
  crossing: PubSeniority;
  crossingDigital: PubSeniority;
  commonwealthIpad: PubSeniority;
  webAccess: PubSeniority;
  fullReadSubscription: PubSeniority;
  // 非天下訂閱
  commonHealth: PubSeniority;
  commonHealthDigital: PubSeniority;
  cheers: PubSeniority;
  cheersDigital: PubSeniority;
  parenting: PubSeniority;
  parentingDigital: PubSeniority;
  asteroid: PubSeniority;
  parentingBaby: PubSeniority;
  parentingBabyDigital: PubSeniority;
}

const EMPTY_PUB: PubSeniority = {
  firstSubDate: '', firstSubNum: '',
  recentSubDate: '', recentSubNum: '',
  recentEndDate: '', recentEndNum: '',
  totalSubNum: '', totalSubYears: '',
};

const EMPTY_SUB_SENIORITY: SubscriptionSeniority = {
  lastOrderDate: '',
  commonwealth: { ...EMPTY_PUB },
  commonwealthDigital: { ...EMPTY_PUB },
  smileQuarterly: { ...EMPTY_PUB },
  smileDigital: { ...EMPTY_PUB },
  crossing: { ...EMPTY_PUB },
  crossingDigital: { ...EMPTY_PUB },
  commonwealthIpad: { ...EMPTY_PUB },
  webAccess: { ...EMPTY_PUB },
  fullReadSubscription: { ...EMPTY_PUB },
  commonHealth: { ...EMPTY_PUB },
  commonHealthDigital: { ...EMPTY_PUB },
  cheers: { ...EMPTY_PUB },
  cheersDigital: { ...EMPTY_PUB },
  parenting: { ...EMPTY_PUB },
  parentingDigital: { ...EMPTY_PUB },
  asteroid: { ...EMPTY_PUB },
  parentingBaby: { ...EMPTY_PUB },
  parentingBabyDigital: { ...EMPTY_PUB },
};

interface MergeRelation {
  id: string;
  parentNo: string;
  parentName: string;
  childNo: string;
  childName: string;
  isActive: boolean;
  note: string;
}

interface MergeRelationForm {
  parentNo: string;
  parentName: string;
  childNo: string;
  childName: string;
  isActive: boolean;
  note: string;
}

const EMPTY_MERGE_FORM: MergeRelationForm = {
  parentNo: '', parentName: '', childNo: '', childName: '', isActive: true, note: '',
};

interface CustomerLookupItem { customerNumber: string; customerName: string; }
const mockCustomerLookup: CustomerLookupItem[] = [
  { customerNumber: 'C001234', customerName: '王小明' },
  { customerNumber: 'C002345', customerName: '宏達股份有限公司' },
  { customerNumber: 'C003456', customerName: '陳美玲' },
  { customerNumber: 'C004567', customerName: '志遠國際貿易有限公司' },
  { customerNumber: 'C005678', customerName: '林淑芬' },
  { customerNumber: 'C006789', customerName: '天下文化事業股份有限公司' },
  { customerNumber: 'C007890', customerName: '洪建志' },
  { customerNumber: 'C008901', customerName: '邱雅玲國際股份有限公司' },
];

const mockMergeRelations: MergeRelation[] = [
  { id: 'mr1', parentNo: 'C001234', parentName: '天下集團採購部', childNo: 'C001234', childName: '天下集團採購部', isActive: true, note: '主帳號合併' },
  { id: 'mr2', parentNo: 'C001234', parentName: '天下集團採購部', childNo: 'C001235', childName: '天下集團財務部', isActive: true, note: '財務子帳' },
  { id: 'mr3', parentNo: 'C001234', parentName: '天下集團採購部', childNo: 'C009876', childName: '天下集團行政室', isActive: false, note: '已停用' },
];

// ── 訂戶權益 mock 資料 ────────────────────────────────────────
const mockPaperRightsData = [
  { id: 1, product: '天下雜誌', subscriberId: '1234567', subscriberName: '王小明', autoRenewal: '是', recentStartDate: '2024-11-01', recentEndDate: '2025-10-31', subscriptionStartDate: '2024-11-01', subscriptionEndDate: '2025-10-31', physicalYears: '1' },
  { id: 2, product: '康健雜誌', subscriberId: '7654321', subscriberName: '陳美玲', autoRenewal: '否', recentStartDate: '2024-06-01', recentEndDate: '2025-05-31', subscriptionStartDate: '2024-06-01', subscriptionEndDate: '2025-05-31', physicalYears: '2' },
];
const mockDigitalRightsData = [
  { id: 1, memberAccount: 'wang.xiaoming@example.com', memberEmail: 'wang.xiaoming@example.com', product: '天下雜誌', autoRenewal: '是', recentStartDate: '2024-11-01', recentEndDate: '2025-10-31', rightsExpiry: '2025-10-31', physicalYears: '1' },
];

// ── 操作記錄 mock 資料 ────────────────────────────────────────
const mockOperationLogData = [
  { id: 1, operateTime: '2025/03/15 - 14:32:01', operator: '林小華', category: '聯絡資訊', changedField: '聯絡電話', beforeValue: '02-2345-6789', afterValue: '02-9876-5432' },
  { id: 2, operateTime: '2025/03/10 - 09:15:44', operator: '系統',   category: '基本資料', changedField: '訂閱到期日', beforeValue: '2025-03-09', afterValue: '2026-03-09' },
  { id: 3, operateTime: '2025/02/28 - 16:05:22', operator: '陳美玲', category: '聯絡資訊', changedField: '電子郵件', beforeValue: 'old.email@example.com', afterValue: 'new.email@example.com' },
  { id: 4, operateTime: '2025/02/20 - 11:48:09', operator: '王大明', category: '基本資料', changedField: '客戶名稱', beforeValue: '天下集團採購部舊版', afterValue: '天下集團採購部' },
  { id: 5, operateTime: '2025/01/08 - 10:00:00', operator: '系統',   category: '地址',     changedField: '帳號狀態', beforeValue: '停用', afterValue: '啟用' },
];

type TabId = 'basic' | 'address' | 'contact' | 'other' | 'subscription' | 'relation' | 'subscriber-rights' | 'operation-log';

const TABS_DEFAULT: { id: TabId; label: string }[] = [
  { id: 'address',           label: '地址' },
  { id: 'contact',           label: '聯絡資訊' },
  { id: 'subscription',      label: '訂閱年資' },
  { id: 'relation',          label: '父子關聯' },
  { id: 'basic',             label: '基本資料' },
  { id: 'subscriber-rights', label: '訂戶權益' },
  { id: 'operation-log',     label: '操作記錄' },
];

const TABS_CREATE: { id: TabId; label: string }[] = [
  { id: 'basic',   label: '基本資料' },
  { id: 'address', label: '地址' },
  { id: 'contact', label: '聯絡資訊' },
];

interface BasicInfo {
  customerName: string;
  customerIdentity: string;
  status: string;
  customerNumber: string;
  taxId: string;
  invoiceIssueMethod: string;
  agreeMarketing: string;
  marketingConsentDate: string;
  customerCategory: string;
  lastTransactionDate: string;
}

const EMPTY_BASIC_INFO: BasicInfo = {
  customerName: '',
  customerIdentity: '個人',
  status: '',
  customerNumber: '',
  taxId: '',
  invoiceIssueMethod: '',
  agreeMarketing: '',
  marketingConsentDate: '',
  customerCategory: '',
  lastTransactionDate: '',
};

export function ERPCustomerDetail({ customer, onClose, createMode = false, onSaveDraft }: ERPCustomerDetailProps) {
  const TABS = createMode ? TABS_CREATE : TABS_DEFAULT;
  const [activeTab, setActiveTab] = useState<TabId>(createMode ? 'basic' : 'address');
  const [basicInfo, setBasicInfo] = useState<BasicInfo>(EMPTY_BASIC_INFO);
  const [customerNameError, setCustomerNameError] = useState('');

  // ── 地址編輯 Drawer ──────────────────────────────────────────
  // ── 複製地址回饋 ──────────────────────────────────────────────
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (record: AddressRecord) => {
    navigator.clipboard.writeText(fullAddress(record)).then(() => {
      setCopiedId(record.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  // ── 地址列表（本地 state，支援新增後即時反映）──────────────────
  const [showActiveAddressOnly, setShowActiveAddressOnly] = useState(false);
  const [localAddresses, setLocalAddresses] = useState<AddressRecord[]>(
    () => [...(mockAddressByCustomer[customer.customerNumber] ?? [])].sort((a, b) => Number(b.isActive) - Number(a.isActive))
  );
  const [localPersons, setLocalPersons] = useState<ContactPerson[]>(
    () => mockPersonsByCustomer[customer.customerNumber] ?? []
  );
  const [expandedPersonIds, setExpandedPersonIds] = useState<string[]>([]);
  const nextPersonIdRef = useRef(500);
  const nextPhoneIdRef = useRef(500);
  const nextEmailIdRef = useRef(500);

  // 新增聯絡人 modal
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [addPersonForm, setAddPersonForm] = useState<PersonForm>(EMPTY_PERSON_FORM);
  const [addPersonErrors, setAddPersonErrors] = useState<Partial<Record<keyof PersonForm, string>>>({});
  const addPersonModalRef = useRef<HTMLDivElement>(null);

  // 編輯聯絡人 drawer
  const [editingPerson, setEditingPerson] = useState<ContactPerson | null>(null);
  const [editPersonForm, setEditPersonForm] = useState<PersonForm>(EMPTY_PERSON_FORM);
  const [editPersonErrors, setEditPersonErrors] = useState<Partial<Record<keyof PersonForm, string>>>({});

  // 新增電話 modal
  const [addPhonePersonId, setAddPhonePersonId] = useState<string | null>(null);
  const [addPhoneForm, setAddPhoneForm] = useState<PhoneForm>(EMPTY_PHONE_FORM);
  const [addPhoneErrors, setAddPhoneErrors] = useState<Partial<Record<keyof PhoneForm, string>>>({});
  const addPhoneModalRef = useRef<HTMLDivElement>(null);

  // 編輯電話 modal
  const [editingPhone, setEditingPhone] = useState<{ personId: string; entry: PhoneEntry } | null>(null);
  const [editPhoneForm, setEditPhoneForm] = useState<PhoneForm>(EMPTY_PHONE_FORM);
  const [editPhoneErrors, setEditPhoneErrors] = useState<Partial<Record<keyof PhoneForm, string>>>({});
  const editPhoneModalRef = useRef<HTMLDivElement>(null);

  // 新增 Email modal
  const [addEmailPersonId, setAddEmailPersonId] = useState<string | null>(null);
  const [addEmailForm, setAddEmailForm] = useState<EmailForm>(EMPTY_EMAIL_FORM);
  const [addEmailErrors, setAddEmailErrors] = useState<Partial<Record<keyof EmailForm, string>>>({});
  const addEmailModalRef = useRef<HTMLDivElement>(null);

  // 編輯 Email modal
  const [editingEmail, setEditingEmail] = useState<{ personId: string; entry: EmailEntry } | null>(null);
  const [editEmailForm, setEditEmailForm] = useState<EmailForm>(EMPTY_EMAIL_FORM);
  const [editEmailErrors, setEditEmailErrors] = useState<Partial<Record<keyof EmailForm, string>>>({});
  const editEmailModalRef = useRef<HTMLDivElement>(null);

  const today = () => new Date().toISOString().slice(0, 10);

  const togglePersonExpanded = (id: string) =>
    setExpandedPersonIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // 聯絡人 CRUD
  const handleAddPersonConfirm = () => {
    if (!addPersonForm.name.trim()) { setAddPersonErrors({ name: '聯絡人名稱為必填' }); return; }
    const phones: PhoneEntry[] = addPersonForm.phone.trim()
      ? [{ id: `ph_${nextPhoneIdRef.current++}`, countryCode: '886', areaCode: '', phone: addPersonForm.phone.trim(), ext: '', type: 'Tel(O)', purpose: '', isPrimary: true, isActive: true, updatedAt: today() }]
      : [];
    const emails: EmailEntry[] = addPersonForm.email.trim()
      ? [{ id: `em_${nextEmailIdRef.current++}`, email: addPersonForm.email.trim(), purpose: '', isPrimary: true, isActive: true, updatedAt: today() }]
      : [];
    setLocalPersons(prev => [...prev, { id: `p_${nextPersonIdRef.current++}`, name: addPersonForm.name.trim(), phones, emails, updatedAt: today() }]);
    setShowAddPersonModal(false);
    setAddPersonForm(EMPTY_PERSON_FORM);
    setAddPersonErrors({});
  };

  const handleEditPersonSave = () => {
    if (!editPersonForm.name.trim()) { setEditPersonErrors({ name: '聯絡人名稱為必填' }); return; }
    setLocalPersons(prev => prev.map(p => p.id === editingPerson!.id ? { ...p, name: editPersonForm.name.trim(), updatedAt: today() } : p));
    setEditingPerson(null);
  };

  // 電話格式驗證：09 開頭為手機（須為 10 碼純數字），否則須含「-」區隔區域號碼
  const validatePhone = (phone: string): string | null => {
    const p = phone.trim();
    if (!p) return '電話號碼為必填';
    if (p.startsWith('09')) {
      if (!/^09\d{8}$/.test(p)) return '手機號碼格式錯誤，請輸入 10 碼數字（例：0912345678）';
      return null;
    }
    if (!p.includes('-')) return '非手機號碼請加區域號碼，並以「-」區隔（例：02-2563-8888）';
    return null;
  };

  // 電話 CRUD
  const handleAddPhoneConfirm = () => {
    const err = validatePhone(addPhoneForm.phone);
    if (err) { setAddPhoneErrors({ phone: err }); return; }
    const newEntry: PhoneEntry = { id: `ph_${nextPhoneIdRef.current++}`, ...addPhoneForm, phone: addPhoneForm.phone.trim(), updatedAt: today() };
    setLocalPersons(prev => prev.map(p => {
      if (p.id !== addPhonePersonId) return p;
      const phones = newEntry.isPrimary ? p.phones.map(ph => ({ ...ph, isPrimary: false })) : p.phones;
      return { ...p, phones: [...phones, newEntry], updatedAt: today() };
    }));
    setAddPhonePersonId(null);
    setAddPhoneForm(EMPTY_PHONE_FORM);
    setAddPhoneErrors({});
  };

  const handleEditPhoneSave = () => {
    const err = validatePhone(editPhoneForm.phone);
    if (err) { setEditPhoneErrors({ phone: err }); return; }
    setLocalPersons(prev => prev.map(p => {
      if (p.id !== editingPhone!.personId) return p;
      const phones = p.phones.map(ph => {
        if (ph.id !== editingPhone!.entry.id) return editPhoneForm.isPrimary ? { ...ph, isPrimary: false } : ph;
        return { ...ph, ...editPhoneForm, phone: editPhoneForm.phone.trim(), updatedAt: today() };
      });
      return { ...p, phones, updatedAt: today() };
    }));
    setEditingPhone(null);
  };

  const handleDeletePhone = (personId: string, phoneId: string) => {
    setLocalPersons(prev => prev.map(p => p.id !== personId ? p : { ...p, phones: p.phones.filter(ph => ph.id !== phoneId), updatedAt: today() }));
  };

  // Email CRUD
  const handleAddEmailConfirm = () => {
    if (!addEmailForm.email.trim()) { setAddEmailErrors({ email: 'Email 為必填' }); return; }
    const newEntry: EmailEntry = { id: `em_${nextEmailIdRef.current++}`, ...addEmailForm, email: addEmailForm.email.trim(), updatedAt: today() };
    setLocalPersons(prev => prev.map(p => {
      if (p.id !== addEmailPersonId) return p;
      const emails = newEntry.isPrimary ? p.emails.map(em => ({ ...em, isPrimary: false })) : p.emails;
      return { ...p, emails: [...emails, newEntry], updatedAt: today() };
    }));
    setAddEmailPersonId(null);
    setAddEmailForm(EMPTY_EMAIL_FORM);
    setAddEmailErrors({});
  };

  const handleEditEmailSave = () => {
    if (!editEmailForm.email.trim()) { setEditEmailErrors({ email: 'Email 為必填' }); return; }
    setLocalPersons(prev => prev.map(p => {
      if (p.id !== editingEmail!.personId) return p;
      const emails = p.emails.map(em => {
        if (em.id !== editingEmail!.entry.id) return editEmailForm.isPrimary ? { ...em, isPrimary: false } : em;
        return { ...em, ...editEmailForm, email: editEmailForm.email.trim(), updatedAt: today() };
      });
      return { ...p, emails, updatedAt: today() };
    }));
    setEditingEmail(null);
  };

  const handleDeleteEmail = (personId: string, emailId: string) => {
    setLocalPersons(prev => prev.map(p => p.id !== personId ? p : { ...p, emails: p.emails.filter(em => em.id !== emailId), updatedAt: today() }));
  };

  const handleDeletePerson = (personId: string) =>
    setLocalPersons(prev => prev.filter(p => p.id !== personId));

  // ── 其他資訊 ──────────────────────────────────────────────────
  const [otherInfo, setOtherInfo] = useState<CustomerOtherInfo>(EMPTY_OTHER_INFO);
  const [isOtherEditMode, setIsOtherEditMode] = useState(false);
  const [otherErrors, setOtherErrors] = useState<Partial<Record<keyof CustomerOtherInfo, string>>>({});
  const [otherDraft, setOtherDraft] = useState<CustomerOtherInfo>(EMPTY_OTHER_INFO);

  const setOtherField = (key: keyof CustomerOtherInfo, value: string) => {
    setOtherDraft(prev => ({ ...prev, [key]: value }));
    setOtherErrors(prev => { const next = { ...prev }; delete next[key]; return next; });
  };

  const handleOtherEdit = () => {
    setOtherDraft({ ...otherInfo });
    setOtherErrors({});
    setIsOtherEditMode(true);
  };

  const handleOtherCancel = () => {
    setOtherDraft({ ...otherInfo });
    setOtherErrors({});
    setIsOtherEditMode(false);
  };

  const handleOtherSave = () => {
    const errs: Partial<Record<keyof CustomerOtherInfo, string>> = {};
    const REQ = '此欄位為必填';
    if (!otherDraft.invoiceIssueMethod) errs.invoiceIssueMethod = REQ;
    if (!otherDraft.agreeMarketing) errs.agreeMarketing = REQ;
    if (!otherDraft.checkoutCycle) errs.checkoutCycle = REQ;
    if (!otherDraft.customerCategory) errs.customerCategory = REQ;
    if (Object.keys(errs).length > 0) { setOtherErrors(errs); return; }
    setOtherInfo({ ...otherDraft });
    setIsOtherEditMode(false);
  };

  // ── 訂閱年資 ──────────────────────────────────────────────────
  const [subSeniority, setSubSeniority] = useState<SubscriptionSeniority>({ ...EMPTY_SUB_SENIORITY });
  const [isSubEditMode, setIsSubEditMode] = useState(false);
  const [subDraft, setSubDraft] = useState<SubscriptionSeniority>({ ...EMPTY_SUB_SENIORITY });
  const [expandedSubSections, setExpandedSubSections] = useState<string[]>(['commonwealth', 'non-commonwealth']);

  const setSubPubField = (
    pubKey: keyof Omit<SubscriptionSeniority, 'lastOrderDate'>,
    field: keyof PubSeniority,
    value: string,
  ) => {
    setSubDraft(prev => ({ ...prev, [pubKey]: { ...prev[pubKey], [field]: value } }));
  };

  const handleSubEdit = () => { setSubDraft({ ...subSeniority }); setIsSubEditMode(true); };
  const handleSubCancel = () => { setSubDraft({ ...subSeniority }); setIsSubEditMode(false); };
  const handleSubSave = () => { setSubSeniority({ ...subDraft }); setIsSubEditMode(false); };

  const toggleSubSection = (key: string) => {
    setExpandedSubSections(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };
  
  // ── 父子關聯 ────────────────────────────────────────────────────
  const [mergeRelations, setMergeRelations] = useState<MergeRelation[]>(createMode ? [] : mockMergeRelations);
  const [editingRelation, setEditingRelation] = useState<MergeRelation | null>(null);
  const [editRelationForm, setEditRelationForm] = useState<MergeRelationForm>(EMPTY_MERGE_FORM);
  const [editRelationErrors, setEditRelationErrors] = useState<Partial<Record<keyof MergeRelationForm, string>>>({});
  const [newRelationRole, setNewRelationRole] = useState<'parent' | 'child' | ''>('');
  const [showCustomerLookup, setShowCustomerLookup] = useState<'parent' | 'child' | null>(null);
  const [customerLookupKeyword, setCustomerLookupKeyword] = useState('');

  // ── 訂戶權益 state ───────────────────────────────────────────
  // 操作記錄篩選
  const [opLogDateStart, setOpLogDateStart] = useState<Date | null>(null);
  const [opLogDateEnd, setOpLogDateEnd] = useState<Date | null>(null);
  const [opLogOperator, setOpLogOperator] = useState('');
  const [opLogCategory, setOpLogCategory] = useState('');
  const [opLogApplied, setOpLogApplied] = useState<{ dateRange: DateRange; operator: string; category: string }>({ dateRange: { start: null, end: null }, operator: '', category: '' });

  const [isRightsPopupOpen, setIsRightsPopupOpen] = useState(false);
  const [selectedRightsItem, setSelectedRightsItem] = useState<any>(null);
  const [selectedRightsType, setSelectedRightsType] = useState<'website' | 'app'>('website');
  const [rightsExpiryDate, setRightsExpiryDate] = useState<Date | null>(null);
  const [rightsToastMessage, setRightsToastMessage] = useState('');
  const [rightsToastType, setRightsToastType] = useState<'success' | 'error' | 'info' | 'warning' | 'question'>('success');
  const [showRightsToast, setShowRightsToast] = useState(false);

  // 暫存 toast
  const [showDraftToast, setShowDraftToast] = useState(false);

  // ── 訂戶權益 handlers ────────────────────────────────────────
  const handleRightsConfirm = () => {
    setRightsToastMessage('權益修改成功');
    setRightsToastType('success');
    setShowRightsToast(true);
    setIsRightsPopupOpen(false);
    setSelectedRightsItem(null);
    setRightsExpiryDate(null);
  };
  const handleRightsCancel = () => {
    setIsRightsPopupOpen(false);
    setSelectedRightsItem(null);
    setRightsExpiryDate(null);
  };
  const handleRightsSetToday = () => setRightsExpiryDate(new Date());

  // ── 訂戶權益 columns ─────────────────────────────────────────
  const erpPaperRightsColumns: CwTableColumn[] = [
    { key: 'id', title: '', width: '60px' },
    { key: 'product', title: '產品名', width: '120px' },
    { key: 'subscriberId', title: '訂戶編號', width: '110px' },
    { key: 'subscriberName', title: '訂戶姓名', width: '110px' },
    { key: 'autoRenewal', title: '自動續訂', width: '100px' },
    { key: 'recentStartDate', title: '最近訂閱起日', width: '120px' },
    { key: 'recentEndDate', title: '最近訂閱到期日', width: '140px' },
    { key: 'subscriptionStartDate', title: '訂閱起始日', width: '120px' },
    { key: 'subscriptionEndDate', title: '訂閱到期日', width: '120px' },
    { key: 'physicalYears', title: '累積年資', width: '100px' },
    { key: 'action', title: '功能', width: '100px', align: 'center',
      render: (_v: any, record: any) => (
        <CwTextButton label="權益紀錄" icon="document" onClick={() => console.log('查看權益紀錄', record.subscriberId)} />
      ),
    },
  ];
  const erpDigitalRightsColumns: CwTableColumn[] = [
    { key: 'id', title: '#', width: '60px' },
    { key: 'memberAccount', title: '會員帳號', width: '140px' },
    { key: 'memberEmail', title: '會員email', width: '180px' },
    { key: 'product', title: '產品名', width: '110px' },
    { key: 'autoRenewal', title: '自動續訂', width: '100px' },
    { key: 'recentStartDate', title: '最近訂閱起日', width: '120px' },
    { key: 'recentEndDate', title: '最近訂閱到期日', width: '140px' },
    { key: 'rightsExpiry', title: '權益到期日', width: '120px' },
    { key: 'physicalYears', title: '累積年資', width: '100px' },
    { key: 'action', title: '功能', width: '100px', align: 'center',
      render: (_v: any, record: any) => (
        <div className="flex flex-col gap-[8px]">
          <CwTextButton label="權益紀錄" icon="document" onClick={() => console.log('查看權益紀錄', record.id)} />
        </div>
      ),
    },
  ];

  const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
    '基本資料': { bg: '#e8f0fe', color: '#1a56db' },
    '地址':     { bg: '#fef3c7', color: '#92400e' },
    '聯絡資訊': { bg: '#d1fae5', color: '#065f46' },
    '父子關聯': { bg: '#ede9fe', color: '#5b21b6' },
  };

  const operationLogColumns: CwTableColumn[] = [
    { key: 'operateTime',   title: '操作時間',   width: '200px' },
    { key: 'operator',      title: '操作者',     width: '120px' },
    { key: 'category',      title: '分類',       width: '120px',
      render: (val: any) => {
        const c = CATEGORY_COLORS[val as string] ?? { bg: '#e9ebf2', color: '#1c1c1c' };
        return (
          <span
            style={{ backgroundColor: c.bg, color: c.color, fontFamily: 'var(--font-noto-sans-tc)', fontSize: '13px', fontWeight: 400, borderRadius: '5px', padding: '2px 6px', whiteSpace: 'nowrap', display: 'inline-block' }}
          >
            {val}
          </span>
        );
      },
    },
    { key: 'changedField',  title: '異動欄位',   width: '140px' },
    { key: 'beforeValue',   title: '變更前',     width: '200px' },
    { key: 'afterValue',    title: '變更後',     width: '200px' },
  ];

  const handleEditRelationOpen = (rel: MergeRelation) => {
    setEditingRelation(rel);
    setEditRelationForm({ parentNo: rel.parentNo, parentName: rel.parentName, childNo: rel.childNo, childName: rel.childName, isActive: rel.isActive, note: rel.note });
    setEditRelationErrors({});
  };
  const handleEditRelationSave = () => {
    const isNew = editingRelation!.id === '__new__';
    const errors: Partial<Record<keyof MergeRelationForm | 'role', string>> = {};
    if (isNew && !newRelationRole) (errors as Record<string, string>).role = '請選擇此帳號角色';
    if (!editRelationForm.parentNo.trim()) errors.parentNo = '必填';
    if (!editRelationForm.parentName.trim()) errors.parentName = '必填';
    if (!editRelationForm.childNo.trim()) errors.childNo = '必填';
    if (!editRelationForm.childName.trim()) errors.childName = '必填';
    if (Object.keys(errors).length > 0) { setEditRelationErrors(errors); return; }
    if (editingRelation!.id === '__new__') {
      setMergeRelations(prev => [...prev, { id: `mr${Date.now()}`, ...editRelationForm }]);
    } else {
      setMergeRelations(prev => prev.map(r => r.id === editingRelation!.id ? { ...r, ...editRelationForm } : r));
    }
    setEditingRelation(null);
  };
  const handleDeleteRelation = (id: string) => {
    setMergeRelations(prev => prev.filter(r => r.id !== id));
  };

  // ── 編輯 Drawer ───────────────────────────────────────────────
  const [editingAddress, setEditingAddress] = useState<AddressRecord | null>(null);
  const [editForm, setEditForm] = useState<AddressForm>(EMPTY_FORM);
  const [editErrors, setEditErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});

  const openEditDrawer = (record: AddressRecord) => {
    setEditingAddress(record);
    setEditForm({ country: record.country, postalCode: record.postalCode, city: record.city, street: record.street, isPrimary: record.isPrimary, isActive: record.isActive, isPrimaryShipping: record.isPrimaryShipping, isPrimaryInvoice: record.isPrimaryInvoice });
    setEditErrors({});
  };

  const closeEditDrawer = () => setEditingAddress(null);

  // 地址 Drawer 上/下一筆
  const navigateAddress = (direction: 'prev' | 'next') => {
    if (!editingAddress) return;
    const idx = localAddresses.findIndex(r => r.id === editingAddress.id);
    const target = direction === 'prev' ? localAddresses[idx - 1] : localAddresses[idx + 1];
    if (target) openEditDrawer(target);
  };

  const handleEditSave = () => {
    const errs: Partial<Record<keyof AddressForm, string>> = {};
    if (!editForm.city.trim())   errs.city   = '城市／行政區為必填';
    if (!editForm.street.trim()) errs.street = '地址為必填';
    if (Object.keys(errs).length) { setEditErrors(errs); return; }
    setLocalAddresses(prev =>
      prev.map(r => r.id === editingAddress!.id
        ? { ...r, ...editForm, updatedAt: new Date().toISOString().slice(0, 10) }
        : r
      )
    );
    closeEditDrawer();
  };

  // ── 新增地址 Modal ────────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<AddressForm>(EMPTY_FORM);
  const [addErrors, setAddErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});
  const addModalRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(100);

  // 點擊 overlay 關閉 Modal
  useEffect(() => {
    if (!showAddModal) return;
    const handler = (e: MouseEvent) => {
      if (addModalRef.current && !addModalRef.current.contains(e.target as Node)) {
        setShowAddModal(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showAddModal]);

  const openAddModal = () => {
    setAddForm(EMPTY_FORM);
    setAddErrors({});
    setShowAddModal(true);
  };

  const handleAddConfirm = () => {
    const errs: Partial<Record<keyof AddressForm, string>> = {};
    if (!addForm.city.trim())   errs.city   = '城市／行政區為必填';
    if (!addForm.street.trim()) errs.street = '地址為必填';
    if (Object.keys(errs).length) { setAddErrors(errs); return; }
    const today = new Date().toISOString().slice(0, 10);
    const newRecord: AddressRecord = {
      id: `new_${nextIdRef.current++}`,
      country:    addForm.country,
      postalCode: addForm.postalCode,
      city:       addForm.city.trim(),
      street:     addForm.street.trim(),
      isActive:            addForm.isActive,
      isPrimary:           addForm.isPrimary,
      isPrimaryShipping:   addForm.isPrimaryShipping,
      isPrimaryInvoice:    addForm.isPrimaryInvoice,
      updatedAt:           today,
    };
    setLocalAddresses(prev => [...prev, newRecord]);
    setShowAddModal(false);
  };


  // ── 地址欄位定義（放在元件內以存取 openEditDrawer）────────────
  const addressColumns: CwTableColumn<AddressRecord>[] = [
    {
      key: 'isActive' as any,
      title: '生效與否',
      width: '90px',
      align: 'center',
      render: (_v, r) => (
        <span className="flex items-center justify-center">
          {r.isActive ? (
            <span
              className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[12px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]"
              style={{ background: '#f0fdf4', color: '#166534', fontWeight: 600 }}
            >
              生效
            </span>
          ) : <span></span>}
        </span>
      ),
    },
    {
      key: 'isPrimaryShipping' as any,
      title: '主要寄送 / 主要付款',
      width: '160px',
      align: 'center',
      render: (_v, r) => {
        const none = !r.isPrimaryShipping && !r.isPrimaryInvoice;
        if (none) return <span className="text-[12px] text-[#9ca3af]" style={{ fontWeight: 350 }}>—</span>;
        return (
          <span className="flex items-center justify-center gap-[4px] flex-wrap">
            {r.isPrimaryShipping && (
              <span
                className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[12px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]"
                style={{ background: '#fef3c7', color: '#92400e', fontWeight: 600 }}
              >
                寄送
              </span>
            )}
            {r.isPrimaryInvoice && (
              <span
                className="inline-flex items-center px-[8px] py-[2px] rounded-full text-[12px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]"
                style={{ background: '#f3e8ff', color: '#6b21a8', fontWeight: 600 }}
              >
                發票
              </span>
            )}
          </span>
        );
      },
    },
    {
      key: 'address',
      title: '地址',
      render: (_v, r) => {
        const copied = copiedId === r.id;
        return (
          <span className="flex items-center gap-[8px]">
            <span
              className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]"
              style={{ fontWeight: 350 }}
            >
              {fullAddress(r)}
            </span>
            <button
              onClick={() => handleCopyAddress(r)}
              title="複製地址"
              className={`
                flex items-center justify-center w-[24px] h-[24px] rounded transition-all shrink-0
                ${copied ? 'text-[#16a34a]' : 'text-[#9ca3af] hover:text-[#0078d4] hover:bg-[#e6f2fb]'}
              `}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </span>
        );
      },
    },
    {
      key: 'updatedAt' as any,
      title: '更新日期',
      width: '120px',
      render: (_v, r) => (
        <span
          className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#4b5563] tabular-nums"
          style={{ fontWeight: 350 }}
        >
          {r.updatedAt}
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
          <CwRoundButton icon="edit" title="編輯" onClick={() => openEditDrawer(r)} />
        </div>
      ),
    },
  ];

  // ── 聯絡資訊 helper tags ──────────────────────────────────────
  const PrimaryTag = () => (
    <span className="inline-flex items-center px-[6px] py-[1px] rounded-full text-[11px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]" style={{ background: '#dbeafe', color: '#1d4ed8', fontWeight: 600 }}>主要</span>
  );
  const ActiveTag = ({ active }: { active: boolean }) => (
    <span className="inline-flex items-center px-[6px] py-[1px] rounded-full text-[11px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]" style={active ? { background: '#f0fdf4', color: '#166534', fontWeight: 600 } : { background: '#f3f4f6', color: '#6b7280', fontWeight: 600 }}>
      {active ? '生效' : ''}
    </span>
  );

  const breadcrumbs_: never[] = []; void breadcrumbs_; // placeholder, actual breadcrumbs below

  const contactsTotal = localPersons.reduce((s, p) => s + p.phones.length + p.emails.length, 0);

  const openAddPersonModal = () => { setAddPersonForm(EMPTY_PERSON_FORM); setAddPersonErrors({}); setShowAddPersonModal(true); };

  const allExpanded = localPersons.length > 0 && localPersons.every(p => expandedPersonIds.includes(p.id));
  const handleToggleAll = () => {
    if (allExpanded) {
      setExpandedPersonIds([]);
    } else {
      setExpandedPersonIds(localPersons.map(p => p.id));
    }
  };

  // ── 聯絡資訊 tab render ───────────────────────────────────────
  const ContactTab = () => (
    <div className="space-y-[16px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-end justify-between">
        <div className="flex items-center justify-between">
          <CwButton variant="primary" appearance="filled" size="m" leftIcon={<Plus size={13} />} onClick={openAddPersonModal}>
            新增聯絡人
          </CwButton>
        </div>
          {/* <p className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
            共 {localPersons.length} 位聯絡人，{contactsTotal} 筆聯絡方式
          </p> */}
          {localPersons.length > 0 && (
            <button
              onClick={handleToggleAll}
              className="flex items-center gap-[4px] px-[20px] py-[6px] rounded-[var(--radius)] border border-[#01579b] text-[#01579b] hover:bg-[#e6f7ff] transition-colors font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] whitespace-nowrap"
            >
              {allExpanded ? '全部收合' : '全部展開'}
            </button>
          )}
        </div>
      </div>

      {localPersons.length === 0 ? (
        <CwEmptyState text="尚無聯絡人" />
      ) : (
        <div className="space-y-[8px]">
          {localPersons.map(person => {
            const isExpanded = expandedPersonIds.includes(person.id);
            const primaryPhone = person.phones.find(p => p.isPrimary);
            const primaryEmail = person.emails.find(e => e.isPrimary);
            const phoneParts = primaryPhone ? [primaryPhone.countryCode ? `+${primaryPhone.countryCode}` : '', primaryPhone.areaCode, primaryPhone.phone, primaryPhone.ext ? `#${primaryPhone.ext}` : ''].filter(Boolean).join('-') : null;

            return (
              <div key={person.id} className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
                {/* 聯絡人列 */}
                <div className="flex items-center gap-[12px] px-[16px] py-[12px] bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors">
                  <button onClick={() => togglePersonExpanded(person.id)} className="flex items-center gap-[12px] flex-1 text-left min-w-0">
                    {isExpanded ? <ChevronDown className="w-[16px] h-[16px] text-[#01579b] shrink-0" /> : <ChevronRight className="w-[16px] h-[16px] text-[#01579b] shrink-0" />}
                    <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c] font-[600] shrink-0">{person.name}</span>
                    <span className="text-[#e5e7eb] shrink-0">|</span>
                    <span className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#374151] truncate">{phoneParts ?? '—'}</span>
                    <span className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#374151] truncate">{primaryEmail?.email ?? '—'}</span>
                  </button>
                  <div className="flex items-center gap-[4px] shrink-0">
                    <CwRoundButton icon="edit" title="編輯聯絡人" onClick={() => { setEditingPerson(person); setEditPersonForm({ name: person.name, phone: '', email: '' }); setEditPersonErrors({}); }} />
                    <CwRoundButton icon="delete" title="刪除聯絡人" onClick={() => handleDeletePerson(person.id)} />
                  </div>
                </div>

                {/* 展開內容 */}
                {isExpanded && (
                  <div className="px-[16px] py-[16px] bg-white flex gap-[24px] items-start">

                    {/* 電話 section */}
                    <div className="flex-1 min-w-0 space-y-[8px]">
                      <div className="flex items-center justify-between">
                        <span className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>
                          電話 <span className="text-[#7c808c] font-[350]">（{person.phones.length} 筆）</span>
                        </span>
                        <button
                          onClick={() => { setAddPhonePersonId(person.id); setAddPhoneForm(EMPTY_PHONE_FORM); setAddPhoneErrors({}); }}
                          className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px] border border-[#c4c9d3] hover:bg-[#f3f4f6] transition-colors"
                        >
                          <Plus size={12} className="text-[#374151]" />
                          <span className="font-['Noto_Sans_TC',_sans-serif] text-[12px] text-[#374151]">新增電話</span>
                        </button>
                      </div>
                      {person.phones.length === 0 ? (
                        <p className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#9ca3af]">尚無電話</p>
                      ) : (
                        <table className="w-full text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ borderCollapse: 'collapse' }}>
                          <thead>
                            <tr className="border-b border-[#e5e7eb]">
                              {['主要', '電話號碼', '類型', '生效', '操作'].map(h => (
                                <th key={h} className="py-[6px] px-[8px] text-left text-[#7c808c]" style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {person.phones.map(ph => {
                              const num = [ph.countryCode ? `+${ph.countryCode}` : '', ph.areaCode, ph.phone, ph.ext ? `#${ph.ext}` : ''].filter(Boolean).join('-');
                              return (
                                <tr key={ph.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                                  <td className="py-[6px] px-[8px]">{ph.isPrimary ? <PrimaryTag /> : <span className="text-[#d1d5db]">—</span>}</td>
                                  <td className="py-[6px] px-[8px] text-[#1c1c1c]">{num || '—'}</td>
                                  <td className="py-[6px] px-[8px] text-[#374151]">{ph.type || '—'}</td>
                                  <td className="py-[6px] px-[8px]"><ActiveTag active={ph.isActive} /></td>
                                  <td className="py-[6px] px-[8px]">
                                    <div className="flex gap-[4px]">
                                      <CwRoundButton icon="edit" title="編輯" onClick={() => { setEditingPhone({ personId: person.id, entry: ph }); setEditPhoneForm({ countryCode: ph.countryCode, areaCode: ph.areaCode, phone: ph.phone, ext: ph.ext, type: ph.type, isPrimary: ph.isPrimary, isActive: ph.isActive }); setEditPhoneErrors({}); }} />
                                      <CwRoundButton icon="delete" title="刪除" onClick={() => handleDeletePhone(person.id, ph.id)} />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>

                    <div className="w-px bg-[#e5e7eb] self-stretch shrink-0" />

                    {/* Email section */}
                    <div className="flex-1 min-w-0 space-y-[8px]">
                      <div className="flex items-center justify-between">
                        <span className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#1c1c1c]" style={{ fontWeight: 600 }}>
                          Email <span className="text-[#7c808c] font-[350]">（{person.emails.length} 筆）</span>
                        </span>
                        <button
                          onClick={() => { setAddEmailPersonId(person.id); setAddEmailForm(EMPTY_EMAIL_FORM); setAddEmailErrors({}); }}
                          className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px] border border-[#c4c9d3] hover:bg-[#f3f4f6] transition-colors"
                        >
                          <Plus size={12} className="text-[#374151]" />
                          <span className="font-['Noto_Sans_TC',_sans-serif] text-[12px] text-[#374151]">新增 Email</span>
                        </button>
                      </div>
                      {person.emails.length === 0 ? (
                        <p className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#9ca3af]">尚無 Email</p>
                      ) : (
                        <table className="w-full text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ borderCollapse: 'collapse' }}>
                          <thead>
                            <tr className="border-b border-[#e5e7eb]">
                              {['主要', 'Email', '生效', '操作'].map(h => (
                                <th key={h} className="py-[6px] px-[8px] text-left text-[#7c808c]" style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {person.emails.map(em => (
                              <tr key={em.id} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb]">
                                <td className="py-[6px] px-[8px]">{em.isPrimary ? <PrimaryTag /> : <span className="text-[#d1d5db]">—</span>}</td>
                                <td className="py-[6px] px-[8px] text-[#1c1c1c]">{em.email}</td>
                                <td className="py-[6px] px-[8px]"><ActiveTag active={em.isActive} /></td>
                                <td className="py-[6px] px-[8px]">
                                  <div className="flex gap-[4px]">
                                    <CwRoundButton icon="edit" title="編輯" onClick={() => { setEditingEmail({ personId: person.id, entry: em }); setEditEmailForm({ email: em.email, isPrimary: em.isPrimary, isActive: em.isActive }); setEditEmailErrors({}); }} />
                                    <CwRoundButton icon="delete" title="刪除" onClick={() => handleDeleteEmail(person.id, em.id)} />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { label: '首頁', href: '/' },
    { label: 'ERP', href: '/erp' },
    { label: 'ERP 客戶查詢', href: '/erp-customer-search' },
    { label: createMode ? '新增客戶' : customer.customerName },
  ];

  const handleBreadcrumbNavigate = (_href: string, index: number) => {
    if (index <= 2) onClose();
  };

  // 新增模式讀 basicInfo / otherDraft；明細模式讀 customer props
  const displayInfo = createMode ? {
    customerNumber:       basicInfo.customerNumber,
    customerName:         basicInfo.customerName,
    customerIdentity:     basicInfo.customerIdentity,
    status:               basicInfo.status,
    taxId:                basicInfo.taxId,
    invoiceTitle:         otherDraft.invoiceTitle,
    agreeMarketing:       basicInfo.agreeMarketing,
    marketingConsentDate: basicInfo.marketingConsentDate,
    lastTransactionDate:  '',
  } : customer;

  const statusStyle = STATUS_STYLE[displayInfo.status] ?? { bg: '#f3f4f6', color: '#4b5563' };

  const headerFields: [string, React.ReactNode][] = [
    ['客戶編號', displayInfo.customerNumber || '—'],
    ['客戶名稱', displayInfo.customerName || '—'],
    ['客戶身分', displayInfo.customerIdentity || '—'],
    ['狀態', displayInfo.status ? (
      <span
        className="inline-flex w-fit items-center px-[8px] py-[2px] rounded-full text-[12px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]"
        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, fontWeight: 500 }}
      >
        {displayInfo.status}
      </span>
    ) : '—'],
    ['統一編號', displayInfo.taxId || '—'],
    ['發票抬頭', displayInfo.invoiceTitle || '—'],
    ['是否同意行銷(訂單來源)', [displayInfo.agreeMarketing, displayInfo.marketingConsentDate].filter(Boolean).join('　') || '—'],
    ['最後交易日期', displayInfo.lastTransactionDate || '—'],
  ];

  return (
    <>
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <CwTitle
        title={createMode ? '新增客戶' : 'ERP 客戶明細'}
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
      />

      <div className="space-y-[30px] mx-[30px]">
        {/* 上方：客戶基本資料 */}
        <div className="grid grid-cols-4 gap-x-[24px] gap-y-[24px] my-[30px] mb-[40px]">
          {createMode && (
            <div className="col-span-4 mb-[-8px]">
              <span
                className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              >
                以下資訊將隨您填寫的內容即時更新
              </span>
            </div>
          )}
          {headerFields.map(([label, value]) => (
            <div key={label as string} className="flex flex-col gap-[4px]">
              <span
                className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 400 }}
              >
                {label}
              </span>
              {typeof value === 'string' ? (
                <span
                  className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                  style={{ fontWeight: 350 }}
                >
                  {value}
                </span>
              ) : (
                value
              )}
            </div>
          ))}
        </div>

        {/* 下方：頁籤 */}
        <CwTab
          items={TABS}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
        />

        <div className="py-[12px]">
        {activeTab === 'basic' ? (() => {
  const customerIdentityOptions = [
    { value: '企業', label: '企業' },
    { value: '個人', label: '個人' },
  ];
  const statusOptions = [
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
  ];
  const invoiceOptions = [
    { value: '隨貨產生', label: '隨貨產生' },
    { value: '月結淨額', label: '月結淨額' },
    { value: '月結金額', label: '月結金額' },
    { value: '電子發票', label: '電子發票' },
    { value: '一般來說', label: '一般來說' },
  ];
  const marketingOptions = [
    { value: '同意', label: '同意' },
    { value: '不同意', label: '不同意' },
    { value: '不確定', label: '不確定' },
  ];
  const categoryOptions = [
    { value: '廣告客戶', label: '廣告客戶' },
    { value: '企業法人', label: '企業法人' },
    { value: '去識別化', label: '去識別化' },
    { value: '直銷商', label: '直銷商' },
    { value: '通路經銷商', label: '通路經銷商' },
    { value: '個人客戶', label: '個人客戶' },
    { value: '訂戶型零售', label: '訂戶型零售' },
    { value: '經銷商', label: '經銷商' },
  ];
  const upd = (key: keyof BasicInfo, val: string) => setBasicInfo(p => ({ ...p, [key]: val }));

  const oInvoiceOptions = [{ value: '3', label: '3 隨貨產生' }, { value: '4', label: '4 月結淨額' }, { value: '5', label: '5 月結金額' }, { value: '6', label: '6 電子發票' }, { value: 'N', label: 'N 一般開立' }];
  const oMarketingOptions = [{ value: '1', label: '1 同意' }, { value: '2', label: '2 不同意' }, { value: 'A', label: 'A 不確定' }];
  const oCycleOptions = [{ value: '即期付款', label: '即期付款' }, { value: '廣-月結120天', label: '廣-月結120天' }, { value: '廣-月結45天', label: '廣-月結45天' }, { value: '廣-月結60天', label: '廣-月結60天' }, { value: '廣-月結90天', label: '廣-月結90天' }, { value: '廣告交換', label: '廣告交換' }, { value: '月結-大和', label: '月結-大和' }, { value: '月結-宇泰', label: '月結-宇泰' }, { value: '月結120天', label: '月結120天' }, { value: '月結30天', label: '月結30天' }, { value: '月結45天', label: '月結45天' }, { value: '月結60天', label: '月結60天' }, { value: '月結90天', label: '月結90天' }];
  const oCategoryOptions = [{ value: '廣告客戶', label: '廣告客戶' }, { value: '企業法人', label: '企業法人' }, { value: '去識別化', label: '去識別化' }, { value: '直銷商', label: '直銷商' }, { value: '通路經銷商', label: '通路經銷商' }, { value: '個人客戶', label: '個人客戶' }, { value: '訂戶型零售', label: '訂戶型零售' }, { value: '經銷商', label: '經銷商' }];
  const oGenderOptions = [{ value: '1', label: '1 男' }, { value: '2', label: '2 女' }];
  const oMaritalOptions = [{ value: '1', label: '1 單身' }, { value: '2', label: '2 已婚' }];
  const oIndustryOptions = [{ value: '1', label: '1 製造業' }, { value: '2', label: '2 資訊科技業' }, { value: '3', label: '3 金融業' }, { value: '4', label: '4 服務業' }, { value: '5', label: '5 醫療保健' }, { value: '6', label: '6 傳播出版' }, { value: '7', label: '7 公職人員' }, { value: '8', label: '8 學生' }, { value: '9', label: '9 家管' }, { value: '10', label: '10 自由業' }, { value: '11', label: '11 專業技術與顧問服務' }, { value: '12', label: '12 教育服務業' }, { value: '99', label: '99 其他' }];
  const oEducationOptions = [{ value: '1', label: '1 未知' }, { value: '2', label: '2 高中(含)以下' }, { value: '3', label: '3 專科' }, { value: '4', label: '4 大學' }, { value: '5', label: '5 研究所(含)以上' }];
  const oJobPositionOptions = [{ value: '1', label: '1 公司負責人/董事/股東' }, { value: '2', label: '2 高階主管' }, { value: '3', label: '3 中階主管' }, { value: '4', label: '4 基層主管' }, { value: '5', label: '5 一般職員' }, { value: '6', label: '6 自由業' }, { value: '7', label: '7 學生' }, { value: '8', label: '8 家管' }, { value: '9', label: '9 退休人員' }, { value: '99', label: '99 其他' }];
  const oIncomeOptions = [{ value: '1', label: '1 無收入' }, { value: '2', label: '2 50萬元以下' }, { value: '3', label: '3 50-100萬元' }, { value: '4', label: '4 100-200萬元' }, { value: '5', label: '5 200萬元以上' }];
  const oBookBudgetOptions = [{ value: '1', label: '1 500元以下' }, { value: '2', label: '2 501-1000元' }, { value: '3', label: '3 1001-2000元' }, { value: '4', label: '4 2001-4000元' }, { value: '5', label: '5 4001元以上' }];
  const oJobTitleOptions = [{ value: '1', label: '1 文教' }, { value: '2', label: '2 行政' }, { value: '3', label: '3 業務行銷' }, { value: '4', label: '4 財務/會計/稽核' }, { value: '5', label: '5 法務' }, { value: '6', label: '6 醫療衛生' }, { value: '7', label: '7 資訊/電信' }, { value: '8', label: '8 傳播/廣告' }, { value: '9', label: '9 藝術' }, { value: '10', label: '10 系統軟硬體工程師' }, { value: '11', label: '11 研發' }, { value: '12', label: '12 教職人員' }, { value: '13', label: '13 顧問/法律' }, { value: '14', label: '14 客服/門市人員' }, { value: '99', label: '99 其他' }];

  return (
    <>
    {createMode ? (
      /* ── 新增客戶專用 grid ─────────────────────────────────── */
      <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
        {/* Row 1: 客戶註記（col 1-2）/ 客戶編號（col 3-4） */}
        <OtherTextField label="客戶註記" fKey="customerNote" colSpan={2} value={otherDraft.customerNote} onChange={setOtherField} error={otherErrors.customerNote} />
        <BasicField label="客戶編號">
          <CwInput value={basicInfo.customerNumber} onChange={e => upd('customerNumber', e.target.value)} placeholder="請輸入" disabled />
        </BasicField>
        <div />

        {/* Row 2: 客戶名稱 / 客戶分類 / 付款條件 / 客戶狀態 */}
        <BasicField label="客戶名稱" required error={customerNameError}>
          <CwInput value={basicInfo.customerName} onChange={e => { upd('customerName', e.target.value); if (e.target.value.trim()) setCustomerNameError(''); }} placeholder="請輸入" error={customerNameError || undefined} />
        </BasicField>
        <OtherSelectField label="客戶分類" fKey="customerCategory" options={oCategoryOptions} required value={otherDraft.customerCategory} onChange={setOtherField} error={otherErrors.customerCategory} />
        <OtherSelectField label="付款條件" fKey="checkoutCycle" options={oCycleOptions} required value={otherDraft.checkoutCycle} onChange={setOtherField} error={otherErrors.checkoutCycle} />
        <BasicField label="客戶狀態">
          <CwSelect options={statusOptions} value={basicInfo.status} onChange={v => upd('status', v as string)} placeholder="請選擇" clearable />
        </BasicField>

        {/* Row 3: 發票開立方式 / 統一編號 / 發票抬頭 / 公司名稱 */}
        <OtherSelectField label="發票開立方式" fKey="invoiceIssueMethod" options={oInvoiceOptions} required value={otherDraft.invoiceIssueMethod} onChange={setOtherField} error={otherErrors.invoiceIssueMethod} />
        <OtherTextField label="統一編號" fKey="taxIdNumber" value={otherDraft.taxIdNumber} onChange={setOtherField} error={otherErrors.taxIdNumber} />
        <OtherTextField label="發票抬頭" fKey="invoiceTitle" value={otherDraft.invoiceTitle} onChange={setOtherField} error={otherErrors.invoiceTitle} />
        <OtherTextField label="公司名稱" fKey="companyName" value={otherDraft.companyName} onChange={setOtherField} />

        {/* 分隔線 */}
        <div className="col-span-4 border-t border-[#e5e7eb] my-[24px]" />

        {/* Row 4: 性別 / 出生日期 / 婚姻 / 子女人數 */}
        <OtherSelectField label="性別" fKey="gender" options={oGenderOptions} value={otherDraft.gender} onChange={setOtherField} />
        <OtherDateField label="出生日期" fKey="birthDate" value={otherDraft.birthDate} onChange={setOtherField} />
        <OtherSelectField label="婚姻" fKey="maritalStatus" options={oMaritalOptions} value={otherDraft.maritalStatus} onChange={setOtherField} />
        <OtherTextField label="子女人數" fKey="childrenCount" value={otherDraft.childrenCount} onChange={setOtherField} />

        {/* Row 5: 行業別 / 職務別 / 職位別 / 年收入 */}
        <OtherSelectField label="行業別" fKey="industry" options={oIndustryOptions} value={otherDraft.industry} onChange={setOtherField} />
        <OtherSelectField label="職務別" fKey="jobTitle" options={oJobTitleOptions} value={otherDraft.jobTitle} onChange={setOtherField} />
        <OtherSelectField label="職位別" fKey="jobPosition" options={oJobPositionOptions} value={otherDraft.jobPosition} onChange={setOtherField} />
        <OtherSelectField label="年收入" fKey="annualIncome" options={oIncomeOptions} value={otherDraft.annualIncome} onChange={setOtherField} />

        {/* Row 6: 教育程度 */}
        <OtherSelectField label="教育程度" fKey="education" options={oEducationOptions} value={otherDraft.education} onChange={setOtherField} />

        {/* 其餘保留欄位 */}
        <OtherSelectField label="每月購書金額" fKey="monthlyBookBudget" options={oBookBudgetOptions} value={otherDraft.monthlyBookBudget} onChange={setOtherField} />
        <OtherTextField label="經常購書種類" fKey="frequentBookCategory" value={otherDraft.frequentBookCategory} onChange={setOtherField} />
        <BasicField label="客戶身分">
          <CwSelect options={customerIdentityOptions} value={basicInfo.customerIdentity} onChange={v => upd('customerIdentity', v as string)} placeholder="請選擇" clearable />
        </BasicField>
      </div>
    ) : (
      /* ── ERP 客戶明細（完全不動）────────────────────────────── */
      <>
        <div className="grid grid-cols-4 gap-x-[24px] gap-y-[16px]">
          {/* Row 1: 客戶名稱 / 客戶分類 / 付款條件 / 客戶狀態 */}
          <BasicField label="客戶名稱">
            <CwInput value={basicInfo.customerName} onChange={e => upd('customerName', e.target.value)} placeholder="請輸入" />
          </BasicField>
          <OtherSelectField label="客戶分類" fKey="customerCategory" options={oCategoryOptions} required value={otherDraft.customerCategory} onChange={setOtherField} error={otherErrors.customerCategory} />
          <OtherSelectField label="付款條件" fKey="checkoutCycle" options={oCycleOptions} required value={otherDraft.checkoutCycle} onChange={setOtherField} error={otherErrors.checkoutCycle} />
          <BasicField label="客戶狀態">
            <CwSelect options={statusOptions} value={basicInfo.status} onChange={v => upd('status', v as string)} placeholder="請選擇" clearable />
          </BasicField>

          {/* Row 2: 發票開立方式 / 統一編號 / 發票抬頭 / 公司名稱 */}
          <OtherSelectField label="發票開立方式" fKey="invoiceIssueMethod" options={oInvoiceOptions} required value={otherDraft.invoiceIssueMethod} onChange={setOtherField} error={otherErrors.invoiceIssueMethod} />
          <OtherTextField label="統一編號" fKey="taxIdNumber" value={otherDraft.taxIdNumber} onChange={setOtherField} />
          <OtherTextField label="發票抬頭" fKey="invoiceTitle" value={otherDraft.invoiceTitle} onChange={setOtherField} />
          <OtherTextField label="公司名稱" fKey="companyName" value={otherDraft.companyName} onChange={setOtherField} />

          {/* Row 3: 客戶註記（整行） */}
          <OtherTextField label="客戶註記" fKey="customerNote" colSpan={4} value={otherDraft.customerNote} onChange={setOtherField} />

          {/* Row 4: 性別 / 出生日期 / 婚姻 / 子女人數 */}
          <OtherSelectField label="性別" fKey="gender" options={oGenderOptions} value={otherDraft.gender} onChange={setOtherField} />
          <OtherDateField label="出生日期" fKey="birthDate" value={otherDraft.birthDate} onChange={setOtherField} />
          <OtherSelectField label="婚姻" fKey="maritalStatus" options={oMaritalOptions} value={otherDraft.maritalStatus} onChange={setOtherField} />
          <OtherTextField label="子女人數" fKey="childrenCount" value={otherDraft.childrenCount} onChange={setOtherField} />

          {/* Row 5: 行業別 / 職務別 / 職位別 / 年收入 */}
          <OtherSelectField label="行業別" fKey="industry" options={oIndustryOptions} value={otherDraft.industry} onChange={setOtherField} />
          <OtherSelectField label="職務別" fKey="jobTitle" options={oJobTitleOptions} value={otherDraft.jobTitle} onChange={setOtherField} />
          <OtherSelectField label="職位別" fKey="jobPosition" options={oJobPositionOptions} value={otherDraft.jobPosition} onChange={setOtherField} />
          <OtherSelectField label="年收入" fKey="annualIncome" options={oIncomeOptions} value={otherDraft.annualIncome} onChange={setOtherField} />

          {/* Row 6: 教育程度 */}
          <OtherSelectField label="教育程度" fKey="education" options={oEducationOptions} value={otherDraft.education} onChange={setOtherField} />

          {/* 其餘保留欄位 */}
          <OtherSelectField label="每月購書金額" fKey="monthlyBookBudget" options={oBookBudgetOptions} value={otherDraft.monthlyBookBudget} onChange={setOtherField} />
          <OtherTextField label="經常購書種類" fKey="frequentBookCategory" value={otherDraft.frequentBookCategory} onChange={setOtherField} />
        </div>
      </>
    )}
    </>
  );
})() : activeTab === 'address' ? (
  <div className="space-y-[12px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[6px]">
    <CwButton
        variant="primary"
        appearance="filled"
        size="m"
        leftIcon={<Plus size={13} />}
        onClick={openAddModal}
      >
        新增地址
      </CwButton>

        <label className="flex items-center gap-[6px] cursor-pointer select-none ml-[8px]">
          <input
            type="checkbox"
            checked={showActiveAddressOnly}
            onChange={e => setShowActiveAddressOnly(e.target.checked)}
            className="w-[14px] h-[14px] rounded border-[#c4c9d3] text-[#0078d4] cursor-pointer"
          />
          <span className="text-[13px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
            只顯示生效地址
          </span>
        </label>
      </div>
<div className="flex items-center gap-[6px]">
<p
          className="text-[13px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]"
          style={{ fontWeight: 350 }}
        >
          共 {localAddresses.length} 筆地址
        </p>
        <CwTooltip content="「主要」表示預設地址，「生效」表示目前可使用">
          <Info className="w-[14px] h-[14px] text-[#01579b] cursor-help shrink-0" />
        </CwTooltip>
</div>
    </div>

    {localAddresses.length > 0 ? (
      <CwTable
        columns={addressColumns}
        dataSource={showActiveAddressOnly ? localAddresses.filter(a => a.isActive) : localAddresses}
        rowKey="id"
        emptyText="尚無地址資料"
      />
    ) : (
      <CwEmptyState text="尚無地址資料" />
    )}

    {showAddModal && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div
          ref={addModalRef}
          className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[440px] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span
              className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]"
              style={{ fontWeight: 700 }}
            >
              新增地址
            </span>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c] transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-[20px] px-[24px] py-[20px]">
            <AddressFormFields
              form={addForm}
              errors={addErrors}
              onChange={(field, value) => {
                setAddForm((prev) => {
                  const next = { ...prev, [field]: value };
                  if (field === 'isActive' && value === false) {
                    next.isPrimaryShipping = false;
                    next.isPrimaryInvoice = false;
                  }
                  return next;
                });
                if (value) setAddErrors((prev) => ({ ...prev, [field]: undefined }));
              }}
            />
          </div>

          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton
              variant="primary"
              appearance="outlined"
              size="m"
              onClick={() => setShowAddModal(false)}
            >
              取消
            </CwButton>
            <CwButton
              variant="primary"
              appearance="filled"
              size="m"
              onClick={handleAddConfirm}
            >
              確認新增
            </CwButton>
          </div>
        </div>
      </div>
    )}
  </div>
) : activeTab === 'contact' ? (
  <>
    <ContactTab />

    {/* 新增聯絡人 modal */}
    {showAddPersonModal && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div ref={addPersonModalRef} className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[400px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>新增聯絡人</span>
            <button onClick={() => setShowAddPersonModal(false)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
          </div>
          <div className="px-[24px] py-[20px] overflow-y-auto max-h-[70vh]">
            <PersonFormFields form={addPersonForm} errors={addPersonErrors} onChange={(f, v) => { setAddPersonForm(prev => ({ ...prev, [f]: v })); if (v) setAddPersonErrors(prev => { const n = { ...prev }; delete n[f]; return n; }); }} />
          </div>
          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setShowAddPersonModal(false)}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m" onClick={handleAddPersonConfirm}>確認新增</CwButton>
          </div>
        </div>
      </div>
    )}

    {/* 新增電話 modal */}
    {addPhonePersonId && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div ref={addPhoneModalRef} className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[440px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>新增電話</span>
            <button onClick={() => setAddPhonePersonId(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
          </div>
          <div className="px-[24px] py-[20px]">
            <PhoneFormFields form={addPhoneForm} errors={addPhoneErrors} onChange={(f, v) => { setAddPhoneForm(prev => ({ ...prev, [f]: v })); if (v) setAddPhoneErrors(prev => { const n = { ...prev }; delete n[f as keyof PhoneForm]; return n; }); }} />
          </div>
          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setAddPhonePersonId(null)}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m" onClick={handleAddPhoneConfirm}>確認新增</CwButton>
          </div>
        </div>
      </div>
    )}

    {/* 編輯電話 modal */}
    {editingPhone && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div ref={editPhoneModalRef} className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[440px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>編輯電話</span>
            <button onClick={() => setEditingPhone(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
          </div>
          <div className="px-[24px] py-[20px]">
            <PhoneFormFields form={editPhoneForm} errors={editPhoneErrors} onChange={(f, v) => { setEditPhoneForm(prev => ({ ...prev, [f]: v })); if (v) setEditPhoneErrors(prev => { const n = { ...prev }; delete n[f as keyof PhoneForm]; return n; }); }} />
          </div>
          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setEditingPhone(null)}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m" onClick={handleEditPhoneSave}>確認</CwButton>
          </div>
        </div>
      </div>
    )}

    {/* 新增 Email modal */}
    {addEmailPersonId && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div ref={addEmailModalRef} className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[440px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>新增 Email</span>
            <button onClick={() => setAddEmailPersonId(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
          </div>
          <div className="px-[24px] py-[20px]">
            <EmailFormFields form={addEmailForm} errors={addEmailErrors} onChange={(f, v) => { setAddEmailForm(prev => ({ ...prev, [f]: v })); if (v) setAddEmailErrors(prev => { const n = { ...prev }; delete n[f as keyof EmailForm]; return n; }); }} />
          </div>
          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setAddEmailPersonId(null)}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m" onClick={handleAddEmailConfirm}>確認新增</CwButton>
          </div>
        </div>
      </div>
    )}

    {/* 編輯 Email modal */}
    {editingEmail && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div ref={editEmailModalRef} className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[440px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>編輯 Email</span>
            <button onClick={() => setEditingEmail(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
          </div>
          <div className="px-[24px] py-[20px]">
            <EmailFormFields form={editEmailForm} errors={editEmailErrors} onChange={(f, v) => { setEditEmailForm(prev => ({ ...prev, [f]: v })); if (v) setEditEmailErrors(prev => { const n = { ...prev }; delete n[f as keyof EmailForm]; return n; }); }} />
          </div>
          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setEditingEmail(null)}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m" onClick={handleEditEmailSave}>確認</CwButton>
          </div>
        </div>
      </div>
    )}
  </>
) : activeTab === 'subscription' ? (() => {
  const editable = false;
  const data = editable ? subDraft : subSeniority;

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-noto-sans-tc)',
    fontSize: '13px',
    fontWeight: 350,
    color: '#4b5563',
  };
  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-noto-sans-tc)',
    fontSize: '14px',
    fontWeight: 350,
  };

  // 日期＋期數複合欄位（佔一個 grid cell）
  const DateNumField = ({
    label,
    dateVal,
    numVal,
    onDateChange,
    onNumChange,
  }: {
    label: string;
    dateVal: string;
    numVal: string;
    onDateChange: (v: string) => void;
    onNumChange: (v: string) => void;
  }) => (
    <div className="flex flex-col gap-[4px]">
      <span style={labelStyle}>{label}</span>
      <div className="flex gap-[4px] items-center">
        <div style={{ flex: 2, minWidth: 0 }}>
          {editable ? (
            <CwDatePicker
              value={dateVal ? new Date(dateVal) : null}
              onChange={d => onDateChange(d ? d.toISOString().slice(0, 10) : '')}
            />
          ) : (
            <CwInput value={dateVal} disabled style={inputStyle} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CwInput
            value={numVal}
            disabled={!editable}
            onChange={editable ? (e: React.ChangeEvent<HTMLInputElement>) => onNumChange(e.target.value) : undefined}
            placeholder="期數"
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );

  // 期數＋年份複合欄位（累計訂閱期，佔一個 grid cell）
  const NumYearsField = ({
    label,
    numVal,
    yearsVal,
    onNumChange,
    onYearsChange,
    yearsOnly = false,
  }: {
    label: string;
    numVal: string;
    yearsVal: string;
    onNumChange: (v: string) => void;
    onYearsChange: (v: string) => void;
    yearsOnly?: boolean;
  }) => (
    <div className="flex flex-col gap-[4px]">
      <span style={labelStyle}>{label}</span>
      <div className="flex gap-[4px] items-center">
        <CwInput
          value={numVal}
          disabled={!editable}
          onChange={editable ? (e: React.ChangeEvent<HTMLInputElement>) => onNumChange(e.target.value) : undefined}
          placeholder="期數"
          style={{ ...inputStyle, width: '80px', flexShrink: 0 }}
        />
        <CwInput
          value={yearsVal}
          disabled={!editable}
          onChange={editable ? (e: React.ChangeEvent<HTMLInputElement>) => onYearsChange(e.target.value) : undefined}
          placeholder="年份"
          style={{ ...inputStyle, width: '80px', flexShrink: 0 }}
        />
      </div>
    </div>
  );

  // 單一刊物的 4 欄 row
  const PubRow = ({
    pubName,
    pubKey,
    yearsOnly = false,
    extraFields,
  }: {
    pubName: string;
    pubKey: keyof Omit<SubscriptionSeniority, 'lastOrderDate'>;
    yearsOnly?: boolean;
    extraFields?: React.ReactNode;
  }) => {
    const pub = data[pubKey];
    const set = (field: keyof PubSeniority) => (v: string) => setSubPubField(pubKey, field, v);
    return (
      <div className="space-y-[8px]">
        <p
          style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: '13px',
            fontWeight: 600,
            color: '#374151',
          }}
        >
          {pubName}
        </p>
        <div className="grid grid-cols-4 gap-x-[24px] gap-y-[12px]">
          <DateNumField
            label="初次訂閱期"
            dateVal={pub.firstSubDate}
            numVal={pub.firstSubNum}
            onDateChange={set('firstSubDate')}
            onNumChange={set('firstSubNum')}
          />
          <DateNumField
            label="最近訂閱期"
            dateVal={pub.recentSubDate}
            numVal={pub.recentSubNum}
            onDateChange={set('recentSubDate')}
            onNumChange={set('recentSubNum')}
          />
          <DateNumField
            label="最近截訂期"
            dateVal={pub.recentEndDate}
            numVal={pub.recentEndNum}
            onDateChange={set('recentEndDate')}
            onNumChange={set('recentEndNum')}
          />
          <NumYearsField
            label={yearsOnly ? '累計訂閱年資' : '累計訂閱期/年資'}
            numVal={pub.totalSubNum}
            yearsVal={pub.totalSubYears}
            onNumChange={set('totalSubNum')}
            onYearsChange={set('totalSubYears')}
            yearsOnly={yearsOnly}
          />
          {extraFields}
        </div>
      </div>
    );
  };

  // 可收合的 section header（與 OMGOrderHeader 一致）
  const SectionHeader = ({ sectionKey, title }: { sectionKey: string; title: string }) => (
    <button
      onClick={() => toggleSubSection(sectionKey)}
      className="w-full px-[20px] py-[16px] bg-[#e9ebf2] hover:bg-[#dde1e9] transition-colors flex items-center justify-between"
    >
      <div className="flex items-center gap-[12px]">
        {expandedSubSections.includes(sectionKey) ? (
          <ChevronDown className="w-[20px] h-[20px] text-[#01579b]" />
        ) : (
          <ChevronRight className="w-[20px] h-[20px] text-[#01579b]" />
        )}
        <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] font-[500] text-[#1c1c1c]">{title}</span>
      </div>
    </button>
  );

  return (
    <div className="space-y-[20px]">

      {/* 最近訂貨日期（獨立欄位） */}
      <div className="grid grid-cols-4 gap-x-[24px]">
        <div className="flex flex-col gap-[4px]">
          <span style={labelStyle}>最後交易日期</span>
          {editable ? (
            <CwDatePicker
              value={data.lastOrderDate ? new Date(data.lastOrderDate) : null}
              onChange={d => setSubDraft(prev => ({ ...prev, lastOrderDate: d ? d.toISOString().slice(0, 10) : '' }))}
            />
          ) : (
            <CwInput value={data.lastOrderDate} disabled style={inputStyle} />
          )}
        </div>
      </div>

      {/* 天下訂閱 */}
      <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
        <SectionHeader sectionKey="commonwealth" title="天下訂閱" />
        {expandedSubSections.includes('commonwealth') && (
          <div className="space-y-[20px] px-[20px] py-[20px] bg-white">
            <PubRow pubName="天下雜誌" pubKey="commonwealth" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="天下電子" pubKey="commonwealthDigital" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="微笑季刊" pubKey="smileQuarterly" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="微笑電子" pubKey="smileDigital" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="換日線" pubKey="crossing" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="換日線電子" pubKey="crossingDigital" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="天下iPad" pubKey="commonwealthIpad" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="web access" pubKey="webAccess" yearsOnly extraFields={
              <NumYearsField
                label="全閱讀訂閱權益(訂戶贈閱)"
                numVal={data.fullReadSubscription.totalSubNum}
                yearsVal={data.fullReadSubscription.totalSubYears}
                onNumChange={(v) => setSubPubField('fullReadSubscription', 'totalSubNum', v)}
                onYearsChange={(v) => setSubPubField('fullReadSubscription', 'totalSubYears', v)}
              />
            } />
          </div>
        )}
      </div>

      {/* 非天下訂閱 */}
      <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
        <SectionHeader sectionKey="non-commonwealth" title="非天下訂閱" />
        {expandedSubSections.includes('non-commonwealth') && (
          <div className="space-y-[20px] px-[20px] py-[20px] bg-white">
            <PubRow pubName="康健" pubKey="commonHealth" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="康健電子" pubKey="commonHealthDigital" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="Cheers" pubKey="cheers" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="Cheers電子" pubKey="cheersDigital" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="親子天下" pubKey="parenting" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="親子電子" pubKey="parentingDigital" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="小行星" pubKey="asteroid" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="親子寶寶" pubKey="parentingBaby" />
            <div className="border-t border-[#e5e7eb]" />
            <PubRow pubName="親子寶寶電子" pubKey="parentingBabyDigital" />
          </div>
        )}
      </div>
    </div>
  );
})() : activeTab === 'subscriber-rights' ? (
  <div className="space-y-[20px]">
    <div className="space-y-[12px]">
      <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">紙本權益</h3>
      <CwTable columns={erpPaperRightsColumns} dataSource={mockPaperRightsData} emptyText="沒有資料" />
    </div>
    <div className="space-y-[12px]">
      <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">數位權益</h3>
      <CwTable columns={erpDigitalRightsColumns} dataSource={mockDigitalRightsData} emptyText="沒有資料" />
    </div>
  </div>
) : activeTab === 'operation-log' ? (() => {
  const filteredOpLog = mockOperationLogData.filter(row => {
    if (opLogApplied.operator && !row.operator.includes(opLogApplied.operator)) return false;
    if (opLogApplied.category && row.category !== opLogApplied.category) return false;
    if (opLogApplied.dateRange.start || opLogApplied.dateRange.end) {
      // 從 "YYYY/MM/DD - hh:mm:ss" 解析日期
      const datePart = row.operateTime.split(' - ')[0].replace(/\//g, '-');
      const rowDate = new Date(datePart);
      if (opLogApplied.dateRange.start && rowDate < opLogApplied.dateRange.start) return false;
      if (opLogApplied.dateRange.end && rowDate > opLogApplied.dateRange.end) return false;
    }
    return true;
  });
  return (
    <div className="space-y-[16px]">
      {/* 搜尋區 */}
      <div className="flex flex-wrap items-end gap-[12px]">
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 500, color: '#1c1c1c' }}>時間範圍</span>
          <div className="flex items-center gap-[8px]">
            <CwDatePicker value={opLogDateStart} onChange={setOpLogDateStart} placeholder="起始日期" className="w-[220px]" />
            <span className="text-[13px] text-[#7c808c]">～</span>
            <CwDatePicker value={opLogDateEnd} onChange={setOpLogDateEnd} placeholder="結束日期" className="w-[220px]" />
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 500, color: '#1c1c1c' }}>操作者</span>
          <CwInput
            value={opLogOperator}
            placeholder="輸入操作者名稱"
            onChange={e => setOpLogOperator(e.target.value)}
            style={{ width: '220px' }}
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 500, color: '#1c1c1c' }}>分類</span>
          <div style={{ width: '220px' }}>
            <CwSelect
              value={opLogCategory}
              onChange={v => setOpLogCategory(v as string)}
              placeholder="請選擇分類"
              clearable
              options={[
                { value: '基本資料', label: '基本資料' },
                { value: '地址',     label: '地址' },
                { value: '聯絡資訊', label: '聯絡資訊' },
                { value: '父子關聯', label: '父子關聯' },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-[8px]">
          <CwButton
            variant="primary"
            appearance="filled"
            size="m"
            onClick={() => setOpLogApplied({ dateRange: { start: opLogDateStart, end: opLogDateEnd }, operator: opLogOperator, category: opLogCategory })}
          >查詢</CwButton>
          <CwButton
            variant="secondary"
            appearance="outlined"
            size="m"
            onClick={() => {
              setOpLogDateStart(null);
              setOpLogDateEnd(null);
              setOpLogOperator('');
              setOpLogCategory('');
              setOpLogApplied({ dateRange: { start: null, end: null }, operator: '', category: '' });
            }}
          >重置</CwButton>
        </div>
      </div>
      {/* 列表 */}
      <CwTable columns={operationLogColumns} dataSource={filteredOpLog} emptyText="沒有符合的操作記錄" />
    </div>
  );
})() : activeTab === 'relation' ? (() => {
  const RELATION_HEADERS = ['父客編', '父客名', '子客編', '子客名', '備註', '生效', '操作'];
  return (
    <div className="flex flex-col gap-[12px]">
      {/* 工具列 */}
      <div className="flex">
        <CwButton variant="primary" appearance="filled" size="m" leftIcon={<Plus size={13} />} onClick={() => { setEditingRelation({ id: '__new__', parentNo: '', parentName: '', childNo: '', childName: '', isActive: true, note: '' }); setEditRelationForm(EMPTY_MERGE_FORM); setEditRelationErrors({}); setNewRelationRole(''); }}>新增關聯</CwButton>
      </div>
      {/* 列表 */}
      <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
        <table className="w-full text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className="bg-[#e9ebf2]">
              {RELATION_HEADERS.map(h => (
                <th key={h} className="px-[12px] py-[10px] text-left text-[#1c1c1c] border-b border-[#c4c9d3]" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mergeRelations.length === 0 ? (
              <tr>
                <td colSpan={RELATION_HEADERS.length} className="py-[40px]">
                  <CwEmptyState text="尚無關聯資料" />
                </td>
              </tr>
            ) : mergeRelations.map((rel, idx) => (
              <tr key={rel.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'}>
                <td className="px-[12px] py-[10px] text-[#1c1c1c]" style={{ whiteSpace: 'nowrap' }}>{rel.parentNo}</td>
                <td className="px-[12px] py-[10px] text-[#1c1c1c]">{rel.parentName}</td>
                <td className="px-[12px] py-[10px] text-[#1c1c1c]" style={{ whiteSpace: 'nowrap' }}>{rel.childNo}</td>
                <td className="px-[12px] py-[10px] text-[#1c1c1c]">{rel.childName}</td>
                <td className="px-[12px] py-[10px] text-[#374151]">{rel.note || '—'}</td>
                <td className="px-[12px] py-[10px]">
                  <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[4px] text-[12px] font-['Noto_Sans_TC',_sans-serif] ${rel.isActive ? 'bg-[#e6f4ea] text-[#1e7e34]' : 'bg-[#f3f4f6] text-[#7c808c]'}`} style={{ fontWeight: 500 }}>
                    {rel.isActive ? '生效' : '停用'}
                  </span>
                </td>
                <td className="px-[12px] py-[10px]">
                  <div className="flex gap-[4px]">
                    <CwRoundButton icon="edit" title="編輯" onClick={() => handleEditRelationOpen(rel)} />
                    <CwRoundButton icon="delete" title="刪除" onClick={() => handleDeleteRelation(rel.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 編輯關聯 popup */}
      {editingRelation && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[480px] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>{editingRelation?.id === '__new__' ? '新增父子關聯' : '編輯父子關聯'}</span>
              <button onClick={() => setEditingRelation(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
            </div>
            <div className="px-[24px] py-[20px] flex flex-col gap-[14px]">
              {editingRelation?.id === '__new__' && (
                <div className="flex flex-col gap-[6px]">
                  <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#4b5563]" style={{ fontWeight: 350 }}>此帳號為<span className="text-[#c00000] ml-[2px]">*</span></span>
                  <div className="flex gap-[16px]">
                    {(['parent', 'child'] as const).map(role => (
                      <label key={role} className="flex items-center gap-[6px] cursor-pointer select-none">
                        <input
                          type="radio"
                          name="relationRole"
                          checked={newRelationRole === role}
                          onChange={() => {
                            setNewRelationRole(role);
                            if (role === 'parent') {
                              setEditRelationForm(p => ({ ...p, parentNo: customer.customerNumber, parentName: customer.customerName, childNo: '', childName: '' }));
                            } else {
                              setEditRelationForm(p => ({ ...p, childNo: customer.customerNumber, childName: customer.customerName, parentNo: '', parentName: '' }));
                            }
                            setEditRelationErrors({});
                          }}
                          className="accent-[#0078d4] w-[15px] h-[15px]"
                        />
                        <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 350 }}>
                          {role === 'parent' ? '客編(父)' : '客編(子)'}
                        </span>
                      </label>
                    ))}
                  </div>
                  {(editRelationErrors as Record<string, string>).role && (
                    <span className="font-['Noto_Sans_TC',_sans-serif] text-[12px] text-[#c00000]">{(editRelationErrors as Record<string, string>).role}</span>
                  )}
                </div>
              )}
              <div className="grid grid-cols-2 gap-[12px]">
                {/* 父 — 客編（帶放大鏡，新增模式且非自動帶入則可用） */}
                <div className="flex flex-col gap-[4px]">
                  <label className="font-['Noto_Sans_TC',_sans-serif] text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 350 }}>
                    父客編<span className="text-[#c00000] ml-[2px]">*</span>
                  </label>
                  <div className="relative">
                    <CwInput value={editRelationForm.parentNo} error={editRelationErrors.parentNo} disabled={editingRelation?.id !== '__new__' || newRelationRole === 'parent'} onChange={e => { setEditRelationForm(p => ({ ...p, parentNo: e.target.value })); setEditRelationErrors(p => { const n = { ...p }; delete n.parentNo; return n; }); }} />
                    {editingRelation?.id === '__new__' && newRelationRole !== 'parent' && (
                      <button onClick={() => { setCustomerLookupKeyword(''); setShowCustomerLookup('parent'); }} className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center rounded hover:bg-[#e6f7ff] transition-colors" title="查詢客戶">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#0078d4" strokeWidth="1.5"/><path d="M10 10L13 13" stroke="#0078d4" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                    )}
                  </div>
                </div>
                {/* 父 — 名稱 */}
                <CwInput label="父客名" required value={editRelationForm.parentName} error={editRelationErrors.parentName} disabled={editingRelation?.id !== '__new__' || newRelationRole === 'parent'} onChange={e => { setEditRelationForm(p => ({ ...p, parentName: e.target.value })); setEditRelationErrors(p => { const n = { ...p }; delete n.parentName; return n; }); }} />
                {/* 子 — 客編（帶放大鏡，新增模式且非自動帶入則可用） */}
                <div className="flex flex-col gap-[4px]">
                  <label className="font-['Noto_Sans_TC',_sans-serif] text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 350 }}>
                    子客編<span className="text-[#c00000] ml-[2px]">*</span>
                  </label>
                  <div className="relative">
                    <CwInput value={editRelationForm.childNo} error={editRelationErrors.childNo} disabled={editingRelation?.id !== '__new__' || newRelationRole === 'child'} onChange={e => { setEditRelationForm(p => ({ ...p, childNo: e.target.value })); setEditRelationErrors(p => { const n = { ...p }; delete n.childNo; return n; }); }} />
                    {editingRelation?.id === '__new__' && newRelationRole !== 'child' && (
                      <button onClick={() => { setCustomerLookupKeyword(''); setShowCustomerLookup('child'); }} className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center rounded hover:bg-[#e6f7ff] transition-colors" title="查詢客戶">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#0078d4" strokeWidth="1.5"/><path d="M10 10L13 13" stroke="#0078d4" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </button>
                    )}
                  </div>
                </div>
                {/* 子 — 名稱 */}
                <CwInput label="子客名" required value={editRelationForm.childName} error={editRelationErrors.childName} disabled={editingRelation?.id !== '__new__' || newRelationRole === 'child'} onChange={e => { setEditRelationForm(p => ({ ...p, childName: e.target.value })); setEditRelationErrors(p => { const n = { ...p }; delete n.childName; return n; }); }} />
              </div>
              <CwInput label="備註" value={editRelationForm.note} onChange={e => setEditRelationForm(p => ({ ...p, note: e.target.value }))} />
              <div className="flex items-center gap-[8px]">
                <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#4b5563]" style={{ fontWeight: 350 }}>生效<span className="text-[#c00000] ml-[2px]">*</span></span>
                <button
                  onClick={() => setEditRelationForm(p => ({ ...p, isActive: !p.isActive }))}
                  className={`relative w-[40px] h-[22px] rounded-[11px] transition-colors ${editRelationForm.isActive ? 'bg-[#0078d4]' : 'bg-[#c4c9d3]'}`}
                >
                  <span className={`absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full shadow transition-transform ${editRelationForm.isActive ? 'left-[21px]' : 'left-[3px]'}`} />
                </button>
                <span className="font-['Noto_Sans_TC',_sans-serif] text-[13px] text-[#7c808c]" style={{ fontWeight: 350 }}>{editRelationForm.isActive ? '生效' : '停用'}</span>
              </div>
            </div>
            <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
              <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setEditingRelation(null)}>取消</CwButton>
              <CwButton variant="primary" appearance="filled" size="m" onClick={handleEditRelationSave}>儲存</CwButton>
            </div>
          </div>
        </div>
      )}

      {/* 客戶查詢 popup */}
      {showCustomerLookup && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[520px] flex flex-col overflow-hidden" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>查詢客戶</span>
              <button onClick={() => setShowCustomerLookup(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <CwInput
                isSearch
                placeholder="搜尋客戶編號或名稱"
                value={customerLookupKeyword}
                onChange={e => setCustomerLookupKeyword(e.target.value)}
                clearable
                onClear={() => setCustomerLookupKeyword('')}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-[13px] font-['Noto_Sans_TC',_sans-serif]" style={{ borderCollapse: 'collapse' }}>
                <thead className="sticky top-0 bg-[#e9ebf2]">
                  <tr>
                    <th className="px-[16px] py-[10px] text-left text-[#1c1c1c] border-b border-[#c4c9d3]" style={{ fontWeight: 600 }}>客戶編號</th>
                    <th className="px-[16px] py-[10px] text-left text-[#1c1c1c] border-b border-[#c4c9d3]" style={{ fontWeight: 600 }}>客戶名稱</th>
                    <th className="px-[16px] py-[10px] text-center text-[#1c1c1c] border-b border-[#c4c9d3]" style={{ fontWeight: 600 }}>動作</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCustomerLookup
                    .filter(c => {
                      const kw = customerLookupKeyword.toLowerCase();
                      return !kw || c.customerNumber.toLowerCase().includes(kw) || c.customerName.toLowerCase().includes(kw);
                    })
                    .map((c, idx) => (
                      <tr key={c.customerNumber} className={`border-b border-[#f3f4f6] hover:bg-[#e6f7ff] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'}`}>
                        <td className="px-[16px] py-[10px] text-[#1c1c1c]" style={{ fontWeight: 500 }}>{c.customerNumber}</td>
                        <td className="px-[16px] py-[10px] text-[#1c1c1c]">{c.customerName}</td>
                        <td className="px-[16px] py-[10px] text-center">
                          <button
                            onClick={() => {
                              if (showCustomerLookup === 'parent') {
                                setEditRelationForm(p => ({ ...p, parentNo: c.customerNumber, parentName: c.customerName }));
                                setEditRelationErrors(p => { const n = { ...p }; delete n.parentNo; delete n.parentName; return n; });
                              } else {
                                setEditRelationForm(p => ({ ...p, childNo: c.customerNumber, childName: c.customerName }));
                                setEditRelationErrors(p => { const n = { ...p }; delete n.childNo; delete n.childName; return n; });
                              }
                              setShowCustomerLookup(null);
                            }}
                            className="px-[10px] py-[4px] bg-[#0078d4] text-white text-[12px] rounded-[4px] hover:bg-[#005fa3] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                            style={{ fontWeight: 500 }}
                          >
                            選擇
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
})() : (
  <CwEmptyState text="尚無資料" />
)}
        </div>
      </div>

      {/* ── 客戶明細底部按鈕 ── */}
      {!createMode && (
        <div className="flex flex-col mx-[30px]">
          <div className="border-t border-[#e5e7eb]" />
          <div className="flex items-center justify-end gap-[8px] pt-[16px] pb-[40px]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={onClose}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m">儲存</CwButton>
            {/* <CwButton variant="destructive" appearance="outlined" size="m">刪除客戶</CwButton> */}
          </div>
        </div>
      )}

      {/* ── 新增客戶底部按鈕 ── */}
      {createMode && (
        <div className="flex flex-col mx-[30px]">
        <div className="border-t border-[#e5e7eb]" />
        <div className="flex items-center justify-end gap-[8px] pt-[16px] pb-[40px]">
          <CwButton variant="primary" appearance="outlined" size="m" onClick={onClose}>取消</CwButton>
          <CwButton variant="primary" appearance="outlined" size="m" onClick={() => {
            const now = new Date();
            const pad = (n: number) => String(n).padStart(2, '0');
            const savedAt = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
            onSaveDraft?.({
              id: String(Date.now()),
              customerName: basicInfo.customerName,
              taxId: basicInfo.taxId,
              customerIdentity: basicInfo.customerIdentity,
              savedAt,
              formData: {
                customerNumber: basicInfo.customerNumber,
                customerName: basicInfo.customerName,
                taxId: basicInfo.taxId,
                status: basicInfo.status,
                customerIdentity: basicInfo.customerIdentity,
                address: customer.address,
                contact: customer.contact,
                email: customer.email,
                mobile: customer.mobile,
                phone: customer.phone,
                marketingConsentDate: basicInfo.marketingConsentDate,
                lastTransactionDate: basicInfo.lastTransactionDate,
              },
            });
            setShowDraftToast(true);
          }}>暫存</CwButton>
          <CwButton variant="primary" appearance="filled" size="m" onClick={() => {
            if (!basicInfo.customerName.trim()) { setCustomerNameError('客戶名稱為必填'); return; }
          }}>儲存</CwButton>
        </div>
        </div>
      )}
    </div>

    {/* ── 地址編輯 Drawer ── */}
    <CwDrawer
      open={!!editingAddress}
      onClose={closeEditDrawer}
      title={`編輯地址${editingAddress ? ` — ${editingAddress.id}` : ''}`}
      initialWidth={480}
      showPrevious
      showNext
      disablePrevious={!editingAddress || localAddresses.findIndex(r => r.id === editingAddress.id) <= 0}
      disableNext={!editingAddress || localAddresses.findIndex(r => r.id === editingAddress.id) >= localAddresses.length - 1}
      onPrevious={() => navigateAddress('prev')}
      onNext={() => navigateAddress('next')}
    >
      {editingAddress && (
        <div className="flex flex-col gap-[20px] p-[4px]">

          <AddressFormFields
            form={editForm}
            errors={editErrors}
            onChange={(field, value) => {
              setEditForm(prev => {
                const next = { ...prev, [field]: value };
                if (field === 'isActive' && value === false) {
                  next.isPrimaryShipping = false;
                  next.isPrimaryInvoice = false;
                }
                return next;
              });
              if (value) setEditErrors(prev => ({ ...prev, [field]: undefined }));
            }}
          />

          {/* 最後更新日期（唯讀） */}
          <div className="flex flex-col gap-[4px] pt-[4px]">
            <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 400 }}>
              最後更新日期
            </span>
            <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif] tabular-nums" style={{ fontWeight: 350 }}>
              {editingAddress.updatedAt}
            </span>
          </div>

        </div>
      )}
    </CwDrawer>

    {/* 編輯聯絡人 popup */}
    {editingPerson && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[400px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
            <span className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>編輯聯絡人 — {editingPerson.name}</span>
            <button onClick={() => setEditingPerson(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]">✕</button>
          </div>
          <div className="px-[24px] py-[20px] flex flex-col gap-[16px]">
            <PersonFormFields
              form={editPersonForm}
              errors={editPersonErrors}
              onChange={(field, value) => {
                setEditPersonForm(prev => ({ ...prev, [field]: value }));
                if (value) setEditPersonErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
              }}
            />
            <div className="flex flex-col gap-[4px]">
              <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 400 }}>最後更新日期</span>
              <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif] tabular-nums" style={{ fontWeight: 350 }}>{editingPerson.updatedAt}</span>
            </div>
          </div>
          <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
            <CwButton variant="primary" appearance="outlined" size="m" onClick={() => setEditingPerson(null)}>取消</CwButton>
            <CwButton variant="primary" appearance="filled" size="m" onClick={handleEditPersonSave}>確認</CwButton>
          </div>
        </div>
      </div>
    )}
    {/* ── 訂戶權益：修改權益 Popup ── */}
    <CwPopup
      open={isRightsPopupOpen}
      onClose={handleRightsCancel}
      title="修改權益"
      size="sm"
      closableByMask={false}
      buttons={[
        { label: '取消', variant: 'primary', appearance: 'outlined', onClick: handleRightsCancel, icon: 'close' },
        { label: '確認', variant: 'primary', appearance: 'filled', onClick: handleRightsConfirm, icon: 'check' },
      ]}
    >
      <div className="space-y-[16px]">
        <div className="flex items-end gap-[8px]">
          <div className="flex-1">
            <CwDatePicker
              label="權益到期日"
              value={rightsExpiryDate}
              onChange={setRightsExpiryDate}
              placeholder="請選擇日期"
            />
          </div>
          <button
            onClick={handleRightsSetToday}
            className="h-[35px] px-[16px] bg-[#e9ebf2] rounded-[4px] font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c] hover:bg-[#d1d5dd] transition-colors whitespace-nowrap"
          >
            今天
          </button>
        </div>
      </div>
    </CwPopup>

    {/* ── 訂戶權益：Toast 通知 ── */}
    {showRightsToast && (
      <CwToast
        message={rightsToastMessage}
        type={rightsToastType}
        onClose={() => setShowRightsToast(false)}
        duration={3000}
      />
    )}

    {/* ── 暫存：Toast 通知 ── */}
    {showDraftToast && (
      <CwToast
        message="已暫存，可至查詢頁「待完成」繼續編輯"
        type="success"
        onClose={() => setShowDraftToast(false)}
        duration={3000}
      />
    )}
    </>
  );
}
