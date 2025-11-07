"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent cursor-default"
        >
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg ">
            <img
              src="/SalingTau.png"
              alt="SalingTau"
              className="size-7 rounded object-contain"
            />
          </div>
          <div className="flex flex-1 items-center text-left">
            <span className="font-bold text-xl tracking-wide text-slate-700 transition-all duration-200">
              SalingTau
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}