import React, { useState } from 'react';
import { CwSortTable, CwSortTableColumn } from './CwSortTable';
import { StatusTag } from './StatusTag';
import { CwRoundButton } from './CwRoundButton';

// 範例資料型別
interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  department: string;
  joinDate: string;
  score: number;
}

export const CwSortTableExamples: React.FC = () => {
  // 範例資料
  const memberData: Member[] = [
    {
      id: 1,
      name: '王小明',
      email: 'wang@example.com',
      phone: '0912-345-678',
      status: '啟用',
      department: '資訊部',
      joinDate: '2023-01-15',
      score: 95,
    },
    {
      id: 2,
      name: '李美華',
      email: 'lee@example.com',
      phone: '0923-456-789',
      status: '停用',
      department: '人資部',
      joinDate: '2023-03-20',
      score: 88,
    },
    {
      id: 3,
      name: '張志偉',
      email: 'chang@example.com',
      phone: '0934-567-890',
      status: '啟用',
      department: '業務部',
      joinDate: '2022-11-10',
      score: 92,
    },
    {
      id: 4,
      name: 'Anderson Williams',
      email: 'anderson.williams@example.com',
      phone: '0945-678-901',
      status: '審核中',
      department: '資訊部',
      joinDate: '2023-05-05',
      score: 78,
    },
    {
      id: 5,
      name: '陳雅婷',
      email: 'chen@example.com',
      phone: '0956-789-012',
      status: '啟用',
      department: '行銷部',
      joinDate: '2023-02-28',
      score: 85,
    },
  ];

  // 基本欄位配置
  const basicColumns: CwSortTableColumn<Member>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'name',
      title: '姓名',
      width: '120px',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      title: '電話',
      width: '140px',
    },
  ];

  // 帶狀態標籤的欄位配置
  const columnsWithTag: CwSortTableColumn<Member>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'name',
      title: '姓名',
      width: '120px',
      sortable: true,
    },
    {
      key: 'department',
      title: '部門',
      width: '100px',
      sortable: true,
    },
    {
      key: 'status',
      title: '狀態',
      width: '100px',
      sortable: true,
      render: (value) => {
        const variant = 
          value === '啟用' ? 'success' : 
          value === '停用' ? 'error' : 
          value === '審核中' ? 'warning' : 
          'default';
        return <StatusTag variant={variant}>{value}</StatusTag>;
      },
    },
    {
      key: 'score',
      title: '評分',
      width: '80px',
      sortable: true,
      align: 'center',
    },
  ];

  // 帶操作按鈕的欄位配置
  const columnsWithAction: CwSortTableColumn<Member>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'name',
      title: '姓名',
      width: '120px',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
    },
    {
      key: 'joinDate',
      title: '加入日期',
      width: '120px',
      sortable: true,
    },
    {
      key: 'action',
      title: '操作',
      width: '120px',
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <CwRoundButton icon="view" onClick={() => console.log('檢視', record)} />
          <CwRoundButton icon="edit" onClick={() => console.log('編輯', record)} />
          <CwRoundButton icon="delete" onClick={() => console.log('刪除', record)} />
        </div>
      ),
    },
  ];

  // 多欄位配置（測試橫向捲動）
  const manyColumns: CwSortTableColumn<Member>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'name',
      title: '姓名',
      width: '120px',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      width: '200px',
      sortable: true,
    },
    {
      key: 'phone',
      title: '電話',
      width: '140px',
    },
    {
      key: 'department',
      title: '部門',
      width: '100px',
      sortable: true,
    },
    {
      key: 'status',
      title: '狀態',
      width: '100px',
      sortable: true,
      render: (value) => {
        const variant = 
          value === '啟用' ? 'success' : 
          value === '停用' ? 'error' : 
          value === '審核中' ? 'warning' : 
          'default';
        return <StatusTag variant={variant}>{value}</StatusTag>;
      },
    },
    {
      key: 'joinDate',
      title: '加入日期',
      width: '120px',
      sortable: true,
    },
    {
      key: 'score',
      title: '評分',
      width: '80px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'action',
      title: '操作',
      width: '80px',
      align: 'center',
      render: () => (
        <div className="flex gap-2 justify-center">
          <CwRoundButton icon="view" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 基本排序表格 */}
      <div className="space-y-3">
        <h4>1. 基本排序表格</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          點擊欄位標頭的排序圖標可進行升序或降序排列。圖標狀態：預設（雙向箭頭）→ 升序（向上箭頭）→ 降序（向下箭頭）→ 取消排序。
        </p>
        <CwSortTable
          columns={basicColumns}
          dataSource={memberData}
          rowKey="id"
        />
      </div>

      <hr className="border-t border-border/30" />

      {/* 帶狀態標籤 */}
      <div className="space-y-3">
        <h4>2. 帶狀態標籤</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          使用 StatusTag 元件顯示固定內容項目，透過不同顏色變體快速辨認資料狀態。
        </p>
        <CwSortTable
          columns={columnsWithTag}
          dataSource={memberData}
          rowKey="id"
        />
      </div>

      <hr className="border-t border-border/30" />

      {/* 帶操作按鈕 */}
      <div className="space-y-3">
        <h4>3. 帶操作按鈕</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          在最後一欄加入操作按鈕（CwRoundButton），並設定固定寬度和置中對齊。
        </p>
        <CwSortTable
          columns={columnsWithAction}
          dataSource={memberData}
          rowKey="id"
        />
      </div>

      <hr className="border-t border-border/30" />

      {/* 多欄位橫向捲動 */}
      <div className="space-y-3">
        <h4>4. 多欄位橫向捲動</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當欄位過多時，表格會自動啟用橫向捲動，確保所有內容完整顯示不截斷。
        </p>
        <CwSortTable
          columns={manyColumns}
          dataSource={memberData}
          rowKey="id"
        />
      </div>

      <hr className="border-t border-border/30" />

      {/* 空狀態 */}
      <div className="space-y-3">
        <h4>5. 空狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當表格沒有資料時，顯示空狀態提示。
        </p>
        <CwSortTable
          columns={basicColumns}
          dataSource={[]}
          rowKey="id"
          emptyText="目前沒有會員資料"
        />
      </div>

      <hr className="border-t border-border/30" />

      {/* 長文字自動折行 */}
      <div className="space-y-3">
        <h4>6. 長文字自動折行</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          表格內容不會出現截斷符號（...），內容過多時會自動折行顯示，確保所有資訊完整可見。
        </p>
        <CwSortTable
          columns={[
            {
              key: 'id',
              title: '#',
              width: '60px',
              align: 'center',
            },
            {
              key: 'name',
              title: '姓名',
              width: '150px',
            },
            {
              key: 'email',
              title: 'Email',
              width: '200px',
            },
          ]}
          dataSource={[
            {
              id: 1,
              name: 'Anderson Williams',
              email: 'anderson.williams@verylongdomainname.example.com',
            },
            {
              id: 2,
              name: '這是一個非常非常非常長的姓名範例',
              email: 'thisisaverylongemailaddresswithoutspaces@example.com',
            },
          ]}
          rowKey="id"
        />
      </div>
    </div>
  );
};
