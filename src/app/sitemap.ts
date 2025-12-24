import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content-api";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://site-sabrina-nessbr-projects.vercel.app"; // Fallback to current live URL
  
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/blog", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  return [...routes, ...posts];
}
