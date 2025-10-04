import { Outlet } from "@remix-run/react";
import { SidebarProvider, useSidebar } from "~/context/SidebarContext";
import { ThemeProvider } from "~/context/ThemeContext";
import AppSidebar from "~/components/admin/layout/AppSidebar";
import AppHeader from "~/components/admin/layout/AppHeader";
import Backdrop from "~/components/admin/layout/Backdrop";

function LayoutContent() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
    </ThemeProvider>
  );
}
