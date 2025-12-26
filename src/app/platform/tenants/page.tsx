import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, ExternalLink, Settings } from "lucide-react";

export default async function TenantsPage() {
  const supabase = await createClient();

  const { data: tenants } = await supabase
    .from("tenants")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500">Gerencie os tenants da plataforma</p>
        </div>
        <Link
          href="/platform/tenants/new"
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Subdomínio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Plano
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {tenants?.map((tenant) => (
              <tr key={tenant.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium">
                      {tenant.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{tenant.name}</div>
                      <div className="text-sm text-slate-500">{tenant.custom_domain || "-"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                    {tenant.subdomain}.executive.vercel.app
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tenant.subscription_plan === "enterprise"
                      ? "bg-orange-100 text-orange-800"
                      : tenant.subscription_plan === "professional"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-slate-100 text-slate-800"
                  }`}>
                    {tenant.subscription_plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tenant.subscription_status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {tenant.subscription_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/platform/tenants/${tenant.id}`}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <Settings className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://${tenant.subdomain}.executive.vercel.app`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!tenants || tenants.length === 0) && (
          <div className="text-center py-12 text-slate-500">
            Nenhum cliente cadastrado ainda.
          </div>
        )}
      </div>
    </div>
  );
}
