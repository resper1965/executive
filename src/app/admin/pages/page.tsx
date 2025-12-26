import { createClient } from "@/lib/supabase/server";
import { getCurrentTenant } from "@/lib/tenant-api";
import Link from "next/link";

const pageTypes = [
  { type: "about", name: "Sobre", description: "Página sobre a empresa" },
  { type: "services", name: "Serviços", description: "Página de serviços oferecidos" },
  { type: "contact", name: "Contato", description: "Página de contato" },
  { type: "events", name: "Eventos", description: "Página de eventos" },
];

export default async function AdminPagesPage() {
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return null;
  }

  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("tenant_id", tenant.id);

  const pagesMap = new Map(pages?.map((p) => [p.type, p]) || []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Gerenciar Páginas
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {pageTypes.map((pageType) => {
          const page = pagesMap.get(pageType.type);
          const exists = !!page;

          return (
            <div
              key={pageType.type}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {pageType.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {pageType.description}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    exists
                      ? "bg-green-100 text-green-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {exists ? "Configurada" : "Não configurada"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/pages/${pageType.type}`}
                  className="flex-1 text-center bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {exists ? "Editar" : "Configurar"}
                </Link>
                {exists && (
                  <Link
                    href={`/${pageType.type}`}
                    target="_blank"
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Visualizar
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
