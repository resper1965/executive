"use client";

import { useState } from "react";
import { updatePage } from "@/app/admin/actions";
import Link from "next/link";

interface Page {
  id: string;
  type: string;
  content: any;
}

const pageTypeNames: Record<string, string> = {
  about: "Sobre",
  services: "Serviços",
  contact: "Contato",
  events: "Eventos",
};

export default function PageEditor({
  type,
  existingPage,
}: {
  type: string;
  existingPage?: Page | null;
}) {
  const [content, setContent] = useState(
    JSON.stringify(existingPage?.content || {}, null, 2)
  );
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("type", type);
    formData.append("content", content);

    const result = await updatePage(formData);

    if (result?.error) {
      setErrors(result.error);
      setIsSubmitting(false);
    } else if (result?.success) {
      setSuccessMessage("Página salva com sucesso!");
      setIsSubmitting(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }

  const pageName = pageTypeNames[type] || type;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Editar Página: {pageName}
        </h1>
        <Link
          href="/admin/pages"
          className="text-slate-600 hover:text-slate-900"
        >
          Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Formato JSON
            </h3>
            <p className="text-sm text-blue-700">
              O conteúdo deve ser um objeto JSON válido. A estrutura exata
              depende do tipo de página. Exemplos:
            </p>
            <details className="mt-2">
              <summary className="text-sm font-medium text-blue-900 cursor-pointer hover:text-blue-700">
                Ver exemplos de estrutura
              </summary>
              <div className="mt-2 space-y-2">
                <div className="text-xs">
                  <strong>About:</strong>
                  <pre className="bg-white p-2 rounded mt-1 overflow-x-auto">
                    {`{
  "title": "Sobre Nós",
  "description": "Descrição da empresa",
  "sections": [
    {
      "heading": "Nossa História",
      "content": "Texto..."
    }
  ]
}`}
                  </pre>
                </div>
                <div className="text-xs">
                  <strong>Services:</strong>
                  <pre className="bg-white p-2 rounded mt-1 overflow-x-auto">
                    {`{
  "title": "Nossos Serviços",
  "services": [
    {
      "name": "Consultoria",
      "description": "Descrição",
      "icon": "📊"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </details>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Conteúdo JSON *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={20}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 font-mono text-sm"
            />
            {errors._form && (
              <p className="mt-1 text-sm text-red-600">{errors._form[0]}</p>
            )}
          </div>

          {successMessage && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/pages"
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Salvando..." : "Salvar Página"}
          </button>
        </div>
      </form>
    </div>
  );
}
