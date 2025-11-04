'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Home() {

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch('/api/links');

        if (!response.ok) {
          throw new Error('Falha ao buscar os dados da API');
        }

        const data = await response.json();
        setLinks(data);

      } catch (error) {
        console.error("Erro no fetchLinks:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();

  }, []);



  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Ocorreu um erro: {error}</p>;
  }


  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Meus Links</h1>
        <div className="space-y-4">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800 rounded-lg text-center font-semibold hover:bg-gray-700 transition-colors"
              >
                {link.title}
              </a>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum link cadastrado ainda.</p>
          )}
        </div>
      </div>
    </main>
  );
}