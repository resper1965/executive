"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import themePresets from "@/lib/themes";

export default function NewTenantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    theme: "executive",
    plan: "free",
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const theme = themePresets[formData.theme];

    const { error } = await supabase.from("tenants").insert({
      name: formData.name,
      subdomain: formData.subdomain.toLowerCase().replace(/[^a-z0-9]/g, ""),
      theme,
      subscription_plan: formData.plan,
      settings: {
        calendlyUrl: null,
        linkedinUrl: null,
        instagramUrl: null,
        googleAnalyticsId: null,
      },
    });

    if (error) {
      alert("Erro ao criar cliente: " + error.message);
    } else {
      router.push("/platform/tenants");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Novo Cliente</h1>
      <p className="text-slate-500 mb-8">Cadastre um novo tenant na plataforma</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome do Cliente
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: João Silva Consultoria"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Subdomínio
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.subdomain}
              onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
              placeholder="joao"
              required
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900"
            />
            <span className="text-slate-500">.executive.vercel.app</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Tema
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(themePresets).map(([key, theme]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFormData({ ...formData, theme: key })}
                className={`p-4 rounded-lg border-2 text-left ${
                  formData.theme === key
                    ? "border-slate-900"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <div
                  className="w-full h-8 rounded mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor} 50%, ${theme.accentColor} 50%)`,
                  }}
                />
                <span className="text-sm font-medium capitalize">{key.replace("-", " ")}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Plano
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "free", name: "Starter", price: "Grátis" },
              { id: "professional", name: "Professional", price: "R$ 97/mês" },
              { id: "enterprise", name: "Enterprise", price: "R$ 297/mês" },
            ].map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setFormData({ ...formData, plan: plan.id })}
                className={`p-4 rounded-lg border-2 text-left ${
                  formData.plan === plan.id
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <span className="block font-medium">{plan.name}</span>
                <span className="text-sm text-slate-500">{plan.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-slate-600 hover:text-slate-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}
