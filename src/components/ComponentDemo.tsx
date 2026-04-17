import { useState, useEffect } from "react";
import { CwTitle } from "./CwTitle";
import { BreadcrumbItem } from "./CwBreadcrumbs";
import { CwButton, PlusIcon } from "./CwButton";
import { CwRoundButton } from "./CwRoundButton";
import { CwInput, CwInputWithTags, SearchIcon } from "./CwInput";
import { CwCheckbox } from "./CwCheckbox";
import { CwRadio } from "./CwRadio";
import { CwTag } from "./CwTag";
import { CwPagination } from "./CwPagination";
import { CwTable, CwTableColumn, SortDirection } from "./CwTable";
import { CwInputExamples } from "./CwInputExamples";
import { CwTextareaExamples } from "./CwTextareaExamples";
import { CwDatePickerExamples } from "./CwDatePickerExamples";
import { CwPopupExamples } from "./CwPopupExamples";
import { CwSwitchExamples } from "./CwSwitchExamples";
import { CwSortTableExamples } from "./CwSortTableExamples";
import { CwTableSetExamples } from "./CwTableSetExamples";
import { CwToastExamples } from "./CwToastExamples";
import { CwTooltipExamples } from "./CwTooltipExamples";
import { CwDrawerExamples } from "./CwDrawerExamples";
import { CwSelectExamples } from "./CwSelectExamples";
import { CwTabExamples } from "./CwTabExamples";
import { CwTextButtonExamples } from "./CwTextButtonExamples";
import { CwTooltip } from "./CwTooltip";
import { ColorPalette } from "./ColorPalette";
import { Edit, Trash2, Copy, Download, Upload, Filter, RotateCcw, ChevronUp } from "lucide-react";

export function ComponentDemo() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "首頁", href: "/" },
    { label: "元件demo", href: "/component-demo" }
  ];

  // CwButton states
  const [buttonLoading, setButtonLoading] = useState(false);

  // CwInput states
  const [inputValue, setInputValue] = useState("");
  const [inputWithIcon, setInputWithIcon] = useState("");
  const [inputError, setInputError] = useState("lauren");
  const [selectedTags, setSelectedTags] = useState<string[]>(["張三", "李四"]);
  const [tagInput, setTagInput] = useState("");

  // CwCheckbox states
  const [basicChecked, setBasicChecked] = useState(false);
  const [parentChecked, setParentChecked] = useState(false);
  const [parentIndeterminate, setParentIndeterminate] = useState(true);
  const [children, setChildren] = useState({
    child1: true,
    child2: false,
    child3: false,
  });
  const [errorChecked, setErrorChecked] = useState(false);

  // CwRadio states
  const [selectedOption, setSelectedOption] = useState("option1");
  const [paymentMethod, setPaymentMethod] = useState("");

  // CwPagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 45;

  // CwTable states
  const [tableSortKey, setTableSortKey] = useState<string | null>(null);
  const [tableSortDirection, setTableSortDirection] = useState<SortDirection>(null);
  
  const tableData = [
    { id: 1, name: "張小明", email: "zhang@example.com", role: "管理員", status: "啟用" },
    { id: 2, name: "李小華", email: "li@example.com", role: "使用者", status: "啟用" },
    { id: 3, name: "王小美", email: "wang@example.com", role: "使用者", status: "停用" },
  ];

  const tableColumns: CwTableColumn[] = [
    { key: 'id', title: '#', width: '60px', sortable: true },
    { key: 'name', title: '姓名', width: '120px', sortable: true },
    { key: 'email', title: 'Email', sortable: true }, // 不設定 width，自動填滿
    { key: 'role', title: '角色', width: '100px' },
    { key: 'status', title: '狀態', width: '80px' },
    {
      key: 'action',
      title: '操作',
      width: '160px',
      align: 'center' as const,
      render: () => (
        <div className="flex gap-2 justify-center">
          <CwTooltip content="檢視">
            <CwRoundButton icon="view" aria-label="查看" />
          </CwTooltip>
          <CwTooltip content="編輯">
            <CwRoundButton icon="edit" aria-label="編輯" />
          </CwTooltip>
          <CwTooltip content="刪除">
            <CwRoundButton icon="delete" destructive aria-label="刪除" />
          </CwTooltip>
        </div>
      ),
    },
  ];

  // CwRoundButton 範例表格
  const roundButtonTableData = [
    { id: 1, name: "張三", email: "zhang@example.com" },
    { id: 2, name: "李四", email: "li@example.com" },
  ];

  const roundButtonTableColumns: CwTableColumn[] = [
    { key: 'name', title: '姓名', width: '120px' },
    { key: 'email', title: 'Email' }, // 不設定 width，自動填滿
    {
      key: 'action',
      title: '操作',
      width: '140px',
      align: 'center' as const,
      render: () => (
        <div className="flex gap-2 justify-center">
          <CwTooltip content="檢視">
            <CwRoundButton icon="view" aria-label="查看" />
          </CwTooltip>
          <CwTooltip content="編輯">
            <CwRoundButton icon="edit" aria-label="編輯" />
          </CwTooltip>
          <CwTooltip content="刪除">
            <CwRoundButton icon="delete" destructive aria-label="刪除" />
          </CwTooltip>
        </div>
      ),
    },
  ];

  // 綜合範例表格數據與欄位
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const comprehensiveTableData = [
    { id: 1, name: "張三 1", email: "zhang1@example.com", status: "啟用" },
    { id: 2, name: "張三 2", email: "zhang2@example.com", status: "啟用" },
    { id: 3, name: "張三 3", email: "zhang3@example.com", status: "啟用" },
  ];

  const comprehensiveTableColumns: CwTableColumn[] = [
    {
      key: 'select',
      title: '',
      width: '60px',
      render: (_, record) => (
        <CwCheckbox 
          checked={selectedRows.includes(record.id)} 
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, record.id]);
            } else {
              setSelectedRows(selectedRows.filter(id => id !== record.id));
            }
          }} 
        />
      ),
    },
    { key: 'name', title: '姓名', width: '120px' },
    { key: 'email', title: 'Email' }, // 不設定 width，自動填滿
    {
      key: 'status',
      title: '狀態',
      width: '100px',
      render: (value) => <CwTag label={value} closable={false} />,
    },
    {
      key: 'action',
      title: '操作',
      width: '140px',
      align: 'center' as const,
      render: () => (
        <div className="flex gap-2 justify-center">
          <CwTooltip content="編輯">
            <CwRoundButton icon="edit" aria-label="編輯" />
          </CwTooltip>
          <CwTooltip content="刪除">
            <CwRoundButton icon="delete" destructive aria-label="刪除" />
          </CwTooltip>
        </div>
      ),
    },
  ];

  // Handle parent checkbox change
  const handleParentChange = (checked: boolean) => {
    setParentChecked(checked);
    setParentIndeterminate(false);
    const newChildren = {
      child1: checked,
      child2: checked,
      child3: checked,
    };
    setChildren(newChildren);
  };

  // Handle child checkbox change
  const handleChildChange = (key: keyof typeof children, checked: boolean) => {
    const newChildren = { ...children, [key]: checked };
    setChildren(newChildren);
    
    const checkedCount = Object.values(newChildren).filter(Boolean).length;
    const totalCount = Object.keys(newChildren).length;
    
    if (checkedCount === 0) {
      setParentChecked(false);
      setParentIndeterminate(false);
    } else if (checkedCount === totalCount) {
      setParentChecked(true);
      setParentIndeterminate(false);
    } else {
      setParentChecked(false);
      setParentIndeterminate(true);
    }
  };

  const handleAddTag = (value: string) => {
    if (value && !selectedTags.includes(value)) {
      setSelectedTags([...selectedTags, value]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 回到頂部功能
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    // 找到最近的可滾動父元素並滾動到頂部
    const scrollableParent = document.querySelector('main');
    if (scrollableParent) {
      scrollableParent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 監聽滾動事件，決定是否顯示「回到頂部」按鈕
  useEffect(() => {
    // 找到最近的可滾動父元素（main）
    const scrollableParent = document.querySelector('main');
    
    if (!scrollableParent) return;

    const handleScroll = () => {
      if (scrollableParent.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    scrollableParent.addEventListener('scroll', handleScroll);
    return () => scrollableParent.removeEventListener('scroll', handleScroll);
  }, []);

  const componentSections = [
    { id: 'colors', label: '顏色規範' },
    { id: 'cwbutton', label: 'CwButton' },
    { id: 'cwroundbutton', label: 'CwRoundButton' },
    { id: 'cwtextbutton', label: 'CwTextButton' },
    { id: 'cwinput', label: 'CwInput' },
    { id: 'cwtextarea', label: 'CwTextarea' },
    { id: 'cwselect', label: 'CwSelect' },
    { id: 'cwcheckbox', label: 'CwCheckbox' },
    { id: 'cwradio', label: 'CwRadio' },
    { id: 'cwtag', label: 'CwTag' },
    { id: 'cwpagination', label: 'CwPagination' },
    { id: 'cwtable', label: 'CwTable' },
    { id: 'cwtitle', label: 'CwTitle & CwBreadcrumbs' },
    { id: 'cwdatepicker', label: 'CwDatePicker' },
    { id: 'cwpopup', label: 'CwPopup' },
    { id: 'cwswitch', label: 'CwSwitch' },
    { id: 'cwsorttable', label: 'CwSortTable' },
    { id: 'cwtableset', label: 'CwTableSet' },
    { id: 'cwtoast', label: 'CwToast' },
    { id: 'cwtooltip', label: 'CwTooltip' },
    { id: 'cwdrawer', label: 'CwDrawer' },
    { id: 'cwtab', label: 'CwTab' },
    { id: 'cwheader', label: 'CwHeader' },
    { id: 'cwfooter', label: 'CwFooter' },
    { id: 'cwsidemenu', label: 'CwSidemenu' },
    { id: 'comprehensive', label: '綜合應用範例' },
  ];

  return (
    <div className="px-[30px] py-[20px] bg-background min-h-full">
      {/* 頁面標題 */}
      <CwTitle title="元件demo" breadcrumbs={breadcrumbs} />

      {/* 快速導航區域 */}
      <div className="mt-6 space-y-3">
        <h4>快速導航</h4>
        <div className="flex flex-wrap gap-2">
          {componentSections.map((section) => (
            <CwButton
              key={section.id}
              variant="primary"
              appearance="outlined"
              size="small"
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </CwButton>
          ))}
        </div>
      </div>

      {/* 分隔線 */}
      <hr className="border-t border-border/30 mt-6" />

      {/* 內容區域 */}
      <div className="space-y-10 mt-8">
        {/* 顏色規範區塊 */}
        <section id="colors" className="space-y-6">
          <div>
            <h3 className="mb-2">顏色規範</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              系統設計顏色規範，所有元件都應使用這些標準顏色確保一致性
            </p>
          </div>

          <ColorPalette />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwButton 區塊 */}
        <section id="cwbutton" className="space-y-6">
          <div>
            <h3 className="mb-2">CwButton 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              按鈕元件，支援多種變體、尺寸和狀態
            </p>
          </div>

          <div className="space-y-6">
            {/* Primary Buttons */}
            <div className="space-y-3">
              <h4>Primary（主要按鈕）</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <CwButton variant="primary">實心按鈕</CwButton>
                <CwButton variant="primary" leftIcon={<PlusIcon />}>新增</CwButton>
                <CwButton 
                  variant="primary" 
                  onClick={handleButtonClick}
                >
                  {buttonLoading ? "載入中..." : "點擊載入"}
                </CwButton>
                <CwButton variant="primary" disabled>禁用</CwButton>
              </div>
            </div>

            {/* Primary Outline */}
            <div className="space-y-3">
              <h4>Primary Outline（次要按鈕）</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <CwButton variant="primary" appearance="outlined">外框按鈕</CwButton>
                <CwButton variant="primary" appearance="outlined" leftIcon={<Filter />}>篩選</CwButton>
                <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw />}>重設</CwButton>
                <CwButton variant="primary" appearance="outlined" size="large">Large 按鈕</CwButton>
                <CwButton variant="primary" appearance="outlined" size="small">Small</CwButton>
                <CwButton variant="primary" appearance="outlined" disabled>禁用</CwButton>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div className="space-y-3">
              <h4>Secondary（輔助按鈕）</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <CwButton variant="secondary">實心按鈕</CwButton>
                <CwButton variant="secondary" leftIcon={<Download />}>下載</CwButton>
                <CwButton variant="secondary" appearance="outlined">外框按鈕</CwButton>
                <CwButton variant="secondary" appearance="outlined" leftIcon={<Upload />}>上傳</CwButton>
                <CwButton variant="secondary" disabled>禁用</CwButton>
              </div>
            </div>

            {/* Info & Destructive */}
            <div className="space-y-3">
              <h4>Info & Destructive（資訊與刪除按鈕）</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <CwButton variant="info">資訊按鈕</CwButton>
                <CwButton variant="info" appearance="outlined">資訊外框</CwButton>
                <CwButton variant="destructive" leftIcon={<Trash2 />}>刪除</CwButton>
                <CwButton variant="destructive" appearance="outlined">刪除外框</CwButton>
                <CwButton variant="destructive" disabled>禁用刪除</CwButton>
              </div>
            </div>

            {/* Button Group Example */}
            <div className="space-y-3">
              <h4>按鈕群組範例（由左至右：取消 &gt; outline &gt; 實心 &gt; 刪除）</h4>
              <div className="flex gap-3">
                <CwButton variant="primary" appearance="outlined">取消</CwButton>
                <CwButton variant="primary" appearance="outlined" leftIcon={<Copy />}>複製</CwButton>
                <CwButton variant="primary" leftIcon={<PlusIcon />}>儲存</CwButton>
                <CwButton variant="destructive" leftIcon={<Trash2 />}>刪除</CwButton>
              </div>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwRoundButton 區塊 */}
        <section id="cwroundbutton" className="space-y-6">
          <div>
            <h3 className="mb-2">CwRoundButton 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              圓形圖示按鈕，適合表格內的操作按鈕。<span className="text-primary">必須搭配 CwTooltip 使用</span>，為使用者提供功能說明。
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4>各種圖標與狀態（範例僅作展示）</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <CwTooltip content="編輯">
                  <CwRoundButton icon="edit" />
                </CwTooltip>
                <CwTooltip content="檢視">
                  <CwRoundButton icon="view" />
                </CwTooltip>
                <CwTooltip content="搜尋">
                  <CwRoundButton icon="search" />
                </CwTooltip>
                <CwTooltip content="重新整理">
                  <CwRoundButton icon="refresh" />
                </CwTooltip>
                <CwTooltip content="刪除">
                  <CwRoundButton icon="delete" destructive />
                </CwTooltip>
                <CwTooltip content="編輯（已禁用）">
                  <CwRoundButton icon="edit" disabled />
                </CwTooltip>
              </div>
            </div>

            <div className="space-y-3">
              <h4>表格內使用範例</h4>
              <CwTable
                columns={roundButtonTableColumns}
                dataSource={roundButtonTableData}
                rowKey="id"
              />
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTextButton 區塊 */}
        <section id="cwtextbutton" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTextButton 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              文字按鈕元件，用於表格操作欄位，提供清楚的文字說明配合圖標
            </p>
          </div>
          <CwTextButtonExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwInput 區塊 */}
        <section id="cwinput" className="space-y-6">
          <div>
            <h3 className="mb-2">CwInput 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              輸入框元件，支援標籤、圖示、錯誤狀態和多選功能
            </p>
          </div>

          <CwInputExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTextarea 區塊 */}
        <section id="cwtextarea" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTextarea 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              文字區域輸入框元件，適合長文輸入並支援自動換行
            </p>
          </div>

          <CwTextareaExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwSelect 區塊 */}
        <section id="cwselect" className="space-y-6">
          <div>
            <h3 className="mb-2">CwSelect 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              下拉選擇元件，支援單選、多選、搜尋和清除功能
            </p>
          </div>

          <CwSelectExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwCheckbox 區塊 */}
        <section id="cwcheckbox" className="space-y-6">
          <div>
            <h3 className="mb-2">CwCheckbox 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              多選框元件，支援基本勾選、部分選擇、禁用和錯誤狀態
            </p>
          </div>

          <div className="space-y-6">
            {/* Basic States */}
            <div className="space-y-3">
              <h4>基本狀態</h4>
              <div className="flex flex-wrap gap-6">
                <CwCheckbox 
                  label="基本勾選" 
                  checked={basicChecked}
                  onChange={(e) => setBasicChecked(e.target.checked)}
                />
                <CwCheckbox label="已勾選" checked={true} onChange={() => {}} />
                <CwCheckbox label="未勾選" checked={false} onChange={() => {}} />
                <CwCheckbox label="禁用（未勾選）" disabled checked={false} />
                <CwCheckbox label="禁用（已勾選）" disabled checked={true} />
              </div>
            </div>

            {/* Indeterminate State */}
            <div className="space-y-3">
              <h4>部分選擇狀態（層級結構）</h4>
              <div className="space-y-2">
                <CwCheckbox 
                  label="全選" 
                  checked={parentChecked}
                  indeterminate={parentIndeterminate}
                  onChange={(e) => handleParentChange(e.target.checked)}
                />
                <div className="ml-8 space-y-2">
                  <CwCheckbox 
                    label="選項 1" 
                    checked={children.child1}
                    onChange={(e) => handleChildChange('child1', e.target.checked)}
                  />
                  <CwCheckbox 
                    label="選項 2" 
                    checked={children.child2}
                    onChange={(e) => handleChildChange('child2', e.target.checked)}
                  />
                  <CwCheckbox 
                    label="選項 3" 
                    checked={children.child3}
                    onChange={(e) => handleChildChange('child3', e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Error State */}
            <div className="space-y-3">
              <h4>錯誤狀態</h4>
              <CwCheckbox 
                label="我已閱讀並同意服務條款" 
                checked={errorChecked}
                onChange={(e) => setErrorChecked(e.target.checked)}
                error={!errorChecked ? "請勾選以繼續" : ""}
              />
            </div>

            {/* Without Label */}
            <div className="space-y-3">
              <h4>無標籤</h4>
              <div className="flex gap-4">
                <CwCheckbox checked={false} onChange={() => {}} />
                <CwCheckbox checked={true} onChange={() => {}} />
                <CwCheckbox indeterminate onChange={() => {}} />
                <CwCheckbox disabled checked={false} />
                <CwCheckbox disabled checked={true} />
              </div>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwRadio 區塊 */}
        <section id="cwradio" className="space-y-6">
          <div>
            <h3 className="mb-2">CwRadio 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              單選框元件，用於在一組選項中僅允許選擇一個項目
            </p>
          </div>

          <div className="space-y-6">
            {/* Basic Radio Group */}
            <div className="space-y-3">
              <h4>基本單選組（2-5 個選項）</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <CwRadio 
                  label="選項 1" 
                  name="basic" 
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <CwRadio 
                  label="選項 2" 
                  name="basic" 
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <CwRadio 
                  label="選項 3" 
                  name="basic" 
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>

            {/* States */}
            <div className="space-y-3">
              <h4>各種狀態</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <CwRadio label="未選中" name="states" value="unchecked" />
                <CwRadio label="已選中" name="states" value="checked" checked={true} onChange={() => {}} />
                <CwRadio label="禁用（未選中）" name="states-disabled" disabled />
                <CwRadio label="禁用（已選中）" name="states-disabled2" checked disabled onChange={() => {}} />
              </div>
            </div>

            {/* Error State */}
            <div className="space-y-3">
              <h4>錯誤狀態</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <CwRadio 
                  label="結清" 
                  name="payment-error" 
                  value="settle"
                  error="這是錯誤訊息"
                />
              </div>
            </div>

            {/* Real World Example */}
            <div className="space-y-3">
              <h4>實際應用範例：付款方式選擇</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <CwRadio 
                  label="信用卡" 
                  name="payment" 
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CwRadio 
                  label="銀行轉帳" 
                  name="payment" 
                  value="bank-transfer"
                  checked={paymentMethod === "bank-transfer"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CwRadio 
                  label="貨到付款" 
                  name="payment" 
                  value="cash-on-delivery"
                  checked={paymentMethod === "cash-on-delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CwRadio 
                  label="電子錢包" 
                  name="payment" 
                  value="e-wallet"
                  checked={paymentMethod === "e-wallet"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              {paymentMethod && (
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  已選擇：{paymentMethod === "credit-card" ? "信用卡" : 
                           paymentMethod === "bank-transfer" ? "銀行轉帳" : 
                           paymentMethod === "cash-on-delivery" ? "貨到付款" : "電子錢包"}
                </p>
              )}
            </div>

            {/* Without Label */}
            <div className="space-y-3">
              <h4>無標籤</h4>
              <div className="flex gap-4">
                <CwRadio name="no-label" value="1" />
                <CwRadio name="no-label" value="2" checked onChange={() => {}} />
                <CwRadio name="no-label-disabled" disabled />
                <CwRadio name="no-label-disabled2" checked disabled onChange={() => {}} />
              </div>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTag 區塊 */}
        <section id="cwtag" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTag 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              標籤元件，用於多選輸入框、篩選條件顯示等場景
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4>基本標籤</h4>
              <div className="flex flex-wrap gap-2">
                <CwTag label="標籤 1" closable={false} />
                <CwTag label="標籤 2" closable={false} />
                <CwTag label="標籤 3" closable={false} />
              </div>
            </div>

            <div className="space-y-3">
              <h4>可關閉標籤</h4>
              <div className="flex flex-wrap gap-2">
                <CwTag label="張三" onClose={() => console.log("關閉張三")} />
                <CwTag label="李四" onClose={() => console.log("關閉李四")} />
                <CwTag label="王五" onClose={() => console.log("關閉王五")} />
                <CwTag label="趙六" onClose={() => console.log("關閉趙六")} />
              </div>
            </div>

            <div className="space-y-3">
              <h4>不同長度的標籤</h4>
              <div className="flex flex-wrap gap-2">
                <CwTag label="短" closable={false} />
                <CwTag label="中等長度" closable={false} />
                <CwTag label="這是一個比較長的標籤文字" closable={false} />
              </div>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwPagination 區塊 */}
        <section id="cwpagination" className="space-y-6">
          <div>
            <h3 className="mb-2">CwPagination 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              分頁元件，顯示當前頁面範圍和總筆數
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4>基本分頁</h4>
              <CwPagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </div>

            <div className="space-y-3">
              <h4>不同頁面大小</h4>
              <div className="space-y-4">
                <div>
                  <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>每頁 5 筆</p>
                  <CwPagination
                    currentPage={1}
                    pageSize={5}
                    totalItems={totalItems}
                    onPageChange={() => {}}
                    onPageSizeChange={() => {}}
                  />
                </div>
                <div>
                  <p className="mb-2" style={{ fontSize: 'var(--text-sm)' }}>每頁 20 筆</p>
                  <CwPagination
                    currentPage={1}
                    pageSize={20}
                    totalItems={totalItems}
                    onPageChange={() => {}}
                    onPageSizeChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTable 區塊 */}
        <section id="cwtable" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTable 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              表格元件，支援排序、自定義渲染、空狀態等功能
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4>基本表格（支援排序）</h4>
              <CwTable
                columns={tableColumns}
                dataSource={tableData}
                rowKey="id"
                sortKey={tableSortKey}
                sortDirection={tableSortDirection}
                onSort={(key, direction) => {
                  setTableSortKey(key);
                  setTableSortDirection(direction);
                }}
              />
            </div>

            <div className="space-y-3">
              <h4>空狀態</h4>
              <CwTable
                columns={tableColumns}
                dataSource={[]}
                emptyText="目前沒有任何資料"
              />
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTitle & CwBreadcrumbs 區塊 */}
        <section id="cwtitle" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTitle & CwBreadcrumbs 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              頁面標題與麵包屑導航元件
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4>基本標題</h4>
              <CwTitle title="頁面標題" />
            </div>

            <div className="space-y-3">
              <h4>帶麵包屑的標題</h4>
              <CwTitle 
                title="會員查詢" 
                breadcrumbs={[
                  { label: "首頁", href: "/" },
                  { label: "會員管理", href: "/member" },
                  { label: "會員查詢", href: "/member/search" }
                ]} 
              />
            </div>

            <div className="space-y-3">
              <h4>多層級麵包屑</h4>
              <CwTitle 
                title="編輯個人資料" 
                breadcrumbs={[
                  { label: "首頁", href: "/" },
                  { label: "會員管理", href: "/member" },
                  { label: "會員列表", href: "/member/list" },
                  { label: "會員詳情", href: "/member/detail" },
                  { label: "編輯個人資料", href: "/member/edit" }
                ]} 
              />
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwDatePicker & CwDateRangePicker 區塊 */}
        <section id="cwdatepicker">
          <CwDatePickerExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwPopup 塊 */}
        <section className="space-y-6">
          <div>
            <h3 className="mb-2">CwPopup 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              彈出視窗元件，用於確認操作、顯示資訊或收集使用者回饋
            </p>
          </div>

          <CwPopupExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwSwitch 區塊 */}
        <section id="cwswitch" className="space-y-6">
          <div>
            <h3 className="mb-2">CwSwitch 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              開關元件，用於可回復的二元狀態切換
            </p>
          </div>

          <CwSwitchExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwSortTable 區塊 */}
        <section id="cwsorttable" className="space-y-6">
          <div>
            <h3 className="mb-2">CwSortTable 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              帶排序功能的表格元件，點擊欄位標頭可進行升序或降序排列
            </p>
          </div>

          <CwSortTableExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTableSet 區塊 */}
        <section id="cwtableset" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTableSet 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              整合標題、搜尋、表格和分頁的組合元件，提供完整的資料展示方案
            </p>
          </div>

          <CwTableSetExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwToast 區塊 */}
        <section id="cwtoast" className="space-y-6">
          <div>
            <h3 className="mb-2">CwToast 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              短暫出現的訊息通知元件，用於單句、簡潔的操作結果提示
            </p>
          </div>

          <CwToastExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTooltip 區塊 */}
        <section id="cwtooltip" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTooltip 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              用於補充資訊的提示元件，滑鼠 hover 後顯示
            </p>
          </div>

          <CwTooltipExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwDrawer 區塊 */}
        <section id="cwdrawer" className="space-y-6">
          <div>
            <h3 className="mb-2">CwDrawer 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              從畫面右側滑出的抽屜元件，用於呈現補充內容或可編輯內容
            </p>
          </div>

          <CwDrawerExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwTab 區塊 */}
        <section id="cwtab" className="space-y-6">
          <div>
            <h3 className="mb-2">CwTab 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              標籤頁元件，用於在同一頁面中切換不同內容區塊的標籤導航
            </p>
          </div>

          <CwTabExamples />
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwHeader 區塊 */}
        <section id="cwheader" className="space-y-6">
          <div>
            <h3 className="mb-2">CwHeader 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              頁面頂部元件，顯示系統名稱、登入者資訊、通知和選單按鈕
            </p>
          </div>

          <div className="p-6 bg-[#e6f7ff] border border-[#01579b] rounded-[var(--radius)]">
            <p className="text-[#01579b]" style={{ fontSize: 'var(--text-base)' }}>
              ℹ️ CwHeader 元件已在頁面頂部實際運行中，您可以透過點擊選單按鈕、通知按鈕等來測試其功能。
              為避免頁面佈局衝突，此處不額外展示示範元件。
            </p>
            <div className="mt-4 space-y-2">
              <p style={{ fontSize: 'var(--text-base)' }}><strong>主要特性：</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>寬度 100%，高度固定 60px</li>
                <li>綠色背景（#7eaa82），帶陰影效果</li>
                <li>左側：選單按鈕 + 系統名稱</li>
                <li>右側：通知按鈕（可顯示紅點）+ 會員圖標 + 使用者名稱</li>
                <li>所有按鈕都有 hover 效果</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwFooter 區塊 */}
        <section id="cwfooter" className="space-y-6">
          <div>
            <h3 className="mb-2">CwFooter 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              頁面底部元件，顯示版權資訊與維護單位
            </p>
          </div>

          <div className="p-6 bg-[#e6f7ff] border border-[#01579b] rounded-[var(--radius)]">
            <p className="text-[#01579b]" style={{ fontSize: 'var(--text-base)' }}>
              ℹ️ CwFooter 元件已在頁面底部實際運行中，您可以向下捲動查看。
              為避免頁面佈局衝突，此處不額外展示示範元件。
            </p>
            <div className="mt-4 space-y-2">
              <p style={{ fontSize: 'var(--text-base)' }}><strong>主要特性：</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>寬度 100%，高度自動適應內容</li>
                <li>白色背景，帶上方陰影效果</li>
                <li>居中顯示版權資訊文字</li>
                <li>文字使用 Noto Sans TC，14px，單行顯示</li>
                <li>固定出現在所有頁面的底部</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* CwSidemenu 區塊 */}
        <section id="cwsidemenu" className="space-y-6">
          <div>
            <h3 className="mb-2">CwSidemenu 元件</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              側邊選單元件，支援最多 2 層結構的導航選單
            </p>
          </div>

          <div className="p-6 bg-[#e6f7ff] border border-[#01579b] rounded-[var(--radius)]">
            <p className="text-[#01579b]" style={{ fontSize: 'var(--text-base)' }}>
              ℹ️ CwSidemenu 元件已在頁面左側實際運行中，您可以透過點擊不同選單項目來測試其功能。
              為避免頁面佈局衝突，此處不額外展示示範元件。
            </p>
            <div className="mt-4 space-y-2">
              <p style={{ fontSize: 'var(--text-base)' }}><strong>主要特性：</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>支援最多 2 層結構</li>
                <li>第一層必須有圖標，第二層不需要圖標</li>
                <li>支援展開/收合功能（點擊左上角選單按鈕）</li>
                <li>收合模式下 hover 展開懸浮選單</li>
                <li>當前選中項目會有背景色標示</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 分隔線 */}
        <hr className="border-t border-border/30" />

        {/* 綜合應用範例 */}
        <section id="comprehensive" className="space-y-6">
          <div>
            <h3 className="mb-2">綜合應用範例</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              展示多個元件組合使用的實際場景
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4>搜尋表單範例</h4>
              
              {/* 搜尋表單 */}
              <div className="grid grid-cols-2 gap-4">
                <CwInput
                  label="姓名或 Email"
                  placeholder="請輸入姓名或 Email"
                  icon={<SearchIcon />}
                />
                <CwInput
                  label="電話"
                  placeholder="請輸入電話"
                />
              </div>

              <CwInputWithTags
                label="選擇社工"
                placeholder="請選擇社工"
                tags={["社工A", "社工B"]}
                onAddTag={() => {}}
                onRemoveTag={() => {}}
                onClearAll={() => {}}
              />

              <div className="space-y-2">
                <label style={{ fontSize: 'var(--text-base)' }}>權限選擇</label>
                <div className="flex gap-4">
                  <CwCheckbox label="查看權限" checked={true} onChange={() => {}} />
                  <CwCheckbox label="編輯權限" checked={false} onChange={() => {}} />
                  <CwCheckbox label="刪除權限" checked={false} onChange={() => {}} />
                </div>
              </div>

              {/* 按鈕組 */}
              <div className="flex gap-3 pt-4">
                <CwButton variant="primary" appearance="outlined" leftIcon={<RotateCcw />}>重設</CwButton>
                <CwButton variant="primary" leftIcon={<SearchIcon />}>搜尋</CwButton>
              </div>
            </div>

            <hr className="border-border" />

            {/* 結果表格 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4>搜尋結果</h4>
                <CwButton variant="primary" leftIcon={<PlusIcon />}>新增會員</CwButton>
              </div>

              <CwTable
                columns={comprehensiveTableColumns}
                dataSource={comprehensiveTableData}
                rowKey="id"
              />

              <CwPagination
                currentPage={1}
                pageSize={10}
                totalItems={45}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
              />
            </div>
          </div>
        </section>

        {/* 設計規範說明 */}
        <section className="space-y-6">
          <div>
            <h3 className="mb-2">設計規範重點</h3>
          </div>

          <div className="bg-primary/5 p-6 rounded-[var(--radius-card)] border border-primary/20">
            <div className="space-y-4">
              <div>
                <h4 className="text-primary mb-2">🎨 顏色系統</h4>
                <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
                  <li>• Primary: #01579B (主要操作)</li>
                  <li>• Secondary: #57A6BD (輔助操作)</li>
                  <li>• Destructive: #C00000 (刪除/高風險)</li>
                  <li>• Border: #7C808C (邊框)</li>
                  <li>• Background: #FFFFFF (背景)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-primary mb-2">📏 尺寸規範</h4>
                <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
                  <li>• 內容區域左右邊距：30px</li>
                  <li>• 內容區域上下邊距：20px</li>
                  <li>• 元件間距：通常使用 gap-3 (12px) 或 gap-4 (16px)</li>
                  <li>• 區塊間距：通常使用 space-y-6 (24px)</li>
                  <li>• 圓角：按鈕 4px，卡片 6px</li>
                </ul>
              </div>

              <div>
                <h4 className="text-primary mb-2">🔘 按鈕使用原則</h4>
                <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
                  <li>• 一個頁面中最主要的按鈕使用 Primary 實心</li>
                  <li>• 其餘操作按鈕使用 Primary outline</li>
                  <li>• 表格內操作使用圓形按鈕 (CwRoundButton)，<span className="text-destructive">必須搭配 CwTooltip</span></li>
                  <li>• 按鈕組排列：取消 &gt; outline &gt; 實心 &gt; 刪除</li>
                  <li>• 多個按鈕群組時加上 icon 以保持層級感</li>
                </ul>
              </div>

              <div>
                <h4 className="text-primary mb-2">📝 表單規範</h4>
                <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
                  <li>• 必填欄位需顯示紅色星號</li>
                  <li>• 錯誤訊息顯示在元件下方，使用紅色文字</li>
                  <li>• 輸入框需有清楚的 placeholder 提示</li>
                  <li>• 多選場景使用 Checkbox（2-10 個選項），單選使用 Radio（2-5 個選項）</li>
                  <li>• 禁止將 Checkbox 和 Radio 混用在同一組問題中</li>
                  <li>• Radio 選項超過 5 個時應改用 Select 或其他元件</li>
                </ul>
              </div>

              <div>
                <h4 className="text-primary mb-2">✅ 狀態管理</h4>
                <ul className="space-y-1 ml-4" style={{ fontSize: 'var(--text-base)' }}>
                  <li>• 每個狀態需有明確的視覺回饋</li>
                  <li>• Loading 狀態需禁止其他操作</li>
                  <li>• Disabled 狀態呈現灰階且不可點擊</li>
                  <li>• 錯誤狀態使用紅色 (#C00000)</li>
                  <li>• 成功狀態使用綠色 (#568B53)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 回到頂部按鈕 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-10 size-12 rounded-full bg-[#01579b] text-white flex items-center justify-center hover:bg-[#0078d4] transition-colors shadow-lg z-[1500]"
          aria-label="回到頂部"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
}

export default ComponentDemo;