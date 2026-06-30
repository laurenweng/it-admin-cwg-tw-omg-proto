import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const mockEmployees = [
  { code: '001001', name: '林業務' },
  { code: '001002', name: '張業務' },
  { code: '001003', name: '王業務' },
  { code: '001004', name: '陳業務' },
  { code: '001005', name: '郭業務' },
];

export const SalespersonSelectModal = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (code: string) => void;
}) => {
  const [keyword, setKeyword] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) { setKeyword(''); return; }
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const filteredEmployees = keyword
    ? mockEmployees.filter(
        (e) =>
          e.code.includes(keyword) ||
          e.name.toLowerCase().includes(keyword.toLowerCase())
      )
    : mockEmployees;

  const handleSelect = (code: string) => {
    onSelect(code);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1200] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={popupRef}
        className="bg-white rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] w-[480px] max-h-[520px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-[#e5e7eb]">
          <h3 className="text-[16px] font-[600] text-[#1c1c1c] font-['Noto_Sans_TC',_sans-serif]">選擇業務員</h3>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center hover:bg-[#f5f7fa] text-[#7c808c] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-[20px] py-[12px] border-b border-[#e5e7eb]">
          <input
            type="text"
            placeholder="搜尋員工編號或姓名"
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
                <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">員工編號</th>
                <th className="px-[16px] py-[12px] text-left text-[#7c808c] font-[500]">姓名</th>
                <th className="px-[16px] py-[12px] text-center text-[#7c808c] font-[500]">動作</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? filteredEmployees.map((employee) => (
                <tr key={employee.code} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors">
                  <td className="px-[16px] py-[12px] text-[#1c1c1c] font-[500]">{employee.code}</td>
                  <td className="px-[16px] py-[12px] text-[#1c1c1c]">{employee.name}</td>
                  <td className="px-[16px] py-[12px] text-center">
                    <button
                      onClick={() => handleSelect(employee.code)}
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
  );
};
