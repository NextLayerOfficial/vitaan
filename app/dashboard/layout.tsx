import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppHeader from "@/components/app-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/UserContext";
import { User } from "@/lib/types";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!dbUser) redirect("/sign-in");
  // const user: User = {
  //   ...dbUser, // includes socials as JSON
  // };
  const user: User = {
    id: dbUser.id,
    name: dbUser.name ?? "",
    email: dbUser.email,
    role: dbUser.role ?? "user",
    username: dbUser.username ?? "",
    displayUsername: dbUser.displayUsername ?? "",
    emailVerified: dbUser.emailVerified ?? false,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    image: dbUser.image ?? "",
    address: dbUser.address ?? "",
    banned: dbUser.banned ?? false,
    banReason: dbUser.banReason ?? "",
    banExpires: dbUser.banExpires ?? null,
    graduationYear: dbUser.graduationYear ?? 0,
    department: dbUser.department ?? "",
    currentCompany: dbUser.currentCompany ?? "",
    jobTitle: dbUser.jobTitle ?? "",
    phone: dbUser.phone ?? "",
    socials: (dbUser.socials ?? {}) as Record<string, string>, // ✅ coerce JSON to correct type
  };

  return (
    <SidebarProvider className="bg-ivory">
      <UserProvider user={user}>
        <div className="flex min-h-screen w-full ">
          <AppSidebar user={user} />
          <div className="w-full flex flex-1 flex-col">
            <AppHeader />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </UserProvider>
    </SidebarProvider>
  );
}
