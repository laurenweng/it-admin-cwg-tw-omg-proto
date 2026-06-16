# 欄位規則

此文件記錄各頁面欄位的顯示、預設值、可編輯性及驗證規則。
由 Claude Code 在每次欄位規則修改後自動更新（透過 `record-field-rule` skill）。

---

## 建立 / 編輯 / 查詢 訂單

> **欄位規則套用範疇：訂單查詢、新增訂單、編輯訂單三個頁面共用同一套欄位規則。**
> - select 選項與 value 格式在三個頁面保持一致
> - 必填驗證只適用於「新增」與「編輯」；查詢頁無必填
> - 查詢頁部分欄位有特殊 popup 行為，另行說明
>
> 頁面路徑：`NewPMOrderManagement`（查詢）/ `CreatePMOrder`（新增）/ `PMOrderDetail → OMGOrderHeader`（編輯）

### 法人（legalEntity）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `legalEntity`（建立/編輯）；`NewPMOrderManagement.tsx` → `adv_建單法人`（查詢篩選） |
| 建立模式 | 下拉選單，顯示全部 4 個 BU 選項，可修改 |
| 編輯模式 | 唯讀，建立後不可修改 |
| 查詢篩選 | 下拉選單，顯示全部 4 個 BU 選項，可清除（非必填） |
| 後端值 | 數字字串：`'81'`、`'82'`、`'88'`、`'110'` |
| 前端顯示 | 中文：天下 / 康健 / 親子 / 親子學 |
| 預設值邏輯 | 建立模式：依當前使用者持有的 BU，取優先順序最高者作為預設值。優先順序：天下（81）> 康健（88）> 親子（82）> 親子學（110）。查詢篩選與編輯：無預設值 |
| 驗證規則 | 必填（建立模式）；查詢篩選可留空 |
| 備註 | 選項不受使用者身份限制，查詢/建單/改單皆顯示全部 4 個選項。僅預設值邏輯依使用者 BU 決定（`getDefaultBU(mockCurrentUserBUs)`，上線後改從登入 context 取得）。 |

### 訂單編號（orderNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `orderNumber` |
| 建立模式 | 唯讀，顯示空白（訂單建立後由後端自動產生） |
| 編輯模式 | 唯讀，顯示後端給的編號，不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 備註 | 使用 `ReadField`，所有模式皆為 `disabled readOnly`，不需任何程式碼條件判斷。 |

### 會員帳號（memberAccount）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `memberAccount` |
| 建立模式 | 唯讀（`ReadField required`），系統自動帶入登入會員帳號，不可手動輸入 |
| 編輯模式 | 唯讀，建立後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 建立模式：從登入 session 取得（mock 為 `'member001@cw.com.tw'`） |
| 驗證規則 | 必填（建立模式） |
| 備註 | 使用 `ReadField required`，所有模式皆為 `disabled readOnly`；必填星號與 error 狀態由 `ReadField` 的 `required` prop 控制。 |

### 退訂單單號（cancelOrderNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `cancelOrderNumber` |
| 建立模式 | 文字輸入，**僅當付款方式 = 互轉（`paymentMethod === '7'`）時才可輸入**；其他付款方式下為 disabled |
| 編輯模式 | 同建立模式（依付款方式條件決定是否可編輯） |
| 查詢/唯讀模式 | 唯讀 |
| 自動帶入 | 輸入並失焦（onBlur）後，系統自動帶入以下欄位（由 API 查詢退訂單資料）：來源系統（`sourceSystem`）、來源單號（`sourceNumber`）、發票客戶完整資訊（`invoiceCustomerCode`/`Name`/`Recipient`/`Address`）、付款客戶完整資訊（`paymentCustomerCode`/`Name`/`Address`）、訂單客戶完整資訊（`orderCustomerCode`/`Name`） |
| 備註 | 「互轉單」判斷依據為 `paymentMethod === '7'`。目前 mock 以固定資料帶入，上線後改為 API 查詢。 |

### 客戶給單日（customerGiveDate）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `customerGiveDate` |
| 建立模式 | 日期選擇器（`DateField`），選填，自行輸入，外部訂單客戶提供的下單日期 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`，建單後仍可編輯） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |

### 流程單號（processNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `processNumber` |
| 建立模式 | 文字輸入（`TextField`），選填，自行輸入，行銷平台轉單號、流程單或經銷商單號 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`，建單後仍可編輯） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |

### 來源單號（sourceNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `sourceNumber` |
| 建立模式 | 文字輸入（`TextField`），選填，自行輸入，外部系統的原始訂單編號 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`，建單後仍可編輯） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 備註 | `handleCancelOrderLookup`（互轉單查詢）會自動帶入此欄位（`SRC-${cancelOrderNo}`），使用者仍可手動修改。 |

### 訂單日期（orderDate）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `orderDate` |
| 建立模式 | 日期選擇器（CwDatePicker），可修改，預設帶入系統當下日期 |
| 編輯模式 | 唯讀，建立後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 字串，格式 `YYYY-MM-DD`（存 UTC，onChange 以 `toISOString().slice(0,10)` 轉換） |
| 前端顯示 | 同後端值（透過 CwDatePicker 顯示） |
| 預設值邏輯 | 建立模式：以本地端當下日期（`new Date()` 取年月日）組成 `YYYY-MM-DD` 字串，寫入 `useState` 初始值 |
| 驗證規則 | 必填（建立模式）；查詢篩選可留空 |
| 備註 | `DateField` 元件加 `readOnlyInEdit` prop；在 edit mode 會 fall-through 至 `CwInput disabled readOnly`。 |

### OMG 訂單類型（omgOrderType）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `omgOrderType`（建立/編輯）；`NewPMOrderManagement.tsx` → `'OMG訂單類型'`（查詢篩選）；列表欄位 `omgOrderType`（常駐顯示） |
| 建立模式 | 下拉選單，可修改，預設帶入「訂單」 |
| 編輯模式 | 唯讀，建立後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 字串，目前僅 `'訂單'` |
| 前端顯示 | 同後端值 |
| 預設值邏輯 | `emptyOrderHeader.omgOrderType: '訂單'`（固定預設） |
| 驗證規則 | 必填（建立模式）；查詢篩選可留空 |
| 備註 | 選項定義在 `OMG_ORDER_TYPE_OPTIONS`（兩個檔案各一份，需保持同步）。`OMGOrderHeader.tsx` 使用 `SelectField` 的 `readOnlyInEdit` prop，edit mode 降級為 `CwInput disabled readOnly`。`UnifiedOrderData` 新增 `omgOrderType?: string` optional 欄位。 |

### 直/間接蒐集（directIndirectCollect）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `directIndirectCollect` |
| 建立模式 | 下拉選單，必填，預設 `'1'`（直接） |
| 編輯模式 | 唯讀，建立後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | `'1'`（直接）、`'2'`（間接） |
| 前端顯示 | `1 直接` / `2 間接` |
| 預設值邏輯 | `emptyOrderHeader.directIndirectCollect: '1'`（固定預設） |
| 驗證規則 | 必填（建立模式） |

### 業務員名（salesperson）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `salesperson`（建立/編輯）；`NewPMOrderManagement.tsx` → `'業務員名稱'`/`'業務員代碼'`（查詢篩選）；列表欄 `salesPerson`（columnFilter 控制） |
| 建立模式 | 文字輸入 + 放大鏡 popup 選擇（`PopupField`），非必填 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 員工編號字串，例：`'001234'` |
| Popup | 顯示員工編號與姓名兩欄，可搜尋員工編號或姓名；選取後 OMGOrderHeader 寫入 `salesperson`（代碼），查詢頁同時填入 `'業務員代碼'` 與 `'業務員名稱'` |
| 查詢篩選顯示 | PopupSearchInput 顯示姓名優先（`searchForm['業務員名稱'] \|\| searchForm['業務員代碼']`） |
| Mock 資料 | `mockEmployees`（5 筆），上線後改為 API 查詢 |

### 行銷追蹤碼（trackingCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `trackingCode` |
| 建立模式 | 文字輸入 + 放大鏡 popup 選擇（`PopupField` + `PopupSearchInput`），非必填 |
| 編輯模式 | 唯讀，建立後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 數字字串代碼，例：`'102'`、`'118'` |
| Popup | 固定遮罩（`fixed inset-0 z-[1200]`），寬 480px，可搜尋代碼或名稱；選取後寫入 `trackingCode` |
| Mock 資料 | `mockTrackingCodes`（17 筆，代碼 102–118），上線後改為 API 查詢 |
| 備註 | 與其他 popup 共用同一 mousedown 關閉邏輯（`trackingCodePopupRef`）。 |

### 通路代碼（channelCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `channelCode`（建立/編輯）；`NewPMOrderManagement.tsx` → `'通路代碼'`（查詢篩選，使用 `SOURCE_CODE_OPTIONS`）；列表欄 `sourceCode`（columnFilter 控制，非常駐） |
| 建立模式 | 下拉選單（可搜尋），必填，無預設值 |
| 編輯模式 | 唯讀，建立後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 英文代碼字串，例：`'IC'`、`'GP'`、`'IAP_ANDROID'` |
| 前端顯示 | 代碼 + 中文說明，例：`IC 天下網路書店` |
| 驗證規則 | 必填（建立模式）；查詢篩選可留空 |
| 備註 | 選項定義在 `OMGOrderHeader.tsx` 的 `CHANNEL_CODE_OPTIONS`（52 筆）；查詢頁使用 `SOURCE_CODE_OPTIONS`（同內容，兩份需保持同步）。選項格式含 `searchValue` 支援代碼與中文同時搜尋。 |

### 同意行銷（agreeMarketing）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `agreeMarketing`（建立/編輯） |
| 建立模式 | 下拉選單，必填，預設 `'1'`（同意） |
| 編輯模式 | 唯讀，建立後不可修改（`mode !== 'edit'` 條件控制） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | `'1'`（同意）、`'2'`（不同意） |
| 前端顯示 | `1 同意` / `2 不同意` |
| 預設值邏輯 | `emptyOrderHeader.agreeMarketing: '1'`（固定預設） |
| 驗證規則 | 必填（建立模式） |
| 備註 | 欄位旁有日期欄 `agreeMarketingDate`，兩個欄位共用同一 readOnlyInEdit 邏輯（`mode !== 'edit'`）。選項只有 1/2，無「A 不確定」。 |

### 同意行銷日期（agreeMarketingDate）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `agreeMarketingDate`，位於同意行銷欄位右側 |
| 建立模式 | 日期選擇器（CwDatePicker），必填，預設帶入系統當下日期，可修改 |
| 編輯模式 | 唯讀，建立後不可修改（`mode !== 'edit'` 條件控制） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 字串，格式 `YYYY-MM-DD` |
| 預設值邏輯 | 建立模式：與 `orderDate` 同樣方式取本地當下日期（`useState` 初始值寫入） |
| 驗證規則 | 必填（建立模式） |
| 備註 | `onChange` 使用本地 `getFullYear/getMonth/getDate` 避免 UTC 偏移。`value` prop 用 `new Date(str + 'T00:00:00')` 顯示預設日期。 |

### 方案代碼（planCode / adv_方案代碼）

| 項目 | 內容 |
|------|------|
| 元件位置 | `NewPMOrderManagement.tsx` → `adv_方案代碼`（查詢篩選）；列表欄 `planCode`（columnFilter 控制） |
| 查詢篩選 | `PopupSearchInput` + Popup 選擇，非必填 |
| Popup 欄位 | 方案代碼、方案描述、方案總金額（與「以方案新增明細」同源） |
| 後端值 | 方案代碼字串，例：`'GC17070009'` |
| 備註 | 選取後同時填入 `adv_方案代碼`（code）與 `方案名稱`（description）。Mock 資料 `mockPromotionCodes` 格式為 `{ code, description, totalAmount }`，與 `CreateOrderItems.tsx` 的 `mockPromoPlans` 同源。**方案代碼已從訂單表頭（`OMGOrderHeader.tsx`）移至訂單明細（`CreateOrderItems.tsx`）處理，表頭 JSX 不再渲染此欄位。** |

### 出貨客戶編號（shipCustomerCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `shipCustomerCode` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），必填；可手打代碼後 Tab 觸發 mock API 查詢，或點放大鏡用 popup 選擇 |
| 編輯模式 | 唯讀，建立後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 必填（建立模式） |
| Tab lookup | 代碼查不到 → error toast 保留輸入，不同步 |
| 連動行為 | 確定後（popup 選取或 blur 查到唯一結果）自動從客戶資料帶出：`shipAddress`（客戶主要地址）、`shipRecipient`、`shipMethod`；同時同步 code + name 至發票客戶、付款客戶、訂單客戶（單向，改其他三組不反向影響出貨） |
| 備註 | 與 `shipCustomerName` 共用同一客戶 popup；選取時呼叫 `syncShipCustomer(customer)`，傳入完整客戶物件。 |

### 出貨地址（shipAddress）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `shipAddress` |
| 建立模式 | `PopupField`（顯示組合地址字串 + 放大鏡），必填，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值 | 選定出貨客戶後，自動帶入該客戶的「主要」地址（`isPrimary: true`） |
| Popup 結構 | 無搜尋框；頂部為「＋ 新增地址」按鈕；列表顯示該客戶所有地址，主要地址標示「主要」tag |
| 新增地址表單 | 在 popup 內展開（無收起按鈕；「＋ 新增地址」只在表單未展開時顯示）：地區（國內/海外）→ 影響國家選項；地區選「國內」時國家自動設為台灣（TW）；郵遞區號/城市/區（國內：select 互相聯動；海外：text input）、州/省（國內 disabled）、地址（text）；確認後組合成字串、加入客戶地址清單（mock）、自動選取帶入 |
| 後端行為（非 proto）| 新增地址時呼叫 API 做地址正規化與格式校驗後儲存 |
| 驗證規則 | 必填（建立模式） |

### 出貨客戶名稱（shipCustomerName）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `shipCustomerName` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），可手打名稱後 Tab 觸發 mock API 查詢，或點放大鏡用 popup 選擇 |
| 編輯模式 | 唯讀，建立後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| Tab lookup | 查無結果 → error toast；同名2筆以上 → warning toast 提示使用放大鏡；查到唯一 → 填入 code → 同步三組 |
| 連動行為 | 與出貨客戶編號同步：確定名稱後同時確定代碼，再連動發票/付款/訂單三組 |
| 備註 | 與 `shipCustomerCode` 共用同一客戶 popup；popup 選取同樣呼叫 `syncShipCustomer`。 |

### 發票客戶編號（invoiceCustomerCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceCustomerCode` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），必填；系統自動帶入出貨客戶，可單獨修改；可手打代碼後 Tab 觸發查詢，或點放大鏡用 popup 選擇 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 必填（建立模式） |
| Tab lookup | 代碼查不到 → error toast 保留輸入；查到 → 同步填入 `invoiceCustomerCode` + `invoiceCustomerName` |
| 連動行為 | 與 `invoiceCustomerName` 雙向連動（修改其中一個會同步另一個）；不反向影響出貨客戶 |
| 備註 | 預設由 `syncShipCustomer` 帶入出貨客戶的 code。使用 `openCustomerPopup('invoiceCustomerCode', 'invoiceCustomerName', '發票客戶')` 共享同一客戶 popup。 |

### 發票客戶名稱（invoiceCustomerName）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceCustomerName` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），可修改；預設由 `syncShipCustomer` 依出貨客戶帶入 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| Tab lookup | 只能輸入「已建立客戶」的姓名；查無結果 → error toast；同名 2 筆以上 → warning toast；查到唯一 → 自動修正 `invoiceCustomerCode`（客編）及發票客戶相關資料 |
| 連動行為 | 與 `invoiceCustomerCode` 雙向連動（改名稱 → 自動修正客編；改客編 → 自動帶出名稱）；不反向影響出貨客戶 |
| 備註 | 與 `invoiceCustomerCode` 共用同一客戶 popup（`openCustomerPopup`）。 |

### 發票收件人（invoiceRecipient）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceRecipient` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），選填，可修改；系統自動帶入 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | `syncShipCustomer` / `syncInvoiceCustomer` 執行時從 `c.recipient` 自動帶入 |
| 驗證規則 | 非必填 |
| Popup 結構 | 與出貨收件人相同：「＋ 新增收件人」按鈕（只在表單未展開時顯示）+ 發票客戶聯絡人清單（姓名 + 電話）；選取後填入 `invoiceRecipient` |
| 新增收件人 | 姓名（必填）+ 電話（選填）；確認後 mock 呼叫 API 新增，加入 `mockCustomerContactBook[invoiceCustomerCode]`，自動填入 |
| 備註 | `invoiceContacts` state 與 `customerContacts`（出貨用）各自獨立；發票客戶切換時同步更新。 |

### 發票地址（invoiceAddress）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceAddress` |
| 建立模式 | `PopupField`（顯示組合地址字串 + 放大鏡），必填，可修改；系統自動帶入 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值 | 選定出貨客戶後，由 `syncShipCustomer` 從發票客戶的主要地址帶入（與出貨客戶同源）；獨立修改發票客戶時，`syncInvoiceCustomer` 重新帶入新客戶的主要地址 |
| Popup 結構 | 與出貨地址相同：「＋ 新增地址」按鈕（只在表單未展開時顯示）+ 客戶地址清單（主要地址標示 tag）；地區/國家/郵遞區號/城市/區/州/省/地址欄位；地區選國內時國家自動設為台灣 |
| 新增地址 | 填完確認後 mock 呼叫 API 新增地址，加入 `mockCustomerAddressBook[invoiceCustomerCode]`，自動帶入 `invoiceAddress` |
| 驗證規則 | 必填（建立模式） |
| 備註 | `invoiceAddresses` state 與 `customerAddresses`（出貨用）各自獨立；發票客戶切換時同步更新。 |

### 發票開立方式（invoiceIssueMethod）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceIssueMethod` |
| 建立模式 | 下拉選單（`SelectField required readOnlyInEdit`），必填，系統自動帶入，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | `'N'`（一般開立）、`'0'`（不產生）、`'3'`（隨貨產生）、`'4'`（月結淨額）、`'5'`（月結全額）、`'6'`（電子發票） |
| 預設值邏輯 | 1. 依發票客戶主檔的「開立發票方式」（`c.defaultInvoiceMethod`）帶入，於 `syncShipCustomer` / `syncInvoiceCustomer` 時設定。<br>2. 若同時滿足「付款方式 ＝ 互轉（`paymentMethod === '7'`）」且「原訂單已開立發票（`originalOrderHasInvoice === true`）」，強制覆寫為 `'0'`（不產生）。 |
| 驗證規則 | 必填（建立模式）；若互轉且原訂單已開立發票而選非「不產生」→ 錯誤「互轉且原訂單已開立發票，必須選擇「不產生」」 |
| 互轉強制邏輯 | `isTransfer && originalOrderHasInvoice` 成立時：下拉選項只顯示 `'0'`；`useEffect` 自動強制寫入 `'0'`；`handleCancelOrderLookup` 查到有發票的退訂單時立即設定 |
| Mock 資料 | `mockCancelOrders`（退訂單 → `hasInvoice` 旗標）；`mockCustomers` 加 `defaultInvoiceMethod` 欄位 |
| 備註 | `originalOrderHasInvoice` state 由 `handleCancelOrderLookup` 從 mock 退訂單資料取得，上線後改由 API 查詢。互轉且無發票時不設限。 |

### 發票抬頭（invoiceTitle）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceTitle` |
| 建立模式 | 文字輸入（`TextField required readOnlyInEdit`），必填，系統自動帶入，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` / `syncInvoiceCustomer` 帶入發票客戶名稱（`c.name`）；`handleCancelOrderLookup` 互轉查詢後亦同步設定 |
| 驗證規則 | 必填（建立模式） |

### 統一編號（taxIdNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `taxIdNumber` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，系統自動帶入，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` / `syncInvoiceCustomer` 從客戶主檔 `defaultTaxId` 帶入 |
| 驗證規則 | 非必填 |
| 備註 | 若有統一編號，則 `isElectronicInvoice`（`invoiceIssueMethod === '6' && !taxIdNumber`）為 `false`，載具類型自動 disabled |

### 發票通知 Email（invoiceNotifyEmail）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceNotifyEmail` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，系統自動帶入，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` / `syncInvoiceCustomer` 從客戶主檔 `defaultEmail` 帶入 |
| 驗證規則 | 非必填 |

### 載具類型（carrierType）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `carrierType` |
| 建立模式 | 下拉選單（`CwSelect`），條件選填；只有 `invoiceIssueMethod === '6'`（電子發票）且 `taxIdNumber` 為空時可選取，否則 disabled |
| 編輯模式 | 唯讀，建單後不可修改（`mode !== 'edit'` 控制；edit/view 均降級為 `CwInput disabled readOnly`） |
| 查詢/唯讀模式 | 唯讀 |
| 選項 | `會員載具` / `手機條碼` / `自然人憑證` |
| 預設值邏輯 | 由 `syncShipCustomer` / `syncInvoiceCustomer` 從客戶主檔 `defaultCarrierType` 帶入（電子發票客戶預設「會員載具」；非電子發票客戶預設空字串） |
| 驗證規則 | 條件必填：`isElectronicInvoice`（`invoiceIssueMethod === '6' && !taxIdNumber`）成立時必填 |
| 清空邏輯 | 選取載具類型後，自動清空「發票捐贈碼」（`invoiceDonation`） |
| Tooltip 提示 | 「只有發票類型為電子發票時可選取；統編有值亦無法選取」 |
| 備註 | `isElectronicInvoice` 同時作為 required 星號顯示、disabled 判斷、驗證三處的條件。`defaultCarrierType` 欄位新增於 `mockCustomers`。 |

### 發票載具碼（carrierCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `carrierCode` |
| 建立模式 | 文字輸入，條件選填；只有 `isElectronicInvoice` 成立時啟用 |
| 編輯模式 | 唯讀，建單後不可修改（`mode === 'create'` 以外均顯示 `CwInput disabled readOnly`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 載具類型 = `會員載具` → 自動帶入發票客戶編號（`invoiceCustomerCode`），唯讀不可更改；其他類型 → 空值，自行輸入 |
| 驗證規則 | 條件必填：`isElectronicInvoice` 成立且 `carrierType !== '會員載具'` 時必填；格式驗證：手機條碼 = `^\/[A-Z0-9+\-.]{7}$`（/ 開頭共8碼）；自然人憑證 = `^[A-Z]{2}[0-9]{14}$`（2碼英文+14碼數字） |
| 連動行為 | 載具類型 `onChange` 切換時自動填入/清空；`isElectronicInvoice` 為 `false` 時欄位整體 disabled |
| 備註 | 會員載具時顯示唯讀 `CwInput`（非 editable 狀態）；手機/憑證時顯示含 `RequiredLabel` 的可輸入 `CwInput`。 |

### 發票捐贈碼（invoiceDonation）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceDonation` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，填入愛心碼 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 清空邏輯 | 填入捐贈碼後，`useEffect` 自動清空 `carrierType` 與 `carrierCode`（互斥：捐贈碼與載具不能同時存在） |
| 備註 | 反向邏輯：選取載具類型 → 清空捐贈碼（carrierType `onChange`）；填入捐贈碼 → 清空載具類型/碼（`useEffect` 監聽 `form.invoiceDonation`）。 |

### 發票開立說明（invoiceIssueDescription）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceIssueDescription` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，自行輸入 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |

### 發票日期（invoiceDate）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `invoiceDate` |
| 建立模式 | 日期選擇器（`DateField readOnlyInEdit`），選填 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |

### 出貨收件人（shipRecipient）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `shipRecipient` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），選填，可修改；點放大鏡開啟「選擇收件人」popup |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 選定出貨客戶後，由 `syncShipCustomer` 從客戶資料自動帶入 `c.recipient` |
| 驗證規則 | 非必填 |
| Popup 結構 | 「＋ 新增收件人」按鈕（只在表單未展開時顯示）＋ 客戶聯絡人清單（姓名 + 電話）；選取後只填入姓名至 `shipRecipient` |
| 新增收件人表單 | 姓名（必填）+ 電話（選填）；確認後 mock 呼叫 API 新增聯絡人，加入清單並自動選取 |
| Mock 資料 | `mockCustomerContactBook`，以 `shipCustomerCode` 為 key；`syncShipCustomer` 執行時同步載入 |
| 備註 | 聯絡人資料與出貨客戶綁定，不同客戶有各自的聯絡人清單（`CustomerContact: { id, name, phone }`）。 |

### 出貨方式（shipMethod）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `shipMethod` |
| 建立模式 | `PopupField`（文字輸入 + 放大鏡），必填；系統自動帶入，可修改；點放大鏡開啟「選擇出貨方式」popup，可搜尋代碼或名稱 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 格式 `{代碼}-{名稱}`，例：`'1001-郵寄一般'`、`'1005-郵寄-一般航空'` |
| 預設值邏輯 | 依出貨地址的地區帶入：國內 → `1001-郵寄一般`；海外 → `1005-郵寄-一般航空`。觸發時機：選定出貨客戶（`syncShipCustomer`）或在地址 popup 選擇地址時 |
| 驗證規則 | 必填（建立模式） |
| Popup | 獨立 `showShippingPopup` 狀態，可搜尋代碼或名稱；選取後格式為 `${code}-${name}` |
| Mock 資料 | `mockShippingMethods`（19 筆：1001–1011 郵寄、2001 宅配、4021–4023 合併寄送、9010–9015 系統判定），上線後改為 API 查詢 |
| 備註 | `defaultShipMethodByRegion(region)` 輔助函式依地區回傳預設值字串。 |

### 出催款單（deliveryNote）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `deliveryNote` |
| 建立模式 | 下拉選單（`SelectField required`），必填，可修改 |
| 編輯模式 | 可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | `'Y'`（是）、`'N'`（否） |
| 前端顯示 | 是 / 否 |
| 預設值邏輯 | `emptyOrderHeader.deliveryNote: 'N'`（固定預設否） |
| 驗證規則 | 必填（建立模式） |

### 超商店鋪（convenienceStoreName / convenienceStoreAddress）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `convenienceStoreName`（店名）、`convenienceStoreAddress`（地址） |
| 建立模式 | 同一 label「超商店鋪」下的兩個獨立 CwInput（店名 / 地址），系統自動帶入，可修改 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端格式 | 兩欄位分開傳送；顯示組合範例：`全家大龍店 / 台北市大同區大龍街133號1樓` |
| 驗證規則 | 非必填 |
| 適用範圍 | 限天下網書、親子 Shopping 超取訂單；資料由電商平台提供後系統自動帶入 |
| 備註 | UI 為兩個 input 堆疊在同一 label 下，不使用 `TextField`。 |

### 特殊包裝指示（specialPackageInstruction）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `specialPackageInstruction` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，可自行輸入 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |

### 運費（postage）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `postage` |
| 建立模式 | 數字文字輸入（`TextField required readOnlyInEdit`），必填，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 數字字串，例：`'0'`、`'60'` |
| 預設值邏輯 | `emptyOrderHeader.postage: '0'`（固定預設值 0） |
| 驗證規則 | 必填（建立模式）；空字串視為未填 |
| 備註 | `TextField` 元件於此版本加入 `readOnlyInEdit` prop 支援，邏輯為 `isReadOnly = !editable \|\| (mode === 'edit' && readOnlyInEdit)`。 |

### 來源系統（sourceSystem）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `sourceSystem`（建立/編輯）；`NewPMOrderManagement.tsx` → `adv_來源系統`（查詢篩選）；列表欄位 `sourceSystem`（常駐顯示） |
| 建立模式 | 下拉選單（可搜尋），必填 |
| 編輯模式 | 下拉選單（可搜尋），可修改 |
| 查詢篩選 | 下拉選單（可搜尋），可清除（非必填） |
| 列表欄位 | 常駐欄，緊接在法人欄之後，寬 90px |
| 後端值 | 英文代碼字串，例：`'IC'`、`'AUTO'`、`'GP'` |
| 前端顯示 | 中文說明，例：天下網書 / 自動續訂單 / 天下團體授權系統 |
| 驗證規則 | 必填（建立與編輯模式）；查詢篩選可留空 |
| 備註 | 選項定義在 `OMGOrderHeader.tsx` 的 `SOURCE_SYSTEM_OPTIONS` 與 `NewPMOrderManagement.tsx` 的 `SOURCE_SYSTEM_OPTIONS`（共 30 筆，兩份需保持同步），選項較多故加 `searchable`。 |

### 付款客戶編號（paymentCustomerCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `paymentCustomerCode` |
| 建立模式 | `PopupField required readOnlyInEdit`，必填，系統自動帶入，可單獨修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` 帶入出貨客戶代碼；可透過 popup 或 Tab blur 單獨修改 |
| 驗證規則 | 必填（建立模式） |
| Tab lookup | Tab 觸發 `handlePaymentCodeBlur`：查無 → error toast；查到 → `syncPaymentCustomer`（同步名稱與地址） |
| Popup 選取 | `handleSelectCustomer` 偵測 `codeKey === 'paymentCustomerCode'` 時觸發 `syncPaymentCustomer` |

### 付款客戶名稱（paymentCustomerName）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `paymentCustomerName` |
| 建立模式 | `PopupField required readOnlyInEdit`，必填，系統自動帶入，可單獨修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` / `syncPaymentCustomer` 帶入 |
| 驗證規則 | 必填（建立模式） |
| Tab lookup | `handlePaymentNameBlur`：查無 → error toast；同名多筆 → warning toast；查到唯一 → `syncPaymentCustomer` |
| 備註 | 與 `paymentCustomerCode` 雙向連動（修改名稱 → 自動修正客編及地址）。 |

### 付款寄送地址（paymentAddress）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `paymentAddress` |
| 建立模式 | 文字輸入（`TextField required readOnlyInEdit`），必填，系統自動帶入，可手動修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` 或 `syncPaymentCustomer` 從客戶主要地址格式化帶入（`formatAddress(primary)` 或 `c.address`） |
| 驗證規則 | 必填（建立模式） |
| 備註 | 與出貨地址、發票地址相比，付款地址無 popup 選取功能，為純文字欄位。 |

### 訂單客戶編號（orderCustomerCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `orderCustomerCode` |
| 建立模式 | `PopupField required readOnlyInEdit`，必填，系統自動帶入，可單獨修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` 帶入出貨客戶代碼 |
| 驗證規則 | 必填（建立模式） |
| Tab lookup | `handleOrderCodeBlur`：查無 → error toast；查到 → `syncOrderCustomer`（同步名稱） |
| Popup 選取 | `handleSelectCustomer` 偵測 `codeKey === 'orderCustomerCode'` 時觸發 `syncOrderCustomer` |

### 訂單客戶名稱（orderCustomerName）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `orderCustomerName` |
| 建立模式 | `PopupField required readOnlyInEdit`，必填，系統自動帶入，可單獨修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 由 `syncShipCustomer` / `syncOrderCustomer` 帶入 |
| 驗證規則 | 必填（建立模式） |
| Tab lookup | `handleOrderNameBlur`：查無 → error toast；同名多筆 → warning toast；查到唯一 → `syncOrderCustomer` |
| 備註 | `syncOrderCustomer` 只設定 code + name（訂單客戶無獨立地址欄位）。 |

### 沖帳紀錄（writeOffRecord）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `writeOffRecord` |
| 建立模式 | 文字輸入（`TextField`），選填，自行輸入財務沖帳備註；**僅當付款方式為「應收票據」（`paymentMethod === '3'`）時才顯示** |
| 編輯模式 | 可修改（無 `readOnlyInEdit`，建單後仍可編輯）；同樣僅應收票據付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 備註 | 條件渲染 `{isNoteReceivable && ...}`（`isNoteReceivable = form.paymentMethod === '3'`）；位於付款資訊區塊，`col-span-2`。 |

### 付款方式（paymentMethod）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `paymentMethod`（建立/編輯）；`NewPMOrderManagement.tsx` → `adv_付款方式`（查詢篩選，使用 `paymentMethodOptions`） |
| 建立模式 | 下拉選單（`SelectField required readOnlyInEdit`），必填，建單後不可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 數字字串或英文字母：`'1'`（信用卡）、`'2'`（劃撥）、`'3'`（應收票據）、`'4'`（信用卡-網路）、`'5'`（ATM）、`'6'`（贈閱）、`'7'`（互轉）、`'8'`（消費券）、`'9'`（LINEPAY）、`'E'`（綠界） |
| 前端顯示 | `1：信用卡`、`2：劃撥`、`3：應收票據`、`4：信用卡-網路`、`5：ATM`、`6：贈閱`、`7：互轉`、`8：消費券`、`9：LINEPAY`、`E：綠界`（建立與查詢頁相同選項） |
| 自動行為 | `orderAmount === '0'` 時，`useEffect` 強制設定為 `'6'`（贈閱），同步 `freeReading: 'Y'` |
| 驗證規則 | 必填；若 `orderAmount === '0'` 且 `paymentMethod !== '6'` → 錯誤「訂單金額為 0 時，付款方式必須選「贈閱」」 |
| 備註 | `isTransfer`（`paymentMethod === '7'`）、`isRemittance`（`=== '2'`）、`isCreditCard`（`=== '1' \|\| '4'`）、`isNoteReceivable`（`=== '3'`）四個 derived state 控制其他欄位的條件渲染與 required 邏輯。Mock 資料使用數字碼作為值（例 `'1'`），不使用中文文字（例 `'信用卡'`）。 |

### 付款條件（paymentCondition）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `paymentCondition` |
| 建立模式 | 下拉選單（`SelectField readOnlyInEdit`），選填，系統帶入，可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 選項（共13項） | 即期付款、廣-月結45天、廣-月結60天、廣告交換、月結-大和、月結-宇泰、月結120天、月結30天、月結45天、月結60天、月結90天、廣-月結90天、廣-月結120 |
| 驗證規則 | 非必填 |

### 劃撥單號（remittanceNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `remittanceNumber` |
| 建立模式 | 文字輸入（`TextField required readOnlyInEdit`），必填；**付款方式為「劃撥」時才顯示**（條件渲染） |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`）；同樣僅劃撥付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 條件必填：`isRemittance`（`paymentMethod === '2'`）成立時必填 |
| 備註 | 條件渲染 `{isRemittance && ...}`，未選劃撥時欄位整體不顯示。 |

### 劃撥日期（remittanceDate）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `remittanceDate` |
| 建立模式 | 日期選擇器（`DateField required readOnlyInEdit`），必填；**付款方式為「劃撥」時才顯示**（條件渲染） |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`）；同樣僅劃撥付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 條件必填：`isRemittance`（`paymentMethod === '2'`）成立時必填 |
| 備註 | 條件渲染 `{isRemittance && ...}`，未選劃撥時欄位整體不顯示。 |

### 信用卡類型（creditCardType）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `creditCardType` |
| 建立模式 | 下拉選單（`SelectField required readOnlyInEdit`），必填；**付款方式為「信用卡」時才顯示**（條件渲染） |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`）；同樣僅信用卡付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 代碼字串：`AMEX`、`DINERS`、`DISCOVER`、`JCB`、`MC`、`OTHERS`、`UN`、`VISA` |
| 前端顯示 | 僅顯示類型名稱（不顯示代碼）：`American Express`、`Diner's Club`、`Discover`、`JCB`、`Master Card`、`Others`、`聯合信用卡`、`Visa` |
| 驗證規則 | 條件必填：`isCreditCard`（`paymentMethod === '1' \|\| paymentMethod === '4'`）成立時必填 |
| 備註 | 條件渲染 `{isCreditCard && ...}`，未選信用卡時欄位整體不顯示。 |

### 信用卡卡號（creditCardNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `creditCardNumber` |
| 建立模式 | 文字輸入（`TextField required readOnlyInEdit`），必填；**付款方式為「信用卡」時才顯示**（條件渲染） |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`）；同樣僅信用卡付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 條件必填：`isCreditCard` 成立時必填 |
| 備註 | 條件渲染 `{isCreditCard && ...}`。 |

### 信用卡有效期（creditCardExpiry）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `creditCardExpiry` |
| 建立模式 | 文字輸入（`TextField required readOnlyInEdit`），必填；**付款方式為「信用卡」時才顯示**（條件渲染） |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`）；同樣僅信用卡付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 字串，格式 `YY/MM`，例：`'27/12'` |
| 格式驗證 | 正則 `^\d{2}\/\d{2}$`；不符合時顯示錯誤「格式錯誤，應為 YY/MM」 |
| 驗證規則 | 條件必填：`isCreditCard` 成立時必填；格式必須為 YY/MM |
| 備註 | 原為 `DateField`（日期選擇器），已改為 `TextField` 自行輸入，以符合 YY/MM 格式要求。條件渲染 `{isCreditCard && ...}`。 |

### 信用卡持有者（creditCardHolder）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `creditCardHolder` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填；**付款方式為「信用卡」時才顯示**（條件渲染） |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`）；同樣僅信用卡付款方式下顯示 |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 備註 | 條件渲染 `{isCreditCard && ...}`。 |

### 授權回覆碼（authReplyCode）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `authReplyCode` |
| 建立模式 | 文字輸入（`TextField`），選填；**付款方式為「信用卡」時才顯示**（條件渲染）；系統自動帶入，使用者可修改 |
| 編輯模式 | 可修改（移除 `readOnlyInEdit`，建單後仍可編輯） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填；系統帶入值，不卡必填驗證 |
| 備註 | 條件渲染 `{isCreditCard && ...}`。原為「條件必填」，已改為「系統帶入可修改」—驗證 block 中已移除 `if (!form.authReplyCode) e.authReplyCode = ERR`。與其他信用卡欄位不同，此欄不加 `readOnlyInEdit`，edit mode 下仍可修改。 |

### 信用卡號後 4 碼（creditCardLast4）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `creditCardLast4` |
| 建立模式 | 唯讀（`ReadField`，disabled + readOnly），系統帶入，不可手動輸入 |
| 編輯模式 | 唯讀，建單後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 建單時為空；信用卡付款且通過授權後由系統自動帶入（後端行為） |
| 驗證規則 | 非必填 |

### 預收款單號（advancePaymentNumber）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `advancePaymentNumber` |
| 建立模式 | 文字輸入（`TextField required={isTransfer} readOnlyInEdit`），條件必填，付款方式為「互轉」（`paymentMethod === '7'`）時顯示並必填 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 依退訂單資料自動帶入；目前由 `handleCancelOrderLookup` 觸發 mock 填入（上線後改為 API 查詢） |
| 驗證規則 | 條件必填：`isTransfer`（`paymentMethod === '7'`）成立時必填 |

### 預收款餘額（advancePaymentBalance）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `advancePaymentBalance` |
| 建立模式 | 唯讀（`ReadField`，disabled + readOnly），系統帶入，不可手動輸入；付款方式為「互轉」時顯示 |
| 編輯模式 | 唯讀 |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 依退訂單資料自動帶入（上線後改為 API 查詢） |
| 驗證規則 | 建立階段不驗證；**正式核單時**需驗證 `orderAmount === advancePaymentBalance`（核單邏輯尚未實作於 create validate()） |

### 贈閱（freeReading）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `freeReading` |
| 建立模式 | 唯讀 `CwInput`（disabled readOnly），系統帶入，不可手動修改；付款方式為「贈閱」（`paymentMethod === '6'`）時才顯示，且必填 |
| 編輯模式 | 唯讀（同建立） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | `'Y'`（是）、`'N'`（否） |
| 前端顯示 | `'Y'` → `'是'`，`'N'` → `'否'` |
| 預設值邏輯 | 付款方式切換至 `'6'` 時，`useEffect` 自動設為 `'Y'`；舊有邏輯：`orderAmount === '0'` 時也自動設為 `'Y'` |
| 驗證規則 | 條件必填：`paymentMethod === '6'` 時必填（因自動設定，正常不會卡驗證） |
| 備註 | 條件渲染 `{form.paymentMethod === '6' && ...}`，非贈閱付款方式時不顯示。`isFreeReading = form.freeReading === 'Y'` 作為下游欄位（贈閱原因/贈閱部門）的 required 條件驅動源。 |

### 贈閱原因（freeReadingReason）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `freeReadingReason` |
| 建立模式 | 下拉選單（`SelectField required={isFreeReading} readOnlyInEdit`），付款方式為「贈閱」時才顯示（條件渲染），條件必填，自行輸入 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 條件必填：`paymentMethod === '6'` 時必填 |
| 選項（共13項） | `01` 1_PR贈閱、`02` 2_同仁父母贈閱、`03` 3_致歉贈閱、`05` 5_參與調查受贈雜誌、`07` 7_專案贈閱(需拆帳)、`08` 8_訂閱補贈(電雜/贈書/贈品)、`0801` 8.01_天下全閱讀MGM活動、`0802` 8.02_親子線上平台贈送、`09` 9_海外贈品改換期數或贈刊、`10` 10_行銷活動贈閱、`12` 12_ipad暫停服務贈閱、`13` 13_序號平台轉入(全閱讀禮物卡)、`14` 14_用兌換券換課程 |
| 備註 | 選項定義在 `FREE_READING_REASON_OPTIONS`（後端值為數字字串，前端顯示含前綴編號的中文名稱）。條件渲染同 `freeReading`。 |

### 贈閱部門（freeReadingDepartment）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `freeReadingDepartment` |
| 建立模式 | 下拉選單（`SelectField required={isFreeReading} readOnlyInEdit searchable`），付款方式為「贈閱」時才顯示（條件渲染），條件必填，自行輸入 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 條件必填：`paymentMethod === '6'` 時必填 |
| 備註 | 選項共57項（含部分「-停用」項目），定義在 `FREE_READING_DEPARTMENT_OPTIONS`（value 與 label 均為部門中文名稱）。加 `searchable` 因選項超過50筆。條件渲染同 `freeReading`。 |

### 標籤備註（tagNote）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `tagNote` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，自行輸入；付款方式為「贈閱」（`paymentMethod === '6'`）時才顯示，建單後不可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 備註 | 條件渲染 `{form.paymentMethod === '6' && ...}`，非贈閱付款方式時不顯示。 |

### 暫停處理（pauseProcessing）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `pauseProcessing` |
| 建立模式 | 下拉選單（`SelectField required readOnlyInEdit`），必填，建單後不可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | `'Y'`（是）、`'N'`（否） |
| 前端顯示 | 是 / 否 |
| 預設值邏輯 | `emptyOrderHeader.pauseProcessing: 'N'`（固定預設否） |
| 驗證規則 | 必填；`isPaused = form.pauseProcessing === 'Y'` 驅動「暫停原因」的條件必填 |
| 備註 | 設為「是」時，批次核單程式不會處理此單，也無法核單。 |

### 暫停原因（pauseReason）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `pauseReason` |
| 建立模式 | 下拉選單（`SelectField required={isPaused} readOnlyInEdit`），條件必填，建單後不可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 選項 | `代單`、`待確認訂單資料` |
| 驗證規則 | 條件必填：`isPaused`（`pauseProcessing === 'Y'`）成立時必填 |
| 備註 | 原選項「代確認訂單資料」已修正為「待確認訂單資料」。 |

### 核單日期（approvalDate）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `approvalDate` |
| 建立模式 | 唯讀（`ReadField`，disabled readOnly），系統帶入，不可手動修改 |
| 編輯模式 | 唯讀，建單後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 訂單核單後由系統自動記錄；建單時為空（上線後由後端設定） |
| 驗證規則 | 非必填（唯讀系統值） |

### OMG 訂單狀態（omgOrderStatus）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `omgOrderStatus` |
| 建立模式 | 唯讀（`ReadField`，disabled readOnly），系統帶入，不可修改 |
| 編輯模式 | 唯讀，建單後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 後端值 | 字串，例：`'輸入'`、`'已核單'` 等；mock 預設值 `'輸入'` |
| 備註 | 純顯示系統狀態，無前端下拉選項（非 SelectField）。狀態顏色標示使用 `ORDER_STATUS_COLORS`（定義於 `NewPMOrderManagement.tsx` 與 `ERPOrderItems.tsx`）。 |

### OMG 訂單備註（omgOrderNote）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `omgOrderNote` |
| 建立模式 | 文字輸入（`TextField`），選填，自行輸入 |
| 編輯模式 | 可修改（無 `readOnlyInEdit`，建單後仍可編輯） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 備註 | 給客服人員的訂單備註。 |

### 虛擬聯絡電話（virtualContactPhone）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `virtualContactPhone` |
| 建立模式 | 文字輸入（`TextField readOnlyInEdit`），選填，自行輸入，建單後不可修改 |
| 編輯模式 | 唯讀，建單後不可修改（`readOnlyInEdit`） |
| 查詢/唯讀模式 | 唯讀 |
| 驗證規則 | 非必填 |
| 備註 | 原為 `ReadField`（系統帶入），已改為 `TextField`（自行輸入）。 |

### 訂單金額（orderAmount）

| 項目 | 內容 |
|------|------|
| 元件位置 | `OMGOrderHeader.tsx` → `orderAmount`（付款資訊區塊） |
| 建立模式 | 唯讀（`ReadField`，disabled readOnly），系統帶入，不可手動修改 |
| 編輯模式 | 唯讀，建單後不可修改 |
| 查詢/唯讀模式 | 唯讀 |
| 預設值邏輯 | 依商品明細自動計算（目前 mock 為 `'0'`，上線後由後端依明細彙總） |
| 驗證規則 | 非必填（唯讀系統值）；但 `orderAmount === '0'` 會觸發 `paymentMethod` 強制設為贈閱（另一個欄位的條件邏輯） |

### 移除欄位

| 欄位 | 說明 |
|------|------|
| 卡背面 3 碼（`cardBackCode`） | 已從 JSX 移除，不再顯示於表單 |
| 信用卡授權碼（`creditCardAuthCode`） | 已從 JSX 移除，不再顯示於表單 |
| 信用卡請款銀行（`creditCardPaymentBank`） | 已從付款資訊 section JSX 移除（建單/編輯不顯示）；欄位仍保留於 `OMGOrderHeaderData` interface 及 mock 資料，查詢/檢視模式可視需要加回 |
| 推薦客戶編號（`recommendCustomerCode`） | 已從其他訂單資訊 section JSX 移除；欄位仍保留於 `OMGOrderHeaderData` interface 及 mock 資料 |
| 推薦客戶名稱（`recommendCustomerName`） | 已從其他訂單資訊 section JSX 移除；欄位仍保留於 `OMGOrderHeaderData` interface 及 mock 資料 |

---

## 新增訂單明細 — 出貨欄位預設帶入（CreateOrderItems）

> **跨元件預設值規則：** 在「新增訂單」頁面（`CreatePMOrder`）的訂單明細 tab 中，每次透過「新增明細」新增一筆明細時，出貨相關欄位應自動帶入當前訂單表頭（`OMGOrderHeader`）已填寫的對應出貨資料，不使用寫死的預設值。
>
> 元件路徑：`CreatePMOrder` → props → `CreateOrderItems`

### 新增明細時出貨欄位預設帶入對照

| 訂單明細出貨欄位 | 來源（OMGOrderHeader 欄位） |
|---|---|
| 出貨客戶編號（`shipCustomerCode`） | `shipCustomerCode` |
| 出貨客戶名稱（`shipCustomerName`） | `shipCustomerName` |
| 出貨地址（`shipAddress`） | `shipAddress` |
| 出貨方式（`shipMethod`） | `shipMethod` |
| 出貨收件人（`shipRecipient`） | `shipRecipient` |
| 同意行銷（`agreeMarketing`） | `agreeMarketing` |
| 同意行銷日期（`agreeMarketingDate`） | `agreeMarketingDate` |

### 實作說明

| 項目 | 內容 |
|------|------|
| 資料流 | `CreatePMOrder` 持有表頭 state，透過 props（例：`headerShipDefaults`）傳入 `CreateOrderItems` |
| 觸發時機 | 使用者點擊「新增明細」開啟 popup 時（`openModal()`），以當下表頭值作為 `emptyForm()` 的出貨欄位初始值 |
| 目前狀態 | `CreateOrderItems.tsx` 中 `HEADER_DEFAULTS` 為寫死 mock 值，上線前需替換為動態 props 取值 |
| 備註 | 使用者在明細 popup 確認後仍可於出貨 table 的 inline 編輯欄位手動修改各筆明細的出貨資料 |
