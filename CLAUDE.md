# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 欄位規則工作流程

實作完任何欄位的規則變更（預設值、可編輯性、驗證、顯示格式、BU 邏輯等）後，**必須呼叫 `record-field-rule` skill** 將規則更新到 `FIELD_RULES.md`。

## Commands

```bash
npm i          # Install dependencies
npm run dev    # Start dev server at http://localhost:5173
npm run build  # Production build → build/
npm run preview # Preview production build
```

There are no lint or test scripts configured.

## Stack

React 18 + TypeScript + Tailwind CSS v4 + Vite. No React Router — routing is custom state-based (see below). Radix UI primitives underlie most `Cw*` components, but use the `Cw*` wrappers, not Radix directly.

## Architecture

### Routing
`App.tsx` holds a `currentPage` string state and a `renderPage()` switch statement. Navigation happens by calling `setCurrentPage(id)`. Menu items in `CwSidemenu` map IDs to page components.

### Component Naming Conventions
- `Cw*` prefix — custom design system components (CwButton, CwInput, CwSelect, CwTable, CwDrawer, CwTab, CwPagination, etc.). These are the primary building blocks.
- Business page components (NewPMOrderManagement, PMOrderDetail, MemberSearch, etc.) compose `Cw*` components.
- `*Examples.tsx` files are demo/storybook pages only — not used in production flows.
- `src/imports/` contains **auto-generated Figma exports** (SVG paths, layout frames). Do not edit manually — reference `svgPaths` objects from these files when building UI.

### Key Design System Patterns

**Font weight:** Noto Sans TC does not respond to Tailwind's `font-[N]` utilities. Always use `style={{ fontWeight: N }}` inline.

**CwTable:** Supports `rowStyle` prop for dynamic row background colors and `sticky: true` on column definitions to pin columns to the right.

**CwSelect:** Supports `searchValue` on options for multi-field search, and `renderOption` for custom dropdown item rendering.

**CwDrawer with lookup:** When a drawer needs to look up a record by ID, use an IIFE pattern:
```tsx
{(() => {
  const rec = data.find(r => r.id === selectedId);
  return <CwDrawer ...>{rec && <.../>}</CwDrawer>;
})()}
```

**CwFuzzySearchModal:** Shared popup for searching customers/products/plans/channels. Props: `open`, `onClose`, `onSelect(value: string)`, `keyword`, `type: FuzzySearchType`.

**Inline search popup pattern** (used in OMGOrderHeader and CreateOrderItems): fixed overlay `<div>` with a `ref`, closed via `document.addEventListener('mousedown', handler)` checking `ref.contains(e.target)`. Do **not** use `CwPopup` for these in-form lookup fields.

**DrawerActions:** Reusable component inside PMOrderDetail for 暫存/複製訂單/清空/取消 buttons. Place inside drawer `children`, not via CwDrawer props.

### Order Management (main feature)

Three routing levels all within `NewPMOrderManagement`:
1. **List view** (default) — unified order search and table.
2. **Detail view** — when `showDetail` is true, renders `PMOrderDetail` in place of the list. `handleView(record, 'service'|'erp')` navigates with `fixedTab` to lock which tab is shown. `onClose()` returns to the list.
3. **Create view** — when `showCreate` is true, renders `CreatePMOrder` (a fully separate component, **not** a mode of PMOrderDetail). `onClose()` returns to the list.

**`PMOrderDetail`** — accepts `fixedTab?: 'service' | 'erp'` to show only one view (hides the main tab switcher). Uses a single `activeErpTab` state for all sub-tabs (訂單表頭, 訂單明細, 改址單, 退件補寄單, 止復寄單, 改出貨方式, 退訂單, 出貨資訊).

**`CreatePMOrder`** — new order form. Has its own `activeErpTab` (訂單表頭 / 訂單明細 / …). The 訂單表頭 tab renders `<OMGOrderHeader ref={headerRef} defaultExpandAll mode="create" />` and 訂單明細 renders `<CreateOrderItems />`.

**`OMGOrderHeader`** — forwardRef component exposing `{ validate(): boolean }` via `useImperativeHandle`. Parent must hold `useRef<OMGOrderHeaderRef>`. Modes: `'view'` (read-only mock data) | `'edit'` (editable, existing order) | `'create'` (editable, empty). In view mode, all fields render as disabled CwInput. In edit mode, fields are editable except `legalEntity` (read-only after creation).

**Cross-tab validation in CreatePMOrder:** When the user clicks 建立訂單 while on a tab other than 訂單表頭, the code calls `setActiveErpTab('header')` + `setPendingValidate(true)`. A `useEffect` watches for `pendingValidate && activeErpTab === 'header'` to trigger `headerRef.current.validate()`.

**Order type field** — `UnifiedOrderData.type` is `('service' | 'erp' | 'omg')[]` (array, supports multi-source orders). Filter checkboxes show/hide orders where the array includes the respective source.

**Mock data** is defined as module-level constants (e.g., `mockServiceOrders`, `mockErpOrders`, `mockOmgOrders`, `allAddressChangeData`, `allReturnResendData`, `allSuspendResumeData`) to avoid re-creation on render.

### Status Colors
`ORDER_STATUS_COLORS` is defined in both `NewPMOrderManagement.tsx` and `ERPOrderItems.tsx`:
- Keys: `'輸入' | '作廢' | '止寄' | '復寄' | '退訂' | '補贈電子'`
- Each entry has `tagBg`, `tagColor` (for status tags), and `rowBg` (for CwTable `rowStyle`).
- `'正常'` status gets a green tag but **no row background**.

### BU / 法人 (legalEntity)
Backend value is a numeric string. `BU_OPTIONS` in `OMGOrderHeader.tsx`:
- `'81'` → 天下
- `'88'` → 康健
- `'82'` → 親子
- `'110'` → 親子學

In create mode, the dropdown only shows the current user's BU options (from `mockCurrentUserBUs`), defaulting to the highest-priority BU the user holds (priority order: 天下 > 康健 > 親子 > 親子學). Once an order is created, `legalEntity` becomes read-only in view/edit modes.

`legalEntityOptions` in `NewPMOrderManagement.tsx` (used for search filters) shows full labels like `'81 - CW 天下雜誌'` — these are for filter display only, not for form submission.
