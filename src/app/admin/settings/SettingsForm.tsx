"use client";

import { useState } from "react";
import { updateSettings } from "@/app/admin/actions";
import themePresets from "@/lib/themes";

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  custom_domain?: string;
  theme?: {
    preset?: string;
  };
  settings?: {
    calendlyUrl?: string;
    linkedinUrl?: string;
    googleAnalyticsId?: string;
  };
}

export default function SettingsForm({ tenant }: { tenant: Tenant }) {
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    const result = await updateSettings(formData);

    if (result?.error) {
      setErrors(result.error);
      setIsSubmitting(false);
    } else if (result?.success) {
      setSuccessMessage("Configurações salvas com sucesso!");
      setIsSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* General Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Informações Gerais
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Nome
            </label>
            <input
              type="text"
              defaultValue={tenant?.name || ""}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              disabled
            />
            <p className="mt-1 text-xs text-slate-500">
              O nome não pode ser alterado aqui. Entre em contato com o suporte.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Subdomínio
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                defaultValue={tenant?.subdomain || ""}
                className="flex-1 rounded-l-md border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                disabled
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-slate-500 text-sm">
                .executive.vercel.app
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              O subdomínio não pode ser alterado.
            </p>
          </div>
          <div>
            <label
              htmlFor="customDomain"
              className="block text-sm font-medium text-slate-700"
            >
              Domínio Customizado
            </label>
            <input
              type="text"
              id="customDomain"
              name="customDomain"
              defaultValue={tenant?.custom_domain || ""}
              placeholder="seudominio.com.br"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            <p className="mt-1 text-sm text-slate-500">
              Disponível no plano Enterprise
            </p>
            {errors.customDomain && (
              <p className="mt-1 text-sm text-red-600">
                {errors.customDomain[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Tema</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(themePresets).map(([key, theme]) => (
            <label
              key={key}
              className={`p-4 rounded-lg border-2 text-center cursor-pointer ${
                tenant?.theme?.preset === key
                  ? "border-slate-900"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name="themePreset"
                value={key}
                defaultChecked={tenant?.theme?.preset === key}
                className="sr-only"
              />
              <div
                className="w-full h-12 rounded mb-2"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor} 50%, ${theme.accentColor} 50%)`,
                }}
              />
              <span className="text-sm font-medium capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Links Sociais
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="calendlyUrl"
              className="block text-sm font-medium text-slate-700"
            >
              URL do Calendly
            </label>
            <input
              type="url"
              id="calendlyUrl"
              name="calendlyUrl"
              defaultValue={tenant?.settings?.calendlyUrl || ""}
              placeholder="https://calendly.com/seu-usuario"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.calendlyUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.calendlyUrl[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="linkedinUrl"
              className="block text-sm font-medium text-slate-700"
            >
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              defaultValue={tenant?.settings?.linkedinUrl || ""}
              placeholder="https://linkedin.com/in/seu-perfil"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.linkedinUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.linkedinUrl[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="googleAnalyticsId"
              className="block text-sm font-medium text-slate-700"
            >
              Google Analytics ID
            </label>
            <input
              type="text"
              id="googleAnalyticsId"
              name="googleAnalyticsId"
              defaultValue={tenant?.settings?.googleAnalyticsId || ""}
              placeholder="G-XXXXXXXXXX"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.googleAnalyticsId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.googleAnalyticsId[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Form errors */}
      {errors._form && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{errors._form[0]}</p>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}
