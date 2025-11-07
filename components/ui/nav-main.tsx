"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export function NavMain({
                          items,
                        }: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            // --- Parent item ---
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`
                      text-black 
                      hover:bg-blue-600/10 hover:text-blue-600
                      [&>svg]:size-5
                      [&>svg]:hover:text-blue-600
                      transition-colors
                    `}
                  >
                    {item.icon && <item.icon />}
                    <span className="text-base font-medium">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 size-5" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className="text-black hover:bg-blue-600/20 hover:text-blue-600 data-[active=true]:bg-blue-600/20 data-[active=true]:text-blue-600"
                        >
                          <Link href={subItem.url}>
                            <span className="text-sm font-medium">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="text-black hover:bg-blue-600/20 hover:text-blue-600 data-[active=true]:bg-blue-600/20 data-[active=true]:text-blue-600 [&>svg]:hover:text-blue-600 [&>svg]:data-[active=true]:text-blue-600 [&>svg]:size-5"
              >
                <Link href={item.url} className="flex items-center w-full">
                  {item.icon && <item.icon />}
                  <span className="text-base font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
