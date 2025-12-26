"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentTenant } from "@/lib/tenant-api";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Post schemas
const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(2, "Category is required"),
  author: z.string().min(2, "Author is required"),
  image: z.string().url().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().uuid(),
});

const updateSettingsSchema = z.object({
  customDomain: z.string().optional(),
  calendlyUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  googleAnalyticsId: z.string().optional(),
  themePreset: z.string().optional(),
});

const updatePageSchema = z.object({
  type: z.string(),
  content: z.any(), // JSONB content
});

// Post actions
export async function createPost(formData: FormData) {
  await requireAuth();
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return { error: { _form: ["Tenant not found"] } };
  }

  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: formData.get("image") || undefined,
    status: formData.get("status") || "draft",
  };

  const validation = createPostSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  // Check if slug exists for this tenant
  const { data: existing } = await supabase
    .from("posts")
    .select("id")
    .eq("tenant_id", tenant.id)
    .eq("slug", validation.data.slug)
    .single();

  if (existing) {
    return {
      error: {
        slug: ["Slug already exists"],
      },
    };
  }

  const { error } = await supabase.from("posts").insert({
    tenant_id: tenant.id,
    title: validation.data.title,
    slug: validation.data.slug,
    excerpt: validation.data.excerpt,
    content: validation.data.content,
    category: validation.data.category,
    author: validation.data.author,
    image: validation.data.image,
    status: validation.data.status,
    published_at: validation.data.status === "published" ? new Date().toISOString() : null,
  });

  if (error) {
    return {
      error: { _form: ["Database error: " + error.message] },
    };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  await requireAuth();
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return { error: { _form: ["Tenant not found"] } };
  }

  const rawData = {
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: formData.get("image") || undefined,
    status: formData.get("status"),
  };

  const validation = updatePostSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  // Check if slug exists for another post
  if (validation.data.slug) {
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("tenant_id", tenant.id)
      .eq("slug", validation.data.slug)
      .neq("id", validation.data.id)
      .single();

    if (existing) {
      return {
        error: {
          slug: ["Slug already exists"],
        },
      };
    }
  }

  const updateData: any = { ...validation.data };
  delete updateData.id;

  // Update published_at if status changes to published
  if (validation.data.status === "published") {
    const { data: current } = await supabase
      .from("posts")
      .select("published_at")
      .eq("id", validation.data.id)
      .single();

    if (!current?.published_at) {
      updateData.published_at = new Date().toISOString();
    }
  }

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", validation.data.id)
    .eq("tenant_id", tenant.id);

  if (error) {
    return {
      error: { _form: ["Database error: " + error.message] },
    };
  }

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${validation.data.slug}`);
  revalidatePath("/blog");
  return { success: true };
}

export async function deletePost(postId: string) {
  await requireAuth();
  const tenant = await getCurrentTenant();

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("tenant_id", tenant.id);

  if (error) {
    throw new Error("Database error: " + error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}

// Settings actions
export async function updateSettings(formData: FormData) {
  await requireAuth();
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return { error: { _form: ["Tenant not found"] } };
  }

  const rawData = {
    customDomain: formData.get("customDomain") || undefined,
    calendlyUrl: formData.get("calendlyUrl") || "",
    linkedinUrl: formData.get("linkedinUrl") || "",
    googleAnalyticsId: formData.get("googleAnalyticsId") || undefined,
    themePreset: formData.get("themePreset") || undefined,
  };

  const validation = updateSettingsSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const updateData: any = {};

  // Update custom domain if provided
  if (validation.data.customDomain) {
    updateData.custom_domain = validation.data.customDomain;
  }

  // Update theme if provided
  if (validation.data.themePreset) {
    updateData.theme = {
      ...tenant.theme,
      preset: validation.data.themePreset,
    };
  }

  // Update settings
  updateData.settings = {
    ...tenant.settings,
    calendlyUrl: validation.data.calendlyUrl || null,
    linkedinUrl: validation.data.linkedinUrl || null,
    googleAnalyticsId: validation.data.googleAnalyticsId || null,
  };

  const { error } = await supabase
    .from("tenants")
    .update(updateData)
    .eq("id", tenant.id);

  if (error) {
    return {
      error: { _form: ["Database error: " + error.message] },
    };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}

// Page actions
export async function updatePage(formData: FormData) {
  await requireAuth();
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return { error: { _form: ["Tenant not found"] } };
  }

  const type = formData.get("type") as string;
  const content = formData.get("content") as string;

  if (!type || !content) {
    return {
      error: { _form: ["Type and content are required"] },
    };
  }

  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (e) {
    return {
      error: { _form: ["Invalid JSON content"] },
    };
  }

  const supabase = await createClient();

  // Check if page exists
  const { data: existing } = await supabase
    .from("pages")
    .select("id")
    .eq("tenant_id", tenant.id)
    .eq("type", type)
    .single();

  if (existing) {
    // Update existing page
    const { error } = await supabase
      .from("pages")
      .update({ content: parsedContent })
      .eq("id", existing.id);

    if (error) {
      return {
        error: { _form: ["Database error: " + error.message] },
      };
    }
  } else {
    // Create new page
    const { error } = await supabase.from("pages").insert({
      tenant_id: tenant.id,
      type,
      content: parsedContent,
    });

    if (error) {
      return {
        error: { _form: ["Database error: " + error.message] },
      };
    }
  }

  revalidatePath("/admin/pages");
  revalidatePath(`/${type}`);
  return { success: true };
}
