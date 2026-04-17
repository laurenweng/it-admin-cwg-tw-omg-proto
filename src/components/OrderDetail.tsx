import { useState } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwTable, CwTableColumn } from "./CwTable";
import { CwInput } from "./CwInput";
import { CwPagination } from "./CwPagination";

// 訂單明細資料型別
interface OrderItemData {
  id: number;
  productCode: string;
  productName: string;
  unitPrice: string;
  quantity: number;
  totalPrice: string;
  isGift: string;
  shippingStatus: string;
  shippingMethod: string;
  shippingCost: string;
  recipientId: string;
  recipientPhone: string;
  recipientEmail: string;
  recipientAddress: string;
}

// 模擬訂單明細資料
const mockOrderItems: OrderItemData[] = [
  {
    id: 1,
    productCode: 'KCAA00001',
    productName: '每日讀一文下雜誌（1個月）',
    unitPrice: '180 元',
    quantity: 1,
    totalPrice: '180 元',
    isGift: 'N',
    shippingStatus: '退回',
    shippingMethod: '—',
    shippingCost: '—',
    recipientId: '1680445',
    recipientPhone: '0912-345-678',
    recipientEmail: 'jeff+3@example.com',
    recipientAddress: '台北市中山區中山路123號',
  },
];

export interface OrderDetailProps {
  orderId?: number;
  onClose?: () => void;
}

export function OrderDetail({ orderId, onClose }: OrderDetailProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const orderItems = mockOrderItems;
  const totalItems = orderItems.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 麵包屑導航
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "會員管理", href: "/member" },
    { label: "會員詳細資料", href: "/member-detail" },
    { label: "訂單詳細記錄" }
  ];

  const handleBreadcrumbNavigate = (href: string, index: number) => {
    if (href === "/member-detail" && onClose) {
      onClose();
    } else if (href === "/member" && onClose) {
      // 可以返回會員列表
      onClose();
    } else {
      console.log(`導航到: ${href}, 索引: ${index}`);
    }
  };

  // 訂單明細表格欄位定義
  const columns: CwTableColumn<OrderItemData>[] = [
    {
      key: 'id',
      title: '#',
      width: '50px',
      align: 'center',
    },
    {
      key: 'productCode',
      title: '商品編號',
      width: '120px',
    },
    {
      key: 'productName',
      title: '商品名稱',
      width: '200px',
    },
    {
      key: 'unitPrice',
      title: '所屬方案',
      width: '100px',
    },
    {
      key: 'quantity',
      title: '數量',
      width: '80px',
      align: 'center',
    },
    {
      key: 'totalPrice',
      title: '金額',
      width: '100px',
      align: 'right',
    },
    {
      key: 'isGift',
      title: '是否禮物',
      width: '100px',
      align: 'center',
    },
    {
      key: 'shippingStatus',
      title: '出貨狀態',
      width: '100px',
    },
    {
      key: 'shippingMethod',
      title: '出貨物流商',
      width: '120px',
    },
    {
      key: 'shippingCost',
      title: '出貨物流成本',
      width: '120px',
      align: 'right',
    },
    {
      key: 'recipientId',
      title: '收件人',
      width: '100px',
    },
    {
      key: 'recipientPhone',
      title: '收件人電話',
      width: '140px',
    },
    {
      key: 'recipientEmail',
      title: '收件人Email',
      width: '200px',
    },
    {
      key: 'recipientAddress',
      title: '收件人地址',
      width: '250px',
    },
  ];

  return (
    <div className="px-[30px] py-[20px] space-y-[20px]">
      {/* 頁面標題 */}
      <CwTitle 
        title="訂單詳細記錄"
        breadcrumbs={breadcrumbs} 
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
      />

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
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">訂單編號：520708735</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">來源系統：IS</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">來源編號：</td>
              </tr>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">訂單日期：2025-10-07 09:30:42</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">付款日期：2025-10-07 09:30:48</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">更新日期：2025-10-07 09:40:03</td>
              </tr>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">訂單狀態：已執行訂單</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">付款狀態：會員付款</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">總價代碼：IS</td>
              </tr>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">訂單總金額：180 元</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">總額：0 元</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">抵減碼：</td>
              </tr>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">是否為團購：N</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">關聯原因：</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">關聯訂閱：</td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">金流方式：綠界</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">收款銀行：綠界</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">訂單維註：</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ERP 狀態 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th colSpan={3} className="bg-[#e9ebf2] px-[10px] py-[15px] text-left border-b border-[#cdcdcd]">
                  <span style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '14px', fontWeight: 500, color: '#1c1c1c' }}>ERP 狀態</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">是否已匯ERP：是</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 訂單客戶(訂購人) */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th colSpan={3} className="bg-[#e9ebf2] px-[10px] py-[15px] text-left border-b border-[#cdcdcd]">
                  <span style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '14px', fontWeight: 500, color: '#1c1c1c' }}>訂單客戶(訂購人)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">
                  客戶編號：<span className="text-[#01579b] cursor-pointer hover:underline">1679128</span>
                </td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">訂戶姓名：JEFF</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">
                  會員號碼：<span className="text-[#01579b] cursor-pointer hover:underline">polk200276+3@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">Email：polk200276+3@gmail.com</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">手機：</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 發票資訊 */}
        <div className="border border-[#c4c9d3] rounded-[var(--radius)] overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th colSpan={3} className="bg-[#e9ebf2] px-[10px] py-[15px] text-left border-b border-[#cdcdcd]">
                  <span style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '14px', fontWeight: 500, color: '#1c1c1c' }}>發票資訊</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">開立狀態：會員發票</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">開立提人：81</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">發票號碼：</td>
              </tr>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">發票抬頭：</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">統一編號：</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">發票收件人：Jeff+3</td>
              </tr>
              <tr className="border-b border-[#cdcdcd]">
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">發票收件人入戶編號：</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">發票收件人地址：台北市中山區中山路</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]">發票截點編號：EG0020</td>
              </tr>
              <tr>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">發票載點號碼：polk200276+3@gmail.com</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] border-r border-[#cdcdcd]">發票期限：</td>
                <td className="px-[10px] py-[15px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c]"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 訂單明細 */}
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[#1c1c1c]">
            訂單明細
          </h3>
          <div className="flex items-center gap-[8px]">
            <label className="font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] text-[#1c1c1c] whitespace-nowrap">
              篩選：
            </label>
            <CwInput
              placeholder="輸入查詢關鍵字"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              width="300px"
            />
          </div>
        </div>

        {/* 訂單明細表格 */}
        <div className="content-stretch flex flex-col gap-[10px] items-start">
          <CwTable
            columns={columns}
            dataSource={orderItems}
            rowKey="id"
            emptyText="沒有資料"
          />
          
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
      </div>
    </div>
  );
}

OrderDetail.displayName = 'OrderDetail';
