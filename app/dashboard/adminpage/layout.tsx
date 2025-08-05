// app/admin/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      {/* You can add common admin layout elements here */}
      {children}
    </div>
  );
}
