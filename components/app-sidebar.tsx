import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutForm from "./sign-out-form";
import type { User } from "@/lib/types";
import Logo from "./logo";

type UserProps = {
  user: User | null;
};

export default function AppSidebar({ user }: UserProps) {
  //   const role = user?.role || "user"; // Default to 'user' if role is not defined

  // console.log("User in AppSidebar:", user);
  return (
    <Sidebar variant="floating" className="border-r ">
      <SidebarHeader className="border-b px-6 py-3">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                href="/dashboard/allUsers"
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span> All members </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                href="/dashboard/file/allFilesPage"
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <span>File dashboard </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Add more menu items as needed */}
          {user?.role === "admin" && (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link
                  href="/dashboard/adminpage"
                  className="flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span className="text-red-600">Admin Panel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {user?.role === "admin" && (
            <SidebarMenuItem className="">
              <SidebarMenuButton>
                <Link
                  href="/dashboard/file/uploadFile"
                  className="flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span className="text-red-600">Upload File</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarImage src={user?.image || ""} alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.name ? user.name.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
          <SignOutForm>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="flex items-center cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
            </Button>
          </SignOutForm>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
