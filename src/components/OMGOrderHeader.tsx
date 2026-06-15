import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { ChevronDown, ChevronRight, Info, Search, X } from "lucide-react";
import { CwInput } from "./CwInput";
import { CwSelect } from "./CwSelect";
import { CwDatePicker } from "./CwDatePicker";
import { CwTooltip } from "./CwTooltip";
import { CwToast } from "./CwToast";

// ── Mock 資料 ───────────────────────────────────────────────

const mockCustomers = [
  { id: 1, code: 'C001234', name: '王小明', phone: '02-25074855', address: '台北市中山區中山北路二段7號',  recipient: '王小明', shipMethod: '1001-郵寄一般',      defaultInvoiceMethod: 'N', defaultTaxId: '',           defaultEmail: 'wang@example.com',    defaultCarrierType: '' },
  { id: 2, code: 'C002345', name: '李大華', phone: '02-29538888', address: '新北市板橋區文化路一段188號', recipient: '李大華', shipMethod: '1002-郵寄限時',      defaultInvoiceMethod: '6', defaultTaxId: '',           defaultEmail: 'lee@example.com',     defaultCarrierType: '會員載具' },
  { id: 3, code: 'C003456', name: '陳美玲', phone: '04-22580777', address: '台中市西屯區台灣大道三段99號', recipient: '陳美玲', shipMethod: '1001-郵寄一般',      defaultInvoiceMethod: '3', defaultTaxId: '12345678',   defaultEmail: 'chen@example.com',    defaultCarrierType: '' },
  { id: 4, code: 'C004567', name: '張志遠', phone: '07-33335555', address: '高雄市前鎮區中山三路6號',    recipient: '張志遠', shipMethod: '1005-郵寄-一般航空', defaultInvoiceMethod: '4', defaultTaxId: '',           defaultEmail: 'chang@example.com',   defaultCarrierType: '' },
  { id: 5, code: 'C005678', name: '林淑芬', phone: '06-23456789', address: '台南市東區裕農路198號',      recipient: '林淑芬', shipMethod: '1001-郵寄一般',      defaultInvoiceMethod: 'N', defaultTaxId: '',           defaultEmail: 'lin@example.com',     defaultCarrierType: '' },
  { id: 6, code: '1679128', name: 'JEFF',   phone: '0912-345-678', address: '台北市大同區民權西路103號', recipient: 'JEFF',   shipMethod: '1002-郵寄限時',      defaultInvoiceMethod: '6', defaultTaxId: '',           defaultEmail: 'polk200276+3@gmail.com', defaultCarrierType: '會員載具' },
  { id: 7, code: 'C007890', name: '洪建志', phone: '08-33335566', address: '屏東市民生路55號',          recipient: '洪建志', shipMethod: '1001-郵寄一般',      defaultInvoiceMethod: 'N', defaultTaxId: '87654321',   defaultEmail: 'hung@example.com',    defaultCarrierType: '' },
];

// 退訂單 mock（記錄原訂單是否已開立發票）
const mockCancelOrders: Record<string, { hasInvoice: boolean }> = {
  'CN001': { hasInvoice: true  },
  'CN002': { hasInvoice: false },
  'CN003': { hasInvoice: true  },
};

type CustomerAddress = {
  id: number;
  isPrimary: boolean;
  region: '國內' | '海外';
  country: string;
  zipCode: string;
  city: string;
  district: string;
  state: string;
  province: string;
  address: string;
};

const formatAddress = (a: CustomerAddress): string => {
  if (a.region === '國內') return `${a.zipCode} ${a.city}${a.district}${a.address}`;
  return [a.country, a.state, a.province, a.city, a.address].filter(Boolean).join(' ');
};

type CustomerContact = {
  id: number;
  name: string;
  phone: string;
};

const mockCustomerContactBook: Record<string, CustomerContact[]> = {
  'C001234': [
    { id: 1, name: '王小明', phone: '02-25074855' },
    { id: 2, name: '王太太', phone: '0912-111-222' },
  ],
  'C002345': [{ id: 1, name: '李大華', phone: '02-29538888' }],
  'C003456': [{ id: 1, name: '陳美玲', phone: '04-22580777' }],
  'C004567': [{ id: 1, name: '張志遠', phone: '07-33335555' }],
  'C005678': [{ id: 1, name: '林淑芬', phone: '06-23456789' }],
  '1679128': [{ id: 1, name: 'JEFF',   phone: '0912-345-678' }],
  'C007890': [{ id: 1, name: '洪建志', phone: '08-33335566' }],
};

const mockCustomerAddressBook: Record<string, CustomerAddress[]> = {
  'C001234': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '104', city: '台北市', district: '中山區', state: '', province: '', address: '中山北路二段7號' },
    { id: 2, isPrimary: false, region: '國內', country: 'TW', zipCode: '106', city: '台北市', district: '大安區', state: '', province: '', address: '仁愛路四段100號' },
  ],
  'C002345': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '220', city: '新北市', district: '板橋區', state: '', province: '', address: '文化路一段188號' },
  ],
  'C003456': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '407', city: '台中市', district: '西屯區', state: '', province: '', address: '台灣大道三段99號' },
    { id: 2, isPrimary: false, region: '國內', country: 'TW', zipCode: '402', city: '台中市', district: '南區',   state: '', province: '', address: '復興路二段55號' },
  ],
  'C004567': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '806', city: '高雄市', district: '前鎮區', state: '', province: '', address: '中山三路6號' },
  ],
  'C005678': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '701', city: '台南市', district: '東區',   state: '', province: '', address: '裕農路198號' },
  ],
  '1679128': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '103', city: '台北市', district: '大同區', state: '', province: '', address: '民權西路103號' },
  ],
  'C007890': [
    { id: 1, isPrimary: true,  region: '國內', country: 'TW', zipCode: '900', city: '屏東市', district: '',       state: '', province: '', address: '民生路55號' },
  ],
};

const mockTaiwanPostalCodes = [
  { zipCode: '100', city: '台北市', district: '中正區' },
  { zipCode: '103', city: '台北市', district: '大同區' },
  { zipCode: '104', city: '台北市', district: '中山區' },
  { zipCode: '106', city: '台北市', district: '大安區' },
  { zipCode: '110', city: '台北市', district: '信義區' },
  { zipCode: '114', city: '台北市', district: '內湖區' },
  { zipCode: '220', city: '新北市', district: '板橋區' },
  { zipCode: '231', city: '新北市', district: '新店區' },
  { zipCode: '330', city: '桃園市', district: '桃園區' },
  { zipCode: '300', city: '新竹市', district: '東區' },
  { zipCode: '402', city: '台中市', district: '南區' },
  { zipCode: '407', city: '台中市', district: '西屯區' },
  { zipCode: '700', city: '台南市', district: '中西區' },
  { zipCode: '701', city: '台南市', district: '東區' },
  { zipCode: '800', city: '高雄市', district: '新興區' },
  { zipCode: '806', city: '高雄市', district: '前鎮區' },
  { zipCode: '900', city: '屏東市', district: '' },
];

const mockCountryOptions = [
  { value: 'TW', label: '台灣' },
  { value: 'US', label: '美國' },
  { value: 'JP', label: '日本' },
  { value: 'CN', label: '中國' },
  { value: 'SG', label: '新加坡' },
];

const mockShippingMethods = [
  { id:  1, code: '1001', name: '郵寄一般' },
  { id:  2, code: '1002', name: '郵寄限時' },
  { id:  3, code: '1005', name: '郵寄-一般航空' },
  { id:  4, code: '1006', name: '郵寄-掛號水陸' },
  { id:  5, code: '1007', name: '郵寄-掛號航空' },
  { id:  6, code: '1008', name: '郵寄-限時掛號' },
  { id:  7, code: '1009', name: '郵寄-指定宅配' },
  { id:  8, code: '1010', name: '郵寄-郵箱' },
  { id:  9, code: '1011', name: '郵寄-發票掛號' },
  { id: 10, code: '2001', name: '宅配' },
  { id: 11, code: '4021', name: '合併寄送-農委會動植物防疫檢疫局' },
  { id: 12, code: '4022', name: '合併寄送-洋基通運股份有限公司行' },
  { id: 13, code: '4023', name: '合併寄送-大榮汽車貨運公司福委會' },
  { id: 14, code: '9010', name: '系統判定-水陸小包掛號' },
  { id: 15, code: '9011', name: '系統判定-航空雜誌掛號' },
  { id: 16, code: '9012', name: '系統判定-航空印刷品掛號' },
  { id: 17, code: '9013', name: '系統判定-航空小包掛號' },
  { id: 18, code: '9014', name: '系統判定-水陸包裹' },
  { id: 19, code: '9015', name: '系統判定-航空包裹' },
];

const defaultShipMethodByRegion = (region: '國內' | '海外') =>
  region === '海外' ? '1005-郵寄-一般航空' : '1001-郵寄一般';

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

const mockEmployees = [
  { code: '001001', name: '林業務' },
  { code: '001002', name: '張業務' },
  { code: '001003', name: '王業務' },
  { code: '001004', name: '陳業務' },
  { code: '001005', name: '郭業務' },
];

const mockTrackingCodes = [
  { code: '102', name: '康健快速結帳頁' },
  { code: '103', name: '親子快速結帳頁' },
  { code: '104', name: '小行星快速結帳頁' },
  { code: '105', name: '康健5月內廣訂購證' },
  { code: '106', name: '康健5月訂戶夾寄DM' },
  { code: '107', name: '親子5月內廣訂購證' },
  { code: '108', name: '親子5月訂戶夾寄DM' },
  { code: '109', name: '天下621內廣訂購證' },
  { code: '110', name: '天下621夾寄DM' },
  { code: '111', name: '天下五月續訂郵簡' },
  { code: '112', name: 'Cheers200內廣訂購證' },
  { code: '113', name: 'Cheers200夾寄DM' },
  { code: '114', name: '小行星5月內廣訂購證' },
  { code: '115', name: '小行星5月訂戶夾寄DM' },
  { code: '116', name: '小行星3月斷訂戶轉會' },
  { code: '117', name: '小行星3月斷訂黑白' },
  { code: '118', name: '超商代收' },
];

// ── 來源系統選項 ──────────────────────────────────────────────

const SOURCE_SYSTEM_OPTIONS = [
  { value: '91',    label: '91APP' },
  { value: '91UAT', label: '91APPUAT' },
  { value: 'A',     label: '活動平台' },
  { value: 'AUTO',  label: '自動續訂單' },
  { value: 'ERP',   label: 'ERP' },
  { value: 'GP',    label: '天下團體授權系統' },
  { value: 'IAP',   label: 'IAP' },
  { value: 'IB',    label: '親子線上課程' },
  { value: 'IC',    label: '天下網書' },
  { value: 'IHA',   label: '康健金流' },
  { value: 'IHB',   label: '康健課程平台' },
  { value: 'IM',    label: 'MasterCheers' },
  { value: 'IPA',   label: '親子活動平台' },
  { value: 'IPF',   label: '親子翻轉教育' },
  { value: 'IPN',   label: '親子序號平台' },
  { value: 'IPP',   label: '親子Premium' },
  { value: 'IPS',   label: '親子蝦皮訂單' },
  { value: 'IPT',   label: '親子主題站台' },
  { value: 'IR',    label: '有聲書APP' },
  { value: 'IRS',   label: '親子學SeeMi' },
  { value: 'IRZ',   label: '親子學佐羅力' },
  { value: 'IS',    label: '全閱讀' },
  { value: 'ISA',   label: '台哥大代銷' },
  { value: 'IU',    label: '聯合銷售平台' },
  { value: 'MKT',   label: '行銷平台' },
  { value: 'P',     label: '親子電商' },
  { value: 'P91',   label: '親子電商91' },
  { value: 'SN',    label: '序號平台' },
  { value: 'T',     label: '電銷' },
  { value: 'TE',    label: '測試' },
];

// ── 法人（BU）選項（前端顯示中文，後端收數字）──────────────────

const BU_OPTIONS = [
  { value: '81',  label: '天下' },
  { value: '88',  label: '康健' },
  { value: '82',  label: '親子' },
  { value: '110', label: '親子學' },
];

// 優先順序：天下 > 康健 > 親子 > 親子學
const BU_PRIORITY_ORDER = ['81', '88', '82', '110'];

// Mock 當前使用者的 BU 清單（實際應從登入資訊取得）
const mockCurrentUserBUs: string[] = ['81', '82'];

function getDefaultBU(userBUs: string[]): string {
  for (const bu of BU_PRIORITY_ORDER) {
    if (userBUs.includes(bu)) return bu;
  }
  return userBUs[0] ?? '';
}

// ── OMG 訂單類型選項 ────────────────────────────────────────
const OMG_ORDER_TYPE_OPTIONS = [
  { value: '訂單', label: '訂單' },
];

// ── 通路代碼選項（與 NewPMOrderManagement.tsx SOURCE_CODE_OPTIONS 同步）──
const CHANNEL_CODE_OPTIONS = [
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

// ── 贈閱原因選項 ──────────────────────────────────────────────
const FREE_READING_REASON_OPTIONS = [
  { value: '01',   label: '1_PR贈閱' },
  { value: '02',   label: '2_同仁父母贈閱' },
  { value: '03',   label: '3_致歉贈閱' },
  { value: '05',   label: '5_參與調查受贈雜誌' },
  { value: '07',   label: '7_專案贈閱(需拆帳)' },
  { value: '08',   label: '8_訂閱補贈(電雜/贈書/贈品)' },
  { value: '0801', label: '8.01_天下全閱讀MGM活動' },
  { value: '0802', label: '8.02_親子線上平台贈送' },
  { value: '09',   label: '9_海外贈品改換期數或贈刊' },
  { value: '10',   label: '10_行銷活動贈閱' },
  { value: '12',   label: '12_ipad暫停服務贈閱' },
  { value: '13',   label: '13_序號平台轉入(全閱讀禮物卡)' },
  { value: '14',   label: '14_用兌換券換課程' },
];

// ── 贈閱部門選項 ──────────────────────────────────────────────
const FREE_READING_DEPARTMENT_OPTIONS = [
  '數位Team', '不分部門', 'Podcast', '編輯部',
  '出版部(財經其他類)-停用', '資料室-停用',
  '行銷部', '經直銷組暨電銷組', '行銷業務組',
  '廣告部(企1)', '廣告部(企2)', '廣告部(企3)', '廣告部(政)', '廣告部-不使用',
  '總管理處', '總管理處_', '品牌中心', '品牌策展部',
  '網路部(數位創新)', '調查中心', '人力資源部', '製管部', '發行部', '財務部',
  '客服部', '資訊科技部',
  '天下大學-停用', '出版部(健康類)-停用', '出版部(童書類)-停用', '出版部',
  '親子天下-停用', '大人社團', '策展事業部', '影視小組', '營運中心',
  '未來事業部', '數位新產品', '親子CLUB',
  '海外暨新事業發展中心', '設計中心', '會員營運部',
  '會員經營策略組/To C', '數位產品內容', '技術中心',
  '客戶整合-專案組', '數位研發中心', '社群中心', '數位產品研發中心',
  '行銷企劃組/To B', '會員營運平台組', '法務部', '總務組',
  'Lab', '數位行銷', '財務(L)', '會員中心', '客戶整合-新創組',
].map(name => ({ value: name, label: name }));

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
  convenienceStoreName: string;
  convenienceStoreAddress: string;

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
  convenienceStoreName: '',
  convenienceStoreAddress: '',
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
  agreeMarketing: '1',
  agreeMarketingDate: '',
  orderDate: '',
  omgOrderType: '訂單',
  planCode: '',
  channelCode: '',
  trackingCode: '',
  salesperson: '',
  shipCustomerCode: '',
  shipCustomerName: '',
  shipRecipient: '',
  shipAddress: '',
  postage: '0',
  shipMethod: '',
  specialPackageInstruction: '',
  deliveryNote: 'N',
  convenienceStoreName: '',
  convenienceStoreAddress: '',
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
  label, value, onChange, onOpen, onClear, onBlur, disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onOpen: () => void;
  onClear: () => void;
  onBlur?: (v: string) => void;
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
          onBlur={(e) => onBlur?.(e.target.value)}
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
  initialData?: Partial<OMGOrderHeaderData>;
  titleLeft?: React.ReactNode;
}>(function OMGOrderHeader({
  defaultExpandAll = false,
  mode = 'view',
  initialData,
  titleLeft,
}, ref) {
  const editable = mode === 'create' || mode === 'edit';

  // ── 展開/收合 state ──
  const [expandedSections, setExpandedSections] = useState<SectionKey[]>(
    defaultExpandAll ? sections.map((s) => s.key) : ['basic']
  );

  // ── 表單 state（create 模式用空白值，view 模式用 mock 資料）──
  const [form, setForm] = useState<OMGOrderHeaderData>(() => {
    if (mode === 'create') {
      const today = new Date();
      const todayStr = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
      const base = { ...emptyOrderHeader, legalEntity: getDefaultBU(mockCurrentUserBUs), orderDate: todayStr, agreeMarketingDate: todayStr, memberAccount: 'member001@cw.com.tw' };
      return initialData ? { ...base, ...initialData, orderDate: todayStr, orderNumber: '' } : base;
    }
    return mockOMGOrderHeader;
  });

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

  // ── 出貨地址 Popup state ──
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const addressPopupRef = useRef<HTMLDivElement>(null);
  const [customerAddresses, setCustomerAddresses] = useState<CustomerAddress[]>([]);
  const emptyNewAddress: CustomerAddress = { id: 0, isPrimary: false, region: '國內', country: 'TW', zipCode: '', city: '', district: '', state: '', province: '', address: '' };
  const [newAddr, setNewAddr] = useState<CustomerAddress>(emptyNewAddress);

  // ── 發票地址 Popup state ──
  const [showInvoiceAddressPopup, setShowInvoiceAddressPopup] = useState(false);
  const [showNewInvoiceAddressForm, setShowNewInvoiceAddressForm] = useState(false);
  const invoiceAddressPopupRef = useRef<HTMLDivElement>(null);
  const [invoiceAddresses, setInvoiceAddresses] = useState<CustomerAddress[]>([]);
  const [newInvoiceAddr, setNewInvoiceAddr] = useState<CustomerAddress>(emptyNewAddress);

  // ── 出貨收件人 Popup state ──
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const contactPopupRef = useRef<HTMLDivElement>(null);
  const [customerContacts, setCustomerContacts] = useState<CustomerContact[]>([]);
  const emptyNewContact: CustomerContact = { id: 0, name: '', phone: '' };
  const [newContact, setNewContact] = useState<CustomerContact>(emptyNewContact);

  // ── 發票收件人 Popup state ──
  const [showInvoiceContactPopup, setShowInvoiceContactPopup] = useState(false);
  const [showNewInvoiceContactForm, setShowNewInvoiceContactForm] = useState(false);
  const invoiceContactPopupRef = useRef<HTMLDivElement>(null);
  const [invoiceContacts, setInvoiceContacts] = useState<CustomerContact[]>([]);
  const [newInvoiceContact, setNewInvoiceContact] = useState<CustomerContact>(emptyNewContact);

  // 原訂單是否已開立發票（互轉單查詢後設定）
  const [originalOrderHasInvoice, setOriginalOrderHasInvoice] = useState(false);

  // ── 出貨方式 Popup state ──
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [shippingKeyword, setShippingKeyword] = useState('');
  const shippingPopupRef = useRef<HTMLDivElement>(null);

  // ── 方案 Popup state ──
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [planKeyword, setPlanKeyword] = useState('');
  const planPopupRef = useRef<HTMLDivElement>(null);

  const [showTrackingCodePopup, setShowTrackingCodePopup] = useState(false);
  const [trackingCodeKeyword, setTrackingCodeKeyword] = useState('');
  const trackingCodePopupRef = useRef<HTMLDivElement>(null);

  const [showSalespersonPopup, setShowSalespersonPopup] = useState(false);
  const [salespersonKeyword, setSalespersonKeyword] = useState('');
  const salespersonPopupRef = useRef<HTMLDivElement>(null);

  const [toast, setToast] = useState<{ type: 'error' | 'warning'; message: string } | null>(null);

  // ── 點擊外部關閉 popup ──
  // 有全螢幕 overlay 的 popup 開啟時，鎖定 body 捲動
  useEffect(() => {
    const anyOpen = !!activeCustomerPopup || showAddressPopup || showInvoiceAddressPopup ||
      showContactPopup || showInvoiceContactPopup || showShippingPopup ||
      showPlanPopup || showTrackingCodePopup || showSalespersonPopup;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeCustomerPopup, showAddressPopup, showInvoiceAddressPopup,
      showContactPopup, showInvoiceContactPopup, showShippingPopup,
      showPlanPopup, showTrackingCodePopup, showSalespersonPopup]);

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
      if (showTrackingCodePopup && trackingCodePopupRef.current && !trackingCodePopupRef.current.contains(e.target as Node)) {
        setShowTrackingCodePopup(false); setTrackingCodeKeyword('');
      }
      if (showSalespersonPopup && salespersonPopupRef.current && !salespersonPopupRef.current.contains(e.target as Node)) {
        setShowSalespersonPopup(false); setSalespersonKeyword('');
      }
      if (showAddressPopup && addressPopupRef.current && !addressPopupRef.current.contains(e.target as Node)) {
        setShowAddressPopup(false); setShowNewAddressForm(false); setNewAddr(emptyNewAddress);
      }
      if (showContactPopup && contactPopupRef.current && !contactPopupRef.current.contains(e.target as Node)) {
        setShowContactPopup(false); setShowNewContactForm(false); setNewContact(emptyNewContact);
      }
      if (showInvoiceAddressPopup && invoiceAddressPopupRef.current && !invoiceAddressPopupRef.current.contains(e.target as Node)) {
        setShowInvoiceAddressPopup(false); setShowNewInvoiceAddressForm(false); setNewInvoiceAddr(emptyNewAddress);
      }
      if (showInvoiceContactPopup && invoiceContactPopupRef.current && !invoiceContactPopupRef.current.contains(e.target as Node)) {
        setShowInvoiceContactPopup(false); setShowNewInvoiceContactForm(false); setNewInvoiceContact(emptyNewContact);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activeCustomerPopup, showShippingPopup, showPlanPopup, showTrackingCodePopup, showSalespersonPopup, showAddressPopup, showContactPopup, showInvoiceAddressPopup, showInvoiceContactPopup]);

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

  // ── 出貨客戶連動同步 ──
  const syncShipCustomer = (c: typeof mockCustomers[number]) => {
    const addrs = mockCustomerAddressBook[c.code] ?? [];
    const primary = addrs.find(a => a.isPrimary) ?? addrs[0];
    setCustomerAddresses(addrs);
    setCustomerContacts(mockCustomerContactBook[c.code] ?? []);
    setInvoiceAddresses(addrs);
    setInvoiceContacts(mockCustomerContactBook[c.code] ?? []);
    setForm(prev => ({
      ...prev,
      shipCustomerCode: c.code,
      shipCustomerName: c.name,
      shipAddress:      primary ? formatAddress(primary) : c.address,
      shipRecipient:    c.recipient,
      shipMethod:       primary ? defaultShipMethodByRegion(primary.region) : '1001-郵寄一般',
      invoiceCustomerCode:  c.code,
      invoiceCustomerName:  c.name,
      invoiceAddress:       primary ? formatAddress(primary) : c.address,
      invoiceRecipient:     c.recipient,
      invoiceIssueMethod:   c.defaultInvoiceMethod,
      invoiceTitle:         c.name,
      taxIdNumber:          c.defaultTaxId,
      invoiceNotifyEmail:   c.defaultEmail,
      carrierType:          c.defaultCarrierType,
      paymentCustomerCode: c.code,
      paymentCustomerName: c.name,
      paymentAddress:      primary ? formatAddress(primary) : c.address,
      orderCustomerCode:   c.code,
      orderCustomerName:   c.name,
    }));
  };

  const openAddressPopup = () => {
    const addrs = mockCustomerAddressBook[form.shipCustomerCode] ?? customerAddresses;
    setCustomerAddresses(addrs);
    setShowNewAddressForm(false);
    setNewAddr(emptyNewAddress);
    setShowAddressPopup(true);
  };

  const openContactPopup = () => {
    const contacts = mockCustomerContactBook[form.shipCustomerCode] ?? customerContacts;
    setCustomerContacts(contacts);
    setShowNewContactForm(false);
    setNewContact(emptyNewContact);
    setShowContactPopup(true);
  };

  const openInvoiceContactPopup = () => {
    const contacts = mockCustomerContactBook[form.invoiceCustomerCode] ?? invoiceContacts;
    setInvoiceContacts(contacts);
    setShowNewInvoiceContactForm(false);
    setNewInvoiceContact(emptyNewContact);
    setShowInvoiceContactPopup(true);
  };

  const openInvoiceAddressPopup = () => {
    const addrs = mockCustomerAddressBook[form.invoiceCustomerCode] ?? invoiceAddresses;
    setInvoiceAddresses(addrs);
    setShowNewInvoiceAddressForm(false);
    setNewInvoiceAddr(emptyNewAddress);
    setShowInvoiceAddressPopup(true);
  };

  const handleShipCodeBlur = (val: string) => {
    if (!val) return;
    const customer = mockCustomers.find(c => c.code === val);
    if (!customer) {
      setToast({ type: 'error', message: '查無此客戶編號，請確認後重新輸入' });
      return;
    }
    syncShipCustomer(customer);
  };

  const handleShipNameBlur = (val: string) => {
    if (!val) return;
    const matches = mockCustomers.filter(c => c.name === val);
    if (matches.length === 0) {
      setToast({ type: 'error', message: '查無此客戶名稱，請確認後重新輸入' });
      return;
    }
    if (matches.length > 1) {
      setToast({ type: 'warning', message: '同名客戶過多，請點擊放大鏡重新查詢' });
      return;
    }
    syncShipCustomer(matches[0]);
  };

  const syncInvoiceCustomer = (c: typeof mockCustomers[number]) => {
    const addrs = mockCustomerAddressBook[c.code] ?? [];
    const primary = addrs.find(a => a.isPrimary) ?? addrs[0];
    setInvoiceAddresses(addrs);
    setInvoiceContacts(mockCustomerContactBook[c.code] ?? []);
    setField('invoiceCustomerCode', c.code);
    setField('invoiceCustomerName', c.name);
    setField('invoiceAddress', primary ? formatAddress(primary) : c.address);
    setField('invoiceRecipient', c.recipient);
    setField('invoiceIssueMethod', c.defaultInvoiceMethod);
    setField('invoiceTitle', c.name);
    setField('taxIdNumber', c.defaultTaxId);
    setField('invoiceNotifyEmail', c.defaultEmail);
    setField('carrierType', c.defaultCarrierType);
  };

  const handleInvoiceCodeBlur = (val: string) => {
    if (!val) return;
    const customer = mockCustomers.find(c => c.code === val);
    if (!customer) {
      setToast({ type: 'error', message: '查無此客戶編號，請確認後重新輸入' });
      return;
    }
    syncInvoiceCustomer(customer);
  };

  const handleInvoiceNameBlur = (val: string) => {
    if (!val) return;
    const matches = mockCustomers.filter(c => c.name === val);
    if (matches.length === 0) {
      setToast({ type: 'error', message: '查無此客戶名稱，請確認後重新輸入' });
      return;
    }
    if (matches.length > 1) {
      setToast({ type: 'warning', message: '同名客戶過多，請點擊放大鏡重新查詢' });
      return;
    }
    syncInvoiceCustomer(matches[0]);
  };

  const syncPaymentCustomer = (c: typeof mockCustomers[number]) => {
    const addrs = mockCustomerAddressBook[c.code] ?? [];
    const primary = addrs.find(a => a.isPrimary) ?? addrs[0];
    setField('paymentCustomerCode', c.code);
    setField('paymentCustomerName', c.name);
    setField('paymentAddress', primary ? formatAddress(primary) : c.address);
  };

  const handlePaymentCodeBlur = (val: string) => {
    if (!val) return;
    const customer = mockCustomers.find(c => c.code === val);
    if (!customer) { setToast({ type: 'error', message: '查無此客戶編號，請確認後重新輸入' }); return; }
    syncPaymentCustomer(customer);
  };

  const handlePaymentNameBlur = (val: string) => {
    if (!val) return;
    const matches = mockCustomers.filter(c => c.name === val);
    if (matches.length === 0) { setToast({ type: 'error', message: '查無此客戶名稱，請確認後重新輸入' }); return; }
    if (matches.length > 1) { setToast({ type: 'warning', message: '同名客戶過多，請點擊放大鏡重新查詢' }); return; }
    syncPaymentCustomer(matches[0]);
  };

  const syncOrderCustomer = (c: typeof mockCustomers[number]) => {
    setField('orderCustomerCode', c.code);
    setField('orderCustomerName', c.name);
  };

  const handleOrderCodeBlur = (val: string) => {
    if (!val) return;
    const customer = mockCustomers.find(c => c.code === val);
    if (!customer) { setToast({ type: 'error', message: '查無此客戶編號，請確認後重新輸入' }); return; }
    syncOrderCustomer(customer);
  };

  const handleOrderNameBlur = (val: string) => {
    if (!val) return;
    const matches = mockCustomers.filter(c => c.name === val);
    if (matches.length === 0) { setToast({ type: 'error', message: '查無此客戶名稱，請確認後重新輸入' }); return; }
    if (matches.length > 1) { setToast({ type: 'warning', message: '同名客戶過多，請點擊放大鏡重新查詢' }); return; }
    syncOrderCustomer(matches[0]);
  };

  // ── 選擇處理 ──
  const handleSelectCustomer = (code: string, name: string) => {
    if (!activeCustomerPopup) return;
    const customer = mockCustomers.find(c => c.code === code);
    if (activeCustomerPopup.codeKey === 'shipCustomerCode') {
      if (customer) syncShipCustomer(customer);
    } else if (activeCustomerPopup.codeKey === 'invoiceCustomerCode') {
      if (customer) syncInvoiceCustomer(customer);
    } else if (activeCustomerPopup.codeKey === 'paymentCustomerCode') {
      if (customer) syncPaymentCustomer(customer);
    } else if (activeCustomerPopup.codeKey === 'orderCustomerCode') {
      if (customer) syncOrderCustomer(customer);
    } else {
      setField(activeCustomerPopup.codeKey, code);
      setField(activeCustomerPopup.nameKey, name);
    }
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

  const filteredTrackingCodes = trackingCodeKeyword
    ? mockTrackingCodes.filter(
        (t) =>
          t.code.includes(trackingCodeKeyword) ||
          t.name.toLowerCase().includes(trackingCodeKeyword.toLowerCase())
      )
    : mockTrackingCodes;

  const handleSelectTrackingCode = (code: string) => {
    setField('trackingCode', code);
    setShowTrackingCodePopup(false);
    setTrackingCodeKeyword('');
  };

  const filteredEmployees = salespersonKeyword
    ? mockEmployees.filter(
        (e) =>
          e.code.includes(salespersonKeyword) ||
          e.name.toLowerCase().includes(salespersonKeyword.toLowerCase())
      )
    : mockEmployees;

  const handleSelectSalesperson = (code: string) => {
    setField('salesperson', code);
    setShowSalespersonPopup(false);
    setSalespersonKeyword('');
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
  const isTransfer = form.paymentMethod === '7'; // 互轉單
  const isFreeReading = form.freeReading === 'Y';
  const isPaused = form.pauseProcessing === 'Y';

  // 互轉單：輸入退訂單單號後，自動帶入相關欄位（mock，實際由 API 查詢）
  const handleCancelOrderLookup = (cancelOrderNo: string) => {
    if (!cancelOrderNo || !isTransfer) return;
    const cancelData = mockCancelOrders[cancelOrderNo] ?? { hasInvoice: false };
    setOriginalOrderHasInvoice(cancelData.hasInvoice);
    setField('sourceSystem',          'IC');
    setField('sourceNumber',          `SRC-${cancelOrderNo}`);
    setField('invoiceCustomerCode',   '1679128');
    setField('invoiceCustomerName',   'JEFF');
    setField('invoiceTitle',          'JEFF');
    setField('invoiceRecipient',      'JEFF');
    setField('invoiceAddress',        '台北市大同區民權西路103號');
    setField('paymentCustomerCode',   '1679128');
    setField('paymentCustomerName',   'JEFF');
    setField('paymentAddress',        '台北市大同區民權西路103號');
    setField('orderCustomerCode',     '1679128');
    setField('orderCustomerName',     'JEFF');
    // 原訂單已開立發票時，強制「不產生」
    if (cancelData.hasInvoice) setField('invoiceIssueMethod', '0');
  };

  // 訂單金額為 0 時自動設贈閱為「是」且付款方式強制為「贈閱」
  useEffect(() => {
    if (editable && form.orderAmount === '0') {
      setField('freeReading', 'Y');
      setField('paymentMethod', '6');
    }
  }, [form.orderAmount, editable]);

  // 互轉 + 原訂單已開立發票 → 強制「不產生」
  useEffect(() => {
    if (editable && isTransfer && originalOrderHasInvoice) {
      setField('invoiceIssueMethod', '0');
    }
  }, [isTransfer, originalOrderHasInvoice, editable]);

  // 填入捐贈碼 → 清空載具類型/碼
  useEffect(() => {
    if (editable && form.invoiceDonation) {
      setForm(prev => ({ ...prev, carrierType: '', carrierCode: '' }));
    }
  }, [form.invoiceDonation, editable]);

  // 付款方式選「贈閱」→ 自動設贈閱欄位為「是」
  useEffect(() => {
    if (editable && form.paymentMethod === '6') {
      setField('freeReading', 'Y');
    }
  }, [form.paymentMethod, editable]);

  // ── 驗證 ──
  const ERR = '此欄位為必填';
  useImperativeHandle(ref, () => ({
    validate(): boolean {
      const e: Partial<Record<keyof OMGOrderHeaderData, string>> = {};
      if (!form.sourceSystem) e.sourceSystem = ERR;
      if (!form.directIndirectCollect) e.directIndirectCollect = ERR;
      if (!form.memberAccount) e.memberAccount = ERR;
      if (!form.agreeMarketing) e.agreeMarketing = ERR;
      if (!form.agreeMarketingDate) e.agreeMarketingDate = ERR;
      if (!form.orderDate) e.orderDate = ERR;
      if (!form.omgOrderType) e.omgOrderType = ERR;
      if (!form.channelCode) e.channelCode = ERR;
      if (!form.shipCustomerCode) e.shipCustomerCode = ERR;
      if (!form.shipMethod) e.shipMethod = ERR;
      if (form.postage === '' || form.postage === undefined) e.postage = ERR;
      if (!form.deliveryNote) e.deliveryNote = ERR;
      if (!form.invoiceCustomerCode) e.invoiceCustomerCode = ERR;
      if (!form.invoiceAddress) e.invoiceAddress = ERR;
      if (!form.invoiceTitle) e.invoiceTitle = ERR;
      if (!form.invoiceIssueMethod) e.invoiceIssueMethod = ERR;
      if (isTransfer && originalOrderHasInvoice && form.invoiceIssueMethod !== '0') e.invoiceIssueMethod = '互轉且原訂單已開立發票，必須選擇「不產生」';
      if (!form.paymentCustomerCode) e.paymentCustomerCode = ERR;
      if (!form.paymentAddress) e.paymentAddress = ERR;
      if (!form.orderCustomerCode) e.orderCustomerCode = ERR;
      if (!form.paymentMethod) e.paymentMethod = ERR;
      if (form.orderAmount === '0' && form.paymentMethod !== '6') e.paymentMethod = '訂單金額為 0 時，付款方式必須選「贈閱」';
      if (!form.legalEntity) e.legalEntity = ERR;
      if (isElectronicInvoice) {
        if (!form.carrierType) e.carrierType = ERR;
        if (!form.carrierCode) {
          e.carrierCode = ERR;
        } else if (form.carrierType === '手機條碼' && !/^\/[A-Z0-9+\-.]{7}$/.test(form.carrierCode)) {
          e.carrierCode = '格式錯誤：/ 開頭共8碼（英數 + / - .）';
        } else if (form.carrierType === '自然人憑證' && !/^[A-Z]{2}[0-9]{14}$/.test(form.carrierCode)) {
          e.carrierCode = '格式錯誤：2碼英文 + 14碼數字（共16碼）';
        }
      }
      if (isRemittance) {
        if (!form.remittanceNumber) e.remittanceNumber = ERR;
        if (!form.remittanceDate) e.remittanceDate = ERR;
      }
      if (isCreditCard) {
        if (!form.creditCardType) e.creditCardType = ERR;
        if (!form.creditCardNumber) e.creditCardNumber = ERR;
        if (!form.creditCardExpiry) {
          e.creditCardExpiry = ERR;
        } else if (!/^\d{2}\/\d{2}$/.test(form.creditCardExpiry)) {
          e.creditCardExpiry = '格式錯誤，應為 YY/MM';
        }
        if (!form.authReplyCode) e.authReplyCode = ERR;
      }
      if (isTransfer && !form.advancePaymentNumber) e.advancePaymentNumber = ERR;
      if (form.paymentMethod === '6') {
        if (!form.freeReading) e.freeReading = ERR;
        if (!form.freeReadingReason) e.freeReadingReason = ERR;
        if (!form.freeReadingDepartment) e.freeReadingDepartment = ERR;
      }
      if (!form.pauseProcessing) e.pauseProcessing = ERR;
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

  const TextField = ({ label, fKey, required, readOnlyInEdit }: { label: string; fKey: keyof OMGOrderHeaderData; required?: boolean; readOnlyInEdit?: boolean }) => {
    const isReadOnly = !editable || (mode === 'edit' && !!readOnlyInEdit);
    if (required && editable && !isReadOnly) {
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
        disabled={isReadOnly}
        readOnly={isReadOnly}
        onChange={(e) => setField(fKey, e.target.value)}
      />
    );
  };

  const SelectField = ({
    label, fKey, options, placeholder, required, searchable, readOnlyInEdit,
  }: {
    label: string;
    fKey: keyof OMGOrderHeaderData;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
    searchable?: boolean;
    readOnlyInEdit?: boolean;
  }) => {
    const val = form[fKey] as string;
    const isReadOnly = !editable || (mode === 'edit' && !!readOnlyInEdit);
    if (isReadOnly) {
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
          searchable={searchable}
          error={!!errors[fKey]}
          onChange={(v) => setField(fKey, Array.isArray(v) ? v[0] ?? '' : v)}
        />
        <ErrorText fKey={fKey} />
      </div>
    );
  };

  const DateField = ({ label, fKey, required, readOnlyInEdit }: { label: string; fKey: keyof OMGOrderHeaderData; required?: boolean; readOnlyInEdit?: boolean }) => {
    const isReadOnly = !editable || (mode === 'edit' && !!readOnlyInEdit);
    if (isReadOnly) return <CwInput label={label} value={form[fKey] as string} disabled readOnly />;
    const dateVal = form[fKey] as string;
    const valueDate = dateVal ? new Date(dateVal + 'T00:00:00') : null;
    return (
      <div className="flex flex-col gap-1">
        {required ? <RequiredLabel text={label} /> : <label className="block text-foreground" style={labelStyle}>{label}</label>}
        <CwDatePicker value={valueDate} onChange={(d) => setField(fKey, d ? d.toISOString().slice(0, 10) : '')} />
        <ErrorText fKey={fKey} />
      </div>
    );
  };

  // PopupSearchInput 在 create 模式下作為帶搜尋按鈕的輸入；view 模式退化為唯讀欄位
  const PopupField = ({
    label, fKey, onOpen, onBlur, required, readOnlyInEdit,
  }: {
    label: string;
    fKey: keyof OMGOrderHeaderData;
    onOpen: () => void;
    onBlur?: (v: string) => void;
    required?: boolean;
    readOnlyInEdit?: boolean;
  }) => {
    const isReadOnly = !editable || (mode === 'edit' && !!readOnlyInEdit);
    if (isReadOnly) return <CwInput label={label} value={form[fKey] as string} disabled readOnly />;
    return (
      <div className="flex flex-col gap-1">
        {required ? <RequiredLabel text={label} /> : <label className="block text-foreground" style={labelStyle}>{label}</label>}
        <PopupSearchInput
          label=""
          value={form[fKey] as string}
          onChange={(v) => setField(fKey, v)}
          onOpen={onOpen}
          onClear={() => setField(fKey, '')}
          onBlur={onBlur}
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
        {titleLeft ?? (
          <h3 className="text-[#1c1c1c]" style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '16px', fontWeight: 500 }}>
            訂單表頭
          </h3>
        )}
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
                <SelectField label="來源系統" fKey="sourceSystem" options={SOURCE_SYSTEM_OPTIONS} required searchable />
                <DateField label="客戶給單日" fKey="customerGiveDate" />
                <ReadField label="訂單編號" fKey="orderNumber" />
                <ReadField label="會員帳號" fKey="memberAccount" required />
                {/* 退訂單單號：互轉單（paymentMethod=7）時才可輸入 */}
                {!editable ? (
                  <CwInput label="退訂單單號" value={form.cancelOrderNumber} disabled readOnly />
                ) : (
                  <CwInput
                    label="退訂單單號"
                    value={form.cancelOrderNumber}
                    disabled={!isTransfer}
                    placeholder={isTransfer ? '請輸入退訂單單號' : ''}
                    onChange={(e) => setField('cancelOrderNumber', e.target.value)}
                    onBlur={(e) => handleCancelOrderLookup(e.target.value)}
                  />
                )}
                <TextField label="流程單號" fKey="processNumber" />
                <TextField label="來源單號" fKey="sourceNumber" />
                <SelectField
                  label="直/間接蒐集"
                  fKey="directIndirectCollect" required readOnlyInEdit
                  options={[
                    { value: '1', label: '1 直接' },
                    { value: '2', label: '2 間接' },
                  ]}
                />
                <div className="flex flex-col gap-1">
                  <label className="block text-foreground" style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 350 }}>同意行銷<span style={{ color: '#E53E3E' }}> *</span></label>
                  <div className="flex gap-[8px]">
                    <div className="flex-1 min-w-0">
                      {editable && mode !== 'edit' ? (
                        <CwSelect
                          value={form.agreeMarketing}
                          options={[
                            { value: '1', label: '1 同意' },
                            { value: '2', label: '2 不同意' },
                          ]}
                          placeholder="請選擇"
                          error={!!errors.agreeMarketing}
                          onChange={(v) => setField('agreeMarketing', Array.isArray(v) ? v[0] ?? '' : v)}
                        />
                      ) : (
                        <CwInput value={(() => { const o = [{ value: '1', label: '1 同意' }, { value: '2', label: '2 不同意' }].find(o => o.value === form.agreeMarketing); return o?.label ?? form.agreeMarketing; })()} disabled readOnly />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {editable && mode !== 'edit' ? (
                        <CwDatePicker
                          value={form.agreeMarketingDate ? new Date(form.agreeMarketingDate + 'T00:00:00') : null}
                          onChange={(d) => setField('agreeMarketingDate', d ? [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-') : '')}
                        />
                      ) : (
                        <CwInput value={form.agreeMarketingDate || '—'} disabled readOnly />
                      )}
                      {errors.agreeMarketingDate && <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E' }}>{errors.agreeMarketingDate}</p>}
                    </div>
                  </div>
                  {errors.agreeMarketing && <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E' }}>{errors.agreeMarketing}</p>}
                </div>
                <DateField label="訂單日期" fKey="orderDate" required readOnlyInEdit />
                <SelectField label="OMG 訂單類型" fKey="omgOrderType" options={OMG_ORDER_TYPE_OPTIONS} required readOnlyInEdit />
                <SelectField label="通路代碼" fKey="channelCode" options={CHANNEL_CODE_OPTIONS} required searchable readOnlyInEdit />
                <PopupField label="行銷追蹤碼" fKey="trackingCode" onOpen={() => { setShowTrackingCodePopup(true); setTrackingCodeKeyword(''); }} readOnlyInEdit />
                <PopupField label="業務員名" fKey="salesperson" onOpen={() => { setShowSalespersonPopup(true); setSalespersonKeyword(''); }} />
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
                  onOpen={() => openCustomerPopup('shipCustomerCode', 'shipCustomerName', '出貨客戶')}
                  onBlur={handleShipCodeBlur}
                  required readOnlyInEdit
                />
                <PopupField
                  label="出貨客戶名稱"
                  fKey="shipCustomerName"
                  onOpen={() => openCustomerPopup('shipCustomerCode', 'shipCustomerName', '出貨客戶')}
                  onBlur={handleShipNameBlur}
                  readOnlyInEdit
                />
                <PopupField
                  label="出貨收件人"
                  fKey="shipRecipient"
                  onOpen={openContactPopup}
                  readOnlyInEdit
                />
                <div className="col-span-2">
                  <PopupField label="出貨地址" fKey="shipAddress" onOpen={openAddressPopup} required readOnlyInEdit />
                </div>
                <TextField label="運費" fKey="postage" required readOnlyInEdit />
                {/* 出貨方式：Popup 搜尋 */}
                <PopupField
                  label="出貨方式"
                  fKey="shipMethod"
                  onOpen={() => { setShowShippingPopup(true); setShippingKeyword(''); }}
                  required readOnlyInEdit
                />
                <TextField label="特殊包裝指示" fKey="specialPackageInstruction" readOnlyInEdit />
                <SelectField
                  label="出催款單"
                  fKey="deliveryNote"
                  options={[
                    { value: 'N', label: '否' },
                    { value: 'Y', label: '是' },
                  ]}
                  required
                />
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="block text-foreground" style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 350 }}>超商店鋪</label>
                  <div className="flex gap-[12px]">
                    <CwInput
                      placeholder="店名"
                      value={form.convenienceStoreName}
                      disabled={!editable}
                      readOnly={!editable}
                      onChange={(e) => setField('convenienceStoreName', e.target.value)}
                    />
                    <CwInput
                      placeholder="地址"
                      value={form.convenienceStoreAddress}
                      disabled={!editable}
                      readOnly={!editable}
                      onChange={(e) => setField('convenienceStoreAddress', e.target.value)}
                    />
                  </div>
                </div>
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
                  onBlur={handleInvoiceCodeBlur}
                  required readOnlyInEdit
                />
                <PopupField
                  label="發票客戶名稱"
                  fKey="invoiceCustomerName"
                  onOpen={() => openCustomerPopup('invoiceCustomerCode', 'invoiceCustomerName', '發票客戶')}
                  onBlur={handleInvoiceNameBlur}
                  readOnlyInEdit
                />
                <PopupField label="發票收件人" fKey="invoiceRecipient" onOpen={openInvoiceContactPopup} />
                <div className="col-span-2">
                  <PopupField label="發票地址" fKey="invoiceAddress" onOpen={openInvoiceAddressPopup} required readOnlyInEdit />
                </div>
                <SelectField
                  label="發票開立方式"
                  fKey="invoiceIssueMethod" required readOnlyInEdit
                  options={
                    isTransfer && originalOrderHasInvoice
                      ? [{ value: '0', label: '0：不產生' }]
                      : [
                          { value: 'N', label: 'N：一般開立' },
                          { value: '0', label: '0：不產生' },
                          { value: '3', label: '3：隨貨產生' },
                          { value: '4', label: '4：月結淨額' },
                          { value: '5', label: '5：月結全額' },
                          { value: '6', label: '6：電子發票' },
                        ]
                  }
                />
                <TextField label="發票開立說明" fKey="invoiceIssueDescription" readOnlyInEdit />
                <TextField label="發票抬頭" fKey="invoiceTitle" required readOnlyInEdit />
                <TextField label="統一編號" fKey="taxIdNumber" readOnlyInEdit />
                <TextField label="發票通知 Email" fKey="invoiceNotifyEmail" readOnlyInEdit />
                <TextField label="發票捐贈碼" fKey="invoiceDonation" readOnlyInEdit />
                {/* 載具類型：create 模式加 tooltip；edit/view 模式純文字（readOnlyInEdit） */}
                {editable && mode !== 'edit' ? (
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 400 }}>載具類型{isElectronicInvoice && <span style={{ color: '#E53E3E' }}> *</span>}</span>
                      <CwTooltip content="只有發票類型為電子發票時可選取；統編有值亦無法選取">
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
                      disabled={!isElectronicInvoice}
                      error={!!errors.carrierType}
                      onChange={(v) => {
                        const val = Array.isArray(v) ? v[0] ?? '' : v;
                        setField('carrierType', val);
                        if (val) setField('invoiceDonation', '');
                        // 會員載具自動帶入客編；其他類型清空
                        setField('carrierCode', val === '會員載具' ? form.invoiceCustomerCode : '');
                      }}
                    />
                    {errors.carrierType && <p className="text-[12px] mt-[2px]" style={{ color: '#E53E3E' }}>{errors.carrierType}</p>}
                  </div>
                ) : (
                  <CwInput label="載具類型" value={form.carrierType} disabled readOnly />
                )}
                {/* 發票載具碼：會員載具唯讀自動帶入；手機條碼/自然人憑證可自行輸入；非電子發票禁用 */}
                {isElectronicInvoice && mode === 'create' && form.carrierType !== '會員載具' ? (
                  <div className="flex flex-col gap-1">
                    <RequiredLabel text="發票載具碼" />
                    <CwInput
                      value={form.carrierCode}
                      error={errors.carrierCode}
                      placeholder={form.carrierType === '手機條碼' ? '/XXXXXXX（8碼英數）' : form.carrierType === '自然人憑證' ? 'AA + 14碼數字' : ''}
                      onChange={(e) => setField('carrierCode', e.target.value)}
                    />
                  </div>
                ) : (
                  <CwInput
                    label="發票載具碼"
                    value={form.carrierCode}
                    error={errors.carrierCode}
                    disabled
                    readOnly
                  />
                )}
                <DateField label="發票日期" fKey="invoiceDate" readOnlyInEdit />
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
                  onBlur={handlePaymentCodeBlur}
                  required readOnlyInEdit
                />
                <PopupField
                  label="付款客戶名稱"
                  fKey="paymentCustomerName"
                  onOpen={() => openCustomerPopup('paymentCustomerCode', 'paymentCustomerName', '付款客戶')}
                  onBlur={handlePaymentNameBlur}
                  required readOnlyInEdit
                />
                <div className="col-span-2">
                  <TextField label="付款寄送地址" fKey="paymentAddress" required readOnlyInEdit />
                </div>
                <PopupField
                  label="訂單客戶編號"
                  fKey="orderCustomerCode"
                  onOpen={() => openCustomerPopup('orderCustomerCode', 'orderCustomerName', '訂單客戶')}
                  onBlur={handleOrderCodeBlur}
                  required readOnlyInEdit
                />
                <PopupField
                  label="訂單客戶名稱"
                  fKey="orderCustomerName"
                  onOpen={() => openCustomerPopup('orderCustomerCode', 'orderCustomerName', '訂單客戶')}
                  onBlur={handleOrderNameBlur}
                  required readOnlyInEdit
                />
                <ReadField label="信用卡號後 4 碼" fKey="creditCardLast4" />
                <SelectField
                  label="付款方式"
                  fKey="paymentMethod"
                  required readOnlyInEdit
                  options={[
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
                  ]}
                />
                <TextField label="劃撥單號" fKey="remittanceNumber" required={isRemittance} readOnlyInEdit />
                <DateField label="劃撥日期" fKey="remittanceDate" required={isRemittance} readOnlyInEdit />
                <SelectField
                  label="信用卡類型"
                  fKey="creditCardType"
                  required={isCreditCard}
                  readOnlyInEdit
                  options={[
                    { value: 'AMEX',      label: 'American Express' },
                    { value: 'DINERS',    label: "Diner's Club" },
                    { value: 'DISCOVER',  label: 'Discover' },
                    { value: 'JCB',       label: 'JCB' },
                    { value: 'MC',        label: 'Master Card' },
                    { value: 'OTHERS',    label: 'Others' },
                    { value: 'UN',        label: '聯合信用卡' },
                    { value: 'VISA',      label: 'Visa' },
                  ]}
                />
                <TextField label="信用卡卡號" fKey="creditCardNumber" required={isCreditCard} readOnlyInEdit />
                <TextField label="信用卡有效期" fKey="creditCardExpiry" required={isCreditCard} readOnlyInEdit />
                <TextField label="信用卡持有者" fKey="creditCardHolder" readOnlyInEdit />
                <TextField label="授權回覆碼" fKey="authReplyCode" required={isCreditCard} readOnlyInEdit />
                <TextField label="預收款單號" fKey="advancePaymentNumber" required={isTransfer} readOnlyInEdit />
                <ReadField label="訂單金額" fKey="orderAmount" />
                <SelectField
                  label="付款條件"
                  fKey="paymentCondition"
                  readOnlyInEdit
                  options={[
                    { value: '即期付款',    label: '即期付款' },
                    { value: '廣-月結45天', label: '廣-月結45天' },
                    { value: '廣-月結60天', label: '廣-月結60天' },
                    { value: '廣告交換',    label: '廣告交換' },
                    { value: '月結-大和',   label: '月結-大和' },
                    { value: '月結-宇泰',   label: '月結-宇泰' },
                    { value: '月結120天',   label: '月結120天' },
                    { value: '月結30天',    label: '月結30天' },
                    { value: '月結45天',    label: '月結45天' },
                    { value: '月結60天',    label: '月結60天' },
                    { value: '月結90天',    label: '月結90天' },
                    { value: '廣-月結90天', label: '廣-月結90天' },
                    { value: '廣-月結120',  label: '廣-月結120' },
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
                {/* 贈閱：付款方式為「贈閱」時顯示，系統帶入不可修改 */}
                {form.paymentMethod === '6' && (
                  <div className="flex flex-col gap-1">
                    <RequiredLabel text="贈閱" />
                    <CwInput value={form.freeReading === 'Y' ? '是' : '否'} error={errors.freeReading} disabled readOnly />
                  </div>
                )}
                {form.paymentMethod === '6' && (
                  <SelectField label="贈閱原因" fKey="freeReadingReason" options={FREE_READING_REASON_OPTIONS} required={isFreeReading} readOnlyInEdit />
                )}
                {form.paymentMethod === '6' && (
                  <SelectField label="贈閱部門" fKey="freeReadingDepartment" options={FREE_READING_DEPARTMENT_OPTIONS} required={isFreeReading} readOnlyInEdit searchable />
                )}
                {form.paymentMethod === '6' && (
                  <TextField label="標籤備註" fKey="tagNote" readOnlyInEdit />
                )}
                <SelectField
                  label="暫停處理"
                  fKey="pauseProcessing"
                  required readOnlyInEdit
                  options={[
                    { value: 'N', label: '否' },
                    { value: 'Y', label: '是' },
                  ]}
                />
                <SelectField
                  label="暫停原因"
                  fKey="pauseReason"
                  required={isPaused}
                  readOnlyInEdit
                  options={[
                    { value: '代單',       label: '代單' },
                    { value: '待確認訂單資料', label: '待確認訂單資料' },
                  ]}
                />
                <ReadField label="核單日期" fKey="approvalDate" />
                <ReadField label="OMG 訂單狀態" fKey="omgOrderStatus" />
                <TextField label="OMG 訂單備註" fKey="omgOrderNote" />
                {mode === 'create' ? (
                  <div className="flex flex-col gap-1">
                    <RequiredLabel text="法人" />
                    <CwSelect
                      value={form.legalEntity}
                      options={BU_OPTIONS}
                      placeholder="請選擇"
                      error={!!errors.legalEntity}
                      onChange={(v) => setField('legalEntity', Array.isArray(v) ? v[0] ?? '' : v)}
                    />
                    <ErrorText fKey="legalEntity" />
                  </div>
                ) : (
                  <CwInput
                    label="法人"
                    value={BU_OPTIONS.find(o => o.value === form.legalEntity)?.label ?? form.legalEntity}
                    disabled
                    readOnly
                  />
                )}
                <TextField label="虛擬聯絡電話" fKey="virtualContactPhone" readOnlyInEdit />
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

      {showSalespersonPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowSalespersonPopup(false); setSalespersonKeyword(''); }}>
          <div ref={salespersonPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇業務員</h3>
              <button onClick={() => { setShowSalespersonPopup(false); setSalespersonKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋員工編號或姓名" value={salespersonKeyword} onChange={(e) => setSalespersonKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">員工編號</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">姓名</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? filteredEmployees.map((e) => (
                    <tr key={e.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{e.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{e.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectSalesperson(e.code)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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

      {/* ── 出貨地址 Popup ── */}
      {showAddressPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowAddressPopup(false); setShowNewAddressForm(false); setNewAddr(emptyNewAddress); }}>
          <div ref={addressPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[640px] max-h-[680px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇地址</h3>
              <button onClick={() => { setShowAddressPopup(false); setShowNewAddressForm(false); setNewAddr(emptyNewAddress); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            {/* 新增地址 button */}
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              {!showNewAddressForm && (
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                >
                  ＋ 新增地址
                </button>
              )}
            </div>
            {/* 新增地址表單 */}
            {showNewAddressForm && (
              <div className="px-[20px] py-[16px] border-b border-[#e5e7eb] bg-[#f9fafb] space-y-[12px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">地區</label>
                    <select value={newAddr.region} onChange={(e) => { const r = e.target.value as '國內' | '海外'; setNewAddr(p => ({ ...p, region: r, country: r === '國內' ? 'TW' : p.country, state: '', province: '' })); }} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                      <option value="國內">國內</option>
                      <option value="海外">海外</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">國家</label>
                    <select value={newAddr.country} onChange={(e) => setNewAddr(p => ({ ...p, country: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                      {mockCountryOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  {newAddr.region === '國內' ? (
                    <>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">郵遞區號</label>
                        <select value={newAddr.zipCode} onChange={(e) => { const found = mockTaiwanPostalCodes.find(p => p.zipCode === e.target.value); setNewAddr(p => ({ ...p, zipCode: e.target.value, city: found?.city ?? '', district: found?.district ?? '' })); }} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                          <option value="">請選擇</option>
                          {mockTaiwanPostalCodes.map(p => <option key={p.zipCode} value={p.zipCode}>{p.zipCode} {p.city}{p.district}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">城市／區</label>
                        <select value={newAddr.zipCode} onChange={(e) => { const found = mockTaiwanPostalCodes.find(p => p.zipCode === e.target.value); setNewAddr(p => ({ ...p, zipCode: e.target.value, city: found?.city ?? '', district: found?.district ?? '' })); }} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                          <option value="">請選擇</option>
                          {mockTaiwanPostalCodes.map(p => <option key={p.zipCode} value={p.zipCode}>{p.city}{p.district}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">州</label>
                        <input value="" disabled className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-[#e9ebf2] text-[#7c808c] cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">省</label>
                        <input value="" disabled className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-[#e9ebf2] text-[#7c808c] cursor-not-allowed" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">郵遞區號</label>
                        <input value={newAddr.zipCode} onChange={(e) => setNewAddr(p => ({ ...p, zipCode: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">城市／區</label>
                        <input value={newAddr.city} onChange={(e) => setNewAddr(p => ({ ...p, city: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">州</label>
                        <input value={newAddr.state} onChange={(e) => setNewAddr(p => ({ ...p, state: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">省</label>
                        <input value={newAddr.province} onChange={(e) => setNewAddr(p => ({ ...p, province: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">地址</label>
                  <input value={newAddr.address} onChange={(e) => setNewAddr(p => ({ ...p, address: e.target.value }))} placeholder="請輸入詳細地址" className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] w-full" />
                </div>
                <div className="flex justify-end gap-[8px]">
                  <button onClick={() => { setShowNewAddressForm(false); setNewAddr(emptyNewAddress); }} className="px-[14px] py-[7px] border border-[#c4c9d3] text-[#7c808c] text-[14px] rounded-[4px] hover:bg-[#f5f7fa] font-['Noto_Sans_TC',_sans-serif]">取消</button>
                  <button
                    onClick={() => {
                      if (!newAddr.address) return;
                      const newEntry: CustomerAddress = { ...newAddr, id: Date.now(), isPrimary: false };
                      const updated = [...customerAddresses, newEntry];
                      setCustomerAddresses(updated);
                      mockCustomerAddressBook[form.shipCustomerCode] = updated;
                      setField('shipAddress', formatAddress(newEntry));
                      setField('shipMethod', defaultShipMethodByRegion(newEntry.region));
                      setShowAddressPopup(false);
                      setShowNewAddressForm(false);
                      setNewAddr(emptyNewAddress);
                    }}
                    className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                  >
                    確定新增
                  </button>
                </div>
              </div>
            )}
            {/* 地址清單 */}
            <div className="flex-1 overflow-y-auto">
              {customerAddresses.length === 0 ? (
                <p className="px-[20px] py-[32px] text-center text-[14px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">此客戶尚無儲存地址</p>
              ) : customerAddresses.map((a) => (
                <div key={a.id} className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                  <div className="flex items-center gap-[8px] flex-1">
                    {a.isPrimary && <span className="px-[6px] py-[2px] bg-[#e6f7ff] text-[#0078d4] text-[12px] font-[500] rounded-[4px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]">主要</span>}
                    <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>{formatAddress(a)}</span>
                  </div>
                  <button onClick={() => { setField('shipAddress', formatAddress(a)); setField('shipMethod', defaultShipMethodByRegion(a.region)); setShowAddressPopup(false); setShowNewAddressForm(false); }} className="ml-[16px] px-[12px] py-[6px] bg-[#0078d4] text-white text-[14px] rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors whitespace-nowrap">選擇</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 發票地址 Popup ── */}
      {showInvoiceAddressPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowInvoiceAddressPopup(false); setShowNewInvoiceAddressForm(false); setNewInvoiceAddr(emptyNewAddress); }}>
          <div ref={invoiceAddressPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[640px] max-h-[680px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇發票地址</h3>
              <button onClick={() => { setShowInvoiceAddressPopup(false); setShowNewInvoiceAddressForm(false); setNewInvoiceAddr(emptyNewAddress); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              {!showNewInvoiceAddressForm && (
                <button onClick={() => setShowNewInvoiceAddressForm(true)} className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]">
                  ＋ 新增地址
                </button>
              )}
            </div>
            {showNewInvoiceAddressForm && (
              <div className="px-[20px] py-[16px] border-b border-[#e5e7eb] bg-[#f9fafb] space-y-[12px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">地區</label>
                    <select value={newInvoiceAddr.region} onChange={(e) => { const r = e.target.value as '國內' | '海外'; setNewInvoiceAddr(p => ({ ...p, region: r, country: r === '國內' ? 'TW' : p.country, state: '', province: '' })); }} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                      <option value="國內">國內</option>
                      <option value="海外">海外</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">國家</label>
                    <select value={newInvoiceAddr.country} onChange={(e) => setNewInvoiceAddr(p => ({ ...p, country: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                      {mockCountryOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  {newInvoiceAddr.region === '國內' ? (
                    <>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">郵遞區號</label>
                        <select value={newInvoiceAddr.zipCode} onChange={(e) => { const found = mockTaiwanPostalCodes.find(p => p.zipCode === e.target.value); setNewInvoiceAddr(p => ({ ...p, zipCode: e.target.value, city: found?.city ?? '', district: found?.district ?? '' })); }} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                          <option value="">請選擇</option>
                          {mockTaiwanPostalCodes.map(p => <option key={p.zipCode} value={p.zipCode}>{p.zipCode} {p.city}{p.district}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">城市／區</label>
                        <select value={newInvoiceAddr.zipCode} onChange={(e) => { const found = mockTaiwanPostalCodes.find(p => p.zipCode === e.target.value); setNewInvoiceAddr(p => ({ ...p, zipCode: e.target.value, city: found?.city ?? '', district: found?.district ?? '' })); }} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-white">
                          <option value="">請選擇</option>
                          {mockTaiwanPostalCodes.map(p => <option key={p.zipCode} value={p.zipCode}>{p.city}{p.district}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">州</label>
                        <input value="" disabled className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-[#e9ebf2] text-[#7c808c] cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">省</label>
                        <input value="" disabled className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] bg-[#e9ebf2] text-[#7c808c] cursor-not-allowed" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">郵遞區號</label>
                        <input value={newInvoiceAddr.zipCode} onChange={(e) => setNewInvoiceAddr(p => ({ ...p, zipCode: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">城市／區</label>
                        <input value={newInvoiceAddr.city} onChange={(e) => setNewInvoiceAddr(p => ({ ...p, city: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">州</label>
                        <input value={newInvoiceAddr.state} onChange={(e) => setNewInvoiceAddr(p => ({ ...p, state: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">省</label>
                        <input value={newInvoiceAddr.province} onChange={(e) => setNewInvoiceAddr(p => ({ ...p, province: e.target.value }))} className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px]" />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-[4px]">
                  <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">地址</label>
                  <input value={newInvoiceAddr.address} onChange={(e) => setNewInvoiceAddr(p => ({ ...p, address: e.target.value }))} placeholder="請輸入詳細地址" className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] w-full" />
                </div>
                <div className="flex justify-end gap-[8px]">
                  <button onClick={() => { setShowNewInvoiceAddressForm(false); setNewInvoiceAddr(emptyNewAddress); }} className="px-[14px] py-[7px] border border-[#c4c9d3] text-[#7c808c] text-[14px] rounded-[4px] hover:bg-[#f5f7fa] font-['Noto_Sans_TC',_sans-serif]">取消</button>
                  <button
                    onClick={() => {
                      if (!newInvoiceAddr.address) return;
                      const newEntry: CustomerAddress = { ...newInvoiceAddr, id: Date.now(), isPrimary: false };
                      const updated = [...invoiceAddresses, newEntry];
                      setInvoiceAddresses(updated);
                      mockCustomerAddressBook[form.invoiceCustomerCode] = updated;
                      setField('invoiceAddress', formatAddress(newEntry));
                      setShowInvoiceAddressPopup(false);
                      setShowNewInvoiceAddressForm(false);
                      setNewInvoiceAddr(emptyNewAddress);
                    }}
                    className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                  >
                    新增地址
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              {invoiceAddresses.length === 0 ? (
                <p className="px-[20px] py-[32px] text-center text-[14px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">此客戶尚無儲存地址</p>
              ) : invoiceAddresses.map((a) => (
                <div key={a.id} className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                  <div className="flex items-center gap-[8px] flex-1">
                    {a.isPrimary && <span className="px-[6px] py-[2px] bg-[#e6f7ff] text-[#0078d4] text-[12px] font-[500] rounded-[4px] whitespace-nowrap font-['Noto_Sans_TC',_sans-serif]">主要</span>}
                    <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>{formatAddress(a)}</span>
                  </div>
                  <button onClick={() => { setField('invoiceAddress', formatAddress(a)); setShowInvoiceAddressPopup(false); setShowNewInvoiceAddressForm(false); }} className="ml-[16px] px-[12px] py-[6px] bg-[#0078d4] text-white text-[14px] rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors whitespace-nowrap">選擇</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 出貨收件人 Popup ── */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowContactPopup(false); setShowNewContactForm(false); setNewContact(emptyNewContact); }}>
          <div ref={contactPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[560px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇收件人</h3>
              <button onClick={() => { setShowContactPopup(false); setShowNewContactForm(false); setNewContact(emptyNewContact); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            {/* 新增收件人 button */}
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              {!showNewContactForm && (
                <button
                  onClick={() => setShowNewContactForm(true)}
                  className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                >
                  ＋ 新增收件人
                </button>
              )}
            </div>
            {/* 新增收件人表單 */}
            {showNewContactForm && (
              <div className="px-[20px] py-[16px] border-b border-[#e5e7eb] bg-[#f9fafb] space-y-[12px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">姓名 <span className="text-[#d92d20]">*</span></label>
                    <input
                      value={newContact.name}
                      onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))}
                      placeholder="請輸入姓名"
                      className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] font-['Noto_Sans_TC',_sans-serif]"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">電話</label>
                    <input
                      value={newContact.phone}
                      onChange={(e) => setNewContact(p => ({ ...p, phone: e.target.value }))}
                      placeholder="請輸入電話"
                      className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] font-['Noto_Sans_TC',_sans-serif]"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-[8px]">
                  <button onClick={() => { setShowNewContactForm(false); setNewContact(emptyNewContact); }} className="px-[14px] py-[7px] border border-[#c4c9d3] text-[#7c808c] text-[14px] rounded-[4px] hover:bg-[#f5f7fa] font-['Noto_Sans_TC',_sans-serif]">取消</button>
                  <button
                    onClick={() => {
                      if (!newContact.name) return;
                      const newEntry: CustomerContact = { ...newContact, id: Date.now() };
                      const updated = [...customerContacts, newEntry];
                      setCustomerContacts(updated);
                      mockCustomerContactBook[form.shipCustomerCode] = updated;
                      setField('shipRecipient', newEntry.name);
                      setShowContactPopup(false);
                      setShowNewContactForm(false);
                      setNewContact(emptyNewContact);
                    }}
                    className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                  >
                    新增收件人
                  </button>
                </div>
              </div>
            )}
            {/* 聯絡人清單 */}
            <div className="flex-1 overflow-y-auto">
              {customerContacts.length === 0 ? (
                <p className="px-[20px] py-[32px] text-center text-[14px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">此客戶尚無儲存收件人</p>
              ) : customerContacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[14px] text-[#1c1c1c] font-[500] font-['Noto_Sans_TC',_sans-serif]">{c.name}</span>
                    {c.phone && <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">{c.phone}</span>}
                  </div>
                  <button onClick={() => { setField('shipRecipient', c.name); setShowContactPopup(false); setShowNewContactForm(false); }} className="ml-[16px] px-[12px] py-[6px] bg-[#0078d4] text-white text-[14px] rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors whitespace-nowrap">選擇</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 發票收件人 Popup ── */}
      {showInvoiceContactPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowInvoiceContactPopup(false); setShowNewInvoiceContactForm(false); setNewInvoiceContact(emptyNewContact); }}>
          <div ref={invoiceContactPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[560px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇發票收件人</h3>
              <button onClick={() => { setShowInvoiceContactPopup(false); setShowNewInvoiceContactForm(false); setNewInvoiceContact(emptyNewContact); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              {!showNewInvoiceContactForm && (
                <button onClick={() => setShowNewInvoiceContactForm(true)} className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]">
                  ＋ 新增收件人
                </button>
              )}
            </div>
            {showNewInvoiceContactForm && (
              <div className="px-[20px] py-[16px] border-b border-[#e5e7eb] bg-[#f9fafb] space-y-[12px]">
                <div className="grid grid-cols-2 gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">姓名 <span className="text-[#d92d20]">*</span></label>
                    <input value={newInvoiceContact.name} onChange={(e) => setNewInvoiceContact(p => ({ ...p, name: e.target.value }))} placeholder="請輸入姓名" className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] font-['Noto_Sans_TC',_sans-serif]" />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">電話</label>
                    <input value={newInvoiceContact.phone} onChange={(e) => setNewInvoiceContact(p => ({ ...p, phone: e.target.value }))} placeholder="請輸入電話" className="h-[35px] px-[8px] border border-[#c4c9d3] rounded-[4px] text-[14px] font-['Noto_Sans_TC',_sans-serif]" />
                  </div>
                </div>
                <div className="flex justify-end gap-[8px]">
                  <button onClick={() => { setShowNewInvoiceContactForm(false); setNewInvoiceContact(emptyNewContact); }} className="px-[14px] py-[7px] border border-[#c4c9d3] text-[#7c808c] text-[14px] rounded-[4px] hover:bg-[#f5f7fa] font-['Noto_Sans_TC',_sans-serif]">取消</button>
                  <button
                    onClick={() => {
                      if (!newInvoiceContact.name) return;
                      const newEntry: CustomerContact = { ...newInvoiceContact, id: Date.now() };
                      const updated = [...invoiceContacts, newEntry];
                      setInvoiceContacts(updated);
                      mockCustomerContactBook[form.invoiceCustomerCode] = updated;
                      setField('invoiceRecipient', newEntry.name);
                      setShowInvoiceContactPopup(false);
                      setShowNewInvoiceContactForm(false);
                      setNewInvoiceContact(emptyNewContact);
                    }}
                    className="px-[14px] py-[7px] bg-[#0078d4] text-white text-[14px] font-[500] rounded-[4px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                  >
                    新增收件人
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              {invoiceContacts.length === 0 ? (
                <p className="px-[20px] py-[32px] text-center text-[14px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">此客戶尚無儲存收件人</p>
              ) : invoiceContacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between px-[20px] py-[14px] border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[14px] text-[#1c1c1c] font-[500] font-['Noto_Sans_TC',_sans-serif]">{c.name}</span>
                    {c.phone && <span className="text-[12px] text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]">{c.phone}</span>}
                  </div>
                  <button onClick={() => { setField('invoiceRecipient', c.name); setShowInvoiceContactPopup(false); setShowNewInvoiceContactForm(false); }} className="ml-[16px] px-[12px] py-[6px] bg-[#0078d4] text-white text-[14px] rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors whitespace-nowrap">選擇</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTrackingCodePopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setShowTrackingCodePopup(false); setTrackingCodeKeyword(''); }}>
          <div ref={trackingCodePopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇行銷追蹤碼</h3>
              <button onClick={() => { setShowTrackingCodePopup(false); setTrackingCodeKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋代碼或名稱" value={trackingCodeKeyword} onChange={(e) => setTrackingCodeKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredTrackingCodes.length > 0 ? filteredTrackingCodes.map((t) => (
                    <tr key={t.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{t.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{t.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectTrackingCode(t.code)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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

      {toast && (
        <CwToast
          type={toast.type}
          message={toast.message}
          visible
          duration={4000}
          closable
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
});
