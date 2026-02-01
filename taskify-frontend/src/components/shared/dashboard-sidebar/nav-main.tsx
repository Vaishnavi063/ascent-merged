import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight, Wrench, SlidersHorizontal } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useProject from "@/hooks/use-project";
import { SETUP_LINKS, WORKSPACE_LINKS } from "@/constants";

const NavMain = () => {
  const { open, isMobile, setOpenMobile } = useSidebar();
  const { project } = useProject();
  const { pathname } = useLocation();

  if (!project) {
    if (!open)
      return (
        <div className="h-full flex items-center justify-center flex-col gap-2"></div>
      );
    return (
      <div className="h-full flex items-center justify-center">
        Project not found!
      </div>
    );
  }

  const navGroups = [
    {
      id: 1,
      title: "Setup",
      basePath: "/dashboard/setup",
      icon: Wrench,
      items: SETUP_LINKS,
    },
    {
      id: 2,
      title: "Workspace",
      basePath: "/dashboard/workspace",
      icon: SlidersHorizontal,
      items: WORKSPACE_LINKS,
    },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {navGroups.map((group) => {
            const isGroupActive = pathname.includes(group.basePath);
            
            return (
              <Collapsible
                key={group.id}
                asChild
                defaultOpen={isGroupActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={!open && !isMobile ? group.title : undefined}
                      className={cn(
                        "hover:bg-muted/50",
                        isGroupActive && "bg-muted/50",
                        !open && !isMobile && "flex-col h-16 gap-1"
                      )}
                    >
                      <group.icon size={20} />
                      {open || isMobile ? (
                        <>
                          <span className="text-sm font-medium">{group.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </>
                      ) : (
                        <span className="text-xs">{group.title}</span>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {(open || isMobile) && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.items.map((item) => {
                          const itemPath = `${group.basePath}/${project?.projectId}/${item.path}`;
                          const isActive = pathname.includes(itemPath.split('?')[0]);
                          
                          return (
                            <SidebarMenuSubItem key={item.id}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "hover:bg-muted/50",
                                  isActive && "bg-muted/50 text-active"
                                )}
                              >
                                <NavLink
                                  to={itemPath}
                                  onClick={() => setOpenMobile(false)}
                                >
                                  <item.icon size={15} />
                                  <span className="text-sm">{item.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default NavMain;
