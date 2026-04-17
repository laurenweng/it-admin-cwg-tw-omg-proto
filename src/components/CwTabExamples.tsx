import { useState } from "react";
import { CwTab, CwTabItem } from "./CwTab";

/**
 * CwTab 元件展示範例
 */
export function CwTabExamples() {
  const [activeTab1, setActiveTab1] = useState("home");
  const [activeTab2, setActiveTab2] = useState("member-info");
  const [activeTab3, setActiveTab3] = useState("profile");

  // 基本範例
  const basicTabs: CwTabItem[] = [
    { id: "home", label: "首頁" },
    { id: "about", label: "關於我們" },
    { id: "contact", label: "聯絡方式" },
  ];

  // 會員管理範例（模擬真實場景）
  const memberTabs: CwTabItem[] = [
    { id: "member-info", label: "會員資料" },
    { id: "medical-record", label: "病歷管理" },
    { id: "order-record", label: "訂單紀錄" },
    { id: "auto-schedule", label: "自動排程" },
    { id: "e-invoice", label: "電子發票" },
    { id: "children-relation", label: "訂子女關係" },
    { id: "user-journey", label: "UserJourney" },
  ];

  // 設定頁面範例
  const settingTabs: CwTabItem[] = [
    { id: "profile", label: "個人資料" },
    { id: "security", label: "安全設定" },
    { id: "notification", label: "通知設定" },
    { id: "privacy", label: "隱私權" },
  ];

  return (
    <div className="space-y-[40px]">
      <div>
        <h3 className="font-['Inter',_sans-serif] font-[500] leading-[28.8px] text-[24px] mb-[20px]">
          CwTab 標籤頁元件
        </h3>
        <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px] mb-[20px]">
          用於在同一頁面中切換不同內容區塊的標籤導航元件。
        </p>
      </div>

      {/* 基本使用 */}
      <div className="space-y-[12px]">
        <h4 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[22.4px] text-[16px]">
          基本使用
        </h4>
        <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
          基本的標籤頁切換功能，點擊標籤可切換內容。
        </p>
        <div className="space-y-[20px]">
          <CwTab
            items={basicTabs}
            activeId={activeTab1}
            onChange={setActiveTab1}
          />
          <div className="p-[20px] bg-[#f8f9fa] rounded-[4px]">
            <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[14px]">
              當前選中：<span className="font-[500] text-[#01579b]">{basicTabs.find(t => t.id === activeTab1)?.label}</span>
            </p>
          </div>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 會員管理範例 */}
      <div className="space-y-[12px]">
        <h4 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[22.4px] text-[16px]">
          會員管理範例
        </h4>
        <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
          真實場景：會員管理頁面的標籤導航，包含多個功能模組。
        </p>
        <div className="space-y-[20px]">
          <CwTab
            items={memberTabs}
            activeId={activeTab2}
            onChange={setActiveTab2}
          />
          <div className="p-[20px] bg-[#f8f9fa] rounded-[4px]">
            {activeTab2 === "member-info" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  會員資料
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  顯示會員的基本資料、聯絡方式、地址等資訊。
                </p>
              </div>
            )}
            {activeTab2 === "medical-record" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  病歷管理
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  管理會員的病歷資料和就診紀錄。
                </p>
              </div>
            )}
            {activeTab2 === "order-record" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  訂單紀錄
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  查看會員的所有訂單紀錄和交易歷史。
                </p>
              </div>
            )}
            {activeTab2 === "auto-schedule" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  自動排程
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  設定會員的自動排程和預約規則。
                </p>
              </div>
            )}
            {activeTab2 === "e-invoice" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  電子發票
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  管理會員的電子發票設定和開立紀錄。
                </p>
              </div>
            )}
            {activeTab2 === "children-relation" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  訂子女關係
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  設定和管理會員的子女關係資料。
                </p>
              </div>
            )}
            {activeTab2 === "user-journey" && (
              <div>
                <h5 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[19.6px] text-[14px] mb-[8px]">
                  UserJourney
                </h5>
                <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
                  追蹤和分析會員的使用歷程。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-border/30" />

      {/* 設定頁面範例 */}
      <div className="space-y-[12px]">
        <h4 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[22.4px] text-[16px]">
          設定頁面範例
        </h4>
        <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
          系統設定頁面的標籤導航，分類不同設定項目。
        </p>
        <div className="space-y-[20px]">
          <CwTab
            items={settingTabs}
            activeId={activeTab3}
            onChange={setActiveTab3}
          />
          <div className="p-[20px] bg-[#f8f9fa] rounded-[4px]">
            <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[14px]">
              當前設定：<span className="font-[500] text-[#01579b]">{settingTabs.find(t => t.id === activeTab3)?.label}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 使用規則 */}
      <div className="space-y-[12px]">
        <h4 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[22.4px] text-[16px]">
          使用規則
        </h4>
        <ul className="list-disc list-inside space-y-[8px] font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
          <li>標籤數量建議在 3-8 個之間，避免過多導致閱讀困難</li>
          <li>標籤文字應簡潔明確，清楚說明該區塊的內容</li>
          <li>選中狀態使用藍色底線和藍色文字，未選中狀態使用灰色文字</li>
          <li>Hover 時未選中標籤會變為黑色，提供視覺回饋</li>
          <li>標籤之間使用 20px 間距，確保點擊區域足夠大</li>
          <li>底部邊框使用淺灰色，與選中標籤的藍色底線形成對比</li>
          <li>適用於同一頁面內的內容區塊切換，不適合跨頁面導航</li>
        </ul>
      </div>

      {/* 適用場景 */}
      <div className="space-y-[12px]">
        <h4 className="font-['Noto_Sans_TC',_sans-serif] font-[500] leading-[22.4px] text-[16px]">
          適用場景
        </h4>
        <ul className="list-disc list-inside space-y-[8px] font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[#7c808c] text-[14px]">
          <li>會員資料管理：會員資料、訂單紀錄、病歷管理等多模組內容</li>
          <li>系統設定：個人資料、安全設定、通知設定等分類設定</li>
          <li>資料檢視：基本資訊、詳細資料、歷史紀錄等分頁展示</li>
          <li>內容分類：將相關但不同類型的內容組織在同一頁面</li>
          <li>表單分組：將複雜表單分成多個步驟或類別</li>
        </ul>
      </div>
    </div>
  );
}

CwTabExamples.displayName = 'CwTabExamples';
