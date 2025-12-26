import { getCurrentTenant } from "@/lib/tenant-api";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getCurrentTenant();

  // TODO: Add Supabase Auth check here
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">
            {tenant?.name || "Admin"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">Painel de Gestão</p>
        </div>
        
        <nav className="mt-6">
          <a
            href="/admin"
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <span>Dashboard</span>
          </a>
          <a
            href="/admin/posts"
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <span>Posts</span>
          </a>
          <a
            href="/admin/pages"
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <span>Páginas</span>
          </a>
          <a
            href="/admin/settings"
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <span>Configurações</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
