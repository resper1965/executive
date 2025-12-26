export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Página não encontrada
        </h2>
        <p className="text-slate-600 mb-8">
          O portal que você está procurando não existe ou foi removido.
        </p>
        <a
          href="/"
          className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
}

