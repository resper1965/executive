"use client";

import { createTenant } from "@/app/platform-admin/actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Creating...
        </>
      ) : (
        <>
          <Save size={18} />
          <span>Create Tenant</span>
        </>
      )}
    </button>
  );
}

export default function CreateTenantForm() {
  const [error, setError] = useState<Record<string, string[]> | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await createTenant(formData);
    if (result?.error) {
      setError(result.error as Record<string, string[]>);
    } else if (result?.message) {
      alert(result.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/platform-admin/tenants"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Tenants
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">New Tenant</h1>
      </div>

      <form action={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Tenant Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Acme Corp"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            {error?.name && (
              <p className="text-red-500 text-sm mt-1">{error.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-slate-700 mb-1">
              Subdomain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="subdomain"
                name="subdomain"
                required
                placeholder="acme"
                className="flex-1 px-4 py-2 rounded-l-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
              <span className="px-4 py-2 bg-slate-100 border border-l-0 border-slate-300 rounded-r-lg text-slate-500">
                .executive.vercel.app
              </span>
            </div>
            {error?.subdomain && (
              <p className="text-red-500 text-sm mt-1">{error.subdomain[0]}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">Lowercase letters, numbers and hyphens only.</p>
          </div>

          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-slate-700 mb-1">
              Subscription Plan
            </label>
            <select
              id="plan"
              name="plan"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="free">Free</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
            {error?.plan && (
              <p className="text-red-500 text-sm mt-1">{error.plan[0]}</p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}
