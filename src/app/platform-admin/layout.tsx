import { requireSuperAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Settings } from "lucide-react";

export default async function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require super admin access
  const user = await requireSuperAdmin();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-indigo-900 text-white z-50">
        <div className="p-6 border-b border-indigo-800">
          <h1 className="text-xl font-bold tracking-tight">
            Platform Admin
          </h1>
          <p className="text-xs text-indigo-300 mt-1">Super Admin Control</p>
        </div>
        
        <nav className="mt-6 flex flex-col gap-1 p-4">
          <Link
            href="/platform-admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors"
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <Link
            href="/platform-admin/tenants"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors"
          >
            <Users size={20} />
            <span className="font-medium">Tenants</span>
          </Link>

          <Link
            href="/platform-admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-800 hover:text-white transition-colors"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3 px-4 py-3 text-indigo-200">
            <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-indigo-400">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
