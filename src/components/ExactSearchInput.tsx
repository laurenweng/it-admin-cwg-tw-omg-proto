import React, { useState } from "react";
import { CwInput, CwInputProps } from "./CwInput";
import { CwFuzzySearchModal, FuzzySearchType } from "./CwFuzzySearchModal";
import { SearchIcon } from "lucide-react";

interface ExactSearchInputProps extends Omit<CwInputProps, 'type' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  searchType: FuzzySearchType;
  modalTitle?: string;
}

export const ExactSearchInput: React.FC<ExactSearchInputProps> = ({
  value,
  onChange,
  searchType,
  modalTitle,
  ...props
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingKeyword, setPendingKeyword] = useState("");

  const checkIsExactMatch = (val: string) => {
    if (!val) return true;
    
    // Prototype 簡易驗證邏輯：如果不是以預期的 ID prefix 開頭，就當作「找不到精確值」(需開啟模糊搜尋)
    const upperVal = val.toUpperCase();
    switch (searchType) {
      case 'customer':
        return upperVal.startsWith('CST');
      case 'product':
        return upperVal.startsWith('PRD');
      case 'plan':
        return upperVal.startsWith('PLN');
      case 'channel':
        return upperVal.startsWith('CHL');
      default:
        return upperVal.startsWith('GEN') || upperVal.length > 5;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !checkIsExactMatch(val)) {
      setPendingKeyword(val);
      setModalOpen(true);
    }
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = value.trim();
      if (val && !checkIsExactMatch(val)) {
        setPendingKeyword(val);
        setModalOpen(true);
      }
    }
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  const handleSelect = (id: string) => {
    onChange(id);
    setModalOpen(false);
  };

  return (
    <>
      <CwInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="輸入關鍵字點擊右側搜尋"
        rightIcon={
          <div className="flex items-center pr-1 ml-1">
            <button 
              type="button"
              className="text-[#0078d4] hover:bg-blue-50 rounded-md flex items-center justify-center transition-colors"
              onClick={() => {
                setPendingKeyword(value || " ");
                setModalOpen(true);
              }}
              title="點擊開啟模糊搜尋子選單"
            >
              <SearchIcon size={16} />
            </button>
          </div>
        }
        {...props}
      />
      <CwFuzzySearchModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        keyword={pendingKeyword}
        type={searchType}
        title={modalTitle}
        onSelect={handleSelect}
      />
    </>
  );
};
