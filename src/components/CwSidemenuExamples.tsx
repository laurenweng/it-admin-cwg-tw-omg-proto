import { useState } from 'react';
import { CwSidemenu, CwSidemenuItem } from './CwSidemenu';
import { Users, ShoppingCart, Box, FileText, MessageSquare, User, Settings, BookOpen } from 'lucide-react';

/**
 * CwSidemenu 元件使用範例
 */
export function CwSidemenuExamples() {
  const [activeId1, setActiveId1] = useState('member-search');
  const [activeId2, setActiveId2] = useState('order-list');
  const [collapsed, setCollapsed] = useState(false);

  // 基本菜單項目
  const basicItems: CwSidemenuItem[] = [
    {
      id: 'member',
      label: '會員管理',
      icon: <Users className="w-4 h-4" />,
      children: [
        { id: 'member-search', label: '會員查詢' },
        { id: 'member-create', label: '新增會員' },
      ],
    },
    {
      id: 'order',
      label: '訂單管理',
      icon: <ShoppingCart className="w-4 h-4" />,
      children: [
        { id: 'order-list', label: '訂單列表' },
        { id: 'order-create', label: '新增訂單' },
      ],
    },
    {
      id: 'product',
      label: '產品管理',
      icon: <Box className="w-4 h-4" />,
    },
  ];

  // 完整菜單項目
  const fullItems: CwSidemenuItem[] = [
    {
      id: 'member',
      label: '會員管理',
      icon: <Users className="w-4 h-4" />,
      children: [
        { id: 'member-search', label: '會員查詢' },
        { id: 'member-create', label: '新增會員' },
        { id: 'member-report', label: '會員報表' },
      ],
    },
    {
      id: 'order',
      label: '訂單管理',
      icon: <ShoppingCart className="w-4 h-4" />,
      children: [
        { id: 'order-list', label: '訂單列表' },
        { id: 'order-create', label: '新增訂單' },
        { id: 'order-return', label: '退貨管理' },
      ],
    },
    {
      id: 'product',
      label: '產品管理',
      icon: <Box className="w-4 h-4" />,
      children: [
        { id: 'product-list', label: '產品列表' },
        { id: 'product-category', label: '分類管理' },
      ],
    },
    {
      id: 'medical-record',
      label: '病歷管理',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'consultation',
      label: '線上醫諮',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: 'personal',
      label: '個人帳戶',
      icon: <User className="w-4 h-4" />,
    },
    {
      id: 'admin',
      label: 'Admin 管理',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'km',
      label: 'KM 智庫',
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* 基本使用 */}
      <section className="space-y-4">
        <h4>1. 基本使用</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          側邊選單元件，支援最多 2 層結構
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden" style={{ height: '400px' }}>
          <CwSidemenu
            items={basicItems}
            activeId={activeId1}
            onItemClick={(id) => {
              setActiveId1(id);
              console.log('點擊項目:', id);
            }}
            defaultExpandedIds={['member', 'order']}
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 完整菜單 */}
      <section className="space-y-4">
        <h4>2. 完整菜單（可捲動）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當項目過多時，選單可上下捲動
        </p>
        <div className="border border-border rounded-[var(--radius)] overflow-hidden" style={{ height: '500px' }}>
          <CwSidemenu
            items={fullItems}
            activeId={activeId2}
            onItemClick={(id) => {
              setActiveId2(id);
              console.log('點擊項目:', id);
            }}
            defaultExpandedIds={['order', 'product']}
          />
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* 收合狀態 */}
      <section className="space-y-4">
        <h4>3. 收合狀態（hover 展開）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          收合時僅顯示圖標，hover 時展開選單可點選子項目
        </p>
        <div className="space-y-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-[var(--radius)] hover:opacity-90"
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              fontSize: 'var(--text-base)',
            }}
          >
            {collapsed ? '展開選單' : '收合選單'}
          </button>
          <div className="border border-border rounded-[var(--radius)] overflow-hidden" style={{ height: '400px' }}>
            <CwSidemenu
              items={basicItems}
              activeId={activeId1}
              onItemClick={(id) => {
                setActiveId1(id);
                console.log('點擊項目:', id);
              }}
              defaultExpandedIds={['member']}
              collapsed={collapsed}
            />
          </div>
        </div>
      </section>
    </div>
  );
}