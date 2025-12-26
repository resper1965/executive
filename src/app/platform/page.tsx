import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Users, CreditCard, TrendingUp, Plus } from "lucide-react";

export default async function PlatformDashboard() {
  const supabase = await createClient();

  // Get stats
  const { count: totalTenants } = await supabase
    .from("tenants")
    .select("*", { count: "exact", head: true });

  const { data: tenantsByPlan } = await supabase
    .from("tenants")
    .select("subscription_plan");

  const planCounts = {
    free: tenantsByPlan?.filter((t) => t.subscription_plan === "free").length || 0,
    professional: tenantsByPlan?.filter((t) => t.subscription_plan === "professional").length || 0,
    enterprise: tenantsByPlan?.filter((t) => t.subscription_plan === "enterprise").length || 0,
  };

  // Calculate MRR
  const mrr = planCounts.professional * 97 + planCounts.enterprise * 297;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Visão geral da plataforma Executive</p>
        </div>
        <Link
          href="/platform/tenants/new"
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalTenants || 0}</p>
              <p className="text-sm text-slate-500">Total Clientes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ {mrr}</p>
              <p className="text-sm text-slate-500">MRR</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{planCounts.professional}</p>
              <p className="text-sm text-slate-500">Professional</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{planCounts.enterprise}</p>
              <p className="text-sm text-slate-500">Enterprise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Distribuição por Plano</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Free ({planCounts.free})</span>
              <span>{totalTenants ? Math.round((planCounts.free / totalTenants) * 100) : 0}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full">
              <div
                className="h-2 bg-slate-400 rounded-full"
                style={{ width: `${totalTenants ? (planCounts.free / totalTenants) * 100 : 0}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Professional ({planCounts.professional})</span>
              <span>{totalTenants ? Math.round((planCounts.professional / totalTenants) * 100) : 0}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full">
              <div
                className="h-2 bg-purple-500 rounded-full"
                style={{ width: `${totalTenants ? (planCounts.professional / totalTenants) * 100 : 0}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Enterprise ({planCounts.enterprise})</span>
              <span>{totalTenants ? Math.round((planCounts.enterprise / totalTenants) * 100) : 0}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full">
              <div
                className="h-2 bg-orange-500 rounded-full"
                style={{ width: `${totalTenants ? (planCounts.enterprise / totalTenants) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
