"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTenantSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  subdomain: z.string().min(3, "Subdomain must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Subdomain can only contain lowercase letters, numbers, and hyphens"),
  plan: z.enum(["free", "professional", "enterprise"]),
});

export async function createTenant(formData: FormData) {
  const supabase = await createClient();

  // Verify super admin access
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: { _form: ["Unauthorized"] } };
  }

  const { data: superAdmin } = await supabase
    .from("super_admins")
    .select("id")
    .eq("email", user.email || "")
    .single();

  if (!superAdmin) {
    return { error: { _form: ["Unauthorized - Super Admin access required"] } };
  }

  const rawData = {
    name: formData.get("name"),
    subdomain: formData.get("subdomain"),
    plan: formData.get("plan"),
  };

  const validatedFields = createTenantSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, subdomain, plan } = validatedFields.data;

  // Check if subdomain exists
  const { data: existing } = await supabase
    .from("tenants")
    .select("id")
    .eq("subdomain", subdomain)
    .single();

  if (existing) {
    return {
      error: {
        subdomain: ["Subdomain is already taken"],
      },
    };
  }

  // Insert tenant
  const { error } = await supabase.from("tenants").insert({
    name,
    subdomain,
    subscription_plan: plan,
    subscription_status: "active", // Default to active for manually created tenants
    theme: {
      preset: "executive",
      primaryColor: "#4f46e5",
      accentColor: "#fbbf24",
      fontHeading: "Inter",
      fontBody: "Inter",
    },
    settings: {
      calendlyUrl: null,
      linkedinUrl: null,
      instagramUrl: null,
      googleAnalyticsId: null,
    },
  });

  if (error) {
    return {
      message: "Database error: " + error.message,
    };
  }

  revalidatePath("/platform-admin/tenants");
  redirect("/platform-admin/tenants");
}

export async function updateTenantStatus(tenantId: string, status: "active" | "cancelled" | "past_due") {
  const supabase = await createClient();

  // Verify super admin access
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: superAdmin } = await supabase
    .from("super_admins")
    .select("id")
    .eq("email", user.email || "")
    .single();

  if (!superAdmin) {
    throw new Error("Unauthorized - Super Admin access required");
  }
  
  const { error } = await supabase
    .from("tenants")
    .update({ subscription_status: status })
    .eq("id", tenantId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/platform-admin/tenants/${tenantId}`);
  revalidatePath("/platform-admin/tenants");
}
