import { auth } from "@/lib/auth";
import AdminPanel from "@/components/AdminPanel";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") redirect("/");

  return <AdminPanel />;
}
