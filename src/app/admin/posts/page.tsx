import { getAllPosts } from "@/lib/tenant-api";
import Link from "next/link";

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          Novo Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {posts.map((post) => (
              <tr key={post.slug}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">
                    {post.title}
                  </div>
                  <div className="text-sm text-slate-500">{post.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {post.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {post.status || "published"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="text-slate-600 hover:text-slate-900 mr-4"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
