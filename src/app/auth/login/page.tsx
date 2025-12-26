"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Erro ao enviar email. Tente novamente.");
    } else {
      setMessage("Link de acesso enviado! Verifique seu email.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Executive</h1>
          <p className="text-slate-500 mt-2">Acesse seu painel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar link de acesso"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes("Erro") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          Powered by <a href="https://bekaa.eu" className="text-slate-600 hover:underline">Bekaa</a>
        </p>
      </div>
    </div>
  );
}
