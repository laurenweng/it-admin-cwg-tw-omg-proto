import React from 'react';
import { CwTooltip } from './CwTooltip';
import { CwRoundButton } from './CwRoundButton';
import { CwButton } from './CwButton';

export const CwTooltipExamples: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 基本用法 */}
      <div className="space-y-3">
        <h4>1. 基本用法</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          將滑鼠移到按鈕上方即可看到提示訊息。
        </p>
        <div className="flex gap-6 items-center py-8">
          <CwTooltip content="檢視">
            <CwRoundButton icon="view" />
          </CwTooltip>

          <CwTooltip content="查詢">
            <CwRoundButton icon="search" />
          </CwTooltip>

          <CwTooltip content="刪除">
            <CwRoundButton icon="delete" variant="destructive" />
          </CwTooltip>
        </div>
      </div>

      <hr className="border-t border-border/30 my-6" />

      {/* 不同位置 */}
      <div className="space-y-3">
        <h4>2. 不同位置</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          Tooltip 支援四個方向：上（top）、下（bottom）、左（left）、右（right）。
        </p>
        <div className="flex gap-8 items-center justify-center py-16">
          <CwTooltip content="左側提示" placement="left">
            <CwRoundButton icon="view" />
          </CwTooltip>

          <div className="flex flex-col gap-8 items-center">
            <CwTooltip content="上方提示" placement="top">
              <CwRoundButton icon="search" />
            </CwTooltip>

            <CwTooltip content="下方提示" placement="bottom">
              <CwRoundButton icon="edit" />
            </CwTooltip>
          </div>

          <CwTooltip content="右側提示" placement="right">
            <CwRoundButton icon="delete" variant="destructive" />
          </CwTooltip>
        </div>
      </div>

      <hr className="border-t border-border/30 my-6" />

      {/* 長文字 */}
      <div className="space-y-3">
        <h4>3. 長文字自動換行</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          當文字超過最大寬度（150px）時會自動換行。建議保持文字簡潔。
        </p>
        <div className="flex gap-6 items-center py-8">
          <CwTooltip content="下載">
            <CwRoundButton icon="download" />
          </CwTooltip>

          <CwTooltip content="這是一個較長的提示文字範例，會自動換行顯示" placement="bottom">
            <CwRoundButton icon="upload" />
          </CwTooltip>
        </div>
      </div>

      <hr className="border-t border-border/30 my-6" />

      {/* 搭配其他元件 */}
      <div className="space-y-3">
        <h4>4. 搭配其他元件</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          Tooltip 可以包裹任何元件，不限於按鈕。
        </p>
        <div className="flex gap-6 items-center py-8">
          <CwTooltip content="點擊此按鈕執行主要操作">
            <CwButton variant="primary" appearance="filled">
              主要按鈕
            </CwButton>
          </CwTooltip>

          <CwTooltip content="點擊此按鈕執行次要操作" placement="bottom">
            <CwButton variant="primary" appearance="outline">
              次要按鈕
            </CwButton>
          </CwTooltip>

          <CwTooltip content="需要額外說明的文字" placement="right">
            <span className="cursor-help text-primary underline decoration-dotted">
              說明文字
            </span>
          </CwTooltip>
        </div>
      </div>

      <hr className="border-t border-border/30 my-6" />

      {/* 禁用狀態 */}
      <div className="space-y-3">
        <h4>5. 禁用狀態</h4>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          設定 disabled 屬性後，Tooltip 將不會顯示。
        </p>
        <div className="flex gap-6 items-center py-8">
          <CwTooltip content="這個提示不會顯示" disabled>
            <CwRoundButton icon="view" />
          </CwTooltip>

          <span className="text-muted-foreground">← 這個按鈕的 Tooltip 已被禁用</span>
        </div>
      </div>
    </div>
  );
};
