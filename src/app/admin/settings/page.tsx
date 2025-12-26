import { getCurrentTenant } from "@/lib/tenant-api";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Configurações</h1>

      <SettingsForm tenant={tenant} />
    </div>
  );
}
