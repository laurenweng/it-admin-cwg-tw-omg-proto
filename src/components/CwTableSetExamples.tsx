import React, { useState } from 'react';
import { CwTableSet } from './CwTableSet';
import { CwSortTableColumn } from './CwSortTable';
import { StatusTag } from './StatusTag';
import { CwRoundButton } from './CwRoundButton';
import { CwTooltip } from './CwTooltip';

// 簡單資料範例
interface SimpleData {
  id: number;
  name: string;
  value: number;
  status: string;
}

const simpleData: SimpleData[] = [
  { id: 1, name: '項目 A', value: 100, status: '啟用' },
  { id: 2, name: '項目 B', value: 200, status: '停用' },
  { id: 3, name: '項目 C', value: 150, status: '啟用' },
  { id: 4, name: '項目 D', value: 300, status: '啟用' },
  { id: 5, name: '項目 E', value: 250, status: '停用' },
];

// 員工資料範例
interface EmployeeData {
  id: number;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  email: string;
}

const employeeData: EmployeeData[] = [
  { id: 1, employeeId: 'EMP001', name: '王小明', department: '技術部', position: '工程師', email: 'wang@example.com' },
  { id: 2, employeeId: 'EMP002', name: '李美玲', department: '行銷部', position: '專員', email: 'li@example.com' },
  { id: 3, employeeId: 'EMP003', name: '張志偉', department: '技術部', position: '主管', email: 'zhang@example.com' },
  { id: 4, employeeId: 'EMP004', name: '陳雅婷', department: '人資部', position: '經理', email: 'chen@example.com' },
  { id: 5, employeeId: 'EMP005', name: '林建宏', department: '財務部', position: '會計', email: 'lin@example.com' },
  { id: 6, employeeId: 'EMP006', name: '黃淑芬', department: '行銷部', position: '經理', email: 'huang@example.com' },
  { id: 7, employeeId: 'EMP007', name: '吳俊傑', department: '技術部', position: '工程師', email: 'wu@example.com' },
  { id: 8, employeeId: 'EMP008', name: '劉怡君', department: '客服部', position: '專員', email: 'liu@example.com' },
];

export const CwTableSetExamples: React.FC = () => {
  const [simpleSearch, setSimpleSearch] = useState('');
  const [simplePage, setSimplePage] = useState(1);
  const [simplePageSize, setSimplePageSize] = useState(5);

  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeePage, setEmployeePage] = useState(1);
  const [employeePageSize, setEmployeePageSize] = useState(5);

  const [noSearchPage, setNoSearchPage] = useState(1);
  const [noSearchPageSize, setNoSearchPageSize] = useState(3);

  // 簡單表格欄位
  const simpleColumns: CwSortTableColumn<SimpleData>[] = [
    {
      key: 'id',
      title: 'ID',
      width: '80px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'name',
      title: '名稱',
      width: '200px',
      sortable: true,
    },
    {
      key: 'value',
      title: '數值',
      width: '120px',
      sortable: true,
      align: 'right',
    },
    {
      key: 'status',
      title: '狀態',
      width: '100px',
      sortable: true,
      render: (value) => (
        <StatusTag variant={value === '啟用' ? 'success' : 'default'}>
          {value}
        </StatusTag>
      ),
    },
    {
      key: 'action',
      title: '操作',
      width: '80px',
      align: 'center',
      render: () => (
        <CwTooltip content="檢視">
          <CwRoundButton icon="view" onClick={() => console.log('查看')} />
        </CwTooltip>
      ),
    },
  ];

  // 員工表格欄位
  const employeeColumns: CwSortTableColumn<EmployeeData>[] = [
    {
      key: 'id',
      title: '#',
      width: '60px',
      sortable: true,
      align: 'center',
    },
    {
      key: 'employeeId',
      title: '員工編號',
      width: '100px',
      sortable: true,
    },
    {
      key: 'name',
      title: '姓名',
      width: '100px',
      sortable: true,
    },
    {
      key: 'department',
      title: '部門',
      width: '100px',
      sortable: true,
    },
    {
      key: 'position',
      title: '職位',
      width: '100px',
      sortable: true,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
    },
    {
      key: 'action',
      title: '操作',
      width: '100px',
      align: 'center',
      render: () => (
        <div className="flex gap-[8px] justify-center">
          <CwTooltip content="編輯">
            <CwRoundButton icon="edit" onClick={() => console.log('編輯')} />
          </CwTooltip>
          <CwTooltip content="檢視">
            <CwRoundButton icon="view" onClick={() => console.log('查看')} />
          </CwTooltip>
        </div>
      ),
    },
  ];

  // 過濾簡單資料
  const filteredSimpleData = simpleData.filter(item => {
    if (!simpleSearch) return true;
    return item.name.toLowerCase().includes(simpleSearch.toLowerCase());
  });

  const paginatedSimpleData = filteredSimpleData.slice(
    (simplePage - 1) * simplePageSize,
    simplePage * simplePageSize
  );

  // 過濾員工資料
  const filteredEmployeeData = employeeData.filter(item => {
    if (!employeeSearch) return true;
    const keyword = employeeSearch.toLowerCase();
    return (
      item.employeeId.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      item.department.toLowerCase().includes(keyword) ||
      item.position.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword)
    );
  });

  const paginatedEmployeeData = filteredEmployeeData.slice(
    (employeePage - 1) * employeePageSize,
    employeePage * employeePageSize
  );

  // 無搜尋框的資料
  const paginatedNoSearchData = simpleData.slice(
    (noSearchPage - 1) * noSearchPageSize,
    noSearchPage * noSearchPageSize
  );

  return (
    <div className="space-y-10">

      {/* 範例 1：基本使用 */}
      <div className="space-y-3">
        <h4>1. 基本使用（含搜尋和分頁）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          最常見的使用方式，包含標題、搜尋框、排序表格和分頁控制。
        </p>
        <div className="mt-4">
          <CwTableSet
            title="簡單資料表"
            columns={simpleColumns}
            dataSource={paginatedSimpleData}
            rowKey="id"
            showSearch={true}
            searchPlaceholder="請輸入名稱"
            searchValue={simpleSearch}
            onSearchChange={(value) => {
              setSimpleSearch(value);
              setSimplePage(1);
            }}
            currentPage={simplePage}
            pageSize={simplePageSize}
            totalItems={filteredSimpleData.length}
            onPageChange={setSimplePage}
            onPageSizeChange={(size) => {
              setSimplePageSize(size);
              setSimplePage(1);
            }}
          />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 範例 2：複雜資料表 */}
      <div className="space-y-3">
        <h4>2. 複雜資料表（多欄位搜尋）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          適用於欄位較多的資料表，搜尋功能可過濾多個欄位。
        </p>
        <div className="mt-4">
          <CwTableSet
            title="員工資料表"
            columns={employeeColumns}
            dataSource={paginatedEmployeeData}
            rowKey="id"
            showSearch={true}
            searchPlaceholder="請輸入員工編號、姓名、部門或職位"
            searchValue={employeeSearch}
            onSearchChange={(value) => {
              setEmployeeSearch(value);
              setEmployeePage(1);
            }}
            currentPage={employeePage}
            pageSize={employeePageSize}
            totalItems={filteredEmployeeData.length}
            onPageChange={setEmployeePage}
            onPageSizeChange={(size) => {
              setEmployeePageSize(size);
              setEmployeePage(1);
            }}
          />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 範例 3：不含搜尋框 */}
      <div className="space-y-3">
        <h4>3. 不含搜尋框（僅顯示資料）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          適用於不需要搜尋功能的場景，僅展示資料和分頁。
        </p>
        <div className="mt-4">
          <CwTableSet
            title="資料列表"
            columns={simpleColumns}
            dataSource={paginatedNoSearchData}
            rowKey="id"
            showSearch={false}
            currentPage={noSearchPage}
            pageSize={noSearchPageSize}
            totalItems={simpleData.length}
            onPageChange={setNoSearchPage}
            onPageSizeChange={(size) => {
              setNoSearchPageSize(size);
              setNoSearchPage(1);
            }}
          />
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 空狀態範例 */}
      <div className="space-y-3">
        <h4>4. 空狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當表格沒有資料時，會自動顯示空狀態圖像和文字提示。
        </p>
        <div className="mt-4">
          <CwTableSet
            title="空白列表"
            columns={simpleColumns}
            dataSource={[]}
            rowKey="id"
            showSearch={true}
            searchPlaceholder="搜尋項目"
            searchValue=""
            onSearchChange={() => {}}
            currentPage={1}
            pageSize={5}
            totalItems={0}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            emptyText="目前沒有任何項目"
          />
        </div>
      </div>

    </div>
  );
};