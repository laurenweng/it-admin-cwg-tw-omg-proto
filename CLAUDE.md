# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # Install dependencies
npm run dev    # Start dev server at http://localhost:5173
npm run build  # Production build → build/
```

There are no lint or test scripts configured.

## Architecture

### Routing
This app uses **custom state-based routing** — no React Router or Next.js. `App.tsx` holds a `currentPage` string state and a `renderPage()` switch statement. Navigation happens by calling `setCurrentPage(id)`. Menu items in `CwSidemenu` map IDs to page components.

### Component Naming Conventions
- `Cw*` prefix — custom design system components (CwButton, CwInput, CwSelect, CwTable, CwDrawer, etc.). These are the primary building blocks for all pages.
- Business page components (NewPMOrderManagement, PMOrderDetail, MemberSearch, etc.) compose `Cw*` components.
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

**DrawerActions:** Reusable component inside PMOrderDetail for 暫存/複製訂單/清空/取消 buttons. Place inside drawer `children`, not via CwDrawer props.

### Order Management (main feature)

The core flow is: `NewPMOrderManagement` (search/list) → `PMOrderDetail` (detail view).

- **`NewPMOrderManagement`** — unified order search. State-based routing within the component: when `showDetail` is true, renders `PMOrderDetail` in place of the list. `handleView(record, 'service'|'erp')` navigates to detail with `fixedTab` to lock which tab is shown.

- **`PMOrderDetail`** — accepts `fixedTab?: 'service' | 'erp'` to show only one view (hides the main tab switcher). `onClose()` returns to the list. Uses a single `activeErpTab` state for all sub-tabs (訂單表頭, 訂單明細, 改址單, 退件補寄單, 止復寄單, 改出貨方式, 退訂單, 出貨資訊).

- **Order type field** — `UnifiedOrderData.type` is `('service' | 'erp' | 'omg')[]` (array, supports multi-source orders). Filter checkboxes show/hide orders where the array includes the respective source.

- **Mock data** is defined as module-level constants (e.g., `mockServiceOrders`, `mockErpOrders`, `mockOmgOrders`, `allAddressChangeData`, `allReturnResendData`, `allSuspendResumeData`) to avoid re-creation on render.

### Status Colors
`ORDER_STATUS_COLORS` is defined in both `NewPMOrderManagement.tsx` and `ERPOrderItems.tsx`:
- Keys: `'輸入' | '作廢' | '止寄' | '復寄' | '退訂' | '補贈電子'`
- Each entry has `tagBg`, `tagColor` (for status tags), and `rowBg` (for CwTable `rowStyle`).
- `'正常'` status gets a green tag but **no row background**.
