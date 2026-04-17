import { Bell, User, Menu } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="w-full h-16 bg-sidebar flex items-center justify-between px-[30px] shadow-[var(--elevation-sm)]">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMenuToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
          style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-sidebar-foreground" style={{ fontFamily: 'var(--font-figtree)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
          客服系統
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
          style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
          style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
        >
          <User className="h-5 w-5" />
        </Button>
        <span className="text-sidebar-foreground" style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-normal)' }}>
          登出
        </span>
      </div>
    </header>
  );
}