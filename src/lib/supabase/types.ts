// Database types for multi-tenant platform
// Auto-generate with: npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          subdomain: string;
          custom_domain: string | null;
          logo_url: string | null;
          theme: TenantTheme;
          settings: TenantSettings;
          subscription_plan: "free" | "professional" | "enterprise";
          subscription_status: "active" | "cancelled" | "past_due";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tenants"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["tenants"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          tenant_id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string | null;
          category: string | null;
          read_time: string | null;
          cover_image_url: string | null;
          status: "draft" | "published" | "archived";
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["posts"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
      pages: {
        Row: {
          id: string;
          tenant_id: string;
          type: string;
          content: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["pages"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["pages"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          message: string | null;
          source: string;
          status: "new" | "contacted" | "converted" | "lost";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at" | "status">;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
    };
  };
}

export interface TenantTheme {
  preset: "executive" | "health-executive" | "healthcare" | "corporate" | "minimal" | "vibrant";
  primaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface TenantSettings {
  calendlyUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  googleAnalyticsId: string | null;
}

// Convenience types
export type Tenant = Database["public"]["Tables"]["tenants"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Page = Database["public"]["Tables"]["pages"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
