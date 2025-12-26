import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return user;
}

/**
 * Check if user is super admin (Bekaa team)
 */
export async function isSuperAdmin(email: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("super_admins")
    .select("id")
    .eq("email", email)
    .single();
  
  return !!data;
}

/**
 * Require super admin access
 */
export async function requireSuperAdmin() {
  const user = await requireAuth();
  const isAdmin = await isSuperAdmin(user.email || "");
  
  if (!isAdmin) {
    redirect("/");
  }
  
  return user;
}
