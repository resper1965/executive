import { headers } from "next/headers";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Tenant, Post, Page } from "@/lib/supabase/types";

// =============================================
// TENANT RESOLUTION
// =============================================

/**
 * Get current tenant from middleware headers
 * Cached per request
 */
export const getCurrentTenant = cache(async (): Promise<Tenant | null> => {
  const headersList = await headers();
  const tenantId = headersList.get("x-tenant-id");
  
  if (!tenantId) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenantId)
    .single();

  return data;
});

// =============================================
// POSTS
// =============================================

/**
 * Get all published posts for current tenant
 */
export async function getAllPosts(): Promise<Post[]> {
  const tenant = await getCurrentTenant();
  
  if (!tenant) {
    // Fallback to MDX for development/migration
    return getAllPostsFromMDX();
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return data || [];
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const tenant = await getCurrentTenant();
  
  if (!tenant) {
    // Fallback to MDX
    const mdxPost = getPostBySlugFromMDX(slug);
    return mdxPost ? {
      id: slug,
      tenant_id: "",
      slug,
      title: mdxPost.title,
      excerpt: mdxPost.excerpt,
      content: mdxPost.content,
      category: mdxPost.category,
      read_time: mdxPost.readTime,
      cover_image_url: null,
      status: "published",
      published_at: mdxPost.date,
      created_at: mdxPost.date,
      updated_at: mdxPost.date,
    } : null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return data;
}

// =============================================
// PAGES
// =============================================

/**
 * Get page content by type (about, services, contact, events)
 */
export async function getPageContent<T = Record<string, unknown>>(
  type: string
): Promise<T | null> {
  const tenant = await getCurrentTenant();
  
  if (!tenant) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("content")
    .eq("tenant_id", tenant.id)
    .eq("type", type)
    .single();

  return data?.content as T | null;
}

// =============================================
// MDX FALLBACK (for migration period)
// =============================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface MDXPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src/content");

function getAllPostsFromMDX(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$|\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: slug,
        tenant_id: "",
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content,
        category: data.category,
        read_time: data.readTime,
        cover_image_url: null,
        status: "published" as const,
        published_at: data.date,
        created_at: data.date,
        updated_at: data.date,
      };
    });

  return allPostsData.sort((a, b) => 
    (a.published_at || "") < (b.published_at || "") ? 1 : -1
  );
}

function getPostBySlugFromMDX(slug: string): MDXPostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      readTime: data.readTime,
    };
  } catch {
    return null;
  }
}
