import { FileText, X, Eye, Edit, Download, Copy, Trash2 } from "lucide-react";

export interface CwTextButtonProps {
  /** 按鈕文字 */
  label: string;
  /** 圖標類型 */
  icon?: "view" | "edit" | "delete" | "download" | "copy" | "document" | "close";
  /** 顏色變體 */
  variant?: "primary" | "destructive";
  /** 點擊事件 */
  onClick?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * CwTextButton - 文字按鈕元件
 * 
 * 用於表格中的操作按鈕，以文字和圖標組合的形式顯示
 * 
 * @example
 * ```tsx
 * <CwTextButton label="檢視詳情" icon="document" variant="primary" onClick={handleView} />
 * <CwTextButton label="取消關聯" icon="close" variant="destructive" onClick={handleDelete} />
 * ```
 */
export function CwTextButton({
  label,
  icon,
  variant = "primary",
  onClick,
  disabled = false
}: CwTextButtonProps) {
  const iconMap = {
    view: Eye,
    edit: Edit,
    delete: Trash2,
    download: Download,
    copy: Copy,
    document: FileText,
    close: X
  };

  const IconComponent = icon ? iconMap[icon] : null;

  const colorClass = variant === "destructive" 
    ? "text-[#c00000] hover:text-[#a00000]" 
    : "text-[#01579b] hover:text-[#014a82]";

  const disabledClass = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-[4px] font-['Noto_Sans_TC',_sans-serif] text-[14px] font-[350] transition-colors whitespace-nowrap ${colorClass} ${disabledClass}`}
    >
      {IconComponent && <IconComponent size={16} />}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

CwTextButton.displayName = 'CwTextButton';
