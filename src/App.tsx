import { useState } from "react";
// Main application component
import { CwHeader } from "./components/CwHeader";
import { CwSidemenu, CwSidemenuItem } from "./components/CwSidemenu";
import { MemberSearch } from "./components/MemberSearch";
import { MemberDetail } from "./components/MemberDetail";
import { NewPMOrderManagement } from "./components/NewPMOrderManagement";
import { DeleteCustomerApplication } from "./components/DeleteCustomerApplication";
import { DeleteUserRecordQuery } from "./components/DeleteUserRecordQuery";
import { DeleteUserRecordInfo } from "./components/DeleteUserRecordInfo";
import { MemberDeletionStatistics } from "./components/MemberDeletionStatistics";
import { MemberDeletionStatisticsData } from "./components/MemberDeletionStatisticsData";
import { DeletionTeamContactMaintenance } from "./components/DeletionTeamContactMaintenance";
import { ContactMaintenance } from "./components/ContactMaintenance";
import { ContactEdit } from "./components/ContactEdit";
import { ComponentDemo } from "./components/ComponentDemo";
import { OrderDetail } from "./components/OrderDetail";
import { CwFooter } from "./components/CwFooter";
import { 
  Users, 
  ShoppingCart, 
  UserX, 
  Package
} from "lucide-react";

// 菜單項目定義
const menuItems: CwSidemenuItem[] = [
  {
    id: "member",
    label: "會員管理",
    icon: <Users className="w-4 h-4" />,
    children: [
      { id: "member-search", label: "會員查詢" }
    ]
  },
  {
    id: "order",
    label: "訂單管理",
    icon: <ShoppingCart className="w-4 h-4" />,
    children: [
      { id: "new-pm-order-management", label: "新訂單列表" }
    ]
  },
  {
    id: "component-demo",
    label: "元件demo",
    icon: <Package className="w-4 h-4" />
  }
];

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("member-search");
  const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>(undefined);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState<string | undefined>(undefined);
  const [selectedApplicationNumber, setSelectedApplicationNumber] = useState<string | undefined>(undefined);
  const [selectedContactId, setSelectedContactId] = useState<number | undefined>(undefined);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const handleViewMember = (memberId: number) => {
    setSelectedMemberId(memberId);
    setCurrentPage("member-detail");
  };

  const handleBackToMemberSearch = () => {
    setCurrentPage("member-search");
    setSelectedMemberId(undefined);
  };

  const handleViewOrder = (orderNumber: string) => {
    setSelectedOrderNumber(orderNumber);
    setCurrentPage("order-detail");
  };

  const handleBackToMemberDetail = () => {
    setCurrentPage("member-detail");
    setSelectedOrderNumber(undefined);
  };

  const handleViewDeleteRecord = (applicationNumber: string) => {
    setSelectedApplicationNumber(applicationNumber);
    setCurrentPage("delete-user-record-info");
  };

  const handleBackToDeleteRecordQuery = () => {
    setCurrentPage("delete-user-record-query");
    setSelectedApplicationNumber(undefined);
  };

  const handleEditContact = (contactId: number) => {
    setSelectedContactId(contactId);
    setCurrentPage("contact-edit");
  };

  const handleBackToContactMaintenance = () => {
    setCurrentPage("deletion-team-contact-maintenance");
    setSelectedContactId(undefined);
  };

  const handleNotificationClick = () => {
    console.log('通知被點擊');
    // 可在此處開啟通知面板或導航到通知頁面
  };

  const handleUserClick = () => {
    console.log('會員被點擊');
    // 可在此處顯示使用者選單或導航到個人資料頁面
  };

  const renderPage = () => {
    switch (currentPage) {
      case "component-demo":
        return <ComponentDemo />;
      case "new-pm-order-management":
        return <NewPMOrderManagement />;
      case "delete-customer-application":
        return <DeleteCustomerApplication />;
      case "delete-user-record-query":
        return <DeleteUserRecordQuery onViewRecord={handleViewDeleteRecord} />;
      case "delete-user-record-info":
        return <DeleteUserRecordInfo />;
      case "member-deletion-statistics":
        return <MemberDeletionStatisticsData />;
      case "deletion-team-contact-maintenance":
        return <ContactMaintenance onEdit={handleEditContact} />;
      case "contact-edit":
        return <ContactEdit contactId={selectedContactId} onBack={handleBackToContactMaintenance} />;
      case "order-detail":
        return <OrderDetail orderId={selectedOrderNumber ? parseInt(selectedOrderNumber.replace(/\D/g, '')) : undefined} onClose={handleBackToMemberDetail} />;
      case "member-detail":
        return <MemberDetail memberId={selectedMemberId} onBack={handleBackToMemberSearch} onViewOrder={handleViewOrder} />;
      case "member-search":
      default:
        return <MemberSearch onViewMember={handleViewMember} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header - Fixed at top */}
      <CwHeader 
        onMenuToggle={toggleSidebar}
        systemName="客服系統"
        userName="陳曉菁"
        onNotificationClick={handleNotificationClick}
        onUserClick={handleUserClick}
        hasNotification={true}
      />
      
      {/* Main Layout - Takes remaining height */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed on left, scrollable if needed */}
        <CwSidemenu 
          items={menuItems}
          activeId={currentPage}
          onItemClick={handlePageChange}
          defaultExpandedIds={["member", "order"]}
          collapsed={sidebarCollapsed}
        />
        
        {/* Main Content Area with Footer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {renderPage()}
          </main>
          
          {/* Footer - Fixed at bottom */}
          <CwFooter />
        </div>
      </div>
    </div>
  );
}