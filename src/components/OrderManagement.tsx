import { useState } from "react";
import { RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
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
import { OrderDetail } from "./OrderDetail";
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

// 模擬訂單資料
const mockOrderData: OrderData[] = [
  {
    id: 1,
    sourceSystem: '天下雜誌',
    orderNumber: 'CW2025010001',
    orderDate: '2025-01-15',
    sourceProduct: '天下雜誌年訂方案',
    orderAmount: 2980,
    paymentMethod: '信用卡',
    paymentStatus: '已付款',
    orderStatus: '已完成',
  },
  {
    id: 2,
    sourceSystem: '親子天下',
    orderNumber: 'PK2025010023',
    orderDate: '2025-01-18',
    sourceProduct: '親子天下半年訂閱',
    orderAmount: 1490,
    paymentMethod: 'ATM轉帳',
    paymentStatus: '待付款',
    orderStatus: '處理中',
  },
  {
    id: 3,
    sourceSystem: '康健雜誌',
    orderNumber: 'CH2025010045',
    orderDate: '2025-01-20',
    sourceProduct: '康健雜誌季訂方案',
    orderAmount: 890,
    paymentMethod: '信用卡',
    paymentStatus: '已付款',
    orderStatus: '已完成',
  },
];

// 下拉選單選項
const sourceSystemOptions: CwSelectOption[] = [
  { value: 'cw', label: '天下雜誌' },
  { value: 'pk', label: '親子天下' },
  { value: 'ch', label: '康健雜誌' },
  { value: 'cwbook', label: '天下文化' },
];

const statusOptions: CwSelectOption[] = [
  { value: 'created', label: '建立中' },
  { value: 'established', label: '已成立' },
  { value: 'cancelled', label: '已取消' },
];

const midStatusOptions: CwSelectOption[] = [
  { value: 'processing', label: '處理中' },
  { value: 'completed', label: '已完成' },
  { value: 'failed', label: '失敗' },
];

const orderTypeOptions: CwSelectOption[] = [
  { value: 'new', label: '新訂' },
  { value: 'renew', label: '續訂' },
  { value: 'makeup', label: '補書' },
];

const shippingMethodOptions: CwSelectOption[] = [
  { value: 'home', label: '宅配' },
  { value: 'convenience', label: '超商取貨' },
  { value: 'post', label: '郵寄' },
];

const paymentMethodOptions: CwSelectOption[] = [
  { value: 'credit', label: '信用卡' },
  { value: 'atm', label: 'ATM轉帳' },
  { value: 'linepay', label: 'Line Pay' },
  { value: 'cash', label: '現金' },
];

const paymentStatusOptions: CwSelectOption[] = [
  { value: 'paid', label: '已付款' },
  { value: 'pending', label: '待付款' },
  { value: 'refunding', label: '退款中' },
  { value: 'refunded', label: '已退款' },
  { value: 'cancelled', label: '已取消' },
];

const creatorCompanyOptions: CwSelectOption[] = [
  { value: 'cw', label: '天下事業群' },
  { value: 'pk', label: '親子教育群' },
];

const creatorOptions: CwSelectOption[] = [
  { value: 'userA', label: '陳小明' },
  { value: 'userB', label: '林小華' },
];

export function OrderManagement() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchForm, setSearchForm] = useState({
    // ====== 預設條件 (F欄=V) ======
    '訂單編號 起': "",
    '來源單號 起': "",
    '流程單號 起': "",
    '出貨客戶編號': "",
    '出貨客戶姓名': "",
    '出貨地址': "",
    '出貨收件人電話': "",
    '產品編號': "",
    '方案代碼': "",

    // ====== 進階條件 ======
    '訂單起日': new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    '訂單迄日': new Date(new Date().setDate(new Date().getDate() + 14)),
    '訂單編號 迄': "",
    '來源單號 迄': "",
    '流程單號 迄': "",
    '異動單號': "",

    '訂單客戶編號': "",
    '訂單客戶姓名': "",
    '付款客戶編號': "",
    '付款客戶姓名': "",
    '發票客戶編號': "",
    '發票客戶名稱': "",
    '出貨收件人': "",
    
    '統一編號': "",
    '會員帳號': "",
    '會員姓名': "",
    '會員Email': "",
    '會員手機': "",
    '出貨收件人Email': "",
    '出貨收件人手機': "",
    
    '產品名稱': "",
    '方案名稱': "",
    '行銷追蹤碼': "",
    '通路代碼': "",
    '通路名稱': "",
    '具有實體庫代碼': "",
    '具有實體庫名稱': "",

    '來源系統': "",
    'OMG 訂單狀態': "",
    '中台 訂單狀態': "",
    '出貨備註': "",
    '訂單備註': "",
    'OMG 訂單類型': "",
    '出貨方式': "",
    
    '暫停處理': false,
    '是否為急需單': false,
    
    '信用卡卡號': "",
    '發票號碼': "",
    '建單法人': "",
    '建單人員': "",
    '付款方式': "",
    '付款狀態': "",

    '實體商品相關': false,
    '實體結案單': false,
    '展示明細': false,
    '展示訂單備註': false,
    '查無相關數位商品時間': false,
  });
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  
  const orderData = hasSearched ? mockOrderData : [];
  const totalItems = orderData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleInputChange = (field: string, value: any) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
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
    setSearchKeyword("");
    setHasSearched(false);
  };

  const handleSearch = () => {
    setHasSearched(true);
    setCurrentPage(1);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "訂單管理", href: "/orders" },
    { label: "訂單列表" }
  ];

  const getOrderStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case '已完成': return 'success';
      case '處理中': return 'warning';
      case '已取消': return 'error';
      default: return 'default';
    }
  };

  const columns: CwTableColumn<OrderData>[] = [
    { key: 'id', title: '#', width: '60px', align: 'center' },
    { key: 'sourceSystem', title: '來源系統', width: '120px' },
    { key: 'orderNumber', title: '訂單編號', width: '150px' },
    { key: 'orderDate', title: '訂單日期', width: '120px' },
    { key: 'sourceProduct', title: '來源產品', width: '200px' },
    { key: 'orderAmount', title: '訂單金額', width: '120px', align: 'right', render: (value) => `NT$ ${value.toLocaleString()}` },
    { key: 'paymentMethod', title: '付款方式', width: '120px' },
    { key: 'paymentStatus', title: '付款狀態', width: '100px' },
    { 
      key: 'orderStatus', 
      title: '訂單狀態', 
      width: '100px',
      render: (value, record) => <StatusTag variant={getOrderStatusVariant(record.orderStatus)}>{record.orderStatus}</StatusTag>
    },
    {
      key: 'actions',
      title: '功能',
      width: '80px',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <CwTooltip content="檢視">
            <CwRoundButton icon="view" onClick={() => { setSelectedOrderId(record.id); setShowDetail(true); }} />
          </CwTooltip>
        </div>
      ),
    },
  ];

  if (showDetail) {
    return <OrderDetail orderId={selectedOrderId || undefined} onClose={() => { setShowDetail(false); setSelectedOrderId(null); }} />;
  }

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      <CwTitle title="訂單列表" breadcrumbs={breadcrumbs} />

      {/* 搜尋表單區塊 */}
      <div className="bg-white p-[20px] rounded-[8px] shadow-sm border border-[#e5e7eb] space-y-[16px]">
        {/* 預設搜尋條件 */}
        <div className="grid grid-cols-5 gap-[12px] items-end">
          <CwInput label="訂單編號 起" placeholder="文本輸入" value={searchForm['訂單編號 起']} onChange={(e) => handleInputChange('訂單編號 起', e.target.value)} />
          <CwInput label="來源單號 起" placeholder="文本輸入" value={searchForm['來源單號 起']} onChange={(e) => handleInputChange('來源單號 起', e.target.value)} />
          <CwInput label="流程單號 起" placeholder="文本輸入" value={searchForm['流程單號 起']} onChange={(e) => handleInputChange('流程單號 起', e.target.value)} />
          
          <ExactSearchInput label="出貨客戶編號" placeholder="文本輸入" searchType="customer" value={searchForm['出貨客戶編號']} onChange={(val) => handleInputChange('出貨客戶編號', val)} />
          <ExactSearchInput label="出貨客戶姓名" placeholder="文本輸入" searchType="customer" value={searchForm['出貨客戶姓名']} onChange={(val) => handleInputChange('出貨客戶姓名', val)} />
          
          <ExactSearchInput label="出貨地址" placeholder="文本輸入" searchType="customer" value={searchForm['出貨地址']} onChange={(val) => handleInputChange('出貨地址', val)} />
          <CwInput label="出貨收件人電話" placeholder="文本輸入" value={searchForm['出貨收件人電話']} onChange={(e) => handleInputChange('出貨收件人電話', e.target.value)} />
          
          <ExactSearchInput label="產品編號" placeholder="文本輸入" searchType="product" value={searchForm['產品編號']} onChange={(val) => handleInputChange('產品編號', val)} />
          <ExactSearchInput label="方案代碼" placeholder="文本輸入" searchType="plan" value={searchForm['方案代碼']} onChange={(val) => handleInputChange('方案代碼', val)} />
        </div>

        {/* 進階選項展開區塊 */}
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

        {/* 進階功能切換列 */}
        <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-[16px]">
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-[4px] text-[#0078d4] text-[14px] font-[500] hover:opacity-80 transition-opacity"
          >
            {showAdvanced ? (
              <><ChevronUp size={16} /> 收合進階選項</>
            ) : (
              <><ChevronDown size={16} /> 展開進階選項</>
            )}
          </button>
          
          <div className="flex gap-[10px]">
            <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw size={14} />} onClick={handleClear}>
              清除
            </CwButton>
            <CwButton variant="primary" appearance="filled" onClick={handleSearch}>
              查詢
            </CwButton>
          </div>
        </div>
      </div>

      {/* 列表與分頁區塊 */}
      <div className="space-y-[16px]">
        {/* 表格內關鍵字搜尋 (不影響上方的複雜篩選) */}
        <div className="flex items-center gap-[8px]">
          <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] whitespace-nowrap">
            簡易搜尋：
          </label>
          <CwInput
            placeholder="在結果中過濾關鍵字"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            width="300px"
          />
        </div>

        <div className="content-stretch flex flex-col gap-[10px] items-start">
          <CwTable columns={columns} dataSource={orderData} rowKey="id" emptyText="無此條件對應之訂單資料" />
          
          {hasSearched && orderData.length > 0 && (
            <CwPagination
              currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize}
              onPageChange={setCurrentPage} onPageSizeChange={setPageSize} pageSizeOptions={[10, 20, 50]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

OrderManagement.displayName = 'OrderManagement';
