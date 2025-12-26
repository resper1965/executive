import { createClient } from "@/lib/supabase/server";
import { Tenant } from "@/lib/supabase/types";
import Link from "next/link";
import { Plus, MoreHorizontal, ExternalLink } from "lucide-react";

export default async function TenantsPage() {
  const supabase = await createClient(); // Await createClient as per server.ts definition if needed, but imported one seems async? 
  // Wait, server.ts usage showed `export async function createClient` in step 48. So I MUST await it.
  
  const { data: tenants, error } = await supabase
    .from("tenants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading tenants: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tenants</h1>
          <p className="text-slate-500 mt-1">Manage all platform clients and subscriptions.</p>
        </div>
        <Link
          href="/platform-admin/tenants/new"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          <span>New Tenant</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Tenant Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Domain</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Plan</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tenants?.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{tenant.name}</div>
                  <div className="text-xs text-slate-500 font-mono">{tenant.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{tenant.subdomain}.executive.vercel.app</span>
                    <a 
                      href={`https://${tenant.subdomain}.executive.vercel.app`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  {tenant.custom_domain && (
                    <div className="text-xs text-indigo-600 mt-0.5">{tenant.custom_domain}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${tenant.subscription_plan === 'enterprise' ? 'bg-purple-100 text-purple-800' : 
                      tenant.subscription_plan === 'professional' ? 'bg-blue-100 text-blue-800' : 
                      'bg-slate-100 text-slate-800'}`}>
                    {tenant.subscription_plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${tenant.subscription_status === 'active' ? 'bg-green-100 text-green-800' : 
                      tenant.subscription_status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {tenant.subscription_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/platform-admin/tenants/${tenant.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </Link>
                </td>
              </tr>
            ))}
            
            {tenants?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No tenants found. Click "New Tenant" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
