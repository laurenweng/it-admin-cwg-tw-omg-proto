import React, { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";

export type PopupSelectOption = {
  code: string;
  name: string;
};

export const PopupSelectField = ({
  label,
  value,
  onChange,
  onClear,
  options,
  placeholder,
  disabled,
  required,
  popupTitle,
  searchPlaceholder,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  options: PopupSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  popupTitle?: string;
  searchPlaceholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) { setKeyword(''); return; }
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const filteredOptions = keyword
    ? options.filter(
        (option) =>
          option.code.includes(keyword) ||
          option.name.toLowerCase().includes(keyword.toLowerCase())
      )
    : options;

  const handleSelect = (option: PopupSelectOption) => {
    onChange(option.code);
    setOpen(false);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[6px]">
        {label && (required ? (
          <label className="flex items-center gap-[2px] text-[12px] font-[500] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">
            {label}
            <span className="text-[#e53935]">*</span>
          </label>
        ) : (
          <label className="text-[12px] font-[500] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">{label}</label>
        ))}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={placeholder ?? label ?? ''}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full h-[35px] px-[12px] pr-[64px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif] ${disabled ? 'bg-[#e9ebf2] cursor-not-allowed text-[#7c808c]' : 'bg-white'}`}
            style={{ fontWeight: 350 }}
          />
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-[36px] w-[24px] h-[24px] flex items-center justify-center text-[#7c808c] hover:text-[#1c1c1c] transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={disabled}
            className={`absolute right-[4px] w-[28px] h-[28px] rounded-[4px] border border-[#c4c9d3] flex items-center justify-center transition-colors ${disabled ? 'bg-[#e9ebf2] text-[#c4c9d3] cursor-not-allowed' : 'bg-white hover:bg-[#f5f7fa] text-[#01579b]'}`}
          >
            <Search size={14} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            ref={popupRef}
            className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
              <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">
                {popupTitle ?? (label ? `選擇${label}` : '選擇')}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
              <input
                type="text"
                placeholder={searchPlaceholder ?? (label ? `搜尋${label}` : '搜尋')}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
                className="w-full h-[36px] px-[12px] border border-[#c4c9d3] rounded-[4px] text-[14px] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]"
                style={{ fontWeight: 350 }}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-[14px] font-['Noto_Sans_TC',_sans-serif]" style={{ fontWeight: 350 }}>
                <thead className="sticky top-0 bg-[#f5f7fa] border-b border-[#e5e7eb]">
                  <tr>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">代碼</th>
                    <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">名稱</th>
                    <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOptions.length > 0 ? filteredOptions.map((option) => (
                    <tr key={option.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                      <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{option.code}</td>
                      <td className="px-[16px] py-[12px] text-[#1c1c1c]">{option.name}</td>
                      <td className="px-[16px] py-[12px] text-center">
                        <button
                          onClick={() => handleSelect(option)}
                          className="px-[12px] py-[6px] bg-[#0078d4] text-white rounded-[4px] font-[500] hover:bg-[#106ebe] transition-colors"
                        >
                          選擇
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-[16px] py-[32px] text-center text-[#7c808c]">查無符合資料</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
