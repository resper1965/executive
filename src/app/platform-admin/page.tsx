import { createClient } from "@/lib/supabase/server";

export default async function PlatformAdminDashboard() {
  const supabase = await createClient(); // Must await in newer Next.js / server actions context if createClient is async
  
  // Parallel fetch for stats
  const [
    { count: totalTenants },
    { count: activeSubscriptions },
    { data: tenants }
  ] = await Promise.all([
    supabase.from("tenants").select("*", { count: "exact", head: true }),
    supabase.from("tenants").select("*", { count: "exact", head: true }).eq("subscription_status", "active"),
    supabase.from("tenants").select("subscription_plan").neq("subscription_plan", "free")
  ]);

  // Estimate revenue (simplified)
  const revenue = tenants?.reduce((acc: number, tenant: { subscription_plan: string | null }) => {
    if (tenant.subscription_plan === "professional") return acc + 49;
    if (tenant.subscription_plan === "enterprise") return acc + 199;
    return acc;
  }, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Platform Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Total Tenants</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalTenants || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">{activeSubscriptions || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Est. Monthly Revenue</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            ${revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
