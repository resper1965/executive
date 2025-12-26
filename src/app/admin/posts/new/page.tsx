"use client";

import { useState } from "react";
import { createPost } from "@/app/admin/actions";
import Link from "next/link";

export default function NewPostPage() {
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    const result = await createPost(formData);

    if (result?.error) {
      setErrors(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Novo Post</h1>
        <Link
          href="/admin/posts"
          className="text-slate-600 hover:text-slate-900"
        >
          Cancelar
        </Link>
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
              Slug * (URL amigável, ex: meu-post-incrivel)
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              pattern="[a-z0-9-]+"
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
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 font-mono text-sm"
              placeholder="# Título do Post

Escreva seu conteúdo aqui em Markdown...

## Subtítulo

- Lista
- De
- Itens"
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
              defaultValue="draft"
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
            {isSubmitting ? "Salvando..." : "Criar Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
