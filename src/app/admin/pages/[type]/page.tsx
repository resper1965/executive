import { createClient } from "@/lib/supabase/server";
import { getCurrentTenant } from "@/lib/tenant-api";
import { notFound } from "next/navigation";
import PageEditor from "./PageEditor";

const pageTypes = ["about", "services", "contact", "events"];

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!pageTypes.includes(type)) {
    notFound();
  }

  const tenant = await getCurrentTenant();

  if (!tenant) {
    notFound();
  }

  const supabase = await createClient();
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("type", type)
    .single();

  return <PageEditor type={type} existingPage={page} />;
}
