import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { DashboardSidebar, ModeToggle, Loader } from "@/components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { useSelf, useLogout } from "@/hooks";
import { cn } from "@/lib/utils";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <header className="flex h-16 shrink-0 px-4 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b w-full print:hidden bg-white dark:bg-cyan-950/30">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 size-8" />
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div
          className="flex items-center justify-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/dashboard/profile")}
        >
          <Avatar className="flex items-center justify-center size-8">
            <AvatarImage src={user?.avatar?.url} alt="profile" />
            <AvatarFallback className="bg-foreground text-card text-sm">
              {user?.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-foreground text-sm font-medium">
            {user?.fullName}
          </h1>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="hover:bg-cyan-100 dark:hover:bg-cyan-900/30"
              >
                <LogOut size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

const OutletComp = () => {
  const { open, isMobile } = useSidebar();
  return (
    <div
      className={cn(
        "p-4",
        open ? "w-[calc(100vw_-225px)]" : "w-[calc(100vw_-50px)]",
        isMobile && "w-full"
      )}
    >
      <Outlet />
    </div>
  );
};

const DashboardLayout = () => {
  const { isAuth } = useAuth();
  const { isLoading } = useSelf();

  if (!isAuth) return <Navigate to="/auth/sign-in" />;
  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <SidebarInset>
          <Header />
          <OutletComp />
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
