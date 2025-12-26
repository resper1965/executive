"use client";

import { useState } from "react";
import { updatePost, deletePost } from "@/app/admin/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image?: string;
  status: string;
}

export default function EditPostForm({ post }: { post: Post }) {
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    formData.append("id", post.id);

    const result = await updatePost(formData);

    if (result?.error) {
      setErrors(result.error);
      setIsSubmitting(false);
    } else {
      // Success - form will redirect via server action
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      router.push("/admin/posts");
    } catch (error) {
      alert("Erro ao deletar post: " + (error as Error).message);
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Editar Post</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-red-600 hover:text-red-800"
          >
            Deletar
          </button>
          <Link
            href="/admin/posts"
            className="text-slate-600 hover:text-slate-900"
          >
            Cancelar
          </Link>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={post.title}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Slug * (URL amigável)
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              pattern="[a-z0-9-]+"
              defaultValue={post.slug}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug[0]}</p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Resumo *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={3}
              defaultValue={post.excerpt}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt[0]}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Conteúdo * (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={15}
              defaultValue={post.content}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 font-mono text-sm"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content[0]}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Categoria *
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={post.category}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Saúde Suplementar">Saúde Suplementar</option>
              <option value="Gestão">Gestão</option>
              <option value="Estratégia">Estratégia</option>
              <option value="Liderança">Liderança</option>
              <option value="Inovação">Inovação</option>
              <option value="RH">RH</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category[0]}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Autor *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              defaultValue={post.author}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author[0]}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              URL da Imagem (opcional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              defaultValue={post.image || ""}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image[0]}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Status *
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue={post.status}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status[0]}</p>
            )}
          </div>

          {/* Form errors */}
          {errors._form && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{errors._form[0]}</p>
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/posts"
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-slate-600 mb-6">
              Tem certeza que deseja deletar o post &quot;{post.title}&quot;? Esta ação não
              pode ser desfeita.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deletando..." : "Deletar Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
