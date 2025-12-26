import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";
import { updateTenantStatus } from "@/app/platform-admin/actions";
import { redirect } from "next/navigation";

export default async function TenantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: tenant, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !tenant) {
    return <div>Tenant not found</div>;
  }

  async function updateStatus(newStatus: "active" | "cancelled") {
    "use server";
    await updateTenantStatus(tenant!.id, newStatus);
    redirect(`/platform-admin/tenants/${tenant!.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/platform-admin/tenants"
          className="p-2 -ml-2 text-slate-400 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">{tenant.name}</h1>
        <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium capitalize
            ${tenant.subscription_status === 'active' ? 'bg-green-100 text-green-800' : 
              tenant.subscription_status === 'cancelled' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'}`}>
          {tenant.subscription_status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detail Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500">ID</dt>
              <dd className="text-sm text-slate-900 font-mono mt-1">{tenant.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Domain</dt>
              <dd className="mt-1 flex items-center gap-2">
                <span className="text-slate-900">{tenant.subdomain}.executive.vercel.app</span>
                <a 
                  href={`https://${tenant.subdomain}.executive.vercel.app`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <ExternalLink size={14} />
                </a>
              </dd>
            </div>
            {tenant.custom_domain && (
              <div>
                <dt className="text-sm font-medium text-slate-500">Custom Domain</dt>
                <dd className="text-sm text-slate-900 mt-1">{tenant.custom_domain}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-slate-500">Plan</dt>
              <dd className="text-sm font-medium capitalize mt-1">{tenant.subscription_plan}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Joined</dt>
              <dd className="text-sm text-slate-900 mt-1">
                {new Date(tenant.created_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        {/* Actions Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Management Actions</h2>
          <div className="space-y-4">
            
            {tenant.subscription_status === "active" ? (
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-500 shrink-0" size={20} />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Disable Access</h3>
                    <p className="text-xs text-red-600 mt-1">
                      Prevent this tenant from accessing their dashboard and public site.
                    </p>
                    <form action={updateStatus.bind(null, "cancelled")}>
                      <button className="mt-3 px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                        Disable Tenant
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0" size={20} />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Activate Tenant</h3>
                    <p className="text-xs text-green-600 mt-1">
                      Re-enable access for this tenant.
                    </p>
                    <form action={updateStatus.bind(null, "active")}>
                      <button className="mt-3 px-4 py-2 bg-white border border-green-200 text-green-600 text-sm font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                        Activate Tenant
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
