import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { CwButton } from "./CwButton";
import { CwInput } from "./CwInput";
import { CwPagination } from "./CwPagination";
import { CwRoundButton } from "./CwRoundButton";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwTooltip } from "./CwTooltip";

// 會員資料型別
interface MemberData {
  id: number;
  account: string;
  email: string;
  name: string;
  subscriberId: string;
  contactPhone: string;
  status: string;
}

// 會員查詢模擬資料
const memberData: MemberData[] = [
  {
    id: 1,
    account: "wang.xiaoming@example.com",
    email: "wang.xiaoming@example.com",
    name: "王小明",
    subscriberId: "1234567",
    contactPhone: "0912345678",
    status: "active"
  },
  {
    id: 2,
    account: "chen.xiaohua@example.com",
    email: "chen.xiaohua@example.com", 
    name: "陳小華",
    subscriberId: "2345678",
    contactPhone: "0923456789",
    status: "active"
  },
  {
    id: 3,
    account: "li.yifang@example.com",
    email: "li.yifang@example.com",
    name: "李怡芳",
    subscriberId: "3456789",
    contactPhone: "0934567890",
    status: "active"
  },
  {
    id: 4,
    account: "zhang.jiahao@example.com",
    email: "zhang.jiahao@example.com",
    name: "張家豪",
    subscriberId: "4567890",
    contactPhone: "0945678901",
    status: "active"
  },
  {
    id: 5,
    account: "lin.yating@example.com",
    email: "lin.yating@example.com",
    name: "林雅婷",
    subscriberId: "5678901",
    contactPhone: "0956789012",
    status: "active"
  },
  {
    id: 6,
    account: "huang.zhiqiang@example.com",
    email: "huang.zhiqiang@example.com",
    name: "黃志強",
    subscriberId: "6789012",
    contactPhone: "0967890123",
    status: "active"
  },
  {
    id: 7,
    account: "wu.peishan@example.com",
    email: "wu.peishan@example.com",
    name: "吳佩珊",
    subscriberId: "7890123",
    contactPhone: "0978901234",
    status: "active"
  },
  {
    id: 8,
    account: "zhou.jianhong@example.com",
    email: "zhou.jianhong@example.com",
    name: "周建宏",
    subscriberId: "8901234",
    contactPhone: "0989012345",
    status: "active"
  },
  {
    id: 9,
    account: "zheng.meihui@example.com",
    email: "zheng.meihui@example.com",
    name: "鄭美惠",
    subscriberId: "9012345",
    contactPhone: "0911234456",
    status: "active"
  },
  {
    id: 10,
    account: "liu.wenlong@example.com",
    email: "liu.wenlong@example.com",
    name: "劉文龍",
    subscriberId: "1122334",
    contactPhone: "0922345567",
    status: "active"
  },
  {
    id: 11,
    account: "xie.yawen@example.com",
    email: "xie.yawen@example.com",
    name: "謝雅雯",
    subscriberId: "2233445",
    contactPhone: "0933456678",
    status: "active"
  },
  {
    id: 12,
    account: "lai.junyu@example.com",
    email: "lai.junyu@example.com",
    name: "賴俊宇",
    subscriberId: "3344556",
    contactPhone: "0944567789",
    status: "active"
  }
];

// 訂戶查詢模擬資料
const subscriberData: MemberData[] = [
  {
    id: 1,
    account: "zhang.jiahao@example.com",
    email: "zhang.jiahao@example.com",
    name: "張家豪",
    subscriberId: "4455667",
    contactPhone: "0912888999",
    status: "active"
  },
  {
    id: 2,
    account: "li.shufen@example.com",
    email: "li.shufen@example.com",
    name: "李淑芬",
    subscriberId: "5566778",
    contactPhone: "0923777888",
    status: "active"
  },
  {
    id: 3,
    account: "chen.guoqiang@example.com",
    email: "chen.guoqiang@example.com",
    name: "陳國強",
    subscriberId: "6677889",
    contactPhone: "0934666777",
    status: "active"
  },
  {
    id: 4,
    account: "lin.yating@example.com",
    email: "lin.yating@example.com",
    name: "林雅婷",
    subscriberId: "7788990",
    contactPhone: "0945555666",
    status: "active"
  },
  {
    id: 5,
    account: "huang.zhiming@example.com",
    email: "huang.zhiming@example.com",
    name: "黃志明",
    subscriberId: "8899001",
    contactPhone: "0956444555",
    status: "active"
  },
  {
    id: 6,
    account: "wu.peishan@example.com",
    email: "wu.peishan@example.com",
    name: "吳佩珊",
    subscriberId: "9900112",
    contactPhone: "0967333444",
    status: "active"
  },
  {
    id: 7,
    account: "zhou.jianhong@example.com",
    email: "zhou.jianhong@example.com",
    name: "周建宏",
    subscriberId: "1010223",
    contactPhone: "0978222333",
    status: "active"
  },
  {
    id: 8,
    account: "zheng.meihui@example.com",
    email: "zheng.meihui@example.com",
    name: "鄭美惠",
    subscriberId: "2020334",
    contactPhone: "0989111222",
    status: "active"
  },
  {
    id: 9,
    account: "xie.wenlong@example.com",
    email: "xie.wenlong@example.com",
    name: "謝文龍",
    subscriberId: "3030445",
    contactPhone: "0911999888",
    status: "active"
  },
  {
    id: 10,
    account: "yang.yawen@example.com",
    email: "yang.yawen@example.com",
    name: "楊雅雯",
    subscriberId: "4040556",
    contactPhone: "0922888777",
    status: "active"
  },
  {
    id: 11,
    account: "lai.junyu@example.com",
    email: "lai.junyu@example.com",
    name: "賴俊宇",
    subscriberId: "5050667",
    contactPhone: "0933777666",
    status: "active"
  },
  {
    id: 12,
    account: "cai.xiulan@example.com",
    email: "cai.xiulan@example.com",
    name: "蔡秀蘭",
    subscriberId: "6060778",
    contactPhone: "0944666555",
    status: "active"
  },
  {
    id: 13,
    account: "xu.zonghan@example.com",
    email: "xu.zonghan@example.com",
    name: "許宗翰",
    subscriberId: "7070889",
    contactPhone: "0955555444",
    status: "active"
  },
  {
    id: 14,
    account: "jiang.shuhui@example.com",
    email: "jiang.shuhui@example.com",
    name: "江淑惠",
    subscriberId: "8080990",
    contactPhone: "0966444333",
    status: "active"
  },
  {
    id: 15,
    account: "gao.zhihao@example.com",
    email: "gao.zhihao@example.com",
    name: "高志豪",
    subscriberId: "9091001",
    contactPhone: "0977333222",
    status: "active"
  }
];

interface MemberSearchProps {
  onViewMember?: (memberId: number) => void;
}

export function MemberSearch({ onViewMember }: MemberSearchProps) {
  const [searchForm, setSearchForm] = useState({
    accountOrPhone: "",
    email: "",
    name: "",
    subscriberId: "",
    mobile: "",
    mobile91: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showTable, setShowTable] = useState(false);
  const [searchType, setSearchType] = useState<'member' | 'subscriber'>('member');
  
  // 根據查詢類型選擇資料來源
  const currentData = searchType === 'member' ? memberData : subscriberData;
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setSearchForm({
      accountOrPhone: "",
      email: "",
      name: "",
      subscriberId: "",
      mobile: "",
      mobile91: "",
    });
  };

  const handleSearch = (type: 'member' | 'subscriber') => {
    setSearchType(type);
    setShowTable(true);
    setCurrentPage(1);
  };

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "會員管理", href: "/members" },
    { label: "會員查詢" }
  ];

  const handleBreadcrumbNavigate = (href: string, index: number) => {
    console.log(`導航到: ${href}, 索引: ${index}`);
    // 在實際應用中，這裡會執行路由跳轉
  };

  // 定義表格欄位
  const columns: CwTableColumn<MemberData>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
    },
    {
      key: 'account',
      title: '帳號',
      width: '200px',
    },
    {
      key: 'email',
      title: 'Email',
      width: '200px',
    },
    {
      key: 'name',
      title: '姓名',
      width: '120px',
    },
    {
      key: 'subscriberId',
      title: '訂戶編號',
      width: '130px',
    },
    {
      key: 'contactPhone',
      title: '聯絡手機',
      width: '130px',
    },
    {
      key: 'action',
      title: '操作',
      width: '80px',
      align: 'center' as const,
      render: (_, record) => (
        <CwTooltip content="檢視詳細資料">
          <CwRoundButton 
            icon="view"
            onClick={() => {
              if (onViewMember) {
                onViewMember(record.id);
              }
            }}
            aria-label="查看詳情"
          />
        </CwTooltip>
      ),
    },
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-6">
      {/* 頁面標題 */}
      <CwTitle 
        title="會員查詢" 
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
      />

      {/* 搜尋表單 */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CwInput
            placeholder="帳號/已驗證手機"
            value={searchForm.accountOrPhone}
            onChange={(e) => handleInputChange("accountOrPhone", e.target.value)}
            clearable
            onClear={() => handleInputChange("accountOrPhone", "")}
          />
          <CwInput
            placeholder="Email"
            value={searchForm.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            clearable
            onClear={() => handleInputChange("email", "")}
          />
          <CwInput
            placeholder="姓名"
            value={searchForm.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            clearable
            onClear={() => handleInputChange("name", "")}
          />
          <CwInput
            placeholder="訂戶編號"
            value={searchForm.subscriberId}
            onChange={(e) => handleInputChange("subscriberId", e.target.value)}
            clearable
            onClear={() => handleInputChange("subscriberId", "")}
          />
          <CwInput
            placeholder="手機"
            value={searchForm.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            clearable
            onClear={() => handleInputChange("mobile", "")}
          />
          <CwInput
            placeholder="91手機"
            value={searchForm.mobile91}
            onChange={(e) => handleInputChange("mobile91", e.target.value)}
            clearable
            onClear={() => handleInputChange("mobile91", "")}
          />
        </div>
        
        <div className="flex gap-3">
          <CwButton 
            variant="primary"
            appearance="outlined"
            onClick={handleClear}
            leftIcon={<RotateCcw className="h-[14px] w-[14px]" />}
          >
            重設
          </CwButton>
          <CwButton 
            variant="primary"
            appearance="outlined"
            onClick={() => handleSearch('subscriber')}
            leftIcon={<Search className="h-[14px] w-[14px]" />}
          >
            訂戶查詢
          </CwButton>
          <CwButton 
            variant="primary"
            onClick={() => handleSearch('member')}
            leftIcon={<Search className="h-[14px] w-[14px]" />}
          >
            會員查詢
          </CwButton>
        </div>
      </div>

      {/* 資料表格 */}
      {showTable && (
        <div className="content-stretch flex flex-col gap-[10px] items-start">
          <CwTable
            columns={columns}
            dataSource={currentData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            rowKey="id"
          />
          
          {/* 分頁控制 */}
          <CwPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 20, 50]}
          />
        </div>
      )}
    </div>
  );
}
