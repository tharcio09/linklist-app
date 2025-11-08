'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ session }) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/links');
      if (!res.ok) throw new Error('Falha ao buscar links');
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/admin/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url }),
      });

      if (res.ok) {
        setTitle('');
        setUrl('');
        fetchLinks();
      } else {
        const data = await res.json();
        setError(data.message || "Erro ao criar o link.");
      }
    } catch (err) {
      setError(err.message || "Erro inesperado.");
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Admin Dashboard
      </h1>
      <p className="mb-8">Bem-vindo, {session.user.email}!</p>
      
      <form onSubmit={handleSubmit} className="mb-12 p-6 bg-gray-800 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">Criar Novo Link</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Meu Portfólio"
            required
            className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300">URL</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
            className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600 focus:border-indigo-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold"
        >
          Criar Link
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Meus Links</h2>
      {loading && <p>Carregando links...</p>}
      <div className="space-y-4">
        {links.length > 0 ? (
          links.map(link => (
            <div key={link.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{link.title}</h3>
                <p className="text-sm text-gray-400">{link.url}</p>
              </div>
              <div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">Nenhum link criado ainda.</p>
        )}
      </div>
    </div>
  );
}