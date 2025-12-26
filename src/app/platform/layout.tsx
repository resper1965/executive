import { requireSuperAdmin } from "@/lib/auth";
import Link from "next/link";
import { Building2, LayoutDashboard, Users, LogOut } from "lucide-react";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireSuperAdmin();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
        <div className="p-6">
          <Link href="/platform" className="flex items-center gap-2">
            <Building2 className="w-8 h-8" />
            <div>
              <span className="text-xl font-bold">Executive</span>
              <span className="block text-xs text-slate-400">by Bekaa</span>
            </div>
          </Link>
        </div>

        <nav className="mt-6 px-3">
          <Link
            href="/platform"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/platform/tenants"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Users className="w-5 h-5" />
            Clientes
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-medium">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
            <form action="/auth/logout" method="POST">
              <button type="submit" className="text-slate-400 hover:text-white">
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
