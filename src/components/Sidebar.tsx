import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Users, 
  FileText, 
  MessageSquare, 
  User, 
  Settings, 
  BookOpen,
  Search,
  Package,
  ShoppingCart,
  Box
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface SidebarProps {
  collapsed: boolean;
  onPageChange?: (pageId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "member",
    label: "會員管理",
    icon: <Users className="h-4 w-4" />,
    children: [
      { id: "member-search", label: "會員查詢", icon: <Search className="h-4 w-4" /> }
    ]
  },
  {
    id: "order",
    label: "訂單管理",
    icon: <ShoppingCart className="h-4 w-4" />,
    children: [
      { id: "order-management", label: "訂單查詢", icon: <Search className="h-4 w-4" /> }
    ]
  },
  {
    id: "product",
    label: "產品管理",
    icon: <Box className="h-4 w-4" />,
    children: [
      { id: "product-management", label: "產品列表", icon: <Search className="h-4 w-4" /> }
    ]
  },
  {
    id: "medical-record",
    label: "病歷管理與其他項目",
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: "consultation",
    label: "線上醫諮",
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    id: "personal",
    label: "個人帳戶與其他管理",
    icon: <User className="h-4 w-4" />
  },
  {
    id: "admin",
    label: "admin 管理",
    icon: <Settings className="h-4 w-4" />
  },
  {
    id: "km",
    label: "KM智庫",
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    id: "component-demo",
    label: "元件demo",
    icon: <Package className="h-4 w-4" />
  }
];

export function Sidebar({ collapsed, onPageChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["member", "order", "product"]);
  const [activeItem, setActiveItem] = useState("member-search");

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-10 rounded-[var(--radius)]",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            level > 0 && "pl-10",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              setActiveItem(item.id);
              onPageChange?.(item.id);
            }
          }}
          style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
        >
          {item.icon}
          {!collapsed && (
            <>
              <span className="flex-1 text-left" style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}>
                {item.label}
              </span>
              {hasChildren && (
                isExpanded ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
              )}
            </>
          )}
        </Button>
        
        {!collapsed && hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside 
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-[250px]"
      )}
    >
      <div className="p-4 space-y-2">
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </aside>
  );
}