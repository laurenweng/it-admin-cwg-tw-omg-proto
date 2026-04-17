import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwInput } from "./CwInput";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { CwButton } from "./CwButton";
import { CwDatePicker } from "./CwDatePicker";
import { CwTab, CwTabItem } from "./CwTab";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwPagination } from "./CwPagination";
import { CwRoundButton } from "./CwRoundButton";
import { CwTooltip } from "./CwTooltip";
import { CwPopup } from "./CwPopup";
import { CwTextButton } from "./CwTextButton";
import { StatusTag } from "./StatusTag";
import { CwToast } from "./CwToast";

// 會員詳細資料型別
interface MemberDetailData {
  id: number;
  account: string;
  email: string;
  name: string;
  phone: string;
  contactPhone: string;
  gender: string;
  birthday: Date | null;
  registrationSource: string;
  verificationTime: string;
  registrationTime: string;
  marketingConsent: string;
  lastLoginTime: string;
  country: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  password: string;
}

// 性別選項
const genderOptions: CwSelectOption[] = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "other", label: "其他" },
];

// 標籤頁選項
const tabs: CwTabItem[] = [
  { id: "member-info", label: "會員資料" },
  { id: "binding-management", label: "綁定管理" },
  { id: "order-record", label: "訂單紀錄" },
  { id: "auto-renewal", label: "自動續訂" },
  { id: "newsletter-subscription", label: "電子報訂閱" },
  { id: "subscriber-rights", label: "訂戶權益" },
  { id: "children-data", label: "子女資料" },
  { id: "user-journey", label: "UserJourney" },
];

interface MemberDetailProps {
  memberId?: number;
  onBack?: () => void;
  onViewOrder?: (orderNumber: string) => void;
}

export function MemberDetail({ memberId, onBack, onViewOrder }: MemberDetailProps) {
  const [activeTab, setActiveTab] = useState("member-info");
  const [memberData, setMemberData] = useState<MemberDetailData>({
    id: memberId || 1,
    account: "wang.xiaoming@example.com",
    email: "wang.xiaoming@example.com",
    name: "王小明",
    phone: "0912345678",
    contactPhone: "0912345678",
    gender: "female",
    birthday: new Date("1985-09-29"),
    registrationSource: "C",
    verificationTime: "2020-09-30 10:15:30",
    registrationTime: "2020-09-29 15:37:52",
    marketingConsent: "是",
    lastLoginTime: "",
    country: "台灣",
    city: "台北市",
    district: "大安區",
    postalCode: "106",
    address: "復興南路一段123號",
    password: "",
  });

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "會員管理", href: "/members" },
    { label: "會員資料" }
  ];

  const handleBreadcrumbNavigate = (href: string, index: number) => {
    console.log(`導航到: ${href}, 索引: ${index}`);
    if (href === "/members" && onBack) {
      onBack();
    }
  };

  const handleInputChange = (field: keyof MemberDetailData, value: string | Date | null) => {
    setMemberData(prev => ({ ...prev, [field]: value }));
  };

  // 綁定管理相關狀態
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [subscriberPage, setSubscriberPage] = useState(1);
  const [subscriberPageSize, setSubscriberPageSize] = useState(10);

  const [phoneSearch, setPhoneSearch] = useState("");
  const [phonePage, setPhonePage] = useState(1);
  const [phonePageSize, setPhonePageSize] = useState(10);

  const [thirdPartySearch, setThirdPartySearch] = useState("");
  const [thirdPartyPage, setThirdPartyPage] = useState(1);
  const [thirdPartyPageSize, setThirdPartyPageSize] = useState(10);

  const [line20Search, setLine20Search] = useState("");

  // 發票編輯 popup 相關狀態
  const [isInvoicePopupOpen, setIsInvoicePopupOpen] = useState(false);
  const [selectedRenewalRecord, setSelectedRenewalRecord] = useState<any>(null);
  
  // 發票資訊狀態
  const [invoiceType, setInvoiceType] = useState("公司戶電子發票");
  const [invoiceCarrierType, setInvoiceCarrierType] = useState("");
  const [invoiceCarrierCode, setInvoiceCarrierCode] = useState("");
  const [invoiceDonationCode, setInvoiceDonationCode] = useState("");
  const [invoiceTitle, setInvoiceTitle] = useState("JEFF");
  const [invoiceTaxId, setInvoiceTaxId] = useState("99999999");
  
  // 發票收件人地址狀態
  const [invoiceCountry, setInvoiceCountry] = useState("TW");
  const [invoicePostalCode, setInvoicePostalCode] = useState("104");
  const [invoiceCity, setInvoiceCity] = useState("台北市");
  const [invoiceDistrict, setInvoiceDistrict] = useState("中山區");
  const [invoiceAddress, setInvoiceAddress] = useState("郵政總局IPOLKJ20027fe+3@GMAIL.COM");
  
  // 發票收件Email狀態
  const [originalInvoiceEmail, setOriginalInvoiceEmail] = useState("");
  const [updatedInvoiceEmail, setUpdatedInvoiceEmail] = useState("");

  // 修改權益 popup 相關狀態
  const [isRightsPopupOpen, setIsRightsPopupOpen] = useState(false);
  const [selectedRightsItem, setSelectedRightsItem] = useState<any>(null);
  const [selectedRightsType, setSelectedRightsType] = useState<"website" | "app">("website");
  const [rightsExpiryDate, setRightsExpiryDate] = useState<Date | null>(null);
  
  // Toast 狀態
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info" | "warning" | "question">("success");
  const [showToast, setShowToast] = useState(false);

  // 發票類型選項
  const invoiceTypeOptions: CwSelectOption[] = [
    { value: "公司戶電子發票", label: "公司戶電子發票" },
    { value: "紙本發票", label: "紙本發票" },
    { value: "會員載具", label: "會員載具" },
    { value: "手機條碼載具", label: "手機條碼載具" },
    { value: "自然人憑證載具", label: "自然人憑證載具" },
    { value: "捐贈發票", label: "捐贈發票" },
    { value: "不開立", label: "不開立" },
  ];
  const [line20Page, setLine20Page] = useState(1);
  const [line20PageSize, setLine20PageSize] = useState(10);

  // 訂單記錄相關狀態
  const [orderRecordSearch, setOrderRecordSearch] = useState("");
  const [orderRecordPage, setOrderRecordPage] = useState(1);
  const [orderRecordPageSize, setOrderRecordPageSize] = useState(10);

  const [subscriptionProductSearch, setSubscriptionProductSearch] = useState("");
  const [subscriptionProductPage, setSubscriptionProductPage] = useState(1);
  const [subscriptionProductPageSize, setSubscriptionProductPageSize] = useState(10);

  const [courseProductSearch, setCourseProductSearch] = useState("");
  const [courseProductPage, setCourseProductPage] = useState(1);
  const [courseProductPageSize, setCourseProductPageSize] = useState(10);

  // 自動續訂相關狀態
  const [autoRenewalSearch, setAutoRenewalSearch] = useState("");
  const [autoRenewalPage, setAutoRenewalPage] = useState(1);
  const [autoRenewalPageSize, setAutoRenewalPageSize] = useState(10);

  // 電子報訂閱相關狀態
  const [newsletterSearch, setNewsletterSearch] = useState("");
  const [newsletterPage, setNewsletterPage] = useState(1);
  const [newsletterPageSize, setNewsletterPageSize] = useState(10);

  // 關聯訂戶 popup 狀態
  const [showSubscriberPopup, setShowSubscriberPopup] = useState(false);
  const [subscriberId, setSubscriberId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberNote, setSubscriberNote] = useState("");

  // 綁定管理資料（示範資料）
  const subscriberData = [
    { id: 1, subscriberId: "1234567", subscriberName: "王小明", relationType: "connect", relationDate: "2024-09-15", note: "訂單(CW2024091500123)權益計算，因為訂戶(收件人)產生關聯：wang.xiaoming@example.com to M123456", viewSubscriber: "", action: "" },
    { id: 2, subscriberId: "7654321", subscriberName: "陳美玲", relationType: "後台關聯", relationDate: "2023-12-01", note: "客服手動建立關聯", viewSubscriber: "", action: "" }
  ];
  const phoneData = [
    { id: 1, phone: "0912345678", socialId: "LINE_abc123xyz456" }
  ];
  const thirdPartyData = [{ id: 1, type: "google" }];
  const line20Data = [
    { id: 1, product: "天下雜誌電子報" },
    { id: 2, product: "康健雜誌每日報" }
  ];

  // 訂單記錄資料（示範資料）
  const orderRecordData = [
    { id: 1, orderDate: "2024-11-01", orderNumber: "100110123", subscriberId: "1234567", recipient: "王小明", orderAmount: "NT$1,980", paymentMethod: "信用卡", sourceSystem: "官網", channelDescription: "線上訂閱", orderStatus: "已完成", shippingStatus: "已送達" },
    { id: 2, orderDate: "2024-10-15", orderNumber: "101500456", subscriberId: "7654321", recipient: "陳美玲", orderAmount: "NT$2,500", paymentMethod: "ATM轉帳", sourceSystem: "官網", channelDescription: "年度訂閱優惠", orderStatus: "處理中", shippingStatus: "配送中" },
    { id: 3, orderDate: "2024-09-20", orderNumber: "092000789", subscriberId: "2345678", recipient: "李怡芳", orderAmount: "NT$3,200", paymentMethod: "信用卡", sourceSystem: "官網", channelDescription: "線上課程", orderStatus: "已完成", shippingStatus: "已送達" },
    { id: 4, orderDate: "2024-08-10", orderNumber: "081000321", subscriberId: "3456789", recipient: "張家豪", orderAmount: "NT$1,500", paymentMethod: "超商付款", sourceSystem: "官網", channelDescription: "單期購買", orderStatus: "已取消", shippingStatus: "未出貨" }
  ];
  const subscriptionProductData = [
    { id: 1, orderDate: "2024-11-01", orderNumber: "100110123", subscriberId: "1234567", recipient: "王小明", productName: "天下雜誌年訂12期", orderAmount: "NT$1,980", subscriptionStartDate: "2024-11-01 09:30:00", subscriptionEndDate: "2025-10-31 23:59:59", orderStatus: "已完成", sourceSystem: "官網", channelDescription: "線上訂閱" }
  ];
  const courseProductData = [
    { id: 1, orderDate: "2024-09-20", orderNumber: "092000789", subscriberId: "1234567", recipient: "王小明", productName: "親子天下-數位教養課程", orderAmount: "NT$3,200", sourceSystem: "官網", channelDescription: "線上課程" }
  ];

  // 自動續訂資料（示範資料）
  const otherProductAutoRenewalData = [
    { id: 1, product: "翻轉教育", status: "N" }
  ];
  const autoRenewalData = [
    { id: 1, subscriberId: "1234567", renewalPlan: "天下雜誌年訂", deductionAmount: "NT$1,980", deductionDate: "2025-11-01", renewalStatus: "已扣款", originalOrderInfo: "100110123(信用卡-中國信託)100110234", note: "", modifiedBy: "admin@example.com", modifiedTime: "2024-10-20 14:30:00" },
    { id: 2, subscriberId: "7654321", renewalPlan: "康健雜誌半年訂", deductionAmount: "NT$1,200", deductionDate: "2025-12-01", renewalStatus: "待扣款", originalOrderInfo: "060100567(信用卡-玉山銀行)060100678", note: "已聯繫確認", modifiedBy: "service@example.com", modifiedTime: "2024-11-15 10:15:00" }
  ];

  // 電子報訂閱資料（示範資料）
  const newsletterData = [
    { id: 1, bu: "天下", newsletterName: "天下每日報", isSubscribed: "是", subscriptionTime: "2024-01-15 10:30:00", unsubscribeTime: "", action: "", unopenedExpiry: "" },
    { id: 2, bu: "康健", newsletterName: "康健每日報", isSubscribed: "是", subscriptionTime: "2024-03-20 14:20:00", unsubscribeTime: "", action: "", unopenedExpiry: "2025-03-20 14:20:00" }
  ];

  // 子女資料相關狀態
  const [childrenSearch, setChildrenSearch] = useState("");
  const [childrenPage, setChildrenPage] = useState(1);
  const [childrenPageSize, setChildrenPageSize] = useState(10);

  // 子女資料（示範資料）
  const childrenData = [
    { id: 1, relationship: "兒子", gender: "男", birthday: "2015-06-10", updateDate: "2024-09-15 11:30:00" },
    { id: 2, relationship: "女兒", gender: "女", birthday: "2018-03-22", updateDate: "2024-09-15 11:32:00" }
  ];

  // UserJourney 相關狀態
  const [userJourneySearch, setUserJourneySearch] = useState("");
  const [userJourneyPage, setUserJourneyPage] = useState(1);
  const [userJourneyPageSize, setUserJourneyPageSize] = useState(10);

  // UserJourney 資料（示範資料）
  const userJourneyData = [
    {
      id: 1,
      majorCategory: "會員",
      subCategory: "修改會員資料",
      source: "member-api",
      changeContent: "帳號：wang.xiaoming@example.com, uuid：bee9ea60-2a46-11f0-9fe2-df78bff1ec58, 信箱：wang.xiaoming@example.com, 姓名：王小明, 手機：0912345678, 是否啟用帳號：啟用",
      changeDate: "2025-06-23 11:25:41",
      customerNumber: ""
    },
    {
      id: 2,
      majorCategory: "會員",
      subCategory: "帳號密碼修改",
      source: "MemberApi",
      changeContent: "申請網站：line, 操作者：wang.xiaoming@example.com",
      changeDate: "2025-06-23 11:25:40",
      customerNumber: ""
    },
    {
      id: 3,
      majorCategory: "會員",
      subCategory: "寄出密碼重置信",
      source: "會員認證中心",
      changeContent: "申請人：wang.xiaoming@example.com, 操作者：wang.xiaoming@example.com, 申請網站：cwbk",
      changeDate: "2025-06-23 11:25:06",
      customerNumber: ""
    },
    {
      id: 4,
      majorCategory: "會員",
      subCategory: "第三方連結修改",
      source: "MemberApi",
      changeContent: "第三方名稱：google, 更改連結狀態：取消綁定, 操作者：chen.xiaohua@example.com",
      changeDate: "2025-06-23 11:22:33",
      customerNumber: ""
    },
    {
      id: 5,
      majorCategory: "會員",
      subCategory: "修改會員資料",
      source: "member-api",
      changeContent: "帳號：wang.xiaoming@example.com, uuid：bee9ea60-2a46-11f0-9fe2-df78bff1ec58, 信箱：wang.xiaoming@example.com, 姓名：王小明, 手機：0912345678, 是否啟用帳號：2",
      changeDate: "2025-05-06 15:11:59",
      customerNumber: ""
    }
  ];

  // 訂戶權益資料（示範資料）
  const paperRightsData = [
    { id: 1, product: "天下雜誌", subscriberId: "1234567", subscriberName: "王小明", autoRenewal: "是", recentStartDate: "2024-11-01", recentEndDate: "2025-10-31", subscriptionStartDate: "2024-11-01", subscriptionEndDate: "2025-10-31", physicalYears: "1" },
    { id: 2, product: "康健雜誌", subscriberId: "7654321", subscriberName: "陳美玲", autoRenewal: "否", recentStartDate: "2024-06-01", recentEndDate: "2025-05-31", subscriptionStartDate: "2024-06-01", subscriptionEndDate: "2025-05-31", physicalYears: "2" }
  ];
  const digitalRightsData = [
    { id: 1, memberAccount: "wang.xiaoming@example.com", memberEmail: "wang.xiaoming@example.com", product: "天下雜誌", autoRenewal: "是", recentStartDate: "2024-11-01", recentEndDate: "2025-10-31", rightsExpiry: "2025-10-31", physicalYears: "1" }
  ];
  const websiteRightsData = [
    { id: 1, website: "天下", expiryDate: "", action: "" },
    { id: 2, website: "胡敏技", expiryDate: "", action: "" },
    { id: 3, website: "康健", expiryDate: "", action: "" }
  ];
  const appRightsData = [
    { id: 1, app: "天下每日報APP", expiryDate: "", action: "" }
  ];

  // 綁定管理表格欄位定義
  const subscriberColumns: CwTableColumn[] = [
    { key: "subscriberId", title: "訂戶編號", width: "110px" },
    { key: "subscriberName", title: "訂戶姓名", width: "110px" },
    { key: "relationType", title: "關聯方式", width: "110px" },
    { key: "relationDate", title: "關聯日期", width: "140px" },
    { key: "note", title: "備註" },
    { 
      key: "viewSubscriber", 
      title: "檢視訂戶", 
      width: "100px", 
      align: "center",
      render: () => (
        <CwTextButton 
          label="檢視詳情" 
          icon="document" 
          variant="primary" 
          onClick={() => console.log("檢視訂戶詳情")} 
        />
      )
    },
    { 
      key: "action", 
      title: "功能", 
      width: "100px", 
      align: "center",
      render: () => (
        <CwTextButton 
          label="取消關聯" 
          icon="close" 
          variant="destructive" 
          onClick={() => console.log("取消關聯")} 
        />
      )
    },
  ];

  const phoneColumns: CwTableColumn[] = [
    { key: "phone", title: "手機", width: "150px" },
    { key: "socialId", title: "Social id", width: "200px" },
    { 
      key: "action", 
      title: "功能", 
      width: "80px", 
      align: "center",
      render: () => (
        <CwTooltip content="刪除">
          <CwRoundButton icon="delete" variant="destructive" />
        </CwTooltip>
      )
    },
  ];

  const thirdPartyColumns: CwTableColumn[] = [
    { key: "type", title: "第三方類型", width: "200px" },
    { 
      key: "action", 
      title: "功能", 
      width: "120px", 
      align: "center",
      render: () => (
        <CwButton variant="destructive" appearance="filled">
          解除綁定
        </CwButton>
      )
    },
  ];

  const line20Columns: CwTableColumn[] = [
    { key: "product", title: "Line 2.0 產品", width: "250px" },
    { 
      key: "action", 
      title: "功能", 
      width: "80px", 
      align: "center",
      render: () => (
        <CwTooltip content="刪除">
          <CwRoundButton icon="delete" variant="destructive" />
        </CwTooltip>
      )
    },
  ];

  // ���單記錄表格欄位定義
  const orderRecordColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "60px" },
    { key: "orderDate", title: "訂單日期", width: "110px" },
    { key: "orderNumber", title: "訂單單號", width: "150px" },
    { key: "subscriberId", title: "訂戶編號", width: "100px" },
    { key: "recipient", title: "產品收件人", width: "110px" },
    { key: "orderAmount", title: "訂單金額", width: "110px" },
    { key: "paymentMethod", title: "付款方式", width: "100px" },
    { key: "sourceSystem", title: "來源系統", width: "100px" },
    { key: "channelDescription", title: "通路說明", width: "120px" },
    { 
      key: "orderStatus", 
      title: "訂單狀態", 
      width: "110px",
      render: (value: any, record: any) => {
        const statusMap: Record<string, 'success' | 'warning' | 'default'> = {
          '已完成': 'success',
          '處理中': 'warning',
          '已取消': 'default'
        };
        return <StatusTag variant={statusMap[record.orderStatus] || 'default'}>{record.orderStatus}</StatusTag>;
      }
    },
    { 
      key: "shippingStatus", 
      title: "出貨狀態", 
      width: "110px",
      render: (value: any, record: any) => {
        const statusMap: Record<string, 'success' | 'info' | 'default'> = {
          '已送達': 'success',
          '配送中': 'info',
          '未出貨': 'default'
        };
        return <StatusTag variant={statusMap[record.shippingStatus] || 'default'}>{record.shippingStatus}</StatusTag>;
      }
    },
    { 
      key: "action", 
      title: "功能", 
      width: "180px",
      align: "left",
      render: (value: any, record: any) => (
        <div className="flex flex-col gap-[8px]">
          <CwTextButton
            label="檢視詳情"
            icon="document"
            onClick={() => onViewOrder?.(record.orderNumber)}
          />
          <CwTextButton
            label="查詢貨態"
            icon="view"
            onClick={() => console.log('查詢貨態', record.orderNumber)}
          />
        </div>
      )
    },
  ];

  // 訂閱商品表格欄位定義
  const subscriptionProductColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "60px" },
    { key: "orderDate", title: "訂單日期", width: "110px" },
    { key: "orderNumber", title: "訂單單號", width: "110px" },
    { key: "subscriberId", title: "訂戶編號", width: "110px" },
    { key: "recipient", title: "產品收件人", width: "110px" },
    { key: "productName", title: "產品名稱", width: "150px" },
    { key: "orderAmount", title: "訂單金額", width: "100px" },
    { key: "subscriptionStartDate", title: "訂閱起日", width: "160px" },
    { key: "subscriptionEndDate", title: "訂閱迄日", width: "160px" },
    { 
      key: "orderStatus", 
      title: "訂單狀態", 
      width: "110px",
      render: (value: any, record: any) => {
        const statusMap: Record<string, 'success' | 'warning' | 'default'> = {
          '已完成': 'success',
          '處理中': 'warning',
          '已取消': 'default'
        };
        return <StatusTag variant={statusMap[record.orderStatus] || 'default'}>{record.orderStatus}</StatusTag>;
      }
    },
    { key: "sourceSystem", title: "來源系統", width: "100px" },
    { key: "channelDescription", title: "通路說明", width: "120px" },
  ];

  // 課程商品表格欄位定義
  const courseProductColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "60px" },
    { key: "orderDate", title: "訂單日期", width: "110px" },
    { key: "orderNumber", title: "訂單單號", width: "110px" },
    { key: "subscriberId", title: "訂戶編號", width: "110px" },
    { key: "recipient", title: "收件人", width: "110px" },
    { key: "productName", title: "產品名稱", width: "200px" },
    { key: "orderAmount", title: "訂單金額", width: "100px" },
    { key: "sourceSystem", title: "來源系統", width: "100px" },
    { key: "channelDescription", title: "通路說明", width: "120px" },
  ];

  // 其他產品自動續訂表格欄位定義
  const otherProductAutoRenewalColumns: CwTableColumn[] = [
    { key: "product", title: "產品", width: "200px" },
    { key: "status", title: "狀態", width: "100px" },
    { key: "action", title: "功能", width: "100px" },
  ];

  // 自動續訂表格欄位定義
  const autoRenewalColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "60px" },
    { key: "subscriberId", title: "訂戶編號", width: "110px" },
    { key: "renewalPlan", title: "續訂方案", width: "150px" },
    { key: "deductionAmount", title: "扣款金額", width: "100px" },
    { key: "deductionDate", title: "扣款日期", width: "110px" },
    { key: "renewalStatus", title: "續訂單狀態", width: "110px" },
    { key: "originalOrderInfo", title: "原單號(金流方式-收款銀行)續訂單號", width: "280px" },
    { key: "note", title: "說明", width: "120px" },
    { key: "modifiedBy", title: "異動人員帳號", width: "150px" },
    { key: "modifiedTime", title: "異動時間", width: "160px" },
    { 
      key: "action", 
      title: "功能", 
      width: "180px",
      align: "left",
      render: (value: any, record: any) => (
        <div className="flex flex-col gap-[8px]">
          <CwTextButton
            label="發票編輯"
            icon="edit"
            onClick={() => {
              setSelectedRenewalRecord(record);
              setIsInvoicePopupOpen(true);
            }}
          />
          <CwTextButton
            label="取消續訂"
            icon="close"
            variant="destructive"
            onClick={() => console.log('取消續訂', record.subscriberId)}
          />
        </div>
      )
    },
  ];

  // 電子報訂閱表格欄位定義
  const newsletterColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "60px" },
    { key: "bu", title: "BU", width: "100px" },
    { key: "newsletterName", title: "電子報名稱", width: "180px" },
    { key: "isSubscribed", title: "是否訂閱", width: "100px" },
    { key: "subscriptionTime", title: "訂閱時間", width: "140px" },
    { key: "unsubscribeTime", title: "取消訂閱時間", width: "140px" },
    { 
      key: "action", 
      title: "功能", 
      width: "120px", 
      align: "left",
      render: (value: any, record: any) => (
        <CwTextButton
          label="取消訂閱"
          icon="close"
          variant="destructive"
          onClick={() => console.log('取消訂閱', record.id)}
        />
      )
    },
    { key: "unopenedExpiry", title: "未開信註銷時間", width: "160px" },
  ];

  // 子女資料表格欄位定義
  const childrenColumns: CwTableColumn[] = [
    { key: "relationship", title: "小孩關係", width: "120px" },
    { key: "gender", title: "小孩性別", width: "120px" },
    { key: "birthday", title: "小孩生日", width: "150px" },
    { key: "updateDate", title: "資料更新日期", width: "180px" },
  ];

  // UserJourney 表格欄位定義
  const userJourneyColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "70px" },
    { key: "majorCategory", title: "大分類", width: "100px" },
    { key: "subCategory", title: "中台分類", width: "140px" },
    { key: "source", title: "來源", width: "140px" },
    { key: "changeContent", title: "異動內容", width: "400px" },
    { key: "changeDate", title: "異動日期", width: "160px" },
    { key: "customerNumber", title: "客戶編號", width: "120px" },
  ];

  // 紙本權益表格欄位定義
  const paperRightsColumns: CwTableColumn[] = [
    { key: "id", title: "", width: "60px" },
    { key: "product", title: "產品名", width: "120px" },
    { key: "subscriberId", title: "訂戶編號", width: "110px" },
    { key: "subscriberName", title: "訂戶姓名", width: "110px" },
    { key: "autoRenewal", title: "自動續訂", width: "100px" },
    { key: "recentStartDate", title: "最近訂閱起日", width: "120px" },
    { key: "recentEndDate", title: "最近訂閱到期日", width: "140px" },
    { key: "subscriptionStartDate", title: "訂閱起始日", width: "120px" },
    { key: "subscriptionEndDate", title: "訂閱到期日", width: "120px" },
    { key: "physicalYears", title: "累積年資", width: "100px" },
    { 
      key: "action", 
      title: "功能", 
      width: "100px", 
      align: "center",
      render: (value: any, record: any) => (
        <CwTextButton
          label="權益紀錄"
          icon="document"
          onClick={() => console.log('查看權益紀錄', record.subscriberId)}
        />
      )
    },
  ];

  // 數位權益表格欄位定義
  const digitalRightsColumns: CwTableColumn[] = [
    { key: "id", title: "#", width: "60px" },
    { key: "memberAccount", title: "會員帳號", width: "140px" },
    { key: "memberEmail", title: "會員email", width: "180px" },
    { key: "product", title: "產品名", width: "110px" },
    { key: "autoRenewal", title: "自動續訂", width: "100px" },
    { key: "recentStartDate", title: "最近訂閱起日", width: "120px" },
    { key: "recentEndDate", title: "最近訂閱到期日", width: "140px" },
    { key: "rightsExpiry", title: "權益到期日", width: "120px" },
    { key: "physicalYears", title: "累積年資", width: "100px" },
    { 
      key: "action", 
      title: "功能", 
      width: "100px", 
      align: "center",
      render: (value: any, record: any) => (
        <div className="flex flex-col gap-[8px]">
          <CwTextButton
            label="權益紀錄"
            icon="document"
            onClick={() => console.log('查看權益紀錄', record.id)}
          />
          <CwTextButton
            label="修改權益"
            icon="edit"
            onClick={() => {
              setSelectedRightsItem(record);
              setSelectedRightsType("website");
              setRightsExpiryDate(record.rightsExpiry ? new Date(record.rightsExpiry) : null);
              setIsRightsPopupOpen(true);
            }}
          />
        </div>
      )
    },
  ];

  // 網站觀看權益表格欄位定義
  const websiteRightsColumns: CwTableColumn[] = [
    { key: "website", title: "網站", width: "180px" },
    { key: "expiryDate", title: "權益到期日", width: "150px" },
    { 
      key: "action", 
      title: "功能", 
      width: "100px", 
      align: "center",
      render: (value: any, record: any) => (
        <CwTextButton
          label="修改權益"
          icon="edit"
          onClick={() => {
            setSelectedRightsItem(record);
            setSelectedRightsType("website");
            setRightsExpiryDate(record.expiryDate ? new Date(record.expiryDate) : null);
            setIsRightsPopupOpen(true);
          }}
        />
      )
    },
  ];

  // APP臨時觀看權益表格欄位定義
  const appRightsColumns: CwTableColumn[] = [
    { key: "app", title: "APP", width: "200px" },
    { key: "expiryDate", title: "權益到期日", width: "150px" },
    { 
      key: "action", 
      title: "功能", 
      width: "100px", 
      align: "center",
      render: (value: any, record: any) => (
        <CwTextButton
          label="修改權益"
          icon="edit"
          onClick={() => {
            setSelectedRightsItem(record);
            setSelectedRightsType("app");
            setRightsExpiryDate(record.expiryDate ? new Date(record.expiryDate) : null);
            setIsRightsPopupOpen(true);
          }}
        />
      )
    },
  ];

  // 處理修改權益確認
  const handleConfirmRights = () => {
    try {
      // 這裡應該調用 API 更新權益到期日
      console.log('更新權益到期日:', rightsExpiryDate);
      
      // 模擬 API 調用成功
      setToastMessage('權益修改成功');
      setToastType('success');
      setShowToast(true);
      
      // 關閉 popup
      setIsRightsPopupOpen(false);
      
      // 重置狀態
      setSelectedRightsItem(null);
      setRightsExpiryDate(null);
    } catch (error) {
      // 處理錯誤
      setToastMessage('權益修改失敗，請稍後再試');
      setToastType('error');
      setShowToast(true);
    }
  };

  // 處理修改權益取消
  const handleCancelRights = () => {
    setIsRightsPopupOpen(false);
    setSelectedRightsItem(null);
    setRightsExpiryDate(null);
  };

  // 處理「今天」按鈕點擊
  const handleSetToday = () => {
    setRightsExpiryDate(new Date());
  };

  // 根據當前頁籤動態生成標題
  const pageTitle = `會員管理 - ${tabs.find(tab => tab.id === activeTab)?.label || '會員資料'}`;

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        title={pageTitle}
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
      />

      {/* 頂部資訊區域 */}
      <div className="grid grid-cols-4 gap-[12px]">
        <CwInput
          label="姓名"
          value={memberData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled
        />
        <CwInput
          label="手機號碼"
          value={memberData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled
        />
        <CwInput
          label="帳號"
          value={memberData.account}
          onChange={(e) => handleInputChange('account', e.target.value)}
          disabled
        />
        <CwInput
          label="註冊來源"
          value={memberData.registrationSource}
          onChange={(e) => handleInputChange('registrationSource', e.target.value)}
          disabled
        />
      </div>

      <div className="grid grid-cols-4 gap-[12px]">
        <CwInput
          label="通過驗證時間"
          value={memberData.verificationTime}
          onChange={(e) => handleInputChange('verificationTime', e.target.value)}
          disabled
        />
        <CwInput
          label="會員註冊時間"
          value={memberData.registrationTime}
          onChange={(e) => handleInputChange('registrationTime', e.target.value)}
          disabled
        />
        <CwInput
          label="同意行銷"
          value={memberData.marketingConsent}
          onChange={(e) => handleInputChange('marketingConsent', e.target.value)}
          disabled
        />
        <CwInput
          label="最後登入時間"
          value={memberData.lastLoginTime}
          onChange={(e) => handleInputChange('lastLoginTime', e.target.value)}
          disabled
        />
      </div>

      {/* 標籤頁導航 */}
      <CwTab
        items={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      {/* 標籤頁內容 */}
      {activeTab === "member-info" && (
        <div className="space-y-[20px]">
          {/* 基本資料 */}
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              姓名：
            </label>
            <div className="w-[200px]">
              <CwInput
                placeholder="請輸入姓名"
                value={memberData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              性別：
            </label>
            <div className="w-[200px]">
              <CwSelect
                placeholder="請選擇性別"
                options={genderOptions}
                value={memberData.gender}
                onChange={(value) => handleInputChange('gender', value as string)}
              />
            </div>
          </div>

          {/* 帳號 */}
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              帳號：
            </label>
            <div className="w-[200px]">
              <CwInput
                placeholder="請輸入帳號"
                value={memberData.account}
                onChange={(e) => handleInputChange('account', e.target.value)}
              />
            </div>
            <CwButton
              variant="destructive"
              appearance="filled"
            >
              修改帳號
            </CwButton>
            <CwButton
              variant="primary"
              appearance="outlined"
            >
              發送Email
            </CwButton>
          </div>

          {/* Email */}
          <div className="space-y-[8px]">
            <div className="flex items-center gap-[8px]">
              <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
                Email：
              </label>
              <div className="w-[200px]">
                <CwInput
                  placeholder="請輸入Email"
                  value={memberData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <CwButton
                variant="destructive"
                appearance="filled"
              >
                修改Email
              </CwButton>
              <CwButton
                variant="primary"
                appearance="outlined"
              >
                寄送驗證信
              </CwButton>
              <CwButton
                variant="primary"
                appearance="outlined"
              >
                驗證Email
              </CwButton>
            </div>
            <div className="flex gap-[8px]">
              <div className="w-[80px] shrink-0"></div>
              <p className="text-[#7c808c]" style={{ fontSize: 'var(--text-xxs)' }}>
                Email已通過驗證
              </p>
            </div>
          </div>

          {/* 手機號碼 */}
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              手機號碼：
            </label>
            <div className="w-[200px]">
              <CwInput
                placeholder="請輸入手機號碼"
                value={memberData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <CwButton
              variant="primary"
              appearance="outlined"
            >
              綁定手機
            </CwButton>
          </div>

          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              聯絡手機：
            </label>
            <div className="w-[200px]">
              <CwInput
                placeholder="��輸入聯絡手機"
                value={memberData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              />
            </div>
          </div>

          {/* 生日 */}
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              生日：
            </label>
            <div className="w-[200px]">
              <CwDatePicker
                placeholder="年/月/日"
                value={memberData.birthday}
                onChange={(date) => handleInputChange('birthday', date)}
              />
            </div>
          </div>

          {/* 地址 */}
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              地址：
            </label>
            <div className="flex-1 flex items-center">
              {/* 國別 */}
              <div className="relative h-[35px]" style={{ width: '80px' }}>
                <input
                  type="text"
                  placeholder="國別"
                  value={memberData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full h-full px-[12px] bg-white border border-[#7c808c] rounded-l-[4px] font-['Noto_Sans_TC',_sans-serif] font-[350] text-[14px] text-[#1c1c1c] placeholder:text-[#cdcdcd] outline-none focus:border-[#0078d4] focus:shadow-[0px_0px_4px_0px_#01579b] transition-all"
                />
              </div>
              
              {/* 縣市別 */}
              <div className="relative h-[35px]" style={{ width: '120px' }}>
                <input
                  type="text"
                  placeholder="請填入縣市別"
                  value={memberData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full h-full px-[12px] bg-white border-t border-b border-r border-[#7c808c] border-l-0 font-['Noto_Sans_TC',_sans-serif] font-[350] text-[14px] text-[#1c1c1c] placeholder:text-[#cdcdcd] outline-none focus:border-[#0078d4] focus:shadow-[0px_0px_4px_0px_#01579b] focus:border-l focus:relative focus:z-10 transition-all"
                />
              </div>
              
              {/* 鄉鎮區 */}
              <div className="relative h-[35px]" style={{ width: '120px' }}>
                <input
                  type="text"
                  placeholder="請填入鄉鎮區"
                  value={memberData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full h-full px-[12px] bg-white border-t border-b border-r border-[#7c808c] border-l-0 font-['Noto_Sans_TC',_sans-serif] font-[350] text-[14px] text-[#1c1c1c] placeholder:text-[#cdcdcd] outline-none focus:border-[#0078d4] focus:shadow-[0px_0px_4px_0px_#01579b] focus:border-l focus:relative focus:z-10 transition-all"
                />
              </div>
              
              {/* 郵遞區號 */}
              <div className="relative h-[35px]" style={{ width: '120px' }}>
                <input
                  type="text"
                  placeholder="請填入郵遞區號"
                  value={memberData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full h-full px-[12px] bg-white border-t border-b border-r border-[#7c808c] border-l-0 font-['Noto_Sans_TC',_sans-serif] font-[350] text-[14px] text-[#1c1c1c] placeholder:text-[#cdcdcd] outline-none focus:border-[#0078d4] focus:shadow-[0px_0px_4px_0px_#01579b] focus:border-l focus:relative focus:z-10 transition-all"
                />
              </div>
              
              {/* 地址 */}
              <div className="relative h-[35px] flex-1">
                <input
                  type="text"
                  placeholder="請填入地址"
                  value={memberData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full h-full px-[12px] bg-white border-t border-b border-r border-[#7c808c] border-l-0 rounded-r-[4px] font-['Noto_Sans_TC',_sans-serif] font-[350] text-[14px] text-[#1c1c1c] placeholder:text-[#cdcdcd] outline-none focus:border-[#0078d4] focus:shadow-[0px_0px_4px_0px_#01579b] focus:border-l focus:relative focus:z-10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 修改密碼 */}
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#1c1c1c] text-[14px] w-[80px] text-right shrink-0">
              修改密碼：
            </label>
            <div className="w-[200px]">
              <CwInput
                placeholder="請填入密碼(8-20碼英數字)"
                type="password"
                value={memberData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            <CwButton
              variant="destructive"
              appearance="filled"
            >
              修改密碼
            </CwButton>
            <p className="text-[#7c808c]" style={{ fontSize: 'var(--text-xxs)' }}>
              最後異動記錄, 2025-04-23 15:13:35
            </p>
          </div>

          {/* 底部按鈕組 */}
          <div className="flex gap-[8px] justify-end">
            <CwButton
              variant="primary"
              appearance="outlined"
            >
              發送重設密碼信
            </CwButton>
            <CwButton
              variant="primary"
              appearance="filled"
            >
              儲存
            </CwButton>
          </div>
        </div>
      )}

      {/* 綁定管理標籤頁 */}
      {activeTab === "binding-management" && (
        <div className="space-y-[20px]">
          {/* 關聯訂戶 */}
          <div className="space-y-[12px]">
            <div>
              <CwButton 
                variant="primary" 
                appearance="filled"
                onClick={() => setShowSubscriberPopup(true)}
              >
                關聯訂戶
              </CwButton>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[#1c1c1c] text-[14px]">
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={subscriberSearch}
                  onChange={(e) => setSubscriberSearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={subscriberColumns}
              dataSource={subscriberData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={subscriberPage}
              pageSize={subscriberPageSize}
              totalItems={subscriberData.length}
              onPageChange={setSubscriberPage}
              onPageSizeChange={setSubscriberPageSize}
            />
          </div>

          {/* 解除91會員手機綁定 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[#1c1c1c] text-[14px]">
                解除91會員手機綁定
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={phoneSearch}
                  onChange={(e) => setPhoneSearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={phoneColumns}
              dataSource={phoneData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={phonePage}
              pageSize={phonePageSize}
              totalItems={phoneData.length}
              onPageChange={setPhonePage}
              onPageSizeChange={setPhonePageSize}
            />
          </div>

          {/* 第三方帳號綁定紀錄 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[#1c1c1c] text-[14px]">
                第三方帳號綁定紀錄
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={thirdPartySearch}
                  onChange={(e) => setThirdPartySearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={thirdPartyColumns}
              dataSource={thirdPartyData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={thirdPartyPage}
              pageSize={thirdPartyPageSize}
              totalItems={thirdPartyData.length}
              onPageChange={setThirdPartyPage}
              onPageSizeChange={setThirdPartyPageSize}
            />
          </div>

          {/* Line 2.0綁定紀錄 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[#1c1c1c] text-[14px]">
                Line 2.0綁定紀錄
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={line20Search}
                  onChange={(e) => setLine20Search(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={line20Columns}
              dataSource={line20Data}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={line20Page}
              pageSize={line20PageSize}
              totalItems={line20Data.length}
              onPageChange={setLine20Page}
              onPageSizeChange={setLine20PageSize}
            />
          </div>
        </div>
      )}

      {/* 訂單記錄標籤頁 */}
      {activeTab === "order-record" && (
        <div className="space-y-[20px]">
          {/* 訂單記錄 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
                訂單記錄
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={orderRecordSearch}
                  onChange={(e) => setOrderRecordSearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={orderRecordColumns}
              dataSource={orderRecordData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={orderRecordPage}
              pageSize={orderRecordPageSize}
              totalItems={orderRecordData.length}
              onPageChange={setOrderRecordPage}
              onPageSizeChange={setOrderRecordPageSize}
            />
          </div>

          {/* 訂閱商品 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
                訂閱商品
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={subscriptionProductSearch}
                  onChange={(e) => setSubscriptionProductSearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={subscriptionProductColumns}
              dataSource={subscriptionProductData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={subscriptionProductPage}
              pageSize={subscriptionProductPageSize}
              totalItems={subscriptionProductData.length}
              onPageChange={setSubscriptionProductPage}
              onPageSizeChange={setSubscriptionProductPageSize}
            />
          </div>

          {/* 課程商品 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
                課程商品
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={courseProductSearch}
                  onChange={(e) => setCourseProductSearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={courseProductColumns}
              dataSource={courseProductData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={courseProductPage}
              pageSize={courseProductPageSize}
              totalItems={courseProductData.length}
              onPageChange={setCourseProductPage}
              onPageSizeChange={setCourseProductPageSize}
            />
          </div>
        </div>
      )}

      {/* 自動續訂標籤頁 */}
      {activeTab === "auto-renewal" && (
        <div className="space-y-[20px]">
          {/* 其他產品自動續訂 */}
          <div className="space-y-[12px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              其他產品自動續訂
            </h3>
            <CwTable
              columns={otherProductAutoRenewalColumns}
              dataSource={otherProductAutoRenewalData}
              emptyText="沒有資料"
            />
          </div>

          {/* 自動續訂 */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
                自動續訂
              </h3>
              <div className="w-[200px]">
                <CwInput
                  placeholder="輸入查詢關鍵字"
                  value={autoRenewalSearch}
                  onChange={(e) => setAutoRenewalSearch(e.target.value)}
                  isSearch
                />
              </div>
            </div>
            <CwTable
              columns={autoRenewalColumns}
              dataSource={autoRenewalData}
              emptyText="沒有資料"
            />
            <CwPagination
              currentPage={autoRenewalPage}
              pageSize={autoRenewalPageSize}
              totalItems={autoRenewalData.length}
              onPageChange={setAutoRenewalPage}
              onPageSizeChange={setAutoRenewalPageSize}
            />
          </div>
        </div>
      )}

      {/* 電子報訂閱標籤頁 */}
      {activeTab === "newsletter-subscription" && (
        <div className="space-y-[12px]">
          <div className="flex items-center justify-end">
            <div className="w-[200px]">
              <CwInput
                placeholder="輸入查詢關鍵字"
                value={newsletterSearch}
                onChange={(e) => setNewsletterSearch(e.target.value)}
                isSearch
              />
            </div>
          </div>
          <CwTable
            columns={newsletterColumns}
            dataSource={newsletterData}
            emptyText="沒有資料"
          />
          <CwPagination
            currentPage={newsletterPage}
            pageSize={newsletterPageSize}
            totalItems={newsletterData.length}
            onPageChange={setNewsletterPage}
            onPageSizeChange={setNewsletterPageSize}
          />
        </div>
      )}

      {/* 訂戶權益標籤頁 */}
      {activeTab === "subscriber-rights" && (
        <div className="space-y-[20px]">
          {/* 紙本權益 */}
          <div className="space-y-[12px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              紙本權益
            </h3>
            <CwTable
              columns={paperRightsColumns}
              dataSource={paperRightsData}
              emptyText="沒有資料"
            />
          </div>

          {/* 數位權益 */}
          <div className="space-y-[12px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              數位權益
            </h3>
            <CwTable
              columns={digitalRightsColumns}
              dataSource={digitalRightsData}
              emptyText="沒有資料"
            />
          </div>

          {/* 網站觀看權益 */}
          <div className="space-y-[12px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              網站觀看權益
            </h3>
            <CwTable
              columns={websiteRightsColumns}
              dataSource={websiteRightsData}
              emptyText="沒有資料"
            />
          </div>

          {/* APP臨時觀看權益 */}
          <div className="space-y-[12px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              APP臨時觀看權益
            </h3>
            <CwTable
              columns={appRightsColumns}
              dataSource={appRightsData}
              emptyText="沒有資料"
            />
          </div>
        </div>
      )}

      {/* 子女資料標籤頁 */}
      {activeTab === "children-data" && (
        <div className="space-y-[12px]">
          <div className="flex items-center justify-end">
            <div className="w-[200px]">
              <CwInput
                placeholder="輸入查詢關鍵字"
                value={childrenSearch}
                onChange={(e) => setChildrenSearch(e.target.value)}
                isSearch
              />
            </div>
          </div>
          <CwTable
            columns={childrenColumns}
            dataSource={childrenData}
            emptyText="沒有資料"
          />
          <CwPagination
            currentPage={childrenPage}
            pageSize={childrenPageSize}
            totalItems={childrenData.length}
            onPageChange={setChildrenPage}
            onPageSizeChange={setChildrenPageSize}
          />
        </div>
      )}

      {/* UserJourney 標籤頁 */}
      {activeTab === "user-journey" && (
        <div className="space-y-[12px]">
          <div className="flex items-center justify-end">
            <div className="w-[200px]">
              <CwInput
                label="搜尋："
                placeholder="輸入查詢關鍵字"
                value={userJourneySearch}
                onChange={(e) => setUserJourneySearch(e.target.value)}
                isSearch
              />
            </div>
          </div>
          <CwTable
            columns={userJourneyColumns}
            dataSource={userJourneyData}
            emptyText="沒有資料"
          />
          <CwPagination
            currentPage={userJourneyPage}
            pageSize={userJourneyPageSize}
            totalItems={userJourneyData.length}
            onPageChange={setUserJourneyPage}
            onPageSizeChange={setUserJourneyPageSize}
          />
        </div>
      )}

      {/* 其他標籤頁內容（暫時顯示佔位文字） */}
      {activeTab !== "member-info" && activeTab !== "binding-management" && activeTab !== "order-record" && activeTab !== "auto-renewal" && activeTab !== "newsletter-subscription" && activeTab !== "subscriber-rights" && activeTab !== "children-data" && activeTab !== "user-journey" && (
        <div className="py-[40px] text-center">
          <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
            {tabs.find(tab => tab.id === activeTab)?.label} 功能開發中...
          </p>
        </div>
      )}

      {/* 關聯訂戶 Popup */}
      <CwPopup
        open={showSubscriberPopup}
        onClose={() => {
          setShowSubscriberPopup(false);
          setSubscriberId("");
          setHasSearched(false);
          setSubscriberName("");
          setSubscriberNote("");
        }}
        title="關聯訂戶查詢"
        size="lg"
        showHeader={true}
        showFooter={true}
        closableByMask={true}
        centered={true}
        buttons={[
          {
            label: "返回",
            variant: "primary",
            appearance: "outlined",
            onClick: () => {
              setShowSubscriberPopup(false);
              setSubscriberId("");
              setHasSearched(false);
              setSubscriberName("");
              setSubscriberNote("");
            }
          },
          ...(hasSearched ? [{
            label: "建立關聯",
            variant: "primary" as const,
            appearance: "filled" as const,
            onClick: () => {
              // 處理建立關聯邏輯
              console.log("建立關聯:", { subscriberId, subscriberName, note: subscriberNote });
              setShowSubscriberPopup(false);
              setSubscriberId("");
              setHasSearched(false);
              setSubscriberName("");
              setSubscriberNote("");
            }
          }] : [])
        ]}
      >
        <div className="space-y-[20px]">
          {/* 輸入框和 CHECK 按鈕 */}
          <div className="flex gap-[8px] items-end">
            <div className="flex-1">
              <CwInput
                placeholder="請輸入訂戶編號"
                value={subscriberId}
                onChange={(e) => setSubscriberId(e.target.value)}
              />
            </div>
            <CwButton
              variant="primary"
              appearance="filled"
              onClick={() => {
                // 處理 CHECK 邏輯
                if (subscriberId.trim()) {
                  setHasSearched(true);
                  // 模擬查詢結果
                  setSubscriberName("LAUREN");
                }
              }}
            >
              CHECK
            </CwButton>
          </div>

          {/* 查詢結果區域 */}
          {hasSearched && (
            <>
              {/* 分隔線 */}
              <hr className="border-t border-[#c4c9d3]/30" />
              
              <div className="space-y-[20px]">
                {/* 查詢結果標題 */}
                <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#01579b] text-[12px]">
                  查詢結果
                </h3>

                {/* 訂戶資訊 - 純文字 */}
                <div>
                  <span className="font-['Noto_Sans_TC',_sans-serif] text-[14px]">訂戶：{subscriberName}</span>
                </div>

                {/* 分隔線 */}
                <hr className="border-t border-[#c4c9d3]/30" />

                {/* 已關聯的會員 */}
                <div className="space-y-[12px]">
                  <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#01579b] text-[12px]">
                    已關聯的會員
                  </h3>
                  <CwTable
                    columns={[
                      { key: "account", title: "帳號", width: "250px" },
                      { key: "name", title: "姓名", width: "120px" },
                      { key: "note", title: "備註" },
                    ]}
                    dataSource={[
                      { id: 1, account: "chen.yuting@cw.com.tw", name: "陳雨婷", note: "主要聯絡人" },
                      { id: 2, account: "wang.xiaoming@gmail.com", name: "王小明", note: "家庭成員" },
                      { id: 3, account: "lin.huijun", name: "林慧君", note: "公司訂閱" },
                      { id: 4, account: "liu.jianhao@example.com", name: "劉建豪", note: "" },
                    ]}
                    rowKey="id"
                    emptyText="沒有資料"
                  />
                </div>

                {/* 分隔線 */}
                <hr className="border-t border-[#c4c9d3]/30" />

                {/* 備註 */}
                <div className="space-y-[12px]">
                  <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#01579b] text-[12px]">
                    備註
                  </h3>
                  <textarea
                    className="w-full min-h-[100px] px-[12px] py-[8px] border border-[#7c808c] rounded-[var(--radius)] font-['Noto_Sans_TC',_sans-serif] resize-vertical focus:outline-none focus:border-[#0078d4] focus:shadow-[0_0_0_3px_rgba(0,120,212,0.1)]"
                    placeholder="請填寫備註"
                    value={subscriberNote}
                    onChange={(e) => setSubscriberNote(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </CwPopup>

      {/* 發票編輯 Popup */}
      <CwPopup
        open={isInvoicePopupOpen}
        onClose={() => {
          setIsInvoicePopupOpen(false);
          setSelectedRenewalRecord(null);
        }}
        title="自動續訂資訊"
        size="lg"
        showHeader={true}
        showFooter={true}
        closableByMask={false}
        centered={true}
        buttons={[
          {
            label: "取消",
            variant: "primary",
            appearance: "outlined",
            onClick: () => {
              setIsInvoicePopupOpen(false);
              setSelectedRenewalRecord(null);
            }
          }
        ]}
      >
        <div className="space-y-[20px]">
          {/* 自動續訂資料展示 */}
          {selectedRenewalRecord && (
            <CwTable
              columns={[
                { key: "renewalPlan", title: "續訂方案", width: "200px" },
                { key: "deductionAmount", title: "扣款金額", width: "150px" },
                { key: "deductionDate", title: "扣款日期", width: "150px" },
                { key: "renewalStatus", title: "續訂單狀態" },
              ]}
              dataSource={[selectedRenewalRecord]}
              emptyText="沒有資料"
            />
          )}

          {/* 分隔線 */}
          <hr className="border-t border-[#c4c9d3]/30" />

          {/* 修改發票資訊 */}
          <div className="space-y-[16px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              修改發票資訊
            </h3>
            
            <div className="space-y-[12px]">
              <div className="grid grid-cols-2 gap-[12px]">
                <CwSelect
                  label="發票類型"
                  options={invoiceTypeOptions}
                  value={invoiceType}
                  onChange={(value) => setInvoiceType(value)}
                  width="100%"
                />
                <CwInput
                  label="發票觀具類型"
                  placeholder="請輸入"
                  value={invoiceCarrierType}
                  onChange={(e) => setInvoiceCarrierType(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-[12px]">
                <CwInput
                  label="發票觀具碼"
                  placeholder="請輸入"
                  value={invoiceCarrierCode}
                  onChange={(e) => setInvoiceCarrierCode(e.target.value)}
                />
                <CwInput
                  label="發票捐贈碼"
                  placeholder="請輸入"
                  value={invoiceDonationCode}
                  onChange={(e) => setInvoiceDonationCode(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-[12px]">
                <CwInput
                  label="發票抬頭"
                  placeholder="請輸入"
                  value={invoiceTitle}
                  onChange={(e) => setInvoiceTitle(e.target.value)}
                />
                <CwInput
                  label="發票統編"
                  placeholder="請輸入"
                  value={invoiceTaxId}
                  onChange={(e) => setInvoiceTaxId(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <CwButton
                  variant="primary"
                  appearance="outlined"
                  onClick={() => {
                    console.log('儲存發票資訊');
                  }}
                >
                  儲存發票資訊
                </CwButton>
              </div>
            </div>
          </div>

          {/* 分隔線 */}
          <hr className="border-t border-[#c4c9d3]/30" />

          {/* 發票收件人地址 */}
          <div className="space-y-[16px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              發票收件人地址
            </h3>
            
            <div className="space-y-[12px]">
              <div className="grid grid-cols-2 gap-[12px]">
                <CwInput
                  label="國別"
                  placeholder="請輸入"
                  value={invoiceCountry}
                  onChange={(e) => setInvoiceCountry(e.target.value)}
                />
                <CwInput
                  label="郵遞區號"
                  placeholder="請輸入"
                  value={invoicePostalCode}
                  onChange={(e) => setInvoicePostalCode(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-[12px]">
                <CwInput
                  label="縣市別"
                  placeholder="請輸入"
                  value={invoiceCity}
                  onChange={(e) => setInvoiceCity(e.target.value)}
                />
                <CwInput
                  label="鄉鎮區"
                  placeholder="請輸入"
                  value={invoiceDistrict}
                  onChange={(e) => setInvoiceDistrict(e.target.value)}
                />
              </div>

              <CwInput
                label="地址"
                placeholder="請輸入"
                value={invoiceAddress}
                onChange={(e) => setInvoiceAddress(e.target.value)}
              />

              <div className="flex justify-end">
                <CwButton
                  variant="primary"
                  appearance="outlined"
                  onClick={() => {
                    console.log('更新發票收件人地址');
                  }}
                >
                  更新發票收件人地址
                </CwButton>
              </div>
            </div>
          </div>

          {/* 分隔線 */}
          <hr className="border-t border-[#c4c9d3]/30" />

          {/* 發票收件Email */}
          <div className="space-y-[16px]">
            <h3 className="font-['Noto_Sans_TC',_sans-serif] font-[500] text-[#1c1c1c]">
              發票收件Email
            </h3>
            
            <div className="space-y-[12px]">
              <div className="grid grid-cols-2 gap-[12px]">
                <CwInput
                  label="原訂單發票收件 Email"
                  placeholder="請輸入"
                  value={originalInvoiceEmail}
                  onChange={(e) => setOriginalInvoiceEmail(e.target.value)}
                  disabled={true}
                />

                <CwInput
                  label="更新發票收件 Email"
                  placeholder="請輸入"
                  value={updatedInvoiceEmail}
                  onChange={(e) => setUpdatedInvoiceEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <CwButton
                  variant="primary"
                  appearance="outlined"
                  onClick={() => {
                    console.log('更新發票收件Email');
                  }}
                >
                  更新發票收件Email
                </CwButton>
              </div>
            </div>
          </div>
        </div>
      </CwPopup>

      {/* 修改權益 Popup */}
      <CwPopup
        open={isRightsPopupOpen}
        onClose={handleCancelRights}
        title="修改權益"
        size="sm"
        closableByMask={false}
        buttons={[
          {
            label: "取消",
            variant: "primary",
            appearance: "outlined",
            onClick: handleCancelRights,
            icon: "close"
          },
          {
            label: "確認",
            variant: "primary",
            appearance: "filled",
            onClick: handleConfirmRights,
            icon: "check"
          }
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
              onClick={handleSetToday}
              className="h-[35px] px-[16px] bg-[#e9ebf2] rounded-[4px] font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#1c1c1c] hover:bg-[#d1d5dd] transition-colors whitespace-nowrap"
            >
              今天
            </button>
          </div>
        </div>
      </CwPopup>

      {/* Toast 通知 */}
      {showToast && (
        <CwToast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
}

MemberDetail.displayName = 'MemberDetail';
