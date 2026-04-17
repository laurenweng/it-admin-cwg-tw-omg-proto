import React, { useState, useEffect } from "react";
import { CwPopup, CwPopupButton } from "./CwPopup";
import { CwTable, CwTableColumn } from "./CwTable";

export type FuzzySearchType = 'customer' | 'product' | 'plan' | 'channel' | 'generic';

interface CwFuzzySearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  keyword: string;
  type: FuzzySearchType;
  title?: string;
}

// 模擬不同類型的資料
const generateMockData = (type: FuzzySearchType, keyword: string) => {
  if (!keyword) return [];
  
  const baseId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  if (type === 'customer') {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `CST${baseId}${i}`,
      name: `${keyword} - 客戶 ${i + 1}`,
      emails: [`test${i}@example.com`, `work${i}@example.com`],
      phones: [`0912-345-${i.toString().padStart(3, '0')}`, `02-2345678${i}`],
      address: `台北市信義區測試路 ${i + 1} 號`,
      benefitName: i % 2 === 0 ? '年訂戶VIP' : '數位版會員',
      benefitPeriod: '2025/01/01 ~ 2025/12/31',
      lastTradeDate: '2025-02-15',
    }));
  }

  if (type === 'product') {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `PRD${baseId}${i}`,
      name: `${keyword} - 測試商品 ${i + 1}`,
      category: i % 2 === 0 ? '實體雜誌' : '數位課程',
      price: 1000 + i * 500,
    }));
  }
  
  if (type === 'plan') {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `PLN${baseId}${i}`,
      name: `${keyword} - 專案方案 ${i + 1}`,
      status: '啟用',
    }));
  }

  if (type === 'channel') {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `CHL${baseId}${i}`,
      name: `${keyword} - 合作通路 ${i + 1}`,
      manager: `專員 ${i + 1}`,
    }));
  }

  // generic
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `GEN${baseId}${i}`,
    name: `${keyword} - 符合項目 ${i + 1}`,
    description: `這是一筆由系統自動隨機產生的相關紀錄 ${i + 1}`,
  }));
};

export const CwFuzzySearchModal: React.FC<CwFuzzySearchModalProps> = ({
  open,
  onClose,
  onSelect,
  keyword,
  type,
  title
}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      setData(generateMockData(type, keyword || '搜尋'));
    }
  }, [open, keyword, type]);

  const getColumns = (): CwTableColumn<any>[] => {
    switch (type) {
      case 'customer':
        return [
          { key: 'id', title: '客戶編號', width: '120px' },
          { key: 'name', title: '客戶姓名', width: '120px' },
          { 
            key: 'emails', 
            title: '客戶聯絡Email', 
            width: '180px',
            render: (emails: string[]) => (
              <div className="flex flex-col gap-1">
                {emails.map((e, idx) => <span key={idx}>{e}</span>)}
              </div>
            )
          },
          { 
            key: 'phones', 
            title: '客戶手機', 
            width: '120px',
            render: (phones: string[]) => (
              <div className="flex flex-col gap-1">
                {phones.map((p, idx) => <span key={idx}>{p}</span>)}
              </div>
            )
          },
          { key: 'address', title: '客戶地址', width: '200px' },
          { key: 'benefitName', title: '有效權益名稱', width: '120px' },
          { key: 'benefitPeriod', title: '有效權益起訖', width: '160px' },
          { key: 'lastTradeDate', title: '最近交易日', width: '100px' },
          {
            key: 'action',
            title: '操作',
            width: '80px',
            align: 'center',
            render: (_, record) => (
              <button 
                className="text-[#0078d4] hover:underline"
                onClick={() => onSelect(record.id)}
              >
                帶入
              </button>
            )
          }
        ];
      case 'product':
        return [
          { key: 'id', title: '產品編號', width: '120px' },
          { key: 'name', title: '產品名稱', width: '250px' },
          { key: 'category', title: '分類', width: '100px' },
          { key: 'price', title: '價格', width: '100px' },
          {
            key: 'action',
            title: '操作',
            width: '80px',
            align: 'center',
            render: (_, record) => (
              <button 
                className="text-[#0078d4] hover:underline"
                onClick={() => onSelect(record.id)}
              >
                帶入
              </button>
            )
          }
        ];
      case 'plan':
        return [
          { key: 'id', title: '方案代碼', width: '120px' },
          { key: 'name', title: '方案名稱', width: '250px' },
          { key: 'status', title: '狀態', width: '100px' },
          {
            key: 'action',
            title: '操作',
            width: '80px',
            align: 'center',
            render: (_, record) => (
              <button 
                className="text-[#0078d4] hover:underline"
                onClick={() => onSelect(record.id)}
              >
                帶入
              </button>
            )
          }
        ];
      case 'channel':
        return [
          { key: 'id', title: '通路代碼', width: '120px' },
          { key: 'name', title: '通路名稱', width: '250px' },
          { key: 'manager', title: '負責專員', width: '120px' },
          {
            key: 'action',
            title: '操作',
            width: '80px',
            align: 'center',
            render: (_, record) => (
              <button 
                className="text-[#0078d4] hover:underline"
                onClick={() => onSelect(record.id)}
              >
                帶入
              </button>
            )
          }
        ];
      default:
        return [
          { key: 'id', title: '代碼', width: '120px' },
          { key: 'name', title: '名稱', width: '200px' },
          { key: 'description', title: '說明', width: '300px' },
          {
            key: 'action',
            title: '操作',
            width: '80px',
            align: 'center',
            render: (_, record) => (
              <button 
                className="text-[#0078d4] hover:underline"
                onClick={() => onSelect(record.id)}
              >
                帶入
              </button>
            )
          }
        ];
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'customer': return '選擇客戶';
      case 'product': return '選擇產品';
      case 'plan': return '選擇方案';
      case 'channel': return '選擇通路';
      default: return '選擇項目';
    }
  };

  return (
    <CwPopup
      open={open}
      onClose={onClose}
      title={getTitle() + ` (搜尋關鍵字：${keyword})`}
      size={type === 'customer' ? 'xl' : 'lg'}
      showFooter={false}
    >
      <div className="py-2 text-sm text-gray-500 mb-2">
        未找到完全符合「{keyword}」的紀錄。以下為系統替您猜測的可能結果，請點選「帶入」以選取正確的項目進行搜尋。
      </div>
      <div>
        <CwTable 
          columns={getColumns()} 
          dataSource={data} 
          rowKey="id" 
          emptyText="抱歉，沒有找到相符的資料。"
        />
      </div>
    </CwPopup>
  );
};
