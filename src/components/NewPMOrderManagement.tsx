import { useState, useRef, useEffect } from "react";
import { RotateCcw, ChevronDown, ChevronUp, Filter, Info, Search, X } from "lucide-react";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwPagination } from "./CwPagination";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { StatusTag } from "./StatusTag";
import { PMOrderDetail } from "./PMOrderDetail";
import { CwDatePicker } from "./CwDatePicker";

// ── 統一訂單資料型別 ──────────────────────────────────────
interface UnifiedOrderData {
  id: string;
  type: ('service' | 'erp' | 'omg')[];
  // 基礎（常駐）
  sourceSystem: string;
  orderDate: string;
  sourceProduct: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  // 訂單明細
  orderNumber: string;
  orderStartDate: string;
  orderEndDate: string;
  orderAmount: number;
  // 未結案單
  isUnresolved: string;
  // 雜誌料號
  magazineCode: string;
  // 出貨客戶
  shippingCustomerNumber: string;
  shippingCustomerName: string;
  shippingCustomerAddress: string;
  shippingCustomerPhone: string;
  // 付款客戶
  paymentCustomerNumber: string;
  paymentCustomerName: string;
  paymentCustomerAddress: string;
  paymentCustomerPhone: string;
  // 訂單備註
  orderNote: string;
  // 方案相關
  planCode: string;
  planName: string;
  // 知識庫相關
  knowledgeStartDate: string;
  knowledgeEndDate: string;
  // 暫止相關
  isPaused: string;
  pauseReason: string;
  // 客戶資訊
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
  id: number;
  code: string;
  name: string;
  discount: string;
  startDate: string;
  endDate: string;
  description: string;
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

// ── 模擬資料 ─────────────────────────────────────────────
const mockServiceOrders: UnifiedOrderData[] = [
  {
    id: 's1', type: ['service'],
    sourceSystem: '天下', orderDate: '2025-01-15', sourceProduct: '天下雜誌年訂方案',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '止寄',
    orderNumber: 'CW2025010001', orderStartDate: '2025-01-15', orderEndDate: '2026-01-14', orderAmount: 2980,
    isUnresolved: 'N', magazineCode: 'GCV0001',
    shippingCustomerNumber: 'C001234', shippingCustomerName: '王小明', shippingCustomerAddress: '台北市中山區中山北路二段7號', shippingCustomerPhone: '02-25074855',
    paymentCustomerNumber: 'C001234', paymentCustomerName: '王小明', paymentCustomerAddress: '台北市中山區中山北路二段7號', paymentCustomerPhone: '02-25074855',
    orderNote: '',
    planCode: 'YS2025', planName: '天下年訂方案2025',
    knowledgeStartDate: '2025-01-15', knowledgeEndDate: '2026-01-14',
    isPaused: 'N', pauseReason: '',
    customerName: '王小明', customerMobile: '0912-111-222', customerPhone: '02-25074855', customerContact: '王小明', customerAddress: '台北市中山區中山北路二段7號', customerEmail: 'wangxm@example.com', customerTaxId: '',
  },
  {
    id: 's2', type: ['service'],
    sourceSystem: '親子', orderDate: '2025-01-18', sourceProduct: '親子天下半年訂閱',
    paymentMethod: 'ATM轉帳', paymentStatus: '待付款', orderStatus: '退訂',
    orderNumber: 'PK2025010023', orderStartDate: '2025-01-18', orderEndDate: '2025-07-17', orderAmount: 1490,
    isUnresolved: 'Y', magazineCode: 'PK0001',
    shippingCustomerNumber: 'C002345', shippingCustomerName: '李大華', shippingCustomerAddress: '新北市板橋區文化路一段188號', shippingCustomerPhone: '02-29538888',
    paymentCustomerNumber: 'C002345', paymentCustomerName: '李大華', paymentCustomerAddress: '新北市板橋區文化路一段188號', paymentCustomerPhone: '02-29538888',
    orderNote: '客戶要求暫停收刊',
    planCode: 'HS2025', planName: '親子天下半年訂閱2025',
    knowledgeStartDate: '', knowledgeEndDate: '',
    isPaused: 'Y', pauseReason: '客戶申請暫停',
    customerName: '李大華', customerMobile: '0933-222-333', customerPhone: '02-29538888', customerContact: '李大華', customerAddress: '新北市板橋區文化路一段188號', customerEmail: 'lidh@example.com', customerTaxId: '',
  },
  {
    id: 's3', type: ['service'],
    sourceSystem: '康健', orderDate: '2025-01-20', sourceProduct: '康健季訂方案',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '止寄',
    orderNumber: 'CH2025010045', orderStartDate: '2025-01-20', orderEndDate: '2025-04-19', orderAmount: 890,
    isUnresolved: 'N', magazineCode: 'CH0001',
    shippingCustomerNumber: 'C003456', shippingCustomerName: '陳美玲', shippingCustomerAddress: '台中市西屯區台灣大道三段99號', shippingCustomerPhone: '04-22580777',
    paymentCustomerNumber: 'C003456', paymentCustomerName: '陳美玲', paymentCustomerAddress: '台中市西屯區台灣大道三段99號', paymentCustomerPhone: '04-22580777',
    orderNote: '',
    planCode: 'QS2025', planName: '康健季訂方案2025',
    knowledgeStartDate: '2025-01-20', knowledgeEndDate: '2025-04-19',
    isPaused: 'N', pauseReason: '',
    customerName: '陳美玲', customerMobile: '0955-333-444', customerPhone: '04-22580777', customerContact: '陳美玲', customerAddress: '台中市西屯區台灣大道三段99號', customerEmail: 'chenml@example.com', customerTaxId: '',
  },
  {
    id: 's4', type: ['service'],
    sourceSystem: '天下', orderDate: '2025-01-22', sourceProduct: '天下雜誌數位版',
    paymentMethod: 'Line Pay', paymentStatus: '已付款', orderStatus: '正常',
    orderNumber: 'CW2025010067', orderStartDate: '2025-01-22', orderEndDate: '2026-01-21', orderAmount: 1980,
    isUnresolved: 'N', magazineCode: 'GCV0001',
    shippingCustomerNumber: '', shippingCustomerName: '', shippingCustomerAddress: '', shippingCustomerPhone: '',
    paymentCustomerNumber: 'C004567', paymentCustomerName: '張志遠', paymentCustomerAddress: '高雄市前鎮區中山三路6號', paymentCustomerPhone: '07-33335555',
    orderNote: '數位版無需出貨',
    planCode: 'DY2025', planName: '天下數位年訂2025',
    knowledgeStartDate: '2025-01-22', knowledgeEndDate: '2026-01-21',
    isPaused: 'N', pauseReason: '',
    customerName: '張志遠', customerMobile: '0966-444-555', customerPhone: '07-33335555', customerContact: '張志遠', customerAddress: '高雄市前鎮區中山三路6號', customerEmail: 'zhangzr@example.com', customerTaxId: '12345678',
  },
  {
    id: 's5', type: ['service'],
    sourceSystem: '親子', orderDate: '2025-01-25', sourceProduct: '',
    paymentMethod: '信用卡', paymentStatus: '未付款', orderStatus: '正常',
    orderNumber: 'PK2025010089', orderStartDate: '', orderEndDate: '', orderAmount: 3500,
    isUnresolved: 'Y', magazineCode: '',
    shippingCustomerNumber: 'C005678', shippingCustomerName: '林淑芬', shippingCustomerAddress: '台南市東區裕農路198號', shippingCustomerPhone: '06-23456789',
    paymentCustomerNumber: 'C005678', paymentCustomerName: '林淑芬', paymentCustomerAddress: '台南市東區裕農路198號', paymentCustomerPhone: '06-23456789',
    orderNote: '作廢原因：重複下單',
    planCode: '', planName: '',
    knowledgeStartDate: '', knowledgeEndDate: '',
    isPaused: 'N', pauseReason: '',
    customerName: '林淑芬', customerMobile: '0977-555-666', customerPhone: '06-23456789', customerContact: '林淑芬', customerAddress: '台南市東區裕農路198號', customerEmail: 'linsf@example.com', customerTaxId: '',
  },
];

const mockErpOrders: UnifiedOrderData[] = [
  {
    id: 'e1', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-05-12', sourceProduct: '天下雜誌1週',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '正常',
    orderNumber: '102862680', orderStartDate: '2025-05-14', orderEndDate: '2025-07-09', orderAmount: 380,
    isUnresolved: 'N', magazineCode: 'GCV00001',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', shippingCustomerPhone: '0912-345-678',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF', paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678',
    orderNote: '',
    planCode: 'GCV-W', planName: '天下雜誌週訂方案',
    knowledgeStartDate: '2025-05-14', knowledgeEndDate: '2025-07-09',
    isPaused: 'N', pauseReason: '',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '02-25551234', customerContact: 'JEFF', customerAddress: '台北市大同區民權西路103號', customerEmail: 'jeff@example.com', customerTaxId: '87654321',
  },
  {
    id: 'e2', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-06-12', sourceProduct: '',
    paymentMethod: '', paymentStatus: '', orderStatus: '正常',
    orderNumber: '52070730', orderStartDate: '', orderEndDate: '', orderAmount: 0,
    isUnresolved: 'Y', magazineCode: '',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF', shippingCustomerAddress: '', shippingCustomerPhone: '',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF', paymentCustomerAddress: '', paymentCustomerPhone: '',
    orderNote: '資料建置中',
    planCode: '', planName: '',
    knowledgeStartDate: '', knowledgeEndDate: '',
    isPaused: 'N', pauseReason: '',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '', customerContact: 'JEFF', customerAddress: '', customerEmail: 'jeff@example.com', customerTaxId: '',
  },
  {
    id: 'e3', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-06-09', sourceProduct: '天下雜誌 (2萬1)',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '復寄',
    orderNumber: '102862724', orderStartDate: '2025-06-09', orderEndDate: '2026-06-08', orderAmount: 21000,
    isUnresolved: 'N', magazineCode: 'KCAA00012',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', shippingCustomerPhone: '0912-345-678',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF', paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678',
    orderNote: '',
    planCode: 'KCAA-Y', planName: '天下雜誌年訂(2萬1)',
    knowledgeStartDate: '2025-06-09', knowledgeEndDate: '2026-06-08',
    isPaused: 'N', pauseReason: '',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '02-25551234', customerContact: 'JEFF', customerAddress: '台北市大同區民權西路103號', customerEmail: 'jeff@example.com', customerTaxId: '87654321',
  },
  {
    id: 'e4', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-06-09', sourceProduct: '',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '止寄',
    orderNumber: '102862724-2', orderStartDate: '2026-04-13', orderEndDate: '2027-04-28', orderAmount: 0,
    isUnresolved: 'N', magazineCode: 'GCV00025',
    shippingCustomerNumber: '1679128', shippingCustomerName: 'JEFF', shippingCustomerAddress: '台北市大同區民權西路103號', shippingCustomerPhone: '0912-345-678',
    paymentCustomerNumber: '1679128', paymentCustomerName: 'JEFF', paymentCustomerAddress: '台北市大同區民權西路103號', paymentCustomerPhone: '0912-345-678',
    orderNote: '',
    planCode: 'GCV-Y2', planName: '天下雜誌年訂方案二',
    knowledgeStartDate: '2026-04-13', knowledgeEndDate: '2027-04-28',
    isPaused: 'N', pauseReason: '',
    customerName: 'JEFF', customerMobile: '0912-345-678', customerPhone: '02-25551234', customerContact: 'JEFF', customerAddress: '台北市大同區民權西路103號', customerEmail: 'jeff@example.com', customerTaxId: '87654321',
  },
  {
    id: 'e5', type: ['erp'],
    sourceSystem: '親子', orderDate: '2025-02-14', sourceProduct: '親子天下月訂',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '輸入',
    orderNumber: '102862750', orderStartDate: '2025-02-14', orderEndDate: '2026-02-13', orderAmount: 5980,
    isUnresolved: 'N', magazineCode: 'PK00001',
    shippingCustomerNumber: '1679129', shippingCustomerName: '陳小芳', shippingCustomerAddress: '台中市中區自由路100號', shippingCustomerPhone: '04-22220123',
    paymentCustomerNumber: '1679129', paymentCustomerName: '陳小芳', paymentCustomerAddress: '台中市中區自由路100號', paymentCustomerPhone: '04-22220123',
    orderNote: '新增訂戶',
    planCode: 'PK-Y', planName: '親子天下年訂方案',
    knowledgeStartDate: '2025-02-14', knowledgeEndDate: '2026-02-13',
    isPaused: 'N', pauseReason: '',
    customerName: '陳小芳', customerMobile: '0922-456-789', customerPhone: '04-22220123', customerContact: '陳小芳', customerAddress: '台中市中區自由路100號', customerEmail: 'chen.xf@example.com', customerTaxId: '12345678',
  },
  {
    id: 'e6', type: ['erp'],
    sourceSystem: '康健', orderDate: '2025-03-10', sourceProduct: '康健雜誌季訂',
    paymentMethod: 'ATM轉帳', paymentStatus: '已付款', orderStatus: '復寄',
    orderNumber: '102862770', orderStartDate: '2025-03-10', orderEndDate: '2025-06-09', orderAmount: 2490,
    isUnresolved: 'N', magazineCode: 'CH00002',
    shippingCustomerNumber: '1679130', shippingCustomerName: '林建宏', shippingCustomerAddress: '高雄市前鎮區中華四路8號', shippingCustomerPhone: '07-33334444',
    paymentCustomerNumber: '1679130', paymentCustomerName: '林建宏', paymentCustomerAddress: '高雄市前鎮區中華四路8號', paymentCustomerPhone: '07-33334444',
    orderNote: '已出貨',
    planCode: 'CH-Q', planName: '康健季訂方案',
    knowledgeStartDate: '2025-03-10', knowledgeEndDate: '2025-06-09',
    isPaused: 'N', pauseReason: '',
    customerName: '林建宏', customerMobile: '0933-567-890', customerPhone: '07-33334444', customerContact: '林建宏', customerAddress: '高雄市前鎮區中華四路8號', customerEmail: 'lin.jh@example.com', customerTaxId: '98765432',
  },
  {
    id: 'e7', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-04-05', sourceProduct: '天下雜誌月訂',
    paymentMethod: '信用卡', paymentStatus: '未付款', orderStatus: '作廢',
    orderNumber: '102862790', orderStartDate: '2025-04-05', orderEndDate: '2025-05-04', orderAmount: 480,
    isUnresolved: 'Y', magazineCode: 'GCV00003',
    shippingCustomerNumber: '1679131', shippingCustomerName: '黃麗娜', shippingCustomerAddress: '新竹市東區光復路88號', shippingCustomerPhone: '03-55557777',
    paymentCustomerNumber: '1679131', paymentCustomerName: '黃麗娜', paymentCustomerAddress: '新竹市東區光復路88號', paymentCustomerPhone: '03-55557777',
    orderNote: '客戶要求取消',
    planCode: '', planName: '',
    knowledgeStartDate: '', knowledgeEndDate: '',
    isPaused: 'N', pauseReason: '',
    customerName: '黃麗娜', customerMobile: '0944-678-901', customerPhone: '03-55557777', customerContact: '黃麗娜', customerAddress: '新竹市東區光復路88號', customerEmail: 'huang.ln@example.com', customerTaxId: '56789123',
  },
  {
    id: 'e8', type: ['erp'],
    sourceSystem: '親子', orderDate: '2025-05-20', sourceProduct: '親子天下年訂',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '正常',
    orderNumber: '102862810', orderStartDate: '2025-05-20', orderEndDate: '2026-05-19', orderAmount: 6980,
    isUnresolved: 'N', magazineCode: 'PK00002',
    shippingCustomerNumber: '1679132', shippingCustomerName: '吳文傑', shippingCustomerAddress: '台南市南區文南路65號', shippingCustomerPhone: '06-26688888',
    paymentCustomerNumber: '1679132', paymentCustomerName: '吳文傑', paymentCustomerAddress: '台南市南區文南路65號', paymentCustomerPhone: '06-26688888',
    orderNote: '',
    planCode: 'PK-Y', planName: '親子天下年訂方案',
    knowledgeStartDate: '2025-05-20', knowledgeEndDate: '2026-05-19',
    isPaused: 'N', pauseReason: '',
    customerName: '吳文傑', customerMobile: '0955-789-012', customerPhone: '06-26688888', customerContact: '吳文傑', customerAddress: '台南市南區文南路65號', customerEmail: 'wu.wj@example.com', customerTaxId: '34567890',
  },
  {
    id: 'e9', type: ['erp'],
    sourceSystem: '康健', orderDate: '2025-06-15', sourceProduct: '康健雜誌年訂',
    paymentMethod: 'ATM轉帳', paymentStatus: '已付款', orderStatus: '止寄',
    orderNumber: '102862830', orderStartDate: '2025-06-15', orderEndDate: '2026-06-14', orderAmount: 8980,
    isUnresolved: 'N', magazineCode: 'CH00003',
    shippingCustomerNumber: '1679133', shippingCustomerName: '葉淑芬', shippingCustomerAddress: '宜蘭縣宜蘭市民權路25號', shippingCustomerPhone: '03-93223333',
    paymentCustomerNumber: '1679133', paymentCustomerName: '葉淑芬', paymentCustomerAddress: '宜蘭縣宜蘭市民權路25號', paymentCustomerPhone: '03-93223333',
    orderNote: '已停寄',
    planCode: 'CH-Y', planName: '康健年訂方案',
    knowledgeStartDate: '2025-06-15', knowledgeEndDate: '2026-06-14',
    isPaused: 'Y', pauseReason: '客戶申請暫停',
    customerName: '葉淑芬', customerMobile: '0966-890-123', customerPhone: '03-93223333', customerContact: '葉淑芬', customerAddress: '宜蘭縣宜蘭市民權路25號', customerEmail: 'ye.sf@example.com', customerTaxId: '01234567',
  },
  {
    id: 'e10', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-07-01', sourceProduct: '天下雜誌半年訂',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '補贈電子',
    orderNumber: '102862850', orderStartDate: '2025-07-01', orderEndDate: '2025-12-31', orderAmount: 2980,
    isUnresolved: 'N', magazineCode: 'GCV00004',
    shippingCustomerNumber: '1679134', shippingCustomerName: '曾家銘', shippingCustomerAddress: '嘉義市東區忠孝路15號', shippingCustomerPhone: '05-22229999',
    paymentCustomerNumber: '1679134', paymentCustomerName: '曾家銘', paymentCustomerAddress: '嘉義市東區忠孝路15號', paymentCustomerPhone: '05-22229999',
    orderNote: '補贈電子版',
    planCode: 'GCV-H', planName: '天下雜誌半年訂',
    knowledgeStartDate: '2025-07-01', knowledgeEndDate: '2025-12-31',
    isPaused: 'N', pauseReason: '',
    customerName: '曾家銘', customerMobile: '0977-901-234', customerPhone: '05-22229999', customerContact: '曾家銘', customerAddress: '嘉義市東區忠孝路15號', customerEmail: 'zeng.jm@example.com', customerTaxId: '98765432',
  },
  {
    id: 'e11', type: ['erp'],
    sourceSystem: '親子', orderDate: '2025-08-10', sourceProduct: '親子天下季訂',
    paymentMethod: '信用卡', paymentStatus: '待付款', orderStatus: '輸入',
    orderNumber: '102862870', orderStartDate: '2025-08-10', orderEndDate: '2025-11-09', orderAmount: 1980,
    isUnresolved: 'Y', magazineCode: 'PK00003',
    shippingCustomerNumber: '1679135', shippingCustomerName: '謝美華', shippingCustomerAddress: '屏東縣屏東市和平路20號', shippingCustomerPhone: '08-75552222',
    paymentCustomerNumber: '1679135', paymentCustomerName: '謝美華', paymentCustomerAddress: '屏東縣屏東市和平路20號', paymentCustomerPhone: '08-75552222',
    orderNote: '待客戶確認付款',
    planCode: 'PK-Q', planName: '親子天下季訂方案',
    knowledgeStartDate: '', knowledgeEndDate: '',
    isPaused: 'N', pauseReason: '',
    customerName: '謝美華', customerMobile: '0988-012-345', customerPhone: '08-75552222', customerContact: '謝美華', customerAddress: '屏東縣屏東市和平路20號', customerEmail: 'xie.mh@example.com', customerTaxId: '11111111',
  },
  {
    id: 'e12', type: ['erp'],
    sourceSystem: '康健', orderDate: '2025-09-05', sourceProduct: '康健雜誌月訂',
    paymentMethod: 'ATM轉帳', paymentStatus: '已付款', orderStatus: '退訂',
    orderNumber: '102862890', orderStartDate: '2025-09-05', orderEndDate: '2025-10-04', orderAmount: 380,
    isUnresolved: 'N', magazineCode: 'CH00004',
    shippingCustomerNumber: '1679136', shippingCustomerName: '許仁祥', shippingCustomerAddress: '花蓮縣花蓮市中山路88號', shippingCustomerPhone: '03-83334444',
    paymentCustomerNumber: '1679136', paymentCustomerName: '許仁祥', paymentCustomerAddress: '花蓮縣花蓮市中山路88號', paymentCustomerPhone: '03-83334444',
    orderNote: '客戶已主動退訂',
    planCode: '', planName: '',
    knowledgeStartDate: '2025-09-05', knowledgeEndDate: '2025-10-04',
    isPaused: 'N', pauseReason: '',
    customerName: '許仁祥', customerMobile: '0999-123-456', customerPhone: '03-83334444', customerContact: '許仁祥', customerAddress: '花蓮縣花蓮市中山路88號', customerEmail: 'xu.rx@example.com', customerTaxId: '22222222',
  },
  {
    id: 'e13', type: ['erp'],
    sourceSystem: '天下', orderDate: '2025-10-12', sourceProduct: '天下雜誌年訂',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '正常',
    orderNumber: '102862910', orderStartDate: '2025-10-12', orderEndDate: '2026-10-11', orderAmount: 3980,
    isUnresolved: 'N', magazineCode: 'GCV00005',
    shippingCustomerNumber: '1679137', shippingCustomerName: '何瑀恩', shippingCustomerAddress: '澎湖縣馬公市光華路12號', shippingCustomerPhone: '06-92775555',
    paymentCustomerNumber: '1679137', paymentCustomerName: '何瑀恩', paymentCustomerAddress: '澎湖縣馬公市光華路12號', paymentCustomerPhone: '06-92775555',
    orderNote: '新增訂戶',
    planCode: 'GCV-Y', planName: '天下雜誌年訂方案',
    knowledgeStartDate: '2025-10-12', knowledgeEndDate: '2026-10-11',
    isPaused: 'N', pauseReason: '',
    customerName: '何瑀恩', customerMobile: '0911-234-567', customerPhone: '06-92775555', customerContact: '何瑀恩', customerAddress: '澎湖縣馬公市光華路12號', customerEmail: 'he.ye@example.com', customerTaxId: '33333333',
  },
];

const mockOmgOrders: UnifiedOrderData[] = [
  {
    id: 'o1', type: ['omg'],
    sourceSystem: '天下', orderDate: '2025-07-01', sourceProduct: '天下雜誌數位版年訂',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '正常',
    orderNumber: 'OMG20250701001', orderStartDate: '2025-07-01', orderEndDate: '2026-06-30', orderAmount: 1980,
    isUnresolved: 'N', magazineCode: 'GCV-D001',
    shippingCustomerNumber: '1679140', shippingCustomerName: '趙雅婷', shippingCustomerAddress: '台北市信義區信義路五段7號', shippingCustomerPhone: '02-27588888',
    paymentCustomerNumber: '1679140', paymentCustomerName: '趙雅婷', paymentCustomerAddress: '台北市信義區信義路五段7號', paymentCustomerPhone: '02-27588888',
    orderNote: 'OMG 數位訂閱',
    planCode: 'GCV-D-Y', planName: '天下數位年訂方案',
    knowledgeStartDate: '2025-07-01', knowledgeEndDate: '2026-06-30',
    isPaused: 'N', pauseReason: '',
    customerName: '趙雅婷', customerMobile: '0955-111-222', customerPhone: '02-27588888', customerContact: '趙雅婷', customerAddress: '台北市信義區信義路五段7號', customerEmail: 'chao.yt@example.com', customerTaxId: '',
  },
  {
    id: 'o2', type: ['omg'],
    sourceSystem: '康健', orderDate: '2025-08-15', sourceProduct: '康健雜誌數位季訂',
    paymentMethod: 'LINE Pay', paymentStatus: '已付款', orderStatus: '止寄',
    orderNumber: 'OMG20250815002', orderStartDate: '2025-08-15', orderEndDate: '2025-11-14', orderAmount: 890,
    isUnresolved: 'N', magazineCode: 'CH-D002',
    shippingCustomerNumber: '1679141', shippingCustomerName: '蔡宗翰', shippingCustomerAddress: '新北市淡水區中正路66號', shippingCustomerPhone: '02-26213333',
    paymentCustomerNumber: '1679141', paymentCustomerName: '蔡宗翰', paymentCustomerAddress: '新北市淡水區中正路66號', paymentCustomerPhone: '02-26213333',
    orderNote: '',
    planCode: 'CH-D-Q', planName: '康健數位季訂方案',
    knowledgeStartDate: '2025-08-15', knowledgeEndDate: '2025-11-14',
    isPaused: 'N', pauseReason: '',
    customerName: '蔡宗翰', customerMobile: '0966-333-444', customerPhone: '02-26213333', customerContact: '蔡宗翰', customerAddress: '新北市淡水區中正路66號', customerEmail: 'tsai.zh@omg.com', customerTaxId: '',
  },
  {
    id: 'o3', type: ['omg', 'service'],
    sourceSystem: '親子', orderDate: '2025-09-01', sourceProduct: '親子天下數位+紙本合訂',
    paymentMethod: '信用卡', paymentStatus: '已付款', orderStatus: '正常',
    orderNumber: 'OMG20250901003', orderStartDate: '2025-09-01', orderEndDate: '2026-08-31', orderAmount: 3480,
    isUnresolved: 'N', magazineCode: 'PK-D003',
    shippingCustomerNumber: '1679142', shippingCustomerName: '林怡君', shippingCustomerAddress: '台中市西區民生北路12號', shippingCustomerPhone: '04-23310000',
    paymentCustomerNumber: '1679142', paymentCustomerName: '林怡君', paymentCustomerAddress: '台中市西區民生北路12號', paymentCustomerPhone: '04-23310000',
    orderNote: '數位紙本合訂跨系統訂單',
    planCode: 'PK-D-Y', planName: '親子天下數位年訂',
    knowledgeStartDate: '2025-09-01', knowledgeEndDate: '2026-08-31',
    isPaused: 'N', pauseReason: '',
    customerName: '林怡君', customerMobile: '0977-888-999', customerPhone: '04-23310000', customerContact: '林怡君', customerAddress: '台中市西區民生北路12號', customerEmail: 'lin.yj@example.com', customerTaxId: '',
  },
  {
    id: 'o4', type: ['omg', 'erp'],
    sourceSystem: 'OMG', orderDate: '2025-10-05', sourceProduct: '天下雜誌數位月訂',
    paymentMethod: 'Apple Pay', paymentStatus: '已付款', orderStatus: '退訂',
    orderNumber: 'OMG20251005004', orderStartDate: '2025-10-05', orderEndDate: '2025-11-04', orderAmount: 299,
    isUnresolved: 'Y', magazineCode: 'GCV-D004',
    shippingCustomerNumber: '1679143', shippingCustomerName: '江明哲', shippingCustomerAddress: '高雄市苓雅區四維三路2號', shippingCustomerPhone: '07-33311111',
    paymentCustomerNumber: '1679143', paymentCustomerName: '江明哲', paymentCustomerAddress: '高雄市苓雅區四維三路2號', paymentCustomerPhone: '07-33311111',
    orderNote: '客戶申請退訂',
    planCode: 'GCV-D-M', planName: '天下數位月訂方案',
    knowledgeStartDate: '2025-10-05', knowledgeEndDate: '2025-11-04',
    isPaused: 'N', pauseReason: '',
    customerName: '江明哲', customerMobile: '0911-777-888', customerPhone: '07-33311111', customerContact: '江明哲', customerAddress: '高雄市苓雅區四維三路2號', customerEmail: 'jiang.mz@example.com', customerTaxId: '',
  },
];

// ── Select 選項 ───────────────────────────────────────────
const sourceSystemOptions: CwSelectOption[] = [
  { value: 'cw', label: '天下雜誌' }, { value: 'pk', label: '親子天下' }, { value: 'ch', label: '康健雜誌' },
];
// 訂單狀態色彩對照（tag 用深色，row 背景用淺色）
const ORDER_STATUS_COLORS: Record<string, { tagBg: string; tagColor: string; rowBg: string }> = {
  '輸入':   { tagBg: '#e8c900', tagColor: '#3d3200', rowBg: '#fefce8' },
  '作廢':   { tagBg: '#a83de0', tagColor: '#fff',    rowBg: '#f5e8fd' },
  '止寄':   { tagBg: '#3aad30', tagColor: '#fff',    rowBg: '#edfaec' },
  '復寄':   { tagBg: '#7c5cd6', tagColor: '#fff',    rowBg: '#f3effd' },
  '退訂':   { tagBg: '#757575', tagColor: '#fff',    rowBg: '#f5f5f5' },
  '補贈電子': { tagBg: '#4a9dd4', tagColor: '#fff',  rowBg: '#eaf4fd' },
};

const orderStatusOptions: CwSelectOption[] = [
  { value: 'processing', label: '處理中' }, { value: 'completed', label: '已完成' }, { value: 'cancelled', label: '已取消' },
];
const paymentMethodOptions: CwSelectOption[] = [
  { value: 'credit', label: '信用卡' }, { value: 'atm', label: 'ATM' },
];
const shippingMethodOptions: CwSelectOption[] = [
  { value: 'm1', label: '常溫郵寄' }, { value: 'm2', label: '宅配' },
];
const creatorOptions: CwSelectOption[] = [{ value: 'userA', label: '王小明' }];
const emptyOptions: CwSelectOption[] = [];

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
  '客戶資訊', '訂單明細', '未結案單', '雜誌料號', '出貨客戶', '付款客戶', '訂單備註', '方案相關', '知識庫相關', '暫止相關',
] as const;

// ── 區塊標題 ──────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c]" style={{ fontWeight: 700 }}>
      {children}
    </p>
  );
}

// ── 主元件 ───────────────────────────────────────────────
export function NewPMOrderManagement() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchForm, setSearchForm] = useState<Record<string, any>>({
    '訂單編號': "", '來源編號': "", '方案代碼': "", '來源系統': "",
    '會員email': "", '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單狀態_基本': "", '訂單類型': "", '建單法人': "",
    '受買人訂戶編號': "", '會員帳號': "", '會員姓名': "", '會員手機': "",
    '收件人訂戶編號': "", '收件人姓名': "", '收件人email': "", '收件人手機': "",
    '出貨收件人': "", '發票收件人': "", '統一編號': "", '推薦客戶': "", '贈品人': "",
    '商品名稱': "", '付款方式': "", '付款狀態': "", '訂單狀態_細節': "",
    '訂單備註': "", '產品代碼': "",
    '訂單客編': "", '訂單客戶': "", '出貨客編': "", '出貨客戶': "",
    '發票客編': "", '發票客戶': "", '付款客編': "", '付款客戶': "",
    '訂單編號起期': "", '訂單編號迄期': "", '流程編號起期': "", '流程編號迄期': "",
    '來源編號起期': "", '來源編號迄期': "", '來源': "",
    '出貨方式': "", '出貨備註': "", '行銷通路代碼': "", '行銷通路說明': "",
    '行銷專案代碼': "", '行銷專案說明': "", '促銷方案代碼': "", '促銷方案說明': "",
    '行銷組盤碼': "",
    '信用卡卡號': "", '建單人員': "", '暫停處理': "", '是否為贈閱單': "",
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayCount, setDisplayCount] = useState(10); // 無限滾動：初始顯示10筆
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 無限滾動: 加載狀態
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderType, setSelectedOrderType] = useState<'service' | 'erp' | 'omg'>('service');
  const [showDetail, setShowDetail] = useState(false);

  // 訂單類型 checkbox
  const [showServiceOrders, setShowServiceOrders] = useState(true);
  const [showErpOrders, setShowErpOrders] = useState(true);
  const [showOmgOrders, setShowOmgOrders] = useState(true);
  const [showStatusLegend, setShowStatusLegend] = useState(false);

  // 欄位顯示 filter
  const [columnFilters, setColumnFilters] = useState<Record<string, boolean>>({
    '客戶資訊': false, '訂單明細': false, '未結案單': false, '雜誌料號': false,
    '出貨客戶': false, '付款客戶': false, '訂單備註': false,
    '方案相關': false, '知識庫相關': false, '暫止相關': false,
  });
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [pendingColumnFilters, setPendingColumnFilters] = useState<Record<string, boolean>>({ ...columnFilters });
  const tableContainerRef = useRef<HTMLDivElement>(null); // 表格容器 ref，用於無限滾動

  // 訂單客編相關 state
  const [showCustomerCodePopup, setShowCustomerCodePopup] = useState(false);
  const [customerCodePopupKeyword, setCustomerCodePopupKeyword] = useState('');
  const customerCodePopupRef = useRef<HTMLDivElement>(null);

  // 訂單客戶相關 state
  const [showCustomerNamePopup, setShowCustomerNamePopup] = useState(false);
  const [customerNamePopupKeyword, setCustomerNamePopupKeyword] = useState('');
  const customerNamePopupRef = useRef<HTMLDivElement>(null);

  // 促銷方案相關 state
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [promotionPopupKeyword, setPromotionPopupKeyword] = useState('');
  const promotionPopupRef = useRef<HTMLDivElement>(null);

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

  // 關閉 customer code popup 事件處理
  useEffect(() => {
    if (!showCustomerCodePopup) return;
    const handler = (e: MouseEvent) => {
      if (customerCodePopupRef.current && !customerCodePopupRef.current.contains(e.target as Node)) {
        setShowCustomerCodePopup(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showCustomerCodePopup]);

  // 關閉 customer name popup 事件處理
  useEffect(() => {
    if (!showCustomerNamePopup) return;
    const handler = (e: MouseEvent) => {
      if (customerNamePopupRef.current && !customerNamePopupRef.current.contains(e.target as Node)) {
        setShowCustomerNamePopup(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showCustomerNamePopup]);

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

  // 搜尋訂單客編
  const filteredCustomerCodes = customerCodePopupKeyword
    ? mockCustomerCodes.filter(
        (c) =>
          c.code.toLowerCase().includes(customerCodePopupKeyword.toLowerCase()) ||
          c.name.toLowerCase().includes(customerCodePopupKeyword.toLowerCase())
      )
    : mockCustomerCodes;

  // 選擇訂單客編
  const handleSelectCustomerCode = (code: string, name: string) => {
    handleInputChange('訂單客編', code);
    handleInputChange('訂單客戶', name);
    setShowCustomerCodePopup(false);
    setCustomerCodePopupKeyword('');
  };

  // 掌管搭配的訂單客戶 popup 資料
  const customerNamePopupData = filteredCustomerCodes;
  const filteredCustomerNames = customerNamePopupKeyword
    ? customerNamePopupData.filter(
        (c) =>
          c.code.toLowerCase().includes(customerNamePopupKeyword.toLowerCase()) ||
          c.name.toLowerCase().includes(customerNamePopupKeyword.toLowerCase())
      )
    : customerNamePopupData;

  // 選擇訂單客戶（同時帶入客編和客戶名稱）
  const handleSelectCustomerName = (code: string, name: string) => {
    handleInputChange('訂單客編', code);
    handleInputChange('訂單客戶', name);
    setShowCustomerNamePopup(false);
    setCustomerNamePopupKeyword('');
  };

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
    handleInputChange('促銷方案代碼', code);
    setShowPromotionPopup(false);
    setPromotionPopupKeyword('');
  };

  const handleInputChange = (field: string, value: any) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const emptyClearForm = {
    '訂單編號': "", '來源編號': "", '方案代碼': "", '來源系統': "",
    '會員email': "", '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單狀態_基本': "", '訂單類型': "", '建單法人': "",
    '受買人訂戶編號': "", '會員帳號': "", '會員姓名': "", '會員手機': "",
    '收件人訂戶編號': "", '收件人姓名': "", '收件人email': "", '收件人手機': "",
    '出貨收件人': "", '發票收件人': "", '統一編號': "", '推薦客戶': "", '贈品人': "",
    '商品名稱': "", '付款方式': "", '付款狀態': "", '訂單狀態_細節': "",
    '訂單備註': "", '產品代碼': "",
    '訂單客編': "", '訂單客戶': "", '出貨客編': "", '出貨客戶': "",
    '發票客編': "", '發票客戶': "", '付款客編': "", '付款客戶': "",
    '訂單編號起期': "", '訂單編號迄期': "", '流程編號起期': "", '流程編號迄期': "",
    '來源編號起期': "", '來源編號迄期': "", '來源': "",
    '出貨方式': "", '出貨備註': "", '行銷通路代碼': "", '行銷通路說明': "",
    '行銷專案代碼': "", '行銷專案說明': "", '促銷方案代碼': "", '促銷方案說明': "",
    '行銷組盤碼': "",
    '信用卡卡號': "", '建單人員': "", '暫停處理': "", '是否為贈閱單': "",
  };

  const handleClear = () => {
    setSearchForm(emptyClearForm);
    setHasSearched(false);
    setDisplayCount(10); // 清除表單時重置顯示數量
    setIsLoadingMore(false); // 重置加載狀態
  };

  const handleSearch = () => {
    setHasSearched(true);
    setCurrentPage(1);
    setDisplayCount(10);
    setIsLoadingMore(false);
  };

  const handleView = (record: UnifiedOrderData) => {
    setSelectedOrderId(record.id);
    setSelectedOrderType(record.type[0]);
    setShowDetail(true);
  };

  // ── 動態欄位 ────────────────────────────────────────────
  const buildColumns = (): CwTableColumn<UnifiedOrderData>[] => {
    const cols: CwTableColumn<UnifiedOrderData>[] = [
      { key: 'id', title: '#', width: '60px', align: 'center', stickyLeft: true, render: (_, __, idx) => (idx ?? 0) + 1 },
      { key: 'orderNumber', title: '訂單編號', width: '110px', stickyLeft: true },
      {
        key: 'type', title: '訂單來源', width: '120px', align: 'center', stickyLeft: true,
        render: (_, r) => {
          const SOURCE_CONFIG: Record<string, { label: string; color: string }> = {
            service: { label: '中台', color: '#0078d4' },
            erp:     { label: 'ERP',  color: '#7c3aed' },
            omg:     { label: 'OMG',  color: '#d97706' },
          };
          const sources = r.type;
          return (
            <div className="flex flex-wrap gap-[4px] justify-center">
              {sources.map(s => {
                const cfg = SOURCE_CONFIG[s];
                return cfg ? (
                  <span
                    key={s}
                    className="inline-block px-[6px] py-[2px] rounded-[4px] text-[12px] font-[500]"
                    style={{ color: cfg.color, background: `${cfg.color}18` }}
                  >
                    {cfg.label}
                  </span>
                ) : null;
              })}
            </div>
          );
        },
      },
      { key: 'sourceSystem', title: '來源系統', width: '100px' },
      { key: 'orderDate', title: '訂單日期', width: '110px' },
      { key: 'sourceProduct', title: '來源產品', width: '180px' },
      { key: 'paymentMethod', title: '付款方式', width: '100px' },
      { key: 'paymentStatus', title: '付款狀態', width: '90px' },
      {
        key: 'orderStatus', title: '訂單狀態', width: '90px', align: 'center',
        render: (_, r) => {
          if (!r.orderStatus) return null;
          const cfg = ORDER_STATUS_COLORS[r.orderStatus];
          return (
            <span
              className="inline-block px-[8px] py-[2px] rounded-[5px] text-[12px]"
              style={cfg ? { backgroundColor: cfg.tagBg, color: cfg.tagColor } : { backgroundColor: '#e8f5e9', color: '#16a34a' }}
            >
              {r.orderStatus}
            </span>
          );
        },
      },
    ];

    // 客戶資訊：緊接在訂單來源右邊（position 2）
    if (columnFilters['客戶資訊']) {
      cols.splice(2, 0,
        { key: 'customerName', title: '客戶名稱', width: '110px' },
        { key: 'customerMobile', title: '手機', width: '120px' },
        { key: 'customerPhone', title: '市話', width: '120px' },
        { key: 'customerContact', title: '聯絡人', width: '100px' },
        { key: 'customerAddress', title: '地址', width: '200px' },
        { key: 'customerEmail', title: 'Email', width: '160px' },
        { key: 'customerTaxId', title: '統編', width: '100px' },
      );
    }

    // 訂單明細：接在客戶資訊之後（若客戶資訊已展開則 offset 7）
    if (columnFilters['訂單明細']) {
      const insertAt = 3 + (columnFilters['客戶資訊'] ? 7 : 0);
      cols.splice(insertAt, 0,
        { key: 'orderStartDate', title: '訂單起期', width: '110px' },
        { key: 'orderEndDate', title: '訂單迄期', width: '110px' },
        { key: 'orderAmount', title: '訂單金額', width: '110px', align: 'right', render: (v) => (v as number) > 0 ? `NT$ ${(v as number).toLocaleString()}` : '' },
      );
    }

    if (columnFilters['未結案單']) {
      cols.push({ key: 'isUnresolved', title: '未結案單', width: '90px', align: 'center' });
    }

    if (columnFilters['雜誌料號']) {
      cols.push({ key: 'magazineCode', title: '雜誌料號', width: '110px' });
    }

    if (columnFilters['出貨客戶']) {
      cols.push(
        { key: 'shippingCustomerNumber', title: '出貨編號', width: '110px' },
        { key: 'shippingCustomerName', title: '出貨客戶名稱', width: '120px' },
        { key: 'shippingCustomerAddress', title: '出貨客戶地址', width: '210px' },
        { key: 'shippingCustomerPhone', title: '出貨客戶電話', width: '130px' },
      );
    }

    if (columnFilters['付款客戶']) {
      cols.push(
        { key: 'paymentCustomerNumber', title: '付款編號', width: '110px' },
        { key: 'paymentCustomerName', title: '付款客戶名稱', width: '120px' },
        { key: 'paymentCustomerAddress', title: '付款客戶地址', width: '210px' },
        { key: 'paymentCustomerPhone', title: '付款客戶電話', width: '130px' },
      );
    }

    if (columnFilters['訂單備註']) {
      cols.push({ key: 'orderNote', title: '訂單備註', width: '180px' });
    }

    if (columnFilters['方案相關']) {
      cols.push(
        { key: 'planCode', title: '方案代碼', width: '110px' },
        { key: 'planName', title: '方案名稱', width: '160px' },
      );
    }

    if (columnFilters['知識庫相關']) {
      cols.push(
        { key: 'knowledgeStartDate', title: '知識庫起期', width: '110px' },
        { key: 'knowledgeEndDate', title: '知識庫迄期', width: '110px' },
      );
    }

    if (columnFilters['暫止相關']) {
      cols.push(
        { key: 'isPaused', title: '暫停處理', width: '90px', align: 'center' },
        { key: 'pauseReason', title: '暫止原因', width: '160px' },
      );
    }

    cols.push({
      key: 'actions' as any, title: '功能', width: '160px', align: 'center',
      sticky: true,
      render: (_, r) => (
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleView(r)}
            className="px-[8px] text-[#0078d4] text-[12px] hover:bg-[#e6f2fb] transition-colors whitespace-nowrap font-['Noto_Sans_TC',_sans-serif] underline"
            style={{ fontWeight: 350 }}
          >查看</button>
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
    ? [...mockServiceOrders, ...mockErpOrders, ...mockOmgOrders].filter(isOrderVisible)
    : [];

  const filteredOrders = searchKeyword
    ? allOrders.filter(o =>
        Object.values(o).some(v =>
          String(v).toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    : allOrders;

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

  const hasAnyColumnFilter = Object.values(columnFilters).some(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "訂單管理", href: "/orders" },
    { label: "訂單查詢" },
  ];

  // 如果顯示詳情，返回訂單詳情組件
  if (showDetail) {
    return (
      <PMOrderDetail
        orderId={selectedOrderId ? parseInt(selectedOrderId.replace(/\D/g, '')) || undefined : undefined}
        orderType={selectedOrderType}

        onClose={() => setShowDetail(false)}
      />
    );
  }

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <CwTitle title="訂單查詢" breadcrumbs={breadcrumbs} />

      <form className="bg-white space-y-[16px]" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>

        {/* ── 基本資訊 ── */}
        <div className="space-y-[12px] border-b border-gray-200 pb-[20px]">
          <SectionLabel>基本資訊</SectionLabel>

          <div className="grid grid-cols-8 gap-[12px] items-end">
            <CwSelect
              label="訂單編號"
              placeholder="輸入編號或客戶名稱"
              options={orderNumberOptions}
              searchable
              clearable
              value={searchForm['訂單編號']}
              onChange={(v) => handleInputChange('訂單編號', v)}
              renderOption={(opt) => (
                <div>
                  <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 350, color: '#1c1c1c' }}>{opt.label}</p>
                  <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '12px', fontWeight: 350, color: '#7c808c' }}>{opt.searchValue}</p>
                </div>
              )}
            />
            <CwInput label="來源編號" placeholder="來源編號" value={searchForm['來源編號']} onChange={(e) => handleInputChange('來源編號', e.target.value)} />
            <CwInput label="方案代碼" placeholder="方案代碼" value={searchForm['方案代碼']} onChange={(e) => handleInputChange('方案代碼', e.target.value)} />
            <CwSelect label="來源系統" placeholder="來源系統" options={sourceSystemOptions} searchable clearable value={searchForm['來源系統']} onChange={(v) => handleInputChange('來源系統', v)} />
            <CwInput label="會員email" placeholder="會員email" value={searchForm['會員email']} onChange={(e) => handleInputChange('會員email', e.target.value)} />
            <CwDatePicker label="訂單起日" placeholder="訂單起日" value={searchForm['訂單起日']} onChange={(v) => handleInputChange('訂單起日', v)} />
            <CwDatePicker label="訂單迄日" placeholder="訂單迄日" value={searchForm['訂單迄日']} onChange={(v) => handleInputChange('訂單迄日', v)} />
          </div>

          <div className="grid grid-cols-8 gap-[12px] items-center">
            <CwSelect label="訂單狀態" placeholder="訂單狀態" options={orderStatusOptions} searchable clearable value={searchForm['訂單狀態_基本']} onChange={(v) => handleInputChange('訂單狀態_基本', v)} />
            <CwInput label="訂單類型" placeholder="訂單類型" value={searchForm['訂單類型']} onChange={(e) => handleInputChange('訂單類型', e.target.value)} />
            <CwInput label="建單法人" placeholder="建單法人" value={searchForm['建單法人']} onChange={(e) => handleInputChange('建單法人', e.target.value)} />
            <div className="col-span-4" />
            <div className="flex justify-end">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                title="快捷鍵：Command+O"
                className="flex items-center gap-[4px] text-[#0078d4] text-[14px] font-[500] hover:opacity-80 whitespace-nowrap cursor-pointer"
              >
                {showAdvanced ? <><ChevronUp size={16} />收起進階篩選</> : <><ChevronDown size={16} />展開進階篩選</>}
              </button>
            </div>
          </div>
        </div>

        {/* ── 進階篩選區 ── */}
        {showAdvanced && (
          <>
            {/* 客戶資料 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>客戶資料</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwInput label="受買人訂戶編號" placeholder="受買人訂戶編號" value={searchForm['受買人訂戶編號']} onChange={(e) => handleInputChange('受買人訂戶編號', e.target.value)} />
                <CwInput label="會員帳號" placeholder="會員帳號" value={searchForm['會員帳號']} onChange={(e) => handleInputChange('會員帳號', e.target.value)} />
                <CwInput label="會員姓名" placeholder="會員姓名" value={searchForm['會員姓名']} onChange={(e) => handleInputChange('會員姓名', e.target.value)} />
                <CwInput label="會員手機" placeholder="會員手機" value={searchForm['會員手機']} onChange={(e) => handleInputChange('會員手機', e.target.value)} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwInput label="收件人訂戶編號" placeholder="收件人訂戶編號" value={searchForm['收件人訂戶編號']} onChange={(e) => handleInputChange('收件人訂戶編號', e.target.value)} />
                <CwInput label="收件人姓名" placeholder="收件人姓名" value={searchForm['收件人姓名']} onChange={(e) => handleInputChange('收件人姓名', e.target.value)} />
                <CwInput label="收件人email" placeholder="收件人email" value={searchForm['收件人email']} onChange={(e) => handleInputChange('收件人email', e.target.value)} />
                <CwInput label="收件人手機" placeholder="收件人手機" value={searchForm['收件人手機']} onChange={(e) => handleInputChange('收件人手機', e.target.value)} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="出貨收件人" placeholder="出貨收件人" options={emptyOptions} searchable clearable value={searchForm['出貨收件人']} onChange={(v) => handleInputChange('出貨收件人', v)} />
                <CwSelect label="發票收件人" placeholder="發票收件人" options={emptyOptions} searchable clearable value={searchForm['發票收件人']} onChange={(v) => handleInputChange('發票收件人', v)} />
                <CwInput label="統一編號" placeholder="統一編號" value={searchForm['統一編號']} onChange={(e) => handleInputChange('統一編號', e.target.value)} />
                <CwInput label="推薦客戶" placeholder="推薦客戶" value={searchForm['推薦客戶']} onChange={(e) => handleInputChange('推薦客戶', e.target.value)} />
                <CwInput label="贈品人" placeholder="贈品人" value={searchForm['贈品人']} onChange={(e) => handleInputChange('贈品人', e.target.value)} />
              </div>
            </div>

            {/* 訂單細節 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>訂單細節</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="商品名稱" placeholder="商品名稱" options={emptyOptions} searchable clearable value={searchForm['商品名稱']} onChange={(v) => handleInputChange('商品名稱', v)} />
                <CwSelect label="付款方式" placeholder="付款方式" options={paymentMethodOptions} searchable clearable value={searchForm['付款方式']} onChange={(v) => handleInputChange('付款方式', v)} />
                <CwInput label="付款狀態" placeholder="付款狀態" value={searchForm['付款狀態']} onChange={(e) => handleInputChange('付款狀態', e.target.value)} />
                <CwSelect label="訂單狀態" placeholder="訂單狀態" options={orderStatusOptions} searchable clearable value={searchForm['訂單狀態_細節']} onChange={(v) => handleInputChange('訂單狀態_細節', v)} />
                <CwSelect label="訂單備註" placeholder="訂單備註" options={emptyOptions} searchable clearable value={searchForm['訂單備註']} onChange={(v) => handleInputChange('訂單備註', v)} />
                <CwSelect label="產品代碼" placeholder="產品代碼" options={emptyOptions} searchable clearable value={searchForm['產品代碼']} onChange={(v) => handleInputChange('產品代碼', v)} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                {/* 訂單客編搜尋 */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">訂單客編</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="輸入訂單客編"
                      value={searchForm['訂單客編']}
                      onChange={(e) => handleInputChange('訂單客編', e.target.value)}
                      className="w-full h-[32px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                      style={{ fontWeight: 350 }}
                    />
                    <button
                      onClick={() => {
                        setShowCustomerCodePopup(true);
                        setCustomerCodePopupKeyword('');
                      }}
                      className="absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] bg-white hover:bg-[#f5f7fa] flex items-center justify-center text-[#01579b] transition-colors"
                      title="搜尋訂單客編"
                    >
                      <Search size={16} />
                    </button>
                    {searchForm['訂單客編'] && (
                      <button
                        onClick={() => handleInputChange('訂單客編', '')}
                        className="absolute right-[36px] w-[24px] h-[24px] text-[#7c808c] hover:text-[#1c1c1c] transition-colors"
                        title="清除"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
                {/* 訂單客戶搜尋 */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">訂單客戶</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="輸入訂單客戶"
                      value={searchForm['訂單客戶']}
                      onChange={(e) => handleInputChange('訂單客戶', e.target.value)}
                      className="w-full h-[32px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                      style={{ fontWeight: 350 }}
                    />
                    <button
                      onClick={() => {
                        setShowCustomerNamePopup(true);
                        setCustomerNamePopupKeyword('');
                      }}
                      className="absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] bg-white hover:bg-[#f5f7fa] flex items-center justify-center text-[#01579b] transition-colors"
                      title="搜尋訂單客戶"
                    >
                      <Search size={16} />
                    </button>
                    {searchForm['訂單客戶'] && (
                      <button
                        onClick={() => handleInputChange('訂單客戶', '')}
                        className="absolute right-[36px] w-[24px] h-[24px] text-[#7c808c] hover:text-[#1c1c1c] transition-colors"
                        title="清除"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <CwInput label="出貨客編" placeholder="出貨客編" value={searchForm['出貨客編']} onChange={(e) => handleInputChange('出貨客編', e.target.value)} />
                <CwInput label="出貨客戶" placeholder="出貨客戶" value={searchForm['出貨客戶']} onChange={(e) => handleInputChange('出貨客戶', e.target.value)} />
                <CwInput label="發票客編" placeholder="發票客編" value={searchForm['發票客編']} onChange={(e) => handleInputChange('發票客編', e.target.value)} />
                <CwInput label="發票客戶" placeholder="發票客戶" value={searchForm['發票客戶']} onChange={(e) => handleInputChange('發票客戶', e.target.value)} />
                <CwInput label="付款客編" placeholder="付款客編" value={searchForm['付款客編']} onChange={(e) => handleInputChange('付款客編', e.target.value)} />
                <CwInput label="付款客戶" placeholder="付款客戶" value={searchForm['付款客戶']} onChange={(e) => handleInputChange('付款客戶', e.target.value)} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="訂單編號起期" placeholder="訂單編號起期" options={emptyOptions} searchable clearable value={searchForm['訂單編號起期']} onChange={(v) => handleInputChange('訂單編號起期', v)} />
                <CwSelect label="訂單編號迄期" placeholder="訂單編號迄期" options={emptyOptions} searchable clearable value={searchForm['訂單編號迄期']} onChange={(v) => handleInputChange('訂單編號迄期', v)} />
                <CwSelect label="流程編號起期" placeholder="流程編號起期" options={emptyOptions} searchable clearable value={searchForm['流程編號起期']} onChange={(v) => handleInputChange('流程編號起期', v)} />
                <CwSelect label="流程編號迄期" placeholder="流程編號迄期" options={emptyOptions} searchable clearable value={searchForm['流程編號迄期']} onChange={(v) => handleInputChange('流程編號迄期', v)} />
                <CwSelect label="來源編號起期" placeholder="來源編號起期" options={emptyOptions} searchable clearable value={searchForm['來源編號起期']} onChange={(v) => handleInputChange('來源編號起期', v)} />
                <CwSelect label="來源編號迄期" placeholder="來源編號迄期" options={emptyOptions} searchable clearable value={searchForm['來源編號迄期']} onChange={(v) => handleInputChange('來源編號迄期', v)} />
                <CwInput label="來源" placeholder="來源" value={searchForm['來源']} onChange={(e) => handleInputChange('來源', e.target.value)} />
              </div>
            </div>

            {/* 通路 / 行銷 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>通路 / 行銷</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="出貨方式" placeholder="出貨方式" options={shippingMethodOptions} searchable clearable value={searchForm['出貨方式']} onChange={(v) => handleInputChange('出貨方式', v)} />
                <CwInput label="出貨備註" placeholder="出貨備註" value={searchForm['出貨備註']} onChange={(e) => handleInputChange('出貨備註', e.target.value)} />
                <CwSelect label="行銷通路代碼" placeholder="行銷通路代碼" options={emptyOptions} searchable clearable value={searchForm['行銷通路代碼']} onChange={(v) => handleInputChange('行銷通路代碼', v)} />
                <CwInput label="行銷通路說明" placeholder="行銷通路說明" value={searchForm['行銷通路說明']} onChange={(e) => handleInputChange('行銷通路說明', e.target.value)} />
                <CwSelect label="行銷專案代碼" placeholder="行銷專案代碼" options={emptyOptions} searchable clearable value={searchForm['行銷專案代碼']} onChange={(v) => handleInputChange('行銷專案代碼', v)} />
                <CwInput label="行銷專案說明" placeholder="行銷專案說明" value={searchForm['行銷專案說明']} onChange={(e) => handleInputChange('行銷專案說明', e.target.value)} />                
            {/* 促銷方案代碼搜尋 */}
            <div className="flex flex-col gap-[6px]">
              <label className="text-[#1c1c1c] text-[12px] font-[500] font-['Noto_Sans_TC',_sans-serif]">促銷方案代碼</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="輸入促銷方案代碼"
                  value={searchForm['促銷方案代碼']}
                  onChange={(e) => handleInputChange('促銷方案代碼', e.target.value)}
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
                {searchForm['促銷方案代碼'] && (
                  <button
                    onClick={() => handleInputChange('促銷方案代碼', '')}
                    className="absolute right-[36px] w-[24px] h-[24px] text-[#7c808c] hover:text-[#1c1c1c] transition-colors"
                    title="清除"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
                <CwInput label="促銷方案說明" placeholder="促銷方案說明" value={searchForm['促銷方案說明']} onChange={(e) => handleInputChange('促銷方案說明', e.target.value)} />
              </div>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="行銷組盤碼" placeholder="行銷組盤碼" options={emptyOptions} searchable clearable value={searchForm['行銷組盤碼']} onChange={(v) => handleInputChange('行銷組盤碼', v)} />
              </div>
            </div>

            {/* 其他條件 */}
            <div className="space-y-[12px] pt-[4px] border-b border-gray-200 pb-[20px]">
              <SectionLabel>其他條件</SectionLabel>
              <div className="grid grid-cols-8 gap-[12px] items-end">
                <CwSelect label="信用卡卡號" placeholder="信用卡卡號" options={emptyOptions} searchable clearable value={searchForm['信用卡卡號']} onChange={(v) => handleInputChange('信用卡卡號', v)} />
                <CwSelect label="建單人員" placeholder="建單人員" options={creatorOptions} searchable clearable value={searchForm['建單人員']} onChange={(v) => handleInputChange('建單人員', v)} />
                <CwInput label="暫停處理" placeholder="暫停處理" value={searchForm['暫停處理']} onChange={(e) => handleInputChange('暫停處理', e.target.value)} />
                <CwSelect label="是否為贈閱單" placeholder="是否為贈閱單" options={emptyOptions} searchable clearable value={searchForm['是否為贈閱單']} onChange={(v) => handleInputChange('是否為贈閱單', v)} />
              </div>
            </div>
          </>
        )}

        {/* ── 底部按鈕 ── */}
        <div className="flex items-center justify-between pt-[4px]">
          <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw size={14} />} onClick={handleClear}>清除</CwButton>
          <CwButton variant="primary" appearance="filled" type="submit">查詢</CwButton>
        </div>
      </form>

      {/* ── 搜尋結果 ── */}
      {hasSearched && (
        <div className="space-y-[12px]">

          {/* 訂單類型 checkbox + 搜尋 + 欄位 filter */}
          <div className="flex items-center justify-between">
            {/* 左：訂單類型 checkbox（顏色與 table 標籤對應） */}
            <div className="flex items-center gap-[20px]">
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
                
                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>中台訂單</span>
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
                
                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>ERP 訂單</span>
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
                <span className="text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>OMG 訂單</span>
              </label>

              {/* 訂單狀態圖示說明 */}
              <button
                onClick={() => setShowStatusLegend(true)}
                className="flex items-center gap-[4px] text-[13px] text-[#7c808c] hover:text-[#0078d4] transition-colors"
                aria-label="訂單狀態圖示說明"
              >
                <Info className="w-[16px] h-[16px]" />
                <span className="font-['Noto_Sans_TC',_sans-serif] whitespace-nowrap" style={{ fontWeight: 350 }}>訂單狀態圖示</span>
              </button>

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
                      {[
                        { label: '輸入', color: '#faef6b' },
                        { label: '作廢', color: '#c97de8' },
                        { label: '止寄', color: '#82e07a' },
                        { label: '復寄', color: '#b59ee8' },
                        { label: '退訂', color: '#adadad' },
                        { label: '補贈電子', color: '#c5dff7' },
                      ].map(({ label, color }) => (
                        <div key={label} className="flex items-center gap-[10px] justify-center">
                          <span className="text-[13px] text-[#1c1c1c] w-[60px] text-right font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>{label}</span>
                          <div className="w-[40px] h-[22px] rounded-[3px]" style={{ backgroundColor: color }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-[16px]">
                      <button
                        onClick={() => setShowStatusLegend(false)}
                        className="px-[16px] h-[32px] rounded-[4px] border border-[#c4c9d3] text-[14px] text-[#1c1c1c] hover:bg-[#f5f7fa] transition-colors font-['Noto_Sans_TC',_sans-serif]"
                        style={{ fontWeight: 350 }}
                      >關閉</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 右：搜尋 input + 欄位 filter */}
            <div className="flex items-center gap-[8px]">
              <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] whitespace-nowrap">搜尋：</label>
              <CwInput
                placeholder="輸入關鍵字過濾"
                value={searchKeyword}
                onChange={(e) => { setSearchKeyword(e.target.value); setCurrentPage(1); }}
                width="280px"
              />

              {/* 欄位顯示 filter button */}
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

              {/* 欄位顯示 popup */}
              {showColumnFilter && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center" onClick={() => setShowColumnFilter(false)}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div
                    className="relative bg-white rounded-[8px] shadow-xl p-[20px] w-[320px]"
                    onClick={e => e.stopPropagation()}
                  >
                    <p className="text-[14px] text-[#1c1c1c] mb-[16px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 700 }}>欄位顯示設定</p>
                    <div className="grid grid-cols-2 gap-x-[16px] gap-y-[10px] mb-[20px]">
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

      {/* 訂單客編搜尋 Popup */}
      {showCustomerCodePopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => setShowCustomerCodePopup(false)}>
          <div
            ref={customerCodePopupRef}
            className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[700px] max-h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇訂單客編</h3>
              <button
                onClick={() => setShowCustomerCodePopup(false)}
                className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 搜尋 Input */}
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input
                type="text"
                placeholder="搜尋訂單客編或客戶名稱"
                value={customerCodePopupKeyword}
                onChange={(e) => setCustomerCodePopupKeyword(e.target.value)}
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              />
            </div>

            {/* 表格區域 */}
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
                  {filteredCustomerCodes.length > 0 ? (
                    filteredCustomerCodes.map((customer) => (
                      <tr key={customer.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                        <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{customer.code}</td>
                        <td className="px-[16px] py-[12px] text-[#1c1c1c]">{customer.name}</td>
                        <td className="px-[16px] py-[12px] text-[#7c808c]">{customer.phone}</td>
                        <td className="px-[16px] py-[12px] text-[#7c808c] truncate" title={customer.address}>{customer.address}</td>
                        <td className="px-[16px] py-[12px] text-center">
                          <button
                            onClick={() => handleSelectCustomerCode(customer.code, customer.name)}
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
                        查無符合的訂單客編
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 訂單客戶搜尋 Popup */}
      {showCustomerNamePopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => setShowCustomerNamePopup(false)}>
          <div
            ref={customerNamePopupRef}
            className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[700px] max-h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇訂單客戶</h3>
              <button
                onClick={() => setShowCustomerNamePopup(false)}
                className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 搜尋 Input */}
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input
                type="text"
                placeholder="搜尋客編或客戶名稱"
                value={customerNamePopupKeyword}
                onChange={(e) => setCustomerNamePopupKeyword(e.target.value)}
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              />
            </div>

            {/* 表格區域 */}
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
                  {filteredCustomerNames.length > 0 ? (
                    filteredCustomerNames.map((customer) => (
                      <tr key={customer.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                        <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{customer.code}</td>
                        <td className="px-[16px] py-[12px] text-[#1c1c1c]">{customer.name}</td>
                        <td className="px-[16px] py-[12px] text-[#7c808c]">{customer.phone}</td>
                        <td className="px-[16px] py-[12px] text-[#7c808c] truncate" title={customer.address}>{customer.address}</td>
                        <td className="px-[16px] py-[12px] text-center">
                          <button
                            onClick={() => handleSelectCustomerName(customer.code, customer.name)}
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
                        查無符合的訂單客戶
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 促銷方案搜尋 Popup */}
      {showPromotionPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center" onClick={() => setShowCustomerCodePopup(false)}>
          <div
            ref={customerCodePopupRef}
            className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[700px] max-h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇訂單客編</h3>
              <button
                onClick={() => setShowCustomerCodePopup(false)}
                className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 搜尋 Input */}
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input
                type="text"
                placeholder="搜尋訂單客編或客戶名稱"
                value={customerCodePopupKeyword}
                onChange={(e) => setCustomerCodePopupKeyword(e.target.value)}
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              />
            </div>

            {/* 表格區域 */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">客編代碼</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">客戶名稱</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerCodes.length > 0 ? (
                    filteredCustomerCodes.map((customer) => (
                      <tr key={customer.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                        <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{customer.code}</td>
                        <td className="px-[16px] py-[12px] text-[#1c1c1c]">{customer.name}</td>
                        <td className="px-[16px] py-[12px] text-center">
                          <button
                            onClick={() => handleSelectCustomerCode(customer.code, customer.name)}
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
                        查無符合的訂單客編
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 促銷方案搜尋 Popup */}
      {showPromotionPopup && (
        <div className="fixed inset-0 bg-black/40 z-[1100] flex items-center justify-center" onClick={() => setShowPromotionPopup(false)}>
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

NewPMOrderManagement.displayName = 'NewPMOrderManagement';
