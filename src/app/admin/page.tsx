import { getCurrentTenant } from "@/lib/tenant-api";
import { getAllPosts } from "@/lib/tenant-api";

export default async function AdminDashboard() {
  const tenant = await getCurrentTenant();
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-slate-500">Total de Posts</p>
          <p className="text-3xl font-bold text-slate-900">{posts.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-slate-500">Plano</p>
          <p className="text-3xl font-bold text-slate-900 capitalize">
            {tenant?.subscription_plan || "Free"}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-slate-500">Tema</p>
          <p className="text-3xl font-bold text-slate-900 capitalize">
            {tenant?.theme?.preset || "Executive"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Ações Rápidas
        </h2>
        <div className="flex gap-4">
          <a
            href="/admin/posts/new"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Novo Post
          </a>
          <a
            href="/admin/settings"
            className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200"
          >
            Configurações
          </a>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Posts Recentes
        </h2>
        <ul className="divide-y divide-slate-100">
          {posts.slice(0, 5).map((post) => (
            <li key={post.slug} className="py-3">
              <a
                href={`/admin/posts/${post.slug}`}
                className="text-slate-900 hover:text-slate-600"
              >
                {post.title}
              </a>
              <p className="text-sm text-slate-500">{post.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
