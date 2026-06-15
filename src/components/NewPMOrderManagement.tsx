import { useState, useRef, useEffect } from "react";
import { RotateCcw, ChevronDown, ChevronUp, Filter, Info, Search, X, Plus, Check } from "lucide-react";
import { CwButton } from "./CwButton";
import { CwRoundButton } from "./CwRoundButton";
import { CwInput } from "./CwInput";
import { CwPagination } from "./CwPagination";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { StatusTag } from "./StatusTag";
import { PMOrderDetail } from "./PMOrderDetail";
import { CreatePMOrder } from "./CreatePMOrder";
import { CwDatePicker } from "./CwDatePicker";
import { CwTooltip } from "./CwTooltip";

// ── 統一訂單資料型別 ──────────────────────────────────────
interface UnifiedOrderData {
  id: string;
  type: ('service' | 'erp' | 'omg')[];
  // 常駐欄位
  legalEntity: string;
  orderNumber: string;
  lineNo: string;
  sourceOrderNumber: string;
  processOrderNumber: string;
  orderDate: string;
  orderStartDate: string;
  orderEndDate: string;
  startPeriod?: string;
  endPeriod?: string;
  planCode: string;
  planName: string;
  productCode: string;
  productName: string;
  quantity: number;
  itemAmount: number;
  orderAmount: number;
  sourceSystem: string;
  omgOrderType?: string;
  trackingCode?: string;
  sourceCode: string;
  salesPerson: string;
  omgStatus: string;
  serviceStatus: string;
  orderNote: string;
  isPaused: string;
  pauseReason: string;
  publishShipping: string;
  oldStartDate: string;
  oldEndDate: string;
  paymentCustomerNumber: string;
  paymentCustomerName: string;
  shippingCustomerNumber: string;
  shippingCustomerName: string;
  recipient: string;
  shippingCustomerAddress: string;
  postalCode: string;
  shippingCountry: string;
  shippingMethod: string;
  shippingMobile: string;
  shippingEmail: string;
  paymentMethod: string;
  paymentStatus: string;
  // backward compat for PMOrderDetail
  orderStatus: string;
  sourceProduct: string;
  isUnresolved: string;
  magazineCode: string;
  knowledgeStartDate: string;
  knowledgeEndDate: string;
  paymentCustomerAddress: string;
  paymentCustomerPhone: string;
  shippingCustomerPhone: string;
  customerName: string;
  customerMobile: string;
  customerPhone: string;
  customerContact: string;
  customerAddress: string;
  customerEmail: string;
  customerTaxId: string;
}

// 訂單客編資料型別
interface CustomerCodeData {
  id: number;
  code: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}

// 促銷方案資料型別
interface PromotionCodeData {
  code: string;
  description: string;
  totalAmount: number;
}

// 訂單客編虛擬資料（20筆）
const mockCustomerCodes: CustomerCodeData[] = [
  { id: 1, code: 'C001234', name: '王小明', phone: '02-25074855', address: '台北市中山區中山北路二段7號', email: 'wangxm@example.com' },
  { id: 2, code: 'C002345', name: '李大華', phone: '02-29538888', address: '新北市板橋區文化路一段188號', email: 'lidh@example.com' },
  { id: 3, code: 'C003456', name: '陳美玲', phone: '04-22580777', address: '台中市西屯區台灣大道三段99號', email: 'chenml@example.com' },
  { id: 4, code: 'C004567', name: '張志遠', phone: '07-33335555', address: '高雄市前鎮區中山三路6號', email: 'zhangzr@example.com' },
  { id: 5, code: 'C005678', name: '林淑芬', phone: '06-23456789', address: '台南市東區裕農路198號', email: 'linsf@example.com' },
  { id: 6, code: 'C006789', name: '黃文龍', phone: '03-28887799', address: '桃園市中壢區新生路111號', email: 'huang.wl@example.com' },
  { id: 7, code: 'C007890', name: '洪建志', phone: '08-33335566', address: '屏東市民生路55號', email: 'hung.jz@example.com' },
  { id: 8, code: 'C008901', name: '邱雅玲', phone: '09-44446677', address: '彰化市中山路88號', email: 'chiu.yl@example.com' },
  { id: 9, code: 'C009012', name: '曾文彬', phone: '05-22228899', address: '嘉義市東區仁愛路99號', email: 'tseng.wb@example.com' },
  { id: 10, code: 'C010123', name: '葉淑華', phone: '06-28889999', address: '台南市中西區成功路111號', email: 'yeh.sh@example.com' },
  { id: 11, code: 'C011234', name: '何俊廷', phone: '02-22223333', address: '台北市大安區信義路二段111號', email: 'ho.jt@example.com' },
  { id: 12, code: 'C012345', name: '鄭雅文', phone: '03-33334444', address: '新竹市東區東門街55號', email: 'cheng.yw@example.com' },
  { id: 13, code: 'C013456', name: '許明哲', phone: '04-33335555', address: '台中市中區民權路99號', email: 'hsu.mz@example.com' },
  { id: 14, code: 'C014567', name: '楊淑君', phone: '05-44446666', address: '嘉義縣民雄鄉中山路88號', email: 'yang.sj@example.com' },
  { id: 15, code: 'C015678', name: '周志強', phone: '06-55557777', address: '台南市北區文南路111號', email: 'chou.zq@example.com' },
  { id: 16, code: 'C016789', name: '謝美惠', phone: '07-55558888', address: '高雄市三民區遠東路99號', email: 'hsieh.mh@example.com' },
  { id: 17, code: 'C017890', name: '林佳慧', phone: '02-77778888', address: '台北市松山區南京東路555號', email: 'lin.jh@example.com' },
  { id: 18, code: 'C018901', name: '蔡政翰', phone: '03-88889999', address: '新竹市北區民主路66號', email: 'tsai.zh@example.com' },
  { id: 19, code: 'C019012', name: '劉淑芬', phone: '04-99991111', address: '台中市南屯區五權南路77號', email: 'liu.sf@example.com' },
  { id: 20, code: 'C020123', name: '吳建宏', phone: '05-99992222', address: '嘉義市西區中山路122號', email: 'wu.jh@example.com' },
];

// 促銷方案虛擬資料（與「以方案新增明細」同源）
const mockPromotionCodes: PromotionCodeData[] = [
  { code: 'GC17070009',  description: '天下雜誌5期=275元',          totalAmount: 275  },
  { code: 'CH18030012',  description: '康健雜誌3期+贈品組=480元',    totalAmount: 480  },
  { code: 'PC20250601',  description: '親子天下半年訂+數位閱讀=990元', totalAmount: 990 },
];

// ── 模擬資料 ─────────────────────────────────────────────
const mockServiceOrders: UnifiedOrderData[] = [
  {
    id: 's1', type: ['service'],
    legalEntity: '81 CW', orderNumber: 'CW2025010001', lineNo: '1', sourceOrderNumber: 'SVC001001', processOrderNumber: 'PRO001001',
    sourceSystem: '天下', sourceCode: 'IC', orderDate: '2025-01-15', sourceProduct: '天下雜誌年訂方案',
    orderStartDate: '2025-01-15', orderEndDate: '2026-01-14',
    planCode: 'YS2025', planName: '天下年訂方案2025',
    productCode: 'GCV-P001', productName: '天下雜誌年訂', quantity: 1, itemAmount: 2980, orderAmount: 2980,
    salesPerson: '林業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '止寄', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2024-01-15', oldEndDate: '2025-01-14',
    paymentCustomerNumber: 'C001234', paymentCustomerName: '王小明',
    shippingCustomerNumber: 'C001234', shippingCustomerName: '王小明',
    recipient: '王小明', shippingCustomerAddress: '台北市中山區中山北路二段7號', postalCode: '10452', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0912-111-222', shippingEmail: 'wangxm@example.com',
    isUnresolved: 'N', magazineCode: 'GCV0001', knowledgeStartDate: '2025-01-15', knowledgeEndDate: '2026-01-14',
    paymentCustomerAddress: '台北市中山區中山北路二段7號', paymentCustomerPhone: '02-25074855', shippingCustomerPhone: '02-25074855',
    customerName: '王小明', customerMobile: '0912-111-222', customerPhone: '02-25074855', customerContact: '王小明', customerAddress: '台北市中山區中山北路二段7號', customerEmail: 'wangxm@example.com', customerTaxId: '',
  },
  {
    id: 's2', type: ['omg', 'service'],
    legalEntity: '82 CH', orderNumber: 'PK2025010023', lineNo: '1', sourceOrderNumber: 'SVC001023', processOrderNumber: 'PRO001023',
    sourceSystem: '親子', sourceCode: 'IP', orderDate: '2025-01-18', sourceProduct: '親子天下半年訂閱',
    orderStartDate: '2025-01-18', orderEndDate: '2025-07-17',
    planCode: 'HS2025', planName: '親子天下半年訂閱2025',
    productCode: 'PK-P001', productName: '親子天下半年訂閱', quantity: 1, itemAmount: 1490, orderAmount: 1490,
    salesPerson: '張業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '5', paymentStatus: '待付款', orderStatus: '退訂', orderNote: '客戶要求暫停收刊',
    isPaused: 'Y', pauseReason: '客戶申請暫停', publishShipping: '親子天下', oldStartDate: '2024-07-18', oldEndDate: '2025-01-17',
    paymentCustomerNumber: 'C002345', paymentCustomerName: '李大華',
    shippingCustomerNumber: 'C002345', shippingCustomerName: '李大華',
    recipient: '李大華', shippingCustomerAddress: '新北市板橋區文化路一段188號', postalCode: '22046', shippingCountry: '台灣', shippingMethod: '1007-郵寄-掛號航空', shippingMobile: '0933-222-333', shippingEmail: 'lidh@example.com',
    isUnresolved: 'Y', magazineCode: 'PK0001', knowledgeStartDate: '', knowledgeEndDate: '',
    paymentCustomerAddress: '新北市板橋區文化路一段188號', paymentCustomerPhone: '02-29538888', shippingCustomerPhone: '02-29538888',
    customerName: '李大華', customerMobile: '0933-222-333', customerPhone: '02-29538888', customerContact: '李大華', customerAddress: '新北市板橋區文化路一段188號', customerEmail: 'lidh@example.com', customerTaxId: '',
  },
  {
    id: 's3', type: ['service'],
    legalEntity: '88 CK', orderNumber: 'CH2025010045', lineNo: '1', sourceOrderNumber: 'SVC001045', processOrderNumber: 'PRO001045',
    sourceSystem: '康健', sourceCode: 'IH', orderDate: '2025-01-20', sourceProduct: '康健季訂方案',
    orderStartDate: '2025-01-20', orderEndDate: '2025-04-19',
    planCode: 'QS2025', planName: '康健季訂方案2025',
    productCode: 'CH-P001', productName: '康健季訂方案', quantity: 1, itemAmount: 890, orderAmount: 890,
    salesPerson: '林業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '康健', oldStartDate: '2024-10-20', oldEndDate: '2025-01-19',
    paymentCustomerNumber: 'C003456', paymentCustomerName: '陳美玲',
    shippingCustomerNumber: 'C003456', shippingCustomerName: '陳美玲',
    recipient: '陳美玲', shippingCustomerAddress: '台中市西屯區台灣大道三段99號', postalCode: '40756', shippingCountry: '台灣', shippingMethod: '1006-郵寄-掛號水陸', shippingMobile: '0955-333-444', shippingEmail: 'chenml@example.com',
    isUnresolved: 'N', magazineCode: 'CH0001', knowledgeStartDate: '2025-01-20', knowledgeEndDate: '2025-04-19',
    paymentCustomerAddress: '台中市西屯區台灣大道三段99號', paymentCustomerPhone: '04-22580777', shippingCustomerPhone: '04-22580777',
    customerName: '陳美玲', customerMobile: '0955-333-444', customerPhone: '04-22580777', customerContact: '陳美玲', customerAddress: '台中市西屯區台灣大道三段99號', customerEmail: 'chenml@example.com', customerTaxId: '',
  },
  {
    id: 's4', type: ['service'],
    legalEntity: '81 CW', orderNumber: 'CW2025010067', lineNo: '1', sourceOrderNumber: 'SVC001067', processOrderNumber: 'PRO001067',
    sourceSystem: '天下', sourceCode: 'IAP_IOS', orderDate: '2025-01-22', sourceProduct: '天下雜誌數位版',
    orderStartDate: '2025-01-22', orderEndDate: '2026-01-21',
    planCode: 'DY2025', planName: '天下數位年訂2025',
    productCode: 'GCV-D001', productName: '天下雜誌數位版', quantity: 1, itemAmount: 1980, orderAmount: 1980,
    salesPerson: '王業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '9', paymentStatus: '已付款', orderStatus: '', orderNote: '數位版無需出貨',
    isPaused: 'N', pauseReason: '', publishShipping: '', oldStartDate: '2024-01-22', oldEndDate: '2025-01-21',
    paymentCustomerNumber: 'C004567', paymentCustomerName: '張志遠',
    shippingCustomerNumber: '', shippingCustomerName: '',
    recipient: '', shippingCustomerAddress: '台北市中山區網路轉單，ABC@CW.COM.TW 104', postalCode: '104', shippingCountry: '台灣', shippingMethod: '', shippingMobile: '0966-444-555', shippingEmail: 'zhangzr@example.com',
    isUnresolved: 'N', magazineCode: 'GCV0001', knowledgeStartDate: '2025-01-22', knowledgeEndDate: '2026-01-21',
    paymentCustomerAddress: '高雄市前鎮區中山三路6號', paymentCustomerPhone: '07-33335555', shippingCustomerPhone: '',
    customerName: '張志遠', customerMobile: '0966-444-555', customerPhone: '07-33335555', customerContact: '張志遠', customerAddress: '高雄市前鎮區中山三路6號', customerEmail: 'zhangzr@example.com', customerTaxId: '12345678',
  },
  {
    id: 's5', type: ['service'],
    legalEntity: '82 CH', orderNumber: 'PK2025010089', lineNo: '1', sourceOrderNumber: 'SVC001089', processOrderNumber: 'PRO001089',
    sourceSystem: '親子', sourceCode: 'IP', orderDate: '2025-01-25', sourceProduct: '親子天下年訂方案',
    orderStartDate: '2025-01-10', orderEndDate: '2026-01-09',
    planCode: 'PK-Y', planName: '親子天下年訂方案',
    productCode: 'PK-P002', productName: '親子天下禮盒組', quantity: 1, itemAmount: 3500, orderAmount: 3500,
    salesPerson: '陳業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '未付款', orderStatus: '', orderNote: '作廢原因：重複下單',
    isPaused: 'N', pauseReason: '', publishShipping: '親子天下', oldStartDate: '2024-01-10', oldEndDate: '2025-01-09',
    paymentCustomerNumber: 'C005678', paymentCustomerName: '林淑芬',
    shippingCustomerNumber: 'C005678', shippingCustomerName: '林淑芬',
    recipient: '林淑芬', shippingCustomerAddress: '台南市東區裕農路198號', postalCode: '70158', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0977-555-666', shippingEmail: 'linsf@example.com',
    isUnresolved: 'Y', magazineCode: 'PK-P002', knowledgeStartDate: '2025-01-10', knowledgeEndDate: '2026-01-09',
    paymentCustomerAddress: '台南市東區裕農路198號', paymentCustomerPhone: '06-23456789', shippingCustomerPhone: '06-23456789',
    customerName: '林淑芬', customerMobile: '0977-555-666', customerPhone: '06-23456789', customerContact: '林淑芬', customerAddress: '台南市東區裕農路198號', customerEmail: 'linsf@example.com', customerTaxId: '',
  },
];

const mockErpOrders: UnifiedOrderData[] = [
  {
    id: 'e1', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '102862680', lineNo: '1', sourceOrderNumber: '102862680-S', processOrderNumber: 'FLW862680',
    sourceSystem: '天下', sourceCode: 'TA', orderDate: '2025-05-12', sourceProduct: '天下雜誌1週',
    orderStartDate: '2025-05-14', orderEndDate: '2025-07-09',
    planCode: 'GCV-W', planName: '天下雜誌週訂方案', startPeriod: '790', endPeriod: '793',
    productCode: 'GCV00001', productName: '天下雜誌1週', quantity: 1, itemAmount: 380, orderAmount: 380,
    salesPerson: '郭業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2024-05-14', oldEndDate: '2025-05-13',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF',
    recipient: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', postalCode: '10356', shippingCountry: '台灣', shippingMethod: '1005-郵寄-一般航空', shippingMobile: '0912-345-678', shippingEmail: 'jeff@example.com',
    isUnresolved: 'N', magazineCode: 'GCV00001', knowledgeStartDate: '2025-05-14', knowledgeEndDate: '2025-07-09',
    paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678', shippingCustomerPhone: '0912-345-678',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '02-25551234', customerContact: 'JEFF', customerAddress: '台北市大同區民權西路103號', customerEmail: 'jeff@example.com', customerTaxId: '87654321',
  },
  {
    id: 'e2', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '52070730', lineNo: '1', sourceOrderNumber: '52070730-S', processOrderNumber: 'FLW070730',
    sourceSystem: '天下', sourceCode: 'MA', orderDate: '2025-06-12', sourceProduct: '天下雜誌2週',
    orderStartDate: '2025-06-15', orderEndDate: '2025-07-14',
    planCode: 'GCV-W', planName: '天下雜誌週訂方案', startPeriod: '793', endPeriod: '795',
    productCode: 'GCV00002', productName: '天下雜誌2週', quantity: 1, itemAmount: 680, orderAmount: 680,
    salesPerson: '郭業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '待付款', orderStatus: '', orderNote: '資料建置中',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2025-05-15', oldEndDate: '2025-06-14',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF',
    recipient: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', postalCode: '10356', shippingCountry: '台灣', shippingMethod: '1005-郵寄-一般航空', shippingMobile: '0912-345-678', shippingEmail: 'jeff@example.com',
    isUnresolved: 'Y', magazineCode: 'GCV00002', knowledgeStartDate: '2025-06-15', knowledgeEndDate: '2025-07-14',
    paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678', shippingCustomerPhone: '0912-345-678',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '', customerContact: 'JEFF', customerAddress: '', customerEmail: 'jeff@example.com', customerTaxId: '',
  },
  {
    id: 'e3', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '102862724', lineNo: '1', sourceOrderNumber: '102862724-S', processOrderNumber: 'FLW862724',
    sourceSystem: '天下', sourceCode: 'CA', orderDate: '2025-06-09', sourceProduct: '天下雜誌 (2萬1)',
    orderStartDate: '2025-06-09', orderEndDate: '2026-06-08',
    planCode: 'KCAA-Y', planName: '天下雜誌年訂(2萬1)', startPeriod: '793', endPeriod: '818',
    productCode: 'KCAA00012', productName: '天下雜誌 (2萬1)', quantity: 1, itemAmount: 21000, orderAmount: 21000,
    salesPerson: '郭業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '復寄', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2024-06-09', oldEndDate: '2025-06-08',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF',
    recipient: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', postalCode: '10356', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0912-345-678', shippingEmail: 'jeff@example.com',
    isUnresolved: 'N', magazineCode: 'KCAA00012', knowledgeStartDate: '2025-06-09', knowledgeEndDate: '2026-06-08',
    paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678', shippingCustomerPhone: '0912-345-678',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '02-25551234', customerContact: 'JEFF', customerAddress: '台北市大同區民權西路103號', customerEmail: 'jeff@example.com', customerTaxId: '87654321',
  },
  {
    id: 'e4', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '102862724-2', lineNo: '2', sourceOrderNumber: '102862724-S', processOrderNumber: 'FLW862724-2',
    sourceSystem: '天下', sourceCode: 'BB', orderDate: '2025-06-09', sourceProduct: '',
    orderStartDate: '2026-04-13', orderEndDate: '2027-04-28',
    planCode: 'GCV-Y2', planName: '天下雜誌年訂方案二', startPeriod: '816', endPeriod: '842',
    productCode: 'GCV00025', productName: '天下雜誌年訂', quantity: 1, itemAmount: 0, orderAmount: 0,
    salesPerson: '郭業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2025-04-13', oldEndDate: '2026-04-12',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF',
    recipient: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', postalCode: '10356', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0912-345-678', shippingEmail: 'jeff@example.com',
    isUnresolved: 'N', magazineCode: 'GCV00025', knowledgeStartDate: '2026-04-13', knowledgeEndDate: '2027-04-28',
    paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678', shippingCustomerPhone: '0912-345-678',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '02-25551234', customerContact: 'JEFF', customerAddress: '台北市大同區民權西路103號', customerEmail: 'jeff@example.com', customerTaxId: '87654321',
  },
  {
    id: 'e5', type: ['erp'],
    legalEntity: '82 CH', orderNumber: '102862750', lineNo: '1', sourceOrderNumber: '102862750-S', processOrderNumber: 'FLW862750',
    sourceSystem: '親子', sourceCode: 'RI', orderDate: '2025-02-14', sourceProduct: '親子天下月訂',
    orderStartDate: '2025-02-14', orderEndDate: '2026-02-13',
    planCode: 'PK-Y', planName: '親子天下年訂方案',
    productCode: 'PK00001', productName: '親子天下月訂', quantity: 1, itemAmount: 5980, orderAmount: 5980,
    salesPerson: '陳業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '輸入', orderNote: '新增訂戶',
    isPaused: 'N', pauseReason: '', publishShipping: '親子天下', oldStartDate: '2024-02-14', oldEndDate: '2025-02-13',
    paymentCustomerNumber: '1679129', paymentCustomerName: '陳小芳',
    shippingCustomerNumber: '1679129', shippingCustomerName: '陳小芳',
    recipient: '陳小芳', shippingCustomerAddress: '台中市中區自由路100號', postalCode: '40042', shippingCountry: '台灣', shippingMethod: '1007-郵寄-掛號航空', shippingMobile: '0922-456-789', shippingEmail: 'chen.xf@example.com',
    isUnresolved: 'N', magazineCode: 'PK00001', knowledgeStartDate: '2025-02-14', knowledgeEndDate: '2026-02-13',
    paymentCustomerAddress: '台中市中區自由路100號', paymentCustomerPhone: '04-22220123', shippingCustomerPhone: '04-22220123',
    customerName: '陳小芳', customerMobile: '0922-456-789', customerPhone: '04-22220123', customerContact: '陳小芳', customerAddress: '台中市中區自由路100號', customerEmail: 'chen.xf@example.com', customerTaxId: '12345678',
  },
  {
    id: 'e6', type: ['erp'],
    legalEntity: '88 CK', orderNumber: '102862770', lineNo: '1', sourceOrderNumber: '102862770-S', processOrderNumber: 'FLW862770',
    sourceSystem: '康健', sourceCode: 'RA', orderDate: '2025-03-10', sourceProduct: '康健雜誌季訂',
    orderStartDate: '2025-03-10', orderEndDate: '2025-06-09',
    planCode: 'CH-Q', planName: '康健季訂方案',
    productCode: 'CH00002', productName: '康健雜誌季訂', quantity: 1, itemAmount: 2490, orderAmount: 2490,
    salesPerson: '林業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '5', paymentStatus: '已付款', orderStatus: '', orderNote: '已出貨',
    isPaused: 'N', pauseReason: '', publishShipping: '康健', oldStartDate: '2024-12-10', oldEndDate: '2025-03-09',
    paymentCustomerNumber: '1679130', paymentCustomerName: '林建宏',
    shippingCustomerNumber: '1679130', shippingCustomerName: '林建宏',
    recipient: '林建宏', shippingCustomerAddress: '高雄市前鎮區中華四路8號', postalCode: '81252', shippingCountry: '台灣', shippingMethod: '1006-郵寄-掛號水陸', shippingMobile: '0933-567-890', shippingEmail: 'lin.jh@example.com',
    isUnresolved: 'N', magazineCode: 'CH00002', knowledgeStartDate: '2025-03-10', knowledgeEndDate: '2025-06-09',
    paymentCustomerAddress: '高雄市前鎮區中華四路8號', paymentCustomerPhone: '07-33334444', shippingCustomerPhone: '07-33334444',
    customerName: '林建宏', customerMobile: '0933-567-890', customerPhone: '07-33334444', customerContact: '林建宏', customerAddress: '高雄市前鎮區中華四路8號', customerEmail: 'lin.jh@example.com', customerTaxId: '98765432',
  },
  {
    id: 'e7', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '102862790', lineNo: '1', sourceOrderNumber: '102862790-S', processOrderNumber: 'FLW862790',
    sourceSystem: '天下', sourceCode: 'VA', orderDate: '2025-04-05', sourceProduct: '天下雜誌月訂',
    orderStartDate: '2025-04-05', orderEndDate: '2025-05-04',
    planCode: '', planName: '',
    productCode: 'GCV00003', productName: '天下雜誌月訂', quantity: 1, itemAmount: 480, orderAmount: 480,
    salesPerson: '陳業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '未付款', orderStatus: '作廢', orderNote: '客戶要求取消',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2025-03-05', oldEndDate: '2025-04-04',
    paymentCustomerNumber: '1679131', paymentCustomerName: '黃麗娜',
    shippingCustomerNumber: '1679131', shippingCustomerName: '黃麗娜',
    recipient: '黃麗娜', shippingCustomerAddress: '新竹市東區光復路88號', postalCode: '30064', shippingCountry: '台灣', shippingMethod: '1005-郵寄-一般航空', shippingMobile: '0944-678-901', shippingEmail: 'huang.ln@example.com',
    isUnresolved: 'Y', magazineCode: 'GCV00003', knowledgeStartDate: '', knowledgeEndDate: '',
    paymentCustomerAddress: '新竹市東區光復路88號', paymentCustomerPhone: '03-55557777', shippingCustomerPhone: '03-55557777',
    customerName: '黃麗娜', customerMobile: '0944-678-901', customerPhone: '03-55557777', customerContact: '黃麗娜', customerAddress: '新竹市東區光復路88號', customerEmail: 'huang.ln@example.com', customerTaxId: '56789123',
  },
  {
    id: 'e8', type: ['erp'],
    legalEntity: '82 CH', orderNumber: '102862810', lineNo: '1', sourceOrderNumber: '102862810-S', processOrderNumber: 'FLW862810',
    sourceSystem: '親子', sourceCode: 'IPA', orderDate: '2025-05-20', sourceProduct: '親子天下年訂',
    orderStartDate: '2025-05-20', orderEndDate: '2026-05-19',
    planCode: 'PK-Y', planName: '親子天下年訂方案',
    productCode: 'PK00002', productName: '親子天下年訂', quantity: 1, itemAmount: 6980, orderAmount: 6980,
    salesPerson: '林業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '親子天下', oldStartDate: '2024-05-20', oldEndDate: '2025-05-19',
    paymentCustomerNumber: '1679132', paymentCustomerName: '吳文傑',
    shippingCustomerNumber: '1679132', shippingCustomerName: '吳文傑',
    recipient: '吳文傑', shippingCustomerAddress: '台南市南區文南路65號', postalCode: '70270', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0955-789-012', shippingEmail: 'wu.wj@example.com',
    isUnresolved: 'N', magazineCode: 'PK00002', knowledgeStartDate: '2025-05-20', knowledgeEndDate: '2026-05-19',
    paymentCustomerAddress: '台南市南區文南路65號', paymentCustomerPhone: '06-26688888', shippingCustomerPhone: '06-26688888',
    customerName: '吳文傑', customerMobile: '0955-789-012', customerPhone: '06-26688888', customerContact: '吳文傑', customerAddress: '台南市南區文南路65號', customerEmail: 'wu.wj@example.com', customerTaxId: '34567890',
  },
  {
    id: 'e9', type: ['erp'],
    legalEntity: '88 CK', orderNumber: '102862830', lineNo: '1', sourceOrderNumber: '102862830-S', processOrderNumber: 'FLW862830',
    sourceSystem: '康健', sourceCode: 'IHB', orderDate: '2025-06-15', sourceProduct: '康健雜誌年訂',
    orderStartDate: '2025-06-15', orderEndDate: '2026-06-14',
    planCode: 'CH-Y', planName: '康健年訂方案',
    productCode: 'CH00003', productName: '康健雜誌年訂', quantity: 1, itemAmount: 8980, orderAmount: 8980,
    salesPerson: '王業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '5', paymentStatus: '已付款', orderStatus: '', orderNote: '已停寄',
    isPaused: 'Y', pauseReason: '客戶申請暫停', publishShipping: '康健', oldStartDate: '2024-06-15', oldEndDate: '2025-06-14',
    paymentCustomerNumber: '1679133', paymentCustomerName: '葉淑芬',
    shippingCustomerNumber: '1679133', shippingCustomerName: '葉淑芬',
    recipient: '葉淑芬', shippingCustomerAddress: '宜蘭縣宜蘭市民權路25號', postalCode: '26055', shippingCountry: '台灣', shippingMethod: '1008-郵寄-限時掛號', shippingMobile: '0966-890-123', shippingEmail: 'ye.sf@example.com',
    isUnresolved: 'N', magazineCode: 'CH00003', knowledgeStartDate: '2025-06-15', knowledgeEndDate: '2026-06-14',
    paymentCustomerAddress: '宜蘭縣宜蘭市民權路25號', paymentCustomerPhone: '03-93223333', shippingCustomerPhone: '03-93223333',
    customerName: '葉淑芬', customerMobile: '0966-890-123', customerPhone: '03-93223333', customerContact: '葉淑芬', customerAddress: '宜蘭縣宜蘭市民權路25號', customerEmail: 'ye.sf@example.com', customerTaxId: '01234567',
  },
  {
    id: 'e10', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '102862850', lineNo: '1', sourceOrderNumber: '102862850-S', processOrderNumber: 'FLW862850',
    sourceSystem: '天下', sourceCode: 'GB', orderDate: '2025-07-01', sourceProduct: '天下雜誌半年訂',
    orderStartDate: '2025-07-01', orderEndDate: '2025-12-31',
    planCode: 'GCV-H', planName: '天下雜誌半年訂', startPeriod: '794', endPeriod: '807',
    productCode: 'GCV00004', productName: '天下雜誌半年訂', quantity: 1, itemAmount: 2980, orderAmount: 2980,
    salesPerson: '郭業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '補贈電子', orderNote: '補贈電子版',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2025-01-01', oldEndDate: '2025-06-30',
    paymentCustomerNumber: '1679134', paymentCustomerName: '曾家銘',
    shippingCustomerNumber: '1679134', shippingCustomerName: '曾家銘',
    recipient: '曾家銘', shippingCustomerAddress: '嘉義市東區忠孝路15號', postalCode: '60058', shippingCountry: '台灣', shippingMethod: '1007-郵寄-掛號航空', shippingMobile: '0977-901-234', shippingEmail: 'zeng.jm@example.com',
    isUnresolved: 'N', magazineCode: 'GCV00004', knowledgeStartDate: '2025-07-01', knowledgeEndDate: '2025-12-31',
    paymentCustomerAddress: '嘉義市東區忠孝路15號', paymentCustomerPhone: '05-22229999', shippingCustomerPhone: '05-22229999',
    customerName: '曾家銘', customerMobile: '0977-901-234', customerPhone: '05-22229999', customerContact: '曾家銘', customerAddress: '嘉義市東區忠孝路15號', customerEmail: 'zeng.jm@example.com', customerTaxId: '98765432',
  },
  {
    id: 'e11', type: ['erp'],
    legalEntity: '82 CH', orderNumber: '102862870', lineNo: '1', sourceOrderNumber: '102862870-S', processOrderNumber: 'FLW862870',
    sourceSystem: '親子', sourceCode: 'IB', orderDate: '2025-08-10', sourceProduct: '親子天下季訂',
    orderStartDate: '2025-08-10', orderEndDate: '2025-11-09',
    planCode: 'PK-Q', planName: '親子天下季訂方案',
    productCode: 'PK00003', productName: '親子天下季訂', quantity: 1, itemAmount: 1980, orderAmount: 1980,
    salesPerson: '陳業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '待付款', orderStatus: '', orderNote: '待客戶確認付款',
    isPaused: 'N', pauseReason: '', publishShipping: '親子天下', oldStartDate: '2025-05-10', oldEndDate: '2025-08-09',
    paymentCustomerNumber: '1679135', paymentCustomerName: '謝美華',
    shippingCustomerNumber: '1679135', shippingCustomerName: '謝美華',
    recipient: '謝美華', shippingCustomerAddress: '屏東縣屏東市和平路20號', postalCode: '90053', shippingCountry: '台灣', shippingMethod: '1005-郵寄-一般航空', shippingMobile: '0988-012-345', shippingEmail: 'xie.mh@example.com',
    isUnresolved: 'Y', magazineCode: 'PK00003', knowledgeStartDate: '', knowledgeEndDate: '',
    paymentCustomerAddress: '屏東縣屏東市和平路20號', paymentCustomerPhone: '08-75552222', shippingCustomerPhone: '08-75552222',
    customerName: '謝美華', customerMobile: '0988-012-345', customerPhone: '08-75552222', customerContact: '謝美華', customerAddress: '屏東縣屏東市和平路20號', customerEmail: 'xie.mh@example.com', customerTaxId: '11111111',
  },
  {
    id: 'e12', type: ['erp'],
    legalEntity: '88 CK', orderNumber: '102862890', lineNo: '1', sourceOrderNumber: '102862890-S', processOrderNumber: 'FLW862890',
    sourceSystem: '康健', sourceCode: 'IH', orderDate: '2025-09-05', sourceProduct: '康健雜誌月訂',
    orderStartDate: '2025-09-05', orderEndDate: '2025-10-04',
    planCode: '', planName: '',
    productCode: 'CH00004', productName: '康健雜誌月訂', quantity: 1, itemAmount: 380, orderAmount: 380,
    salesPerson: '林業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '5', paymentStatus: '已付款', orderStatus: '', orderNote: '客戶已主動退訂',
    isPaused: 'N', pauseReason: '', publishShipping: '康健', oldStartDate: '2025-08-05', oldEndDate: '2025-09-04',
    paymentCustomerNumber: '1679136', paymentCustomerName: '許仁祥',
    shippingCustomerNumber: '1679136', shippingCustomerName: '許仁祥',
    recipient: '許仁祥', shippingCustomerAddress: '花蓮縣花蓮市中山路88號', postalCode: '97043', shippingCountry: '台灣', shippingMethod: '1006-郵寄-掛號水陸', shippingMobile: '0999-123-456', shippingEmail: 'xu.rx@example.com',
    isUnresolved: 'N', magazineCode: 'CH00004', knowledgeStartDate: '2025-09-05', knowledgeEndDate: '2025-10-04',
    paymentCustomerAddress: '花蓮縣花蓮市中山路88號', paymentCustomerPhone: '03-83334444', shippingCustomerPhone: '03-83334444',
    customerName: '許仁祥', customerMobile: '0999-123-456', customerPhone: '03-83334444', customerContact: '許仁祥', customerAddress: '花蓮縣花蓮市中山路88號', customerEmail: 'xu.rx@example.com', customerTaxId: '22222222',
  },
  {
    id: 'e13', type: ['erp'],
    legalEntity: '81 CW', orderNumber: '102862910', lineNo: '1', sourceOrderNumber: '102862910-S', processOrderNumber: 'FLW862910',
    sourceSystem: '天下', sourceCode: 'TC845', orderDate: '2025-10-12', sourceProduct: '天下雜誌年訂',
    orderStartDate: '2025-10-12', orderEndDate: '2026-10-11',
    planCode: 'GCV-Y', planName: '天下雜誌年訂方案', startPeriod: '800', endPeriod: '826',
    productCode: 'GCV00005', productName: '天下雜誌年訂', quantity: 1, itemAmount: 3980, orderAmount: 3980,
    salesPerson: '郭業務', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '新增訂戶',
    isPaused: 'N', pauseReason: '', publishShipping: '天下', oldStartDate: '2024-10-12', oldEndDate: '2025-10-11',
    paymentCustomerNumber: '1679137', paymentCustomerName: '何瑀恩',
    shippingCustomerNumber: '1679137', shippingCustomerName: '何瑀恩',
    recipient: '何瑀恩', shippingCustomerAddress: '澎湖縣馬公市光華路12號', postalCode: '88056', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0911-234-567', shippingEmail: 'he.ye@example.com',
    isUnresolved: 'N', magazineCode: 'GCV00005', knowledgeStartDate: '2025-10-12', knowledgeEndDate: '2026-10-11',
    paymentCustomerAddress: '澎湖縣馬公市光華路12號', paymentCustomerPhone: '06-92775555', shippingCustomerPhone: '06-92775555',
    customerName: '何瑀恩', customerMobile: '0911-234-567', customerPhone: '06-92775555', customerContact: '何瑀恩', customerAddress: '澎湖縣馬公市光華路12號', customerEmail: 'he.ye@example.com', customerTaxId: '33333333',
  },
];

const mockOmgOrders: UnifiedOrderData[] = [
  {
    id: 'o1', type: ['omg'],
    legalEntity: '110 CL', orderNumber: 'OMG20250701001', lineNo: '1', sourceOrderNumber: 'OMG20250701001-S', processOrderNumber: 'OMG-PRO-001',
    sourceSystem: '天下', sourceCode: 'IC', orderDate: '2025-07-01', sourceProduct: '天下雜誌數位版年訂',
    orderStartDate: '2025-07-01', orderEndDate: '2026-06-30',
    planCode: 'GCV-D-Y', planName: '天下數位年訂方案',
    productCode: 'GCV-D001', productName: '天下雜誌數位版年訂', quantity: 1, itemAmount: 1980, orderAmount: 1980,
    salesPerson: '', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: 'OMG 數位訂閱',
    isPaused: 'N', pauseReason: '', publishShipping: '', oldStartDate: '2024-07-01', oldEndDate: '2025-06-30',
    paymentCustomerNumber: '1679140', paymentCustomerName: '趙雅婷',
    shippingCustomerNumber: '1679140', shippingCustomerName: '趙雅婷',
    recipient: '趙雅婷', shippingCustomerAddress: '台北市中山區網路轉單，ABC@CW.COM.TW 104', postalCode: '104', shippingCountry: '台灣', shippingMethod: '', shippingMobile: '0955-111-222', shippingEmail: 'chao.yt@example.com',
    isUnresolved: 'N', magazineCode: 'GCV-D001', knowledgeStartDate: '2025-07-01', knowledgeEndDate: '2026-06-30',
    paymentCustomerAddress: '台北市信義區信義路五段7號', paymentCustomerPhone: '02-27588888', shippingCustomerPhone: '02-27588888',
    customerName: '趙雅婷', customerMobile: '0955-111-222', customerPhone: '02-27588888', customerContact: '趙雅婷', customerAddress: '台北市信義區信義路五段7號', customerEmail: 'chao.yt@example.com', customerTaxId: '',
  },
  {
    id: 'o2', type: ['omg'],
    legalEntity: '88 CK', orderNumber: 'OMG20250815002', lineNo: '1', sourceOrderNumber: 'OMG20250815002-S', processOrderNumber: 'OMG-PRO-002',
    sourceSystem: '康健', sourceCode: 'IHA', orderDate: '2025-08-15', sourceProduct: '康健雜誌數位季訂',
    orderStartDate: '2025-08-15', orderEndDate: '2025-11-14',
    planCode: 'CH-D-Q', planName: '康健數位季訂方案',
    productCode: 'CH-D002', productName: '康健雜誌數位季訂', quantity: 1, itemAmount: 890, orderAmount: 890,
    salesPerson: '', omgStatus: '', serviceStatus: '',
    paymentMethod: '9', paymentStatus: '已付款', orderStatus: '', orderNote: '',
    isPaused: 'N', pauseReason: '', publishShipping: '', oldStartDate: '2025-05-15', oldEndDate: '2025-08-14',
    paymentCustomerNumber: '1679141', paymentCustomerName: '蔡宗翰',
    shippingCustomerNumber: '1679141', shippingCustomerName: '蔡宗翰',
    recipient: '蔡宗翰', shippingCustomerAddress: '台北市中山區網路轉單，ABC@CW.COM.TW 104', postalCode: '104', shippingCountry: '台灣', shippingMethod: '', shippingMobile: '0966-333-444', shippingEmail: 'tsai.zh@omg.com',
    isUnresolved: 'N', magazineCode: 'CH-D002', knowledgeStartDate: '2025-08-15', knowledgeEndDate: '2025-11-14',
    paymentCustomerAddress: '新北市淡水區中正路66號', paymentCustomerPhone: '02-26213333', shippingCustomerPhone: '02-26213333',
    customerName: '蔡宗翰', customerMobile: '0966-333-444', customerPhone: '02-26213333', customerContact: '蔡宗翰', customerAddress: '新北市淡水區中正路66號', customerEmail: 'tsai.zh@omg.com', customerTaxId: '',
  },
  {
    id: 'o3', type: ['omg', 'service'],
    legalEntity: '82 CH', orderNumber: 'OMG20250901003', lineNo: '1', sourceOrderNumber: 'OMG20250901003-S', processOrderNumber: 'OMG-PRO-003',
    sourceSystem: '親子', sourceCode: 'IPL', orderDate: '2025-09-01', sourceProduct: '親子天下數位+紙本合訂',
    orderStartDate: '2025-09-01', orderEndDate: '2026-08-31',
    planCode: 'PK-D-Y', planName: '親子天下數位年訂',
    productCode: 'PK-D003', productName: '親子天下數位+紙本合訂', quantity: 1, itemAmount: 3480, orderAmount: 3480,
    salesPerson: '', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '數位紙本合訂跨系統訂單',
    isPaused: 'N', pauseReason: '', publishShipping: '親子天下', oldStartDate: '2024-09-01', oldEndDate: '2025-08-31',
    paymentCustomerNumber: '1679142', paymentCustomerName: '林怡君',
    shippingCustomerNumber: '1679142', shippingCustomerName: '林怡君',
    recipient: '林怡君', shippingCustomerAddress: '台北市中山區網路轉單，ABC@CW.COM.TW 104', postalCode: '104', shippingCountry: '台灣', shippingMethod: '1009-郵寄-指定宅配', shippingMobile: '0977-888-999', shippingEmail: 'lin.yj@example.com',
    isUnresolved: 'N', magazineCode: 'PK-D003', knowledgeStartDate: '2025-09-01', knowledgeEndDate: '2026-08-31',
    paymentCustomerAddress: '台中市西區民生北路12號', paymentCustomerPhone: '04-23310000', shippingCustomerPhone: '04-23310000',
    customerName: '林怡君', customerMobile: '0977-888-999', customerPhone: '04-23310000', customerContact: '林怡君', customerAddress: '台中市西區民生北路12號', customerEmail: 'lin.yj@example.com', customerTaxId: '',
  },
  {
    id: 'o4', type: ['omg', 'erp'],
    legalEntity: '81 CW', orderNumber: 'OMG20251005004', lineNo: '1', sourceOrderNumber: 'OMG20251005004-S', processOrderNumber: 'OMG-PRO-004',
    sourceSystem: '天下', sourceCode: 'IAP_ANDROID', orderDate: '2025-10-05', sourceProduct: '天下雜誌數位月訂',
    orderStartDate: '2025-10-05', orderEndDate: '2025-11-04',
    planCode: 'GCV-D-M', planName: '天下數位月訂方案',
    productCode: 'GCV-D004', productName: '天下雜誌數位月訂', quantity: 1, itemAmount: 299, orderAmount: 299,
    salesPerson: '', omgStatus: '', serviceStatus: '',
    paymentMethod: '1', paymentStatus: '已付款', orderStatus: '', orderNote: '客戶申請退訂',
    isPaused: 'N', pauseReason: '', publishShipping: '', oldStartDate: '2025-09-05', oldEndDate: '2025-10-04',
    paymentCustomerNumber: '1679143', paymentCustomerName: '江明哲',
    shippingCustomerNumber: '1679143', shippingCustomerName: '江明哲',
    recipient: '江明哲', shippingCustomerAddress: '台北市中山區網路轉單，ABC@CW.COM.TW 104', postalCode: '104', shippingCountry: '台灣', shippingMethod: '', shippingMobile: '0911-777-888', shippingEmail: 'jiang.mz@example.com',
    isUnresolved: 'Y', magazineCode: 'GCV-D004', knowledgeStartDate: '2025-10-05', knowledgeEndDate: '2025-11-04',
    paymentCustomerAddress: '高雄市苓雅區四維三路2號', paymentCustomerPhone: '07-33311111', shippingCustomerPhone: '07-33311111',
    customerName: '江明哲', customerMobile: '0911-777-888', customerPhone: '07-33311111', customerContact: '江明哲', customerAddress: '高雄市苓雅區四維三路2號', customerEmail: 'jiang.mz@example.com', customerTaxId: '',
  },
];

// ── Select 選項 ───────────────────────────────────────────
// 訂單狀態色彩對照（tag 用深色，row 背景用淺色）
const ORDER_STATUS_COLORS: Record<string, { tagBg: string; tagColor: string; rowBg: string }> = {
  '輸入':   { tagBg: '#e8c900', tagColor: '#3d3200', rowBg: '#fefce8' },
  '作廢':   { tagBg: '#a83de0', tagColor: '#fff',    rowBg: '#f5e8fd' },
  '止寄':   { tagBg: '#3aad30', tagColor: '#fff',    rowBg: '#edfaec' },
  '復寄':   { tagBg: '#7c5cd6', tagColor: '#fff',    rowBg: '#f3effd' },
  '退訂':   { tagBg: '#757575', tagColor: '#fff',    rowBg: '#f5f5f5' },
  '補贈電子': { tagBg: '#4a9dd4', tagColor: '#fff',  rowBg: '#eaf4fd' },
};

const ORDER_STATUS_LEGEND = Object.entries(ORDER_STATUS_COLORS).map(([label, { rowBg }]) => ({
  label,
  color: rowBg,
}));


// 通路代碼選項
const SOURCE_CODE_OPTIONS: CwSelectOption[] = [
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
  { value: 'IPN',         label: 'IPN 親子翻轉教育序號兌換',     searchValue: 'IPN 親子翻轉教育序號兌換' },
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

const SOURCE_CODE_LABEL_MAP: Record<string, string> = Object.fromEntries(
  SOURCE_CODE_OPTIONS.map(o => [o.value, (o.label as string).replace(/^\S+\s/, '')])
);

const getSourceCodeStyle = (code: string): { background: string; color: string } => {
  if (code.startsWith('I'))  return { background: '#eff6ff', color: '#1d4ed8' }; // 網路/數位 → 藍
  if (code.startsWith('O'))  return { background: '#fff7ed', color: '#c2410c' }; // 直銷 → 橘
  if (code.startsWith('R'))  return { background: '#f0fdf4', color: '#15803d' }; // 經銷/零售 → 綠
  if (code.startsWith('A'))  return { background: '#fefce8', color: '#a16207' }; // 廣告 → 黃
  if (code.startsWith('T'))  return { background: '#f0fdfa', color: '#0f766e' }; // 電銷 → 青
  if (code.startsWith('G'))  return { background: '#faf5ff', color: '#7c3aed' }; // 團體 → 紫
  if (code.startsWith('B'))  return { background: '#fff1f2', color: '#be123c' }; // 團訂/航空 → 玫紅
  if (code.startsWith('M'))  return { background: '#fdf4ff', color: '#a21caf' }; // 郵購 → 粉紫
  return { background: '#f3f4f6', color: '#374151' };
};

const orderStatusOptions: CwSelectOption[] = Object.keys(ORDER_STATUS_COLORS).map((status) => ({
  value: status,
  label: status,
}));
const paymentMethodOptions: CwSelectOption[] = [
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
const paymentStatusOptions: CwSelectOption[] = [
  { value: '棄單', label: '棄單' },
  { value: '未付款', label: '未付款' },
  { value: '會員已付款', label: '會員已付款' },
  { value: '退款', label: '退款' },
  { value: '扣款失敗', label: '扣款失敗' },
];

const mockShippingMethods: { id: number; code: string; name: string }[] = [
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
const creatorOptions: CwSelectOption[] = [{ value: 'userA', label: '王小明' }];
// 來源系統選項（與 OMGOrderHeader.tsx 的 SOURCE_SYSTEM_OPTIONS 同步）
const SOURCE_SYSTEM_OPTIONS: CwSelectOption[] = [
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

// OMG 訂單類型選項（與 OMGOrderHeader.tsx 同步）
const OMG_ORDER_TYPE_OPTIONS: CwSelectOption[] = [
  { value: '訂單', label: '訂單' },
];

// BU 法人選項（與 OMGOrderHeader.tsx 同步，上線後從登入資訊取得）
// 法人：查詢/建單/改單皆顯示全部選項，不受使用者身份限制
const legalEntityOptions: CwSelectOption[] = [
  { value: '81',  label: '天下' },
  { value: '88',  label: '康健' },
  { value: '82',  label: '親子' },
  { value: '110', label: '親子學' },
];

const mockEmployees: { code: string; name: string }[] = [
  { code: '001001', name: '林業務' },
  { code: '001002', name: '張業務' },
  { code: '001003', name: '王業務' },
  { code: '001004', name: '陳業務' },
  { code: '001005', name: '郭業務' },
];

const mockTrackingCodes: { code: string; name: string }[] = [
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

const mockProductCodes: { id: number; code: string; name: string }[] = [
  { id: 1, code: 'P001', name: '天下雜誌（紙本）年訂' },
  { id: 2, code: 'P002', name: '天下雜誌數位版年訂' },
  { id: 3, code: 'P003', name: '親子天下紙本半年訂' },
  { id: 4, code: 'P004', name: '親子天下數位年訂' },
  { id: 5, code: 'P005', name: '康健雜誌紙本季訂' },
  { id: 6, code: 'P006', name: '康健雜誌數位月訂' },
  { id: 7, code: 'P007', name: '天下學習紙本週刊' },
  { id: 8, code: 'P008', name: '遠見雜誌紙本年訂' },
  { id: 9, code: 'P009', name: '哈佛商業評論數位版' },
  { id: 10, code: 'P010', name: '科學人雜誌紙本月訂' },
];

const orderNumberOptions: CwSelectOption[] = [
  { value: '12345678', label: '12345678', searchValue: '林小哲' },
  { value: '23456789', label: '23456789', searchValue: '王大明' },
  { value: '34567890', label: '34567890', searchValue: '陳美玲' },
  { value: '45678901', label: '45678901', searchValue: '李志偉' },
  { value: '56789012', label: '56789012', searchValue: '張雅婷' },
  { value: '67890123', label: '67890123', searchValue: '吳建宏' },
  { value: '78901234', label: '78901234', searchValue: '劉淑芬' },
  { value: '89012345', label: '89012345', searchValue: '黃文龍' },
  { value: '90123456', label: '90123456', searchValue: '林佳慧' },
  { value: '01234567', label: '01234567', searchValue: '蔡政翰' },
  { value: '11234567', label: '11234567', searchValue: '鄭雅文' },
  { value: '22345678', label: '22345678', searchValue: '許明哲' },
  { value: '33456789', label: '33456789', searchValue: '楊淑君' },
  { value: '44567890', label: '44567890', searchValue: '周志強' },
  { value: '55678901', label: '55678901', searchValue: '謝美惠' },
  { value: '66789012', label: '66789012', searchValue: '洪建志' },
  { value: '77890123', label: '77890123', searchValue: '邱雅玲' },
  { value: '88901234', label: '88901234', searchValue: '曾文彬' },
  { value: '99012345', label: '99012345', searchValue: '葉淑華' },
  { value: '10123456', label: '10123456', searchValue: '何俊廷' },
];

// 欄位顯示分類
const COLUMN_FILTER_OPTIONS = [
  '通路代碼', 'OMG訂單類型', '訂單金額', '訂單狀態',
  '行銷追蹤碼', '來源單號', '流程單號', '訂閱起期', '訂閱迄期',
  '方案代碼', '方案名稱', '數量', '品項金額', '業務員名',
  '暫止原因', '發行出貨', '舊訂閱起期', '舊訂閱迄期',
  '付款客戶編號', '付款客戶名稱', '出貨客戶編號',
  '出貨收件人', '出貨地址', '郵遞區號', '出貨國別',
  '出貨方式', '出貨客戶手機', '出貨客戶Email', '付款方式', '付款狀態',
] as const;

// ── 區塊標題 ──────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>
      {children}
    </p>
  );
}

// ── 彈窗搜尋輸入欄位 ──────────────────────────────────────
function PopupSearchInput({
  label, value, onChange, onOpen, onClear,
}: {
  label: string; value: string;
  onChange: (v: string) => void; onOpen: () => void; onClear: () => void;
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
          className="w-full h-[32px] px-[12px] pr-[64px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
          style={{ fontWeight: 350 }}
        />
        {value && (
          <button type="button" onClick={onClear} className="absolute right-[36px] w-[24px] h-[24px] flex items-center justify-center text-[#7c808c] hover:text-[#1c1c1c] transition-colors">
            <X size={14} />
          </button>
        )}
        <button type="button" onClick={onOpen} className="absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] bg-white hover:bg-[#f5f7fa] flex items-center justify-center text-[#01579b] transition-colors">
          <Search size={14} />
        </button>
      </div>
    </div>
  );
}

// ── ERP Checkbox ──────────────────────────────────────────
function ErpCheckbox({ label, checked, onChange, tooltip }: { label: string; checked: boolean; onChange: (v: boolean) => void; tooltip?: string }) {
  return (
    <label className="flex items-center gap-[8px] cursor-pointer select-none" onClick={() => onChange(!checked)}>
      <div className={`flex items-center justify-center w-[16px] h-[16px] rounded-[3px] border transition-colors shrink-0 ${checked ? 'bg-[#0078d4] border-[#0078d4]' : 'bg-white border-[#7c808c]'}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>{label}</span>
      {tooltip && (
        <CwTooltip content={tooltip} placement="top">
          <Info className="w-[16px] h-[16px] text-[#7c808c] cursor-help shrink-0" />
        </CwTooltip>
      )}
    </label>
  );
}

// ── 主元件 ───────────────────────────────────────────────
export function NewPMOrderManagement() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchForm, setSearchForm] = useState<Record<string, any>>({
    // ── 常用欄位
    '訂單編號': "", '來源編號': "", '方案代碼': "",
    '會員email': "", '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單狀態_基本': "", '訂單類型': "", '建單法人': "",
    // ── 進階：時間區間
    'adv_訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    'adv_訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    // ── 進階：單號查詢
    '訂單編號起': "", '訂單編號迄': "",
    '來源單號起': "", '來源單號迄': "",
    '流程單號起': "", '流程單號迄': "",
    '異動單號': "",
    // ── 進階：客戶與收件人身分
    '訂單客戶編號': "", '訂單客戶名稱': "",
    '付款客戶編號': "", '付款客戶名稱': "",
    '發票客戶編號': "", '發票客戶名稱': "",
    '出貨客戶編號': "", '出貨客戶名稱': "",
    'adv_出貨收件人': "", 'adv_統一編號': "",
    'adv_會員帳號': "", '會員名稱': "", '會員Email': "", 'adv_會員手機': "",
    '出貨收件人Email': "", '出貨收件人手機': "", '出貨地址': "", '出貨收件人市話': "",
    // ── 進階：商品資訊
    '產品料號': "", '產品名稱': "",
    // ── 進階：行銷與業務
    'adv_方案代碼': "", '方案名稱': "",
    '行銷追蹤碼': "", '行銷追蹤碼名稱': "",
    '通路代碼': "", '通路名稱': "",
    '業務員代碼': "", '業務員名稱': "",
    // ── 進階：狀態、備註與其他條件
    '訂單狀態': "",
    'adv_出貨備註': "", 'adv_訂單備註': "",
    'OMG訂單類型': "", 'adv_出貨方式': "",
    'adv_暫停處理': "N", 'adv_是否為贈閱單': "",
    '發票號碼': "",
    'adv_來源系統': "",
    'adv_建單法人': "", 'adv_建單人員': "",
    'adv_付款方式': "", 'adv_付款狀態': "",
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayCount, setDisplayCount] = useState(10); // 無限滾動：初始顯示10筆
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 無限滾動: 加載狀態
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderType, setSelectedOrderType] = useState<'service' | 'erp' | 'omg'>('erp');
  const [selectedOrderRecord, setSelectedOrderRecord] = useState<UnifiedOrderData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [copyInitialData, setCopyInitialData] = useState<Partial<import('./OMGOrderHeader').OMGOrderHeaderData> | undefined>(undefined);

  // 訂單類型 checkbox
  const [showServiceOrders, setShowServiceOrders] = useState(true);
  const [showErpOrders, setShowErpOrders] = useState(true);
  const [showOmgOrders, setShowOmgOrders] = useState(true);
  const [showStatusLegend, setShowStatusLegend] = useState(false);

  // 欄位顯示 filter
  const [columnFilters, setColumnFilters] = useState<Record<string, boolean>>({
    '通路代碼': true, 'OMG訂單類型': false, '訂單金額': true, '訂單狀態': true,
    '行銷追蹤碼': false, '來源單號': false, '流程單號': false, '訂閱起期': false, '訂閱迄期': false,
    '方案代碼': false, '方案名稱': false, '數量': false, '品項金額': false, '業務員名': false,
    '暫止原因': false, '發行出貨': false, '舊訂閱起期': false, '舊訂閱迄期': false,
    '付款客戶編號': false, '付款客戶名稱': false, '出貨客戶編號': false,
    '出貨收件人': false, '出貨地址': false, '郵遞區號': false, '出貨國別': false,
    '出貨方式': false, '出貨客戶手機': false, '出貨客戶Email': false, '付款方式': false, '付款狀態': false,
  });
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [pendingColumnFilters, setPendingColumnFilters] = useState<Record<string, boolean>>({ ...columnFilters });
  const tableContainerRef = useRef<HTMLDivElement>(null); // 表格容器 ref，用於無限滾動

  // 統一客戶彈窗 state
  type CustomerPopupTarget = { codeKey: string; nameKey: string; title: string } | null;
  const [activeCustomerPopup, setActiveCustomerPopup] = useState<CustomerPopupTarget>(null);
  const [customerPopupKeyword, setCustomerPopupKeyword] = useState('');
  const customerPopupRef = useRef<HTMLDivElement>(null);

  // 產品彈窗 state
  const [activeProductPopup, setActiveProductPopup] = useState<'code' | 'name' | null>(null);
  const [productPopupKeyword, setProductPopupKeyword] = useState('');
  const productPopupRef = useRef<HTMLDivElement>(null);

  // 方案彈窗 state
  const [activePlanPopup, setActivePlanPopup] = useState<'code' | 'name' | null>(null);
  const [planPopupKeyword, setPlanPopupKeyword] = useState('');
  const planPopupRef = useRef<HTMLDivElement>(null);

  // 出貨方式彈窗 state
  const [activeShippingPopup, setActiveShippingPopup] = useState(false);
  const [shippingPopupKeyword, setShippingPopupKeyword] = useState('');
  const shippingPopupRef = useRef<HTMLDivElement>(null);

  const [activeTrackingCodePopup, setActiveTrackingCodePopup] = useState(false);
  const [trackingCodePopupKeyword, setTrackingCodePopupKeyword] = useState('');
  const trackingCodePopupRef = useRef<HTMLDivElement>(null);

  const [activeEmployeePopup, setActiveEmployeePopup] = useState(false);
  const [employeePopupKeyword, setEmployeePopupKeyword] = useState('');
  const employeePopupRef = useRef<HTMLDivElement>(null);

  // 有全螢幕 overlay 的 popup 開啟時，鎖定 body 捲動
  useEffect(() => {
    const anyOpen = showColumnFilter || !!activeCustomerPopup || !!activePlanPopup || activeShippingPopup || !!activeProductPopup || activeTrackingCodePopup || activeEmployeePopup;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showColumnFilter, activeCustomerPopup, activePlanPopup, activeShippingPopup, activeProductPopup]);

  // ERP 專屬核取方塊
  const [erpPrint, setErpPrint] = useState(false);
  const [erpDigital, setErpDigital] = useState(false);
  const [erpUnresolved, setErpUnresolved] = useState(false);
  const [erpShowDetail, setErpShowDetail] = useState(true);
  const [erpQueryNote, setErpQueryNote] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);

  // 開啟欄位篩選 popup 時同步 pending 狀態
  const openColumnFilter = () => {
    setPendingColumnFilters({ ...columnFilters });
    setShowColumnFilter(true);
  };

  // 快捷鍵：Command+O 開合進階篩選、Enter 執行查詢
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Command/Ctrl+O：開合進階篩選
      if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
        e.preventDefault();
        setShowAdvanced(prev => !prev);
      }
      // Enter：執行查詢（但在 textarea 中除外）
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement;
        // 如果不在 textarea 中，則執行查詢
        if (target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleSearch();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // 統一關閉彈窗（點擊外部）
  useEffect(() => {
    const anyOpen = !!activeCustomerPopup || !!activeProductPopup || !!activePlanPopup || activeShippingPopup;
    if (!anyOpen) return;
    const handler = (e: MouseEvent) => {
      if (activeCustomerPopup && customerPopupRef.current && !customerPopupRef.current.contains(e.target as Node)) {
        setActiveCustomerPopup(null); setCustomerPopupKeyword('');
      }
      if (activeProductPopup && productPopupRef.current && !productPopupRef.current.contains(e.target as Node)) {
        setActiveProductPopup(null); setProductPopupKeyword('');
      }
      if (activePlanPopup && planPopupRef.current && !planPopupRef.current.contains(e.target as Node)) {
        setActivePlanPopup(null); setPlanPopupKeyword('');
      }
      if (activeShippingPopup && shippingPopupRef.current && !shippingPopupRef.current.contains(e.target as Node)) {
        setActiveShippingPopup(false); setShippingPopupKeyword('');
      }
      if (activeTrackingCodePopup && trackingCodePopupRef.current && !trackingCodePopupRef.current.contains(e.target as Node)) {
        setActiveTrackingCodePopup(false); setTrackingCodePopupKeyword('');
      }
      if (activeEmployeePopup && employeePopupRef.current && !employeePopupRef.current.contains(e.target as Node)) {
        setActiveEmployeePopup(false); setEmployeePopupKeyword('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activeCustomerPopup, activeProductPopup, activePlanPopup, activeShippingPopup, activeTrackingCodePopup, activeEmployeePopup]);

  // 客戶搜尋過濾（統一）
  const filteredCustomersByPopup = customerPopupKeyword
    ? mockCustomerCodes.filter(
        (c) =>
          c.code.toLowerCase().includes(customerPopupKeyword.toLowerCase()) ||
          c.name.toLowerCase().includes(customerPopupKeyword.toLowerCase())
      )
    : mockCustomerCodes;

  // 選擇客戶（通用，同時填入 code + name）
  const handleSelectCustomer = (code: string, name: string) => {
    if (!activeCustomerPopup) return;
    handleInputChange(activeCustomerPopup.codeKey, code);
    handleInputChange(activeCustomerPopup.nameKey, name);
    setActiveCustomerPopup(null);
    setCustomerPopupKeyword('');
  };

  // 產品搜尋過濾
  const filteredProducts = productPopupKeyword
    ? mockProductCodes.filter(
        (p) =>
          p.code.toLowerCase().includes(productPopupKeyword.toLowerCase()) ||
          p.name.toLowerCase().includes(productPopupKeyword.toLowerCase())
      )
    : mockProductCodes;

  // 選擇產品（同時填入料號 + 名稱）
  const handleSelectProduct = (code: string, name: string) => {
    handleInputChange('產品料號', code);
    handleInputChange('產品名稱', name);
    setActiveProductPopup(null);
    setProductPopupKeyword('');
  };

  // 方案搜尋過濾
  const filteredPlans = planPopupKeyword
    ? mockPromotionCodes.filter(
        (p) =>
          p.code.toLowerCase().includes(planPopupKeyword.toLowerCase()) ||
          p.description.toLowerCase().includes(planPopupKeyword.toLowerCase())
      )
    : mockPromotionCodes;

  // 出貨方式搜尋過濾
  const filteredShippingMethods = shippingPopupKeyword
    ? mockShippingMethods.filter(
        (s) =>
          s.code.includes(shippingPopupKeyword) ||
          s.name.toLowerCase().includes(shippingPopupKeyword.toLowerCase())
      )
    : mockShippingMethods;

  const handleSelectShipping = (code: string, name: string) => {
    handleInputChange('adv_出貨方式', `${code}-${name}`);
    setActiveShippingPopup(false);
    setShippingPopupKeyword('');
  };

  const filteredEmployeesByPopup = employeePopupKeyword
    ? mockEmployees.filter(
        (e) =>
          e.code.includes(employeePopupKeyword) ||
          e.name.toLowerCase().includes(employeePopupKeyword.toLowerCase())
      )
    : mockEmployees;

  const handleSelectEmployee = (code: string, name: string) => {
    handleInputChange('業務員代碼', code);
    handleInputChange('業務員名稱', name);
    setActiveEmployeePopup(false);
    setEmployeePopupKeyword('');
  };

  const filteredTrackingCodesByPopup = trackingCodePopupKeyword
    ? mockTrackingCodes.filter(
        (t) =>
          t.code.includes(trackingCodePopupKeyword) ||
          t.name.toLowerCase().includes(trackingCodePopupKeyword.toLowerCase())
      )
    : mockTrackingCodes;

  const handleSelectTrackingCode = (code: string, name: string) => {
    handleInputChange('行銷追蹤碼', code);
    handleInputChange('行銷追蹤碼名稱', name);
    setActiveTrackingCodePopup(false);
    setTrackingCodePopupKeyword('');
  };

  // 選擇方案（同時填入代碼 + 名稱）
  const handleSelectPlan = (code: string, name: string) => {
    handleInputChange('adv_方案代碼', code);
    handleInputChange('方案名稱', name);
    setActivePlanPopup(null);
    setPlanPopupKeyword('');
  };

  const handleInputChange = (field: string, value: any) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const emptyClearForm = {
    '訂單編號': "", '來源編號': "", '方案代碼': "",
    '會員email': "", '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單狀態_基本': "", '訂單類型': "", '建單法人': "",
    'adv_訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    'adv_訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單編號起': "", '訂單編號迄': "",
    '來源單號起': "", '來源單號迄': "",
    '流程單號起': "", '流程單號迄': "",
    '異動單號': "",
    '訂單客戶編號': "", '訂單客戶名稱': "",
    '付款客戶編號': "", '付款客戶名稱': "",
    '發票客戶編號': "", '發票客戶名稱': "",
    '出貨客戶編號': "", '出貨客戶名稱': "",
    'adv_出貨收件人': "", 'adv_統一編號': "",
    'adv_會員帳號': "", '會員名稱': "", '會員Email': "", 'adv_會員手機': "",
    '出貨收件人Email': "", '出貨收件人手機': "", '出貨地址': "", '出貨收件人市話': "",
    '產品料號': "", '產品名稱': "",
    'adv_方案代碼': "", '方案名稱': "",
    '行銷追蹤碼': "", '行銷追蹤碼名稱': "",
    '通路代碼': "", '通路名稱': "",
    '業務員代碼': "", '業務員名稱': "",
    '訂單狀態': "",
    'adv_出貨備註': "", 'adv_訂單備註': "",
    'OMG訂單類型': "", 'adv_出貨方式': "",
    'adv_暫停處理': "N", 'adv_是否為贈閱單': "",
    '發票號碼': "",
    'adv_來源系統': "",
    'adv_建單法人': "", 'adv_建單人員': "",
    'adv_付款方式': "", 'adv_付款狀態': "",
  };

  const handleClear = () => {
    setSearchForm(emptyClearForm);
    setErpPrint(false);
    setErpDigital(false);
    setErpUnresolved(false);
    setErpShowDetail(false);
    setErpQueryNote(false);
    setHasSearched(false);
    setDisplayCount(10);
    setIsLoadingMore(false);
  };

  const handleSearch = () => {
    setHasSearched(true);
    setCurrentPage(1);
    setDisplayCount(10);
    setIsLoadingMore(false);
  };

  const handleView = (record: UnifiedOrderData) => {
    setSelectedOrderId(record.id);
    setSelectedOrderType('erp');
    setSelectedOrderRecord(record);
    setShowDetail(true);
  };

  const handleCopy = (record: UnifiedOrderData) => {
    setCopyInitialData({
      legalEntity: record.legalEntity?.split(' ')[0] ?? '',
      channelCode: record.sourceCode ?? '',
      salesperson: record.salesPerson ?? '',
      processNumber: record.processOrderNumber ?? '',
      sourceNumber: record.sourceOrderNumber ?? '',
      omgOrderType: record.omgOrderType ?? '訂單',
    });
    setShowCreate(true);
  };

  // ── 動態欄位 ────────────────────────────────────────────
  const buildColumns = (): CwTableColumn<UnifiedOrderData>[] => {
    const cols: CwTableColumn<UnifiedOrderData>[] = [];

    // ── 常駐欄位 ────────────────────────────────────────
    cols.push({ key: 'legalEntity', title: '法人', width: '60px', stickyLeft: true, render: (_, r) => r.legalEntity.replace(/^\d+\s*/, '') });
    cols.push({ key: 'sourceSystem', title: '來源系統', width: '90px', stickyLeft: true });
    cols.push({ key: 'orderNumber', title: '訂單編號', width: '130px', stickyLeft: true });
    cols.push({ key: 'lineNo', title: '#行號', width: '64px', align: 'center', stickyLeft: true });

    if (columnFilters['行銷追蹤碼']) cols.push({ key: 'trackingCode', title: '行銷追蹤碼', width: '100px' });
    if (columnFilters['來源單號']) cols.push({ key: 'sourceOrderNumber', title: '來源單號', width: '130px' });
    if (columnFilters['流程單號']) cols.push({ key: 'processOrderNumber', title: '流程單號', width: '130px' });

    cols.push({ key: 'orderDate', title: '訂單日期', width: '110px' });
    if (columnFilters['OMG訂單類型']) cols.push({ key: 'omgOrderType', title: 'OMG訂單類型', width: '100px' });

    if (columnFilters['訂閱起期']) cols.push({ key: 'orderStartDate', title: '訂閱起期', width: '110px', render: (_, r) => {
      if (!erpShowDetail) return '';
      const hasPeriod = r.planName.includes('雜誌') && r.startPeriod;
      return (
        <span className="flex flex-col items-start gap-[2px]">
          {hasPeriod && <span className="inline-block px-[5px] py-[1px] rounded-[4px] text-[11px]" style={{ background: '#f0f0f0', color: '#6b7280' }}>{r.startPeriod} 期</span>}
          <span>{r.orderStartDate}</span>
        </span>
      );
    } });
    if (columnFilters['訂閱迄期']) cols.push({ key: 'orderEndDate', title: '訂閱迄期', width: '110px', render: (_, r) => {
      if (!erpShowDetail) return '';
      const hasPeriod = r.planName.includes('雜誌') && r.endPeriod;
      return (
        <span className="flex flex-col items-start gap-[2px]">
          {hasPeriod && <span className="inline-block px-[5px] py-[1px] rounded-[4px] text-[11px]" style={{ background: '#f0f0f0', color: '#6b7280' }}>{r.endPeriod} 期</span>}
          <span>{r.orderEndDate}</span>
        </span>
      );
    } });

    if (columnFilters['方案代碼']) cols.push({ key: 'planCode', title: '方案代碼', width: '110px' });
    if (columnFilters['方案名稱']) cols.push({ key: 'planName', title: '方案名稱', width: '160px' });

    cols.push({ key: 'productCode', title: '產品料號', width: '110px', render: (_, r) => erpShowDetail ? r.productCode : '' });
    cols.push({ key: 'productName', title: '產品名稱', width: '180px', render: (_, r) => erpShowDetail ? r.productName : '' });

    if (columnFilters['數量']) cols.push({ key: 'quantity', title: '數量', width: '64px', align: 'right', render: (_, r) => erpShowDetail && r.quantity ? String(r.quantity) : '' });
    if (columnFilters['品項金額']) cols.push({ key: 'itemAmount', title: '品項金額', width: '100px', align: 'right', render: (_, r) => erpShowDetail && r.itemAmount ? `NT$ ${r.itemAmount.toLocaleString()}` : '' });

    if (columnFilters['訂單金額']) cols.push({ key: 'orderAmount', title: '訂單金額', width: '110px', align: 'right', render: (v) => (v as number) > 0 ? `NT$ ${(v as number).toLocaleString()}` : '' });


    if (columnFilters['通路代碼']) cols.push({
      key: 'sourceCode', title: '通路代碼', width: '120px',
      render: (_, r) => r.sourceCode ? (
        <CwTooltip content={SOURCE_CODE_LABEL_MAP[r.sourceCode] ?? r.sourceCode} placement="top">
          <span className="inline-block px-[5px] py-[1px] rounded-[4px] text-[11px] font-[500] cursor-default" style={getSourceCodeStyle(r.sourceCode)}>{r.sourceCode}</span>
        </CwTooltip>
      ) : null,
    });

    if (columnFilters['業務員名']) cols.push({ key: 'salesPerson', title: '業務員名', width: '90px' });

    if (columnFilters['訂單狀態']) cols.push({
      key: 'orderStatus', title: '訂單狀態', width: '120px', align: 'center',
      titleRender: (
        <>
          <span
            className="whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-500)',
              lineHeight: '19.6px',
              color: '#1c1c1c',
            }}
          >
            訂單狀態
          </span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowStatusLegend(true); }}
            className="flex items-center text-[#7c808c] hover:text-[#0078d4] transition-colors"
            aria-label="訂單狀態圖示說明"
          >
            <Info className="w-[16px] h-[16px]" />
          </button>
        </>
      ),
      render: (_, r) => {
        const cfg = ORDER_STATUS_COLORS[r.orderStatus];
        return cfg ? (
          <span className="inline-block px-[8px] py-[2px] rounded-[5px] text-[12px] font-[500]" style={{ background: cfg.tagBg, color: cfg.tagColor }}>
            {r.orderStatus}
          </span>
        ) : null;
      },
    });

    if (erpQueryNote) cols.push({ key: 'orderNote', title: '訂單備註', width: '180px' });

    if (columnFilters['暫止原因']) {
      cols.push({ key: 'isPaused', title: '暫停處理', width: '80px', align: 'center', render: (v: any) => (
        <span className="flex justify-center">
          {v === 'Y' ? <Check size={16} color="#15803d" strokeWidth={2.5} /> : <X size={15} color="#dc2626" strokeWidth={2.5} />}
        </span>
      ) });
      cols.push({ key: 'pauseReason', title: '暫止原因', width: '160px' });
    }
    if (columnFilters['發行出貨']) cols.push({ key: 'publishShipping', title: '發行出貨', width: '90px' });
    if (columnFilters['舊訂閱起期']) cols.push({ key: 'oldStartDate', title: '舊訂閱起期', width: '110px' });
    if (columnFilters['舊訂閱迄期']) cols.push({ key: 'oldEndDate', title: '舊訂閱迄期', width: '110px' });
    if (columnFilters['付款客戶編號']) cols.push({ key: 'paymentCustomerNumber', title: '付款客戶編號', width: '120px' });
    if (columnFilters['付款客戶名稱']) cols.push({ key: 'paymentCustomerName', title: '付款客戶名稱', width: '120px' });
    if (columnFilters['出貨客戶編號']) cols.push({ key: 'shippingCustomerNumber', title: '出貨客戶編號', width: '120px' });

    cols.push({ key: 'shippingCustomerName', title: '出貨客戶名稱', width: '120px' });

    if (columnFilters['出貨收件人']) cols.push({ key: 'recipient', title: '出貨收件人', width: '100px' });
    if (columnFilters['出貨地址']) cols.push({ key: 'shippingCustomerAddress', title: '出貨地址', width: '200px' });
    if (columnFilters['郵遞區號']) cols.push({ key: 'postalCode', title: '郵遞區號', width: '80px' });
    if (columnFilters['出貨國別']) cols.push({ key: 'shippingCountry', title: '出貨國別', width: '80px' });
    if (columnFilters['出貨方式']) cols.push({ key: 'shippingMethod', title: '出貨方式', width: '140px' });
    if (columnFilters['出貨客戶手機']) cols.push({ key: 'shippingMobile', title: '出貨客戶手機', width: '120px' });
    if (columnFilters['出貨客戶Email']) cols.push({ key: 'shippingEmail', title: '出貨客戶Email', width: '160px' });
    if (columnFilters['付款方式']) cols.push({ key: 'paymentMethod', title: '付款方式', width: '100px' });
    if (columnFilters['付款狀態']) cols.push({ key: 'paymentStatus', title: '付款狀態', width: '90px' });

    cols.push({
      key: 'actions' as any, title: '功能', width: '96px', align: 'center',
      sticky: true,
      render: (_, r) => (
        <div className="flex items-center justify-center gap-[4px]">
          <CwRoundButton icon={isEditMode ? "edit" : "view"} onClick={() => handleView(r)} title={isEditMode ? "編輯" : "檢視"} />
          {isEditMode && <CwRoundButton icon="copy" onClick={() => handleCopy(r)} title="複製新增" />}
        </div>
      ),
    });

    return cols;
  };

  // 合併並過濾訂單（多來源訂單：只要有任一來源被勾選即顯示）
  const isOrderVisible = (o: UnifiedOrderData) => {
    const sources = o.type;
    return (
      (showServiceOrders && sources.includes('service')) ||
      (showErpOrders     && sources.includes('erp'))     ||
      (showOmgOrders     && sources.includes('omg'))
    );
  };
  const allOrders: UnifiedOrderData[] = hasSearched
    ? [mockServiceOrders[0], mockOmgOrders[0], mockErpOrders[0], ...mockServiceOrders.slice(1), ...mockOmgOrders.slice(1), ...mockErpOrders.slice(1)].filter(isOrderVisible)
    : [];

  const filteredOrders = searchKeyword
    ? allOrders.filter(o =>
        Object.values(o).some(v =>
          String(v).toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : allOrders;

  // 上一筆 / 下一筆（以 filteredOrders 為基準，需在其宣告後定義）
  const handleDetailPrevious = () => {
    if (!selectedOrderRecord) return;
    const idx = filteredOrders.findIndex((o) => o.id === selectedOrderRecord.id);
    if (idx > 0) {
      const prev = filteredOrders[idx - 1];
      setSelectedOrderId(prev.id);
      setSelectedOrderType('erp');
      setSelectedOrderRecord(prev);
    }
  };

  const handleDetailNext = () => {
    if (!selectedOrderRecord) return;
    const idx = filteredOrders.findIndex((o) => o.id === selectedOrderRecord.id);
    if (idx < filteredOrders.length - 1) {
      const next = filteredOrders[idx + 1];
      setSelectedOrderId(next.id);
      setSelectedOrderType('erp');
      setSelectedOrderRecord(next);
    }
  };

  const currentDetailIndex = selectedOrderRecord
    ? filteredOrders.findIndex((o) => o.id === selectedOrderRecord.id)
    : -1;

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  // 無限滾動：直接返回前 displayCount 筆記錄
  const pagedOrders = filteredOrders.slice(0, displayCount);

  // 表格無限滾動事件監聽
  useEffect(() => {
    if (!tableContainerRef.current || isLoadingMore) return;
    const container = tableContainerRef.current;
    
    const handler = () => {
      // 檢測是否滾到底部 (距離底部 < 100px 時載入更多)
      if (container.scrollHeight - (container.scrollTop + container.clientHeight) < 100 && displayCount < filteredOrders.length) {
        // 設置為加載中，2秒後設置成完成
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayCount(prev => Math.min(prev + 10, filteredOrders.length));
          setIsLoadingMore(false);
        }, 2000);
      }
    };
    
    container.addEventListener('scroll', handler);
    return () => container.removeEventListener('scroll', handler);
  }, [filteredOrders.length, displayCount, isLoadingMore]);

  const activeColumnFilterCount = COLUMN_FILTER_OPTIONS.filter((option) => columnFilters[option]).length;
  const hasAnyColumnFilter = activeColumnFilterCount > 0;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "訂單管理", href: "/orders" },
    { label: "訂單查詢" },
  ];

  if (showCreate) {
    return <CreatePMOrder onClose={() => { setShowCreate(false); setCopyInitialData(undefined); }} initialHeaderData={copyInitialData} />;
  }

  // 如果顯示詳情，返回訂單詳情組件
  if (showDetail) {
    return (
      <PMOrderDetail
        orderId={selectedOrderId ? parseInt(selectedOrderId.replace(/\D/g, '')) || undefined : undefined}
        orderType={selectedOrderType}
        orderTypes={selectedOrderRecord?.type}
        orderHeaderInfo={selectedOrderRecord ? {
          sourceSystem:      selectedOrderRecord.sourceSystem,
          orderNumber:       selectedOrderRecord.orderNumber,
          sourceOrderNumber: selectedOrderRecord.sourceOrderNumber,
          orderDate:         selectedOrderRecord.orderDate,
          omgOrderType:      selectedOrderRecord.sourceProduct,
          omgStatus:         selectedOrderRecord.omgStatus,
          omgOrderNote:      selectedOrderRecord.orderNote,
          legalEntity:       selectedOrderRecord.legalEntity,
        } : undefined}
        initialEditMode={isEditMode}
        onClose={() => setShowDetail(false)}
      />
    );
  }

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <div className="flex items-center">
        <CwTitle
          title="訂單查詢"
          breadcrumbs={breadcrumbs}
          titleRight={
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
          }
        />
      </div>

      <form className="bg-white space-y-[16px]" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>

        {/* ── 常用欄位 ── */}
        <div className="space-y-[12px] border-b border-gray-200 pb-[20px]">
          <div className="grid grid-cols-8 gap-[12px] items-end">
            <CwInput label="訂單編號 起" placeholder="訂單編號 起" value={searchForm['訂單編號起']} onChange={(e) => handleInputChange('訂單編號起', e.target.value)} />
            <CwInput label="來源單號 起" placeholder="來源單號 起" value={searchForm['來源單號起']} onChange={(e) => handleInputChange('來源單號起', e.target.value)} />
            <CwInput label="流程單號 起" placeholder="流程單號 起" value={searchForm['流程單號起']} onChange={(e) => handleInputChange('流程單號起', e.target.value)} />
            <PopupSearchInput label="出貨客戶編號" value={searchForm['出貨客戶編號']} onChange={(v) => handleInputChange('出貨客戶編號', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '出貨客戶編號', nameKey: '出貨客戶名稱', title: '出貨客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('出貨客戶編號', '')} />
            <PopupSearchInput label="出貨客戶名稱" value={searchForm['出貨客戶名稱']} onChange={(v) => handleInputChange('出貨客戶名稱', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '出貨客戶編號', nameKey: '出貨客戶名稱', title: '出貨客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('出貨客戶名稱', '')} />
            <CwInput label="出貨地址" placeholder="出貨地址" value={searchForm['出貨地址']} onChange={(e) => handleInputChange('出貨地址', e.target.value)} />
            <CwInput label="出貨收件人市話" placeholder="出貨收件人市話" value={searchForm['出貨收件人市話']} onChange={(e) => handleInputChange('出貨收件人市話', e.target.value)} />
            <PopupSearchInput label="產品料號" value={searchForm['產品料號']} onChange={(v) => handleInputChange('產品料號', v)} onOpen={() => { setActiveProductPopup('code'); setProductPopupKeyword(''); }} onClear={() => handleInputChange('產品料號', '')} />
          </div>

          <div className="grid grid-cols-8 gap-[12px] items-center">
            <PopupSearchInput label="方案代碼" value={searchForm['adv_方案代碼']} onChange={(v) => handleInputChange('adv_方案代碼', v)} onOpen={() => { setActivePlanPopup('code'); setPlanPopupKeyword(''); }} onClear={() => handleInputChange('adv_方案代碼', '')} />
            <div className="col-span-6" />
            <div className="flex justify-end">
              <CwTooltip content={<>快捷鍵：<br />⌘ + O（Mac）<br />Ctrl + O（Windows）</>} placement="top">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-[4px] text-[#0078d4] text-[14px] font-[500] hover:opacity-80 whitespace-nowrap cursor-pointer"
                >
                  {showAdvanced ? <><ChevronUp size={16} />收起進階篩選</> : <><ChevronDown size={16} />展開進階篩選</>}
                </button>
              </CwTooltip>
            </div>
          </div>
        </div>

        {/* ── 進階篩選區 ── */}
        {showAdvanced && (
          <>
            {/* 時間區間 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>時間區間</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwDatePicker label="訂單起日" placeholder="訂單起日" value={searchForm['adv_訂單起日']} onChange={(v) => handleInputChange('adv_訂單起日', v)} />
                <CwDatePicker label="訂單迄日" placeholder="訂單迄日" value={searchForm['adv_訂單迄日']} onChange={(v) => handleInputChange('adv_訂單迄日', v)} />
              </div>
            </div>

            {/* 單號查詢 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>單號查詢</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwInput label="訂單編號 迄" placeholder="訂單編號 迄" value={searchForm['訂單編號迄']} onChange={(e) => handleInputChange('訂單編號迄', e.target.value)} onBlur={() => { if (!searchForm['訂單編號迄'] && searchForm['訂單編號起']) handleInputChange('訂單編號迄', searchForm['訂單編號起']); }} />
                <CwInput label="來源單號 迄" placeholder="來源單號 迄" value={searchForm['來源單號迄']} onChange={(e) => handleInputChange('來源單號迄', e.target.value)} onBlur={() => { if (!searchForm['來源單號迄'] && searchForm['來源單號起']) handleInputChange('來源單號迄', searchForm['來源單號起']); }} />
                <CwInput label="流程單號 迄" placeholder="流程單號 迄" value={searchForm['流程單號迄']} onChange={(e) => handleInputChange('流程單號迄', e.target.value)} onBlur={() => { if (!searchForm['流程單號迄'] && searchForm['流程單號起']) handleInputChange('流程單號迄', searchForm['流程單號起']); }} />
                <CwInput label="異動單號" placeholder="異動單號" value={searchForm['異動單號']} onChange={(e) => handleInputChange('異動單號', e.target.value)} />
              </div>
            </div>

            {/* 客戶與收件人身分 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>客戶與收件人身分</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <PopupSearchInput label="訂單客戶編號" value={searchForm['訂單客戶編號']} onChange={(v) => handleInputChange('訂單客戶編號', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '訂單客戶編號', nameKey: '訂單客戶名稱', title: '訂單客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('訂單客戶編號', '')} />
                <PopupSearchInput label="訂單客戶名稱" value={searchForm['訂單客戶名稱']} onChange={(v) => handleInputChange('訂單客戶名稱', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '訂單客戶編號', nameKey: '訂單客戶名稱', title: '訂單客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('訂單客戶名稱', '')} />
                <PopupSearchInput label="發票客戶編號" value={searchForm['發票客戶編號']} onChange={(v) => handleInputChange('發票客戶編號', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '發票客戶編號', nameKey: '發票客戶名稱', title: '發票客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('發票客戶編號', '')} />
                <PopupSearchInput label="發票客戶名稱" value={searchForm['發票客戶名稱']} onChange={(v) => handleInputChange('發票客戶名稱', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '發票客戶編號', nameKey: '發票客戶名稱', title: '發票客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('發票客戶名稱', '')} />
                <PopupSearchInput label="付款客戶編號" value={searchForm['付款客戶編號']} onChange={(v) => handleInputChange('付款客戶編號', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '付款客戶編號', nameKey: '付款客戶名稱', title: '付款客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('付款客戶編號', '')} />
                <PopupSearchInput label="付款客戶名稱" value={searchForm['付款客戶名稱']} onChange={(v) => handleInputChange('付款客戶名稱', v)} onOpen={() => { setActiveCustomerPopup({ codeKey: '付款客戶編號', nameKey: '付款客戶名稱', title: '付款客戶' }); setCustomerPopupKeyword(''); }} onClear={() => handleInputChange('付款客戶名稱', '')} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwInput label="出貨收件人" placeholder="出貨收件人" value={searchForm['adv_出貨收件人']} onChange={(e) => handleInputChange('adv_出貨收件人', e.target.value)} />
                <CwInput label="統一編號" placeholder="統一編號" value={searchForm['adv_統一編號']} onChange={(e) => handleInputChange('adv_統一編號', e.target.value)} />
                <CwInput label="會員帳號" placeholder="會員帳號" value={searchForm['adv_會員帳號']} onChange={(e) => handleInputChange('adv_會員帳號', e.target.value)} />
                <CwInput label="會員名稱" placeholder="會員名稱" value={searchForm['會員名稱']} onChange={(e) => handleInputChange('會員名稱', e.target.value)} />
                <CwInput label="會員Email" placeholder="會員Email" value={searchForm['會員Email']} onChange={(e) => handleInputChange('會員Email', e.target.value)} />
                <CwInput label="會員手機" placeholder="會員手機" value={searchForm['adv_會員手機']} onChange={(e) => handleInputChange('adv_會員手機', e.target.value)} />
                <CwInput label="出貨收件人Email" placeholder="出貨收件人Email" value={searchForm['出貨收件人Email']} onChange={(e) => handleInputChange('出貨收件人Email', e.target.value)} />
                <CwInput label="出貨收件人手機" placeholder="出貨收件人手機" value={searchForm['出貨收件人手機']} onChange={(e) => handleInputChange('出貨收件人手機', e.target.value)} />
              </div>
            </div>

            {/* 商品資訊 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>商品資訊</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <PopupSearchInput label="產品名稱" value={searchForm['產品名稱']} onChange={(v) => handleInputChange('產品名稱', v)} onOpen={() => { setActiveProductPopup('name'); setProductPopupKeyword(''); }} onClear={() => handleInputChange('產品名稱', '')} />
              </div>
            </div>

            {/* 行銷與業務 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>行銷與業務</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <PopupSearchInput label="方案名稱" value={searchForm['方案名稱']} onChange={(v) => handleInputChange('方案名稱', v)} onOpen={() => { setActivePlanPopup('name'); setPlanPopupKeyword(''); }} onClear={() => handleInputChange('方案名稱', '')} />
                <PopupSearchInput label="行銷追蹤碼" value={searchForm['行銷追蹤碼']} onChange={(v) => handleInputChange('行銷追蹤碼', v)} onOpen={() => { setActiveTrackingCodePopup(true); setTrackingCodePopupKeyword(''); }} onClear={() => { handleInputChange('行銷追蹤碼', ''); handleInputChange('行銷追蹤碼名稱', ''); }} />
                <CwInput label="行銷追蹤碼名稱" placeholder="行銷追蹤碼名稱" value={searchForm['行銷追蹤碼名稱']} onChange={(e) => handleInputChange('行銷追蹤碼名稱', e.target.value)} />
                <CwSelect label="通路代碼" placeholder="通路代碼" options={SOURCE_CODE_OPTIONS} searchable clearable value={searchForm['通路代碼']} onChange={(v) => handleInputChange('通路代碼', Array.isArray(v) ? v[0] ?? '' : v)} />
                <CwInput label="通路名稱" placeholder="通路名稱" value={searchForm['通路名稱']} onChange={(e) => handleInputChange('通路名稱', e.target.value)} />
                <PopupSearchInput label="業務員名" value={searchForm['業務員名稱'] || searchForm['業務員代碼']} onChange={(v) => handleInputChange('業務員名稱', v)} onOpen={() => { setActiveEmployeePopup(true); setEmployeePopupKeyword(''); }} onClear={() => { handleInputChange('業務員代碼', ''); handleInputChange('業務員名稱', ''); }} />
              </div>
            </div>

            {/* 狀態、備註與其他條件 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>狀態、備註與其他條件</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="訂單狀態" placeholder="訂單狀態" options={orderStatusOptions} searchable clearable value={searchForm['訂單狀態']} onChange={(v) => handleInputChange('訂單狀態', v)} />
                <CwInput label="出貨備註" placeholder="出貨備註" value={searchForm['adv_出貨備註']} onChange={(e) => handleInputChange('adv_出貨備註', e.target.value)} />
                <CwInput label="訂單備註" placeholder="訂單備註" value={searchForm['adv_訂單備註']} onChange={(e) => handleInputChange('adv_訂單備註', e.target.value)} />
                <CwSelect label="OMG訂單類型" placeholder="OMG訂單類型" options={OMG_ORDER_TYPE_OPTIONS} clearable value={searchForm['OMG訂單類型']} onChange={(v) => handleInputChange('OMG訂單類型', v)} />
                <PopupSearchInput label="出貨方式" value={searchForm['adv_出貨方式']} onChange={(v) => handleInputChange('adv_出貨方式', v)} onOpen={() => { setActiveShippingPopup(true); setShippingPopupKeyword(''); }} onClear={() => handleInputChange('adv_出貨方式', '')} />
                <CwSelect label="暫停處理" placeholder="暫停處理" options={[{ value: 'Y', label: '是' }, { value: 'N', label: '否' }]} clearable value={searchForm['adv_暫停處理']} onChange={(v) => handleInputChange('adv_暫停處理', v)} />
                <CwSelect label="是否為贈閱單" placeholder="是否為贈閱單" options={[{ value: 'Y', label: 'Y' }, { value: 'N', label: 'N' }]} clearable value={searchForm['adv_是否為贈閱單']} onChange={(v) => handleInputChange('adv_是否為贈閱單', v)} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwInput label="發票號碼" placeholder="發票號碼" value={searchForm['發票號碼']} onChange={(e) => handleInputChange('發票號碼', e.target.value)} />
                <CwSelect label="來源系統" placeholder="來源系統" options={SOURCE_SYSTEM_OPTIONS} searchable clearable value={searchForm['adv_來源系統']} onChange={(v) => handleInputChange('adv_來源系統', v)} />
                <CwSelect label="法人" placeholder="建單法人" options={legalEntityOptions} searchable clearable value={searchForm['adv_建單法人']} onChange={(v) => handleInputChange('adv_建單法人', v)} />
                <CwSelect label="建單人員" placeholder="建單人員" options={creatorOptions} searchable clearable value={searchForm['adv_建單人員']} onChange={(v) => handleInputChange('adv_建單人員', v)} />
                <CwSelect label="付款方式" placeholder="付款方式" options={paymentMethodOptions} searchable clearable value={searchForm['adv_付款方式']} onChange={(v) => handleInputChange('adv_付款方式', v)} />
                <CwSelect label="付款狀態" placeholder="付款狀態" options={paymentStatusOptions} searchable clearable value={searchForm['adv_付款狀態']} onChange={(v) => handleInputChange('adv_付款狀態', v)} />
              </div>
            </div>

            {/* ERP 專屬核取方塊 */}
            <div className="space-y-[12px] pt-[4px] pb-[20px]">
              <SectionLabel>ERP 專屬核取方塊</SectionLabel>
              <div className="flex flex-wrap gap-x-[32px] gap-y-[12px] items-center">
                <ErpCheckbox label="查紙本訂閱商品料號" checked={erpPrint} onChange={setErpPrint} tooltip="只顯示含「紙本」的訂單" />
                <ErpCheckbox label="查數位訂閱商品料號" checked={erpDigital} onChange={setErpDigital} tooltip="只顯示含「數位訂閱商品」的訂單" />
                <ErpCheckbox label="查未結案單" checked={erpUnresolved} onChange={setErpUnresolved} />
                <ErpCheckbox label="展示明細" checked={erpShowDetail} onChange={setErpShowDetail} />
                <ErpCheckbox label="查訂單備註" checked={erpQueryNote} onChange={setErpQueryNote} />
              </div>
            </div>
          </>
        )}

        {/* ── 底部按鈕 ── */}
        <div className="flex items-center justify-between pt-[4px]">
          <div>
            {isEditMode && <CwButton variant="primary" appearance="filled" leftIcon={<Plus size={14} />} onClick={() => setShowCreate(true)}>新增訂單</CwButton>}
          </div>
          <div className="flex item-center gap-[10px]">
            <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw size={14} />} onClick={handleClear}>清除</CwButton>
            <CwButton variant="primary" appearance="filled" type="submit">查詢</CwButton>
          </div>
        </div>
      </form>

      {/* ── 搜尋結果 ── */}
      {hasSearched && (
        <div className="space-y-[12px]">

          {/* 訂單類型 checkbox + 搜尋 + 欄位 filter */}
          <div className="flex items-center justify-between">
            {/* 左：訂單類型 checkbox（顏色與 table 標籤對應） */}
            <div className="flex items-center gap-[8px]">
              訂單來源：
              {/* 客服訂單 — 藍色 */}
              <label className="flex items-center gap-[8px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showServiceOrders}
                  onChange={(e) => { setShowServiceOrders(e.target.checked); setCurrentPage(1); }}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-[5px] border transition-colors shrink-0 ${showServiceOrders ? 'bg-[#0078d4] border-[#0078d4]' : 'bg-white border-[#7c808c]'}`}>
                  {showServiceOrders && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                
                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>中台</span>
              </label>


              {/* OMG 訂單 — 橘色 */}
              <label className="flex items-center gap-[8px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showOmgOrders}
                  onChange={(e) => { setShowOmgOrders(e.target.checked); setCurrentPage(1); }}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-[5px] border transition-colors shrink-0 ${showOmgOrders ? 'bg-[#0078d4] border-[#0078d4]' : 'bg-white border-[#7c808c]'}`}>
                  {showOmgOrders && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>

                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>OMG</span>
              </label>

              {/* ERP 訂單 — 紫色 */}
              <label className="flex items-center gap-[8px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showErpOrders}
                  onChange={(e) => { setShowErpOrders(e.target.checked); setCurrentPage(1); }}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-[5px] border transition-colors shrink-0 ${showErpOrders ? 'bg-[#0078d4] border-[#0078d4]' : 'bg-white border-[#7c808c]'}`}>
                  {showErpOrders && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                
                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>ERP </span>
              </label>
              <CwTooltip content="當 OMG 資料庫查無此訂單，系統自動調取 ERP 資料呈現" placement="bottom">
                <Info className="w-[16px] h-[16px] text-[#7c808c] cursor-help shrink-0" aria-label="ERP 訂單說明" />
              </CwTooltip>
            </div>

            {/* 右：搜尋 input + 欄位 filter */}
            <div className="flex items-center gap-[8px] overflow-visible">
              <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] whitespace-nowrap">搜尋：</label>
              <CwInput
                placeholder="輸入關鍵字過濾"
                value={searchKeyword}
                onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
                width="280px"
              />

              {/* 欄位顯示 filter button */}
              <div className="relative inline-flex overflow-visible">
                <button
                  onClick={openColumnFilter}
                  className={`flex items-center justify-center w-[35px] h-[35px] rounded-[4px] border transition-colors ${
                    hasAnyColumnFilter
                      ? 'bg-[#0078d4] border-[#0078d4] text-white'
                      : 'bg-white border-[#c4c9d3] text-[#1c1c1c] hover:border-[#0078d4]'
                  }`}
                >
                  <Filter size={16} />
                </button>
                {activeColumnFilterCount > 0 && (
                  <span
                    className="absolute top-[20px] -right-[8px] z-10 min-w-[20px] h-[20px] px-[4px] rounded-full bg-white text-[#0078d4] text-[10px] leading-[16px] text-center font-['Noto_Sans_TC',_sans-serif] shadow-[0_1px_3px_rgba(0,0,0,0.15)] pointer-events-none"
                    style={{ fontWeight: 500 }}
                  >
                    {activeColumnFilterCount}
                  </span>
                )}
              </div>

              {/* 欄位顯示 popup */}
              {showColumnFilter && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center" onClick={() => setShowColumnFilter(false)}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div
                    className="relative bg-white rounded-[8px] shadow-xl p-[20px] w-[560px]"
                    onClick={e => e.stopPropagation()}
                  >
                    <p className="text-[14px] text-[#1c1c1c] mb-[16px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 700 }}>欄位顯示設定</p>
                    <div className="grid grid-cols-3 gap-x-[16px] gap-y-[10px] mb-[20px]">
                      {COLUMN_FILTER_OPTIONS.map(option => (
                        <label key={option} className="flex items-center gap-[8px] cursor-pointer select-none">
                          <div
                            className={`flex items-center justify-center w-[18px] h-[18px] rounded-[4px] border shrink-0 transition-colors ${
                              pendingColumnFilters[option] ? 'bg-[#0078d4] border-[#0078d4]' : 'bg-white border-[#7c808c]'
                            }`}
                            onClick={() => setPendingColumnFilters(prev => ({ ...prev, [option]: !prev[option] }))}
                          >
                            {pendingColumnFilters[option] && (
                              <svg width="10" height="8" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )}
                          </div>
                          <span
                            className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]"
                            style={{ fontWeight: 350 }}
                            onClick={() => setPendingColumnFilters(prev => ({ ...prev, [option]: !prev[option] }))}
                          >{option}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-end gap-[8px]">
                      <button
                        onClick={() => setShowColumnFilter(false)}
                        className="px-[16px] h-[32px] rounded-[4px] border border-[#c4c9d3] text-[14px] text-[#1c1c1c] hover:bg-[#f5f7fa] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                        style={{ fontWeight: 350 }}
                      >取消</button>
                      <button
                        onClick={() => {
                          const allChecked = COLUMN_FILTER_OPTIONS.every(opt => pendingColumnFilters[opt]);
                          const next = Object.fromEntries(COLUMN_FILTER_OPTIONS.map(opt => [opt, !allChecked]));
                          setPendingColumnFilters(prev => ({ ...prev, ...next }));
                        }}
                        className="px-[16px] h-[32px] rounded-[4px] border border-[#c4c9d3] text-[14px] text-[#1c1c1c] hover:bg-[#f5f7fa] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                        style={{ fontWeight: 350 }}
                      >{COLUMN_FILTER_OPTIONS.every(opt => pendingColumnFilters[opt]) ? '全不選' : '全選'}</button>
                      <button
                        onClick={() => { setColumnFilters({ ...pendingColumnFilters }); setShowColumnFilter(false); }}
                        className="px-[16px] h-[32px] rounded-[4px] bg-[#0078d4] text-white text-[14px] hover:bg-[#106ebe] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                        style={{ fontWeight: 350 }}
                      >儲存</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table（水平可捲動 + 無限滾動） */}
          <div 
            ref={tableContainerRef}
            className="overflow-x-auto overflow-y-auto max-h-[600px] border border-[#e5e7eb] rounded-[4px]"
          >
            <CwTable
              columns={buildColumns()}
              dataSource={pagedOrders}
              rowKey="id"
              emptyText="沒有資料"
              stickyHeader
              rowStyle={(r) => {
                const cfg = ORDER_STATUS_COLORS[(r as UnifiedOrderData).orderStatus];
                return cfg ? { backgroundColor: cfg.rowBg } : {};
              }}
            />
            {/* 加載提示 */}
            {displayCount < filteredOrders.length && (
              <div className="text-center py-[16px] text-[13px] bg-[#f9fafb] border-t border-[#e5e7eb]">
                {isLoadingMore ? (
                  <span className="text-[#0078d4] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 500 }}>
                    載入中...
                  </span>
                ) : (
                  <span className="text-[#7c808c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                    滾動以加載更多... ({displayCount} / {filteredOrders.length})
                  </span>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      {/* 客戶搜尋 Popup（統一，8 個入口共用） */}
      {activeCustomerPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setActiveCustomerPopup(null); setCustomerPopupKeyword(''); }}>
          <div ref={customerPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[700px] max-h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇{activeCustomerPopup.title}</h3>
              <button onClick={() => { setActiveCustomerPopup(null); setCustomerPopupKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋客編或名稱" value={customerPopupKeyword} onChange={(e) => setCustomerPopupKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredCustomersByPopup.length > 0 ? filteredCustomersByPopup.map((c) => (
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

      {/* 產品搜尋 Popup */}
      {activeProductPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => { setActiveProductPopup(null); setProductPopupKeyword(''); }}>
          <div ref={productPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[600px] max-h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇產品</h3>
              <button onClick={() => { setActiveProductPopup(null); setProductPopupKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋產品料號或名稱" value={productPopupKeyword} onChange={(e) => setProductPopupKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">產品料號</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">產品名稱</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? filteredProducts.map((p) => (
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

      {/* 方案搜尋 Popup */}
      {activeShippingPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1100] flex items-center justify-center" onClick={() => { setActiveShippingPopup(false); setShippingPopupKeyword(''); }}>
          <div ref={shippingPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇出貨方式</h3>
              <button onClick={() => { setActiveShippingPopup(false); setShippingPopupKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋代碼或名稱" value={shippingPopupKeyword} onChange={(e) => setShippingPopupKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredShippingMethods.length > 0 ? filteredShippingMethods.map((s) => (
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

      {activePlanPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1100] flex items-center justify-center" onClick={() => { setActivePlanPopup(null); setPlanPopupKeyword(''); }}>
          <div ref={planPopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[640px] max-h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇方案</h3>
              <button onClick={() => { setActivePlanPopup(null); setPlanPopupKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋方案代碼或方案描述" value={planPopupKeyword} onChange={(e) => setPlanPopupKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">方案代碼</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">方案描述</th>
                    <th className="px-[16px] py-[12px] text-right text-[#7c808c] font-[500]">方案總金額</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlans.length > 0 ? filteredPlans.map((p) => (
                    <tr key={p.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{p.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{p.description}</td>
                      <td className="px-[16px] py-[12px] text-right text-[#1c1c1c]">{p.totalAmount.toLocaleString()}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectPlan(p.code, p.description)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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

      {/* 訂單狀態圖例 Popup */}
      {showStatusLegend && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center" onClick={() => setShowStatusLegend(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-white rounded-[8px] shadow-xl p-[20px] w-[280px]"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-[14px] text-[#1c1c1c] mb-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 700 }}>訂單狀態圖示</p>
            <div className="space-y-[8px]">
              {ORDER_STATUS_LEGEND.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-[10px] justify-center">
                  <span className="text-[13px] text-[#1c1c1c] w-[60px] text-right font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>{label}</span>
                  <div className="w-[40px] h-[22px] rounded-[3px]" style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-[16px]">
              <button
                type="button"
                onClick={() => setShowStatusLegend(false)}
                className="px-[16px] h-[32px] rounded-[4px] border border-[#c4c9d3] text-[14px] text-[#1c1c1c] hover:bg-[#f5f7fa] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              >關閉</button>
            </div>
          </div>
        </div>
      )}
      {activeEmployeePopup && (
        <div className="fixed inset-0 bg-black/40 z-[1100] flex items-center justify-center" onClick={() => { setActiveEmployeePopup(false); setEmployeePopupKeyword(''); }}>
          <div ref={employeePopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇業務員</h3>
              <button onClick={() => { setActiveEmployeePopup(false); setEmployeePopupKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋員工編號或姓名" value={employeePopupKeyword} onChange={(e) => setEmployeePopupKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredEmployeesByPopup.length > 0 ? filteredEmployeesByPopup.map((e) => (
                    <tr key={e.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{e.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{e.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectEmployee(e.code, e.name)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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

      {activeTrackingCodePopup && (
        <div className="fixed inset-0 bg-black/40 z-[1100] flex items-center justify-center" onClick={() => { setActiveTrackingCodePopup(false); setTrackingCodePopupKeyword(''); }}>
          <div ref={trackingCodePopupRef} className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇行銷追蹤碼</h3>
              <button onClick={() => { setActiveTrackingCodePopup(false); setTrackingCodePopupKeyword(''); }} className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"><X size={20} /></button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input type="text" placeholder="搜尋代碼或名稱" value={trackingCodePopupKeyword} onChange={(e) => setTrackingCodePopupKeyword(e.target.value)} autoFocus className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }} />
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
                  {filteredTrackingCodesByPopup.length > 0 ? filteredTrackingCodesByPopup.map((t) => (
                    <tr key={t.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{t.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{t.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button onClick={() => handleSelectTrackingCode(t.code, t.name)} className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors">選擇</button>
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

    </div>
  );
}

NewPMOrderManagement.displayName = 'NewPMOrderManagement';
