import { getCurrentTenant } from "@/lib/tenant-api";
import themePresets from "@/lib/themes";

export default async function AdminSettingsPage() {
  const tenant = await getCurrentTenant();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Configurações</h1>

      <div className="space-y-6">
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
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Domínio Customizado
              </label>
              <input
                type="text"
                defaultValue={tenant?.custom_domain || ""}
                placeholder="seudominio.com.br"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
              <p className="mt-1 text-sm text-slate-500">
                Disponível no plano Enterprise
              </p>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Tema</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(themePresets).map(([key, theme]) => (
              <button
                key={key}
                className={`p-4 rounded-lg border-2 text-center ${
                  tenant?.theme?.preset === key
                    ? "border-slate-900"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <div
                  className="w-full h-12 rounded mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor} 50%, ${theme.accentColor} 50%)`,
                  }}
                />
                <span className="text-sm font-medium capitalize">{key}</span>
              </button>
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
              <label className="block text-sm font-medium text-slate-700">
                URL do Calendly
              </label>
              <input
                type="url"
                defaultValue={tenant?.settings?.calendlyUrl || ""}
                placeholder="https://calendly.com/seu-usuario"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                LinkedIn
              </label>
              <input
                type="url"
                defaultValue={tenant?.settings?.linkedinUrl || ""}
                placeholder="https://linkedin.com/in/seu-perfil"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Google Analytics ID
              </label>
              <input
                type="text"
                defaultValue={tenant?.settings?.googleAnalyticsId || ""}
                placeholder="G-XXXXXXXXXX"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
