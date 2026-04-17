import { useState } from "react";
import { CwTableSet } from "./CwTableSet";
import { CwSortTableColumn } from "./CwSortTable";
import { StatusTag } from "./StatusTag";
import { CwRoundButton } from "./CwRoundButton";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTooltip } from "./CwTooltip";
import { CwSelect, CwSelectOption } from "./CwSelect";
import { CwButton } from "./CwButton";
import { Search, RotateCcw } from "lucide-react";

// 產品資料型別定義
interface ProductData {
  id: number;
  productCode: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  lastUpdate: string;
}

// 模擬產品資料
const productData: ProductData[] = [
  {
    id: 1,
    productCode: 'PRD-2025-001',
    productName: '智慧型手機 Pro Max 256GB 午夜黑',
    category: '手機通訊',
    price: 35900,
    stock: 125,
    status: '上架中',
    lastUpdate: '2025-09-28',
  },
  {
    id: 2,
    productCode: 'PRD-2025-002',
    productName: '無線藍牙耳機降噪版',
    category: '音響設備',
    price: 4500,
    stock: 0,
    status: '已下架',
    lastUpdate: '2025-09-25',
  },
  {
    id: 3,
    productCode: 'PRD-2025-003',
    productName: '筆記型電腦 Ultra 13吋 M2 晶片',
    category: '電腦周邊',
    price: 48000,
    stock: 45,
    status: '上架中',
    lastUpdate: '2025-09-27',
  },
  {
    id: 4,
    productCode: 'PRD-2025-004',
    productName: '平板電腦 Air 10.9吋 WiFi版',
    category: '平板電腦',
    price: 19900,
    stock: 8,
    status: '庫存不足',
    lastUpdate: '2025-09-26',
  },
  {
    id: 5,
    productCode: 'PRD-2025-005',
    productName: '智慧手錶 Series 8 GPS + Cellular',
    category: '穿戴裝置',
    price: 12900,
    stock: 230,
    status: '上架中',
    lastUpdate: '2025-09-29',
  },
  {
    id: 6,
    productCode: 'PRD-2025-006',
    productName: '數位相機 Mirrorless 全片幅',
    category: '攝影器材',
    price: 65000,
    stock: 15,
    status: '上架中',
    lastUpdate: '2025-09-28',
  },
  {
    id: 7,
    productCode: 'PRD-2025-007',
    productName: '電競滑鼠 RGB 可程式化按鍵',
    category: '電腦周邊',
    price: 2800,
    stock: 0,
    status: '已下架',
    lastUpdate: '2025-09-20',
  },
  {
    id: 8,
    productCode: 'PRD-2025-008',
    productName: '機械式鍵盤 青軸 87鍵',
    category: '電腦周邊',
    price: 5200,
    stock: 167,
    status: '上架中',
    lastUpdate: '2025-09-29',
  },
  {
    id: 9,
    productCode: 'PRD-2025-009',
    productName: '外接硬碟 2TB USB 3.2 Gen 2',
    category: '儲存設備',
    price: 3600,
    stock: 9,
    status: '庫存不足',
    lastUpdate: '2025-09-27',
  },
  {
    id: 10,
    productCode: 'PRD-2025-010',
    productName: '無線充電器 15W 快充版',
    category: '手機配件',
    price: 1500,
    stock: 456,
    status: '上架中',
    lastUpdate: '2025-09-29',
  },
  {
    id: 11,
    productCode: 'PRD-2025-011',
    productName: '智慧音箱 第四代 含語音助理',
    category: '智慧家居',
    price: 3200,
    stock: 88,
    status: '上架中',
    lastUpdate: '2025-09-28',
  },
  {
    id: 12,
    productCode: 'PRD-2025-012',
    productName: 'USB-C 多功能轉接器 7合1',
    category: '電腦周邊',
    price: 1280,
    stock: 312,
    status: '上架中',
    lastUpdate: '2025-09-29',
  },
  {
    id: 13,
    productCode: 'PRD-2025-013',
    productName: '行動電源 20000mAh 雙向快充',
    category: '手機配件',
    price: 1890,
    stock: 5,
    status: '庫存不足',
    lastUpdate: '2025-09-26',
  },
  {
    id: 14,
    productCode: 'PRD-2025-014',
    productName: '電競耳機 7.1聲道環繞音效',
    category: '音響設備',
    price: 6800,
    stock: 0,
    status: '已下架',
    lastUpdate: '2025-09-15',
  },
  {
    id: 15,
    productCode: 'PRD-2025-015',
    productName: '顯示器 27吋 4K HDR 144Hz',
    category: '顯示設備',
    price: 18900,
    stock: 42,
    status: '上架中',
    lastUpdate: '2025-09-28',
  },
];

// 產品類別選項
const categoryOptions: CwSelectOption[] = [
  { value: '手機通訊', label: '手機通訊' },
  { value: '音響設備', label: '音響設備' },
  { value: '電腦周邊', label: '電腦周邊' },
  { value: '平板電腦', label: '平板電腦' },
  { value: '穿戴裝置', label: '穿戴裝置' },
  { value: '攝影器材', label: '攝影器材' },
  { value: '儲存設備', label: '儲存設備' },
  { value: '手機配件', label: '手機配件' },
  { value: '智慧家居', label: '智慧家居' },
  { value: '顯示設備', label: '顯示設備' },
];

// 產品狀態選項
const statusOptions: CwSelectOption[] = [
  { value: '上架中', label: '上架中' },
  { value: '庫存不足', label: '庫存不足' },
  { value: '已下架', label: '已下架' },
];

export function ProductManagement() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "產品管理", href: "/products" },
    { label: "產品列表" }
  ];

  const handleBreadcrumbNavigate = (href: string, index: number) => {
    console.log(`導航到: ${href}, 索引: ${index}`);
  };

  // 過濾資料
  const filteredData = productData.filter(item => {
    // 關鍵字篩選
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      const matchKeyword = 
        item.productCode.toLowerCase().includes(keyword) ||
        item.productName.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword);
      if (!matchKeyword) return false;
    }
    
    // 類別篩選
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }
    
    // 狀態篩選
    if (selectedStatus && item.status !== selectedStatus) {
      return false;
    }
    
    return true;
  });

  // 分頁資料
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 定義表格欄位
  const columns: CwSortTableColumn<ProductData>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'productCode',
      title: '產品編號',
      width: '140px',
      sortable: true,
    },
    {
      key: 'productName',
      title: '產品名稱',
      // 不設定 width，讓欄位自動填滿剩餘空間
      sortable: true,
    },
    {
      key: 'category',
      title: '類別',
      width: '100px',
      sortable: true,
    },
    {
      key: 'price',
      title: '售價',
      width: '100px',
      sortable: true,
      align: 'right',
      render: (value) => `NT$ ${value.toLocaleString()}`,
    },
    {
      key: 'stock',
      title: '庫存',
      width: '80px',
      sortable: true,
      align: 'right',
    },
    {
      key: 'status',
      title: '狀態',
      width: '100px',
      sortable: true,
      render: (value) => {
        const variant = 
          value === '上架中' ? 'success' : 
          value === '庫存不足' ? 'warning' : 
          value === '已下架' ? 'default' : 
          'default';
        return <StatusTag variant={variant}>{value}</StatusTag>;
      },
    },
    {
      key: 'lastUpdate',
      title: '更新日期',
      width: '110px',
      sortable: true,
    },
    {
      key: 'action',
      title: '操作',
      width: '100px',
      align: 'center',
      render: () => (
        <div className="flex gap-[8px] justify-center">
          <CwTooltip content="編輯產品">
            <CwRoundButton icon="edit" onClick={() => console.log('編輯')} />
          </CwTooltip>
          <CwTooltip content="檢視詳細資料">
            <CwRoundButton icon="view" onClick={() => console.log('查看')} />
          </CwTooltip>
        </div>
      ),
    },
  ];

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1); // 搜尋時回到第一頁
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 改變每頁筆數時回到第一頁
  };

  const handleClear = () => {
    setSearchKeyword("");
    setSelectedCategory("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        breadcrumbs={breadcrumbs} 
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
      >
        產品列表
      </CwTitle>

      {/* 搜尋篩選表單 */}
      <div className="space-y-[12px]">
        <div className="grid grid-cols-3 gap-[12px]">
          <CwSelect
            label="產品類別"
            placeholder="請選擇類別"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value as string);
              setCurrentPage(1);
            }}
            clearable
          />
          
          <CwSelect
            label="產品狀態"
            placeholder="請選擇狀態"
            options={statusOptions}
            value={selectedStatus}
            onChange={(value) => {
              setSelectedStatus(value as string);
              setCurrentPage(1);
            }}
            clearable
          />
        </div>

        {/* 按鈕組 */}
        <div className="flex gap-[8px] justify-end">
          <CwButton 
            variant="primary" 
            appearance="outline"
            icon={<RotateCcw size={18} />}
            onClick={handleClear}
          >
            清除
          </CwButton>
          <CwButton 
            variant="primary" 
            appearance="solid"
            icon={<Search size={18} />}
          >
            查詢
          </CwButton>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 表格組合元件 */}
      <CwTableSet
        title="產品清單"
        columns={columns}
        dataSource={paginatedData}
        rowKey="id"
        showSearch={true}
        searchPlaceholder="請輸入產品編號或名稱"
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        emptyText="查無產品資料"
      />
    </div>
  );
}

ProductManagement.displayName = 'ProductManagement';