import { createClient } from "@/lib/supabase/server";
import { getCurrentTenant } from "@/lib/tenant-api";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getCurrentTenant();

  if (!tenant) {
    notFound();
  }

  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("slug", slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div>
      <EditPostForm post={post} />
    </div>
  );
}
