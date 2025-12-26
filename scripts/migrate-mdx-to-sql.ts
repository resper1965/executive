/**
 * Script para migrar artigos MDX para SQL seed
 * Uso: node --experimental-strip-types scripts/migrate-mdx-to-sql.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content");
const outputFile = path.join(
  process.cwd(),
  "supabase/migrations/003_seed_posts.sql"
);

const TENANT_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"; // Sabrina's tenant ID

function escapeSQL(str: string): string {
  if (!str) return "";
  return str.replace(/'/g, "''").replace(/\\/g, "\\\\");
}

function generateSQL(): string {
  const fileNames = fs.readdirSync(postsDirectory);

  const insertStatements = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$|\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return `INSERT INTO public.posts (tenant_id, slug, title, excerpt, content, category, read_time, status, published_at) VALUES (
  '${TENANT_ID}',
  '${escapeSQL(slug)}',
  '${escapeSQL(data.title)}',
  '${escapeSQL(data.excerpt)}',
  '${escapeSQL(content)}',
  '${escapeSQL(data.category)}',
  '${escapeSQL(data.readTime)}',
  'published',
  '${data.date}'
);`;
    });

  return `-- =============================================
-- SEED: Migrate MDX posts to database
-- Generated at: ${new Date().toISOString()}
-- Total posts: ${insertStatements.length}
-- =============================================

${insertStatements.join("\n\n")}
`;
}

const sql = generateSQL();
fs.writeFileSync(outputFile, sql);
console.log(`✅ Generated ${outputFile}`);
console.log(`   Total posts migrated: ${sql.match(/INSERT INTO/g)?.length || 0}`);
