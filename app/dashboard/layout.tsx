"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
