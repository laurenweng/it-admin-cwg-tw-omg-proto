import { useState } from "react";
import { CwInput, CwInputWithTags, SearchIcon, CopyIcon, ExternalLinkIcon } from "./CwInput";
import { CwTooltip } from "./CwTooltip";
import { Search, Eye, EyeOff, Send } from "lucide-react";

/**
 * CwInput 組件使用範例
 * 展示所有可能的使用情境
 */
export function CwInputExamples() {
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorValue, setErrorValue] = useState("錯誤的輸入");
  const [disabledValue] = useState("禁用狀態");
  
  // 多選輸入框狀態
  const [selectedTags, setSelectedTags] = useState<string[]>(["陳柏凱", "王小明"]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [selectedSocialWorkers, setSelectedSocialWorkers] = useState<string[]>([]);
  const [socialWorkerInput, setSocialWorkerInput] = useState("");
  
  // 帶 icon 按鈕的輸入框狀態
  const [searchValue, setSearchValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  return (
    <div className="space-y-8">
      
      {/* 帶標籤的輸入框 */}
      <section className="space-y-4">
        <h4>1. 帶標籤的輸入框（label 屬性）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            label="姓名"
            placeholder="請輸入姓名"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            clearable
            onClear={() => setTextValue("")}
          />
          <CwInput
            label="Email"
            placeholder="請輸入 Email"
            type="email"
            clearable
          />
          <CwInput
            label="手機號碼"
            placeholder="請輸入手機號碼"
            type="tel"
            clearable
          />
          <CwInput
            label="關鍵字搜尋"
            placeholder="姓名/Email/手機號碼"
            isSearch
            clearable
          />
          <CwInput
            label="年齡"
            placeholder="請輸入年齡"
            type="number"
            min="0"
            max="150"
          />
          <CwInput
            label="密碼"
            placeholder="請輸入密碼"
            type="password"
          />
        </div>
      </section>
      
      {/* 基本輸入框 */}
      <section className="space-y-4">
        <h4>2. 基本輸入框（無標籤）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            placeholder="請輸入文字"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <CwInput
            placeholder="請輸入文字"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            clearable
            onClear={() => setTextValue("")}
          />
        </div>
      </section>

      {/* 帶圖標的輸入框 */}
      <section className="space-y-4">
        <h4>3. 帶圖標的輸入框</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            placeholder="搜尋..."
            leftIcon={<SearchIcon />}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <CwInput
            placeholder="請輸入文字"
            value="文字"
            readOnly
            rightIcon={
              <div className="flex gap-2">
                <CwTooltip content="複製">
                  <button type="button" className="hover:opacity-80">
                    <CopyIcon />
                  </button>
                </CwTooltip>
                <CwTooltip content="另開網址">
                  <button type="button" className="hover:opacity-80">
                    <ExternalLinkIcon />
                  </button>
                </CwTooltip>
              </div>
            }
          />
          <CwInput
            placeholder="請輸入文字"
            value="文字"
            readOnly
            rightIcon={
              <CwTooltip content="另開網址">
                <button type="button" className="hover:opacity-80">
                  <ExternalLinkIcon />
                </button>
              </CwTooltip>
            }
          />
        </div>
      </section>

      {/* 帶 icon 按鈕的輸入框（使用 lucide-react） */}
      <section className="space-y-4">
        <h4>3-1. 帶 icon 按鈕的輸入框（推薦用法）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          在 input 元件中使用單一 icon（來自 lucide-react），並放置在最右側
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 搜尋輸入框 */}
          <CwInput
            placeholder="請輸入客戶編號"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            rightIcon={
              <button 
                type="button"
                onClick={() => console.log("搜尋:", searchValue)}
                className="cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Search size={16} color="#7c808c" />
              </button>
            }
          />
          
          {/* 密碼顯示/隱藏 */}
          <CwInput
            type={showPassword ? "text" : "password"}
            placeholder="請輸入密碼"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            rightIcon={
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer hover:opacity-70 transition-opacity"
              >
                {showPassword ? (
                  <EyeOff size={16} color="#7c808c" />
                ) : (
                  <Eye size={16} color="#7c808c" />
                )}
              </button>
            }
          />
          
          {/* 發送訊息 */}
          <CwInput
            placeholder="輸入訊息"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            rightIcon={
              <CwTooltip content="發送訊息" disabled={!messageValue}>
                <button 
                  type="button"
                  onClick={() => {
                    console.log("發送:", messageValue);
                    setMessageValue("");
                  }}
                  className="cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!messageValue}
                >
                  <Send size={16} color={messageValue ? "#01579b" : "#7c808c"} />
                </button>
              </CwTooltip>
            }
          />
        </div>
      </section>

      {/* 文字對齊 */}
      <section className="space-y-4">
        <h4>4. 文字對齊</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            placeholder="左對齊（預設）"
            textAlign="left"
          />
          <CwInput
            placeholder="置中對齊"
            textAlign="center"
          />
          <CwInput
            placeholder="右對齊"
            textAlign="right"
          />
        </div>
      </section>

      {/* 數字輸入 */}
      <section className="space-y-4">
        <h4>5. 數字輸入</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            type="number"
            placeholder="請輸入數字"
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
          />
          <CwInput
            type="number"
            placeholder="請輸入數字"
            leftIcon={<SearchIcon />}
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
          />
          <CwInput
            type="number"
            value="12345"
            readOnly
          />
        </div>
      </section>

      {/* 密碼輸入 */}
      <section className="space-y-4">
        <h4>6. 密碼輸入</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            type="password"
            placeholder="請輸入密碼"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <CwInput
            type="password"
            placeholder="請輸入密碼"
            leftIcon={<SearchIcon />}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <CwInput
            type="password"
            value="password123"
            readOnly
          />
        </div>
      </section>

      {/* 禁用狀態 */}
      <section className="space-y-4">
        <h4>7. 禁用狀態</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CwInput
            value={disabledValue}
            disabled
          />
          <CwInput
            type="number"
            value="12345"
            disabled
          />
          <CwInput
            type="password"
            value="password"
            disabled
          />
        </div>
      </section>

      {/* 錯誤狀態 */}
      <section className="space-y-4">
        <h4>8. 錯誤狀態</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CwInput
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
            error="這是錯誤訊息"
          />
          <CwInput
            placeholder="請輸入正確格式"
            error="欄位為必填"
          />
        </div>
      </section>

      {/* Focus 狀態說明 */}
      <section className="space-y-4">
        <h4>9. Focus 狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          點擊輸入框時會顯示藍色邊框和陰影效果
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CwInput
            placeholder="點擊試試 Focus 效果"
          />
          <CwInput
            placeholder="Focus 時顯示藍色邊框"
            leftIcon={<SearchIcon />}
          />
        </div>
      </section>

      {/* 不同寬度 */}
      <section className="space-y-4">
        <h4>10. 自定義寬度</h4>
        <div className="space-y-4">
          <CwInput
            placeholder="全寬度"
            width="w-full"
          />
          <CwInput
            placeholder="固定寬度 200px"
            width="w-[200px]"
          />
          <CwInput
            placeholder="固定��度 60px"
            width="w-[60px]"
            textAlign="center"
          />
        </div>
      </section>

      {/* 多選輸入框 */}
      <section className="space-y-4">
        <h4>11. 多選輸入框（CwInputWithTags）</h4>
        <div className="space-y-6">
          <div>
            <CwInputWithTags
              label="已選擇的成員"
              tags={selectedTags}
              value={tagInputValue}
              onChange={setTagInputValue}
              onRemoveTag={(index) => {
                setSelectedTags(prev => prev.filter((_, i) => i !== index));
              }}
              onAddTag={(value) => {
                if (value && !selectedTags.includes(value)) {
                  setSelectedTags(prev => [...prev, value]);
                  setTagInputValue("");
                }
              }}
              placeholder="輸入名字並按 Enter"
              clearable
              onClearAll={() => {
                setSelectedTags([]);
                setTagInputValue("");
              }}
            />
            <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-sm)' }}>
              輸入名字後按 Enter 添加，點擊標籤上的 X 移除
            </p>
          </div>

          <div>
            <CwInputWithTags
              label="選擇社工"
              tags={selectedSocialWorkers}
              value={socialWorkerInput}
              onChange={setSocialWorkerInput}
              onRemoveTag={(index) => {
                setSelectedSocialWorkers(prev => prev.filter((_, i) => i !== index));
              }}
              onAddTag={(value) => {
                if (value && !selectedSocialWorkers.includes(value)) {
                  setSelectedSocialWorkers(prev => [...prev, value]);
                  setSocialWorkerInput("");
                }
              }}
              placeholder="請輸入社工姓名"
            />
            <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-sm)' }}>
              已選擇 {selectedSocialWorkers.length} 位社工
            </p>
          </div>

          <div>
            <CwInputWithTags
              label="禁用狀態"
              tags={["張社工", "林社工"]}
              value=""
              onChange={() => {}}
              onRemoveTag={() => {}}
              disabled
              placeholder="禁用狀態"
            />
          </div>
        </div>
      </section>

      {/* 實際應用範例 */}
      <section className="space-y-4">
        <h4>12. 實際應用範例（表單）</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          在表單中使用 CwInput 的 label 屬性，確保標籤與輸入框的間距一致
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CwInput
              label="姓名"
              placeholder="請輸入姓名"
              clearable
            />
            <CwInput
              label="Email"
              type="email"
              placeholder="example@email.com"
              clearable
            />
            <CwInput
              label="電話號碼"
              type="tel"
              placeholder="0912-345-678"
              clearable
            />
            <CwInput
              label="年齡"
              type="number"
              placeholder="請輸入年齡"
              min="0"
              max="150"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CwInputExamples;